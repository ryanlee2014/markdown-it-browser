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

const preToSegment = (html) => {
    return html.replace(/<pre>[\s\S]+?<\/pre>/g,`<div class='ui segment'>
    <div class="ui top attached label"><a class="copy context">Copy</a></div>$&</div>`)
};

const _render = md.render;

md.render = function () {
    return markdownPack(preToSegment(_render.apply(md, arguments)));
};

md.renderRaw = function () {
    return preToSegment(md.renderInline(...arguments));
};

module.exports = md;
