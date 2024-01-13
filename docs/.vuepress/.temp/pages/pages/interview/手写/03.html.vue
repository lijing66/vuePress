<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-15 23:12:54
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-15 23:28:48
 * @Description: 
-->
<h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h1>
<p>代码题</p>
<h2 id="需求" tabindex="-1"><a class="header-anchor" href="#需求" aria-hidden="true">#</a> 需求</h2>
<p>解析 <code v-pre>let a={b:10,c:{d:[11,12],e:13}}</code>，实现 <code v-pre>10+11+12+13</code> 效果？</p>
<h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h2>
<p>递归</p>
<h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">d</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">11</span><span class="token punctuation">,</span><span class="token number">12</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">k</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token literal-property property">j</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">e</span><span class="token operator">:</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token literal-property property">f</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> total <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  
  <span class="token keyword">if</span><span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> obj<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">acc<span class="token punctuation">,</span>cur</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> acc <span class="token operator">+</span> <span class="token keyword">typeof</span> cur <span class="token operator">===</span> <span class="token string">'number'</span><span class="token operator">?</span> cur <span class="token operator">:</span>  <span class="token function">sum</span><span class="token punctuation">(</span>cur<span class="token punctuation">)</span>   
    <span class="token punctuation">}</span><span class="token punctuation">,</span> total<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">var</span> values <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
  values<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">it</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    total <span class="token operator">+=</span>  <span class="token keyword">typeof</span> it <span class="token operator">===</span> <span class="token string">'number'</span> <span class="token operator">?</span> it <span class="token operator">:</span> <span class="token function">sum</span><span class="token punctuation">(</span>it<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> total
<span class="token punctuation">}</span>

<span class="token keyword">var</span> s <span class="token operator">=</span> <span class="token function">sum</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token comment">// </span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'数值之和是'</span><span class="token punctuation">,</span> s<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


