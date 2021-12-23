const inputFilePath = "./docs/in.md";
const outputFilePath = "./docs/out.html";
const truncatedPreviewLengthInCharacters = 1000;

const fs = require("fs");
const removeFilename = require("./functions/removeFilename");
const highlightedLines = require("./functions/highlightedLines");
const removeHighlightMarkers = require("./functions/removeHighlightMarkers");
const codeBlockTpl = require("./functions/codeBlockTpl");

const converter = require("markdown-it")({
  html: true,
  highlight: (codeBlock) => {
    const [withFileNameRemoved, fileName] = removeFilename(codeBlock);

    const highlights = highlightedLines(withFileNameRemoved);

    const withHighlightMarkersRemoved =
      removeHighlightMarkers(withFileNameRemoved);

    const codeHtml = converter.utils.escapeHtml(withHighlightMarkersRemoved);

    return codeBlockTpl(codeHtml, fileName, highlights);
  },
});

const markdown = fs.readFileSync(inputFilePath).toString();

const html = converter.render(markdown);

console.log("HTML rendered successfully.\n");
console.log(
  `Render Preview (first ${truncatedPreviewLengthInCharacters} characters)`
);
console.log("──>");
console.log(html.substring(0, truncatedPreviewLengthInCharacters));
console.log("<──");

fs.writeFileSync(outputFilePath, html);

console.log(`\nFull render written to ${outputFilePath}\n`);
