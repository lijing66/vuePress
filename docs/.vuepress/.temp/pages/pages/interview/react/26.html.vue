<template><div><h1 id="如何提高组件的渲染效率的-在react中如何避免不必要的render" tabindex="-1"><a class="header-anchor" href="#如何提高组件的渲染效率的-在react中如何避免不必要的render" aria-hidden="true">#</a> 如何提高组件的渲染效率的？在React中如何避免不必要的render？</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><code v-pre>react</code> 基于虚拟 <code v-pre>DOM</code> 和高效 <code v-pre>Diff</code>算法的完美配合，实现了对 <code v-pre>DOM</code>最小粒度的更新，大多数情况下，<code v-pre>React</code>对 <code v-pre>DOM</code>的渲染效率足以我们的业务日常</p>
<p>复杂业务场景下，性能问题依然会困扰我们。此时需要采取一些措施来提升运行性能，避免不必要的渲染则是业务中常见的优化手段之一</p>
<h2 id="二、如何做" tabindex="-1"><a class="header-anchor" href="#二、如何做" aria-hidden="true">#</a> 二、如何做</h2>
<p>在之前文章中，我们了解到<code v-pre>render</code>的触发时机，简单来讲就是类组件通过调用<code v-pre>setState</code>方法， 就会导致<code v-pre>render</code>，父组件一旦发生<code v-pre>render</code>渲染，子组件一定也会执行<code v-pre>render</code>渲染</p>
<p>从上面可以看到，父组件渲染导致子组件渲染，子组件并没有发生任何改变，这时候就可以从避免无谓的渲染，具体实现的方式有如下：</p>
<ul>
<li>shouldComponentUpdate</li>
<li>PureComponent</li>
<li>React.memo</li>
</ul>
<h3 id="shouldcomponentupdate" tabindex="-1"><a class="header-anchor" href="#shouldcomponentupdate" aria-hidden="true">#</a> shouldComponentUpdate</h3>
<p>通过<code v-pre>shouldComponentUpdate</code>生命周期函数来比对 <code v-pre>state</code>和 <code v-pre>props</code>，确定是否要重新渲染</p>
<p>默认情况下返回<code v-pre>true</code>表示重新渲染，如果不希望组件重新渲染，返回 <code v-pre>false</code> 即可</p>
<h3 id="purecomponent" tabindex="-1"><a class="header-anchor" href="#purecomponent" aria-hidden="true">#</a> PureComponent</h3>
<p>跟<code v-pre>shouldComponentUpdate</code>原理基本一致，通过对 <code v-pre>props</code> 和 <code v-pre>state</code>的浅比较结果来实现 <code v-pre>shouldComponentUpdate</code>，源码大致如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_compositeType <span class="token operator">===</span> CompositeTypes<span class="token punctuation">.</span>PureClass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    shouldUpdate <span class="token operator">=</span> <span class="token operator">!</span><span class="token function">shallowEqual</span><span class="token punctuation">(</span>prevProps<span class="token punctuation">,</span> nextProps<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token operator">!</span> <span class="token function">shallowEqual</span><span class="token punctuation">(</span>inst<span class="token punctuation">.</span>state<span class="token punctuation">,</span> nextState<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>shallowEqual</code>对应方法大致如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> hasOwnProperty <span class="token operator">=</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>hasOwnProperty<span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * is 方法来判断两个值是否是相等的值，为何这么写可以移步 MDN 的文档
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */</span>
<span class="token keyword">function</span> <span class="token function">is</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">x</span><span class="token operator">:</span> mixed<span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> mixed</span><span class="token punctuation">)</span><span class="token operator">:</span> boolean <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">===</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x <span class="token operator">!==</span> <span class="token number">0</span> <span class="token operator">||</span> y <span class="token operator">!==</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token number">1</span> <span class="token operator">/</span> x <span class="token operator">===</span> <span class="token number">1</span> <span class="token operator">/</span> y<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x <span class="token operator">!==</span> x <span class="token operator">&amp;&amp;</span> y <span class="token operator">!==</span> y<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">shallowEqual</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">objA</span><span class="token operator">:</span> mixed<span class="token punctuation">,</span> <span class="token literal-property property">objB</span><span class="token operator">:</span> mixed</span><span class="token punctuation">)</span><span class="token operator">:</span> boolean <span class="token punctuation">{</span>
  <span class="token comment">// 首先对基本类型进行比较</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">is</span><span class="token punctuation">(</span>objA<span class="token punctuation">,</span> objB<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> objA <span class="token operator">!==</span> <span class="token string">'object'</span> <span class="token operator">||</span> objA <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span>
      <span class="token keyword">typeof</span> objB <span class="token operator">!==</span> <span class="token string">'object'</span> <span class="token operator">||</span> objB <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> keysA <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>objA<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> keysB <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>objB<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 长度不相等直接返回false</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>keysA<span class="token punctuation">.</span>length <span class="token operator">!==</span> keysB<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// key相等的情况下，再去循环比较</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> keysA<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      <span class="token operator">!</span><span class="token function">hasOwnProperty</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>objB<span class="token punctuation">,</span> keysA<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">||</span>
      <span class="token operator">!</span><span class="token function">is</span><span class="token punctuation">(</span>objA<span class="token punctuation">[</span>keysA<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span> objB<span class="token punctuation">[</span>keysA<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当对象包含复杂的数据结构时，对象深层的数据已改变却没有触发 <code v-pre>render</code></p>
<p>注意：在<code v-pre>react</code>中，是不建议使用深层次结构的数据</p>
<h3 id="react-memo" tabindex="-1"><a class="header-anchor" href="#react-memo" aria-hidden="true">#</a> React.memo</h3>
<p><code v-pre>React.memo</code>用来缓存组件的渲染，避免不必要的更新，其实也是一个高阶组件，与 <code v-pre>PureComponent</code> 十分类似。但不同的是， <code v-pre>React.memo</code> 只能用于函数组件</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> memo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">Button</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Component code</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">memo</span><span class="token punctuation">(</span>Button<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果需要深层次比较，这时候可以给<code v-pre>memo</code>第二个参数传递比较函数</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">arePropsEqual</span><span class="token punctuation">(</span><span class="token parameter">prevProps<span class="token punctuation">,</span> nextProps</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// your code</span>
  <span class="token keyword">return</span> prevProps <span class="token operator">===</span> nextProps<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">memo</span><span class="token punctuation">(</span>Button<span class="token punctuation">,</span> arePropsEqual<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p>在实际开发过程中，前端性能问题是一个必须考虑的问题，随着业务的复杂，遇到性能问题的概率也在增高</p>
<p>除此之外，建议将页面进行更小的颗粒化，如果一个过大，当状态发生修改的时候，就会导致整个大组件的渲染，而对组件进行拆分后，粒度变小了，也能够减少子组件不必要的渲染</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://juejin.cn/post/6844903781679759367#heading-12</li>
</ul>
</div></template>


