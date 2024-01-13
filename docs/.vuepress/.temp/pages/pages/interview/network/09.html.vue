<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-15 23:13:12
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-15 23:26:59
 * @Description: 
-->
<h1 id="vue-项目中你是如何解决跨域的呢" tabindex="-1"><a class="header-anchor" href="#vue-项目中你是如何解决跨域的呢" aria-hidden="true">#</a> Vue 项目中你是如何解决跨域的呢？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>跨域，是指在浏览器中a页面去请求了b页面的资源，更具体的来说是指a页面和b页面的：协议，主机，端口这三个有一个不同，就是跨域请求。</p>
<p>这种情况在网页开发中是非常常见的。但是，对于特殊的ajax请求，出于安全性的考虑，浏览器对跨域的ajax请求做了限制。</p>
<p>跨域的请求不一定报错（例如：script, css等等）, ajax请求才会报错。</p>
<p>常见的解决方案有 3 种：</p>
<ol>
<li>JSONP: 利用 script 标签，不受跨域限制的特点，缺点是只能支持 get 请求</li>
<li>CORS: 后端设置响应头 Access-Control-Allow-Origin。</li>
<li>代理。在开发阶段，我们可以在 devServer中配置 proxy 项。在项目开发完成上线之后，一般使用 nginx 配置代理转发。</li>
</ol>
<h2 id="同源策略" tabindex="-1"><a class="header-anchor" href="#同源策略" aria-hidden="true">#</a> 同源策略</h2>
<p>跨域本质是浏览器基于<strong>同源策略</strong>的一种安全手段</p>
<p>同源策略（Sameoriginpolicy），是一种约定，它是浏览器最核心也最基本的安全功能</p>
<p>所谓同源（即指在同一个域）具有以下三个相同点</p>
<ul>
<li>协议相同（protocol）</li>
<li>主机相同（host）</li>
<li>端口相同（port）</li>
</ul>
<p>反之非同源请求，也就是协议、端口、主机其中一项不相同的时候，这时候就会产生跨域</p>
<blockquote>
<p>一定要注意跨域是浏览器的限制，你用抓包工具抓取接口数据，是可以看到接口已经把数据返回回来了，只是浏览器的限制，你获取不到数据。用 postman 请求接口能够请求到数据。这些再次印证了跨域是浏览器的限制。</p>
</blockquote>
<h2 id="如何解决" tabindex="-1"><a class="header-anchor" href="#如何解决" aria-hidden="true">#</a> 如何解决</h2>
<p>解决跨域的方法有很多，下面列举了三种：</p>
<ul>
<li>JSONP</li>
<li>CORS</li>
<li>代理</li>
</ul>
<h3 id="jsonp" tabindex="-1"><a class="header-anchor" href="#jsonp" aria-hidden="true">#</a> JSONP</h3>
<p>本质不是 ajax 请求，所有没有同源策略的影响，也就没有跨域错误。</p>
<p>在<code v-pre>vue</code>项目中，我们主要针对<code v-pre>CORS</code>或<code v-pre>Proxy</code>这两种方案进行展开</p>
<h3 id="cors" tabindex="-1"><a class="header-anchor" href="#cors" aria-hidden="true">#</a> CORS</h3>
<p>CORS （Cross-Origin Resource Sharing，跨域资源共享）是一个系统，它由一系列传输的 HTTP 头组成，这些 HTTP 头决定浏览器是否阻止前端 JavaScript 代码获取跨域请求的响应</p>
<p><code v-pre>CORS</code> 实现起来非常方便，只需要增加一些 <code v-pre>HTTP</code> 头，让服务器能声明允许的访问来源</p>
<p>只要后端实现了 <code v-pre>CORS</code>，就实现了跨域</p>
<p>以<code v-pre>koa</code>框架举例</p>
<p>添加中间件，直接设置<code v-pre>Access-Control-Allow-Origin</code>响应头</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  ctx<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Allow-Origin'</span><span class="token punctuation">,</span> <span class="token string">'*'</span><span class="token punctuation">)</span>
  ctx<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Allow-Headers'</span><span class="token punctuation">,</span> <span class="token string">'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'</span><span class="token punctuation">)</span>
  ctx<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Allow-Methods'</span><span class="token punctuation">,</span> <span class="token string">'PUT, POST, GET, DELETE, OPTIONS'</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>method <span class="token operator">==</span> <span class="token string">'OPTIONS'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token number">200</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ps: <code v-pre>Access-Control-Allow-Origin</code> 设置为*其实意义不大，可以说是形同虚设，实际应用中，上线前我们会将<code v-pre>Access-Control-Allow-Origin</code> 值设为我们目标<code v-pre>host</code></p>
<h3 id="proxy" tabindex="-1"><a class="header-anchor" href="#proxy" aria-hidden="true">#</a> Proxy</h3>
<p>代理（Proxy）也称网络代理，是一种特殊的网络服务，允许一个（一般为客户端）通过这个服务与另一个网络终端（一般为服务器）进行非直接的连接。一些网关、路由器等网络设备具备网络代理功能。一般认为代理服务有利于保障网络终端的隐私或安全，防止攻击</p>
<p><strong>方案一</strong></p>
<p>如果是通过<code v-pre>vue-cli</code>脚手架工具搭建项目，我们可以通过<code v-pre>webpack</code>为我们起一个本地服务器作为请求的代理对象</p>
<p>通过该服务器转发请求至目标服务器，得到结果再转发给前端，但是最终发布上线时如果 web 应用和接口服务器不在一起仍会跨域</p>
<p>在<code v-pre>vue.config.js</code>文件，新增以下代码</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>amodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">'127.0.0.1'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">8084</span><span class="token punctuation">,</span>
    <span class="token literal-property property">open</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// vue项目启动时自动打开浏览器</span>
    <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">'/api'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'http://xxx.xxx.xx.xx:8080'</span><span class="token punctuation">,</span> <span class="token comment">//目标地址，一般是指后台服务器地址</span>
        <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">//是否跨域</span>
        <span class="token literal-property property">pathRewrite</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token comment">// pathRewrite 的作用是把实际Request Url中的'/api'用""代替</span>
          <span class="token string-property property">'^/api'</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过<code v-pre>axios</code>发送请求中，配置请求的根路径</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>axios<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>baseURL <span class="token operator">=</span> <span class="token string">'/api'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>方案二</strong></p>
<p>此外，还可通过服务端实现代理请求转发</p>
<p>以<code v-pre>express</code>框架为例</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'http-proxy-middleware'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">'/'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">'/api'</span><span class="token punctuation">,</span> <span class="token function">proxy</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'http://localhost:4000'</span><span class="token punctuation">,</span> <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>方案三</strong></p>
<p>通过配置<code v-pre>nginx</code>实现代理</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>server <span class="token punctuation">{</span>
    listen    <span class="token number">80</span><span class="token punctuation">;</span>
    # server_name www<span class="token punctuation">.</span>josephxia<span class="token punctuation">.</span>com<span class="token punctuation">;</span>
    location <span class="token operator">/</span> <span class="token punctuation">{</span>
        root  <span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>www<span class="token operator">/</span>html<span class="token punctuation">;</span>
        index  index<span class="token punctuation">.</span>html index<span class="token punctuation">.</span>htm<span class="token punctuation">;</span>
        try_files $uri $uri<span class="token operator">/</span> <span class="token operator">/</span>index<span class="token punctuation">.</span>html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    location <span class="token operator">/</span>api <span class="token punctuation">{</span>
        proxy_pass  http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">3000</span><span class="token punctuation">;</span>
        proxy_redirect   off<span class="token punctuation">;</span>
        proxy_set_header  Host       $host<span class="token punctuation">;</span>
        proxy_set_header  <span class="token constant">X</span><span class="token operator">-</span>Real<span class="token operator">-</span><span class="token constant">IP</span>     $remote_addr<span class="token punctuation">;</span>
        proxy_set_header  <span class="token constant">X</span><span class="token operator">-</span>Forwarded<span class="token operator">-</span>For  $proxy_add_x_forwarded_for<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


