function removeFilename(codeBlock) {
  let filename = "";

  const withFileNameRemoved = codeBlock
    .replace(/^\s*@file:(.+?)$/m, (_, captured) => {
      filename = captured.trim();
      return "";
    })
    .trimLeft();

  return [withFileNameRemoved, filename];
}

module.exports = removeFilename;
