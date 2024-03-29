<template><div><h1 id="css-如何画一个三角形-原理是什么" tabindex="-1"><a class="header-anchor" href="#css-如何画一个三角形-原理是什么" aria-hidden="true">#</a> CSS 如何画一个三角形？原理是什么？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>css 画三角形的原理是利用盒子边框完成的,实现步骤可以分为以下四步: 1.设置一个盒子 2.设置四周不同颜色的边框 3.将盒子宽高设置为 0，仅保留边框 4.得到四个三角形，选择其中一个后，其他三角形（边框）设置颜色为透明</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
  <span class="token property">border-top</span><span class="token punctuation">:</span> 20px solid transparent<span class="token punctuation">;</span>
  <span class="token property">border-bottom</span><span class="token punctuation">:</span> 20px solid red<span class="token punctuation">;</span>
  <span class="token property">border-left</span><span class="token punctuation">:</span> 20px solid transparent<span class="token punctuation">;</span>
  <span class="token property">border-right</span><span class="token punctuation">:</span> 20px solid transparent<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="一、前言" tabindex="-1"><a class="header-anchor" href="#一、前言" aria-hidden="true">#</a> 一、前言</h2>
<p>在前端开发的时候，我们有时候会需要用到一个三角形的形状，比如地址选择或者播放器里面播放按钮</p>
<p><img src="https://static.vue-js.com/d6d8ff60-a279-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>通常情况下，我们会使用图片或者<code v-pre>svg</code>去完成三角形效果图，但如果单纯使用<code v-pre>css</code>如何完成一个三角形呢？</p>
<p>实现过程似乎也并不困难，通过边框就可完成</p>
<h2 id="二、实现过程" tabindex="-1"><a class="header-anchor" href="#二、实现过程" aria-hidden="true">#</a> 二、实现过程</h2>
<p>在以前也讲过盒子模型，默认情况下是一个矩形，实现也很简单</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">&lt;style>
  .border</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 2px solid<span class="token punctuation">;</span>
    <span class="token property">border-color</span><span class="token punctuation">:</span> #96ceb4 #ffeead #d9534f #ffad60<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
&lt;/style>
&lt;div class=<span class="token string">"border"</span>>&lt;/div>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果如下图所示：</p>
<p><img src="https://static.vue-js.com/e3f244e0-a279-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>将<code v-pre>border</code>设置<code v-pre>50px</code>，效果图如下所示：</p>
<p><img src="https://static.vue-js.com/ee0b42b0-a279-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>白色区域则为<code v-pre>width</code>、<code v-pre>height</code>，这时候只需要你将白色区域部分宽高逐渐变小，最终变为 0，则变成如下图所示：</p>
<p><img src="https://static.vue-js.com/2afaa030-a27a-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>这时候就已经能够看到 4 个不同颜色的三角形，如果需要下方三角形，只需要将上、左、右边框设置为 0 就可以得到下方的红色三角形</p>
<p><img src="https://static.vue-js.com/2afaa030-a27a-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>但这种方式，虽然视觉上是实现了三角形，但实际上，隐藏的部分任然占据部分高度，需要将上方的宽度去掉</p>
<p>最终实现代码如下：</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">.border</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> solid<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 0 50px 50px<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> transparent transparent #d9534f<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想要实现一个只有边框是空心的三角形，由于这里不能再使用<code v-pre>border</code>属性，所以最直接的方法是利用伪类新建一个小一点的三角形定位上去</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">.border</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> solid<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 0 50px 50px<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> transparent transparent #d9534f<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.border:after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">''</span><span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> solid<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 0 40px 40px<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> transparent transparent #96ceb4<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果图如下所示：</p>
<p><img src="https://static.vue-js.com/59f4d720-a27a-11eb-85f6-6fac77c0c9b3.png" alt="i"></p>
<p>伪类元素定位参照对象的内容区域宽高都为 0，则内容区域即可以理解成中心一点，所以伪元素相对中心这点定位</p>
<p>将元素定位进行微调以及改变颜色，就能够完成下方效果图：</p>
<p><img src="https://static.vue-js.com/653a6e10-a27a-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>最终代码如下：</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">.border:after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">''</span><span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> solid<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 0 40px 40px<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> transparent transparent #96ceb4<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 6px<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> -40px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、原理分析" tabindex="-1"><a class="header-anchor" href="#三、原理分析" aria-hidden="true">#</a> 三、原理分析</h2>
<p>可以看到，边框是实现三角形的部分，边框实际上并不是一个直线，如果我们将四条边设置不同的颜色，将边框逐渐放大，可以得到每条边框都是一个梯形</p>
<p><img src="https://static.vue-js.com/78d4bd90-a27a-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>当分别取消边框的时候，发现下面几种情况：</p>
<ul>
<li>取消一条边的时候，与这条边相邻的两条边的接触部分会变成直的</li>
<li>当仅有邻边时， 两个边会变成对分的三角</li>
<li>当保留边没有其他接触时，极限情况所有东西都会消失</li>
</ul>
<p><img src="https://static.vue-js.com/84586ef0-a27a-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>通过上图的变化规则，利用旋转、隐藏，以及设置内容宽高等属性，就能够实现其他类型的三角形</p>
<p>如设置直角三角形，如上图倒数第三行实现过程，我们就能知道整个实现原理</p>
<p>实现代码如下：</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token comment">/* 内部大小 */</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
  <span class="token comment">/* 边框大小 只设置两条边*/</span>
  <span class="token property">border-top</span><span class="token punctuation">:</span> #4285f4 solid<span class="token punctuation">;</span>
  <span class="token property">border-right</span><span class="token punctuation">:</span> transparent solid<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 85px<span class="token punctuation">;</span>
  <span class="token comment">/* 其他设置 */</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


