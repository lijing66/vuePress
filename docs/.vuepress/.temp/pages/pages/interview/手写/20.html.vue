<template><div><h1 id="找树中最大的叶子" tabindex="-1"><a class="header-anchor" href="#找树中最大的叶子" aria-hidden="true">#</a> 找树中最大的叶子</h1>
<h2 id="说明" tabindex="-1"><a class="header-anchor" href="#说明" aria-hidden="true">#</a> 说明</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> node <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
    <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token literal-property property">value</span><span class="token operator">:</span><span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span><span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token literal-property property">value</span><span class="token operator">:</span><span class="token number">101</span><span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token literal-property property">value</span><span class="token operator">:</span><span class="token number">200</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>树(node)的每一个节点都有value值，叶子节点是没有子节点的节点，实现获取所有叶子结点中最大值。</p>
<h2 id="参考代码" tabindex="-1"><a class="header-anchor" href="#参考代码" aria-hidden="true">#</a> 参考代码</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">//  定义一个节点  node = { value， children: [node, node] } 如果是叶子节点，</span>
<span class="token comment">//  children = undefined</span>
<span class="token comment">// var node = {</span>
<span class="token comment">//     value: 10,</span>
<span class="token comment">//     children: [</span>
<span class="token comment">//         {value: 9, children: [{value:100}]},</span>
<span class="token comment">//         {value: 90, children: [{value:101, children:[{value:200}]}]}</span>
<span class="token comment">//     ]</span>
<span class="token comment">// }</span>

<span class="token comment">// 给一个初始值</span>
<span class="token keyword">var</span> max <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">Infinity</span>

<span class="token keyword">function</span> <span class="token function">getLargestLeaf</span><span class="token punctuation">(</span><span class="token parameter">node</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// node 是当前要处理的节点</span>
    <span class="token comment">// 如果它就是叶子节点</span>
    <span class="token comment">// 1. 更新下最值 2. 返回</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>children <span class="token operator">==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        max <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>max<span class="token punctuation">,</span> node<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
        <span class="token keyword">return</span> max
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果不是叶子,就要去处理他的叶子</span>
        <span class="token comment">// children是一个数组，每个元素都是一个节点</span>
        <span class="token comment">// 对每个节点递归调用一下，得到一个数组，再取数组的最值</span>
        <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token operator">...</span>node<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">element</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">getLargestLeaf</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token function">getLargestLeaf</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


