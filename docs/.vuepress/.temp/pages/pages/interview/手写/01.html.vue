<template><div><h1 id="call-apply-bind" tabindex="-1"><a class="header-anchor" href="#call-apply-bind" aria-hidden="true">#</a> call / apply / bind</h1>
<h2 id="call" tabindex="-1"><a class="header-anchor" href="#call" aria-hidden="true">#</a> call</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myCall</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">_this <span class="token operator">=</span> window<span class="token punctuation">,</span> <span class="token operator">...</span>val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// _this => window or o</span>
  <span class="token comment">// this => foo</span>
  _this<span class="token punctuation">.</span>_this <span class="token operator">=</span> <span class="token keyword">this</span>
  <span class="token comment">// val => [1, 2]</span>
  <span class="token comment">// o.foo(...[1, 2])</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> _this<span class="token punctuation">.</span><span class="token function">_this</span><span class="token punctuation">(</span><span class="token operator">...</span>val<span class="token punctuation">)</span>
  <span class="token keyword">delete</span> _this<span class="token punctuation">.</span>_this
  <span class="token keyword">return</span> result
<span class="token punctuation">}</span>

<span class="token keyword">const</span> o <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'ifer'</span> <span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> a <span class="token operator">+</span> b<span class="token punctuation">)</span> <span class="token comment">// { name: 'ifer' }</span>
<span class="token punctuation">}</span>

foo<span class="token punctuation">.</span><span class="token function">myCall</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="apply" tabindex="-1"><a class="header-anchor" href="#apply" aria-hidden="true">#</a> apply</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myApply</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">_this <span class="token operator">=</span> window<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// _this => window or o</span>
  <span class="token comment">// this => foo</span>
  _this<span class="token punctuation">.</span>_this <span class="token operator">=</span> <span class="token keyword">this</span>
  <span class="token comment">// val => [1, 2]</span>
  <span class="token comment">// o.foo(...[1, 2])</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> _this<span class="token punctuation">.</span><span class="token function">_this</span><span class="token punctuation">(</span><span class="token operator">...</span>val<span class="token punctuation">)</span>
  <span class="token keyword">delete</span> _this<span class="token punctuation">.</span>_this
  <span class="token keyword">return</span> result
<span class="token punctuation">}</span>

<span class="token keyword">const</span> o <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'ifer'</span> <span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> a <span class="token operator">+</span> b<span class="token punctuation">)</span> <span class="token comment">// { name: 'ifer' }</span>
<span class="token punctuation">}</span>

foo<span class="token punctuation">.</span><span class="token function">myApply</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="bind" tabindex="-1"><a class="header-anchor" href="#bind" aria-hidden="true">#</a> bind</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myBind</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">_this <span class="token operator">=</span> window<span class="token punctuation">,</span> <span class="token operator">...</span>val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// _this => window or o</span>
  <span class="token comment">// this => foo</span>
  _this<span class="token punctuation">.</span>_this <span class="token operator">=</span> <span class="token keyword">this</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// val => [1, 2]</span>
    <span class="token comment">// o.foo(...[1, 2], ...arguments)</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> _this<span class="token punctuation">.</span><span class="token function">_this</span><span class="token punctuation">(</span><span class="token operator">...</span>val<span class="token punctuation">,</span> <span class="token operator">...</span>arguments<span class="token punctuation">)</span>
    <span class="token keyword">delete</span> _this<span class="token punctuation">.</span>_this
    <span class="token keyword">return</span> result
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> o <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'ifer'</span> <span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> a <span class="token operator">+</span> b<span class="token punctuation">)</span> <span class="token comment">// { name: 'ifer' }, 3</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> newFn <span class="token operator">=</span> foo<span class="token punctuation">.</span><span class="token function">myBind</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token function">newFn</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


