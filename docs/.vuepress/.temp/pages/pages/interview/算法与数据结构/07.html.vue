<template><div><h1 id="树及相关操作" tabindex="-1"><a class="header-anchor" href="#树及相关操作" aria-hidden="true">#</a> 树及相关操作</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>在计算机领域，树形数据结构是一类重要的非线性数据结构，可以表示数据之间一对多的关系。以树与二叉树最为常用，直观看来，树是以分支关系定义的层次结构</p>
<p>二叉树满足以下两个条件：</p>
<ul>
<li>本身是有序树</li>
<li>树中包含的各个结点的不能超过 2，即只能是 0、1 或者 2</li>
</ul>
<p>如下图，左侧的为二叉树，而右侧的因为头结点的子结点超过2，因此不属于二叉树：</p>
<p><img src="https://static.vue-js.com/66758800-1dfe-11ec-a752-75723a64e8f5.png" alt=""></p>
<p>同时，二叉树可以继续进行分类，分成了满二叉树和完成二叉树：</p>
<ul>
<li>满二叉树：如果二叉树中除了叶子结点，每个结点的度都为 2</li>
</ul>
<p><img src="https://static.vue-js.com/759db050-1dfe-11ec-a752-75723a64e8f5.png" alt=""></p>
<ul>
<li>完成二叉树：如果二叉树中除去最后一层节点为满二叉树，且最后一层的结点依次从左到右分布</li>
</ul>
<p><img src="https://static.vue-js.com/84ae31f0-1dfe-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<h2 id="二、操作" tabindex="-1"><a class="header-anchor" href="#二、操作" aria-hidden="true">#</a> 二、操作</h2>
<p>关于二叉树的遍历，常见的有：</p>
<ul>
<li>
<p>前序遍历</p>
</li>
<li>
<p>中序遍历</p>
</li>
<li>
<p>后序遍历</p>
</li>
<li>
<p>层序遍历</p>
</li>
</ul>
<h3 id="前序遍历" tabindex="-1"><a class="header-anchor" href="#前序遍历" aria-hidden="true">#</a> 前序遍历</h3>
<p>前序遍历的实现思想是：</p>
<ul>
<li>访问根节点</li>
<li>访问当前节点的左子树</li>
<li>若当前节点无左子树，则访问当前节点的右子</li>
</ul>
<p>根据遍历特性，递归版本用代码表示则如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">preOrder</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span>
  <span class="token function">preOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
  <span class="token function">preOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果不使用递归版本，可以借助栈先进后出的特性实现，先将根节点压入栈，再分别压入右节点和左节点，直到栈中没有元素，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">preOrder</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span>
  <span class="token keyword">const</span> stack <span class="token operator">=</span> <span class="token punctuation">[</span>root<span class="token punctuation">]</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>stack<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> n <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n<span class="token punctuation">.</span>right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n<span class="token punctuation">.</span>left<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="中序遍历" tabindex="-1"><a class="header-anchor" href="#中序遍历" aria-hidden="true">#</a> 中序遍历</h3>
<p>前序遍历的实现思想是：</p>
<ul>
<li>访问当前节点的左子树</li>
<li>访问根节点</li>
<li>访问当前节点的右子</li>
</ul>
<p>递归版本很好理解，用代码表示则如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">inOrder</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span>
  <span class="token function">inOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
  <span class="token function">inOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>非递归版本也是借助栈先进后出的特性，可以一直首先一直压入节点的左元素，当左节点没有后，才开始进行出栈操作，压入右节点，然后有依次压入左节点，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">inOrder</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span>
  <span class="token keyword">const</span> stack <span class="token operator">=</span> <span class="token punctuation">[</span>root<span class="token punctuation">]</span>
  <span class="token keyword">let</span> p <span class="token operator">=</span> root
  <span class="token keyword">while</span><span class="token punctuation">(</span>stack<span class="token punctuation">.</span>length <span class="token operator">||</span> p<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>p<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
      p <span class="token operator">=</span> p<span class="token punctuation">.</span>left
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> n <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
    p <span class="token operator">=</span> n<span class="token punctuation">.</span>right
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="后序遍历" tabindex="-1"><a class="header-anchor" href="#后序遍历" aria-hidden="true">#</a> 后序遍历</h3>
<p>前序遍历的实现思想是：</p>
<ul>
<li>访问当前节点的左子树</li>
<li>访问当前节点的右子</li>
<li>访问根节点</li>
</ul>
<p>递归版本，用代码表示则如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">postOrder</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span>
  <span class="token function">postOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
  <span class="token function">postOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后序遍历非递归版本实际根全序遍历是逆序关系，可以再多创建一个栈用来进行输出，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">preOrder</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span>
  <span class="token keyword">const</span> stack <span class="token operator">=</span> <span class="token punctuation">[</span>root<span class="token punctuation">]</span>
  <span class="token keyword">const</span> outPut <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>stack<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> n <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    outPut<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n<span class="token punctuation">.</span>right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n<span class="token punctuation">.</span>left<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>outPut<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> n <span class="token operator">=</span> outPut<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="层序遍历" tabindex="-1"><a class="header-anchor" href="#层序遍历" aria-hidden="true">#</a> 层序遍历</h3>
<p>按照二叉树中的层次从左到右依次遍历每层中的结点</p>
<p>借助队列先进先出的特性，从树的根结点开始，依次将其左孩子和右孩子入队。而后每次队列中一个结点出队，都将其左孩子和右孩子入队，直到树中所有结点都出队，出队结点的先后顺序就是层次遍历的最终结果</p>
<p>用代码表示则如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">levelOrder</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>
    <span class="token keyword">const</span> queue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span>root<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
    <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>queue<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> n <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">const</span> <span class="token punctuation">[</span>node<span class="token punctuation">,</span> leval<span class="token punctuation">]</span> <span class="token operator">=</span> n
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>res<span class="token punctuation">[</span>leval<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            res<span class="token punctuation">[</span>leval<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>node<span class="token punctuation">.</span>val<span class="token punctuation">]</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            res<span class="token punctuation">[</span>leval<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span> <span class="token punctuation">{</span> queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span>node<span class="token punctuation">.</span>left<span class="token punctuation">,</span> leval <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span> <span class="token punctuation">{</span> queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span>node<span class="token punctuation">.</span>right<span class="token punctuation">,</span> leval <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> res
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p>树是一个非常重要的非线性结构，其中二叉树以二叉树最常见，二叉树的遍历方式可以分成前序遍历、中序遍历、后序遍历</p>
<p>同时，二叉树又分成了完成二叉树和满二叉树</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://baike.baidu.com/item/%E4%BA%8C%E5%8F%89%E6%A0%91</li>
<li>http://data.biancheng.net/view/27.html</li>
</ul>
</div></template>


