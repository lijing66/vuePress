<template><div><h1 id="说说你对二分查找的理解-如何实现-应用场景" tabindex="-1"><a class="header-anchor" href="#说说你对二分查找的理解-如何实现-应用场景" aria-hidden="true">#</a> 说说你对二分查找的理解？如何实现？应用场景？</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>在计算机科学中，二分查找算法，也称折半搜索算法，是一种在有序数组中查找某一特定元素的搜索算法</p>
<p>想要应用二分查找法，则这一堆数应有如下特性：</p>
<ul>
<li>存储在数组中</li>
<li>有序排序</li>
</ul>
<p>搜索过程从数组的中间元素开始，如果中间元素正好是要查找的元素，则搜索过程结束</p>
<p>如果某一特定元素大于或者小于中间元素，则在数组大于或小于中间元素的那一半中查找，而且跟开始一样从中间元素开始比较</p>
<p>如果在某一步骤数组为空，则代表找不到</p>
<p>这种搜索算法每一次比较都使搜索范围缩小一半</p>
<p>如下图所示：</p>
<p><img src="https://static.vue-js.com/e2108520-2987-11ec-a752-75723a64e8f5.png" alt=""></p>
<p>相比普通的顺序查找，除了数据量很少的情况下，二分查找会比顺序查找更快，区别如下所示：</p>
<p><img src="https://pic2.zhimg.com/v2-43339b963db63b33107b56503ad6b1b5_b.gif" alt=""></p>
<h2 id="二、如何实现" tabindex="-1"><a class="header-anchor" href="#二、如何实现" aria-hidden="true">#</a> 二、如何实现</h2>
<p>基于二分查找的实现，如果数据是有序的，并且不存在重复项，实现代码如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">BinarySearch</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">.</span>length <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
    <span class="token comment">// 低位下标</span>
    <span class="token keyword">let</span> lowIndex <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token comment">// 高位下标</span>
    <span class="token keyword">let</span> highIndex <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>lowIndex <span class="token operator">&lt;=</span> highIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 中间下标</span>
        <span class="token keyword">const</span> midIndex <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>lowIndex <span class="token operator">+</span> highIndex<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>midIndex<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            highIndex <span class="token operator">=</span> midIndex <span class="token operator">-</span> <span class="token number">1</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">></span> arr<span class="token punctuation">[</span>midIndex<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            lowIndex <span class="token operator">=</span> midIndex <span class="token operator">+</span> <span class="token number">1</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// target === arr[midIndex]</span>
            <span class="token keyword">return</span> midIndex
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果数组中存在重复项，而我们需要找出第一个制定的值，实现则如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">BinarySearchFirst</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">.</span>length <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
    <span class="token comment">// 低位下标</span>
    <span class="token keyword">let</span> lowIndex <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token comment">// 高位下标</span>
    <span class="token keyword">let</span> highIndex <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>lowIndex <span class="token operator">&lt;=</span> highIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 中间下标</span>
        <span class="token keyword">const</span> midIndex <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>lowIndex <span class="token operator">+</span> highIndex<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>midIndex<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            highIndex <span class="token operator">=</span> midIndex <span class="token operator">-</span> <span class="token number">1</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">></span> arr<span class="token punctuation">[</span>midIndex<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            lowIndex <span class="token operator">=</span> midIndex <span class="token operator">+</span> <span class="token number">1</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 当 target 与 arr[midIndex] 相等的时候，如果 midIndex 为0或者前一个数比 target 小那么就找到了第一个等于给定值的元素，直接返回</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>midIndex <span class="token operator">===</span> <span class="token number">0</span> <span class="token operator">||</span> arr<span class="token punctuation">[</span>midIndex <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&lt;</span> target<span class="token punctuation">)</span> <span class="token keyword">return</span> midIndex
            <span class="token comment">// 否则高位下标为中间下标减1，继续查找</span>
            highIndex <span class="token operator">=</span> midIndex <span class="token operator">-</span> <span class="token number">1</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上，除了有序的数组可以使用，还有一种特殊的数组可以应用，那就是轮转后的有序数组</p>
<p>有序数组即一个有序数字以某一个数为轴，将其之前的所有数都轮转到数组的末尾所得</p>
<p>例如，[4, 5, 6, 7, 0, 1, 2]就是一个轮转后的有序数组</p>
<p>该数组的特性是存在一个分界点用来分界两个有序数组，如下：</p>
<p><img src="https://static.vue-js.com/eeee2130-2987-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>分界点有如下特性：</p>
<ul>
<li>分界点元素 &gt;= 第一个元素</li>
<li>分界点元素 &lt; 第一个元素</li>
</ul>
<p>代码实现如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">search</span> <span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 如果为空或者是空数组的情况</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>nums <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token operator">!</span>nums<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 搜索区间是前闭后闭</span>
  <span class="token keyword">let</span> begin <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
    end <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>begin <span class="token operator">&lt;=</span> end<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 下面这样写是考虑大数情况下避免溢出</span>
    <span class="token keyword">let</span> mid <span class="token operator">=</span> begin <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>end <span class="token operator">-</span> begin<span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">==</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> mid<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 如果左边是有序的</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>begin<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//同时target在[ nums[begin],nums[mid] ]中，那么就在这段有序区间查找</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>begin<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> target <span class="token operator">&amp;&amp;</span> target <span class="token operator">&lt;=</span> nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        end <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">//否则去反方向查找</span>
        begin <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">//如果右侧是有序的</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">//同时target在[ nums[mid],nums[end] ]中，那么就在这段有序区间查找</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> target <span class="token operator">&amp;&amp;</span> target <span class="token operator">&lt;=</span> nums<span class="token punctuation">[</span>end<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        begin <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        end <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对比普通的二分查找法，为了确定目标数会落在二分后的哪个部分，我们需要更多的判定条件</p>
<h2 id="三、应用场景" tabindex="-1"><a class="header-anchor" href="#三、应用场景" aria-hidden="true">#</a> 三、应用场景</h2>
<p>二分查找法的<code v-pre>O(logn)</code>让它成为十分高效的算法。不过它的缺陷却也是比较明显，就在它的限定之上：</p>
<ul>
<li>有序：我们很难保证我们的数组都是有序的</li>
<li>数组：数组读取效率是O(1)，可是它的插入和删除某个元素的效率却是O(n)，并且数组的存储是需要连续的内存空间，不适合大数据的情况</li>
</ul>
<p>关于二分查找的应用场景，主要如下：</p>
<ul>
<li>不适合数据量太小的数列；数列太小，直接顺序遍历说不定更快，也更简单</li>
<li>每次元素与元素的比较是比较耗时的，这个比较操作耗时占整个遍历算法时间的大部分，那么使用二分查找就能有效减少元素比较的次数</li>
<li>不适合数据量太大的数列，二分查找作用的数据结构是顺序表，也就是数组，数组是需要连续的内存空间的，系统并不一定有这么大的连续内存空间可以使用</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zh.wikipedia.org/wiki/%E4%BA%8C%E5%88%86%E6%90%9C%E5%B0%8B%E6%BC%94%E7%AE%97%E6%B3%95#javascript_%E7%89%88%E6%9C%AC</li>
<li>https://www.cnblogs.com/ider/archive/2012/04/01/binary_search.html</li>
</ul>
</div></template>


