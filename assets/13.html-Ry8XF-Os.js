import{_ as i,o as l,c as t,a as e,b as n}from"./app-du5sw6ua.js";const r={},o=n('<h1 id="link-和-import-的区别" tabindex="-1"><a class="header-anchor" href="#link-和-import-的区别" aria-hidden="true">#</a> link 和 import 的区别</h1><p>在html中引入外部的CSS有2种方式，link标签和@import，那么它们之间什么区别呢？</p><p>1、从属关系区别</p><ul><li>@import是 CSS 提供的语法规则，只有导入样式表的作用；</li><li>link是HTML提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等。</li></ul><p>2、加载顺序区别</p><ul><li>加载页面时，link标签引入的 CSS 被同时加载；</li><li>@import引入的 CSS 将在页面加载完毕后被加载。</li></ul><p>3、兼容性区别</p><ul><li>@import是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；</li><li>link标签作为 HTML 元素，不存在兼容性问题。</li></ul><p>4、DOM可控性区别</p><ul><li>可以通过 JS 操作 DOM ，插入link标签来改变样式；</li><li>由于 DOM 方法是基于文档的，无法使用@import的方式插入样式。</li></ul>',10);function a(p,c){return l(),t("div",null,[e(`
 * @Author: lijing
 * @Date: 2023-12-12 21:04:49
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-12 22:13:51
 * @Description: 
`),o])}const m=i(r,[["render",a],["__file","13.html.vue"]]);export{m as default};
