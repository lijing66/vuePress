<template><div><h1 id="说说你对算法中时间复杂度-空间复杂度的理解-如何计算" tabindex="-1"><a class="header-anchor" href="#说说你对算法中时间复杂度-空间复杂度的理解-如何计算" aria-hidden="true">#</a> 说说你对算法中时间复杂度，空间复杂度的理解？如何计算？</h1>
<p><img src="https://static.vue-js.com/07fd4050-16fc-11ec-a752-75723a64e8f5.png" alt=""></p>
<h2 id="一、前言" tabindex="-1"><a class="header-anchor" href="#一、前言" aria-hidden="true">#</a> 一、前言</h2>
<p>算法（Algorithm）是指用来操作数据、解决程序问题的一组方法。对于同一个问题，使用不同的算法，也许最终得到的结果是一样的，但在过程中消耗的资源和时间却会有很大的区别</p>
<p>衡量不同算法之间的优劣主要是通过<strong>时间</strong>和<strong>空间</strong>两个维度去考量：</p>
<ul>
<li>时间维度：是指执行当前算法所消耗的时间，我们通常用「时间复杂度」来描述。</li>
<li>空间维度：是指执行当前算法需要占用多少内存空间，我们通常用「空间复杂度」来描述</li>
</ul>
<p>通常会遇到一种情况，时间和空间维度不能够兼顾，需要在两者之间取得一个平衡点是我们需要考虑的</p>
<p>一个算法通常存在最好、平均、最坏三种情况，我们一般关注的是最坏情况</p>
<p>最坏情况是算法运行时间的上界，对于某些算法来说，最坏情况出现的比较频繁，也意味着平均情况和最坏情况一样差</p>
<h2 id="二、时间复杂度" tabindex="-1"><a class="header-anchor" href="#二、时间复杂度" aria-hidden="true">#</a> 二、时间复杂度</h2>
<p>时间复杂度是指执行这个算法所需要的计算工作量，其复杂度反映了程序执行时间「随输入规模增长而增长的量级」，在很大程度上能很好地反映出算法的优劣与否</p>
<p>一个算法花费的时间与算法中语句的「执行次数成正比」，执行次数越多，花费的时间就越多</p>
<p>算法的复杂度通常用大O符号表述，定义为<code v-pre>T(n) = O(f(n))</code>，常见的时间复杂度有：O(1)常数型、O(log n)对数型、O(n)线性型、O(nlogn)线性对数型、O(n^2)平方型、O(n^3)立方型、O(n^k)k次方型、O(2^n)指数型，如下图所示：</p>
<p><img src="https://static.vue-js.com/33d5ebf0-16fc-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>从上述可以看到，随着问题规模<code v-pre>n</code>的不断增大，上述时间复杂度不断增大，算法的执行效率越低，由小到大排序如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">Ο</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token function">＜Ο</span><span class="token punctuation">(</span>log n<span class="token punctuation">)</span><span class="token function">＜Ο</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token function">＜Ο</span><span class="token punctuation">(</span>nlog n<span class="token punctuation">)</span><span class="token function">＜Ο</span><span class="token punctuation">(</span>n2<span class="token punctuation">)</span><span class="token function">＜Ο</span><span class="token punctuation">(</span>n3<span class="token punctuation">)</span><span class="token function">＜…＜Ο</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token operator">^</span>n<span class="token punctuation">)</span><span class="token function">＜Ο</span><span class="token punctuation">(</span>n<span class="token operator">!</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意的是，算法复杂度只是描述算法的增长趋势，并不能说一个算法一定比另外一个算法高效，如果常数项过大的时候也会导致算法的执行时间变长</p>
<p>关于如何计算时间复杂度，可以看看如下简单例子：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span>
  <span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">2</span>
  <span class="token keyword">let</span> sum <span class="token operator">=</span> a <span class="token operator">+</span> b
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    sum <span class="token operator">+=</span> i
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> sum
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该函数算法需要执行的运算次数用输入大小<code v-pre>n</code>的函数表示，即 <code v-pre>T(n) = 2 + n + 1</code>，那么时间复杂度为<code v-pre>O(n + 3)</code>，又因为时间复杂度只关注最高数量级，且与之系数也没有关系，因此上述的时间复杂度为<code v-pre>O(n)</code></p>
<p>又比如下面的例子：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      count <span class="token operator">+=</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>循环里面嵌套循环，外面的循环执行一次，里面的循环执行<code v-pre>n</code>次，因此时间复杂度为 <code v-pre>O(n*n*1 + 2) = O(n^2)</code></p>
<p>对于顺序执行的语句，总的时间复杂度等于其中最大的时间复杂度，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> sum <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    sum <span class="token operator">+=</span> i
  <span class="token punctuation">}</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      sum <span class="token operator">+=</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> sum
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述第一部分复杂度为<code v-pre>O(n)</code>，第二部分复杂度为<code v-pre>O(n^2)</code>，总复杂度为<code v-pre>max(O(n^2), O(n)) = O(n^2)</code></p>
<p>又如下一个例子：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// ①</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
     i <span class="token operator">=</span> i <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// ②</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>循环语句中以2的倍数来逼近<code v-pre>n</code>，每次都乘以2。如果用公式表示就是1 * 2 * 2 * 2 … * 2 &lt;=n，也就是说2的<code v-pre>x</code>次方小于等于<code v-pre>n</code>时会执行循环体，记作<code v-pre>2^x &lt;= n</code>，于是得出<code v-pre>x&lt;=logn</code></p>
<p>因此循环在执行<code v-pre>logn</code>次之后，便结束，因此时间复杂度为<code v-pre>O(logn)</code></p>
<p>同理，如果一个<code v-pre>O(n)</code>循环里面嵌套<code v-pre>O(logn)</code>的循环，则时间复杂度为<code v-pre>O(nlogn)</code>，像<code v-pre>O(n^3)</code>无非也就是嵌套了三层<code v-pre>O(n)</code>循环</p>
<h2 id="三、空间复杂度" tabindex="-1"><a class="header-anchor" href="#三、空间复杂度" aria-hidden="true">#</a> 三、空间复杂度</h2>
<p>空间复杂度主要指执行算法所需内存的大小，用于对程序运行过程中所需要的临时存储空间的度量</p>
<p>除了需要存储空间、指令、常数、变量和输入数据外，还包括对数据进行操作的工作单元和存储计算所需信息的辅助空间</p>
<p>下面给出空间复杂度为<code v-pre>O(1)</code>的示例，如下</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">2</span>
<span class="token keyword">let</span> c <span class="token operator">=</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码的临时空间不会随着<code v-pre>n</code>的变化而变化，因此空间复杂度为<code v-pre>O(1)</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> arr <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&lt;=</span>n<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span><span class="token punctuation">{</span>
  arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述可以看到，随着<code v-pre>n</code>的增加，数组的占用的内存空间越大</p>
<p>通常来说，只要算法不涉及到动态分配的空间，以及递归、栈所需的空间，空间复杂度通常为<code v-pre>O(1)</code>，一个一维数组<code v-pre>a[n]</code>，空间复杂度<code v-pre>O(n)</code>，二维数组为<code v-pre>O(n^2)</code></p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>
<p>https://juejin.cn/post/6844904167824162823#heading-7</p>
</li>
<li>
<p>https://zhuanlan.zhihu.com/p/50479555</p>
</li>
<li>
<p>https://cloud.tencent.com/developer/article/1769988</p>
</li>
</ul>
</div></template>


