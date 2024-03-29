<template><div><h1 id="说说-webpack-的热更新是如何做到的-原理是什么" tabindex="-1"><a class="header-anchor" href="#说说-webpack-的热更新是如何做到的-原理是什么" aria-hidden="true">#</a> 说说 webpack 的热更新是如何做到的？原理是什么？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>Hot Module Replacement，简称 HMR，在不需要刷新整个页面的同时更新模块，能够提升开发的效率和体验。热更新时只会局部刷新页面上发生了变化的模块，同时可以保留当前页面的状态，比如复选框的选中状态等。</p>
<p>在 webpack 中配置开启热模块也非常的简单，如下代码：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack'</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 开启 HMR 特性</span>
    <span class="token literal-property property">hot</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token comment">// hotOnly: true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>热更新的实现</p>
<p>webpack-dev-server 启动的时候会做三件事情</p>
<ol>
<li>启动 webpack，生成 compiler 实例，compiler 实例的功能很多，比如用来启动 webpack 的编译工作，监听文件变化等。</li>
<li>使用 Express 启动一个本地服务，使得浏览器可以访问本地服务</li>
<li>启动 websocket 服务，用于浏览器和本地 node 服务进行通讯。</li>
</ol>
<p>监听文件变化</p>
<p>webpack 监听文件变化主要是通过 webpack-dev-middleware 这个库来完成，它负责本地文件的编译、输出和监听 webpack-dev-middleware 中执行了 compiler.watch 方法，它主要做了两件事情</p>
<ol>
<li>对本地文件编译打包</li>
<li>编译结束之后，开启监听，文件发生变化时重新编译，并持续进行监听</li>
</ol>
<p>监听 webpack 编译结束</p>
<p>setupHooks 方法用来注册监听事件，当监听到 webpack 编译结束时，通过 websocket 给浏览器发通知，浏览器拿到 hash 只之后就可以做检查更新逻辑。</p>
<h3 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h3>
<p><img src="https://static.vue-js.com/a076da40-acd4-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p><code v-pre>HMR</code>全称 <code v-pre>Hot Module Replacement</code>，可以理解为模块热替换，指在应用程序运行过程中，替换、添加、删除模块，而无需重新刷新整个应用</p>
<p>例如，我们在应用运行过程中修改了某个模块，通过自动刷新会导致整个应用的整体刷新，那页面中的状态信息都会丢失</p>
<p>如果使用的是 <code v-pre>HMR</code>，就可以实现只将修改的模块实时替换至应用中，不必完全刷新整个应用</p>
<p>在<code v-pre>webpack</code>中配置开启热模块也非常的简单，如下代码：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack'</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 开启 HMR 特性</span>
    <span class="token literal-property property">hot</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token comment">// hotOnly: true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上述这种配置，如果我们修改并保存<code v-pre>css</code>文件，确实能够以不刷新的形式更新到页面中</p>
<p>但是，当我们修改并保存<code v-pre>js</code>文件之后，页面依旧自动刷新了，这里并没有触发热模块</p>
<p>所以，<code v-pre>HMR</code>并不像 <code v-pre>Webpack</code> 的其他特性一样可以开箱即用，需要有一些额外的操作</p>
<p>我们需要去指定哪些模块发生更新时进行<code v-pre>HRM</code>，如下代码：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>module<span class="token punctuation">.</span>hot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  module<span class="token punctuation">.</span>hot<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token string">'./util.js'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'util.js更新了'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、实现原理" tabindex="-1"><a class="header-anchor" href="#二、实现原理" aria-hidden="true">#</a> 二、实现原理</h2>
<p>首先来看看一张图，如下：</p>
<p><img src="https://static.vue-js.com/adc05780-acd4-11eb-ab90-d9ae814b240d.png" alt=""></p>
<ul>
<li>Webpack Compile：将 JS 源代码编译成 bundle.js</li>
<li>HMR Server：用来将热更新的文件输出给 HMR Runtime</li>
<li>Bundle Server：静态资源文件服务器，提供文件访问路径</li>
<li>HMR Runtime：socket 服务器，会被注入到浏览器，更新文件的变化</li>
<li>bundle.js：构建输出的文件</li>
<li>在 HMR Runtime 和 HMR Server 之间建立 websocket，即图上 4 号线，用于实时更新文件变化</li>
</ul>
<p>上面图中，可以分成两个阶段：</p>
<ul>
<li>启动阶段为上图 1 - 2 - A - B</li>
</ul>
<p>在编写未经过<code v-pre>webpack</code>打包的源代码后，<code v-pre>Webpack Compile</code> 将源代码和 <code v-pre>HMR Runtime</code> 一起编译成 <code v-pre>bundle</code>文件，传输给<code v-pre>Bundle Server</code> 静态资源服务器</p>
<ul>
<li>更新阶段为上图 1 - 2 - 3 - 4</li>
</ul>
<p>当某一个文件或者模块发生变化时，<code v-pre>webpack</code>监听到文件变化对文件重新编译打包，编译生成唯一的<code v-pre>hash</code>值，这个<code v-pre>hash</code>值用来作为下一次热更新的标识</p>
<p>根据变化的内容生成两个补丁文件：<code v-pre>manifest</code>（包含了 <code v-pre>hash</code> 和 <code v-pre>chundId</code>，用来说明变化的内容）和<code v-pre>chunk.js</code> 模块</p>
<p>由于<code v-pre>socket</code>服务器在<code v-pre>HMR Runtime</code> 和 <code v-pre>HMR Server</code>之间建立 <code v-pre>websocket</code>链接，当文件发生改动的时候，服务端会向浏览器推送一条消息，消息包含文件改动后生成的<code v-pre>hash</code>值，如下图的<code v-pre>h</code>属性，作为下一次热更细的标识</p>
<p><img src="https://static.vue-js.com/05a0edf0-ad4a-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>在浏览器接受到这条消息之前，浏览器已经在上一次<code v-pre>socket</code> 消息中已经记住了此时的<code v-pre>hash</code> 标识，这时候我们会创建一个 <code v-pre>ajax</code> 去服务端请求获取到变化内容的 <code v-pre>manifest</code> 文件</p>
<p><code v-pre>mainfest</code>文件包含重新<code v-pre>build</code>生成的<code v-pre>hash</code>值，以及变化的模块，对应上图的<code v-pre>c</code>属性</p>
<p>浏览器根据 <code v-pre>manifest</code> 文件获取模块变化的内容，从而触发<code v-pre>render</code>流程，实现局部模块更新</p>
<p><img src="https://static.vue-js.com/0e7b7850-ad4a-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p>关于<code v-pre>webpack</code>热模块更新的总结如下：</p>
<ul>
<li>通过<code v-pre>webpack-dev-server</code>创建两个服务器：提供静态资源的服务（express）和 Socket 服务</li>
<li>express server 负责直接提供静态资源的服务（打包后的资源直接被浏览器请求和解析）</li>
<li>socket server 是一个 websocket 的长连接，双方可以通信</li>
<li>当 socket server 监听到对应的模块发生变化时，会生成两个文件.json（manifest 文件）和.js 文件（update chunk）</li>
<li>通过长连接，socket server 可以直接将这两个文件主动发送给客户端（浏览器）</li>
<li>浏览器拿到两个新的文件后，通过 HMR runtime 机制，加载这两个文件，并且针对修改的模块进行更新</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zhuanlan.zhihu.com/p/138446061</li>
<li>https://github.com/Jocs/jocs.github.io/issues/15</li>
<li>https://juejin.cn/post/6844904134697549832 /</li>
</ul>
</div></template>


