import{_ as n,o as s,c as a,a as p,b as t}from"./app-du5sw6ua.js";const e={},c=t(`<h1 id="柯里化" tabindex="-1"><a class="header-anchor" href="#柯里化" aria-hidden="true">#</a> 柯里化</h1><h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2><p>函数柯里化指的是将能够接收多个参数的函数转化为接收单一参数的函数，并且返回接收余下参数且返回结果的新函数的技术。</p><p>函数柯里化的主要作用和特点就是参数复用、提前返回和延迟执行</p><p>举例来说，一个接收 3 个参数的普通函数，在进行柯里化后，柯里化版本的函数接收一个参数并返回接收下一个参数的函数，该函数返回一个接收第三个参数的函数。最后一个函数在接收第三个参数后，将之前接收到的三个参数应用于原普通函数中，并返回最终结果</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//普通函数</span>
<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">,</span> e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">,</span> e<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//生成的柯里化函数</span>
<span class="token keyword">let</span> _fn <span class="token operator">=</span> <span class="token function">curry</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span>

<span class="token function">_fn</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">// print: 1,2,3,4,5</span>
<span class="token function">_fn</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">// print: 1,2,3,4,5</span>
<span class="token function">_fn</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">// print: 1,2,3,4,5</span>
<span class="token function">_fn</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">// print: 1,2,3,4,5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于已经柯里化后的_fn 函数来说，当接收的参数数量与原函数的形参数量相同时，执行原函数；当接收的参数数量小于原函数的形参数量时，返回一个函数用于接收剩余的参数，直至接收的参数数量与形参数量一致，执行原函数。</p>`,7);function o(u,l){return s(),a("div",null,[p(`
 * @Author: lijing
 * @Date: 2023-12-14 21:48:59
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-14 22:01:35
 * @Description: 
`),c])}const k=n(e,[["render",o],["__file","21.html.vue"]]);export{k as default};
