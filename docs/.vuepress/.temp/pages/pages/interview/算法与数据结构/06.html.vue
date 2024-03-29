<template><div><h1 id="说说你对集合的理解-常见的操作有哪些" tabindex="-1"><a class="header-anchor" href="#说说你对集合的理解-常见的操作有哪些" aria-hidden="true">#</a> 说说你对集合的理解？常见的操作有哪些？</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>集合（Set），指具有某种特定性质的事物的总体，里面的每一项内容称作元素</p>
<p>在数学中，我们经常会遇到集合的概念：</p>
<ul>
<li>有限集合：例如一个班集所有的同学构成的集合</li>
<li>无限集合：例如全体自然数集合</li>
</ul>
<p>在计算机中集合道理也基本一致，具有三大特性：</p>
<ul>
<li>确定性：于一个给定的集合，集合中的元素是确定的。即一个元素，或者属于该集合，或者不属于该集合，两者必居其一</li>
<li>无序性：在一个集合中，不考虑元素之间的顺序，只要元素完全相同，就认为是同一个集合</li>
<li>互异性：集合中任意两个元素都是不同的</li>
</ul>
<h2 id="二、操作" tabindex="-1"><a class="header-anchor" href="#二、操作" aria-hidden="true">#</a> 二、操作</h2>
<p>在<code v-pre>ES6</code>中，集合本身是一个构建函数<code v-pre>Set</code>，用来生成 <code v-pre>Set</code> 数据结构，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> s <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>关于集合常见的方法有：</p>
<ul>
<li>add()：增</li>
<li>delete()：删</li>
<li>has()：改</li>
<li>clear()：查</li>
</ul>
<h3 id="add" tabindex="-1"><a class="header-anchor" href="#add" aria-hidden="true">#</a> add()</h3>
<p>添加某个值，返回 <code v-pre>Set</code> 结构本身</p>
<p>当添加实例中已经存在的元素，<code v-pre>set</code>不会进行处理添加</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>s<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2只被添加了一次</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>体现了集合的互异性特性</p>
<h3 id="delete" tabindex="-1"><a class="header-anchor" href="#delete" aria-hidden="true">#</a> delete()</h3>
<p>删除某个值，返回一个布尔值，表示删除是否成功</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>s<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="has" tabindex="-1"><a class="header-anchor" href="#has" aria-hidden="true">#</a> has()</h3>
<p>返回一个布尔值，判断该值是否为<code v-pre>Set</code>的成员</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>s<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="clear" tabindex="-1"><a class="header-anchor" href="#clear" aria-hidden="true">#</a> clear()</h3>
<p>清除所有成员，没有返回值</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>s<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>关于多个集合常见的操作有：</p>
<ul>
<li>并集</li>
<li>交集</li>
<li>差集</li>
</ul>
<h3 id="并集" tabindex="-1"><a class="header-anchor" href="#并集" aria-hidden="true">#</a> 并集</h3>
<p>两个集合的共同元素，如下图所示：</p>
<p><img src="https://static.vue-js.com/ed96df50-1d36-11ec-a752-75723a64e8f5.png" alt=""></p>
<p>代码实现方式如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 并集</span>
<span class="token keyword">let</span> union <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>a<span class="token punctuation">,</span> <span class="token operator">...</span>b<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Set {1, 2, 3, 4}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="交集" tabindex="-1"><a class="header-anchor" href="#交集" aria-hidden="true">#</a> 交集</h3>
<p>两个集合<code v-pre>A</code> 和 <code v-pre>B</code>，即属于<code v-pre>A</code>又属于<code v-pre>B</code>的元素，如下图所示：</p>
<p><img src="https://static.vue-js.com/f8a9cd80-1d36-11ec-a752-75723a64e8f5.png" alt=""></p>
<p>用代码标识则如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 交集</span>
<span class="token keyword">let</span> intersect <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>a<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> b<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// set {2, 3}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="差集" tabindex="-1"><a class="header-anchor" href="#差集" aria-hidden="true">#</a> 差集</h3>
<p>两个集合<code v-pre>A</code> 和 <code v-pre>B</code>，属于<code v-pre>A</code>的元素但不属于<code v-pre>B</code>的元素称为<code v-pre>A</code>相对于<code v-pre>B</code>的差集，如下图所示：</p>
<p><img src="https://static.vue-js.com/0191c560-1d37-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>代码标识则如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// （a 相对于 b 的）差集</span>
<span class="token keyword">let</span> difference <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>a<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> <span class="token operator">!</span>b<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Set {1}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、应用场景" tabindex="-1"><a class="header-anchor" href="#三、应用场景" aria-hidden="true">#</a> 三、应用场景</h2>
<p>一般情况下，使用数组的概率会比集合概率高很多</p>
<p>使用<code v-pre>set</code>集合的场景一般是借助其确定性，其本身只包含不同的元素</p>
<p>所以，可以利用<code v-pre>Set</code>的一些原生方法轻松的完成数组去重，查找数组公共元素及不同元素等操作</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zh.wikipedia.org/wiki/%E5%B9%B6%E9%9B%86</li>
<li>https://zh.wikipedia.org/wiki/%E8%A1%A5%E9%9B%86</li>
</ul>
</div></template>


