<template><div><h1 id="react-diff的原理是什么" tabindex="-1"><a class="header-anchor" href="#react-diff的原理是什么" aria-hidden="true">#</a> React diff的原理是什么？</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>跟<code v-pre>Vue</code>一致，<code v-pre>React</code>通过引入<code v-pre>Virtual DOM</code>的概念，极大地避免无效的<code v-pre>Dom</code>操作，使我们的页面的构建效率提到了极大的提升</p>
<p>而<code v-pre>diff</code>算法就是更高效地通过对比新旧<code v-pre>Virtual DOM</code>来找出真正的<code v-pre>Dom</code>变化之处</p>
<p>传统diff算法通过循环递归对节点进行依次对比，效率低下，算法复杂度达到 O(n^3)，<code v-pre>react</code>将算法进行一个优化，复杂度姜维<code v-pre>O(n)</code>，两者效率差距如下图：</p>
<p><img src="https://static.vue-js.com/a43c9960-ec91-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="二、原理" tabindex="-1"><a class="header-anchor" href="#二、原理" aria-hidden="true">#</a> 二、原理</h2>
<p><code v-pre>react</code>中<code v-pre>diff</code>算法主要遵循三个层级的策略：</p>
<ul>
<li>
<p>tree层级</p>
</li>
<li>
<p>conponent 层级</p>
</li>
<li>
<p>element 层级</p>
</li>
</ul>
<h3 id="tree层级" tabindex="-1"><a class="header-anchor" href="#tree层级" aria-hidden="true">#</a> tree层级</h3>
<p><code v-pre>DOM</code>节点跨层级的操作不做优化，只会对相同层级的节点进行比较</p>
<p><img src="https://static.vue-js.com/ae71d1c0-ec91-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>只有删除、创建操作，没有移动操作，如下图：</p>
<p><img src="https://static.vue-js.com/b85f2bb0-ec91-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p><code v-pre>react</code>发现新树中，R节点下没有了A，那么直接删除A，在D节点下创建A以及下属节点</p>
<p>上述操作中，只有删除和创建操作</p>
<h3 id="conponent层级" tabindex="-1"><a class="header-anchor" href="#conponent层级" aria-hidden="true">#</a> conponent层级</h3>
<p>如果是同一个类的组件，则会继续往下<code v-pre>diff</code>运算，如果不是一个类的组件，那么直接删除这个组件下的所有子节点，创建新的</p>
<p><img src="https://static.vue-js.com/c1fcdf00-ec91-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>当<code v-pre>component D</code>换成了<code v-pre>component G</code> 后，即使两者的结构非常类似，也会将<code v-pre>D</code>删除再重新创建<code v-pre>G</code></p>
<h3 id="element层级" tabindex="-1"><a class="header-anchor" href="#element层级" aria-hidden="true">#</a> element层级</h3>
<p>对于比较同一层级的节点们，每个节点在对应的层级用唯一的<code v-pre>key</code>作为标识</p>
<p>提供了 3 种节点操作，分别为 <code v-pre>INSERT_MARKUP</code>(插入)、<code v-pre>MOVE_EXISTING</code> (移动)和 <code v-pre>REMOVE_NODE</code> (删除)</p>
<p>如下场景：</p>
<p><img src="https://static.vue-js.com/cae1c9a0-ec91-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>通过<code v-pre>key</code>可以准确地发现新旧集合中的节点都是相同的节点，因此无需进行节点删除和创建，只需要将旧集合中节点的位置进行移动，更新为新集合中节点的位置</p>
<p>流程如下表：</p>
<p><img src="https://static.vue-js.com/d34c5420-ec91-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<ul>
<li>index： 新集合的遍历下标。</li>
<li>oldIndex：当前节点在老集合中的下标</li>
<li>maxIndex：在新集合访问过的节点中，其在老集合的最大下标</li>
</ul>
<p>如果当前节点在新集合中的位置比老集合中的位置靠前的话，是不会影响后续节点操作的，这里这时候被动字节不用动</p>
<p>操作过程中只比较oldIndex和maxIndex，规则如下：</p>
<ul>
<li>当oldIndex&gt;maxIndex时，将oldIndex的值赋值给maxIndex</li>
<li>当oldIndex=maxIndex时，不操作</li>
<li>当oldIndex&lt;maxIndex时，将当前节点移动到index的位置</li>
</ul>
<p><code v-pre>diff</code>过程如下：</p>
<ul>
<li>节点B：此时 maxIndex=0，oldIndex=1；满足 maxIndex&lt; oldIndex，因此B节点不动，此时maxIndex= Math.max(oldIndex, maxIndex)，就是1</li>
<li>节点A：此时maxIndex=1，oldIndex=0；不满足maxIndex&lt; oldIndex，因此A节点进行移动操作，此时maxIndex= Math.max(oldIndex, maxIndex)，还是1</li>
<li>节点D：此时maxIndex=1, oldIndex=3；满足maxIndex&lt; oldIndex，因此D节点不动，此时maxIndex= Math.max(oldIndex, maxIndex)，就是3</li>
<li>节点C：此时maxIndex=3，oldIndex=2；不满足maxIndex&lt; oldIndex，因此C节点进行移动操作，当前已经比较完了</li>
</ul>
<p>当ABCD节点比较完成后，<code v-pre>diff</code>过程还没完，还会整体遍历老集合中节点，看有没有没用到的节点，有的话，就删除</p>
<h2 id="三、注意事项" tabindex="-1"><a class="header-anchor" href="#三、注意事项" aria-hidden="true">#</a> 三、注意事项</h2>
<p>对于简单列表渲染而言，不使用<code v-pre>key</code>比使用<code v-pre>key</code>的性能，例如：</p>
<p>将一个[1,2,3,4,5]，渲染成如下的样子：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">3</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">4</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">5</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后续更改成[1,3,2,5,4]，使用<code v-pre>key</code>与不使用<code v-pre>key</code>作用如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'1'</span><span class="token operator">></span><span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>             <span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'1'</span><span class="token operator">></span><span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>     
<span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'2'</span><span class="token operator">></span><span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>             <span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'3'</span><span class="token operator">></span><span class="token number">3</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  
<span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'3'</span><span class="token operator">></span><span class="token number">3</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  <span class="token operator">===</span><span class="token operator">===</span><span class="token operator">==</span><span class="token operator">></span>  <span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'2'</span><span class="token operator">></span><span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  
<span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'4'</span><span class="token operator">></span><span class="token number">4</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>             <span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'5'</span><span class="token operator">></span><span class="token number">5</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  
<span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'5'</span><span class="token operator">></span><span class="token number">5</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>             <span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'4'</span><span class="token operator">></span><span class="token number">4</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  
操作：节点<span class="token number">2</span>移动至下标为<span class="token number">2</span>的位置，节点<span class="token number">4</span>移动至下标为<span class="token number">4</span>的位置。

<span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>             <span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>     
<span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>             <span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">3</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  
<span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">3</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  <span class="token operator">===</span><span class="token operator">===</span><span class="token operator">==</span><span class="token operator">></span>  <span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  
<span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">4</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>             <span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">5</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  
<span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">5</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>             <span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">4</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  
操作：修改第<span class="token number">1</span>个到第<span class="token number">5</span>个节点的innerText
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们对这个集合进行增删的操作改成[1,3,2,5,6]</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'1'</span><span class="token operator">></span><span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>             <span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'1'</span><span class="token operator">></span><span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>     
<span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'2'</span><span class="token operator">></span><span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>             <span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'3'</span><span class="token operator">></span><span class="token number">3</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  
<span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'3'</span><span class="token operator">></span><span class="token number">3</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  <span class="token operator">===</span><span class="token operator">===</span><span class="token operator">==</span><span class="token operator">></span>  <span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'2'</span><span class="token operator">></span><span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  
<span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'4'</span><span class="token operator">></span><span class="token number">4</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>             <span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'5'</span><span class="token operator">></span><span class="token number">5</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  
<span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'5'</span><span class="token operator">></span><span class="token number">5</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>             <span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token string">'6'</span><span class="token operator">></span><span class="token number">6</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  
操作：节点<span class="token number">2</span>移动至下标为<span class="token number">2</span>的位置，新增节点<span class="token number">6</span>至下标为<span class="token number">4</span>的位置，删除节点<span class="token number">4</span>。

<span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>             <span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>     
<span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>             <span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">3</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  
<span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">3</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  <span class="token operator">===</span><span class="token operator">===</span><span class="token operator">==</span><span class="token operator">></span>  <span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  
<span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">4</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>             <span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">5</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>  
<span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">5</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>             <span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token number">6</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span> 
操作：修改第<span class="token number">1</span>个到第<span class="token number">5</span>个节点的innerText
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于<code v-pre>dom</code>节点的移动操作开销是比较昂贵的，没有<code v-pre>key</code>的情况下要比有<code v-pre>key</code>的性能更好</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>
<p>https://zhuanlan.zhihu.com/p/140489744</p>
</li>
<li>
<p>https://zhuanlan.zhihu.com/p/20346379</p>
</li>
</ul>
</div></template>


