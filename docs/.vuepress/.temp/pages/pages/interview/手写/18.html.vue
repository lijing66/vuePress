<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-15 23:12:55
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-15 23:30:55
 * @Description: 
-->
<h1 id="判断鼠标进入元素的方向" tabindex="-1"><a class="header-anchor" href="#判断鼠标进入元素的方向" aria-hidden="true">#</a> 判断鼠标进入元素的方向</h1>
<h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h2>
<p><img src="https://pics1.baidu.com/feed/e61190ef76c6a7ef34b13107b338375df2de664f@f_auto?token=25cc40ec8d42ad5dd78d3850201d94fc&amp;f=jpeg" alt="Alt text"></p>
<h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>rectangle<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mouseenter'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// console.log( getDirection(document.body, e, rectangle) )</span>
    <span class="token keyword">const</span> ox <span class="token operator">=</span> rectangle<span class="token punctuation">.</span>offsetLeft <span class="token operator">+</span> rectangle<span class="token punctuation">.</span>offsetWidth<span class="token operator">/</span><span class="token number">2</span>
    <span class="token keyword">const</span> oy <span class="token operator">=</span> rectangle<span class="token punctuation">.</span>offsetTop <span class="token operator">+</span> rectangle<span class="token punctuation">.</span>offsetHeight<span class="token operator">/</span><span class="token number">2</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'中心点'</span><span class="token punctuation">,</span> ox<span class="token punctuation">,</span> oy<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'鼠标'</span><span class="token punctuation">,</span>  e<span class="token punctuation">.</span>pageX<span class="token punctuation">,</span> e<span class="token punctuation">.</span>pageY<span class="token punctuation">)</span>

    <span class="token comment">// 基准角度</span>
    <span class="token keyword">const</span> d <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">atan2</span><span class="token punctuation">(</span>rectangle<span class="token punctuation">.</span>offsetHeight<span class="token punctuation">,</span>rectangle<span class="token punctuation">.</span>offsetWidth<span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">180</span><span class="token operator">/</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span>
    
    <span class="token keyword">const</span> x <span class="token operator">=</span> e<span class="token punctuation">.</span>pageX <span class="token operator">-</span> ox
    <span class="token comment">// 计算机中的坐标系是向下为正</span>
    <span class="token comment">// 数学中的坐标系是向上为正，方向是相反的，要矫正下</span>
    <span class="token keyword">const</span> y <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">*</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>pageY <span class="token operator">-</span> oy<span class="token punctuation">)</span>

    <span class="token keyword">const</span> t <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">atan2</span><span class="token punctuation">(</span>y<span class="token punctuation">,</span>x<span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">180</span><span class="token operator">/</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span>
    <span class="token comment">// console.log('角度', t)</span>
    <span class="token comment">// 右： [-d, d]</span>
    <span class="token comment">// 上： [d, 180-d]</span>
    <span class="token comment">// 左： [180-d, 180] &amp;&amp; [-180, -180+d]</span>
    <span class="token comment">// 下： [-180+d, -d]</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'d'</span><span class="token punctuation">,</span> d<span class="token punctuation">)</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>t <span class="token operator">></span> <span class="token operator">-</span>d <span class="token operator">&amp;&amp;</span> t <span class="token operator">&lt;=</span> d<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"right"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>t <span class="token operator">></span> d <span class="token operator">&amp;&amp;</span> t <span class="token operator">&lt;=</span> <span class="token number">180</span> <span class="token operator">-</span> d<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"up"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>t <span class="token operator">></span> <span class="token operator">-</span><span class="token number">180</span> <span class="token operator">+</span> d <span class="token operator">&amp;&amp;</span> t <span class="token operator">&lt;=</span> <span class="token operator">-</span>d<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"下"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'左'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
</div></template>


