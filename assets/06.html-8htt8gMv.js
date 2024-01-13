import{_ as n,o as s,c as a,a as t,b as o}from"./app-du5sw6ua.js";const e={},p=o(`<h1 id="instanceof" tabindex="-1"><a class="header-anchor" href="#instanceof" aria-hidden="true">#</a> instanceof</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// instanceof 核心原理是：对象能否通过 __proto__ 找到构造函数的原型</span>
<span class="token keyword">function</span> <span class="token function">icof</span><span class="token punctuation">(</span><span class="token parameter">o<span class="token punctuation">,</span> p</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 构造函数的原型</span>
  p <span class="token operator">=</span> p<span class="token punctuation">.</span>prototype
  <span class="token comment">// 对象的 __proto__</span>
  o <span class="token operator">=</span> o<span class="token punctuation">.</span>__proto__

  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">===</span> p<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span>
    o <span class="token operator">=</span> o<span class="token punctuation">.</span>__proto__
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">icof</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> Object<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">icof</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> Object<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function c(i,l){return s(),a("div",null,[t(`
 * @Author: lijing
 * @Date: 2023-12-15 23:12:54
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-15 23:29:16
 * @Description: 
`),p])}const r=n(e,[["render",c],["__file","06.html.vue"]]);export{r as default};
