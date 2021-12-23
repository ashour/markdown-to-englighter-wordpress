const highlightedLines = require("./highlightedLines");

test("it returns highlighted line numbers", () => {
  const input = `
  **import i18next from "i18next";
  i18next.init(...);
  **function newFunc() {}
  `;

  const output = highlightedLines(input);

  expect(output).toEqual([2, 4]);
});
