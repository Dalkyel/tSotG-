const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const A = require('../.claude/skills/add-chapter/scripts/archive-records.cjs');
const { main, compose } = require('../.claude/skills/add-chapter/scripts/reprocess.cjs');
const { suffix } = require('../.claude/skills/add-chapter/scripts/rebase-archive.cjs');
const fixture = fn => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'book2-reprocess-test.'));
  try {
    const n = {id:'a',label:'A',group:'VARG',type:'Personaje',desc:'LIBRO 1, CAPÍTULO 1: original.',star:'Unresolved observation.'};
    fs.mkdirSync(root+'/book1');fs.mkdirSync(root+'/book2');
    for (const [book,data] of [[1,{nodes:[{chapter:1,value:n}],links:[],summaries:[{chapter:1,value:{chapter:1,title:'One',summary:'First book.'}}]}],
      [2,{nodes:[1,2,3].map(c=>({chapter:c,value:{...n,desc:n.desc+' '+Array.from({length:c},(_,i)=>`LIBRO 2, CAPÍTULO ${i+1}: Legacy ${i+1}.`).join(' ')}})),links:[],summaries:[1,2,3].map(c=>({chapter:c,value:{chapter:c,title:`Chapter ${c}`,summary:`Legacy ${c}.`}}))}]]) {
      for (const kind of ['nodes','links','summaries']) fs.writeFileSync(`${root}/book${book}/${kind}.js`,A.render(data[kind],kind,book));
    }
    fs.copyFileSync(path.resolve(__dirname,'../characters-core.js'),root+'/characters-core.js');
    fs.writeFileSync(root+'/characters-data.js','const CHARACTER_GUIDES = {};');
    fs.writeFileSync(root+'/book2/chapter 1.xhtml','<html><body>Reviewed source one.</body></html>');
    fn(root);
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
};
test('section ownership follows comments despite chapter references and braces inside prose', () => {
  const text='const nodesBook2 = [\n// Capítulo 1\n{id:"a",desc:"Chapter 99: {not an object}",star:""},\n// LIBRO 2, CAPÍTULO 2\n{id:"b",desc:"escaped \\\" quote"}\n];';
  assert.deepEqual(A.records(text,'nodes',2).map(x=>[x.chapter,x.value.id]),[[1,'a'],[2,'b']]);
});
test('unmarked rewritten descriptions fail instead of discarding unknown content', () => {
  assert.throws(()=>suffix('No source marker','Previous history',2),/Cannot isolate/);
});
test('Book Two replacement keeps all chapters visible and rebases later revisions onto reviewed history', () => fixture(root => {
  main(['init'],root);const before=A.hashes(root);const original=A.loadBook(root,2);
  assert.throws(()=>main(['prepare','2','book2/chapter 1.xhtml'],root),/in order/);
  main(['prepare','1','book2/chapter 1.xhtml'],root);
  const progress=()=>JSON.parse(fs.readFileSync(root+'/book2/rebuild/progress.json'));
  const active=progress().active;assert.deepEqual(A.hashes(root),before);
  assert.equal(A.loadBook(active.run+'/context',2).summaries.length,0,'Future source prose must stay out of drafting context');
  const spec=active.run+'/chapter.json';fs.writeFileSync(spec,JSON.stringify({nodes:[{id:'a',mode:'update',descAppend:'LIBRO 2, CAPÍTULO 1: Reviewed one.',previousState:'Reprocessed source one.'}],links:[],summary:{chapter:1,title:'Reviewed one',summary:'Reviewed source.'}}));
  main(['append-chapter','1',active.baseline,spec],root);
  main(['review-backlog','1',active.baseline,'init',active.run+'/thread-checklist.json'],root);
  const checklist=JSON.parse(fs.readFileSync(active.run+'/thread-checklist.json'));checklist.items.forEach(x=>Object.assign(x,{assessment:'unchanged',evidence:'Fixture source one adds no answer to the observation.',remaining:'Original observation.'}));fs.writeFileSync(active.run+'/thread-checklist.json',JSON.stringify(checklist));
  const completion=active.run+'/completion.json';fs.writeFileSync(completion,JSON.stringify({source:active.source,log:'Chapter 1: Fixture reviewed with later chapters retained.'}));
  assert.throws(()=>main(['finish-chapter','1',completion],root));assert.deepEqual(A.hashes(root),before,'Missing review must leave live data intact');
  for(const [file,marker]of [['ownership-review.md','Ownership review: PASS'],['event-review.md','Event coverage review: PASS'],['thread-review.md','Thread lifecycle review: PASS']])fs.writeFileSync(active.run+'/'+file,marker+'\n');
  main(['finish-chapter','1',completion],root);
  const live=A.loadBook(root,2);assert.equal(live.summaries.length,3);assert.equal(live.summaries[0].value.summary,'Reviewed source.');
  assert.deepEqual(live.summaries.slice(1).map(x=>x.value),original.summaries.slice(1).map(x=>x.value));
  assert.match(live.nodes.at(-1).value.desc,/Reviewed one\..*Legacy 2\..*Legacy 3\./);assert.doesNotMatch(live.nodes.at(-1).value.desc,/Legacy 1/);
  assert.equal(progress().completedChapters.length,1);assert.deepEqual(A.hashes(root),progress().liveHashes);
  assert.throws(()=>main(['finish-chapter','1',completion],root),/Prepare/);
  fs.appendFileSync(root+'/book2/links.js','\n// outside edit');assert.throws(()=>main(['check-chapter','2'],root),/outside reprocessing/);
}));
test('changed chapter sources and baselines are rejected before context operations', () => fixture(root => {
  main(['init'],root); main(['prepare','1','book2/chapter 1.xhtml'],root);
  const state=JSON.parse(fs.readFileSync(root+'/book2/rebuild/progress.json')),before=A.hashes(root);
  const source=root+'/book2/chapter 1.xhtml',text=fs.readFileSync(source);
  fs.appendFileSync(source,'changed');assert.throws(()=>main(['read-latest','1','a'],root),/source changed/);fs.writeFileSync(source,text);
  fs.appendFileSync(state.active.baseline+'/nodes.js','\n// altered');assert.throws(()=>main(['read-latest','1','a'],root),/baseline changed/);
  assert.deepEqual(A.hashes(root),before);
}));
