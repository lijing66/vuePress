<template><div><h1 id="说说地址栏输入-url-敲下回车后发生了什么" tabindex="-1"><a class="header-anchor" href="#说说地址栏输入-url-敲下回车后发生了什么" aria-hidden="true">#</a> 说说地址栏输入 URL 敲下回车后发生了什么?</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>例如当我们在 web 浏览器的地址栏中输入：www.baidu.com，具体发生了：</p>
<ol>
<li>对www.baidu.com这个网址进行DNS域名解析，得到对应的IP地址</li>
<li>根据这个 IP，找到对应的服务器，发起 TCP 的三次握手</li>
<li>建立 TCP 连接后, 发起 HTTP 请求</li>
<li>服务器响应 HTTP 请求，浏览器得到 html 代码</li>
<li>浏览器解析 html 代码，并请求 html 代码中的资源（如 js、css、图片等）（先得到 html 代码，才能去找这些资源）</li>
<li>服务器响应对应的资源</li>
<li>响应数据完毕, 四次挥手，关闭 TCP 连接</li>
<li>浏览器对页面进行渲染呈现给用户</li>
</ol>
<h2 id="简单分析" tabindex="-1"><a class="header-anchor" href="#简单分析" aria-hidden="true">#</a> 简单分析</h2>
<p>简单的分析，从输入 <code v-pre>URL</code>到回车后发生的行为如下：</p>
<ul>
<li>URL 解析</li>
<li>DNS 查询</li>
<li>TCP 连接</li>
<li>HTTP 请求</li>
<li>响应请求</li>
<li>页面渲染</li>
</ul>
<h2 id="详细分析" tabindex="-1"><a class="header-anchor" href="#详细分析" aria-hidden="true">#</a> 详细分析</h2>
<h3 id="url-解析" tabindex="-1"><a class="header-anchor" href="#url-解析" aria-hidden="true">#</a> URL 解析</h3>
<p>首先判断你输入的是一个合法的<code v-pre>URL</code> 还是一个待搜索的关键词，并且根据你输入的内容进行对应操作</p>
<p><code v-pre>URL</code>的解析第过程中的第一步，一个<code v-pre>url</code>的结构解析如下：</p>
<p><img src="https://static.vue-js.com/27a0c690-bdf4-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h3 id="dns-查询" tabindex="-1"><a class="header-anchor" href="#dns-查询" aria-hidden="true">#</a> DNS 查询</h3>
<p>在之前文章中讲过<code v-pre>DNS</code>的查询，这里就不再讲述了</p>
<p>整个查询过程如下图所示：</p>
<p><img src="https://static.vue-js.com/330fb770-bdf4-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>最终，获取到了域名对应的目标服务器<code v-pre>IP</code>地址</p>
<h3 id="tcp-连接" tabindex="-1"><a class="header-anchor" href="#tcp-连接" aria-hidden="true">#</a> TCP 连接</h3>
<p>在之前文章中，了解到<code v-pre>tcp</code>是一种面向有连接的传输层协议</p>
<p>在确定目标服务器服务器的<code v-pre>IP</code>地址后，则经历三次握手建立<code v-pre>TCP</code>连接，流程如下：</p>
<p><img src="https://static.vue-js.com/ad750790-bdf4-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h3 id="发送-http-请求" tabindex="-1"><a class="header-anchor" href="#发送-http-请求" aria-hidden="true">#</a> 发送 http 请求</h3>
<p>当建立<code v-pre>tcp</code>连接之后，就可以在这基础上进行通信，浏览器发送 <code v-pre>http</code> 请求到目标服务器</p>
<p>请求的内容包括：</p>
<ul>
<li>请求行</li>
<li>请求头</li>
<li>请求主体</li>
</ul>
<p><img src="https://static.vue-js.com/bbcb60f0-bdf4-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h3 id="响应请求" tabindex="-1"><a class="header-anchor" href="#响应请求" aria-hidden="true">#</a> 响应请求</h3>
<p>当服务器接收到浏览器的请求之后，就会进行逻辑操作，处理完成之后返回一个<code v-pre>HTTP</code>响应消息，包括：</p>
<ul>
<li>状态行</li>
<li>响应头</li>
<li>响应正文</li>
</ul>
<p><img src="https://static.vue-js.com/c5fe0140-bdf4-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>在服务器响应之后，由于现在<code v-pre>http</code>默认开始长连接<code v-pre>keep-alive</code>，当页面关闭之后，<code v-pre>tcp</code>链接则会经过四次挥手完成断开</p>
<h3 id="页面渲染" tabindex="-1"><a class="header-anchor" href="#页面渲染" aria-hidden="true">#</a> 页面渲染</h3>
<p>当浏览器接收到服务器响应的资源后，首先会对资源进行解析：</p>
<ul>
<li>查看响应头的信息，根据不同的指示做对应处理，比如重定向，存储 cookie，解压 gzip，缓存资源等等</li>
<li>查看响应头的 Content-Type 的值，根据不同的资源类型采用不同的解析方式</li>
</ul>
<p>关于页面的渲染过程如下：</p>
<ul>
<li>解析 HTML，构建 DOM 树</li>
<li>解析 CSS ，生成 CSS 规则树</li>
<li>合并 DOM 树和 CSS 规则，生成 render 树</li>
<li>布局 render 树（ Layout / reflow ），负责各元素尺寸、位置的计算</li>
<li>绘制 render 树（ paint ），绘制页面像素信息</li>
<li>浏览器会将各层的信息发送给 GPU，GPU 会将各层合成（ composite ），显示在屏幕上</li>
</ul>
<p><img src="https://static.vue-js.com/db7bddd0-bdf4-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://github.com/febobo/web-interview/issues/141</li>
<li>https://zhuanlan.zhihu.com/p/80551769</li>
</ul>
</div></template>


