<template><div><h2 id="_03-给数字加上千分位" tabindex="-1"><a class="header-anchor" href="#_03-给数字加上千分位" aria-hidden="true">#</a> 03.给数字加上千分位</h2>
<p>要做的事</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 123</span>
<span class="token comment">// 1,234</span>
<span class="token comment">// 123,456</span>
<span class="token comment">// 1,234,567</span>
<span class="token comment">// 12,345,678</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方法一-倒序遍历" tabindex="-1"><a class="header-anchor" href="#方法一-倒序遍历" aria-hidden="true">#</a> 方法一：倒序遍历</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">qianfenwei</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 0. 将数字转成字符</span>
  num <span class="token operator">+=</span> <span class="token string">''</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
  <span class="token comment">// 1.倒序遍历</span>
  num <span class="token operator">=</span> num<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  num<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 2.遍历时，后遍历的数需放入先遍历的数前面</span>
    result <span class="token operator">=</span> v <span class="token operator">+</span> result<span class="token punctuation">;</span>
    <span class="token comment">// 3.每隔3位加一个逗号</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">%</span> <span class="token number">3</span> <span class="token operator">===</span> <span class="token number">2</span> <span class="token operator">&amp;&amp;</span> i <span class="token operator">!==</span> num<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      result <span class="token operator">=</span> <span class="token string">','</span> <span class="token operator">+</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方法二-分开处理" tabindex="-1"><a class="header-anchor" href="#方法二-分开处理" aria-hidden="true">#</a> 方法二：分开处理</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 将数字分为长度是3倍数的部分和剩余部分 </span>
<span class="token keyword">function</span> <span class="token function">qianfenwei2</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">const</span> len <span class="token operator">=</span> num<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
   <span class="token comment">// 获取剩余长度</span>
   <span class="token keyword">const</span> remainderLen <span class="token operator">=</span> len <span class="token operator">%</span> <span class="token number">3</span><span class="token punctuation">;</span>
   <span class="token comment">// 取出剩余字符串</span>
   <span class="token keyword">const</span> result <span class="token operator">=</span> remainderLen <span class="token operator">?</span> <span class="token punctuation">[</span>num<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> remainderLen<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
   <span class="token comment">// 对其余长度是3的倍数的字符做遍历</span>
   <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> remainderLen<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i <span class="token operator">+=</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>num<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> i <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">','</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">','</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方法三-正则表达式" tabindex="-1"><a class="header-anchor" href="#方法三-正则表达式" aria-hidden="true">#</a> 方法三：正则表达式</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">qianfenwei3</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 正则1：</span>
  <span class="token comment">// const len = num.length;</span>
  <span class="token comment">// 将字符填充为长度是3倍速的字符，在数字最前面填充0</span>
  <span class="token comment">// const splitCount = Math.ceil(len / 3);</span>
  <span class="token comment">// num = num.padStart(splitCount * 3, '0');</span>
  <span class="token comment">// 每遇到三个数字就多加一个逗号</span>
  <span class="token comment">// let result = num.replace(/(\d{3})/g,'$1,');</span>
  <span class="token comment">// 将结果最前面的0及最末尾的逗号都替换为空</span>
  <span class="token comment">// result = result.replace(/^0/g, '').replace(/,$/,'');</span>

  <span class="token comment">// 正则2：</span>
  <span class="token comment">// 替换后面是一个或多个3个数字且不是开头位置的地方为，</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> num<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?&lt;!^)(?=(\d{3})+$)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">','</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


