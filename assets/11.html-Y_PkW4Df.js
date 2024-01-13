import{_ as n,o as s,c as a,a as t,b as e}from"./app-du5sw6ua.js";const p={},c=e(`<h1 id="数值转二进制求1的个数" tabindex="-1"><a class="header-anchor" href="#数值转二进制求1的个数" aria-hidden="true">#</a> 数值转二进制求1的个数</h1><h2 id="需求" tabindex="-1"><a class="header-anchor" href="#需求" aria-hidden="true">#</a> 需求</h2><p>编写函数f，它的参数是一个非负的整数，它的返回值是一个它的二进制值中的&quot;1&quot;的个数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">f</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

  <span class="token comment">// 你的代码</span>

<span class="token punctuation">}</span>

<span class="token keyword">const</span> m <span class="token operator">=</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 10的二进制是： 1010, 其中有2个1 </span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span> <span class="token comment">// 所以结果是2</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考1" tabindex="-1"><a class="header-anchor" href="#参考1" aria-hidden="true">#</a> 参考1</h2><p>toString(2)可以得到一个数的n进制表示。例如： Number(2).toString(2) ===&gt; 10</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>
<span class="token keyword">const</span> <span class="token function-variable function">f</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

  <span class="token comment">// 你的代码</span>
  <span class="token keyword">return</span> <span class="token function">Number</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">acc<span class="token punctuation">,</span>cur</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">(</span>cur<span class="token operator">===</span><span class="token string">&#39;1&#39;</span><span class="token operator">?</span> <span class="token operator">++</span>acc <span class="token operator">:</span> acc<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function o(i,l){return s(),a("div",null,[t(`
 * @Author: lijing
 * @Date: 2023-12-15 23:12:54
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-15 23:29:54
 * @Description: 
`),c])}const r=n(p,[["render",o],["__file","11.html.vue"]]);export{r as default};
