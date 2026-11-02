#!/usr/bin/env python3
"""Extract local chapter HTML and display one bounded page using only stdlib."""
import argparse
import re
from html.parser import HTMLParser
from pathlib import Path


class ChapterText(HTMLParser):
    blocks = {"p", "div", "section", "h1", "h2", "h3", "li", "blockquote", "br"}
    ignored = {"head", "script", "style"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self.hidden = []

    def handle_starttag(self, tag, attrs):
        if tag in self.ignored:
            self.hidden.append(tag)
        if not self.hidden and tag in self.blocks:
            self.parts.append("\n")

    def handle_endtag(self, tag):
        if self.hidden:
            if tag == self.hidden[-1]:
                self.hidden.pop()
        elif tag in self.blocks:
            self.parts.append("\n")

    def handle_data(self, data):
        if not self.hidden:
            # Keep inline text adjacent: <span>G</span>uðvarr, <em>word</em>, etc.
            self.parts.append(re.sub(r"\s+", " ", data))

    def text(self):
        return "\n".join(line.strip() for line in "".join(self.parts).splitlines() if line.strip())


def main():
    args_parser = argparse.ArgumentParser(description=__doc__)
    args_parser.add_argument("file", type=Path)
    args_parser.add_argument("page", type=int)
    args = args_parser.parse_args()
    parser = ChapterText()
    parser.feed(args.file.read_text(encoding="utf-8"))
    parser.close()
    text = parser.text()
    size = 10000
    pages = (len(text) + size - 1) // size
    if not 1 <= args.page <= pages:
        args_parser.error(f"Requested page {args.page}; {pages} pages available")
    print(f"Page {args.page}/{pages}; {len(text)} total characters; {args.file}.")
    print(text[(args.page - 1) * size:args.page * size])
    print(f"CONTINUES: read page {args.page + 1} with the same file." if args.page < pages
          else "END: complete chapter displayed across these pages.")


if __name__ == "__main__":
    main()
