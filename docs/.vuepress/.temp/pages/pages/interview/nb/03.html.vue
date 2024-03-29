<template><div><h1 id="如何判断一个元素是否在可视区域中" tabindex="-1"><a class="header-anchor" href="#如何判断一个元素是否在可视区域中" aria-hidden="true">#</a> 如何判断一个元素是否在可视区域中？</h1>
<p><img src="https://static.vue-js.com/d848c790-8a05-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h2 id="一、用途" tabindex="-1"><a class="header-anchor" href="#一、用途" aria-hidden="true">#</a> 一、用途</h2>
<p>可视区域即我们浏览网页的设备肉眼可见的区域，如下图</p>
<p><img src="https://static.vue-js.com/9c5bbb10-8a56-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>在日常开发中，我们经常需要判断目标元素是否在视窗之内或者和视窗的距离小于一个值（例如 100 px），从而实现一些常用的功能，例如：</p>
<ul>
<li>图片的懒加载</li>
<li>列表的无限滚动</li>
<li>计算广告元素的曝光情况</li>
<li>可点击链接的预加载</li>
</ul>
<h2 id="二、实现方式" tabindex="-1"><a class="header-anchor" href="#二、实现方式" aria-hidden="true">#</a> 二、实现方式</h2>
<p>判断一个元素是否在可视区域，我们常用的有三种办法：</p>
<ul>
<li>
<p>offsetTop、scrollTop</p>
</li>
<li>
<p>getBoundingClientRect</p>
</li>
<li>
<p>Intersection Observer</p>
</li>
</ul>
<h3 id="offsettop、scrolltop" tabindex="-1"><a class="header-anchor" href="#offsettop、scrolltop" aria-hidden="true">#</a> offsetTop、scrollTop</h3>
<p><code v-pre>offsetTop</code>，元素的上外边框至包含元素的上内边框之间的像素距离，其他<code v-pre>offset</code>属性如下图所示：</p>
<p><img src="https://static.vue-js.com/b4b63ca0-8a54-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>下面再来了解下<code v-pre>clientWidth</code>、<code v-pre>clientHeight</code>：</p>
<ul>
<li><code v-pre>clientWidth</code>：元素内容区宽度加上左右内边距宽度，即<code v-pre>clientWidth = content + padding</code></li>
<li><code v-pre>clientHeight</code>：元素内容区高度加上上下内边距高度，即<code v-pre>clientHeight = content + padding</code></li>
</ul>
<p>这里可以看到<code v-pre>client</code>元素都不包括外边距</p>
<p>最后，关于<code v-pre>scroll</code>系列的属性如下：</p>
<ul>
<li>
<p><code v-pre>scrollWidth</code> 和 <code v-pre>scrollHeight</code> 主要用于确定元素内容的实际大小</p>
</li>
<li>
<p><code v-pre>scrollLeft</code> 和 <code v-pre>scrollTop</code> 属性既可以确定元素当前滚动的状态，也可以设置元素的滚动位置</p>
</li>
<li>
<ul>
<li>垂直滚动 <code v-pre>scrollTop &gt; 0</code></li>
<li>水平滚动 <code v-pre>scrollLeft &gt; 0</code></li>
</ul>
</li>
<li>
<p>将元素的 <code v-pre>scrollLeft</code> 和 <code v-pre>scrollTop</code> 设置为 0，可以重置元素的滚动位置</p>
</li>
</ul>
<h4 id="注意" tabindex="-1"><a class="header-anchor" href="#注意" aria-hidden="true">#</a> 注意</h4>
<ul>
<li>上述属性都是只读的，每次访问都要重新开始</li>
</ul>
<p>下面再看看如何实现判断：</p>
<p>公式如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>el<span class="token punctuation">.</span>offsetTop <span class="token operator">-</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>scrollTop <span class="token operator">&lt;=</span> viewPortHeight
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>代码实现：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">isInViewPortOfOne</span> <span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// viewPortHeight 兼容所有浏览器写法</span>
    <span class="token keyword">const</span> viewPortHeight <span class="token operator">=</span> window<span class="token punctuation">.</span>innerHeight <span class="token operator">||</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientHeight <span class="token operator">||</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>clientHeight 
    <span class="token keyword">const</span> offsetTop <span class="token operator">=</span> el<span class="token punctuation">.</span>offsetTop
    <span class="token keyword">const</span> scrollTop <span class="token operator">=</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>scrollTop
    <span class="token keyword">const</span> top <span class="token operator">=</span> offsetTop <span class="token operator">-</span> scrollTop
    <span class="token keyword">return</span> top <span class="token operator">&lt;=</span> viewPortHeight
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="getboundingclientrect" tabindex="-1"><a class="header-anchor" href="#getboundingclientrect" aria-hidden="true">#</a> getBoundingClientRect</h3>
<p>返回值是一个 <code v-pre>DOMRect</code>对象，拥有<code v-pre>left</code>, <code v-pre>top</code>, <code v-pre>right</code>, <code v-pre>bottom</code>, <code v-pre>x</code>, <code v-pre>y</code>, <code v-pre>width</code>, 和 <code v-pre>height</code>属性</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> target <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.target'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> clientRect <span class="token operator">=</span> target<span class="token punctuation">.</span><span class="token function">getBoundingClientRect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>clientRect<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// {</span>
<span class="token comment">//   bottom: 556.21875,</span>
<span class="token comment">//   height: 393.59375,</span>
<span class="token comment">//   left: 333,</span>
<span class="token comment">//   right: 1017,</span>
<span class="token comment">//   top: 162.625,</span>
<span class="token comment">//   width: 684</span>
<span class="token comment">// }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>属性对应的关系图如下所示：</p>
<p><img src="https://static.vue-js.com/e34ac5d0-8a05-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>当页面发生滚动的时候，<code v-pre>top</code>与<code v-pre>left</code>属性值都会随之改变</p>
<p>如果一个元素在视窗之内的话，那么它一定满足下面四个条件：</p>
<ul>
<li>top 大于等于 0</li>
<li>left 大于等于 0</li>
<li>bottom 小于等于视窗高度</li>
<li>right 小于等于视窗宽度</li>
</ul>
<p>实现代码如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">isInViewPort</span><span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> viewWidth <span class="token operator">=</span> window<span class="token punctuation">.</span>innerWidth <span class="token operator">||</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientWidth<span class="token punctuation">;</span>
  <span class="token keyword">const</span> viewHeight <span class="token operator">=</span> window<span class="token punctuation">.</span>innerHeight <span class="token operator">||</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientHeight<span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span>
    top<span class="token punctuation">,</span>
    right<span class="token punctuation">,</span>
    bottom<span class="token punctuation">,</span>
    left<span class="token punctuation">,</span>
  <span class="token punctuation">}</span> <span class="token operator">=</span> element<span class="token punctuation">.</span><span class="token function">getBoundingClientRect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    top <span class="token operator">>=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span>
    left <span class="token operator">>=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span>
    right <span class="token operator">&lt;=</span> viewWidth <span class="token operator">&amp;&amp;</span>
    bottom <span class="token operator">&lt;=</span> viewHeight
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="intersection-observer" tabindex="-1"><a class="header-anchor" href="#intersection-observer" aria-hidden="true">#</a> Intersection Observer</h3>
<p><code v-pre>Intersection Observer</code> 即重叠观察者，从这个命名就可以看出它用于判断两个元素是否重叠，因为不用进行事件的监听，性能方面相比<code v-pre>getBoundingClientRect</code>会好很多</p>
<p>使用步骤主要分为两步：创建观察者和传入被观察者</p>
<h4 id="创建观察者" tabindex="-1"><a class="header-anchor" href="#创建观察者" aria-hidden="true">#</a> 创建观察者</h4>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 表示重叠面积占被观察者的比例，从 0 - 1 取值，</span>
  <span class="token comment">// 1 表示完全被包含</span>
  <span class="token literal-property property">threshold</span><span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span> 
  <span class="token literal-property property">root</span><span class="token operator">:</span>document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#scrollArea'</span><span class="token punctuation">)</span> <span class="token comment">// 必须是目标元素的父级元素</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">callback</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">entries<span class="token punctuation">,</span> observer</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token operator">...</span><span class="token punctuation">.</span><span class="token punctuation">}</span>

<span class="token keyword">const</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IntersectionObserver</span><span class="token punctuation">(</span>callback<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过<code v-pre>new IntersectionObserver</code>创建了观察者 <code v-pre>observer</code>，传入的参数 <code v-pre>callback</code> 在重叠比例超过 <code v-pre>threshold</code> 时会被执行`</p>
<p>关于<code v-pre>callback</code>回调函数常用属性如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 上段代码中被省略的 callback</span>
<span class="token keyword">const</span> <span class="token function-variable function">callback</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">entries<span class="token punctuation">,</span> observer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    entries<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">entry</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        entry<span class="token punctuation">.</span>time<span class="token punctuation">;</span>               <span class="token comment">// 触发的时间</span>
        entry<span class="token punctuation">.</span>rootBounds<span class="token punctuation">;</span>         <span class="token comment">// 根元素的位置矩形，这种情况下为视窗位置</span>
        entry<span class="token punctuation">.</span>boundingClientRect<span class="token punctuation">;</span> <span class="token comment">// 被观察者的位置举行</span>
        entry<span class="token punctuation">.</span>intersectionRect<span class="token punctuation">;</span>   <span class="token comment">// 重叠区域的位置矩形</span>
        entry<span class="token punctuation">.</span>intersectionRatio<span class="token punctuation">;</span>  <span class="token comment">// 重叠区域占被观察者面积的比例（被观察者不是矩形时也按照矩形计算）</span>
        entry<span class="token punctuation">.</span>target<span class="token punctuation">;</span>             <span class="token comment">// 被观察者</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="传入被观察者" tabindex="-1"><a class="header-anchor" href="#传入被观察者" aria-hidden="true">#</a> 传入被观察者</h4>
<p>通过 <code v-pre>observer.observe(target)</code> 这一行代码即可简单的注册被观察者</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> target <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.target'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、案例分析" tabindex="-1"><a class="header-anchor" href="#三、案例分析" aria-hidden="true">#</a> 三、案例分析</h3>
<p>实现：创建了一个十万个节点的长列表，当节点滚入到视窗中时，背景就会从红色变为黄色</p>
<p><code v-pre>Html</code>结构如下：</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>css</code>样式如下：</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.target</span> <span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>往<code v-pre>container</code>插入1000个元素</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> $container <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">".container"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 插入 100000 个 &lt;div class="target">&lt;/div></span>
<span class="token keyword">function</span> <span class="token function">createTargets</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> htmlString <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">100000</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token string">'&lt;div class="target">&lt;/div>'</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  $container<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span>htmlString<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，首先使用<code v-pre>getBoundingClientRect</code>方法进行判断元素是否在可视区域</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">isInViewPort</span><span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> viewWidth <span class="token operator">=</span> window<span class="token punctuation">.</span>innerWidth <span class="token operator">||</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientWidth<span class="token punctuation">;</span>
    <span class="token keyword">const</span> viewHeight <span class="token operator">=</span>
          window<span class="token punctuation">.</span>innerHeight <span class="token operator">||</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientHeight<span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> top<span class="token punctuation">,</span> right<span class="token punctuation">,</span> bottom<span class="token punctuation">,</span> left <span class="token punctuation">}</span> <span class="token operator">=</span> element<span class="token punctuation">.</span><span class="token function">getBoundingClientRect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> top <span class="token operator">>=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> left <span class="token operator">>=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> right <span class="token operator">&lt;=</span> viewWidth <span class="token operator">&amp;&amp;</span> bottom <span class="token operator">&lt;=</span> viewHeight<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后开始监听<code v-pre>scroll</code>事件，判断页面上哪些元素在可视区域中，如果在可视区域中则将背景颜色设置为<code v-pre>yellow</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"scroll"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"scroll !"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    $targets<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">index<span class="token punctuation">,</span> element</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isInViewPort</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">$</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">css</span><span class="token punctuation">(</span><span class="token string">"background-color"</span><span class="token punctuation">,</span> <span class="token string">"yellow"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上述方式，可以看到可视区域颜色会变成黄色了，但是可以明显看到有卡顿的现象，原因在于我们绑定了<code v-pre>scroll</code>事件，<code v-pre>scroll</code>事件伴随了大量的计算，会造成资源方面的浪费</p>
<p>下面通过<code v-pre>Intersection Observer</code>的形式同样实现相同的功能</p>
<p>首先创建一个观察者</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IntersectionObserver</span><span class="token punctuation">(</span>getYellow<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">threshold</span><span class="token operator">:</span> <span class="token number">1.0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>getYellow</code>回调函数实现对背景颜色改变，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getYellow</span><span class="token punctuation">(</span><span class="token parameter">entries<span class="token punctuation">,</span> observer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    entries<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">entry</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">$</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">css</span><span class="token punctuation">(</span><span class="token string">"background-color"</span><span class="token punctuation">,</span> <span class="token string">"yellow"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后传入观察者，即<code v-pre>.target</code>元素</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$targets<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">index<span class="token punctuation">,</span> element</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到功能同样完成，并且页面不会出现卡顿的情况</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect</li>
<li>https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API</li>
</ul>
</div></template>


