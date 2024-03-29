<template><div><h1 id="说说你对盒子模型的理解" tabindex="-1"><a class="header-anchor" href="#说说你对盒子模型的理解" aria-hidden="true">#</a> 说说你对盒子模型的理解?</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<ul>
<li>
<p>盒子模型组成有 4 部分,分别为:内容 内边距 外边距(一般不计入盒子实际宽度) 边框</p>
</li>
<li>
<p>盒子模型有 2 种:标准盒子模型与怪异盒子模型</p>
</li>
<li>
<p>标准盒子模型=content(内容)+border(边框)+padding(内边距)</p>
</li>
<li>
<p>怪异盒子模型=content(内容)(已经包含了 padding 和 border)</p>
</li>
<li>
<p>css3 种可以通过设置 box-sizing 属性来完成标准或许怪异盒子模型之间的切换,怪异盒子模型:box-sizing: border-box;标准盒子模型:box-sizing:content-box</p>
</li>
</ul>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><img src="https://static.vue-js.com/8d0e9ca0-8f9b-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>当对一个文档进行布局（layout）的时候，浏览器的渲染引擎会根据标准之一的 CSS 基础框盒模型（CSS basic box model），将所有元素表示为一个个矩形的盒子（box）</p>
<p>一个盒子由四个部分组成：<code v-pre>content</code>、<code v-pre>padding</code>、<code v-pre>border</code>、<code v-pre>margin</code></p>
<p><img src="https://static.vue-js.com/976789a0-8f9b-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p><code v-pre>content</code>，即实际内容，显示文本和图像</p>
<p><code v-pre>boreder</code>，即边框，围绕元素内容的内边距的一条或多条线，由粗细、样式、颜色三部分组成</p>
<p><code v-pre>padding</code>，即内边距，清除内容周围的区域，内边距是透明的，取值不能为负，受盒子的<code v-pre>background</code>属性影响</p>
<p><code v-pre>margin</code>，即外边距，在元素外创建额外的空白，空白通常指不能放其他元素的区域</p>
<p>上述是一个从二维的角度观察盒子，下面再看看看三维图：</p>
<p><img src="https://static.vue-js.com/b2548b00-8f9b-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>下面来段代码：</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">.box</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>盒子模型<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们在浏览器查看元素时，却发现元素的大小变成了<code v-pre>240px</code></p>
<p>这是因为，在<code v-pre>CSS</code>中，盒子模型可以分成：</p>
<ul>
<li>W3C 标准盒子模型</li>
<li>IE 怪异盒子模型</li>
</ul>
<p>默认情况下，盒子模型为<code v-pre>W3C</code> 标准盒子模型</p>
<h2 id="二、标准盒子模型" tabindex="-1"><a class="header-anchor" href="#二、标准盒子模型" aria-hidden="true">#</a> 二、标准盒子模型</h2>
<p>标准盒子模型，是浏览器默认的盒子模型</p>
<p>下面看看标准盒子模型的模型图：</p>
<p><img src="https://static.vue-js.com/c0e1d2e0-8f9b-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>从上图可以看到：</p>
<ul>
<li>
<p>盒子总宽度 = width + padding + border + margin;</p>
</li>
<li>
<p>盒子总高度 = height + padding + border + margin</p>
</li>
</ul>
<p>也就是，<code v-pre>width/height</code> 只是内容高度，不包含 <code v-pre>padding</code> 和 <code v-pre>border</code>值</p>
<p>所以上面问题中，设置<code v-pre>width</code>为 200px，但由于存在<code v-pre>padding</code>，但实际上盒子的宽度有 240px</p>
<h2 id="三、ie-怪异盒子模型" tabindex="-1"><a class="header-anchor" href="#三、ie-怪异盒子模型" aria-hidden="true">#</a> 三、IE 怪异盒子模型</h2>
<p>同样看看 IE 怪异盒子模型的模型图：</p>
<p><img src="https://static.vue-js.com/cfbb3ef0-8f9b-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>从上图可以看到：</p>
<ul>
<li>
<p>盒子总宽度 = width + margin;</p>
</li>
<li>
<p>盒子总高度 = height + margin;</p>
</li>
</ul>
<p>也就是，<code v-pre>width/height</code> 包含了 <code v-pre>padding</code>和 <code v-pre>border</code>值</p>
<h2 id="box-sizing" tabindex="-1"><a class="header-anchor" href="#box-sizing" aria-hidden="true">#</a> Box-sizing</h2>
<p>CSS 中的 box-sizing 属性定义了引擎应该如何计算一个元素的总宽度和总高度</p>
<p>语法：</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token property">box-sizing</span><span class="token punctuation">:</span> content-box|border-box|<span class="token property">inherit</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>content-box 默认值，元素的 width/height 不包含 padding，border，与标准盒子模型表现一致</li>
<li>border-box 元素的 width/height 包含 padding，border，与怪异盒子模型表现一致</li>
<li>inherit 指定 box-sizing 属性的值，应该从父元素继承</li>
</ul>
<p>回到上面的例子里，设置盒子为 border-box 模型</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">.box</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>盒子模型<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候，就可以发现盒子的所占据的宽度为 200px</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model</li>
<li>https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing</li>
</ul>
</div></template>


