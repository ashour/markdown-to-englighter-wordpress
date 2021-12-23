const { v4: uuidv4 } = require("uuid");

function codeBlockTpl(codeHtml, fileName = "", highightLines = []) {
  const fileNameAttributes =
    fileName === ""
      ? ""
      : `data-enlighter-group="${uuidv4()}"
  data-enlighter-title="${fileName}"`;

  const highlightAttribute =
    highightLines.length === 0
      ? ""
      : `data-enlighter-highlight="${highightLines.join(",")}"`;

  return `<pre class="EnlighterJSRAW"
  data-enlighter-language="generic"
  data-enlighter-linenumbers="false"
  ${fileNameAttributes} ${highlightAttribute}
>${codeHtml}
</pre>`;
}

module.exports = codeBlockTpl;
