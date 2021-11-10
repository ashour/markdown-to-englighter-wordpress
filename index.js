const inputFilePath = "./docs/in.md";
const outputFilePath = "./docs/out.html";
const truncatedPreviewLengthInCharacters = 1000;

const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const converter = require("markdown-it")({
  html: true,
  highlight: (str) => {
    const [withFileNameRemoved, fileName] =
      removeFileName(str);

    const highlights = highlightedLines(
      withFileNameRemoved,
    );

    const withHighlightMarkersRemoved =
      removeHighlightMarkers(withFileNameRemoved);

    const codeHtml = converter.utils.escapeHtml(
      withHighlightMarkersRemoved,
    );

    return codeBlockTpl(codeHtml, fileName, highlights);
  },
});

const codeBlockTpl = (
  codeHtml,
  fileName = "",
  highightLines = [],
) => {
  const fileNameAttributes =
    fileName === ""
      ? ""
      : `data-enlighter-group="${uuidv4()}"
  data-enlighter-title="${fileName}"`;

  const highlightAttribute =
    highightLines.length === 0
      ? ""
      : `data-enlighter-highlight="${highightLines.join(
          ",",
        )}"`;

  return `<pre class="EnlighterJSRAW"
  data-enlighter-language="generic"
  data-enlighter-linenumbers="false"
  ${fileNameAttributes} ${highlightAttribute}
>${codeHtml}
</pre>`;
};

const removeFileName = (str) => {
  let fileName = "";

  const withFileNameRemoved = str
    .replace(/^\s*@file:(.+?)$/m, (_, captured) => {
      fileName = captured.trim();
      return "";
    })
    .trimLeft();

  return [withFileNameRemoved, fileName];
};

const highlightedLines = (str) => {
  const lines = str.split(/\r?\n/);

  const result = [];

  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].trimLeft().startsWith("**")) {
      result.push(i + 1);
    }
  }

  return result;
};

const removeHighlightMarkers = (str) => {
  const lines = str.split(/\r?\n/);

  const result = [];

  for (let i = 0; i < lines.length; i += 1) {
    const currentLine = lines[i];

    if (currentLine.trimLeft().startsWith("**")) {
      result.push(currentLine.replace("**", ""));
    } else {
      result.push(currentLine);
    }
  }

  return result.join("\n");
};

const markdown = fs.readFileSync(inputFilePath).toString();

const html = converter.render(markdown);

console.log("HTML rendered successfully.\n");
console.log(
  `Render Preview (first ${truncatedPreviewLengthInCharacters} characters)`,
);
console.log("──>");
console.log(
  html.substring(0, truncatedPreviewLengthInCharacters),
);
console.log("<──");

fs.writeFileSync(outputFilePath, html);

console.log(`\nFull render written to ${outputFilePath}\n`);
