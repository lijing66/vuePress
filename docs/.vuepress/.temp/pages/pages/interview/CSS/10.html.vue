<template><div><h1 id="如何实现单行-多行文本溢出的省略样式" tabindex="-1"><a class="header-anchor" href="#如何实现单行-多行文本溢出的省略样式" aria-hidden="true">#</a> <a href="#">#</a> 如何实现单行／多行文本溢出的省略样式？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> <a href="#">#</a> 简版</h2>
<p>答: 单行文本溢出换省略号</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code>​ <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span> // 文字强制不换行
 <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span> // 文字溢出换省略号
 <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span> // 溢出文字隐藏
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多行文本溢出换省略号</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code>​ <span class="token property">display</span><span class="token punctuation">:</span> -webkit-box<span class="token punctuation">;</span> // 元素转换为弹性容器<span class="token punctuation">,</span>在一行排列
 <span class="token property">-webkit-box-orient</span><span class="token punctuation">:</span> vertical<span class="token punctuation">;</span> /_ 表示盒子对象的子元素的排列方式 _/
 <span class="token property">-webkit-line-clamp</span><span class="token punctuation">:</span> 3<span class="token punctuation">;</span> /_ 限制文本的行数，表示文本第多少行省略 _/
 <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>/_ 打点展示 _/
 <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>/_ 超出部分进行隐藏 _/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="一、前言" tabindex="-1"><a class="header-anchor" href="#一、前言" aria-hidden="true">#</a> <a href="#">#</a> 一、前言</h2>
<p>在日常开发展示页面，如果一段文本的数量过长，受制于元素宽度的因素，有可能不能完全显示，为了提高用户的使用体验，这个时候就需要我们把溢出的文本显示成省略号</p>
<p>对于文本的溢出，我们可以分成两种形式：</p>
<ul>
<li>单行文本溢出</li>
<li>多行文本溢出</li>
</ul>
<h2 id="二、实现方式" tabindex="-1"><a class="header-anchor" href="#二、实现方式" aria-hidden="true">#</a> <a href="#">#</a> 二、实现方式</h2>
<h3 id="单行文本溢出省略" tabindex="-1"><a class="header-anchor" href="#单行文本溢出省略" aria-hidden="true">#</a> <a href="#">#</a> 单行文本溢出省略</h3>
<p>理解也很简单，即文本在一行内显示，超出部分以省略号的形式展现</p>
<p>实现方式也很简单，涉及的<code v-pre>css</code>属性有：</p>
<ul>
<li>text-overflow：规定当文本溢出时，显示省略符号来代表被修剪的文本</li>
<li>white-space：设置文字在一行显示，不能换行</li>
<li>overflow：文字长度超出限定宽度，则隐藏超出的内容</li>
</ul>
<p><code v-pre>overflow</code>设为<code v-pre>hidden</code>，普通情况用在块级元素的外层隐藏内部溢出元素，或者配合下面两个属性实现文本溢出省略</p>
<p><code v-pre>white-space:nowrap</code>，作用是设置文本不换行，是<code v-pre>overflow:hidden</code>和<code v-pre>text-overflow：ellipsis</code>生效的基础</p>
<p><code v-pre>text-overflow</code>属性值有如下：</p>
<ul>
<li>clip：当对象内文本溢出部分裁切掉</li>
<li>ellipsis：当对象内文本溢出时显示省略标记（...）</li>
</ul>
<p><code v-pre>text-overflow</code>只有在设置了<code v-pre>overflow:hidden</code>和<code v-pre>white-space:nowrap</code>才能够生效的</p>
<p>举个例子</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">&lt;style>
    p</span><span class="token punctuation">{</span>
        <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
        <span class="token property">line-height</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
        <span class="token property">width</span><span class="token punctuation">:</span>400px<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span>40px<span class="token punctuation">;</span>
        <span class="token property">border</span><span class="token punctuation">:</span>1px solid red<span class="token punctuation">;</span>
        <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
        <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
&lt;/style>
&lt;p 这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本&lt;/p >
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果如下：</p>
<p><img src="https://static.vue-js.com/bb3048e0-a0e9-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>可以看到，设置单行文本溢出较为简单，并且省略号显示的位置较好</p>
<h3 id="多行文本溢出省略" tabindex="-1"><a class="header-anchor" href="#多行文本溢出省略" aria-hidden="true">#</a> <a href="#">#</a> 多行文本溢出省略</h3>
<p>多行文本溢出的时候，我们可以分为两种情况：</p>
<ul>
<li>基于高度截断</li>
<li>基于行数截断</li>
</ul>
<h4 id="基于高度截断" tabindex="-1"><a class="header-anchor" href="#基于高度截断" aria-hidden="true">#</a> <a href="#">#</a> 基于高度截断</h4>
<h4 id="伪元素-定位" tabindex="-1"><a class="header-anchor" href="#伪元素-定位" aria-hidden="true">#</a> <a href="#">#</a> 伪元素 + 定位</h4>
<p>核心的<code v-pre>css</code>代码结构如下：</p>
<ul>
<li>position: relative：为伪元素绝对定位</li>
<li>overflow: hidden：文本溢出限定的宽度就隐藏内容）</li>
<li>position: absolute：给省略号绝对定位</li>
<li>line-height: 20px：结合元素高度,高度固定的情况下,设定行高, 控制显示行数</li>
<li>height: 40px：设定当前元素高度</li>
<li>::after {} ：设置省略号样式</li>
</ul>
<p>代码如下所示：</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">&lt;style>
  .demo</span> <span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.demo::after</span> <span class="token punctuation">{</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">'...'</span><span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 0 20px 0 10px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
&lt;/style>

&lt;body>
  &lt;div class=<span class="token string">"demo"</span>>这是一段很长的文本&lt;/div>
&lt;/body>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现原理很好理解，就是通过伪元素绝对定位到行尾并遮住文字，再通过 <code v-pre>overflow: hidden</code> 隐藏多余文字</p>
<p>这种实现具有以下优点：</p>
<ul>
<li>兼容性好，对各大主流浏览器有好的支持</li>
<li>响应式截断，根据不同宽度做出调整</li>
</ul>
<p>一般文本存在英文的时候，可以设置<code v-pre>word-break: break-all</code>使一个单词能够在换行时进行拆分</p>
<h4 id="基于行数截断" tabindex="-1"><a class="header-anchor" href="#基于行数截断" aria-hidden="true">#</a> <a href="#">#</a> 基于行数截断</h4>
<p>纯<code v-pre>css</code>实现也非常简单，核心的<code v-pre>css</code>代码如下：</p>
<ul>
<li>-webkit-line-clamp: 2：用来限制在一个块元素显示的文本的行数，为了实现该效果，它需要组合其他的 WebKit 属性）</li>
<li>display: -webkit-box：和 1 结合使用，将对象作为弹性伸缩盒子模型显示</li>
<li>-webkit-box-orient: vertical：和 1 结合使用 ，设置或检索伸缩盒对象的子元素的排列方式</li>
<li>overflow: hidden：文本溢出限定的宽度就隐藏内容</li>
<li>text-overflow: ellipsis：多行文本的情况下，用省略号“…”隐藏溢出范围的文本</li>
</ul>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">&lt;style>
  p</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 1px solid red<span class="token punctuation">;</span>
    <span class="token property">-webkit-line-clamp</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> -webkit-box<span class="token punctuation">;</span>
    <span class="token property">-webkit-box-orient</span><span class="token punctuation">:</span> vertical<span class="token punctuation">;</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
    <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
&lt;/style>
&lt;p>这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本 这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本&lt;/p>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，上述使用了<code v-pre>webkit</code>的<code v-pre>CSS</code>属性扩展，所以兼容浏览器范围是<code v-pre>PC</code>端的<code v-pre>webkit</code>内核的浏览器，由于移动端大多数是使用<code v-pre>webkit</code>，所以移动端常用该形式</p>
<p>需要注意的是，如果文本为一段很长的英文或者数字，则需要添加<code v-pre>word-wrap: break-word</code>属性</p>
<p>还能通过使用<code v-pre>javascript</code>实现配合<code v-pre>css</code>，实现代码如下所示：</p>
<p>css 结构如下：</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">p</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.p-after:after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">'...'</span><span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">padding-left</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">-webkit-linear-gradient</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> transparent<span class="token punctuation">,</span> #fff 55%<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">-moz-linear-gradient</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> transparent<span class="token punctuation">,</span> #fff 55%<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">-o-linear-gradient</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> transparent<span class="token punctuation">,</span> #fff 55%<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span>to right<span class="token punctuation">,</span> transparent<span class="token punctuation">,</span> #fff 55%<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>javascript 代码如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//获取文本的行高，并获取文本的高度，假设我们规定的行数是五行，那么对超过行数的部分进行限制高度，并加上省略号</span>
  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'p'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">i<span class="token punctuation">,</span> obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> lineHeight <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token function">$</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">css</span><span class="token punctuation">(</span><span class="token string">'line-height'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">var</span> height <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token function">$</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">height</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>height <span class="token operator">/</span> lineHeight <span class="token operator">></span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">$</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addClass</span><span class="token punctuation">(</span><span class="token string">'p-after'</span><span class="token punctuation">)</span>
      <span class="token function">$</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">css</span><span class="token punctuation">(</span><span class="token string">'height'</span><span class="token punctuation">,</span> <span class="token string">'60px'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">$</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">removeClass</span><span class="token punctuation">(</span><span class="token string">'p-after'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


