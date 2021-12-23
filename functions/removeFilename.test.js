const removeFilename = require("./removeFilename");

test("it removes the file name from code block", () => {
  const input = `
    @file:/src/scripts.js
    const foo = "bar";`;

  const [output, _] = removeFilename(input);

  expect(output).toBe('const foo = "bar";');
});

test("it returns the file name", () => {
  const input = `
    @file:/src/scripts.js
    const foo = "bar";`;

  const [_, filename] = removeFilename(input);

  expect(filename).toBe("/src/scripts.js");
});
