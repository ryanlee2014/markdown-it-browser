import css from "../css/github-markdown.css"
import css2 from "../css/github.min.css"

const md = require("markdown-it")({
    html: true,
    breaks: true
});
const mh = require("markdown-it-highlightjs");
const mk = require("@ryanlee2014/markdown-it-katex");
md.use(mk);
md.use(mh);
const markdownPack = (html) => {
    return `<div class="markdown-body">${html}</div>`;
};

const _render = md.render;

md.render = function () {
    return markdownPack(_render.apply(md, arguments));
};

md.renderRaw = function () {
    return md.renderInline(...arguments);
};

module.exports = md;
