<template><div><h1 id="js-中如何实现函数缓存-函数缓存有哪些应用场景" tabindex="-1"><a class="header-anchor" href="#js-中如何实现函数缓存-函数缓存有哪些应用场景" aria-hidden="true">#</a> JS 中如何实现函数缓存？函数缓存有哪些应用场景？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>什么是缓存？</p>
<p>所谓函数缓存，就是将函数运算过的结果缓存起来，这种做法是典型的用内存去换取性能的手段，常用于缓存数据计算结果和缓存对象。缓存只是一个临时的数据存储，它保存数据，以便将来对该数据的请求能够更快地得到处理</p>
<p>为什么需要？</p>
<p>在前端页面中，有些数据（比如数据字典中的数据），可以在第一次请求的时候全部拿过来保存在 js 对象中，以后需要的时候就不用每次都去请求服务器了。对于那些大量使用数据字典来填充下拉框的页面，这种方法可以极大地减少对服务器的访问。简单点说，就是提供便利，减少查询次数和所消耗的时间。</p>
<p>JavaScript  中的缓存的概念主要建立在两个概念之上，  闭包+高阶函数</p>
<p>利用高阶函数的思想来实现一个简单的缓存，在函数内部用一个对象存储输入的参数，如果下次再输入相同的参数，那就比较一下对象的属性，把值从这个对象里面取出来，不必再继续往运行，这样就极大的节省了客户端等待的时间</p>
<p>JS 实现函数缓存</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">memorize</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> cache <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 存储缓存数据的对象</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里用到数组的扩展运算符</span>
    <span class="token comment">// 将参数作为cache的key</span>
    <span class="token keyword">const</span> _args <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span>
    <span class="token comment">// 如果已经缓存过，直接取值。否则重新计算并且缓存</span>
    <span class="token keyword">return</span> cache<span class="token punctuation">[</span>_args<span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">(</span>cache<span class="token punctuation">[</span>_args<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'开始缓存'</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>

<span class="token keyword">const</span> adder <span class="token operator">=</span> <span class="token function">memorize</span><span class="token punctuation">(</span>add<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用</p>
<ul>
<li>console.log(adder(2, 6))    //  输出结果:  开始缓存  8        // cache: { '[2, 6]': 8 }</li>
<li>console.log(adder(2, 6))    //  输出结果: 8                //cache: { '[2, 6]': 8 }</li>
<li>console.log(adder(10, 10))  //  输出结果:  开始缓存  20    // cache: { '[2, 6]': 8, '[10, 10]': 20 }</li>
</ul>
<p>只有第一次会输出‘开始缓存’,  之后只要参数想同，每次取值都会在缓存里取。这里需要注意一下 cache 不可以是 Map 数据结构，因为 Map 的键是使用===比较的，[1]！==[1]，因此即使传入相同的对象或者数组，那么还是被存为不同的键</p>
<h2 id="函数缓存是什么" tabindex="-1"><a class="header-anchor" href="#函数缓存是什么" aria-hidden="true">#</a> 函数缓存是什么</h2>
<p>函数缓存是：保存函数的运算结果。本质上就是用空间（缓存存储）换时间（计算过程），常用于缓存数据计算结果和缓存对象</p>
<p>示例代码如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">+</span> b
<span class="token keyword">const</span> calc <span class="token operator">=</span> <span class="token function">memoize</span><span class="token punctuation">(</span>add<span class="token punctuation">)</span> <span class="token comment">// 函数缓存</span>
<span class="token function">calc</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span> <span class="token comment">// 30</span>
<span class="token function">calc</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span> <span class="token comment">// 30 缓存</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>缓存只是一个临时的数据存储，它保存数据，以便将来对该数据的请求能够更快地得到处理</p>
<h2 id="如何实现" tabindex="-1"><a class="header-anchor" href="#如何实现" aria-hidden="true">#</a> 如何实现</h2>
<p>实现函数缓存主要依靠闭包、柯里化、高阶函数，这里再简单复习下：</p>
<h3 id="闭包" tabindex="-1"><a class="header-anchor" href="#闭包" aria-hidden="true">#</a> 闭包</h3>
<p>闭包可以理解成，函数 + 函数体内可访问的变量总和</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">;</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span>
  <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token number">2</span>
    <span class="token keyword">let</span> sum <span class="token operator">=</span> b <span class="token operator">+</span> a
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span> <span class="token comment">// 3</span>
  <span class="token punctuation">}</span>
  <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>add</code>函数本身，以及其内部可访问的变量，即 <code v-pre>a = 1</code>，这两个组合在⼀起就形成了闭包</p>
<h3 id="柯里化" tabindex="-1"><a class="header-anchor" href="#柯里化" aria-hidden="true">#</a> 柯里化</h3>
<p>把接受多个参数的函数转换成接受一个单一参数的函数</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 非函数柯里化</span>
<span class="token keyword">var</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>
<span class="token function">add</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token comment">//7</span>

<span class="token comment">// 函数柯里化</span>
<span class="token keyword">var</span> <span class="token function-variable function">add2</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//**返回函数**</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x <span class="token operator">+</span> y
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">add2</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token comment">//7</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将一个二元函数拆分成两个一元函数</p>
<h3 id="高阶函数" tabindex="-1"><a class="header-anchor" href="#高阶函数" aria-hidden="true">#</a> 高阶函数</h3>
<p>通过接收其他函数作为参数或返回其他函数的函数</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span>

  <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> bar
<span class="token punctuation">}</span>
<span class="token keyword">var</span> baz <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数 <code v-pre>foo</code> 如何返回另一个函数 <code v-pre>bar</code>，<code v-pre>baz</code> 现在持有对 <code v-pre>foo</code> 中定义的<code v-pre>bar</code> 函数的引用。由于闭包特性，<code v-pre>a</code>的值能够得到</p>
<p>下面再看看如何实现函数缓存，实现原理也很简单，把参数和对应的结果数据存在一个对象中，调用时判断参数对应的数据是否存在，存在就返回对应的结果数据，否则就返回计算结果</p>
<p>如下所示</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">memoize</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> content</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> cache <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
  content <span class="token operator">=</span> content <span class="token operator">||</span> <span class="token keyword">this</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>key</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>content<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用方式也很简单</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> calc <span class="token operator">=</span> <span class="token function">memoize</span><span class="token punctuation">(</span>add<span class="token punctuation">)</span>
<span class="token keyword">const</span> num1 <span class="token operator">=</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> num2 <span class="token operator">=</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token comment">// 缓存得到的结果</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>过程分析：</p>
<ul>
<li>在当前函数作用域定义了一个空对象，用于缓存运行结果</li>
<li>运用柯里化返回一个函数，返回的函数由于闭包特性，可以访问到<code v-pre>cache</code></li>
<li>然后判断输入参数是不是在<code v-pre>cache</code>的中。如果已经存在，直接返回<code v-pre>cache</code>的内容，如果没有存在，使用函数<code v-pre>func</code>对输入参数求值，然后把结果存储在<code v-pre>cache</code>中</li>
</ul>
<h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h2>
<p>虽然使用缓存效率是非常高的，但并不是所有场景都适用，因此千万不要极端的将所有函数都添加缓存</p>
<p>以下几种情况下，适合使用缓存：</p>
<ul>
<li>对于昂贵的函数调用，执行复杂计算的函数</li>
<li>对于具有有限且高度重复输入范围的函数</li>
<li>对于具有重复输入值的递归函数</li>
<li>对于纯函数，即每次使用特定输入调用时返回相同输出的函数</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zhuanlan.zhihu.com/p/112505577</li>
</ul>
</div></template>


