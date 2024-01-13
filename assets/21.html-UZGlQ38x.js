import{_ as n,o as s,c as a,a as p,b as t}from"./app-du5sw6ua.js";const e={},o=t(`<h1 id="两个有序数组合并为有序数组" tabindex="-1"><a class="header-anchor" href="#两个有序数组合并为有序数组" aria-hidden="true">#</a> 两个有序数组合并为有序数组</h1><h2 id="要求" tabindex="-1"><a class="header-anchor" href="#要求" aria-hidden="true">#</a> 要求</h2><p>给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中，使得 num1 成为一个有序数组。</p><p>说明: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>
<span class="token keyword">function</span> <span class="token function">merge</span><span class="token punctuation">(</span><span class="token parameter">nums1<span class="token punctuation">,</span> m<span class="token punctuation">,</span> nums2<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 你的代码</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>nums1<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输入: nums1 = [1,2,3,0,0,0], m = 3 nums2 = [2,5,6], n = 3 输出: [1,2,2,3,5,6]。 <code>merge(nums1, m, nums2, n)</code>, <code>console.log(nums1)</code>会得到 [1,2,2,3,5,6]</p><h2 id="参考代码" tabindex="-1"><a class="header-anchor" href="#参考代码" aria-hidden="true">#</a> 参考代码</h2><p>思路: 依次找最大值</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">merge</span><span class="token punctuation">(</span><span class="token parameter">nums1<span class="token punctuation">,</span> m<span class="token punctuation">,</span> nums2<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> p1 <span class="token operator">=</span> m <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> p2 <span class="token operator">=</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> p <span class="token operator">=</span> m <span class="token operator">+</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span>p1 <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> p2 <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nums1<span class="token punctuation">[</span>p1<span class="token punctuation">]</span> <span class="token operator">&gt;</span> nums2<span class="token punctuation">[</span>p2<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      nums1<span class="token punctuation">[</span>p<span class="token punctuation">]</span> <span class="token operator">=</span> nums1<span class="token punctuation">[</span>p1<span class="token punctuation">]</span><span class="token punctuation">;</span>
      p1<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      nums1<span class="token punctuation">[</span>p<span class="token punctuation">]</span> <span class="token operator">=</span> nums2<span class="token punctuation">[</span>p2<span class="token punctuation">]</span><span class="token punctuation">;</span>
      p2<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    p<span class="token operator">--</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 将 nums2 中剩余的元素放入 nums1</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>p2 <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    nums1<span class="token punctuation">[</span>p<span class="token punctuation">]</span> <span class="token operator">=</span> nums2<span class="token punctuation">[</span>p2<span class="token punctuation">]</span><span class="token punctuation">;</span>
    p2<span class="token operator">--</span><span class="token punctuation">;</span>
    p<span class="token operator">--</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> nums1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> m <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> nums2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> n <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>

<span class="token function">merge</span><span class="token punctuation">(</span>nums1<span class="token punctuation">,</span> m<span class="token punctuation">,</span> nums2<span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>nums1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出 [1, 2, 2, 3, 5, 6]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9);function c(u,l){return s(),a("div",null,[p(`
 * @Author: lijing
 * @Date: 2023-12-15 23:12:55
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-15 23:31:20
 * @Description: 
`),o])}const r=n(e,[["render",c],["__file","21.html.vue"]]);export{r as default};
