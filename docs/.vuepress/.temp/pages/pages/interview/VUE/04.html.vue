<template><div><h1 id="vue-中的-key" tabindex="-1"><a class="header-anchor" href="#vue-中的-key" aria-hidden="true">#</a> vue 中的 key</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>所有的元素都可以设置key属性，合理的设置元素上的key值有利于提升diff算法的效率。其他一些特殊的场合下，通过刻意的设置key可以达到强制刷新的目的。</p>
<h2 id="key-是什么" tabindex="-1"><a class="header-anchor" href="#key-是什么" aria-hidden="true">#</a> Key 是什么</h2>
<p>key是一个特殊的熟悉名，类似于html元素上的id属性一样。 vue中设置key作用主要是为了提升diff算法的效率。</p>
<p>我们知道状态的变化会导致视图的更新，其中的更具体的过程是状态1通过render函数生成虚拟dom1对应生成视图，当状态变化（从状态1到了状态2之后），自动触发render生成新的的虚拟dom2，那虚拟dom2对应的视图是什么样子？ 这就是diff的工作内容了。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>状态<span class="token number">1</span> —<span class="token operator">></span> 虚拟dom1 ——<span class="token operator">></span> 视图<span class="token number">1</span><span class="token punctuation">,</span>
状态<span class="token number">2</span> —<span class="token operator">></span> 虚拟dom2 ——<span class="token operator">></span>   ？
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>大概的思路是： 比较虚拟dom1和虚拟dom2的区别，然后在 视图1的基础上 尽可能做小范围修改（这个过程可以形象的称为“打补丁”），从而得到视图2。</p>
<p>正确的设置了key之后，可以让这个过程更加的高效。</p>
<h2 id="场景" tabindex="-1"><a class="header-anchor" href="#场景" aria-hidden="true">#</a> 场景</h2>
<p>开始之前，我们先还原两个实际工作场景。</p>
<ol>
<li>当我们在使用<code v-pre>v-for</code>时，需要给单元加上<code v-pre>key</code></li>
</ol>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item in items<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item.id<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>用<code v-pre>+new Date()</code>生成的时间戳作为<code v-pre>key</code>，手动强制触发重新渲染</li>
</ol>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Comp</span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>+new Date()<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="设置-key-与不设置-key-区别" tabindex="-1"><a class="header-anchor" href="#设置-key-与不设置-key-区别" aria-hidden="true">#</a> 设置 key 与不设置 key 区别</h2>
<p>举个例子：创建一个实例，2 秒后往<code v-pre>items</code>数组插入数据</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>demo<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item in items<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{item}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>../../dist/vue.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// 创建实例</span>
    <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">'#demo'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">,</span> <span class="token string">'d'</span><span class="token punctuation">,</span> <span class="token string">'e'</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">'f'</span><span class="token punctuation">)</span> 
          <span class="token comment">// ['a', 'b', 'f', 'c',, d', 'e']</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在不使用<code v-pre>key</code>的情况，<code v-pre>vue</code>会进行这样的操作：</p>
<p><img src="https://static.vue-js.com/c9da6790-3f41-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>分析下整体流程：</p>
<ul>
<li>比较 A，A，相同类型的节点，进行<code v-pre>patch</code>，但数据相同，不发生<code v-pre>dom</code>操作</li>
<li>比较 B，B，相同类型的节点，进行<code v-pre>patch</code>，但数据相同，不发生<code v-pre>dom</code>操作</li>
<li>比较 C，F，相同类型的节点，进行<code v-pre>patch</code>，数据不同，发生<code v-pre>dom</code>操作</li>
<li>比较 D，C，相同类型的节点，进行<code v-pre>patch</code>，数据不同，发生<code v-pre>dom</code>操作</li>
<li>比较 E，D，相同类型的节点，进行<code v-pre>patch</code>，数据不同，发生<code v-pre>dom</code>操作</li>
<li>循环结束，将 E 插入到<code v-pre>DOM</code>中</li>
</ul>
<p>一共发生了 3 次更新，1 次插入操作</p>
<p>在使用<code v-pre>key</code>的情况：<code v-pre>vue</code>会进行这样的操作：</p>
<ul>
<li>比较 A，A，相同类型的节点，进行<code v-pre>patch</code>，但数据相同，不发生<code v-pre>dom</code>操作</li>
<li>比较 B，B，相同类型的节点，进行<code v-pre>patch</code>，但数据相同，不发生<code v-pre>dom</code>操作</li>
<li>比较 C，F，不相同类型的节点
<ul>
<li>比较 E、E，相同类型的节点，进行<code v-pre>patch</code>，但数据相同，不发生<code v-pre>dom</code>操作</li>
</ul>
</li>
<li>比较 D、D，相同类型的节点，进行<code v-pre>patch</code>，但数据相同，不发生<code v-pre>dom</code>操作</li>
<li>比较 C、C，相同类型的节点，进行<code v-pre>patch</code>，但数据相同，不发生<code v-pre>dom</code>操作</li>
<li>循环结束，将 F 插入到 C 之前</li>
</ul>
<p>一共发生了 0 次更新，1 次插入操作 通过上面两个小例子，可见设置<code v-pre>key</code>能够大大减少对页面的<code v-pre>DOM</code>操作，提高了<code v-pre>diff</code>效率</p>
<h3 id="设置-key-值一定能提高-diff-效率吗" tabindex="-1"><a class="header-anchor" href="#设置-key-值一定能提高-diff-效率吗" aria-hidden="true">#</a> 设置 key 值一定能提高 diff 效率吗？</h3>
<p>其实不然，文档中也明确表示</p>
<blockquote>
<p>当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素</p>
</blockquote>
<p>这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出</p>
<p>建议尽可能在使用 <code v-pre>v-for</code> 时提供 <code v-pre>key</code>，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升</p>
<h2 id="原理分析" tabindex="-1"><a class="header-anchor" href="#原理分析" aria-hidden="true">#</a> 原理分析</h2>
<p>源码位置：core/vdom/patch.js</p>
<p>这里判断是否为同一个<code v-pre>key</code>，首先判断的是<code v-pre>key</code>值是否相等如果没有设置<code v-pre>key</code>，那么<code v-pre>key</code>为<code v-pre>undefined</code>，这时候<code v-pre>undefined</code>是恒等于<code v-pre>undefined</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">sameVnode</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    a<span class="token punctuation">.</span>key <span class="token operator">===</span> b<span class="token punctuation">.</span>key <span class="token operator">&amp;&amp;</span>
    <span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>tag <span class="token operator">===</span> b<span class="token punctuation">.</span>tag <span class="token operator">&amp;&amp;</span> a<span class="token punctuation">.</span>isComment <span class="token operator">===</span> b<span class="token punctuation">.</span>isComment <span class="token operator">&amp;&amp;</span> <span class="token function">isDef</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token function">isDef</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sameInputType</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span>
      <span class="token punctuation">(</span><span class="token function">isTrue</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>isAsyncPlaceholder<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> a<span class="token punctuation">.</span>asyncFactory <span class="token operator">===</span> b<span class="token punctuation">.</span>asyncFactory <span class="token operator">&amp;&amp;</span> <span class="token function">isUndef</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>asyncFactory<span class="token punctuation">.</span>error<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>updateChildren</code>方法中会对新旧<code v-pre>vnode</code>进行<code v-pre>diff</code>，然后将比对出的结果用来更新真实的<code v-pre>DOM</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">updateChildren</span> <span class="token punctuation">(</span><span class="token parameter">parentElm<span class="token punctuation">,</span> oldCh<span class="token punctuation">,</span> newCh<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">,</span> removeOnly</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>oldStartIdx <span class="token operator">&lt;=</span> oldEndIdx <span class="token operator">&amp;&amp;</span> newStartIdx <span class="token operator">&lt;=</span> newEndIdx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isUndef</span><span class="token punctuation">(</span>oldStartVnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token operator">...</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isUndef</span><span class="token punctuation">(</span>oldEndVnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token operator">...</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">sameVnode</span><span class="token punctuation">(</span>oldStartVnode<span class="token punctuation">,</span> newStartVnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token operator">...</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">sameVnode</span><span class="token punctuation">(</span>oldEndVnode<span class="token punctuation">,</span> newEndVnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token operator">...</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">sameVnode</span><span class="token punctuation">(</span>oldStartVnode<span class="token punctuation">,</span> newEndVnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// Vnode moved right</span>
      <span class="token operator">...</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">sameVnode</span><span class="token punctuation">(</span>oldEndVnode<span class="token punctuation">,</span> newStartVnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// Vnode moved left</span>
      <span class="token operator">...</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isUndef</span><span class="token punctuation">(</span>oldKeyToIdx<span class="token punctuation">)</span><span class="token punctuation">)</span> oldKeyToIdx <span class="token operator">=</span> <span class="token function">createKeyToOldIdx</span><span class="token punctuation">(</span>oldCh<span class="token punctuation">,</span> oldStartIdx<span class="token punctuation">,</span> oldEndIdx<span class="token punctuation">)</span>
      idxInOld <span class="token operator">=</span> <span class="token function">isDef</span><span class="token punctuation">(</span>newStartVnode<span class="token punctuation">.</span>key<span class="token punctuation">)</span>
          <span class="token operator">?</span> oldKeyToIdx<span class="token punctuation">[</span>newStartVnode<span class="token punctuation">.</span>key<span class="token punctuation">]</span>
          <span class="token operator">:</span> <span class="token function">findIdxInOld</span><span class="token punctuation">(</span>newStartVnode<span class="token punctuation">,</span> oldCh<span class="token punctuation">,</span> oldStartIdx<span class="token punctuation">,</span> oldEndIdx<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isUndef</span><span class="token punctuation">(</span>idxInOld<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// New element</span>
          <span class="token function">createElm</span><span class="token punctuation">(</span>newStartVnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">,</span> parentElm<span class="token punctuation">,</span> oldStartVnode<span class="token punctuation">.</span>elm<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> newCh<span class="token punctuation">,</span> newStartIdx<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          vnodeToMove <span class="token operator">=</span> oldCh<span class="token punctuation">[</span>idxInOld<span class="token punctuation">]</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">sameVnode</span><span class="token punctuation">(</span>vnodeToMove<span class="token punctuation">,</span> newStartVnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token function">patchVnode</span><span class="token punctuation">(</span>vnodeToMove<span class="token punctuation">,</span> newStartVnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">,</span> newCh<span class="token punctuation">,</span> newStartIdx<span class="token punctuation">)</span>
              oldCh<span class="token punctuation">[</span>idxInOld<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">undefined</span>
              canMove <span class="token operator">&amp;&amp;</span> nodeOps<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span>parentElm<span class="token punctuation">,</span> vnodeToMove<span class="token punctuation">.</span>elm<span class="token punctuation">,</span> oldStartVnode<span class="token punctuation">.</span>elm<span class="token punctuation">)</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
              <span class="token comment">// same key but different element. treat as new element</span>
              <span class="token function">createElm</span><span class="token punctuation">(</span>newStartVnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">,</span> parentElm<span class="token punctuation">,</span> oldStartVnode<span class="token punctuation">.</span>elm<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> newCh<span class="token punctuation">,</span> newStartIdx<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      newStartVnode <span class="token operator">=</span> newCh<span class="token punctuation">[</span><span class="token operator">++</span>newStartIdx<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://juejin.cn/post/6844903826693029895</li>
<li>https://juejin.cn/post/6844903985397104648</li>
<li>https://vue3js.cn/docs/zh</li>
</ul>
</div></template>


