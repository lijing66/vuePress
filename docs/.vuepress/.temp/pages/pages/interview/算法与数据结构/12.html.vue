<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-15 23:11:46
 * @LastEditors: lijing
 * @LastEditTime: 2024-01-13 22:35:09
 * @Description: 
-->
<h1 id="选择排序" tabindex="-1"><a class="header-anchor" href="#选择排序" aria-hidden="true">#</a> 选择排序</h1>
<h2 id="是什么" tabindex="-1"><a class="header-anchor" href="#是什么" aria-hidden="true">#</a> 是什么</h2>
<p>选择排序（Selection sort）是一种简单直观的排序算法，无论什么数据进去都是 <code v-pre>O(n²)</code>的时间复杂度，所以用到它的时候，数据规模越小越好</p>
<h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h2>
<p>以升序为例。</p>
<p>其基本思想是：首先在未排序的数列中找到最小的元素，然后将其存放到数列的起始位置</p>
<p>然后再从剩余未排序的元素中继续寻找最小元素，然后放到已排序序列的末尾</p>
<p>以此类推，直到所有元素均排序完毕</p>
<p>举个例子，一个数组为 56、12、80、91、29，其排序过程如下：</p>
<ul>
<li>第一次遍历时，从下标为 1 的位置即 56 开始，找出关键字值最小的记录 12，同下标为 0 的关键字 56 交换位置。此时数组为 12、56、80、91、20</li>
</ul>
<p><img src="@source/pages/interview/算法与数据结构/img/01.png" alt="img"></p>
<ul>
<li>第二次遍历时，从下标为 2 的位置即 56 开始，找出最小值 20，同下标为 2 的关键字 56 互换位置，此时数组为12、20、80、91、56</li>
</ul>
<p><img src="@source/pages/interview/算法与数据结构/img/02.png" alt="img"></p>
<ul>
<li>第三次遍历时，从下标为 3 的位置即 80 开始，找出最小值 56，同下标为 3 的关键字 80 互换位置，此时数组为 12、20、56、91、80</li>
</ul>
<p><img src="@source/pages/interview/算法与数据结构/img/03.png" alt="img"></p>
<ul>
<li>第四次遍历时，从下标为 4 的位置即 91 开始，找出最小是 80，同下标为 4 的关键字 91 互换位置，此时排序完成，变成有序数组</li>
</ul>
<p><img src="@source/pages/interview/算法与数据结构/img/04.png" alt="img"></p>
<h2 id="二、如何实现" tabindex="-1"><a class="header-anchor" href="#二、如何实现" aria-hidden="true">#</a> 二、如何实现</h2>
<p>从上面可以看到，对于具有 <code v-pre>n</code> 个记录的无序表遍历 <code v-pre>n-1</code> 次，第<code v-pre>i</code> 次从无序表中第 <code v-pre>i</code> 个记录开始，找出后序关键字中最小的记录，然后放置在第 <code v-pre>i</code> 的位置上</p>
<p>直至到从第<code v-pre>n</code>个和第<code v-pre>n-1</code>个元素中选出最小的放在第<code v-pre>n-1</code>个位置</p>
<p>如下动画所示：</p>
<p><img src="@source/pages/interview/算法与数据结构/img/05.gif" alt="img"></p>
<p>用代码表示则如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">]</span>
<span class="token comment">// 选择排序</span>
<span class="token keyword">function</span> <span class="token function">selectSort</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token keyword">var</span> minIdx <span class="token operator">=</span> i
      <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> j <span class="token operator">=</span> i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>minIdx<span class="token punctuation">]</span> <span class="token operator">></span> arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
              minIdx <span class="token operator">=</span> j
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>

      <span class="token function">swap</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> i<span class="token punctuation">,</span> minIdx<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">swap</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> i<span class="token punctuation">,</span> j</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> t <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span>
    arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> t
<span class="token punctuation">}</span>

<span class="token function">selectSort</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一次内循环比较<code v-pre>N - 1</code>次，然后是<code v-pre>N-2</code>次，<code v-pre>N-3</code>次，……，最后一次内循环比较1次 共比较的次数是 <code v-pre>(N - 1) + (N - 2) + ... + 1</code>，求等差数列和，得 <code v-pre>(N - 1 + 1)* N / 2 = N^2 / 2</code>，舍去最高项系数，其时间复杂度为 <code v-pre>O(N^2)</code></p>
<p>从上述也可以看到，选择排序是一种稳定的排序</p>
<h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h2>
<p>和冒泡排序一致，相比其它排序算法，这也是一个相对较高的时间复杂度，一般情况不推荐使用</p>
<p>但是我们还是要掌握冒泡排序的思想及实现，这对于我们的算法思维是有很大帮助的</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://baike.baidu.com/item/%E9%80%89%E6%8B%A9%E6%8E%92%E5%BA%8F/9762418</li>
<li>https://zhuanlan.zhihu.com/p/29889599</li>
<li>http://data.biancheng.net/view/72.html</li>
</ul>
</div></template>


