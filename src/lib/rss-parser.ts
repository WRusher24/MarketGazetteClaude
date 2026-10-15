import Parser from "rss-parser";

let parserInstance: Parser | null = null;

export function getRSSParser(): Parser {
  if (!parserInstance) {
    parserInstance = new Parser({
      customFields: {
        item: ["enclosure", "contentSnippet"],
      },
    });
  }
  return parserInstance;
}

export const rssParser = getRSSParser();
