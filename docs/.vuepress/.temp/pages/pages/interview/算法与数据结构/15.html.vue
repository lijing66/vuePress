<template><div><h1 id="说说你对快速排序的理解-如何实现-应用场景" tabindex="-1"><a class="header-anchor" href="#说说你对快速排序的理解-如何实现-应用场景" aria-hidden="true">#</a> 说说你对快速排序的理解？如何实现？应用场景？</h1>
<p><img src="https://static.vue-js.com/bafae570-268a-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>快速排序（Quick Sort）算法是在冒泡排序的基础上进行改进的一种算法，从名字上看就知道该排序算法的特点是快、效率高，是处理大数据最快的排序算法之一</p>
<p>实现的基本思想是：通过一次排序将整个无序表分成相互独立的两部分，其中一部分中的数据都比另一部分中包含的数据的值小</p>
<p>然后继续沿用此方法分别对两部分进行同样的操作，直到每一个小部分不可再分，所得到的整个序列就变成有序序列</p>
<p>例如，对无序表49，38，65，97，76，13，27，49进行快速排序，大致过程为：</p>
<ul>
<li>
<p>首先从表中选取一个记录的关键字作为分割点（称为“枢轴”或者支点，一般选择第一个关键字），例如选取 49</p>
</li>
<li>
<p>将表格中大于 49 个放置于 49 的右侧，小于 49 的放置于 49 的左侧，假设完成后的无序表为：{27，38，13，49，65，97，76，49}</p>
</li>
<li>
<p>以 49 为支点，将整个无序表分割成了两个部分，分别为{27，38，13}和{65，97，76，49}，继续采用此种方法分别对两个子表进行排序</p>
</li>
<li>
<p>前部分子表以 27 为支点，排序后的子表为{13，27，38}，此部分已经有序；后部分子表以 65 为支点，排序后的子表为{49，65，97，76}</p>
</li>
<li>
<p>此时前半部分子表中的数据已完成排序；后部分子表继续以 65 为支点，将其分割为{49}和{97，76}，前者不需排序，后者排序后的结果为{76， 97}</p>
</li>
<li>
<p>通过以上几步的排序，最后由子表{13，27，38}、{49}、{49}、{65}、{76，97}构成有序表：{13，27，38，49，49，65，76，97}</p>
</li>
</ul>
<h2 id="二、如何实现" tabindex="-1"><a class="header-anchor" href="#二、如何实现" aria-hidden="true">#</a> 二、如何实现</h2>
<p>可以分成以下步骤：</p>
<ul>
<li>分区：从数组中选择任意一个基准，所有比基准小的元素放在基准的左边，比基准大的元素放到基准的右边</li>
<li>递归：递归地对基准前后的子数组进行分区</li>
</ul>
<p><img src="https://www.runoob.com/wp-content/uploads/2019/03/quickSort.gif" alt=""></p>
<p>用代码表示则如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">quickSort</span> <span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token function-variable function">rec</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">.</span>length <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> arr<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">const</span> left <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> right <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> mid <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 基准元素</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;</span> mid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        left<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        right<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token function">rec</span><span class="token punctuation">(</span>left<span class="token punctuation">)</span><span class="token punctuation">,</span> mid<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token function">rec</span><span class="token punctuation">(</span>right<span class="token punctuation">)</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token function">res</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>快速排序是冒泡排序的升级版，最坏情况下每一次基准元素都是数组中最小或者最大的元素，则快速排序就是冒泡排序</p>
<p>这种情况时间复杂度就是冒泡排序的时间复杂度：<code v-pre>T[n] = n * (n-1) = n^2 + n</code>，也就是<code v-pre>O(n^2)</code></p>
<p>最好情况下是<code v-pre>O(nlogn)</code>，其中递归算法的时间复杂度公式：<code v-pre>T[n] = aT[n/b] + f(n)</code>，推导如下所示：</p>
<p><img src="https://static.vue-js.com/b6019540-2b5e-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>关于上述代码实现的快速排序，可以看到是稳定的</p>
<h2 id="三、应用场景" tabindex="-1"><a class="header-anchor" href="#三、应用场景" aria-hidden="true">#</a> 三、应用场景</h2>
<p>快速排序时间复杂度为<code v-pre>O(nlogn)</code>，是目前基于比较的内部排序中被认为最好的方法，当数据过大且数据杂乱无章时，则适合采用快速排序</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://baike.baidu.com/item/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/369842</li>
<li>https://www.cnblogs.com/l199616j/p/10597245.html</li>
</ul>
</div></template>


