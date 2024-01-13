<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-14 22:29:14
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-15 23:16:56
 * @Description: 
-->
<h1 id="spa-单页面" tabindex="-1"><a class="header-anchor" href="#spa-单页面" aria-hidden="true">#</a> SPA 单页面</h1>
<h2 id="spa-spa" tabindex="-1"><a class="header-anchor" href="#spa-spa" aria-hidden="true">#</a> SPA(spa)</h2>
<p>SPA 称为单页应用程序,也就是整个网站只有一个 html 页面</p>
<p>优点: 相对于传统混合式开发,减少了请求体积，加快页面响应速度，降低了对服务器的压力</p>
<p>缺点: 因为技术使用了 ajax，导致页面不利于 SEO，</p>
<h2 id="什么是-spa" tabindex="-1"><a class="header-anchor" href="#什么是-spa" aria-hidden="true">#</a> 什么是 SPA</h2>
<p>SPA（single-page application），翻译过来就是单页应用<code v-pre>SPA</code>是一种网络应用程序或网站的模型，它通过动态重写当前页面来与用户交互，这种方法避免了页面之间切换打断用户体验在单页应用中，所有必要的代码（<code v-pre>HTML</code>、<code v-pre>JavaScript</code>和<code v-pre>CSS</code>）都通过单个页面的加载而检索，或者根据需要（通常是为响应用户操作）动态装载适当的资源并添加到页面页面在任何时间点都不会重新加载，也不会将控制转移到其他页面举个例子来讲就是一个杯子，早上装的牛奶，中午装的是开水，晚上装的是茶，我们发现，变的始终是杯子里的内容，而杯子始终是那个杯子结构如下图</p>
<p><img src="http://fanyouf.gitee.io/interview/vue/asset/df14a5a0-3ac6-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>我们熟知的 JS 框架如<code v-pre>react</code>,<code v-pre>vue</code>,<code v-pre>angular</code>,<code v-pre>ember</code>都属于<code v-pre>SPA</code></p>
<h2 id="spa-和-mpa-的区别" tabindex="-1"><a class="header-anchor" href="#spa-和-mpa-的区别" aria-hidden="true">#</a> SPA 和 MPA 的区别</h2>
<p>上面大家已经对单页面有所了解了，下面来讲讲多页应用 MPA（MultiPage-page application），翻译过来就是多页应用在<code v-pre>MPA</code>中，每个页面都是一个主页面，都是独立的当我们在访问另一个页面的时候，都需要重新加载<code v-pre>html</code>、<code v-pre>css</code>、<code v-pre>js</code>文件，公共文件则根据需求按需加载如下图</p>
<p><img src="https://static.vue-js.com/eeb13aa0-3ac6-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h3 id="单页应用与多页应用的区别" tabindex="-1"><a class="header-anchor" href="#单页应用与多页应用的区别" aria-hidden="true">#</a> 单页应用与多页应用的区别</h3>
<table>
<thead>
<tr>
<th></th>
<th>单页面应用（SPA）</th>
<th>多页面应用（MPA）</th>
</tr>
</thead>
<tbody>
<tr>
<td>组成</td>
<td>一个主页面和多个页面片段</td>
<td>多个主页面</td>
</tr>
<tr>
<td>刷新方式</td>
<td>局部刷新</td>
<td>整页刷新</td>
</tr>
<tr>
<td>url 模式</td>
<td>哈希模式</td>
<td>历史模式</td>
</tr>
<tr>
<td>SEO 搜索引擎优化</td>
<td>难实现，可使用 SSR 方式改善</td>
<td>容易实现</td>
</tr>
<tr>
<td>数据传递</td>
<td>容易</td>
<td>通过 url、cookie、localStorage 等传递</td>
</tr>
<tr>
<td>页面切换</td>
<td>速度快，用户体验良好</td>
<td>切换加载资源，速度慢，用户体验差</td>
</tr>
<tr>
<td>维护成本</td>
<td>相对容易</td>
<td>相对复杂</td>
</tr>
</tbody>
</table>
<h4 id="单页应用优缺点" tabindex="-1"><a class="header-anchor" href="#单页应用优缺点" aria-hidden="true">#</a> 单页应用优缺点</h4>
<p>优点：</p>
<ul>
<li>具有桌面应用的即时性、网站的可移植性和可访问性</li>
<li>用户体验好、快，内容的改变不需要重新加载整个页面</li>
<li>良好的前后端分离，分工更明确</li>
</ul>
<p>缺点：</p>
<ul>
<li>不利于搜索引擎的抓取</li>
<li>首次渲染速度相对较慢</li>
</ul>
</div></template>


