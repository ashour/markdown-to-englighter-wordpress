const replaceImagesWithPlaceholders = require("./replaceImagesWithPlaceholders");

test("it replaces img tags with highlighted placeholders", () => {
  const input = `
    <img src="foo.png">
    <p>Some more text</p>
    <img src="bar.png">
  `;

  const output = replaceImagesWithPlaceholders(input);

  expect(output).toBe(`
    <div><strong style="color: pink;">📸 foo.png</strong></div>
    <p>Some more text</p>
    <div><strong style="color: pink;">📸 bar.png</strong></div>
  `);
});

test("it keeps alt tag values in placeholders", () => {
  const input = `
    <img src="foo.png" alt="Picture of a foo">
  `;

  const output = replaceImagesWithPlaceholders(input);

  expect(output).toBe(`
    <div><strong style="color: pink;">📸 foo.png (Picture of a foo)</strong></div>
  `);
});

test("it ignores alt tag if it's the same as the file name", () => {
  const input = `
    <img src="foo.png" alt="foo.png">
  `;

  const output = replaceImagesWithPlaceholders(input);

  expect(output).toBe(`
    <div><strong style="color: pink;">📸 foo.png</strong></div>
  `);
});

test("it can take a custom highlight color for placeholders", () => {
  const input = '<img src="foo.png">';

  const output = replaceImagesWithPlaceholders(input, "#ff0000");

  expect(output).toBe(
    '<div><strong style="color: #ff0000;">📸 foo.png</strong></div>'
  );
});
