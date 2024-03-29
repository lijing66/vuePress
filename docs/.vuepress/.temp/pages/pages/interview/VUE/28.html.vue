<template><div><h1 id="hash模式和history模式" tabindex="-1"><a class="header-anchor" href="#hash模式和history模式" aria-hidden="true">#</a> hash模式和history模式</h1>
<p>实现单页应用的两种模式：hash模式和history模式。</p>
<p>hash模式的原理是通过hashchange事件，通过监听<code v-pre>hash</code>变化来驱动界面变化。它的url中有 <code v-pre>#</code> 号</p>
<p>history模式的原理是通过<code v-pre>popstate</code>事件，通过监听浏览器历史记录变化来驱动界面变化。 需要注意的是调用history.pushState()或history.replaceState()不会触发popstate事件。只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在Javascript代码中调用history.back()） 它的url中没有 <code v-pre>#</code> 号</p>
<p>项目上线之后，需要在后端服务器额外配置，否则会出现404错误</p>
<h2 id="hash模式的原理" tabindex="-1"><a class="header-anchor" href="#hash模式的原理" aria-hidden="true">#</a> hash模式的原理</h2>
<ol>
<li>监听地址栏中<code v-pre>hash</code>变化驱动界面变化</li>
<li>用<code v-pre>pushsate</code>记录浏览器的历史，驱动界面发送变化</li>
</ol>
<p><img src="http://fanyouf.gitee.io/interview/vue/asset/fc95bf60-3ac6-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="hash模式的实现" tabindex="-1"><a class="header-anchor" href="#hash模式的实现" aria-hidden="true">#</a> hash模式的实现</h2>
<p>核心通过监听<code v-pre>url</code>中的<code v-pre>hash</code>变化来进行路由跳转</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 定义 Router</span>
<span class="token keyword">class</span> <span class="token class-name">Router</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>routes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 存放路由path及callback</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>currentUrl <span class="token operator">=</span> <span class="token string">''</span> <span class="token comment">// 监听路由change调用相对应的路由回调</span>
    window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'load'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>refresh<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'hashchange'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>refresh<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">route</span><span class="token punctuation">(</span><span class="token parameter">path<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>routes<span class="token punctuation">[</span>path<span class="token punctuation">]</span> <span class="token operator">=</span> callback
  <span class="token punctuation">}</span>
  <span class="token function">push</span><span class="token punctuation">(</span><span class="token parameter">path</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>routes<span class="token punctuation">[</span>path<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>routes<span class="token punctuation">[</span>path<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用 router</span>
window<span class="token punctuation">.</span>miniRouter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Router</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
miniRouter<span class="token punctuation">.</span><span class="token function">route</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'page1'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
miniRouter<span class="token punctuation">.</span><span class="token function">route</span><span class="token punctuation">(</span><span class="token string">'/page2'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'page2'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

miniRouter<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">)</span> <span class="token comment">// page1</span>
miniRouter<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'/page2'</span><span class="token punctuation">)</span> <span class="token comment">// page2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="history-模式" tabindex="-1"><a class="header-anchor" href="#history-模式" aria-hidden="true">#</a> history 模式</h2>
<p><code v-pre>history</code> 模式核心借用 <code v-pre>HTML5 history api</code>，<code v-pre>api</code> 提供了丰富的 <code v-pre>router</code> 相关属性先了解一个几个相关的 api</p>
<ul>
<li><code v-pre>pushState</code> 向浏览器历史纪录添加记录</li>
<li><code v-pre>replaceState</code>修改浏览器历史纪录中当前纪录</li>
<li><code v-pre>popState</code> 事件， 当 <code v-pre>history</code> 发生变化时触发</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 定义 Router</span>
<span class="token keyword">class</span> <span class="token class-name">Router</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>routes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">listerPopState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">init</span><span class="token punctuation">(</span><span class="token parameter">path</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    history<span class="token punctuation">.</span><span class="token function">replaceState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> path <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> path<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>routes<span class="token punctuation">[</span>path<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>routes<span class="token punctuation">[</span>path<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">route</span><span class="token punctuation">(</span><span class="token parameter">path<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>routes<span class="token punctuation">[</span>path<span class="token punctuation">]</span> <span class="token operator">=</span> callback
  <span class="token punctuation">}</span>
  <span class="token function">push</span><span class="token punctuation">(</span><span class="token parameter">path</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    history<span class="token punctuation">.</span><span class="token function">pushState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> path <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> path<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>routes<span class="token punctuation">[</span>path<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>routes<span class="token punctuation">[</span>path<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">listerPopState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'popstate'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> path <span class="token operator">=</span> e<span class="token punctuation">.</span>state <span class="token operator">&amp;&amp;</span> e<span class="token punctuation">.</span>state<span class="token punctuation">.</span>path
      <span class="token keyword">this</span><span class="token punctuation">.</span>routers<span class="token punctuation">[</span>path<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>routers<span class="token punctuation">[</span>path<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用 Router</span>

window<span class="token punctuation">.</span>miniRouter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Router</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
miniRouter<span class="token punctuation">.</span><span class="token function">route</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'page1'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
miniRouter<span class="token punctuation">.</span><span class="token function">route</span><span class="token punctuation">(</span><span class="token string">'/page2'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'page2'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">// 跳转</span>
miniRouter<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'/page2'</span><span class="token punctuation">)</span> <span class="token comment">// page2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h3>
<ul>
<li>https://segmentfault.com/a/1190000019623624</li>
<li>https://juejin.cn/post/6844903512107663368</li>
<li>https://www.cnblogs.com/constantince/p/5586851.html</li>
</ul>
</div></template>


