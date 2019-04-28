import css from "../css/github-markdown.css"
import css2 from "../css/github.min.css"
import css3 from "katex/dist/katex.min.css"
import markdownItMermaid from 'markdown-it-mermaid/src/index'
import mh from "markdown-it-highlightjs"
import mk from "@ryanlee2014/markdown-it-katex"
import mc from "./markdonw-it-table-contents"
import ma from "markdown-it-anchor"
import mi from "./markdown-it-images-preview"
import ml from "./markdown-it-links"
function Instance(key = "", problem_id = "") {
    const md = require("markdown-it")({
        html: true,
        breaks: true
    });
    md.use(mk);
    md.use(mh);
    md.use(ma);
    md.use(mc, {includeLevel: [1, 2], listType: "div class='ui bulleted link list'"});
    md.use(mi);
    md.use(ml);
    md.use(markdownItMermaid);

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
