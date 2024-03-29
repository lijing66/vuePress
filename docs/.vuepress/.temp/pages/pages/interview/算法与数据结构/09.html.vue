<template><div><h1 id="说说你对图的理解-相关操作有哪些" tabindex="-1"><a class="header-anchor" href="#说说你对图的理解-相关操作有哪些" aria-hidden="true">#</a> 说说你对图的理解？相关操作有哪些？</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>在计算机科学中，图是一种抽象的数据类型，在图中的数据元素通常称为结点，<code v-pre>V</code>是所有顶点的集合，<code v-pre>E</code>是所有边的集合</p>
<p>如果两个顶点<code v-pre>v</code>,<code v-pre>w</code>，只能由<code v-pre>v</code>向<code v-pre>w</code>，而不能由<code v-pre>w</code>向<code v-pre>v</code>，那么我们就把这种情况叫做一个从 <code v-pre>v</code> 到 <code v-pre>w</code> 的有向边。<code v-pre>v</code>也被称做初始点，<code v-pre>w</code>也被称为终点。这种图就被称做有向图</p>
<p>如果<code v-pre>v</code>和<code v-pre>w</code>是没有顺序的，从<code v-pre>v</code>到达<code v-pre>w</code>和从<code v-pre>w</code>到达<code v-pre>v</code>是完全相同的，这种图就被称为无向图</p>
<p>图的结构比较复杂，任意两个顶点之间都可能存在联系，因此无法以数据元素在存储区中的物理位置来表示元素之间的关系</p>
<p>常见表达图的方式有如下：</p>
<ul>
<li>
<p>邻接矩阵</p>
</li>
<li>
<p>邻接表</p>
</li>
</ul>
<h3 id="邻接矩阵" tabindex="-1"><a class="header-anchor" href="#邻接矩阵" aria-hidden="true">#</a> 邻接矩阵</h3>
<p>通过使用一个二维数组<code v-pre>G[N][N]</code>进行表示<code v-pre>N</code>个点到<code v-pre>N-1</code>编号，通过邻接矩阵可以立刻看出两顶点之间是否存在一条边，只需要检查邻接矩阵行<code v-pre>i</code>和列<code v-pre>j</code>是否是非零值，对于无向图，邻接矩阵是对称的</p>
<p><img src="https://static.vue-js.com/881d4300-2059-11ec-a752-75723a64e8f5.png" alt=""></p>
<h3 id="邻接表" tabindex="-1"><a class="header-anchor" href="#邻接表" aria-hidden="true">#</a> 邻接表</h3>
<p>存储方式如下图所示：</p>
<p><img src="https://static.vue-js.com/949fedd0-2059-11ec-a752-75723a64e8f5.png" alt=""></p>
<p>在<code v-pre>javascript</code>中，可以使用<code v-pre>Object</code>进行表示，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> graph <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token constant">A</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token constant">B</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token constant">C</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token constant">D</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token constant">E</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token constant">F</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token constant">G</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>图的数据结构还可能包含和每条边相关联的数值（edge value），例如一个标号或一个数值（即权重，weight；表示花费、容量、长度等）</p>
<h2 id="二、操作" tabindex="-1"><a class="header-anchor" href="#二、操作" aria-hidden="true">#</a> 二、操作</h2>
<p>关于的图的操作常见的有：</p>
<ul>
<li>深度优先遍历</li>
<li>广度优先遍历</li>
</ul>
<p>首先构建一个图的邻接矩阵表示，如下面的图：</p>
<p><img src="https://static.vue-js.com/a1311790-2059-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>用代码表示则如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> graph <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token number">0</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token number">3</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token number">4</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="深度优先遍历" tabindex="-1"><a class="header-anchor" href="#深度优先遍历" aria-hidden="true">#</a> 深度优先遍历</h3>
<p>也就是尽可能的往深处的搜索图的分支</p>
<p>实现思路是，首先应该确定一个根节点，然后对根节点的没访问过的相邻节点进行深度优先遍历</p>
<p>确定以 0 为根节点，然后进行深度遍历，然后遍历1，接着遍历 2，然后3，此时完成一条分支<code v-pre>0 - 1- 2- 3</code>的遍历，换一条分支，也就是4，4后面因为3已经遍历过了，所以就不访问了</p>
<p>用代码表示则如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> visited <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token function-variable function">dfs</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
  visited<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token comment">// 访问过添加记录</span>
  graph<span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">c</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>visited<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">// 判断是否访问呢过</span>
      <span class="token function">dfs</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="广度优先遍历" tabindex="-1"><a class="header-anchor" href="#广度优先遍历" aria-hidden="true">#</a> 广度优先遍历</h3>
<p>先访问离根节点最近的节点，然后进行入队操作，解决思路如下：</p>
<ul>
<li>新建一个队列，把根节点入队</li>
<li>把队头出队并访问</li>
<li>把队头的没访问过的相邻节点入队</li>
<li>重复二、三步骤，知道队列为空</li>
</ul>
<p>用代码标识则如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> visited <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token function-variable function">dfs</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  visited<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
  <span class="token keyword">const</span> q <span class="token operator">=</span> <span class="token punctuation">[</span>n<span class="token punctuation">]</span>
  <span class="token keyword">while</span><span class="token punctuation">(</span>q<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> n <span class="token operator">=</span> q<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
    graph<span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">c</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>visited<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        q<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>  
        visited<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p>通过上面的初步了解，可以看到图就是由顶点的有穷非空集合和顶点之间的边组成的集合，分成了无向图与有向图</p>
<p>图的表达形式可以分成邻接矩阵和邻接表两种形式，在<code v-pre>javascript</code>中，则可以通过二维数组和对象的形式进行表达</p>
<p>图实际是很复杂的，后续还可以延伸出无向图和带权图，对应如下图所示：</p>
<p><img src="https://static.vue-js.com/b0d88200-2059-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zh.wikipedia.org/wiki/%E5%9B%BE_(%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)</li>
<li>https://www.kancloud.cn/imnotdown1019/java_core_full/2159607</li>
</ul>
</div></template>


