<template><div><h1 id="说说你对归并排序的理解-如何实现-应用场景" tabindex="-1"><a class="header-anchor" href="#说说你对归并排序的理解-如何实现-应用场景" aria-hidden="true">#</a> 说说你对归并排序的理解？如何实现？应用场景？</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>归并排序（Merge Sort）是建立归并操作上的一种有效，稳定的排序算法，该算法是采用分治法的一个非常典型的应用</p>
<p>将已有序的子序列合并，得到完全有序的序列，即先使每个子序列有序，再使子序列段间有序</p>
<p>例如对于含有 <code v-pre>n</code> 个记录的无序表，首先默认表中每个记录各为一个有序表（只不过表的长度都为 1）</p>
<p>然后进行两两合并，使 <code v-pre>n</code> 个有序表变为<code v-pre>n/2</code> 个长度为 2 或者 1 的有序表（例如 4 个小有序表合并为 2 个大的有序表）</p>
<p>通过不断地进行两两合并，直到得到一个长度为 <code v-pre>n</code> 的有序表为止</p>
<p>例如对无序表{49，38，65，97，76，13，27}进行归并排序分成了分、合两部分：</p>
<p>如下图所示：</p>
<p><img src="https://static.vue-js.com/05f14b60-26ad-11ec-a752-75723a64e8f5.png" alt=""></p>
<p>归并合过程中，每次得到的新的子表本身有序，所以最终得到有序表</p>
<p>上述分成两部分，则称为二路归并，如果分成三个部分则称为三路归并，以此类推</p>
<h2 id="二、如何实现" tabindex="-1"><a class="header-anchor" href="#二、如何实现" aria-hidden="true">#</a> 二、如何实现</h2>
<p>关于归并排序的算法思路如下：</p>
<ul>
<li>
<p>分：把数组分成两半，再递归对子数组进行分操作，直至到一个个单独数字</p>
</li>
<li>
<p>合：把两个数合成有序数组，再对有序数组进行合并操作，直到全部子数组合成一个完整的数组</p>
<ul>
<li>合并操作可以新建一个数组，用于存放排序后的数组</li>
<li>比较两个有序数组的头部，较小者出队并且推入到上述新建的数组中</li>
<li>如果两个数组还有值，则重复上述第二步</li>
<li>如果只有一个数组有值，则将该数组的值出队并推入到上述新建的数组中</li>
</ul>
</li>
</ul>
<p><img src="https://www.runoob.com/wp-content/uploads/2019/03/mergeSort.gif" alt=""></p>
<p>用代码表示则如下图所示：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mergeSort</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// 采用自上而下的递归方法</span>
    <span class="token keyword">const</span> len <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>len <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> arr<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> middle <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>len <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        left <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> middle<span class="token punctuation">)</span><span class="token punctuation">,</span>
        right <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>middle<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">merge</span><span class="token punctuation">(</span><span class="token function">mergeSort</span><span class="token punctuation">(</span>left<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">mergeSort</span><span class="token punctuation">(</span>right<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">merge</span><span class="token punctuation">(</span><span class="token parameter">left<span class="token punctuation">,</span> right</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>left<span class="token punctuation">.</span>length <span class="token operator">&amp;&amp;</span> right<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>left<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">&lt;=</span> right<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>right<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>left<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
        result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>right<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
        result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>right<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述归并分成了分、合两部分，在处理分过程中递归调用两个分的操作，所花费的时间为2乘<code v-pre>T(n/2)</code>，合的操作时间复杂度则为<code v-pre>O(n)</code>，因此可以得到以下公式：</p>
<p>总的执行时间 = 2 × 输入长度为<code v-pre>n/2</code>的<code v-pre>sort</code>函数的执行时间 + <code v-pre>merge</code>函数的执行时间<code v-pre>O(n)</code></p>
<p>当只有一个元素时，<code v-pre>T(1) = O(1)</code></p>
<p>如果对<code v-pre>T(n) = 2 * T(n/2) + O(n)</code>进行左右 / n的操作，得到 <code v-pre>T(n) / n = (n / 2) * T(n/2) + O(1)</code></p>
<p>现在令 <code v-pre>S(n) = T(n)/n</code>，则<code v-pre>S(1) = O(1)</code>，然后利用表达式带入得到<code v-pre>S(n) = S(n/2) + O(1)</code></p>
<p>所以可以得到：<code v-pre>S(n) = S(n/2) + O(1) = S(n/4) + O(2) = S(n/8) + O(3) = S(n/2^k) + O(k) = S(1) + O(logn) = O(logn)</code></p>
<p>综上可得，<code v-pre>T(n) = n * log(n) = nlogn</code></p>
<p>关于归并排序的稳定性，在进行合并过程，在1个或2个元素时，1个元素不会交换，2个元素如果大小相等也不会交换，由此可见归并排序是稳定的排序算法</p>
<h2 id="三、应用场景" tabindex="-1"><a class="header-anchor" href="#三、应用场景" aria-hidden="true">#</a> 三、应用场景</h2>
<p>在外排序中通常使用排序-归并的策略，外排序是指处理超过内存限度的数据的排序算法，通常将中间结果放在读写较慢的外存储器，如下分成两个阶段：</p>
<ul>
<li>排序阶段：读入能够放进内存中的数据量，将其排序输出到临时文件，一次进行，将带排序数据组织为多个有序的临时文件</li>
<li>归并阶段：将这些临时文件组合为大的有序文件</li>
</ul>
<p>例如，使用100m内存对900m的数据进行排序，过程如下：</p>
<ul>
<li>读入100m数据内存，用常规方式排序</li>
<li>将排序后的数据写入磁盘</li>
<li>重复前两个步骤，得到9个100m的临时文件</li>
<li>将100m的内存划分为10份，将9份为输入缓冲区，第10份为输出缓冲区</li>
<li>进行九路归并排序，将结果输出到缓冲区
<ul>
<li>若输出缓冲区满，将数据写到目标文件，清空缓冲区</li>
<li>若缓冲区空，读入相应文件的下一份数据</li>
</ul>
</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://baike.baidu.com/item/%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F/1639015</li>
<li>https://chowdera.com/2021/09/20210920201630258d.html#_127</li>
<li>https://juejin.cn/post/6844904007899561998</li>
</ul>
</div></template>


