<template><div><h1 id="说说-webpack-proxy-工作原理-为什么能解决跨域" tabindex="-1"><a class="header-anchor" href="#说说-webpack-proxy-工作原理-为什么能解决跨域" aria-hidden="true">#</a> 说说 webpack proxy 工作原理？为什么能解决跨域?</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>proxy 工作原理实质上是利用 http-proxy-middleware 这个 http 代理中间件，实现请求转发给其他服务器</p>
<p>举个例子：</p>
<p>在开发阶段，本地地址为 http://localhost:3000，该浏览器发送一个前缀带有/api 标识的请求到服务端获取数据，但响应这个请求的服务器只是将请求转发到另一台服务器中</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'http-proxy-middleware'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">'/api'</span><span class="token punctuation">,</span> <span class="token function">proxy</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'http://www.example.org'</span><span class="token punctuation">,</span> <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span>

<span class="token comment">// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意： 跨域是因为浏览器的同源策略，而服务器和服务器之间不存在跨域问题</p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><code v-pre>webpack proxy</code>，即<code v-pre>webpack</code>提供的代理服务</p>
<p>基本行为就是接收客户端发送的请求后转发给其他服务器</p>
<p>其目的是为了便于开发者在开发模式下解决跨域问题（浏览器安全策略限制）</p>
<p>想要实现代理首先需要一个中间服务器，<code v-pre>webpack</code>中提供服务器的工具为<code v-pre>webpack-dev-server</code></p>
<h4 id="webpack-dev-server" tabindex="-1"><a class="header-anchor" href="#webpack-dev-server" aria-hidden="true">#</a> webpack-dev-server</h4>
<p><code v-pre>webpack-dev-server</code>是 <code v-pre>webpack</code> 官方推出的一款开发工具，将自动编译和自动刷新浏览器等一系列对开发友好的功能全部集成在了一起</p>
<p>目的是为了提高开发者日常的开发效率，<strong>只适用在开发阶段</strong></p>
<p>关于配置方面，在<code v-pre>webpack</code>配置对象属性中通过<code v-pre>devServer</code>属性提供，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// ./webpack.config.js</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">contentBase</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'dist'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">compress</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">9000</span><span class="token punctuation">,</span>
    <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">'/api'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'https://api.github.com'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>devServetr</code>里面<code v-pre>proxy</code>则是关于代理的配置，该属性为对象的形式，对象中每一个属性就是一个代理的规则匹配</p>
<p>属性的名称是需要被代理的请求路径前缀，一般为了辨别都会设置前缀为<code v-pre>/api</code>，值为对应的代理匹配规则，对应如下：</p>
<ul>
<li>target：表示的是代理到的目标地址</li>
<li>pathRewrite：默认情况下，我们的 /api-hy 也会被写入到 URL 中，如果希望删除，可以使用 pathRewrite</li>
<li>secure：默认情况下不接收转发到 https 的服务器上，如果希望支持，可以设置为 false</li>
<li>changeOrigin：它表示是否更新代理后请求的 headers 中 host 地址</li>
</ul>
<h2 id="二、工作原理" tabindex="-1"><a class="header-anchor" href="#二、工作原理" aria-hidden="true">#</a> 二、工作原理</h2>
<p><code v-pre>proxy</code>工作原理实质上是利用<code v-pre>http-proxy-middleware</code> 这个<code v-pre>http</code>代理中间件，实现请求转发给其他服务器</p>
<p>举个例子：</p>
<p>在开发阶段，本地地址为<code v-pre>http://localhost:3000</code>，该浏览器发送一个前缀带有<code v-pre>/api</code>标识的请求到服务端获取数据，但响应这个请求的服务器只是将请求转发到另一台服务器中</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'http-proxy-middleware'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">'/api'</span><span class="token punctuation">,</span> <span class="token function">proxy</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'http://www.example.org'</span><span class="token punctuation">,</span> <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span>

<span class="token comment">// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、跨域" tabindex="-1"><a class="header-anchor" href="#三、跨域" aria-hidden="true">#</a> 三、跨域</h2>
<p>在开发阶段， <code v-pre>webpack-dev-server</code> 会启动一个本地开发服务器，所以我们的应用在开发阶段是独立运行在 <code v-pre>localhost</code>的一个端口上，而后端服务又是运行在另外一个地址上</p>
<p>所以在开发阶段中，由于浏览器同源策略的原因，当本地访问后端就会出现跨域请求的问题</p>
<p>通过设置<code v-pre>webpack proxy</code>实现代理请求后，相当于浏览器与服务端中添加一个代理者</p>
<p>当本地发送请求的时候，代理服务器响应该请求，并将请求转发到目标服务器，目标服务器响应数据后再将数据返回给代理服务器，最终再由代理服务器将数据响应给本地</p>
<p><img src="https://static.vue-js.com/65b5e5c0-ace5-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>在代理服务器传递数据给本地浏览器的过程中，两者同源，并不存在跨域行为，这时候浏览器就能正常接收数据</p>
<p>注意：<strong>服务器与服务器之间请求数据并不会存在跨域行为，跨域行为是浏览器安全策略限制</strong></p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://webpack.docschina.org/configuration/dev-server/#devserverproxy</li>
</ul>
</div></template>


