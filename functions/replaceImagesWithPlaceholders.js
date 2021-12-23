const cheerio = require("cheerio");

function replaceImagesWithPlaceholders(html, highlightColor = "pink") {
  const doc = cheerio.load(html, null, false);

  doc("img").each((i, el) => {
    const node = doc(el);

    const src = node.attr("src");

    const alt = node.attr("alt");
    const altReplacement = !alt || src.startsWith(alt) ? "" : ` (${alt})`;

    node.replaceWith(
      doc(
        `<div><strong style="color: ${highlightColor};">📸 ${src}${altReplacement}</strong></div>`
      )
    );
  });

  return doc.root().html();
}

module.exports = replaceImagesWithPlaceholders;
