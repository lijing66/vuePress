<template><div><h1 id="说一下-get-和-post-的区别" tabindex="-1"><a class="header-anchor" href="#说一下-get-和-post-的区别" aria-hidden="true">#</a> 说一下 GET 和 POST 的区别？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>GET 方法 POST 方法</p>
<p>数据传输⽅式：get 通过 URL 传输数据 (地址栏拼接参数)， post 通过请求体传输；</p>
<p>数据安全: get 数据暴露在 URL 中，可通过浏览历史记录、缓存等很容易查到数据信息; post 数据因为在请求主体内，所以有⼀定的安全性保证。</p>
<p>数据类型: get 只允许 ASCII 字符; post ⽆限制</p>
<p>GET ⽆害 刷新、后退等浏览器操作是⽆害的; post 可能会引起重复提交表单</p>
<p>get是安全且幂等（这⾥的安全是指只读特性，就是使⽤这个⽅法不会引起服务器状态变化。 幂等的概念是指同⼀个请求⽅法执⾏多次和仅执⾏⼀次的效果完全相同） post是⾮安全(会引起服务器端的变化)、⾮幂等</p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><code v-pre>GET</code>和<code v-pre>POST</code>，两者是<code v-pre>HTTP</code>协议中发送请求的方法</p>
<h4 id="get" tabindex="-1"><a class="header-anchor" href="#get" aria-hidden="true">#</a> GET</h4>
<p><code v-pre>GET</code>方法请求一个指定资源的表示形式，使用 GET 的请求应该只被用于获取数据</p>
<h4 id="post" tabindex="-1"><a class="header-anchor" href="#post" aria-hidden="true">#</a> POST</h4>
<p><code v-pre>POST</code>方法用于将实体提交到指定的资源，通常导致在服务器上的状态变化或<strong>副作用</strong></p>
<p>本质上都是<code v-pre>TCP</code>链接，并无差别</p>
<p>但是由于<code v-pre>HTTP</code>的规定和浏览器/服务器的限制，导致他们在应用过程中会体现出一些区别</p>
<h2 id="二、区别" tabindex="-1"><a class="header-anchor" href="#二、区别" aria-hidden="true">#</a> 二、区别</h2>
<p>从<code v-pre>w3schools</code>得到的标准答案的区别如下：</p>
<ul>
<li>GET 在浏览器回退时是无害的，而 POST 会再次提交请求。</li>
<li>GET 产生的 URL 地址可以被 Bookmark，而 POST 不可以。</li>
<li>GET 请求会被浏览器主动 cache，而 POST 不会，除非手动设置。</li>
<li>GET 请求只能进行 url 编码，而 POST 支持多种编码方式。</li>
<li>GET 请求参数会被完整保留在浏览器历史记录里，而 POST 中的参数不会被保留。</li>
<li>GET 请求在 URL 中传送的参数是有长度限制的，而 POST 没有。</li>
<li>对参数的数据类型，GET 只接受 ASCII 字符，而 POST 没有限制。</li>
<li>GET 比 POST 更不安全，因为参数直接暴露在 URL 上，所以不能用来传递敏感信息。</li>
<li>GET 参数通过 URL 传递，POST 放在 Request body 中</li>
</ul>
<h3 id="参数位置" tabindex="-1"><a class="header-anchor" href="#参数位置" aria-hidden="true">#</a> 参数位置</h3>
<p>貌似从上面看到<code v-pre>GET</code>与<code v-pre>POST</code>请求区别非常大，但两者实质并没有区别</p>
<p>无论 <code v-pre>GET</code>还是 <code v-pre>POST</code>，用的都是同一个传输层协议，所以在传输上没有区别</p>
<p>当不携带参数的时候，两者最大的区别为第一行方法名不同</p>
<blockquote>
<p>POST /uri HTTP/1.1 \r\n</p>
<p>GET /uri HTTP/1.1 \r\n</p>
</blockquote>
<p>当携带参数的时候，我们都知道<code v-pre>GET</code>请求是放在<code v-pre>url</code>中，<code v-pre>POST</code>则放在<code v-pre>body</code>中</p>
<p><code v-pre>GET</code> 方法简约版报文是这样的</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token constant">GET</span> <span class="token operator">/</span>index<span class="token punctuation">.</span>html<span class="token operator">?</span>name<span class="token operator">=</span>qiming<span class="token punctuation">.</span>c<span class="token operator">&amp;</span>age<span class="token operator">=</span><span class="token number">22</span> <span class="token constant">HTTP</span><span class="token operator">/</span><span class="token number">1.1</span>
<span class="token literal-property property">Host</span><span class="token operator">:</span> localhost
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>POST</code>方法简约版报文是这样的</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token constant">POST</span> <span class="token operator">/</span>index<span class="token punctuation">.</span>html <span class="token constant">HTTP</span><span class="token operator">/</span><span class="token number">1.1</span>
<span class="token literal-property property">Host</span><span class="token operator">:</span> localhost
Content<span class="token operator">-</span>Type<span class="token operator">:</span> application<span class="token operator">/</span>x<span class="token operator">-</span>www<span class="token operator">-</span>form<span class="token operator">-</span>urlencoded

name<span class="token operator">=</span>qiming<span class="token punctuation">.</span>c<span class="token operator">&amp;</span>age<span class="token operator">=</span><span class="token number">22</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：这里只是约定，并不属于<code v-pre>HTTP</code>规范，相反的，我们可以在<code v-pre>POST</code>请求中<code v-pre>url</code>中写入参数，或者<code v-pre>GET</code>请求中的<code v-pre>body</code>携带参数</p>
<h3 id="参数长度" tabindex="-1"><a class="header-anchor" href="#参数长度" aria-hidden="true">#</a> 参数长度</h3>
<p><code v-pre>HTTP</code>协议没有<code v-pre>Body</code>和 <code v-pre>URL</code> 的长度限制，对 <code v-pre>URL</code>限制的大多是浏览器和服务器的原因</p>
<p><code v-pre>IE</code>对<code v-pre>URL</code>长度的限制是 2083 字节(2K+35)。对于其他浏览器，如 Netscape、FireFox 等，理论上没有长度限制，其限制取决于操作系统的支持</p>
<p>这里限制的是整个<code v-pre>URL</code>长度，而不仅仅是参数值的长度</p>
<p>服务器处理长<code v-pre>URL</code> 要消耗比较多的资源，为了性能和安全考虑，会给 <code v-pre>URL</code> 长度加限制</p>
<h3 id="安全" tabindex="-1"><a class="header-anchor" href="#安全" aria-hidden="true">#</a> 安全</h3>
<p><code v-pre>POST</code>比<code v-pre>GET</code> 安全，因为数据在地址栏上不可见</p>
<p>然而，从传输的角度来说，他们都是不安全的，因为<code v-pre>HTTP</code> 在网络上是明文传输的，只要在网络节点上捉包，就能完整地获取数据报文</p>
<p>只有使用<code v-pre>HTTPS</code>才能加密安全</p>
<h3 id="数据包" tabindex="-1"><a class="header-anchor" href="#数据包" aria-hidden="true">#</a> 数据包</h3>
<p>对于<code v-pre>GET</code>方式的请求，浏览器会把<code v-pre>http header</code>和<code v-pre>data</code>一并发送出去，服务器响应 200（返回数据）</p>
<p>对于<code v-pre>POST</code>，浏览器先发送<code v-pre>header</code>，服务器响应 100 <code v-pre>continue</code>，浏览器再发送<code v-pre>data</code>，服务器响应 200 ok</p>
<p>并不是所有浏览器都会在<code v-pre>POST</code>中发送两次包，<code v-pre>Firefox</code>就只发送一次</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://mp.weixin.qq.com/s?__biz=MzI3NzIzMzg3Mw==&amp;mid=100000054&amp;idx=1&amp;sn=71f6c214f3833d9ca20b9f7dcd9d33e4#rd</li>
<li>https://blog.fundebug.com/2019/02/22/compare-http-method-get-and-post/</li>
<li>https://www.w3school.com.cn/tags/html_ref_httpmethods.asp</li>
</ul>
</div></template>


