<template><div><h1 id="vue-中的过滤器了解吗-过滤器的应用场景有哪些" tabindex="-1"><a class="header-anchor" href="#vue-中的过滤器了解吗-过滤器的应用场景有哪些" aria-hidden="true">#</a> Vue 中的过滤器了解吗？过滤器的应用场景有哪些？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<ul>
<li>
<p>【是什么】：过滤器本质上来说是一个方法，可以对模板中的数据进行加工处理。【怎么用】：可以通过 Vue.filter 全局注册一个过滤器，或者组件内通过 filters 进行局部注册。</p>
</li>
<li>
<p>【场景】：例如我们经常需要对后端返回的日期处理成符合我们需要的格式，这个时候就可以用到过滤器。</p>
</li>
<li>
<p>【注意点】：Vue3 删除了过滤器，可以用methods替代。</p>
</li>
</ul>
<h2 id="filter-是什么" tabindex="-1"><a class="header-anchor" href="#filter-是什么" aria-hidden="true">#</a> filter 是什么</h2>
<p>过滤器（<code v-pre>filter</code>）是输送介质管道上不可缺少的一种装置</p>
<p>大白话，就是把一些不必要的东西过滤掉</p>
<p>过滤器实质不改变原始数据，只是对数据进行加工处理后返回过滤后的数据再进行调用处理，我们也可以理解其为一个纯函数</p>
<p><code v-pre>Vue</code> 允许你自定义过滤器，可被用于一些常见的文本格式化</p>
<p>ps: <code v-pre>Vue3</code>中已废弃<code v-pre>filter</code></p>
<h2 id="如何用" tabindex="-1"><a class="header-anchor" href="#如何用" aria-hidden="true">#</a> 如何用</h2>
<p><code v-pre>vue</code>中的过滤器可以用在两个地方：双花括号插值和 <code v-pre>v-bind</code> 表达式，过滤器应该被添加在 <code v-pre>JavaScript</code>表达式的尾部，由“管道”符号指示：</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- 在双花括号中 --></span>
{{ message | capitalize }}

<span class="token comment">&lt;!-- 在 `v-bind` 中 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name"><span class="token namespace">v-bind:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>rawId | formatId<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="定义-filter" tabindex="-1"><a class="header-anchor" href="#定义-filter" aria-hidden="true">#</a> 定义 filter</h3>
<p>在组件的选项中定义本地的过滤器</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">filters</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">capitalize</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>value<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">''</span>
    value <span class="token operator">=</span> value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> value<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> value<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义全局过滤器：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Vue<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token string">'capitalize'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>value<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">''</span>
  value <span class="token operator">=</span> value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> value<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> value<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：当全局过滤器和局部过滤器重名时，会采用局部过滤器</p>
<p>过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。在上述例子中，<code v-pre>capitalize</code> 过滤器函数将会收到 <code v-pre>message</code> 的值作为第一个参数</p>
<p>过滤器可以串联：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span><span class="token punctuation">{</span> message <span class="token operator">|</span> filterA <span class="token operator">|</span> filterB <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这个例子中，<code v-pre>filterA</code> 被定义为接收单个参数的过滤器函数，表达式 <code v-pre>message</code> 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 <code v-pre>filterB</code>，将 <code v-pre>filterA</code> 的结果传递到 <code v-pre>filterB</code> 中。</p>
<p>过滤器是 <code v-pre>JavaScript</code>函数，因此可以接收参数：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span><span class="token punctuation">{</span> message <span class="token operator">|</span> <span class="token function">filterA</span><span class="token punctuation">(</span><span class="token string">'arg1'</span><span class="token punctuation">,</span> arg2<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里，<code v-pre>filterA</code> 被定义为接收三个参数的过滤器函数。</p>
<p>其中 <code v-pre>message</code> 的值作为第一个参数，普通字符串 <code v-pre>'arg1'</code> 作为第二个参数，表达式 <code v-pre>arg2</code> 的值作为第三个参数</p>
<p>举个例子：</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>{{ msg | msgFormat('疯狂','--')}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token comment">// 定义一个 Vue 全局的过滤器，名字叫做  msgFormat</span>
  Vue<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token string">'msgFormat'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">msg<span class="token punctuation">,</span> arg<span class="token punctuation">,</span> arg2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 字符串的  replace 方法，第一个参数，除了可写一个 字符串之外，还可以定义一个正则</span>
    <span class="token keyword">return</span> msg<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">单纯</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> arg <span class="token operator">+</span> arg2<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结：</h3>
<ul>
<li>部过滤器优先于全局过滤器被调用</li>
<li>一个表达式可以使用多个过滤器。过滤器之间需要用管道符“|”隔开。其执行顺序从左往右</li>
</ul>
<h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h2>
<p>平时开发中，需要用到过滤器的地方有很多，比如单位转换、数字打点、文本格式化、时间格式化之类的等</p>
<p>比如我们要实现将 30000 =&gt; 30,000，这时候我们就需要使用过滤器</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Vue<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token string">'toThousandFilter'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>value<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">''</span>
     value <span class="token operator">=</span> value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
     <span class="token keyword">return</span> <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'.'</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">?</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(\d)(?=(\d{3})+\.)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span> <span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(\d)(?=(?:\d{3})+$)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'$1,'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、原理分析" tabindex="-1"><a class="header-anchor" href="#四、原理分析" aria-hidden="true">#</a> 四、原理分析</h2>
<p>使用过滤器</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token punctuation">{</span>
    message <span class="token operator">|</span> capitalize
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在模板编译阶段过滤器表达式将会被编译为过滤器函数，主要是用过<code v-pre>parseFilters</code>，我们放到最后讲</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">_s</span><span class="token punctuation">(</span><span class="token function">_f</span><span class="token punctuation">(</span><span class="token string">'filterFormat'</span><span class="token punctuation">)</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>首先分析一下<code v-pre>_f</code>：</p>
<p>_f 函数全名是：<code v-pre>resolveFilter</code>，这个函数的作用是从<code v-pre>this.$options.filters</code>中找出注册的过滤器并返回</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 变为</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span>filters<span class="token punctuation">[</span><span class="token string">'filterFormat'</span><span class="token punctuation">]</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span> <span class="token comment">// message为参数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>关于<code v-pre>resolveFilter</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> indentity<span class="token punctuation">,</span> resolveAsset <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'core/util/index'</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">resolveFilter</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">resolveAsset</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">,</span> <span class="token string">'filters'</span><span class="token punctuation">,</span> id<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token operator">||</span> identity
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>内部直接调用<code v-pre>resolveAsset</code>，将<code v-pre>option</code>对象，类型，过滤器<code v-pre>id</code>，以及一个触发警告的标志作为参数传递，如果找到，则返回过滤器；</p>
<p><code v-pre>resolveAsset</code>的代码如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">resolveAsset</span><span class="token punctuation">(</span><span class="token parameter">options<span class="token punctuation">,</span> type<span class="token punctuation">,</span> id<span class="token punctuation">,</span> warnMissing</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 因为我们找的是过滤器，所以在 resolveFilter函数中调用时 type 的值直接给的 'filters',实际这个函数还可以拿到其他很多东西</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> id <span class="token operator">!==</span> <span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 判断传递的过滤器id 是不是字符串，不是则直接返回</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> assets <span class="token operator">=</span> options<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token comment">// 将我们注册的所有过滤器保存在变量中</span>
  <span class="token comment">// 接下来的逻辑便是判断id是否在assets中存在，即进行匹配</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>assets<span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> assets<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token comment">// 如找到，直接返回过滤器</span>
  <span class="token comment">// 没有找到，代码继续执行</span>
  <span class="token keyword">const</span> camelizedId <span class="token operator">=</span> <span class="token function">camelize</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token comment">// 万一你是驼峰的呢</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>assets<span class="token punctuation">,</span> camelizedId<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> assets<span class="token punctuation">[</span>camelizedId<span class="token punctuation">]</span>
  <span class="token comment">// 没找到，继续执行</span>
  <span class="token keyword">const</span> PascalCaseId <span class="token operator">=</span> <span class="token function">capitalize</span><span class="token punctuation">(</span>camelizedId<span class="token punctuation">)</span> <span class="token comment">// 万一你是首字母大写的驼峰呢</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>assets<span class="token punctuation">,</span> PascalCaseId<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> assets<span class="token punctuation">[</span>PascalCaseId<span class="token punctuation">]</span>
  <span class="token comment">// 如果还是没找到，则检查原型链(即访问属性)</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> assets<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">||</span> assets<span class="token punctuation">[</span>camelizedId<span class="token punctuation">]</span> <span class="token operator">||</span> assets<span class="token punctuation">[</span>PascalCaseId<span class="token punctuation">]</span>
  <span class="token comment">// 如果依然没找到，则在非生产环境的控制台打印警告</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">'production'</span> <span class="token operator">&amp;&amp;</span> warnMissing <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">'Failed to resolve '</span> <span class="token operator">+</span> type<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">': '</span> <span class="token operator">+</span> id<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 无论是否找到，都返回查找结果</span>
  <span class="token keyword">return</span> result
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面再来分析一下<code v-pre>_s</code>：</p>
<p><code v-pre>_s</code> 函数的全称是 <code v-pre>toString</code>,过滤器处理后的结果会当作参数传递给 <code v-pre>toString</code>函数，最终 <code v-pre>toString</code>函数执行后的结果会保存到<code v-pre>Vnode</code>中的 text 属性中，渲染到视图中</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> value <span class="token operator">==</span> <span class="token keyword">null</span>
    <span class="token operator">?</span> <span class="token string">''</span>
    <span class="token operator">:</span> <span class="token keyword">typeof</span> value <span class="token operator">===</span> <span class="token string">'object'</span>
    <span class="token operator">?</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// JSON.stringify()第三个参数可用来控制字符串里面的间距</span>
    <span class="token operator">:</span> <span class="token function">String</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，在分析下<code v-pre>parseFilters</code>，在模板编译阶段使用该函数阶段将模板过滤器解析为过滤器函数调用表达式</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">parseFilters</span><span class="token punctuation">(</span><span class="token parameter">filter</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> filters <span class="token operator">=</span> filter<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">'|'</span><span class="token punctuation">)</span>
  <span class="token keyword">let</span> expression <span class="token operator">=</span> filters<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// shift()删除数组第一个元素并将其返回，该方法会更改原数组</span>
  <span class="token keyword">let</span> i
  <span class="token keyword">if</span> <span class="token punctuation">(</span>filters<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> filters<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      experssion <span class="token operator">=</span> <span class="token function">warpFilter</span><span class="token punctuation">(</span>expression<span class="token punctuation">,</span> filters<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 这里传进去的expression实际上是管道符号前面的字符串，即过滤器的第一个参数</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> expression
<span class="token punctuation">}</span>
<span class="token comment">// warpFilter函数实现</span>
<span class="token keyword">function</span> <span class="token function">warpFilter</span><span class="token punctuation">(</span><span class="token parameter">exp<span class="token punctuation">,</span> filter</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 首先判断过滤器是否有其他参数</span>
  <span class="token keyword">const</span> i <span class="token operator">=</span> filter<span class="token punctuation">.</span><span class="token function">indexof</span><span class="token punctuation">(</span><span class="token string">'('</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 不含其他参数，直接进行过滤器表达式字符串的拼接</span>
    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">_f("</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>filter<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">")(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>exp<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">`</span></span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> name <span class="token operator">=</span> filter<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span> <span class="token comment">// 过滤器名称</span>
    <span class="token keyword">const</span> args <span class="token operator">=</span> filter<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// 参数，但还多了 ‘)’</span>
    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">_f('</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">')(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>exp<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>args<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span> <span class="token comment">// 注意这一步少给了一个 ')'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="小结-1" tabindex="-1"><a class="header-anchor" href="#小结-1" aria-hidden="true">#</a> 小结：</h3>
<ul>
<li>在编译阶段通过<code v-pre>parseFilters</code>将过滤器编译成函数调用（串联过滤器则是一个嵌套的函数调用，前一个过滤器执行的结果是后一个过滤器函数的参数）</li>
<li>编译后通过调用<code v-pre>resolveFilter</code>函数找到对应过滤器并返回结果</li>
<li>执行结果作为参数传递给<code v-pre>toString</code>函数，而<code v-pre>toString</code>执行后，其结果会保存在<code v-pre>Vnode</code>的<code v-pre>text</code>属性中，渲染到视图</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://cn.vuejs.org/v2/guide/filters.html#ad</li>
<li>https://blog.csdn.net/weixin_42724176/article/details/105546684</li>
<li>https://vue3js.cn</li>
</ul>
</div></template>


