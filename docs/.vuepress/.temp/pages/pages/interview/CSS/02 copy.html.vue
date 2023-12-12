<template><div><h1 id="bfc" tabindex="-1"><a class="header-anchor" href="#bfc" aria-hidden="true">#</a> BFC</h1>
<h1 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h1>
<p>BFC 的中文意思是块级格式化上下文,是用于布局块级盒子的独立渲染区域，一个创建了新的 BFC 的盒子是独立布局的，盒子内元素的布局 不会影响盒子外面的元素。</p>
<p>简单来说就是 BFC 就是 css 的一个布局概念，是一个独立的区域(容器)</p>
<p>满足下列条件之一就可以触发 BFC:</p>
<ul>
<li>HTML 根元素</li>
<li>position 为 absolute 或 fixed</li>
<li>float 属性不为 none（常用）</li>
<li>overflow 不为 visible（常用）</li>
<li>display 为 inline-block， table-cell， table-caption， flex</li>
</ul>
<p>可以解决什么问题:margin 重叠,清除浮动,自适应布局.</p>
<h1 id="bfc-是什么" tabindex="-1"><a class="header-anchor" href="#bfc-是什么" aria-hidden="true">#</a> BFC 是什么</h1>
<p>我们在页面布局的时候，经常出现以下情况：</p>
<ul>
<li>这个元素高度怎么没了？</li>
<li>这两栏布局怎么没法自适应？</li>
<li>这两个元素的间距怎么有点奇怪的样子？</li>
<li>......
原因是元素之间相互的影响，导致了意料之外的情况，这里就涉及到BFC概念</li>
</ul>
<p>BFC（Block Formatting Context），即块级格式化上下文，它是页面中的一块渲染区域，并且有一套属于自己的渲染规则：</p>
<ul>
<li>内部的盒子会在垂直方向上一个接一个的放置</li>
<li>对于同一个 BFC 的俩个相邻的盒子的 margin 会发生重叠，与方向无关。</li>
<li>每个元素的左外边距与包含块的左边界相接触（从左到右），即使浮动元素也是如此</li>
<li>BFC 的区域不会与 float 的元素区域重叠</li>
<li>计算 BFC 的高度时，浮动子元素也参与计算</li>
<li>BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然</li>
<li>BFC目的是形成一个相对于外界完全独立的空间，让内部的子元素不会影响到外部的元素</li>
</ul>
<h1 id="触发条件" tabindex="-1"><a class="header-anchor" href="#触发条件" aria-hidden="true">#</a> 触发条件</h1>
<p>可以通过如下的设置来触发（产生）一个BFC：</p>
<ul>
<li>根元素，即 HTML 元素</li>
<li>浮动元素：float 值为 left、right</li>
<li>overflow 值不为 visible，为 auto、scroll、hidden</li>
<li>display 的值为 inline-block、inltable-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid</li>
<li>position 的值为 absolute 或 fixed</li>
</ul>
<h1 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h1>
<p>当一个容器具备了 BFC 之后， 我们就可以利用BFC的特性，解决很多问题</p>
<h6 id="防止-margin-重叠-塌陷" tabindex="-1"><a class="header-anchor" href="#防止-margin-重叠-塌陷" aria-hidden="true">#</a> 防止 margin 重叠（塌陷）</h6>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">p</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #f55<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> #fcc<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Haha<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Hehe<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>页面显示如下：</p>
<p>两个<code>p</code>元素之间的距离为<code>100px</code>，发生了<code>margin</code>重叠（塌陷），以最大的为准，如果第一个 P 的<code>margin</code>为 80 的话，两个 P 之间的距离还是 100，以最大的为准。</p>
<p>前面讲到，同一个<code>BFC</code>的俩个相邻的盒子的<code>margin</code>会发生重叠</p>
<p>可以在<code>p</code>外面包裹一层容器，并触发这个容器生成一个<code>BFC</code>，那么两个<code>p</code>就不属于同一个<code>BFC</code>，则不会出现<code>margin</code>重叠</p>
</div></template>


