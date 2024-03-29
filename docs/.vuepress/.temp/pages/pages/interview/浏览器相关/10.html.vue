<template><div><h1 id="javascript本地存储的方式有哪些-区别及应用场景" tabindex="-1"><a class="header-anchor" href="#javascript本地存储的方式有哪些-区别及应用场景" aria-hidden="true">#</a> Javascript本地存储的方式有哪些？区别及应用场景？</h1>
<h2 id="持久化" tabindex="-1"><a class="header-anchor" href="#持久化" aria-hidden="true">#</a> 持久化</h2>
<p>持久化，也叫<code v-pre>javaScript</code>本地缓存，它要解决的问题是：页面刷新之后，数据不丢失。</p>
<p>的方法我们主要讲述以下四种：</p>
<ul>
<li>cookie</li>
<li>sessionStorage</li>
<li>localStorage</li>
<li>indexedDB</li>
</ul>
<h3 id="cookie" tabindex="-1"><a class="header-anchor" href="#cookie" aria-hidden="true">#</a> cookie</h3>
<p><code v-pre>Cookie</code>，类型为「小型文本文件」，指某些网站为了辨别用户身份而储存在用户本地终端上的数据。是为了解决 <code v-pre>HTTP</code>无状态导致的问题</p>
<p>作为一段一般不超过 4KB 的小型文本数据，它由一个名称（Name）、一个值（Value）和其它几个用于控制 <code v-pre>cookie</code>有效期、安全性、使用范围的可选属性组成</p>
<p>但是<code v-pre>cookie</code>在每次请求中都会被发送，如果不使用 <code v-pre>HTTPS</code>并对其加密，其保存的信息很容易被窃取，导致安全风险。举个例子，在一些使用 <code v-pre>cookie</code>保持登录态的网站上，如果 <code v-pre>cookie</code>被窃取，他人很容易利用你的 <code v-pre>cookie</code>来假扮成你登录网站</p>
<p>关于<code v-pre>cookie</code>常用的属性如下：</p>
<ul>
<li>Expires 用于设置 Cookie 的过期时间</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Expires<span class="token operator">=</span>Wed<span class="token punctuation">,</span> <span class="token number">21</span> Oct <span class="token number">2015</span> <span class="token number">07</span><span class="token operator">:</span><span class="token number">28</span><span class="token operator">:</span><span class="token number">00</span> <span class="token constant">GMT</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>Max-Age 用于设置在 Cookie 失效之前需要经过的秒数（优先级比<code v-pre>Expires</code>高）</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Max<span class="token operator">-</span>Age<span class="token operator">=</span><span class="token number">604800</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>Domain</code>指定了 <code v-pre>Cookie</code> 可以送达的主机名</li>
<li><code v-pre>Path</code>指定了一个 <code v-pre>URL</code>路径，这个路径必须出现在要请求的资源的路径中才可以发送 <code v-pre>Cookie</code> 首部</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Path<span class="token operator">=</span><span class="token operator">/</span>docs   # <span class="token operator">/</span>docs<span class="token operator">/</span>Web<span class="token operator">/</span> 下的资源会带 Cookie 首部
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>标记为 <code v-pre>Secure</code>的 <code v-pre>Cookie</code>只应通过被<code v-pre>HTTPS</code>协议加密过的请求发送给服务端</li>
</ul>
<p>通过上述，我们可以看到<code v-pre>cookie</code>又开始的作用并不是为了缓存而设计出来，只是借用了<code v-pre>cookie</code>的特性实现缓存</p>
<p>关于<code v-pre>cookie</code>的使用如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span>cookie <span class="token operator">=</span> <span class="token string">'名字=值'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>关于<code v-pre>cookie</code>的修改，首先要确定<code v-pre>domain</code>和<code v-pre>path</code>属性都是相同的才可以，其中有一个不同得时候都会创建出一个新的<code v-pre>cookie</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Set<span class="token operator">-</span>Cookie<span class="token operator">:</span>name<span class="token operator">=</span>aa<span class="token punctuation">;</span> domain<span class="token operator">=</span>aa<span class="token punctuation">.</span>net<span class="token punctuation">;</span> path<span class="token operator">=</span><span class="token operator">/</span>  
# 服务端设置
document<span class="token punctuation">.</span>cookie <span class="token operator">=</span>name<span class="token operator">=</span>bb<span class="token punctuation">;</span> domain<span class="token operator">=</span>aa<span class="token punctuation">.</span>net<span class="token punctuation">;</span> path<span class="token operator">=</span><span class="token operator">/</span>  
# 客户端设置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后<code v-pre>cookie</code>的删除，最常用的方法就是给<code v-pre>cookie</code>设置一个过期的事件，这样<code v-pre>cookie</code>过期后会被浏览器删除</p>
<h3 id="localstorage" tabindex="-1"><a class="header-anchor" href="#localstorage" aria-hidden="true">#</a> localStorage</h3>
<p><code v-pre>HTML5</code>新方法，IE8及以上浏览器都兼容</p>
<h3 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h3>
<ul>
<li>生命周期：持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的</li>
<li>存储的信息在同一域中是共享的</li>
<li>当本页操作（新增、修改、删除）了<code v-pre>localStorage</code>的时候，本页面不会触发<code v-pre>storage</code>事件,但是别的页面会触发<code v-pre>storage</code>事件。</li>
<li>大小：5M（跟浏览器厂商有关系）</li>
<li><code v-pre>localStorage</code>本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡</li>
<li>受同源策略的限制</li>
</ul>
<p>下面再看看关于<code v-pre>localStorage</code>的使用</p>
<p>设置</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'username'</span><span class="token punctuation">,</span><span class="token string">'cfangxu'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>获取</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'username'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>获取键名</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>localStorage<span class="token punctuation">.</span><span class="token function">key</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">//获取第一个键名</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>localStorage<span class="token punctuation">.</span><span class="token function">removeItem</span><span class="token punctuation">(</span><span class="token string">'username'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一次性清除所有存储</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>localStorage<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>localStorage</code> 也不是完美的，它有两个缺点：</p>
<ul>
<li>无法像<code v-pre>Cookie</code>一样设置过期时间</li>
<li>只能存入字符串，无法直接存对象</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'key'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'value'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'key'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// '[object, Object]'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sessionstorage" tabindex="-1"><a class="header-anchor" href="#sessionstorage" aria-hidden="true">#</a> sessionStorage</h3>
<p><code v-pre>sessionStorage</code>和 <code v-pre>localStorage</code>使用方法基本一致，唯一不同的是生命周期，一旦页面（会话）关闭，<code v-pre>sessionStorage</code> 将会删除数据</p>
<h3 id="扩展的前端存储方式" tabindex="-1"><a class="header-anchor" href="#扩展的前端存储方式" aria-hidden="true">#</a> 扩展的前端存储方式</h3>
<p><code v-pre>indexedDB</code>是一种低级API，用于客户端存储大量结构化数据(包括, 文件/ blobs)。该API使用索引来实现对该数据的高性能搜索</p>
<p>虽然 <code v-pre>Web Storage</code>对于存储较少量的数据很有用，但对于存储更大量的结构化数据来说，这种方法不太有用。<code v-pre>IndexedDB</code>提供了一个解决方案</p>
<h4 id="优点" tabindex="-1"><a class="header-anchor" href="#优点" aria-hidden="true">#</a> 优点：</h4>
<ul>
<li>储存量理论上没有上限</li>
<li>所有操作都是异步的，相比 <code v-pre>LocalStorage</code> 同步操作性能更高，尤其是数据量较大时</li>
<li>原生支持储存<code v-pre>JS</code>的对象</li>
<li>是个正经的数据库，意味着数据库能干的事它都能干</li>
</ul>
<h4 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点" aria-hidden="true">#</a> 缺点：</h4>
<ul>
<li>操作非常繁琐</li>
<li>本身有一定门槛</li>
</ul>
<p>关于<code v-pre>indexedDB</code>的使用基本使用步骤如下：</p>
<ul>
<li>
<p>打开数据库并且开始一个事务</p>
</li>
<li>
<p>创建一个 <code v-pre>object store</code></p>
</li>
<li>
<p>构建一个请求来执行一些数据库操作，像增加或提取数据等。</p>
</li>
<li>
<p>通过监听正确类型的 <code v-pre>DOM</code> 事件以等待操作完成。</p>
</li>
<li>
<p>在操作结果上进行一些操作（可以在 <code v-pre>request</code>对象中找到）</p>
</li>
</ul>
<p>关于使用<code v-pre>indexdb</code>的使用会比较繁琐，大家可以通过使用<code v-pre>Godb.js</code>库进行缓存，最大化的降低操作难度</p>
<h2 id="区别" tabindex="-1"><a class="header-anchor" href="#区别" aria-hidden="true">#</a> 区别</h2>
<p>关于<code v-pre>cookie</code>、<code v-pre>sessionStorage</code>、<code v-pre>localStorage</code>三者的区别主要如下：</p>
<ul>
<li>
<p>存储大小：<code v-pre>cookie</code>数据大小不能超过<code v-pre>4k</code>，<code v-pre>sessionStorage</code>和<code v-pre>localStorage</code>虽然也有存储大小的限制，但比<code v-pre>cookie</code>大得多，可以达到5M或更大</p>
</li>
<li>
<p>有效时间：<code v-pre>localStorage</code>存储持久数据，浏览器关闭后数据不丢失除非主动删除数据； <code v-pre>sessionStorage</code>数据在当前浏览器窗口关闭后自动删除；<code v-pre>cookie</code>设置的<code v-pre>cookie</code>过期时间之前一直有效，即使窗口或浏览器关闭</p>
</li>
<li>
<p>数据与服务器之间的交互方式，<code v-pre>cookie</code>的数据会自动的传递到服务器，服务器端也可以写<code v-pre>cookie</code>到客户端； <code v-pre>sessionStorage</code>和<code v-pre>localStorage</code>不会自动把数据发给服务器，仅在本地保存</p>
</li>
</ul>
<h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h2>
<p>在了解了上述的前端的缓存方式后，我们可以看看针对不对场景的使用选择：</p>
<ul>
<li>标记用户与跟踪用户行为的情况，推荐使用<code v-pre>cookie</code></li>
<li>适合长期保存在本地的数据（令牌），推荐使用<code v-pre>localStorage</code></li>
<li>敏感账号一次性登录，推荐使用<code v-pre>sessionStorage</code></li>
<li>存储大量数据的情况、在线文档（富文本编辑器）保存编辑历史的情况，推荐使用<code v-pre>indexedDB</code></li>
</ul>
<h2 id="相关连接" tabindex="-1"><a class="header-anchor" href="#相关连接" aria-hidden="true">#</a> 相关连接</h2>
<ul>
<li>https://mp.weixin.qq.com/s/mROjtpoXarN--UDfEMqwhQ</li>
<li>https://github.com/chenstarx/GoDB.js</li>
</ul>
</div></template>


