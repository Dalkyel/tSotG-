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
test('compact status exposes resumable routing without prose, hashes or mutations', () => fixture(root => {
  main(['init'], root);
  const progressFile = root + '/book2/rebuild/progress.json';
  const readStatus = () => {
    const before = fs.readFileSync(progressFile), hashes = A.hashes(root), messages = [];
    const log = console.log;
    try { console.log = value => messages.push(value); main(['status'], root); }
    finally { console.log = log; }
    assert.deepEqual(fs.readFileSync(progressFile), before);
    assert.deepEqual(A.hashes(root), hashes);
    assert.equal(messages.length, 1);
    return JSON.parse(messages[0]);
  };
  assert.deepEqual(readStatus(), { status: 'ready', completedCount: 0, nextChapter: 1, visibleChapters: 3, active: null });
  main(['prepare', '1', 'book2/chapter 1.xhtml'], root);
  const active = JSON.parse(fs.readFileSync(progressFile)).active;
  assert.deepEqual(readStatus().active, { chapter: 1, source: active.source, run: active.run, baseline: active.baseline });
  assert.throws(() => main(['status', '1'], root), /Usage/);
  fs.appendFileSync(root + '/book2/links.js', '\n// drift');
  assert.throws(() => main(['status'], root), /outside reprocessing/);
}));
test('completed status has no next chapter and omits historical completion records', () => fixture(root => {
  main(['init'], root);
  const progressFile = root + '/book2/rebuild/progress.json';
  const state = JSON.parse(fs.readFileSync(progressFile));
  Object.assign(state, { status: 'complete', completedChapters: [1, 2, 3], chapters: [{ log: 'Long historical prose', reviews: { hashes: 'internal evidence' } }] });
  fs.writeFileSync(progressFile, JSON.stringify(state));
  const messages = [], log = console.log;
  try { console.log = value => messages.push(value); main(['status'], root); }
  finally { console.log = log; }
  assert.deepEqual(JSON.parse(messages[0]), { status: 'complete', completedCount: 3, nextChapter: null, visibleChapters: 3, active: null });
}));
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
  const reviewDir=root+'/book2/rebuild/reviews/chapter-1';
  fs.mkdirSync(reviewDir,{recursive:true});fs.writeFileSync(reviewDir+'/ownership-review.md','Existing evidence');
  assert.throws(()=>main(['finish-chapter','1',completion],root),/Review evidence already exists/);
  assert.deepEqual(A.hashes(root),before,'Evidence collision must not publish live data');
  assert.equal(progress().completedChapters.length,0);
  fs.rmSync(reviewDir,{recursive:true});
  main(['finish-chapter','1',completion],root);
  const live=A.loadBook(root,2);assert.equal(live.summaries.length,3);assert.equal(live.summaries[0].value.summary,'Reviewed source.');
  assert.deepEqual(live.summaries.slice(1).map(x=>x.value),original.summaries.slice(1).map(x=>x.value));
  assert.match(live.nodes.at(-1).value.desc,/Reviewed one\..*Legacy 2\..*Legacy 3\./);assert.doesNotMatch(live.nodes.at(-1).value.desc,/Legacy 1/);
  assert.equal(progress().completedChapters.length,1);assert.deepEqual(A.hashes(root),progress().liveHashes);
  const evidence=progress().chapters[0].reviews;
  assert.equal(evidence.directory,'book2/rebuild/reviews/chapter-1');
  for(const [file,hash]of Object.entries(evidence.hashes)) {
    const archived=fs.readFileSync(root+'/'+evidence.directory+'/'+file);
    assert.deepEqual(archived,fs.readFileSync(active.run+'/'+file));assert.equal(A.hash(archived),hash);
    fs.rmSync(active.run+'/'+file);
    assert.equal(A.hash(fs.readFileSync(root+'/'+evidence.directory+'/'+file)),hash,'Evidence survives temporary-file removal');
  }
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
test('explicit later reconciliation preserves external identity repairs without changing reference or drafting context', () => fixture(root => {
  fs.writeFileSync(root+'/book2/links.js',A.render([{chapter:2,value:{source:'a',target:'a',label:'Before',type:'rel'}}],'links',2));
  main(['init'],root); main(['prepare','1','book2/chapter 1.xhtml'],root);
  const stateFile=root+'/book2/rebuild/progress.json';
  const initial=JSON.parse(fs.readFileSync(stateFile));
  const immutable=A.hashes(root+'/book2/rebuild/reference');
  const live=A.loadBook(root,2), before=live.nodes[1].value;
  const after={...before,label:'Repaired A',desc:before.desc+' Corrected later source detail.'};
  live.nodes[1].value=after;fs.writeFileSync(root+'/book2/nodes.js',A.render(live.nodes,'nodes',2));
  const linkBefore=live.links[0].value,linkAfter={...linkBefore,label:'Repaired relationship'};
  live.links[0].value=linkAfter;fs.writeFileSync(root+'/book2/links.js',A.render(live.links,'links',2));
  const actual=A.hashes(root), specFile=initial.active.run+'/reconcile.json';
  const spec={log:'User-approved later profile repair.',liveHashes:actual,nodes:[{index:1,chapter:2,before,after}],links:[{index:0,chapter:2,before:linkBefore,after:linkAfter}]};
  const write=spec=>fs.writeFileSync(specFile,JSON.stringify(spec));
  write({...spec,nodes:[{...spec.nodes[0],index:0,chapter:1}]});
  assert.throws(()=>main(['reconcile-later',specFile],root),/Before record/);
  assert.equal(fs.readFileSync(stateFile,'utf8'),JSON.stringify(initial,null,2)+'\n');
  write(spec);main(['reconcile-later',specFile],root);
  assert.deepEqual(A.hashes(root),actual);assert.deepEqual(A.hashes(root+'/book2/rebuild/reference'),immutable);
  assert.equal(A.loadBook(initial.active.run+'/context',2).nodes.length,0,'Future correction stays out of drafting context');
  const state=JSON.parse(fs.readFileSync(stateFile));
  assert.equal(state.reconciliations.length,1);assert.deepEqual(state.liveHashes,actual);
  assert.deepEqual(A.read(root+'/book2/rebuild/reconciled',2,'links')[0].value,linkAfter);
  main(['check-chapter','1'],root);
  const effective=A.loadBook(root+'/book2/rebuild/reference',2);
  effective.nodes=A.read(root+'/book2/rebuild/reconciled',2,'nodes');
  const reviewed={nodes:[{chapter:1,value:{...before,desc:'LIBRO 1, CAPÍTULO 1: original. LIBRO 2, CAPÍTULO 1: Reviewed.'}}],links:[],summaries:[{chapter:1,value:{chapter:1,title:'Reviewed',summary:'Reviewed.'}}]};
  const published=compose(A.loadBook(root,1),effective,reviewed,1);
  assert.match(published.nodes[1].value.desc,/Reviewed\..*Legacy 2\..*Corrected later source detail/);
  assert.equal(published.nodes[1].value.label,'Repaired A');
  fs.appendFileSync(root+'/book2/rebuild/reconciled/book2/nodes.js','\n// drift');
  assert.throws(()=>main(['check-chapter','1'],root),/Reconciled later records changed/);
}));
test('later reconciliation rejects unlisted edits and reviewed prefix changes without mutating state', () => fixture(root => {
  main(['init'],root);
  const stateFile=root+'/book2/rebuild/progress.json',stateText=fs.readFileSync(stateFile,'utf8');
  const live=A.loadBook(root,2),before=live.nodes[1].value,after={...before,label:'New label'};
  live.nodes[1].value=after;live.nodes[2].value={...live.nodes[2].value,label:'Unlisted edit'};
  fs.writeFileSync(root+'/book2/nodes.js',A.render(live.nodes,'nodes',2));
  const specFile=root+'/reconcile.json';
  fs.writeFileSync(specFile,JSON.stringify({log:'Repair',liveHashes:A.hashes(root),nodes:[{index:1,chapter:2,before,after}]}));
  assert.throws(()=>main(['reconcile-later',specFile],root),/Unreviewed node\/link change/);
  assert.equal(fs.readFileSync(stateFile,'utf8'),stateText);
  const state=JSON.parse(stateText);state.completedChapters=[1,2];
  // The guard rejects a correction in an already-reviewed chapter before accepting its content.
  fs.writeFileSync(stateFile,JSON.stringify(state));
  assert.throws(()=>main(['reconcile-later',specFile],root),/reviewed prefix/);
}));
test('audited later chapter reassignment preserves a misplaced future node without importing it into reviewed context', () => fixture(root => {
  const live = A.loadBook(root, 2);
  const future = {id:'b',label:'B',group:'VARG',type:'Personaje',desc:'LIBRO 2, CAPÍTULO 2: Future introduction.',star:''};
  live.nodes.splice(1, 0, {chapter:1,value:future});
  live.links.push({chapter:2,value:{source:'a',target:'b',label:'meets',type:'rel'}});
  for (const kind of ['nodes','links']) fs.writeFileSync(`${root}/book2/${kind}.js`, A.render(live[kind],kind,2));
  main(['init'],root); main(['prepare','1','book2/chapter 1.xhtml'],root);
  const progressFile = root+'/book2/rebuild/progress.json', stateText = fs.readFileSync(progressFile,'utf8');
  const initial = JSON.parse(stateText), immutable = A.hashes(root+'/book2/rebuild/reference');
  live.nodes[1].chapter = 2;
  fs.writeFileSync(root+'/book2/nodes.js',A.render(live.nodes,'nodes',2));
  const specFile = initial.active.run+'/reassignment.json';
  const spec = {log:'Move misplaced future introduction to its evidenced chapter.',liveHashes:A.hashes(root),nodes:[{index:1,chapter:1,afterChapter:2,before:future,after:future}]};
  fs.writeFileSync(specFile,JSON.stringify({...spec,nodes:[{...spec.nodes[0],afterChapter:0}]}));
  assert.throws(()=>main(['reconcile-later',specFile],root),/Invalid later chapter ownership/);
  assert.equal(fs.readFileSync(progressFile,'utf8'),stateText);
  fs.writeFileSync(specFile,JSON.stringify(spec)); main(['reconcile-later',specFile],root);
  assert.deepEqual(A.hashes(root+'/book2/rebuild/reference'),immutable);
  assert.equal(A.loadBook(initial.active.run+'/context',2).nodes.length,0);
  const reference=A.loadBook(root+'/book2/rebuild/reference',2);
  reference.nodes=A.read(root+'/book2/rebuild/reconciled',2,'nodes');
  assert.equal(reference.nodes[1].chapter,2);
  assert.deepEqual(reference.nodes[1].value,future);
  const reviewed={nodes:[live.nodes[0]],links:[],summaries:[live.summaries[0]]};
  const result=compose(A.loadBook(root,1),reference,reviewed,1);
  assert.ok(result.nodes.some(x=>x.chapter===2 && x.value.id==='b'));
  assert.ok(result.links.some(x=>x.value.target==='b'));
  assert.deepEqual(JSON.parse(fs.readFileSync(progressFile)).reconciliations[0].chapters,[1,2]);
}));
