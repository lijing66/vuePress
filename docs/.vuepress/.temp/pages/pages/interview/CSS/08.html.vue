<template><div><h1 id="什么是响应式设计-响应式设计的基本原理是什么-如何做" tabindex="-1"><a class="header-anchor" href="#什么是响应式设计-响应式设计的基本原理是什么-如何做" aria-hidden="true">#</a> 什么是响应式设计？响应式设计的基本原理是什么？如何做？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>我这么理解:响应式布局就是一个网站能够兼容多个设备，可以根据屏幕的大小自动调整页面的的展示方式以及布局，我们不用为每一个设备做一个特定的版本; 应式网站的特点:</p>
<ul>
<li>
<p>同时适配 PC + 平板 + 手机等</p>
</li>
<li>
<p>网站的布局会根据视口来调整模块的大小和位置</p>
</li>
<li>
<p>响应式设计的基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理来设置差异化的 css 样式.</p>
</li>
<li>
<p>链接:https://juejin.cn/post/6844904082751111176</p>
</li>
</ul>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>响应式网站设计（Responsive Web design）是一种网络页面设计布局，页面的设计与开发应当根据用户行为以及设备环境(系统平台、屏幕尺寸、屏幕定向等)进行相应的响应和调整</p>
<p>描述响应式界面最著名的一句话就是“Content is like water”</p>
<p>大白话便是“如果将屏幕看作容器，那么内容就像水一样”</p>
<p>响应式网站常见特点：</p>
<ul>
<li>
<p>同时适配 PC + 平板 + 手机等</p>
</li>
<li>
<p>标签导航在接近手持终端设备时改变为经典的抽屉式导航</p>
</li>
<li>
<p>网站的布局会根据视口来调整模块的大小和位置</p>
</li>
</ul>
<p><img src="https://static.vue-js.com/ae68be30-9dba-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h2 id="二、实现方式" tabindex="-1"><a class="header-anchor" href="#二、实现方式" aria-hidden="true">#</a> 二、实现方式</h2>
<p>响应式设计的基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理，为了处理移动端，页面头部必须有<code v-pre>meta</code>声明<code v-pre>viewport</code></p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no”>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>属性对应如下：</p>
<ul>
<li>
<p>width=device-width: 是自适应手机屏幕的尺寸宽度</p>
</li>
<li>
<p>maximum-scale:是缩放比例的最大值</p>
</li>
<li>
<p>inital-scale:是缩放的初始化</p>
</li>
<li>
<p>user-scalable:是用户的可以缩放的操作</p>
</li>
</ul>
<p>实现响应式布局的方式有如下：</p>
<ul>
<li>媒体查询</li>
<li>百分比</li>
<li>vw/vh</li>
<li>rem</li>
</ul>
<h3 id="媒体查询" tabindex="-1"><a class="header-anchor" href="#媒体查询" aria-hidden="true">#</a> 媒体查询</h3>
<p><code v-pre>CSS3</code>中的增加了更多的媒体查询，就像<code v-pre>if</code>条件表达式一样，我们可以设置不同类型的媒体条件，并根据对应的条件，给相应符合条件的媒体调用相对应的样式表</p>
<p>使用<code v-pre>@Media</code>查询，可以针对不同的媒体类型定义不同的样式，如：</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token atrule"><span class="token rule">@media</span> screen <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">max-width</span><span class="token punctuation">:</span> 1920px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  ...<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当视口在 375px - 600px 之间，设置特定字体大小 18px</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token atrule"><span class="token rule">@media</span> screen <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 375px<span class="token punctuation">)</span> <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">max-width</span><span class="token punctuation">:</span> 600px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token selector">body</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 18px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过媒体查询，可以通过给不同分辨率的设备编写不同的样式来实现响应式的布局，比如我们为不同分辨率的屏幕，设置不同的背景图片</p>
<p>比如给小屏幕手机设置@2x 图，为大屏幕手机设置@3x 图，通过媒体查询就能很方便的实现</p>
<h3 id="百分比" tabindex="-1"><a class="header-anchor" href="#百分比" aria-hidden="true">#</a> 百分比</h3>
<p>通过百分比单位 &quot; % &quot; 来实现响应式的效果</p>
<p>比如当浏览器的宽度或者高度发生变化时，通过百分比单位，可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果</p>
<p><code v-pre>height</code>、<code v-pre>width</code>属性的百分比依托于父标签的宽高，但是其他盒子属性则不完全依赖父元素：</p>
<ul>
<li>
<p>子元素的 top/left 和 bottom/right 如果设置百分比，则相对于直接非 static 定位(默认定位)的父元素的高度/宽度</p>
</li>
<li>
<p>子元素的 padding 如果设置百分比，不论是垂直方向或者是水平方向，都相对于直接父亲元素的 width，而与父元素的 height 无关。</p>
</li>
<li>
<p>子元素的 margin 如果设置成百分比，不论是垂直方向还是水平方向，都相对于直接父元素的 width</p>
</li>
<li>
<p>border-radius 不一样，如果设置 border-radius 为百分比，则是相对于自身的宽度</p>
</li>
</ul>
<p>可以看到每个属性都使用百分比，会照成布局的复杂度，所以不建议使用百分比来实现响应式</p>
<h3 id="vw-vh" tabindex="-1"><a class="header-anchor" href="#vw-vh" aria-hidden="true">#</a> vw/vh</h3>
<p><code v-pre>vw</code>表示相对于视图窗口的宽度，<code v-pre>vh</code>表示相对于视图窗口高度。 任意层级元素，在使用<code v-pre>vw</code>单位的情况下，<code v-pre>1vw</code>都等于视图宽度的百分之一</p>
<p>与百分比布局很相似，在以前文章提过与<code v-pre>%</code>的区别，这里就不再展开述说</p>
<h3 id="rem" tabindex="-1"><a class="header-anchor" href="#rem" aria-hidden="true">#</a> rem</h3>
<p>在以前也讲到，<code v-pre>rem</code>是相对于根元素<code v-pre>html</code>的<code v-pre>font-size</code>属性，默认情况下浏览器字体大小为<code v-pre>16px</code>，此时<code v-pre>1rem = 16px</code></p>
<p>可以利用前面提到的媒体查询，针对不同设备分辨率改变<code v-pre>font-size</code>的值，如下：</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token atrule"><span class="token rule">@media</span> screen <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">max-width</span><span class="token punctuation">:</span> 414px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token selector">html</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 18px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token atrule"><span class="token rule">@media</span> screen <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">max-width</span><span class="token punctuation">:</span> 375px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token selector">html</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token atrule"><span class="token rule">@media</span> screen <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">max-width</span><span class="token punctuation">:</span> 320px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token selector">html</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了更准确监听设备可视窗口变化，我们可以在<code v-pre>css</code>之前插入<code v-pre>script</code>标签，内容如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">//动态为根元素设置字体大小</span>
<span class="token keyword">function</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 获取屏幕宽度</span>
  <span class="token keyword">var</span> width <span class="token operator">=</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientWidth
  <span class="token comment">// 设置根元素字体大小。此时为宽的10等分</span>
  document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>style<span class="token punctuation">.</span>fontSize <span class="token operator">=</span> width <span class="token operator">/</span> <span class="token number">10</span> <span class="token operator">+</span> <span class="token string">'px'</span>
<span class="token punctuation">}</span>

<span class="token comment">//首次加载应用，设置一次</span>
<span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 监听手机旋转的事件的时机，重新设置</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'orientationchange'</span><span class="token punctuation">,</span> init<span class="token punctuation">)</span>
<span class="token comment">// 监听手机窗口变化，重新设置</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'resize'</span><span class="token punctuation">,</span> init<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>无论设备可视窗口如何变化，始终设置<code v-pre>rem</code>为<code v-pre>width</code>的 1/10，实现了百分比布局</p>
<p>除此之外，我们还可以利用主流<code v-pre>UI</code>框架，如：<code v-pre>element ui</code>、<code v-pre>antd</code>提供的栅格布局实现响应式</p>
<h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3>
<p>响应式设计实现通常会从以下几方面思考：</p>
<ul>
<li>弹性盒子（包括图片、表格、视频）和媒体查询等技术</li>
<li>使用百分比布局创建流式布局的弹性 UI，同时使用媒体查询限制元素的尺寸和内容变更范围</li>
<li>使用相对单位使得内容自适应调节</li>
<li>选择断点，针对不同断点实现不同布局和内容展示</li>
</ul>
<h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p>响应式布局优点可以看到：</p>
<ul>
<li>面对不同分辨率设备灵活性强</li>
<li>能够快捷解决多设备显示适应问题</li>
</ul>
<p>缺点：</p>
<ul>
<li>仅适用布局、信息、框架并不复杂的部门类型网站</li>
<li>兼容各种设备工作量大，效率低下</li>
<li>代码累赘，会出现隐藏无用的元素，加载时间加长</li>
<li>其实这是一种折中性质的设计解决方案，多方面因素影响而达不到最佳效果</li>
<li>一定程度上改变了网站原有的布局结构，会出现用户混淆的情况</li>
</ul>
</div></template>


