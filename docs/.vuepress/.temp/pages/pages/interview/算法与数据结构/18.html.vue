<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-15 23:11:46
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-17 21:13:34
 * @Description: 
-->
<h1 id="说说你对贪心算法、回溯算法的理解-应用场景" tabindex="-1"><a class="header-anchor" href="#说说你对贪心算法、回溯算法的理解-应用场景" aria-hidden="true">#</a> 说说你对贪心算法、回溯算法的理解？应用场景？</h1>
<h2 id="一、贪心算法" tabindex="-1"><a class="header-anchor" href="#一、贪心算法" aria-hidden="true">#</a> 一、贪心算法</h2>
<p>贪心算法，又称贪婪算法，是算法设计中的一种思想</p>
<p>其期待每一个阶段都是局部最优的选择，从而达到全局最优，但是结果并不一定是最优的</p>
<p>举个零钱兑换的例子，如果你有1元、2元、5元的钱币数张，用于兑换一定的金额，但是要求兑换的钱币张数最少</p>
<p>如果现在你要兑换11元，按照贪心算法的思想，先选择面额最大的5元钱币进行兑换，那么就得到11 = 5 + 5 + 1 的选择，这种情况是最优的</p>
<p>但是如果你手上钱币的面额为1、3、4，想要兑换6元，按照贪心算法的思路，我们会 6 = 4 + 1 + 1这样选择，这种情况结果就不是最优的选择</p>
<p>从上面例子可以看到，贪心算法存在一些弊端，使用到贪心算法的场景，都会存在一个特性：</p>
<p>一旦一个问题可以通过贪心法来解决，那么贪心法一般是解决这个问题的最好办法</p>
<p>至于是否选择贪心算法，主要看是否有如下两大特性：</p>
<ul>
<li>贪心选择：当某一个问题的整体最优解可通过一系列局部的最优解的选择达到，并且每次做出的选择可以依赖以前做出的选择，但不需要依赖后面需要做出的选择</li>
<li>最优子结构：如果一个问题的最优解包含其子问题的最优解，则此问题具备最优子结构的性质。问题的最优子结构性质是该问题是否可以用贪心算法求解的关键所在</li>
</ul>
<h2 id="二、回溯算法" tabindex="-1"><a class="header-anchor" href="#二、回溯算法" aria-hidden="true">#</a> 二、回溯算法</h2>
<p>回溯算法，也是算法设计中的一种思想，是一种渐进式寻找并构建问题解决方式的策略</p>
<p>回溯算法会先从一个可能的工作开始解决问题，如果不行，就回溯并选择另一个动作，知道将问题解决</p>
<p>使用回溯算法的问题，有如下特性：</p>
<ul>
<li>有很多路，例如一个矩阵的方向或者树的路径</li>
<li>在这些的路里面，有死路也有生路，思路即不符合题目要求的路，生路则符合</li>
<li>通常使用递归来模拟所有的路</li>
</ul>
<p>常见的伪代码如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">function</span> <span class="token function">backtrack</span><span class="token punctuation">(</span><span class="token parameter">路径<span class="token punctuation">,</span> 选择列表</span><span class="token punctuation">)</span><span class="token operator">:</span>
  <span class="token keyword">if</span> <span class="token literal-property property">满足结束条件</span><span class="token operator">:</span>
    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>路径<span class="token punctuation">)</span>
  <span class="token keyword">return</span>

  <span class="token keyword">for</span> 选择 <span class="token keyword">of</span> <span class="token literal-property property">选择列表</span><span class="token operator">:</span>
    做选择
    <span class="token function">backtrack</span><span class="token punctuation">(</span>路径<span class="token punctuation">,</span> 选择列表<span class="token punctuation">)</span>
    撤销选择
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重点解决三个问题：</p>
<ul>
<li>路径：也就是已经做出的选择</li>
<li>选择列表</li>
<li>结束条件</li>
</ul>
<p>例如经典使用回溯算法为解决全排列的问题，如下：</p>
<p>一个不含重复数字的数组 <code v-pre>nums</code> ，我们要返回其所有可能的全排列，解决这个问题的思路是：</p>
<ul>
<li>用递归模拟所有的情况</li>
<li>遇到包含重复元素的情况则回溯</li>
<li>收集到所有到达递归终点的情况，并返回、</li>
</ul>
<p><img src="https://static.vue-js.com/2a030f00-2e8e-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>用代码表示则如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">permute</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> path <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">backtracking</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    
    <span class="token keyword">function</span> <span class="token function">backtracking</span><span class="token punctuation">(</span><span class="token parameter">n<span class="token punctuation">,</span> k<span class="token punctuation">,</span> used</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span>length <span class="token operator">===</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> k<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>used<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>
            path<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>n<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            used<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// 同支</span>
            <span class="token function">backtracking</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> k<span class="token punctuation">,</span> used<span class="token punctuation">)</span><span class="token punctuation">;</span>
            path<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            used<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p>前面也初步了解到分而治之、动态规划，现在再了解到贪心算法、回溯算法</p>
<p>其中关于分而治之、动态规划、贪心策略三者的求解思路如下：</p>
<p><img src="https://static.vue-js.com/504b5230-2e8e-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>其中三者对应的经典问题如下图：</p>
<p><img src="https://static.vue-js.com/62cdc910-2e8e-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zh.wikipedia.org/wiki/%E8%B4%AA%E5%BF%83%E7%AE%97%E6%B3%95</li>
<li>https://leetcode-cn.com/problems/permutations/solution/dai-ma-sui-xiang-lu-dai-ni-xue-tou-hui-s-mfrp/</li>
<li>https://cloud.tencent.com/developer/article/1767046</li>
</ul>
</div></template>


