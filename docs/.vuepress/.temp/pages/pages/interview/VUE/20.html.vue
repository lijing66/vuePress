<template><div><h1 id="说说你对-keep-alive-的理解是什么" tabindex="-1"><a class="header-anchor" href="#说说你对-keep-alive-的理解是什么" aria-hidden="true">#</a> 说说你对 keep-alive 的理解是什么？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>它是 Vue的一个内置组件，可以用来做组件缓存以提升性能。它的使用格式是用它包裹住需要缓存的组件（内容可变的组件）。一般用它包裹住两类组件：（1）动态组件（component）（2）路由出口（router-view）。</p>
<p>在keep-alive上有3个属性：include 属性可以控制缓存哪些组件名，exclude 属性控制不缓存哪些组件， max用来设置最大能缓存的组件实例个数。它是一个抽象组件：它自身不会渲染一个DOM元素，也不会出现在父组件中。</p>
<p>当组件在它内被切换时，组件的activated和deactived这两个生命周期钩子函数将会被对应执行：激活时触发 activated 和失活时触发 deactivated。</p>
<h2 id="keep-alive缓存组件之后-页面如何更新" tabindex="-1"><a class="header-anchor" href="#keep-alive缓存组件之后-页面如何更新" aria-hidden="true">#</a> keep-alive缓存组件之后，页面如何更新？</h2>
<p>可以在页面内部监听activated钩子或者使用watch来监听。 举个例子：有一个商品购物的功能，它有一个列表页和详情页。 如果把列表页和详情页都缓存起来，就会有问题： 第一次从列表页进入详情页，在详情页的mounted钩子中去拿到id，去请求并渲染数据，此时能正常工作。但是，如果此时后退到列表页，再次进入另一件商品的商详页时，就会出问题： 由于它被缓存的，所以mounted不会再次执行，所以不会重新发请求。</p>
<h3 id="watch" tabindex="-1"><a class="header-anchor" href="#watch" aria-hidden="true">#</a> watch</h3>
<p>此时，可以用watch去监听 $route中的id参数，从而去正确的发请求。</p>
<h3 id="actived" tabindex="-1"><a class="header-anchor" href="#actived" aria-hidden="true">#</a> actived</h3>
<p>在<code v-pre>keep-alive</code>缓存的组件被激活的时候，都会执行<code v-pre>actived</code>钩子</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">activated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 获取数据</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：服务器端渲染期间<code v-pre>activated</code>不被调用</p>
<p>如果缓存的是路由级别的组件，还可以用beforeRouteEnter</p>
<h3 id="beforerouteenter" tabindex="-1"><a class="header-anchor" href="#beforerouteenter" aria-hidden="true">#</a> beforeRouteEnter</h3>
<p>每次组件渲染的时候，都会执行<code v-pre>beforeRouteEnter</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">beforeRouteEnter</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token parameter">vm</span><span class="token operator">=></span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
        <span class="token comment">// 每次进入路由执行</span>
        vm<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// 获取数据</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="keep-alive-是什么" tabindex="-1"><a class="header-anchor" href="#keep-alive-是什么" aria-hidden="true">#</a> keep-alive 是什么</h2>
<p><code v-pre>keep-alive</code>是<code v-pre>vue</code>中的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染<code v-pre>DOM</code> <code v-pre>keep-alive</code>它的工作原理是：包裹动态组件时，会<code v-pre>缓存</code>不活动的组件实例，而不是销毁它们 <code v-pre>keep-alive</code>可以设置以下<code v-pre>props</code>属性：</p>
<ul>
<li><code v-pre>include</code> - 字符串或正则表达式。只有名称匹配的组件会被缓存</li>
<li><code v-pre>exclude</code> - 字符串或正则表达式。任何名称匹配的组件都不会被缓存</li>
<li><code v-pre>max</code> - 数字。最多可以缓存多少组件实例 关于<code v-pre>keep-alive</code>的基本用法：</li>
</ul>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>view<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码中，无论是哪些组件被装入了component,在组件切换时，都不会自动去销毁他们，而是被缓存起来了。</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码中，无论是哪些组件被路由匹配成功了，被装入了router-view，在路由切换时，都不会销毁他们，而是被缓存起来了。</p>
<p>使用<code v-pre>includes</code>和<code v-pre>exclude</code>：</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span> <span class="token attr-name">include</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>a,b<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>view<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- 正则表达式 (使用 `v-bind`) --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span> <span class="token attr-name">:include</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/a|b/<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>view<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- 数组 (使用 `v-bind`) --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span> <span class="token attr-name">:include</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>['a', 'b']<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>view<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>匹配首先检查组件自身的 <code v-pre>name</code> 选项，如果 <code v-pre>name</code> 选项不可用，则匹配它的局部注册名称 (父组件 <code v-pre>components</code> 选项的键值)，匿名组件不能被匹配</p>
<p>设置了 keep-alive 缓存的组件，会多出两个生命周期钩子（<code v-pre>activated</code>与<code v-pre>deactivated</code>）, 以keep-alive + router-view为例来说明：</p>
<ul>
<li>
<p>首次进入组件时：<code v-pre>beforeRouteEnter</code> &gt; <code v-pre>beforeCreate</code> &gt; <code v-pre>created</code>&gt; <code v-pre>mounted</code> &gt; <code v-pre>activated</code> &gt; ... ... &gt; <code v-pre>beforeRouteLeave</code> &gt; <code v-pre>deactivated</code></p>
</li>
<li>
<p>再次进入组件时：<code v-pre>beforeRouteEnter</code> &gt;<code v-pre>activated</code> &gt; ... ... &gt; <code v-pre>beforeRouteLeave</code> &gt; <code v-pre>deactivated</code></p>
</li>
</ul>
<h2 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h2>
<p>组件需要缓存时，就可以使用。例如： tab页效果； h5中那些经常不变化的组件（我的），或者切换路由会导致开销特别大的页面（列表页，特别是具有下拉加载更多的列表页，它本身的数据就特别大）。</p>
<p>另外，需要缓存的页面是可以&quot;动态设置&quot;的,下面的代码中：<code v-pre>namesNeedToCache</code>可以被设计为一个数组，并动态更新。</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span> <span class="token attr-name">:include</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>namesNeedToCache<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如，下图所示的后管类项目中，我们需要将打开的tab签缓存起来，而tab签的个数是不确定的。</p>
<p><img src="http://fanyouf.gitee.io/interview/assets/img/keep-alive-01.d402b6c7.png" alt="image-20230804153820422"></p>
<p>更复杂的例子：</p>
<p>当我们从<code v-pre>首页</code>–&gt;<code v-pre>列表页</code>–&gt;<code v-pre>商详页</code>–&gt;<code v-pre>再返回</code>，这时候列表页应该是需要<code v-pre>keep-alive</code></p>
<p>从<code v-pre>首页</code>–&gt;<code v-pre>列表页</code>–&gt;<code v-pre>商详页</code>–&gt;<code v-pre>返回到列表页(需要缓存)</code>–&gt;<code v-pre>返回到首页(需要缓存)</code>–&gt;<code v-pre>再次进入列表页(不需要缓存)</code></p>
<p>这时候可以按需来控制页面的<code v-pre>keep-alive</code></p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>wrapper<span class="token punctuation">'</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span> <span class="token attr-name">:include</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>namesNeedToCache<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="原理分析" tabindex="-1"><a class="header-anchor" href="#原理分析" aria-hidden="true">#</a> 原理分析</h2>
<p><code v-pre>keep-alive</code>是<code v-pre>vue</code>中内置的一个组件</p>
<p>源码位置：src/core/components/keep-alive.js</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'keep-alive'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">abstract</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">include</span><span class="token operator">:</span> <span class="token punctuation">[</span>String<span class="token punctuation">,</span> RegExp<span class="token punctuation">,</span> Array<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">exclude</span><span class="token operator">:</span> <span class="token punctuation">[</span>String<span class="token punctuation">,</span> RegExp<span class="token punctuation">,</span> Array<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">max</span><span class="token operator">:</span> <span class="token punctuation">[</span>String<span class="token punctuation">,</span> Number<span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>cache <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>keys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">destroyed</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">pruneCacheEntry</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>keys<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">mounted</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$watch</span><span class="token punctuation">(</span><span class="token string">'include'</span><span class="token punctuation">,</span> <span class="token parameter">val</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">pruneCache</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token parameter">name</span> <span class="token operator">=></span> <span class="token function">matches</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$watch</span><span class="token punctuation">(</span><span class="token string">'exclude'</span><span class="token punctuation">,</span> <span class="token parameter">val</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">pruneCache</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token parameter">name</span> <span class="token operator">=></span> <span class="token operator">!</span><span class="token function">matches</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/* 获取默认插槽中的第一个组件节点 */</span>
    <span class="token keyword">const</span> slot <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$slots<span class="token punctuation">.</span>default
    <span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token function">getFirstComponentChild</span><span class="token punctuation">(</span>slot<span class="token punctuation">)</span>
    <span class="token comment">/* 获取该组件节点的componentOptions */</span>
    <span class="token keyword">const</span> componentOptions <span class="token operator">=</span> vnode <span class="token operator">&amp;&amp;</span> vnode<span class="token punctuation">.</span>componentOptions

    <span class="token keyword">if</span> <span class="token punctuation">(</span>componentOptions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">/* 获取该组件节点的名称，优先获取组件的name字段，如果name不存在则获取组件的tag */</span>
      <span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token function">getComponentName</span><span class="token punctuation">(</span>componentOptions<span class="token punctuation">)</span>

      <span class="token keyword">const</span> <span class="token punctuation">{</span> include<span class="token punctuation">,</span> exclude <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span>
      <span class="token comment">/* 如果name不在inlcude中或者存在于exlude中则表示不缓存，直接返回vnode */</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        <span class="token punctuation">(</span>include <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token operator">!</span>name <span class="token operator">||</span> <span class="token operator">!</span><span class="token function">matches</span><span class="token punctuation">(</span>include<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span>
        <span class="token comment">// excluded</span>
        <span class="token punctuation">(</span>exclude <span class="token operator">&amp;&amp;</span> name <span class="token operator">&amp;&amp;</span> <span class="token function">matches</span><span class="token punctuation">(</span>exclude<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> vnode
      <span class="token punctuation">}</span>

      <span class="token keyword">const</span> <span class="token punctuation">{</span> cache<span class="token punctuation">,</span> keys <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span>
      <span class="token comment">/* 获取组件的key值 */</span>
      <span class="token keyword">const</span> key <span class="token operator">=</span> vnode<span class="token punctuation">.</span>key <span class="token operator">==</span> <span class="token keyword">null</span>
        <span class="token comment">// same constructor may get registered as different local components</span>
        <span class="token comment">// so cid alone is not enough (#3269)</span>
        <span class="token operator">?</span> componentOptions<span class="token punctuation">.</span>Ctor<span class="token punctuation">.</span>cid <span class="token operator">+</span> <span class="token punctuation">(</span>componentOptions<span class="token punctuation">.</span>tag <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">::</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>componentOptions<span class="token punctuation">.</span>tag<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span> <span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">)</span>
        <span class="token operator">:</span> vnode<span class="token punctuation">.</span>key
     <span class="token comment">/*  拿到key值后去this.cache对象中去寻找是否有该值，如果有则表示该组件有缓存，即命中缓存 */</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        vnode<span class="token punctuation">.</span>componentInstance <span class="token operator">=</span> cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">.</span>componentInstance
        <span class="token comment">// make current key freshest</span>
        <span class="token function">remove</span><span class="token punctuation">(</span>keys<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
        keys<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
        <span class="token comment">/* 如果没有命中缓存，则将其设置进缓存 */</span>
        <span class="token keyword">else</span> <span class="token punctuation">{</span>
        cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> vnode
        keys<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
        <span class="token comment">// prune oldest entry</span>
        <span class="token comment">/* 如果配置了max并且缓存的长度超过了this.max，则从缓存中删除第一个 */</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>max <span class="token operator">&amp;&amp;</span> keys<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>max<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">pruneCacheEntry</span><span class="token punctuation">(</span>cache<span class="token punctuation">,</span> keys<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> keys<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_vnode<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>

      vnode<span class="token punctuation">.</span>data<span class="token punctuation">.</span>keepAlive <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> vnode <span class="token operator">||</span> <span class="token punctuation">(</span>slot <span class="token operator">&amp;&amp;</span> slot<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到该组件没有<code v-pre>template</code>，而是用了<code v-pre>render</code>，在组件渲染的时候会自动执行<code v-pre>render</code>函数</p>
<p><code v-pre>this.cache</code>是一个对象，用来存储需要缓存的组件，它将以如下形式存储：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>cache <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string-property property">'key1'</span><span class="token operator">:</span><span class="token string">'组件1'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'key2'</span><span class="token operator">:</span><span class="token string">'组件2'</span><span class="token punctuation">,</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在组件销毁的时候执行<code v-pre>pruneCacheEntry</code>函数</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">pruneCacheEntry</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">cache</span><span class="token operator">:</span> VNodeCache<span class="token punctuation">,</span>
  <span class="token literal-property property">key</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">keys</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>string<span class="token operator">></span><span class="token punctuation">,</span>
  current<span class="token operator">?</span><span class="token operator">:</span> VNode</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> cached <span class="token operator">=</span> cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token comment">/* 判断当前没有处于被渲染状态的组件，将其销毁*/</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>cached <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token operator">!</span>current <span class="token operator">||</span> cached<span class="token punctuation">.</span>tag <span class="token operator">!==</span> current<span class="token punctuation">.</span>tag<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    cached<span class="token punctuation">.</span>componentInstance<span class="token punctuation">.</span><span class="token function">$destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token function">remove</span><span class="token punctuation">(</span>keys<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>mounted</code>钩子函数中观测 <code v-pre>include</code> 和 <code v-pre>exclude</code> 的变化，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">mounted</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$watch</span><span class="token punctuation">(</span><span class="token string">'include'</span><span class="token punctuation">,</span> <span class="token parameter">val</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">pruneCache</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token parameter">name</span> <span class="token operator">=></span> <span class="token function">matches</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$watch</span><span class="token punctuation">(</span><span class="token string">'exclude'</span><span class="token punctuation">,</span> <span class="token parameter">val</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">pruneCache</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token parameter">name</span> <span class="token operator">=></span> <span class="token operator">!</span><span class="token function">matches</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<code v-pre>include</code> 或<code v-pre>exclude</code> 发生了变化，即表示定义需要缓存的组件的规则或者不需要缓存的组件的规则发生了变化，那么就执行<code v-pre>pruneCache</code>函数，函数如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">pruneCache</span> <span class="token punctuation">(</span><span class="token parameter">keepAliveInstance<span class="token punctuation">,</span> filter</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> cache<span class="token punctuation">,</span> keys<span class="token punctuation">,</span> _vnode <span class="token punctuation">}</span> <span class="token operator">=</span> keepAliveInstance
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> cache<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> cachedNode <span class="token operator">=</span> cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cachedNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token function">getComponentName</span><span class="token punctuation">(</span>cachedNode<span class="token punctuation">.</span>componentOptions<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>name <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">filter</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">pruneCacheEntry</span><span class="token punctuation">(</span>cache<span class="token punctuation">,</span> key<span class="token punctuation">,</span> keys<span class="token punctuation">,</span> _vnode<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在该函数内对<code v-pre>this.cache</code>对象进行遍历，取出每一项的<code v-pre>name</code>值，用其与新的缓存规则进行匹配，如果匹配不上，则表示在新的缓存规则下该组件已经不需要被缓存，则调用<code v-pre>pruneCacheEntry</code>函数将其从<code v-pre>this.cache</code>对象剔除即可</p>
<p>关于<code v-pre>keep-alive</code>的最强大缓存功能是在<code v-pre>render</code>函数中实现</p>
<p>首先获取组件的<code v-pre>key</code>值：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> key <span class="token operator">=</span> vnode<span class="token punctuation">.</span>key <span class="token operator">==</span> <span class="token keyword">null</span><span class="token operator">?</span>
componentOptions<span class="token punctuation">.</span>Ctor<span class="token punctuation">.</span>cid <span class="token operator">+</span> <span class="token punctuation">(</span>componentOptions<span class="token punctuation">.</span>tag <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">::</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>componentOptions<span class="token punctuation">.</span>tag<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span> <span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">)</span>
<span class="token operator">:</span> vnode<span class="token punctuation">.</span>key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>拿到<code v-pre>key</code>值后去<code v-pre>this.cache</code>对象中去寻找是否有该值，如果有则表示该组件有缓存，即命中缓存，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">/* 如果命中缓存，则直接从缓存中拿 vnode 的组件实例 */</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    vnode<span class="token punctuation">.</span>componentInstance <span class="token operator">=</span> cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">.</span>componentInstance
    <span class="token comment">/* 调整该组件key的顺序，将其从原来的地方删掉并重新放在最后一个 */</span>
    <span class="token function">remove</span><span class="token punctuation">(</span>keys<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    keys<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>直接从缓存中拿 <code v-pre>vnode</code> 的组件实例，此时重新调整该组件<code v-pre>key</code>的顺序，将其从原来的地方删掉并重新放在<code v-pre>this.keys</code>中最后一个</p>
<p><code v-pre>this.cache</code>对象中没有该<code v-pre>key</code>值的情况，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">/* 如果没有命中缓存，则将其设置进缓存 */</span>
<span class="token keyword">else</span> <span class="token punctuation">{</span>
    cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> vnode
    keys<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token comment">/* 如果配置了max并且缓存的长度超过了this.max，则从缓存中删除第一个 */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>max <span class="token operator">&amp;&amp;</span> keys<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>max<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">pruneCacheEntry</span><span class="token punctuation">(</span>cache<span class="token punctuation">,</span> keys<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> keys<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_vnode<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>表明该组件还没有被缓存过，则以该组件的<code v-pre>key</code>为键，组件<code v-pre>vnode</code>为值，将其存入<code v-pre>this.cache</code>中，并且把<code v-pre>key</code>存入<code v-pre>this.keys</code>中</p>
<p>此时再判断<code v-pre>this.keys</code>中缓存组件的数量是否超过了设置的最大缓存数量值<code v-pre>this.max</code>，如果超过了，则把第一个缓存组件删掉</p>
<h2 id="思考题-缓存后如何获取数据" tabindex="-1"><a class="header-anchor" href="#思考题-缓存后如何获取数据" aria-hidden="true">#</a> 思考题：缓存后如何获取数据</h2>
<p>解决方案可以有以下两种：</p>
<ul>
<li>
<p>beforeRouteEnter</p>
</li>
<li>
<p>actived</p>
</li>
</ul>
<h3 id="beforerouteenter-1" tabindex="-1"><a class="header-anchor" href="#beforerouteenter-1" aria-hidden="true">#</a> beforeRouteEnter</h3>
<p>每次组件渲染的时候，都会执行<code v-pre>beforeRouteEnter</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">beforeRouteEnter</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token parameter">vm</span><span class="token operator">=></span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
        <span class="token comment">// 每次进入路由执行</span>
        vm<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// 获取数据</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="actived-1" tabindex="-1"><a class="header-anchor" href="#actived-1" aria-hidden="true">#</a> actived</h3>
<p>在<code v-pre>keep-alive</code>缓存的组件被激活的时候，都会执行<code v-pre>actived</code>钩子</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">activated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 获取数据</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：服务器端渲染期间<code v-pre>activated</code>不被调用</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://www.cnblogs.com/dhui/p/13589401.html</li>
<li>https://www.cnblogs.com/wangjiachen666/p/11497200.html</li>
<li>https://vue3js.cn/docs/zh</li>
</ul>
</div></template>


