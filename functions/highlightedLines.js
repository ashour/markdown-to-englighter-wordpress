function highlightedLines(codeBlock) {
  const lines = codeBlock.split(/\r?\n/);

  const result = [];

  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].trimLeft().startsWith("**")) {
      result.push(i + 1);
    }
  }

  return result;
}

module.exports = highlightedLines;
