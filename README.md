# Markdown to Englighter WordPress Script

This script will render a Markdown file to HTML, injecting special HTML attributes for the Englighter WordPress code plugin. 

## Installation

You'll need the [Node.js](https://nodejs.org/en/) runtime installed on your machine. With Node in place, just run
the following from the command line, in the project root directory.

```
npm install
```

## Usage

1. Add a Markdown file exported from Ulysses to the `{project_root}/docs` directory. Make sure to name the file `in.md`.
1. Run `npm start`

This should generate a file called `{project_root}/docs/out.html`, the contents of which you can
copy and paste into a WordPress post.

### Code Blocks

This script will not work with indented code blocks. Please mark code blocks with ``` instead.



```
    This will not 
    work.
```


````
```
This will work
fine
```
````

### Enlighter Sugar

This script assumes that you're using the Enlighter WordPress plugin for code highlighting.

You can add the following sugar to your Markdown for automatic conversion to Enlighter data attributes in the generated HTML.

#### File Name as Title

```
@file:src/foo/bar.js
const thing = require("foobar");

// ...
```

The `@file:your_file_name` will get converted to a `data-enlighter-title` attribute so that the file path will show as the
title of the code block. So the above will be rendered as follows.

```html
<pre class="EnlighterJSRAW"
  data-enlighter-language="generic"
  data-enlighter-linenumbers="false"
  data-enlighter-group="a4396d38-4fe5-4b14-9d35-f0a2a57a7be0"
  data-enlighter-title="src/foo/bar.js" 
>
const thing = require("foobar");

// ...
</pre>
```

#### Line Highlights
In a code block, each line marked with `**` will be added to the `data-enlighter-highlight` list attribute so that the line will be higlighted when rendered.

```
let oldCode = lookNormal();

**let newCode = beHighlighted();
**newCode.forEach(line => {
**  line.standOut();
**});
```

The above code will render to the following.

```
<pre class="EnlighterJSRAW"
  data-enlighter-language="generic"
  data-enlighter-linenumbers="false"
   data-enlighter-highlight="3,4,5,6"
>
let oldCode = lookNormal();

let newCode = beHighlighted();
newCode.forEach(line => {
  line.standOut();
});
</pre>
```

>  ✋🏽 _Heads up_ Each `**` will be replaced with an empty string, so make sure
> that your code indentation acts as if the `**`s don't exist at all.

-- Happy coding 🥸🤓
