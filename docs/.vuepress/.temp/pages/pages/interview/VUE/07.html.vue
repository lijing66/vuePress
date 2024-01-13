<template><div><h1 id="v-show-和-v-if" tabindex="-1"><a class="header-anchor" href="#v-show-和-v-if" aria-hidden="true">#</a> v-show 和 v-if</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p><a href="https://www.bilibili.com/video/BV1iW4y1k7Ci?p=22&amp;vd_source=c29247aaf6a5467f0f252a389801de84" target="_blank" rel="noopener noreferrer">参考视频 (opens new window)<ExternalLinkIcon/></a></p>
<h2 id="v-show-与-v-if-的共同点" tabindex="-1"><a class="header-anchor" href="#v-show-与-v-if-的共同点" aria-hidden="true">#</a> v-show 与 v-if 的共同点</h2>
<p>我们都知道在 <code v-pre>vue</code> 中 <code v-pre>v-show</code> 与 <code v-pre>v-if</code> 的作用效果是相同的(不含 v-else)，都能控制元素在页面是否可见</p>
<p>在格式上也是相同的：</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Model</span> <span class="token attr-name">v-show</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>isShow<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Model</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>isShow<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>当表达式为<code v-pre>true</code>的时候，都会占据页面的位置</li>
<li>当表达式都为<code v-pre>false</code>时，都不会占据页面位置</li>
</ul>
<h2 id="v-show-与-v-if-的区别" tabindex="-1"><a class="header-anchor" href="#v-show-与-v-if-的区别" aria-hidden="true">#</a> v-show 与 v-if 的区别</h2>
<ul>
<li>控制手段不同</li>
<li>编译过程不同</li>
<li>编译条件不同</li>
</ul>
<p>控制手段：<code v-pre>v-show</code>隐藏则是为该元素添加<code v-pre>css--display:none</code>，元素依旧还在。<code v-pre>v-if</code>显示隐藏是将元素整个添加或删除</p>
<p>编译过程：<code v-pre>v-if</code>切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；<code v-pre>v-show</code>只是简单的基于 css 切换</p>
<p>编译条件：<code v-pre>v-if</code>是真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。只有渲染条件为假时，并不做操作，直到为真才渲染</p>
<ul>
<li>
<p><code v-pre>v-show</code> 由<code v-pre>false</code>变为<code v-pre>true</code>的时候不会触发组件的生命周期</p>
</li>
<li>
<p><code v-pre>v-if</code>由<code v-pre>false</code>变为<code v-pre>true</code>的时候，触发组件的<code v-pre>beforeCreate</code>、<code v-pre>create</code>、<code v-pre>beforeMount</code>、<code v-pre>mounted</code>钩子，由<code v-pre>true</code>变为<code v-pre>false</code>的时候触发组件的<code v-pre>beforeDestory</code>、<code v-pre>destoryed</code>方法</p>
</li>
</ul>
<p>性能消耗：<code v-pre>v-if</code>有更高的切换消耗；<code v-pre>v-show</code>有更高的初始渲染消耗；</p>
<h2 id="v-show-与-v-if-原理分析" tabindex="-1"><a class="header-anchor" href="#v-show-与-v-if-原理分析" aria-hidden="true">#</a> v-show 与 v-if 原理分析</h2>
<h3 id="v-show-原理" tabindex="-1"><a class="header-anchor" href="#v-show-原理" aria-hidden="true">#</a> v-show 原理</h3>
<p>不管初始条件是什么，元素总是会被渲染</p>
<p>我们看一下在<code v-pre>vue</code>中是如何实现的</p>
<p>代码很好理解，有<code v-pre>transition</code>就执行<code v-pre>transition</code>，没有就直接设置<code v-pre>display</code>属性</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// https://github.com/vuejs/vue-next/blob/3cd30c5245da0733f9eb6f29d220f39c46518162/packages/runtime-dom/src/directives/vShow.ts</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">vShow</span><span class="token operator">:</span> ObjectDirective<span class="token operator">&lt;</span>VShowElement<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">beforeMount</span><span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> <span class="token punctuation">{</span> value <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> transition <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    el<span class="token punctuation">.</span>_vod <span class="token operator">=</span> el<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">===</span> <span class="token string">'none'</span> <span class="token operator">?</span> <span class="token string">''</span> <span class="token operator">:</span> el<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display
    <span class="token keyword">if</span> <span class="token punctuation">(</span>transition <span class="token operator">&amp;&amp;</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      transition<span class="token punctuation">.</span><span class="token function">beforeEnter</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">setDisplay</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> <span class="token punctuation">{</span> value <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> transition <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>transition <span class="token operator">&amp;&amp;</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      transition<span class="token punctuation">.</span><span class="token function">enter</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">updated</span><span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> <span class="token punctuation">{</span> value<span class="token punctuation">,</span> oldValue <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> transition <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">beforeUnmount</span><span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> <span class="token punctuation">{</span> value <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setDisplay</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="v-if-原理" tabindex="-1"><a class="header-anchor" href="#v-if-原理" aria-hidden="true">#</a> v-if 原理</h3>
<p><code v-pre>v-if</code>在实现上比<code v-pre>v-show</code>要复杂的多，因为还有<code v-pre>else</code> <code v-pre>else-if</code> 等条件需要处理，这里我们也只摘抄源码中处理 <code v-pre>v-if</code> 的一小部分</p>
<p>返回一个<code v-pre>node</code>节点，<code v-pre>render</code>函数通过表达式的值来决定是否生成<code v-pre>DOM</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// https://github.com/vuejs/vue-next/blob/cdc9f336fd/packages/compiler-core/src/transforms/vIf.ts</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> transformIf <span class="token operator">=</span> <span class="token function">createStructuralDirectiveTransform</span><span class="token punctuation">(</span>
  <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^(if|else|else-if)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token parameter">node<span class="token punctuation">,</span> dir<span class="token punctuation">,</span> context</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">processIf</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> dir<span class="token punctuation">,</span> context<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">ifNode<span class="token punctuation">,</span> branch<span class="token punctuation">,</span> isRoot</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>isRoot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          ifNode<span class="token punctuation">.</span>codegenNode <span class="token operator">=</span> <span class="token function">createCodegenNodeForBranch</span><span class="token punctuation">(</span>
            branch<span class="token punctuation">,</span>
            key<span class="token punctuation">,</span>
            context
          <span class="token punctuation">)</span> <span class="token keyword">as</span> IfConditionalExpression
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token comment">// attach this branch's codegen node to the v-if root.</span>
          <span class="token keyword">const</span> parentCondition <span class="token operator">=</span> <span class="token function">getParentCondition</span><span class="token punctuation">(</span>ifNode<span class="token punctuation">.</span>codegenNode<span class="token operator">!</span><span class="token punctuation">)</span>
          parentCondition<span class="token punctuation">.</span>alternate <span class="token operator">=</span> <span class="token function">createCodegenNodeForBranch</span><span class="token punctuation">(</span>
            branch<span class="token punctuation">,</span>
            key <span class="token operator">+</span> ifNode<span class="token punctuation">.</span>branches<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span>
            context
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="v-show-与-v-if-的使用场景" tabindex="-1"><a class="header-anchor" href="#v-show-与-v-if-的使用场景" aria-hidden="true">#</a> v-show 与 v-if 的使用场景</h2>
<p><code v-pre>v-if</code> 与 <code v-pre>v-show</code> 都能控制元素在页面的显示</p>
<p><code v-pre>v-if</code> 相比 <code v-pre>v-show</code> 开销更大的（直接操作<code v-pre>dom</code>节点增加与删除）</p>
<p>如果需要非常频繁地切换，则使用 v-show 较好，例如：手风琴菜单，tab 页签等</p>
<p>如果在运行时条件很少改变，则使用 v-if 较好。例如：用户登录之后，根据他的权限不同来显示不同的内容。</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://www.jianshu.com/p/7af8554d8f08</li>
<li>https://juejin.cn/post/6897948855904501768</li>
<li>https://vue3js/docs/zh</li>
</ul>
</div></template>


