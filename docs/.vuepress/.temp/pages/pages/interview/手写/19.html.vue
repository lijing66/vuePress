<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-15 23:12:55
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-15 23:31:08
 * @Description: 
-->
<h1 id="实现一个获取对象任意属性值的方法" tabindex="-1"><a class="header-anchor" href="#实现一个获取对象任意属性值的方法" aria-hidden="true">#</a> 实现一个获取对象任意属性值的方法</h1>
<h2 id="要求说明" tabindex="-1"><a class="header-anchor" href="#要求说明" aria-hidden="true">#</a> 要求说明</h2>
<p>实现一个获取对象任意属性值的方法。 它有三个参数</p>
<ul>
<li>object : 目标对象</li>
<li>attribute: 目标属性</li>
<li>defaultValue: 默认值</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">getAttribute</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">object<span class="token punctuation">,</span>attribute<span class="token punctuation">,</span> defaultValue</span> <span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">d</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token literal-property property">f</span><span class="token operator">:</span> <span class="token string">'abc'</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">getAttribute</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">'a.b.c'</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">===</span><span class="token operator">></span> <span class="token number">100</span>

<span class="token function">getAttribute</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">'a.b.e'</span><span class="token punctuation">,</span> <span class="token string">'def'</span><span class="token punctuation">)</span> <span class="token operator">===</span><span class="token operator">></span> <span class="token string">'def'</span> 

<span class="token function">getAttribute</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">'d.0.f'</span><span class="token punctuation">)</span> <span class="token operator">===</span><span class="token operator">></span> <span class="token string">'abc'</span>   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考代码" tabindex="-1"><a class="header-anchor" href="#参考代码" aria-hidden="true">#</a> 参考代码</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">d</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token literal-property property">f</span><span class="token operator">:</span> <span class="token string">'abc'</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">getAttribute</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> attribute<span class="token punctuation">,</span> defaultValue</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 用. 分割一下，变成数组</span>
    <span class="token keyword">const</span> arr <span class="token operator">=</span> attribute<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">"."</span><span class="token punctuation">)</span>
    <span class="token comment">// 依次取出数组的元素</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> key <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 取出第一个元素，同时会让数组的长度-1</span>
        <span class="token comment">// 判断当前的属性名是否在数组中存在</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 更新下obj，以备下次循环</span>
            obj <span class="token operator">=</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 找不到，就返回默认值</span>
            <span class="token keyword">return</span> defaultValue
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 返回最后的结果</span>
    <span class="token keyword">return</span> obj
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token function">getAttribute</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span><span class="token string">'a.b.c'</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token function">getAttribute</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span><span class="token string">'a.b.e'</span><span class="token punctuation">,</span> <span class="token string">'default'</span><span class="token punctuation">)</span> <span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token function">getAttribute</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span><span class="token string">'d.0.f'</span><span class="token punctuation">,</span> <span class="token string">'abc'</span><span class="token punctuation">)</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


