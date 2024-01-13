<template><div><h1 id="说说-javascript-中内存泄漏的几种情况" tabindex="-1"><a class="header-anchor" href="#说说-javascript-中内存泄漏的几种情况" aria-hidden="true">#</a> 说说 JavaScript 中内存泄漏的几种情况？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<ul>
<li>
<p>内存泄漏一般是指变量的内存没有及时的回收，导致内存资源浪费。一般有三种情况出现内存泄露比较多。（1）常见的声明了一个全局变量，但是又没有用上，那么就有点浪费内存了，（2）定时器没清除 （3）循环引用：A 对象里面有一个属性指向 B 对象，B 对象有一个属性指向 A 对象。互相引用</p>
</li>
<li>
<p>解决内存泄露：我们编译器有一个自动的内存清理。常见的主要是引用记数 和 标记清除。 谷歌浏览器主要是用标记清除，大概流程是给每一个变量添加一个标记，通过内部算法计算引用情况，当不使用的时候就会自动清除。如果遇到定时器的话，我一般会在页面关闭的时候手动清除。如果遇到循环引用，我一般会手动把变量赋值为 null 来清除</p>
</li>
</ul>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>内存泄漏（Memory leak）是在计算机科学中，由于疏忽或错误造成程序未能释放已经不再使用的内存</p>
<p>并非指内存在物理上的消失，而是应用程序分配某段内存后，由于设计错误，导致在释放该段内存之前就失去了对该段内存的控制，从而造成了内存的浪费</p>
<p>程序的运行需要内存。只要程序提出要求，操作系统或者运行时就必须供给内存</p>
<p>对于持续运行的服务进程，必须及时释放不再用到的内存。否则，内存占用越来越高，轻则影响系统性能，重则导致进程崩溃</p>
<p><img src="https://static.vue-js.com/56d4bd90-821c-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>在<code v-pre>C</code>语言中，因为是手动管理内存，内存泄露是经常出现的事情。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>char <span class="token operator">*</span> buffer<span class="token punctuation">;</span>
buffer <span class="token operator">=</span> <span class="token punctuation">(</span>char<span class="token operator">*</span><span class="token punctuation">)</span> <span class="token function">malloc</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Do something with buffer</span>

<span class="token function">free</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面是 C 语言代码，<code v-pre>malloc</code>方法用来申请内存，使用完毕之后，必须自己用<code v-pre>free</code>方法释放内存。</p>
<p>这很麻烦，所以大多数语言提供自动内存管理，减轻程序员的负担，这被称为&quot;垃圾回收机制&quot;</p>
<h2 id="二、垃圾回收机制" tabindex="-1"><a class="header-anchor" href="#二、垃圾回收机制" aria-hidden="true">#</a> 二、垃圾回收机制</h2>
<p>Javascript 具有自动垃圾回收机制（GC：Garbage Collecation），也就是说，执行环境会负责管理代码执行过程中使用的内存</p>
<p>原理：垃圾收集器会定期（周期性）找出那些不在继续使用的变量，然后释放其内存</p>
<p>通常情况下有两种实现方式：</p>
<ul>
<li>标记清除</li>
<li>引用计数</li>
</ul>
<h3 id="标记清除" tabindex="-1"><a class="header-anchor" href="#标记清除" aria-hidden="true">#</a> 标记清除</h3>
<p><code v-pre>JavaScript</code>最常用的垃圾收回机制</p>
<p>当变量进入执行环境是，就标记这个变量为“进入环境“。进入环境的变量所占用的内存就不能释放，当变量离开环境时，则将其标记为“离开环境“</p>
<p>垃圾回收程序运行的时候，会标记内存中存储的所有变量。然后，它会将所有在上下文中的变量，以及被在上下文中的变量引用的变量的标记去掉</p>
<p>在此之后再被加上标记的变量就是待删除的了，原因是任何在上下文中的变量都访问不到它们了</p>
<p>随后垃圾回收程序做一次内存清理，销毁带标记的所有值并收回它们的内存</p>
<p>举个例子：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> m <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
  n <span class="token operator">=</span> <span class="token number">19</span> <span class="token comment">// 把 m,n,add() 标记为进入环境。</span>
<span class="token function">add</span><span class="token punctuation">(</span>m<span class="token punctuation">,</span> n<span class="token punctuation">)</span> <span class="token comment">// 把 a, b, c标记为进入环境。</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token comment">// a,b,c标记为离开环境，等待垃圾回收。</span>
<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  a<span class="token operator">++</span>
  <span class="token keyword">var</span> c <span class="token operator">=</span> a <span class="token operator">+</span> b
  <span class="token keyword">return</span> c
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="引用计数" tabindex="-1"><a class="header-anchor" href="#引用计数" aria-hidden="true">#</a> 引用计数</h3>
<p>语言引擎有一张&quot;引用表&quot;，保存了内存里面所有的资源（通常是各种值）的引用次数。如果一个值的引用次数是<code v-pre>0</code>，就表示这个值不再用到了，因此可以将这块内存释放</p>
<p>如果一个值不再需要了，引用数却不为<code v-pre>0</code>，垃圾回收机制无法释放这块内存，从而导致内存泄漏</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello world'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>面代码中，数组<code v-pre>[1, 2, 3, 4]</code>是一个值，会占用内存。变量<code v-pre>arr</code>是仅有的对这个值的引用，因此引用次数为<code v-pre>1</code>。尽管后面的代码没有用到<code v-pre>arr</code>，它还是会持续占用内存</p>
<p>如果需要这块内存被垃圾回收机制释放，只需要设置如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>arr <span class="token operator">=</span> <span class="token keyword">null</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过设置<code v-pre>arr</code>为<code v-pre>null</code>，就解除了对数组<code v-pre>[1,2,3,4]</code>的引用，引用次数变为 0，就被垃圾回收了</p>
<h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3>
<p>有了垃圾回收机制，不代表不用关注内存泄露。那些很占空间的值，一旦不再用到，需要检查是否还存在对它们的引用。如果是的话，就必须手动解除引用</p>
<h2 id="三、常见内存泄露情况" tabindex="-1"><a class="header-anchor" href="#三、常见内存泄露情况" aria-hidden="true">#</a> 三、常见内存泄露情况</h2>
<p>意外的全局变量</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">arg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  bar <span class="token operator">=</span> <span class="token string">'this is a hidden global variable'</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一种意外的全局变量可能由 <code v-pre>this</code> 创建：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>variable <span class="token operator">=</span> <span class="token string">'potential accidental global'</span>
<span class="token punctuation">}</span>
<span class="token comment">// foo 调用自己，this 指向了全局对象（window）</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述使用严格模式，可以避免意外的全局变量</p>
<p>定时器也常会造成内存泄露</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> someResource <span class="token operator">=</span> <span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> node <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'Node'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 处理 node 和 someResource</span>
        node<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>someResource<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<code v-pre>id</code>为 Node 的元素从<code v-pre>DOM</code>中移除，该定时器仍会存在，同时，因为回调函数中包含对<code v-pre>someResource</code>的引用，定时器外面的<code v-pre>someResource</code>也不会被释放</p>
<p>包括我们之前所说的闭包，维持函数内局部变量，使其得不到释放</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">bindEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> obj <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'XXX'</span><span class="token punctuation">)</span>
  <span class="token keyword">var</span> <span class="token function-variable function">unused</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">'闭包内引用obj obj不会被释放'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  obj <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 解决方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>没有清理对<code v-pre>DOM</code>元素的引用同样造成内存泄露</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> refA <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'refA'</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>refA<span class="token punctuation">)</span> <span class="token comment">// dom删除了</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>refA<span class="token punctuation">,</span> <span class="token string">'refA'</span><span class="token punctuation">)</span> <span class="token comment">// 但是还存在引用能console出整个div 没有被回收</span>
refA <span class="token operator">=</span> <span class="token keyword">null</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>refA<span class="token punctuation">,</span> <span class="token string">'refA'</span><span class="token punctuation">)</span> <span class="token comment">// 解除引用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>包括使用事件监听<code v-pre>addEventListener</code>监听的时候，在不监听的情况下使用<code v-pre>removeEventListener</code>取消对事件监听</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>http://www.ruanyifeng.com/blog/2017/04/memory-leak.html</li>
<li>https://zh.wikipedia.org/wiki</li>
</ul>
</div></template>


