<template><div><h1 id="说说你对堆的理解-如何实现-应用场景" tabindex="-1"><a class="header-anchor" href="#说说你对堆的理解-如何实现-应用场景" aria-hidden="true">#</a> 说说你对堆的理解？如何实现？应用场景？</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>堆(Heap)是计算机科学中一类特殊的数据结构的统称</p>
<p>堆通常是一个可以被看做一棵完全二叉树的数组对象，如下图：</p>
<p><img src="https://static.vue-js.com/ea0fd1f0-1ed7-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>总是满足下列性质：</p>
<ul>
<li>堆中某个结点的值总是不大于或不小于其父结点的值</li>
<li>堆总是一棵完全二叉树</li>
</ul>
<p>堆又可以分成最大堆和最小堆：</p>
<ul>
<li>最大堆：每个根结点，都有根结点的值大于两个孩子结点的值</li>
<li>最小堆：每个根结点，都有根结点的值小于孩子结点的值</li>
</ul>
<h2 id="二、操作" tabindex="-1"><a class="header-anchor" href="#二、操作" aria-hidden="true">#</a> 二、操作</h2>
<p>堆的元素存储方式，按照完全二叉树的顺序存储方式存储在一个一维数组中，如下图：</p>
<p><img src="https://static.vue-js.com/ea0fd1f0-1ed7-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>用一维数组存储则如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>根据完全二叉树的特性，可以得到如下特性：</p>
<ul>
<li>数组零坐标代码的是堆顶元素</li>
<li>一个节点的父亲节点的坐标等于其坐标除以2整数部分</li>
<li>一个节点的左节点等于其本身节点坐标 * 2 + 1</li>
<li>一个节点的右节点等于其本身节点坐标 * 2 + 2</li>
</ul>
<p>根据上述堆的特性，下面构建最小堆的构造函数和对应的属性方法：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MinHeap</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 存储堆元素</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>heap <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 获取父元素坐标</span>
  <span class="token function">getParentIndex</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">1</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 获取左节点元素坐标</span>
  <span class="token function">getLeftIndex</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> i <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span>
  <span class="token punctuation">}</span>

 <span class="token comment">// 获取右节点元素坐标</span>
  <span class="token function">getRightIndex</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> i <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">2</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 交换元素</span>
  <span class="token function">swap</span><span class="token punctuation">(</span><span class="token parameter">i1<span class="token punctuation">,</span> i2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> temp <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>heap<span class="token punctuation">[</span>i1<span class="token punctuation">]</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>heap<span class="token punctuation">[</span>i1<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>heap<span class="token punctuation">[</span>i2<span class="token punctuation">]</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>heap<span class="token punctuation">[</span>i2<span class="token punctuation">]</span> <span class="token operator">=</span> temp
  <span class="token punctuation">}</span>

  <span class="token comment">// 查看堆顶元素</span>
  <span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>heap<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 获取堆元素的大小</span>
  <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>heap<span class="token punctuation">.</span>length
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>涉及到堆的操作有：</p>
<ul>
<li>插入</li>
<li>删除</li>
</ul>
<h3 id="插入" tabindex="-1"><a class="header-anchor" href="#插入" aria-hidden="true">#</a> 插入</h3>
<p>将值插入堆的底部，即数组的尾部，当插入一个新的元素之后，堆的结构就会被破坏，因此需要堆中一个元素做上移操作</p>
<p>将这个值和它父节点进行交换，直到父节点小于等于这个插入的值，大小为<code v-pre>k</code>的堆中插入元素的时间复杂度为<code v-pre>O(logk)</code></p>
<p>如下图所示，22节点是新插入的元素，然后进行上移操作：</p>
<p><img src="https://static.vue-js.com/06893fb0-1ed8-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>相关代码如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 插入元素</span>
<span class="token function">insert</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>heap<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">shifUp</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>heap<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 上移操作</span>
<span class="token function">shiftUp</span><span class="token punctuation">(</span><span class="token parameter">index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span>
  <span class="token keyword">const</span> parentIndex <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getParentIndex</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>heap<span class="token punctuation">[</span>parentIndex<span class="token punctuation">]</span> <span class="token operator">></span> <span class="token keyword">this</span><span class="token punctuation">.</span>heap<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">swap</span><span class="token punctuation">(</span>parentIndex<span class="token punctuation">,</span> index<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">shiftUp</span><span class="token punctuation">(</span>parentIndex<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除" tabindex="-1"><a class="header-anchor" href="#删除" aria-hidden="true">#</a> 删除</h3>
<p>常见操作是用数组尾部元素替换堆顶，这里不直接删除堆顶，因为所有的元素会向前移动一位，会破坏了堆的结构</p>
<p>然后进行下移操作，将新的堆顶和它的子节点进行交换，直到子节点大于等于这个新的堆顶，删除堆顶的时间复杂度为<code v-pre>O(logk)</code></p>
<p>整体如下图操作：</p>
<p><img src="https://static.vue-js.com/12a2a160-1ed8-11ec-a752-75723a64e8f5.png" alt=""></p>
<p>相关代码如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 删除元素</span>
<span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>heap<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>heap<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">shiftDown</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 下移操作</span>
<span class="token function">shiftDown</span><span class="token punctuation">(</span><span class="token parameter">index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> leftIndex <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getLeftIndex</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span>
  <span class="token keyword">const</span> rightIndex <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getRightIndex</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>heap<span class="token punctuation">[</span>leftIndex<span class="token punctuation">]</span> <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>heap<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">swap</span><span class="token punctuation">(</span>leftIndex<span class="token punctuation">,</span> index<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">shiftDown</span><span class="token punctuation">(</span>leftIndex<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>heap<span class="token punctuation">[</span>rightIndex<span class="token punctuation">]</span> <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>heap<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">swap</span><span class="token punctuation">(</span>rightIndex<span class="token punctuation">,</span> index<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">shiftDown</span><span class="token punctuation">(</span>rightIndex<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="时间复杂度" tabindex="-1"><a class="header-anchor" href="#时间复杂度" aria-hidden="true">#</a> 时间复杂度</h3>
<p>关于堆的插入和删除时间复杂度都是<code v-pre>Olog(n)</code>，原因在于包含n个节点的完全二叉树，树的高度不会超过<code v-pre>log2n</code></p>
<p>堆化的过程是顺着节点所在路径比较交换的，所以堆化的时间复杂度跟树的高度成正比，也就是<code v-pre>Olog(n)</code>，插入数据和删除堆顶元素的主要逻辑就是堆化</p>
<h3 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h3>
<ul>
<li>堆是一个完全二叉树</li>
<li>堆中每一个节点的值都必须大于等于(或小于等于)其子树中每个节点的值</li>
<li>对于每个节点的值都大于等于子树中每个节点值的堆，叫作“大顶堆”</li>
<li>对于每个节点的值都小于等于子树中每个节点值的堆，叫作“小顶堆”</li>
<li>根据堆的特性，我们可以使用堆来进行排序操作，也可以使用其来求第几大或者第几小的值</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://baike.baidu.com/item/%E5%A0%86/20606834</li>
<li>https://xlbpowder.cn/2021/02/26/%E5%A0%86%E5%92%8C%E5%A0%86%E6%8E%92%E5%BA%8F/</li>
</ul>
</div></template>


