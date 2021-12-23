const removeHightlightMarkers = require("./removeHighlightMarkers");

test("it removes the highlight markers from code block", () => {
  const input = `
**function newFunc() {}
// We do some things
**const foo = newFunc();`;

  const output = removeHightlightMarkers(input);

  expect(output).toBe(`
function newFunc() {}
// We do some things
const foo = newFunc();`);
});
