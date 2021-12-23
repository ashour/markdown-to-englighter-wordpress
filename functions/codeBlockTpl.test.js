const { validate: uuidValidate } = require("uuid");
const cheerio = require("cheerio");
const codeBlockTpl = require("./codeBlockTpl");

test("it creates a <pre> with common Enlighter attrs", () => {
  const input = 'const foo = "bar";';

  const output = htmlFor(codeBlockTpl(input));

  expect(output).toBe(
    `<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-linenumbers="false">const foo = "bar";
</pre>`
  );
});

test("it adds a uuid as an Enlighter group if given a file name", () => {
  const input = 'const foo = "bar";';

  const doc = documentFor(codeBlockTpl(input, "/src/scripts.js"));

  expect(uuidValidate(doc("pre").attr("data-enlighter-group"))).toBe(true);
});

test("it adds the file name as an Enlighter title", () => {
  const input = 'const foo = "bar";';

  const doc = documentFor(codeBlockTpl(input, "/src/scripts.js"));

  expect(doc("pre").attr("data-enlighter-title")).toBe("/src/scripts.js");
});

test("it adds highlighted lines as an Enlighter highlight attr", () => {
  const input = `
const foo = "bar";
const bar = "baz";
const man = "chu";`;

  const doc = documentFor(codeBlockTpl(input, "", [2, 3]));

  expect(doc("pre").attr("data-enlighter-highlight")).toBe("2,3");
});

function htmlFor(input) {
  return elementFor(input).html();
}

function elementFor(input) {
  return cheerio.load(input, null, false).root();
}

function documentFor(input) {
  return cheerio.load(input);
}

// escaping?
