<template><div><h1 id="如何实现上拉加载-下拉刷新" tabindex="-1"><a class="header-anchor" href="#如何实现上拉加载-下拉刷新" aria-hidden="true">#</a> 如何实现上拉加载，下拉刷新？</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>下拉刷新和上拉加载这两种交互方式通常出现在移动端中</p>
<p>本质上等同于PC网页中的分页，只是交互形式不同</p>
<p>开源社区也有很多优秀的解决方案，如<code v-pre>iscroll</code>、<code v-pre>better-scroll</code>、<code v-pre>pulltorefresh.js</code>库等等</p>
<p>这些第三方库使用起来非常便捷</p>
<p>我们通过原生的方式实现一次上拉加载，下拉刷新，有助于对第三方库有更好的理解与使用</p>
<h2 id="实现原理" tabindex="-1"><a class="header-anchor" href="#实现原理" aria-hidden="true">#</a> 实现原理</h2>
<p>上拉加载及下拉刷新都依赖于用户交互</p>
<p>最重要的是要理解在什么场景，什么时机下触发交互动作</p>
<h3 id="上拉加载" tabindex="-1"><a class="header-anchor" href="#上拉加载" aria-hidden="true">#</a> 上拉加载</h3>
<p>首先可以看一张图</p>
<p><img src="http://fanyouf.gitee.io/interview/assets/img/df498a00-8ae3-11eb-ab90-d9ae814b240d.1ac89f54.png" alt=""></p>
<p>上拉加载的本质是页面触底，或者快要触底时的动作</p>
<p>判断页面触底我们需要先了解一下下面几个属性</p>
<ul>
<li>
<p><code v-pre>scrollTop</code>：滚动视窗的高度距离<code v-pre>window</code>顶部的距离，它会随着往上滚动而不断增加，初始值是0，它是一个变化的值</p>
</li>
<li>
<p><code v-pre>clientHeight</code>:它是一个定值，表示屏幕可视区域的高度；</p>
</li>
<li>
<p><code v-pre>scrollHeight</code>：页面不能滚动时也是存在的,此时scrollHeight等于clientHeight。scrollHeight表示<code v-pre>body</code>所有元素的总长度(包括body元素自身的padding)</p>
</li>
</ul>
<p>综上我们得出一个触底公式：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>scrollTop <span class="token operator">+</span> clientHeight <span class="token operator">>=</span> scrollHeight
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>简单实现</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> clientHeight  <span class="token operator">=</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientHeight<span class="token punctuation">;</span> <span class="token comment">//浏览器高度</span>
<span class="token keyword">let</span> scrollHeight <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>scrollHeight<span class="token punctuation">;</span>
<span class="token keyword">let</span> scrollTop <span class="token operator">=</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>scrollTop<span class="token punctuation">;</span>
 
<span class="token keyword">let</span> distance <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">;</span>  <span class="token comment">//距离视窗还用50的时候，开始触发；</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>scrollTop <span class="token operator">+</span> clientHeight<span class="token punctuation">)</span> <span class="token operator">>=</span> <span class="token punctuation">(</span>scrollHeight <span class="token operator">-</span> distance<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"开始加载数据"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="下拉刷新" tabindex="-1"><a class="header-anchor" href="#下拉刷新" aria-hidden="true">#</a> 下拉刷新</h3>
<p>下拉刷新的本质是页面本身置于顶部时，用户下拉时需要触发的动作</p>
<p>关于下拉刷新的原生实现，主要分成三步：</p>
<ul>
<li>监听原生<code v-pre>touchstart</code>事件，记录其初始位置的值，<code v-pre>e.touches[0].pageY</code>；</li>
<li>监听原生<code v-pre>touchmove</code>事件，记录并计算当前滑动的位置值与初始位置值的差值，大于<code v-pre>0</code>表示向下拉动，并借助CSS3的<code v-pre>translateY</code>属性使元素跟随手势向下滑动对应的差值，同时也应设置一个允许滑动的最大值；</li>
<li>监听原生<code v-pre>touchend</code>事件，若此时元素滑动达到最大值，则触发<code v-pre>callback</code>，同时将<code v-pre>translateY</code>重设为<code v-pre>0</code>，元素回到初始位置</li>
</ul>
<p>举个例子：</p>
<p><code v-pre>Html</code>结构如下：</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>main</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>refreshText<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span> <span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>refreshContainer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>111<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>222<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>333<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>444<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>555<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
        ...
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>main</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>监听<code v-pre>touchstart</code>事件，记录初始的值</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> _element <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'refreshContainer'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    _refreshText <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.refreshText'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    _startPos <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token comment">// 初始的值</span>
    _transitionHeight <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 移动的距离</span>

_element<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'touchstart'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    _startPos <span class="token operator">=</span> e<span class="token punctuation">.</span>touches<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>pageY<span class="token punctuation">;</span> <span class="token comment">// 记录初始位置</span>
    _element<span class="token punctuation">.</span>style<span class="token punctuation">.</span>position <span class="token operator">=</span> <span class="token string">'relative'</span><span class="token punctuation">;</span>
    _element<span class="token punctuation">.</span>style<span class="token punctuation">.</span>transition <span class="token operator">=</span> <span class="token string">'transform 0s'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>监听<code v-pre>touchmove</code>移动事件，记录滑动差值</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>_element<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'touchmove'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// e.touches[0].pageY 当前位置</span>
    _transitionHeight <span class="token operator">=</span> e<span class="token punctuation">.</span>touches<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>pageY <span class="token operator">-</span> _startPos<span class="token punctuation">;</span> <span class="token comment">// 记录差值</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>_transitionHeight <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> _transitionHeight <span class="token operator">&lt;</span> <span class="token number">60</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        _refreshText<span class="token punctuation">.</span>innerText <span class="token operator">=</span> <span class="token string">'下拉刷新'</span><span class="token punctuation">;</span> 
        _element<span class="token punctuation">.</span>style<span class="token punctuation">.</span>transform <span class="token operator">=</span> <span class="token string">'translateY('</span><span class="token operator">+</span>_transitionHeight<span class="token operator">+</span><span class="token string">'px)'</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>_transitionHeight <span class="token operator">></span> <span class="token number">55</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            _refreshText<span class="token punctuation">.</span>innerText <span class="token operator">=</span> <span class="token string">'释放更新'</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>                
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，就是监听<code v-pre>touchend</code>离开的事件</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>_element<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'touchend'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    _element<span class="token punctuation">.</span>style<span class="token punctuation">.</span>transition <span class="token operator">=</span> <span class="token string">'transform 0.5s ease 1s'</span><span class="token punctuation">;</span>
    _element<span class="token punctuation">.</span>style<span class="token punctuation">.</span>transform <span class="token operator">=</span> <span class="token string">'translateY(0px)'</span><span class="token punctuation">;</span>
    _refreshText<span class="token punctuation">.</span>innerText <span class="token operator">=</span> <span class="token string">'更新中...'</span><span class="token punctuation">;</span>
    <span class="token comment">// todo...</span>

<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面可以看到，在下拉到松手的过程中，经历了三个阶段：</p>
<ul>
<li>当前手势滑动位置与初始位置差值大于零时，提示正在进行下拉刷新操作</li>
<li>下拉到一定值时，显示松手释放后的操作提示</li>
<li>下拉到达设定最大值松手时，执行回调，提示正在进行更新操作</li>
</ul>
<h2 id="案例" tabindex="-1"><a class="header-anchor" href="#案例" aria-hidden="true">#</a> 案例</h2>
<p>在实际开发中，我们更多的是使用第三方库，下面以<code v-pre>better-scroll</code>进行举例：</p>
<p>HTML结构</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>position-wrapper<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>refresh<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>下拉刷新<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span> <span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>position-list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
   <span class="token comment">&lt;!--列表内容--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>more<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>查看更多<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span> <span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实例化上拉下拉插件，通过<code v-pre>use</code>来注册插件</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> BScroll <span class="token keyword">from</span> <span class="token string">"@better-scroll/core"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> PullDown <span class="token keyword">from</span> <span class="token string">"@better-scroll/pull-down"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> PullUp <span class="token keyword">from</span> <span class="token string">'@better-scroll/pull-up'</span><span class="token punctuation">;</span>
BScroll<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>PullDown<span class="token punctuation">)</span><span class="token punctuation">;</span>
BScroll<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>PullUp<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实例化<code v-pre>BetterScroll</code>，并传入相关的参数</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> pageNo <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>pageSize <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">,</span>dataList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>isMore <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>  
<span class="token keyword">var</span> scroll<span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BScroll</span><span class="token punctuation">(</span><span class="token string">"#position-wrapper"</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token literal-property property">scrollY</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//垂直方向滚动</span>
    <span class="token literal-property property">click</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//默认会阻止浏览器的原生click事件，如果需要点击，这里要设为true</span>
    <span class="token literal-property property">pullUpLoad</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//上拉加载更多</span>
    <span class="token literal-property property">pullDownRefresh</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">threshold</span><span class="token operator">:</span><span class="token number">50</span><span class="token punctuation">,</span><span class="token comment">//触发pullingDown事件的位置</span>
        <span class="token literal-property property">stop</span><span class="token operator">:</span><span class="token number">0</span><span class="token comment">//下拉回弹后停留的位置</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//监听下拉刷新</span>
scroll<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"pullingDown"</span><span class="token punctuation">,</span>pullingDownHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//监测实时滚动</span>
scroll<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"scroll"</span><span class="token punctuation">,</span>scrollHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//上拉加载更多</span>
scroll<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"pullingUp"</span><span class="token punctuation">,</span>pullingUpHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">pullingDownHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    dataList<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    pageNo<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
    isMore<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">".more"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token string">"查看更多"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">await</span> <span class="token function">getlist</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//请求数据</span>
    scroll<span class="token punctuation">.</span><span class="token function">finishPullDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//每次下拉结束后，需要执行这个操作</span>
    scroll<span class="token punctuation">.</span><span class="token function">refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//当滚动区域的dom结构有变化时，需要执行这个操作</span>
<span class="token punctuation">}</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">pullingUpHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>isMore<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">".more"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token string">"没有更多数据了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        scroll<span class="token punctuation">.</span><span class="token function">finishPullUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//每次上拉结束后，需要执行这个操作</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    pageNo<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getlist</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//请求数据</span>
    scroll<span class="token punctuation">.</span><span class="token function">finishPullUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//每次上拉结束后，需要执行这个操作</span>
    scroll<span class="token punctuation">.</span><span class="token function">refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//当滚动区域的dom结构有变化时，需要执行这个操作    </span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">scrollHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>y<span class="token operator">></span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'.refresh'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token string">"松手开始加载"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'.refresh'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token string">"下拉刷新"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">getlist</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//返回的数据</span>
    <span class="token keyword">let</span> result<span class="token operator">=</span><span class="token operator">...</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
    dataList<span class="token operator">=</span>dataList<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//判断是否已加载完</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>length<span class="token operator">&lt;</span>pageSize<span class="token punctuation">)</span> isMore<span class="token operator">=</span><span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token comment">//将dataList渲染到html内容中</span>
<span class="token punctuation">}</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意点：</p>
<p>使用<code v-pre>better-scroll</code>实现下拉刷新、上拉加载时要注意以下几点：</p>
<ul>
<li><code v-pre>wrapper</code>里必须只有一个子元素</li>
<li>子元素的高度要比<code v-pre>wrapper</code>要高</li>
<li>使用的时候，要确定<code v-pre>DOM</code>元素是否已经生成，必须要等到<code v-pre>DOM</code>渲染完成后，再<code v-pre>new BScroll()</code></li>
<li>滚动区域的<code v-pre>DOM</code>元素结构有变化后，需要执行刷新 <code v-pre>refresh()</code></li>
<li>上拉或者下拉，结束后，需要执行<code v-pre>finishPullUp()</code>或者<code v-pre>finishPullDown()</code>，否则将不会执行下次操作</li>
<li><code v-pre>better-scroll</code>，默认会阻止浏览器的原生<code v-pre>click</code>事件，如果滚动内容区要添加点击事件，需要在实例化属性里设置<code v-pre>click:true</code></li>
</ul>
<h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3>
<p>下拉刷新、上拉加载原理本身都很简单，真正复杂的是封装过程中，要考虑的兼容性、易用性、性能等诸多细节</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://segmentfault.com/a/1190000014423308</li>
<li>https://github.com/ustbhuangyi/better-scroll</li>
</ul>
</div></template>


