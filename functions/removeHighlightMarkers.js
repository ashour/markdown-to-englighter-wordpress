function removeHighlightMarkers(codeBlock) {
  const lines = codeBlock.split(/\r?\n/);

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
}

module.exports = removeHighlightMarkers;
