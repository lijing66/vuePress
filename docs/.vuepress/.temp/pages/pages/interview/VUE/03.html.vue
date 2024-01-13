<template><div><h1 id="vue2-的-diff-算法" tabindex="-1"><a class="header-anchor" href="#vue2-的-diff-算法" aria-hidden="true">#</a> <a href="#">#</a> Vue2 的 diff 算法</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> <a href="#">#</a> 简版</h2>
<p>Diff算法是一种对比算法。参与对比的双方是 旧虚拟DOM 和新虚拟 DOM。vue的diff算法不是先找出两者的区别，再去更新页面。而是一边比较一边更新(操作dom)。</p>
<p>他的对比过程如下：</p>
<p>在新老虚拟 DOM 对比时：</p>
<ul>
<li>首先，对比节点本身，判断是否为同一节点，如果不为相同节点，则删除该节点重新创建节点进行替换</li>
<li>如果为相同节点，进行patchVnode，判断如何对该节点的子节点进行处理，先判断一方有子节点一方没有子节点的情况(如果新的 children 没有子节点，将旧的子节点移除)</li>
<li>比较如果都有子节点，则进行 updateChildren，判断如何对这些新老节点的子节点进行操作（diff 核心）。</li>
<li>匹配时，找到相同的子节点，递归比较子节点</li>
</ul>
<p>在 diff 中，只对同层的子节点进行比较，放弃跨级的节点比较，使得时间复杂从 O(n3)降低值 O(n)，也就是说，只有当新旧 children 都为多个子节点时才需要用核心的 Diff 算法进行同层级比较。</p>
<p>虚拟DOM算法和真实DOM算法比较：</p>
<p>使用虚拟 DOM 算法的损耗计算 ： 总损耗 = 虚拟 DOM 增删改 +（与 Diff 算法效率有关）真实 DOM 差异增删改+（较少的节点）排版与重绘</p>
<p>直接操作真实 DOM 的损耗计算： 总损耗 = 真实 DOM 完全增删改 +（可能较多的节点）排版与重绘</p>
<h2 id="diff-是什么" tabindex="-1"><a class="header-anchor" href="#diff-是什么" aria-hidden="true">#</a> <a href="#">#</a> diff 是什么</h2>
<p><img src="@source/pages/interview/VUE/img/diff.png" alt="image-20220728143351625"></p>
<p>diff 是对比的意思，是一个广泛的概念，例如 linux diff 命令，git diff 等。</p>
<p>两个 js 对象也可以做 diff，例如：https://github.com/cujojs/jiff 这个库。</p>
<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> <a href="#">#</a> 概述</h2>
<p><img src="@source/pages/interview/VUE/img/gaishu.png" alt="image-20220727102827156"></p>
<p>树的 diff 的<strong>时间复杂度</strong>是 O(n^3)</p>
<p>第一：遍历 tree1，第二遍历 tree2，第三，排序</p>
<p>1000 个节点，要计算 1 亿次，算法不可行</p>
<p>优化时间复杂度到 O(n)</p>
<p>vue 的<code v-pre>diff</code> 算法用来找出两颗虚拟 dom 树的不同。它的特点：</p>
<ul>
<li>比较只会在同层级进行, 不会跨层级比较</li>
<li>tag 不相同，则直接删掉重建，不再深度比较</li>
<li>tag 和 key，两者都相同，表示相同节点，不再深度比较</li>
</ul>
<p><img src="@source/pages/interview/VUE/img/bijiao.png" alt="image-20220727103326807"></p>
<p><img src="@source/pages/interview/VUE/img/bijiao1.png" alt="image-20220727103342928"></p>
<ul>
<li>在 diff 比较的过程中，循环从两边向中间比较</li>
</ul>
<h2 id="比较方式" tabindex="-1"><a class="header-anchor" href="#比较方式" aria-hidden="true">#</a> <a href="#">#</a> 比较方式</h2>
<p>diff 算法是 vdom 中最核心，最关键的部分；diff 算法能在日常使用 vue ,react 中体现出来(如 key)</p>
<p><code v-pre>diff</code>整体策略为：深度优先，同层比较</p>
<ol>
<li>比较只会在同层级进行, 不会跨层级比较</li>
</ol>
<p><img src="@source/pages/interview/VUE/img/01.png" alt="img"></p>
<ol start="2">
<li>比较的过程中，循环从两边向中间收拢</li>
</ol>
<p><img src="@source/pages/interview/VUE/img/02.png" alt="img"></p>
<p>下面举个<code v-pre>vue</code>通过<code v-pre>diff</code>算法更新的例子：</p>
<p>新旧<code v-pre>VNode</code>节点如下图所示：</p>
<p><img src="@source/pages/interview/VUE/img/03.png" alt="img"></p>
<p>第一次循环后，发现旧节点 D 与新节点 D 相同，直接复用旧节点 D 作为<code v-pre>diff</code>后的第一个真实节点，同时旧节点<code v-pre>endIndex</code>移动到 C，新节点的 <code v-pre>startIndex</code> 移动到了 C</p>
<p><img src="@source/pages/interview/VUE/img/04.png" alt="img"></p>
<p>第二次循环后，同样是旧节点的末尾和新节点的开头(都是 C)相同，同理，<code v-pre>diff</code> 后创建了 C 的真实节点插入到第一次创建的 B 节点后面。同时旧节点的 <code v-pre>endIndex</code> 移动到了 B，新节点的 <code v-pre>startIndex</code> 移动到了 E</p>
<p><img src="@source/pages/interview/VUE/img/05.png" alt="img"></p>
<p>第三次循环中，发现 E 没有找到，这时候只能直接创建新的真实节点 E，插入到第二次创建的 C 节点之后。同时新节点的 <code v-pre>startIndex</code> 移动到了 A。旧节点的 <code v-pre>startIndex</code> 和 <code v-pre>endIndex</code> 都保持不动</p>
<p><img src="@source/pages/interview/VUE/img/06.png" alt="img"></p>
<p>第四次循环中，发现了新旧节点的开头(都是 A)相同，于是 <code v-pre>diff</code> 后创建了 A 的真实节点，插入到前一次创建的 E 节点后面。同时旧节点的 <code v-pre>startIndex</code> 移动到了 B，新节点的<code v-pre>startIndex</code> 移动到了 B</p>
<p><img src="@source/pages/interview/VUE/img/07.png" alt="img"></p>
<p>第五次循环中，情形同第四次循环一样，因此 <code v-pre>diff</code> 后创建了 B 真实节点 插入到前一次创建的 A 节点后面。同时旧节点的 <code v-pre>startIndex</code>移动到了 C，新节点的 startIndex 移动到了 F</p>
<p><img src="@source/pages/interview/VUE/img/08.png" alt="img"></p>
<p>新节点的 <code v-pre>startIndex</code> 已经大于 <code v-pre>endIndex</code> 了，需要创建 <code v-pre>newStartIdx</code> 和 <code v-pre>newEndIdx</code> 之间的所有节点，也就是节点 F，直接创建 F 节点对应的真实节点放到 B 节点后面</p>
<p><img src="@source/pages/interview/VUE/img/09.png" alt="09"></p>
<h2 id="原理分析" tabindex="-1"><a class="header-anchor" href="#原理分析" aria-hidden="true">#</a> <a href="#">#</a> 原理分析</h2>
<p>当数据发生改变时，<code v-pre>set</code>方法会调用<code v-pre>Dep.notify</code>通知所有订阅者<code v-pre>Watcher</code>，订阅者就会调用<code v-pre>patch</code>给真实的<code v-pre>DOM</code>打补丁，更新相应的视图</p>
<p>源码位置：src/core/vdom/patch.js</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">patch</span><span class="token punctuation">(</span><span class="token parameter">oldVnode<span class="token punctuation">,</span> vnode<span class="token punctuation">,</span> hydrating<span class="token punctuation">,</span> removeOnly</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isUndef</span><span class="token punctuation">(</span>vnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 没有新节点，直接执行destory钩子函数</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token function">invokeDestroyHook</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">)</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> isInitialPatch <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token keyword">const</span> insertedVnodeQueue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isUndef</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    isInitialPatch <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token function">createElm</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">)</span> <span class="token comment">// 没有旧节点，直接用新节点生成dom元素</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> isRealElement <span class="token operator">=</span> <span class="token function">isDef</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">.</span>nodeType<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isRealElement <span class="token operator">&amp;&amp;</span> <span class="token function">sameVnode</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">,</span> vnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断旧节点和新节点自身一样，一致执行patchVnode</span>
      <span class="token function">patchVnode</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">,</span> vnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> removeOnly<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 否则直接销毁及旧节点，根据新节点生成dom元素</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>isRealElement<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>oldVnode<span class="token punctuation">.</span>nodeType <span class="token operator">===</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> oldVnode<span class="token punctuation">.</span><span class="token function">hasAttribute</span><span class="token punctuation">(</span><span class="token constant">SSR_ATTR</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          oldVnode<span class="token punctuation">.</span><span class="token function">removeAttribute</span><span class="token punctuation">(</span><span class="token constant">SSR_ATTR</span><span class="token punctuation">)</span>
          hydrating <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isTrue</span><span class="token punctuation">(</span>hydrating<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hydrate</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">,</span> vnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">invokeInsertHook</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> oldVnode
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        oldVnode <span class="token operator">=</span> <span class="token function">emptyNodeAt</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> vnode<span class="token punctuation">.</span>elm
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>patch</code>函数前两个参数位为<code v-pre>oldVnode</code> 和 <code v-pre>Vnode</code> ，分别代表新的节点和之前的旧节点，主要做了四个判断：</p>
<ul>
<li>没有新节点，直接触发旧节点的<code v-pre>destory</code>钩子</li>
<li>没有旧节点，说明是页面刚开始初始化的时候，此时，根本不需要比较了，直接全是新建，所以只调用 <code v-pre>createElm</code></li>
<li>旧节点和新节点自身一样，通过 <code v-pre>sameVnode</code> 判断节点是否一样，一样时，直接调用 <code v-pre>patchVnode</code>去处理这两个节点</li>
<li>旧节点和新节点自身不一样，当两个节点不一样的时候，直接创建新节点，删除旧节点</li>
</ul>
<p>下面主要讲的是<code v-pre>patchVnode</code>部分</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">patchVnode</span><span class="token punctuation">(</span><span class="token parameter">oldVnode<span class="token punctuation">,</span> vnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">,</span> removeOnly</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 如果新旧节点一致，什么都不做</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>oldVnode <span class="token operator">===</span> vnode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 让vnode.el引用到现在的真实dom，当el修改时，vnode.el会同步变化</span>
  <span class="token keyword">const</span> elm <span class="token operator">=</span> <span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>elm <span class="token operator">=</span> oldVnode<span class="token punctuation">.</span>elm<span class="token punctuation">)</span>

  <span class="token comment">// 异步占位符</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isTrue</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">.</span>isAsyncPlaceholder<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>asyncFactory<span class="token punctuation">.</span>resolved<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">hydrate</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">.</span>elm<span class="token punctuation">,</span> vnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      vnode<span class="token punctuation">.</span>isAsyncPlaceholder <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 如果新旧都是静态节点，并且具有相同的key</span>
  <span class="token comment">// 当vnode是克隆节点或是v-once指令控制的节点时，只需要把oldVnode.elm和oldVnode.child都复制到vnode上</span>
  <span class="token comment">// 也不用再有其他操作</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isTrue</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>isStatic<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isTrue</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">.</span>isStatic<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> vnode<span class="token punctuation">.</span>key <span class="token operator">===</span> oldVnode<span class="token punctuation">.</span>key <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token function">isTrue</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>isCloned<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">isTrue</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>isOnce<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    vnode<span class="token punctuation">.</span>componentInstance <span class="token operator">=</span> oldVnode<span class="token punctuation">.</span>componentInstance
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> i
  <span class="token keyword">const</span> data <span class="token operator">=</span> vnode<span class="token punctuation">.</span>data
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isDef</span><span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">=</span> data<span class="token punctuation">.</span>hook<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isDef</span><span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">=</span> i<span class="token punctuation">.</span>prepatch<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">i</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">,</span> vnode<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> oldCh <span class="token operator">=</span> oldVnode<span class="token punctuation">.</span>children
  <span class="token keyword">const</span> ch <span class="token operator">=</span> vnode<span class="token punctuation">.</span>children
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isPatchable</span><span class="token punctuation">(</span>vnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> cbs<span class="token punctuation">.</span>update<span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> cbs<span class="token punctuation">.</span>update<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">,</span> vnode<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">=</span> data<span class="token punctuation">.</span>hook<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isDef</span><span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">=</span> i<span class="token punctuation">.</span>update<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token function">i</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">,</span> vnode<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 如果vnode不是文本节点或者注释节点</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isUndef</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 4种情况考虑：</span>
    <span class="token comment">// 并且都有子节点</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>oldCh<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isDef</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 并且子节点不完全一致，则调用updateChildren</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>oldCh <span class="token operator">!==</span> ch<span class="token punctuation">)</span> <span class="token function">updateChildren</span><span class="token punctuation">(</span>elm<span class="token punctuation">,</span> oldCh<span class="token punctuation">,</span> ch<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">,</span> removeOnly<span class="token punctuation">)</span>

      <span class="token comment">// 如果只有新的vnode有子节点</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">)</span> nodeOps<span class="token punctuation">.</span><span class="token function">setTextContent</span><span class="token punctuation">(</span>elm<span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span>
      <span class="token comment">// elm已经引用了老的dom节点，在老的dom节点上添加子节点</span>
      <span class="token function">addVnodes</span><span class="token punctuation">(</span>elm<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> ch<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> ch<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">)</span>

      <span class="token comment">// 如果新vnode没有子节点，而vnode有子节点，直接删除老的oldCh</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>oldCh<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">removeVnodes</span><span class="token punctuation">(</span>elm<span class="token punctuation">,</span> oldCh<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> oldCh<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>

      <span class="token comment">// 如果老节点是文本节点</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      nodeOps<span class="token punctuation">.</span><span class="token function">setTextContent</span><span class="token punctuation">(</span>elm<span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 如果新vnode和老vnode是文本节点或注释节点</span>
    <span class="token comment">// 但是vnode.text != oldVnode.text时，只需要更新vnode.elm的文本内容就可以</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>oldVnode<span class="token punctuation">.</span>text <span class="token operator">!==</span> vnode<span class="token punctuation">.</span>text<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    nodeOps<span class="token punctuation">.</span><span class="token function">setTextContent</span><span class="token punctuation">(</span>elm<span class="token punctuation">,</span> vnode<span class="token punctuation">.</span>text<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">=</span> data<span class="token punctuation">.</span>hook<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isDef</span><span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">=</span> i<span class="token punctuation">.</span>postpatch<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token function">i</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">,</span> vnode<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>patchVnode</code>主要做了几个判断：</p>
<ul>
<li>新节点是否是文本节点，如果是，则直接更新<code v-pre>dom</code>的文本内容为新节点的文本内容</li>
<li>新节点和旧节点如果都有子节点，则处理比较更新子节点</li>
<li>只有新节点有子节点，旧节点没有，那么不用比较了，所有节点都是全新的，所以直接全部新建就好了，新建是指创建出所有新<code v-pre>DOM</code>，并且添加进父节点</li>
<li>只有旧节点有子节点而新节点没有，说明更新后的页面，旧节点全部都不见了，那么要做的，就是把所有的旧节点删除，也就是直接把<code v-pre>DOM</code> 删除</li>
</ul>
<p>子节点不完全一致，则调用<code v-pre>updateChildren</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">updateChildren</span> <span class="token punctuation">(</span><span class="token parameter">parentElm<span class="token punctuation">,</span> oldCh<span class="token punctuation">,</span> newCh<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">,</span> removeOnly</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> oldStartIdx <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">// 旧头索引</span>
    <span class="token keyword">let</span> newStartIdx <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">// 新头索引</span>
    <span class="token keyword">let</span> oldEndIdx <span class="token operator">=</span> oldCh<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span> <span class="token comment">// 旧尾索引</span>
    <span class="token keyword">let</span> newEndIdx <span class="token operator">=</span> newCh<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span> <span class="token comment">// 新尾索引</span>
    <span class="token keyword">let</span> oldStartVnode <span class="token operator">=</span> oldCh<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token comment">// oldVnode的第一个child</span>
    <span class="token keyword">let</span> oldEndVnode <span class="token operator">=</span> oldCh<span class="token punctuation">[</span>oldEndIdx<span class="token punctuation">]</span> <span class="token comment">// oldVnode的最后一个child</span>
    <span class="token keyword">let</span> newStartVnode <span class="token operator">=</span> newCh<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token comment">// newVnode的第一个child</span>
    <span class="token keyword">let</span> newEndVnode <span class="token operator">=</span> newCh<span class="token punctuation">[</span>newEndIdx<span class="token punctuation">]</span> <span class="token comment">// newVnode的最后一个child</span>
    <span class="token keyword">let</span> oldKeyToIdx<span class="token punctuation">,</span> idxInOld<span class="token punctuation">,</span> vnodeToMove<span class="token punctuation">,</span> refElm

    <span class="token comment">// removeOnly is a special flag used only by &lt;transition-group></span>
    <span class="token comment">// to ensure removed elements stay in correct relative positions</span>
    <span class="token comment">// during leaving transitions</span>
    <span class="token keyword">const</span> canMove <span class="token operator">=</span> <span class="token operator">!</span>removeOnly

    <span class="token comment">// 如果oldStartVnode和oldEndVnode重合，并且新的也都重合了，证明diff完了，循环结束</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>oldStartIdx <span class="token operator">&lt;=</span> oldEndIdx <span class="token operator">&amp;&amp;</span> newStartIdx <span class="token operator">&lt;=</span> newEndIdx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果oldVnode的第一个child不存在</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isUndef</span><span class="token punctuation">(</span>oldStartVnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// oldStart索引右移</span>
        oldStartVnode <span class="token operator">=</span> oldCh<span class="token punctuation">[</span><span class="token operator">++</span>oldStartIdx<span class="token punctuation">]</span> <span class="token comment">// Vnode has been moved left</span>

      <span class="token comment">// 如果oldVnode的最后一个child不存在</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isUndef</span><span class="token punctuation">(</span>oldEndVnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// oldEnd索引左移</span>
        oldEndVnode <span class="token operator">=</span> oldCh<span class="token punctuation">[</span><span class="token operator">--</span>oldEndIdx<span class="token punctuation">]</span>

      <span class="token comment">// oldStartVnode和newStartVnode是同一个节点</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">sameVnode</span><span class="token punctuation">(</span>oldStartVnode<span class="token punctuation">,</span> newStartVnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// patch oldStartVnode和newStartVnode， 索引左移，继续循环</span>
        <span class="token function">patchVnode</span><span class="token punctuation">(</span>oldStartVnode<span class="token punctuation">,</span> newStartVnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">)</span>
        oldStartVnode <span class="token operator">=</span> oldCh<span class="token punctuation">[</span><span class="token operator">++</span>oldStartIdx<span class="token punctuation">]</span>
        newStartVnode <span class="token operator">=</span> newCh<span class="token punctuation">[</span><span class="token operator">++</span>newStartIdx<span class="token punctuation">]</span>

      <span class="token comment">// oldEndVnode和newEndVnode是同一个节点</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">sameVnode</span><span class="token punctuation">(</span>oldEndVnode<span class="token punctuation">,</span> newEndVnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// patch oldEndVnode和newEndVnode，索引右移，继续循环</span>
        <span class="token function">patchVnode</span><span class="token punctuation">(</span>oldEndVnode<span class="token punctuation">,</span> newEndVnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">)</span>
        oldEndVnode <span class="token operator">=</span> oldCh<span class="token punctuation">[</span><span class="token operator">--</span>oldEndIdx<span class="token punctuation">]</span>
        newEndVnode <span class="token operator">=</span> newCh<span class="token punctuation">[</span><span class="token operator">--</span>newEndIdx<span class="token punctuation">]</span>

      <span class="token comment">// oldStartVnode和newEndVnode是同一个节点</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">sameVnode</span><span class="token punctuation">(</span>oldStartVnode<span class="token punctuation">,</span> newEndVnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// Vnode moved right</span>
        <span class="token comment">// patch oldStartVnode和newEndVnode</span>
        <span class="token function">patchVnode</span><span class="token punctuation">(</span>oldStartVnode<span class="token punctuation">,</span> newEndVnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">)</span>
        <span class="token comment">// 如果removeOnly是false，则将oldStartVnode.eml移动到oldEndVnode.elm之后</span>
        canMove <span class="token operator">&amp;&amp;</span> nodeOps<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span>parentElm<span class="token punctuation">,</span> oldStartVnode<span class="token punctuation">.</span>elm<span class="token punctuation">,</span> nodeOps<span class="token punctuation">.</span><span class="token function">nextSibling</span><span class="token punctuation">(</span>oldEndVnode<span class="token punctuation">.</span>elm<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token comment">// oldStart索引右移，newEnd索引左移</span>
        oldStartVnode <span class="token operator">=</span> oldCh<span class="token punctuation">[</span><span class="token operator">++</span>oldStartIdx<span class="token punctuation">]</span>
        newEndVnode <span class="token operator">=</span> newCh<span class="token punctuation">[</span><span class="token operator">--</span>newEndIdx<span class="token punctuation">]</span>

      <span class="token comment">// 如果oldEndVnode和newStartVnode是同一个节点</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">sameVnode</span><span class="token punctuation">(</span>oldEndVnode<span class="token punctuation">,</span> newStartVnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// Vnode moved left</span>
        <span class="token comment">// patch oldEndVnode和newStartVnode</span>
        <span class="token function">patchVnode</span><span class="token punctuation">(</span>oldEndVnode<span class="token punctuation">,</span> newStartVnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">)</span>
        <span class="token comment">// 如果removeOnly是false，则将oldEndVnode.elm移动到oldStartVnode.elm之前</span>
        canMove <span class="token operator">&amp;&amp;</span> nodeOps<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span>parentElm<span class="token punctuation">,</span> oldEndVnode<span class="token punctuation">.</span>elm<span class="token punctuation">,</span> oldStartVnode<span class="token punctuation">.</span>elm<span class="token punctuation">)</span>
        <span class="token comment">// oldEnd索引左移，newStart索引右移</span>
        oldEndVnode <span class="token operator">=</span> oldCh<span class="token punctuation">[</span><span class="token operator">--</span>oldEndIdx<span class="token punctuation">]</span>
        newStartVnode <span class="token operator">=</span> newCh<span class="token punctuation">[</span><span class="token operator">++</span>newStartIdx<span class="token punctuation">]</span>

      <span class="token comment">// 如果都不匹配</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isUndef</span><span class="token punctuation">(</span>oldKeyToIdx<span class="token punctuation">)</span><span class="token punctuation">)</span> oldKeyToIdx <span class="token operator">=</span> <span class="token function">createKeyToOldIdx</span><span class="token punctuation">(</span>oldCh<span class="token punctuation">,</span> oldStartIdx<span class="token punctuation">,</span> oldEndIdx<span class="token punctuation">)</span>

        <span class="token comment">// 尝试在oldChildren中寻找和newStartVnode的具有相同的key的Vnode</span>
        idxInOld <span class="token operator">=</span> <span class="token function">isDef</span><span class="token punctuation">(</span>newStartVnode<span class="token punctuation">.</span>key<span class="token punctuation">)</span>
          <span class="token operator">?</span> oldKeyToIdx<span class="token punctuation">[</span>newStartVnode<span class="token punctuation">.</span>key<span class="token punctuation">]</span>
          <span class="token operator">:</span> <span class="token function">findIdxInOld</span><span class="token punctuation">(</span>newStartVnode<span class="token punctuation">,</span> oldCh<span class="token punctuation">,</span> oldStartIdx<span class="token punctuation">,</span> oldEndIdx<span class="token punctuation">)</span>

        <span class="token comment">// 如果未找到，说明newStartVnode是一个新的节点</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isUndef</span><span class="token punctuation">(</span>idxInOld<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// New element</span>
          <span class="token comment">// 创建一个新Vnode</span>
          <span class="token function">createElm</span><span class="token punctuation">(</span>newStartVnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">,</span> parentElm<span class="token punctuation">,</span> oldStartVnode<span class="token punctuation">.</span>elm<span class="token punctuation">)</span>

        <span class="token comment">// 如果找到了和newStartVnodej具有相同的key的Vnode，叫vnodeToMove</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          vnodeToMove <span class="token operator">=</span> oldCh<span class="token punctuation">[</span>idxInOld<span class="token punctuation">]</span>
          <span class="token comment">/* istanbul ignore if */</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">'production'</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>vnodeToMove<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">warn</span><span class="token punctuation">(</span>
              <span class="token string">'It seems there are duplicate keys that is causing an update error. '</span> <span class="token operator">+</span>
              <span class="token string">'Make sure each v-for item has a unique key.'</span>
            <span class="token punctuation">)</span>
          <span class="token punctuation">}</span>

          <span class="token comment">// 比较两个具有相同的key的新节点是否是同一个节点</span>
          <span class="token comment">//不设key，newCh和oldCh只会进行头尾两端的相互比较，设key后，除了头尾两端的比较外，还会从用key生成的对象oldKeyToIdx中查找匹配的节点，所以为节点设置key可以更高效的利用dom。</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">sameVnode</span><span class="token punctuation">(</span>vnodeToMove<span class="token punctuation">,</span> newStartVnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// patch vnodeToMove和newStartVnode</span>
            <span class="token function">patchVnode</span><span class="token punctuation">(</span>vnodeToMove<span class="token punctuation">,</span> newStartVnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">)</span>
            <span class="token comment">// 清除</span>
            oldCh<span class="token punctuation">[</span>idxInOld<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">undefined</span>
            <span class="token comment">// 如果removeOnly是false，则将找到的和newStartVnodej具有相同的key的Vnode，叫vnodeToMove.elm</span>
            <span class="token comment">// 移动到oldStartVnode.elm之前</span>
            canMove <span class="token operator">&amp;&amp;</span> nodeOps<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span>parentElm<span class="token punctuation">,</span> vnodeToMove<span class="token punctuation">.</span>elm<span class="token punctuation">,</span> oldStartVnode<span class="token punctuation">.</span>elm<span class="token punctuation">)</span>

          <span class="token comment">// 如果key相同，但是节点不相同，则创建一个新的节点</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// same key but different element. treat as new element</span>
            <span class="token function">createElm</span><span class="token punctuation">(</span>newStartVnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">,</span> parentElm<span class="token punctuation">,</span> oldStartVnode<span class="token punctuation">.</span>elm<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 右移</span>
        newStartVnode <span class="token operator">=</span> newCh<span class="token punctuation">[</span><span class="token operator">++</span>newStartIdx<span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>while</code>循环主要处理了以下五种情景：</p>
<ul>
<li>当新老 <code v-pre>VNode</code> 节点的 <code v-pre>start</code> 相同时，直接 <code v-pre>patchVnode</code> ，同时新老 <code v-pre>VNode</code> 节点的开始索引都加 1</li>
<li>当新老 <code v-pre>VNode</code> 节点的 <code v-pre>end</code>相同时，同样直接 <code v-pre>patchVnode</code> ，同时新老 <code v-pre>VNode</code> 节点的结束索引都减 1</li>
<li>当老 <code v-pre>VNode</code> 节点的 <code v-pre>start</code> 和新 <code v-pre>VNode</code> 节点的 <code v-pre>end</code> 相同时，这时候在 <code v-pre>patchVnode</code> 后，还需要将当前真实 <code v-pre>dom</code> 节点移动到 <code v-pre>oldEndVnode</code> 的后面，同时老 <code v-pre>VNode</code> 节点开始索引加 1，新 <code v-pre>VNode</code> 节点的结束索引减 1</li>
<li>当老 <code v-pre>VNode</code> 节点的 <code v-pre>end</code> 和新 <code v-pre>VNode</code> 节点的 <code v-pre>start</code> 相同时，这时候在 <code v-pre>patchVnode</code> 后，还需要将当前真实 <code v-pre>dom</code> 节点移动到 <code v-pre>oldStartVnode</code> 的前面，同时老 <code v-pre>VNode</code> 节点结束索引减 1，新 <code v-pre>VNode</code> 节点的开始索引加 1</li>
<li>如果都不满足以上四种情形，那说明没有相同的节点可以复用，则会分为以下两种情况：
<ul>
<li>从旧的 <code v-pre>VNode</code> 为 <code v-pre>key</code> 值，对应 <code v-pre>index</code> 序列为 <code v-pre>value</code> 值的哈希表中找到与 <code v-pre>newStartVnode</code> 一致 <code v-pre>key</code> 的旧的 <code v-pre>VNode</code> 节点，再进行<code v-pre>patchVnode</code>，同时将这个真实 <code v-pre>dom</code>移动到 <code v-pre>oldStartVnode</code> 对应的真实 <code v-pre>dom</code> 的前面</li>
<li>调用 <code v-pre>createElm</code> 创建一个新的 <code v-pre>dom</code> 节点放到当前 <code v-pre>newStartIdx</code> 的位置</li>
</ul>
</li>
</ul>
<h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> <a href="#">#</a> 小结</h3>
<ul>
<li>当数据发生改变时，订阅者<code v-pre>watcher</code>就会调用<code v-pre>patch</code>给真实的<code v-pre>DOM</code>打补丁</li>
<li>通过<code v-pre>isSameVnode</code>进行判断，相同则调用<code v-pre>patchVnode</code>方法</li>
<li><code v-pre>patchVnode</code>做了以下操作：
<ul>
<li>找到对应的真实<code v-pre>dom</code>，称为<code v-pre>el</code></li>
<li>如果都有都有文本节点且不相等，将<code v-pre>el</code>文本节点设置为<code v-pre>Vnode</code>的文本节点</li>
<li>如果<code v-pre>oldVnode</code>有子节点而<code v-pre>VNode</code>没有，则删除<code v-pre>el</code>子节点</li>
<li>如果<code v-pre>oldVnode</code>没有子节点而<code v-pre>VNode</code>有，则将<code v-pre>VNode</code>的子节点真实化后添加到<code v-pre>el</code></li>
<li>如果两者都有子节点，则执行<code v-pre>updateChildren</code>函数比较子节点</li>
</ul>
</li>
<li><code v-pre>updateChildren</code>主要做了以下操作：
<ul>
<li>设置新旧<code v-pre>VNode</code>的头尾指针</li>
<li>新旧头尾指针进行比较，循环向中间靠拢，根据情况调用<code v-pre>patchVnode</code>进行<code v-pre>patch</code>重复流程、调用<code v-pre>createElem</code>创建一个新节点，从哈希表寻找 <code v-pre>key</code>一致的<code v-pre>VNode</code> 节点再分情况操作</li>
</ul>
</li>
</ul>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> <a href="#">#</a> 参考</h2>
<ul>
<li>https://juejin.cn/post/6881907432541552648#heading-1</li>
<li>https://www.infoq.cn/article/udlcpkh4iqb0cr5wgy7f</li>
</ul>
</div></template>


