import css from "../css/github-markdown.css"
import css2 from "../css/github.min.css"
import css3 from "katex/dist/katex.min.css"
function Instance(key = "", problem_id = "") {
    const md = require("markdown-it")({
        html: true,
        breaks: true
    });
    const mh = require("markdown-it-highlightjs");
    const mk = require("@ryanlee2014/markdown-it-katex");
    const mc = require("./markdonw-it-table-contents");
    const ma = require("markdown-it-anchor");
    const mi = require("./markdown-it-images-preview");
    md.use(mk);
    md.use(mh);
    md.use(ma);
    md.use(mc, {includeLevel: [1, 2], listType: "div class='ui bulleted link list'"});
    md.use(mi);
    md.use(require("./markdown-it-links"));
    md.use(require("./markdown-it-mermaid").default);

    const markdownPack = (html) => {
        return `<div class="markdown-body">${html}</div>`;
    };

    const preToSegment = (html) => {
        return html.replace(/<pre>[\s\S]+?<\/pre>/g, `<div class='ui segment'>
    <div class="ui top attached label"><a class="copy context">Copy</a></div>$&</div>`)
    };

    const _render = md.render;

    md.render = function () {
        return markdownPack(preToSegment(_render.apply(md, arguments)));
    };

    md.renderRaw = function () {
        return preToSegment(md.renderInline(...arguments));
    };

    return Object.assign(md, {key, problem_id});
}

const md = Instance();
md.newInstance = Instance;
module.exports = md;
