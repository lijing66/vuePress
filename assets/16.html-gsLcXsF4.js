import{_ as o,r as a,o as r,c as s,a as i,d as e,e as l,f as t,b as u}from"./app-du5sw6ua.js";const c={},d=u('<h1 id="vue-use" tabindex="-1"><a class="header-anchor" href="#vue-use" aria-hidden="true">#</a> vue.use</h1><h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2><ul><li><p>【是什么】：Vue.use 是用来注册 Vue 插件的一个函数。</p></li><li><p>【怎么用】：Vue.use(参数)。 参数可以是：</p></li></ul><ol><li>一个对象，必须提供 install 方法。</li><li>一个函数，它会被作为 install 方法。</li></ol><p>install 方法调用时，会将 Vue 作为参数传入。</p>',5),p=e("li",null,[e("p",null,"【注意点】：该方法需要在 new Vue() 之前被调用；当 install 方法被同一个插件多次调用，插件将只会被安装一次。")],-1),_=e("li",null,[e("p",null,"【场景】：通常用来为 Vue 添加全局功能，例如添加全局方法或 property、添加全局指令、注入组件选项、添加实例方法等。")],-1),h={href:"https://v2.cn.vuejs.org/v2/api/#Vue-use",target:"_blank",rel:"noopener noreferrer"},f={href:"https://v2.cn.vuejs.org/v2/guide/plugins.html",target:"_blank",rel:"noopener noreferrer"};function m(v,V){const n=a("ExternalLinkIcon");return r(),s("div",null,[i(`
 * @Author: lijing
 * @Date: 2023-12-14 22:29:14
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-15 23:17:13
 * @Description: 
`),d,e("ul",null,[p,_,e("li",null,[e("p",null,[e("a",h,[l("API (opens new window)"),t(n)])])]),e("li",null,[e("p",null,[e("a",f,[l("开发插件 (opens new window)"),t(n)])])])])])}const x=o(c,[["render",m],["__file","16.html.vue"]]);export{x as default};
