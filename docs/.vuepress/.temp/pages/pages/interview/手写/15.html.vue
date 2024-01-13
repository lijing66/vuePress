<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-15 23:12:54
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-15 23:30:31
 * @Description: 
-->
<h1 id="相邻字符串去重" tabindex="-1"><a class="header-anchor" href="#相邻字符串去重" aria-hidden="true">#</a> 相邻字符串去重</h1>
<h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>字符串相邻字符去重。给定一个字符串，把字符串相邻重复的字符去掉。比如：aaabbdebb 变成 abdeb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="思路1-正则替换" tabindex="-1"><a class="header-anchor" href="#思路1-正则替换" aria-hidden="true">#</a> 思路1：正则替换</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">'aaabbdebb'</span>
<span class="token keyword">var</span> newStr <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(\S)\1+</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">r<span class="token punctuation">,</span>$1</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span> <span class="token keyword">return</span> $1<span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在正则表达式中：</p>
<ol>
<li>
<p><code v-pre>\S</code>表示一个非空的字符</p>
</li>
<li>
<p><code v-pre>\1</code>表示对第一个捕获组的引用。捕获组是在正则表达式中使用括号<code v-pre>( )</code>包围起来的部分。当我们在正则表达式中使用<code v-pre>(.)\1+</code>时，<code v-pre>(.)</code>表示一个捕获组，用于匹配任意字符，并将其保存为第一个捕获组。然后，<code v-pre>\1+</code>表示对第一个捕获组的引用，并匹配一个或多个与第一个捕获组相同的字符。</p>
</li>
</ol>
<h2 id="思路2-for循环" tabindex="-1"><a class="header-anchor" href="#思路2-for循环" aria-hidden="true">#</a> 思路2：for循环</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">"aa11abb33debb"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// </span>
<span class="token keyword">var</span> newStr <span class="token operator">=</span> str<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token comment">// 第一个元素先放入</span>

<span class="token keyword">var</span> cur<span class="token operator">=</span> str<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token comment">// 当前的参照元素</span>
<span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>str<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 如果字符串中的当前元素与当前的参照元素</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>str<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!==</span> cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        newStr <span class="token operator">+=</span> <span class="token punctuation">(</span>cur <span class="token operator">=</span> str<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> newStr<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


