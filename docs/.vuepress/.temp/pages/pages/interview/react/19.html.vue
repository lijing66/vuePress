<template><div><h1 id="说说你对redux的理解-其工作原理" tabindex="-1"><a class="header-anchor" href="#说说你对redux的理解-其工作原理" aria-hidden="true">#</a> 说说你对Redux的理解？其工作原理？</h1>
<p><img src="https://static.vue-js.com/52394be0-e2a5-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><code v-pre>React</code>是用于构建用户界面的，帮助我们解决渲染<code v-pre>DOM</code>的过程</p>
<p>而在整个应用中会存在很多个组件，每个组件的<code v-pre>state</code>是由自身进行管理，包括组件定义自身的<code v-pre>state</code>、组件之间的通信通过<code v-pre>props</code>传递、使用<code v-pre>Context</code>实现数据共享</p>
<p>如果让每个组件都存储自身相关的状态，理论上来讲不会影响应用的运行，但在开发及后续维护阶段，我们将花费大量精力去查询状态的变化过程</p>
<p>这种情况下，如果将所有的状态进行集中管理，当需要更新状态的时候，仅需要对这个管理集中处理，而不用去关心状态是如何分发到每一个组件内部的</p>
<p><code v-pre>redux</code>就是一个实现上述集中管理的容器，遵循三大基本原则：</p>
<ul>
<li>单一数据源</li>
<li>state 是只读的</li>
<li>使用纯函数来执行修改</li>
</ul>
<p>注意的是，<code v-pre>redux</code>并不是只应用在<code v-pre>react</code>中，还与其他界面库一起使用，如<code v-pre>Vue</code></p>
<h2 id="二、工作原理" tabindex="-1"><a class="header-anchor" href="#二、工作原理" aria-hidden="true">#</a> 二、工作原理</h2>
<p><code v-pre>redux</code>要求我们把数据都放在 <code v-pre>store</code>公共存储空间</p>
<p>一个组件改变了 <code v-pre>store</code> 里的数据内容，其他组件就能感知到 <code v-pre>store</code>的变化，再来取数据，从而间接的实现了这些数据传递的功能</p>
<p>工作流程图如下所示：</p>
<p><img src="https://static.vue-js.com/27b2e930-e56b-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>根据流程图，可以想象，<code v-pre>React Components</code> 是借书的用户， <code v-pre>Action Creactor</code> 是借书时说的话(借什么书)， <code v-pre>Store</code> 是图书馆管理员，<code v-pre>Reducer</code> 是记录本(借什么书，还什么书，在哪儿，需要查一下)， <code v-pre>state</code> 是书籍信息</p>
<p>整个流程就是借书的用户需要先存在，然后需要借书，需要一句话来描述借什么书，图书馆管理员听到后需要查一下记录本，了解图书的位置，最后图书馆管理员会把这本书给到这个借书人</p>
<p>转换为代码是，<code v-pre>React Components</code> 需要获取一些数据, 然后它就告知 <code v-pre>Store</code> 需要获取数据，这就是就是 <code v-pre>Action Creactor</code> , <code v-pre>Store</code> 接收到之后去 <code v-pre>Reducer</code> 查一下， <code v-pre>Reducer</code> 会告诉 <code v-pre>Store</code> 应该给这个组件什么数据</p>
<h2 id="三、如何使用" tabindex="-1"><a class="header-anchor" href="#三、如何使用" aria-hidden="true">#</a> 三、如何使用</h2>
<p>创建一个<code v-pre>store</code>的公共数据区域</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'redux'</span> <span class="token comment">// 引入一个第三方的方法</span>
<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 创建数据的公共存储区域（管理员）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>还需要创建一个记录本去辅助管理数据，也就是<code v-pre>reduecer</code>，本质就是一个函数，接收两个参数<code v-pre>state</code>，<code v-pre>action</code>，返回<code v-pre>state</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 设置默认值</span>
<span class="token keyword">const</span> initialState <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">counter</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">reducer</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state <span class="token operator">=</span> initialState<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就可以将记录本传递给<code v-pre>store</code>，两者建立连接。如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果想要获取<code v-pre>store</code>里面的数据，则通过<code v-pre>store.getState()</code>来获取当前<code v-pre>state</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面再看看如何更改<code v-pre>store</code>里面数据，是通过<code v-pre>dispatch</code>来派发<code v-pre>action</code>，通常<code v-pre>action</code>中都会有<code v-pre>type</code>属性，也可以携带其他的数据</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"INCREMENT"</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

store<span class="token punctuation">.</span><span class="token function">dispath</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"DECREMENT"</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"ADD_NUMBER"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">number</span><span class="token operator">:</span> <span class="token number">5</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面再来看看修改<code v-pre>reducer</code>中的处理逻辑：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">reducer</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state <span class="token operator">=</span> initialState<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">"INCREMENT"</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token operator">...</span>state<span class="token punctuation">,</span> <span class="token literal-property property">counter</span><span class="token operator">:</span> state<span class="token punctuation">.</span>counter <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">"DECREMENT"</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token operator">...</span>state<span class="token punctuation">,</span> <span class="token literal-property property">counter</span><span class="token operator">:</span> state<span class="token punctuation">.</span>counter <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">"ADD_NUMBER"</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token operator">...</span>state<span class="token punctuation">,</span> <span class="token literal-property property">counter</span><span class="token operator">:</span> state<span class="token punctuation">.</span>counter <span class="token operator">+</span> action<span class="token punctuation">.</span>number<span class="token punctuation">}</span>
    <span class="token keyword">default</span><span class="token operator">:</span> 
      <span class="token keyword">return</span> state<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code v-pre>reducer</code>是一个纯函数，不需要直接修改<code v-pre>state</code></p>
<p>这样派发<code v-pre>action</code>之后，既可以通过<code v-pre>store.subscribe</code>监听<code v-pre>store</code>的变化，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>store<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>React</code>项目中，会搭配<code v-pre>react-redux</code>进行使用</p>
<p>完整代码如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> redux <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'redux'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> initialState <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">counter</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token comment">// 创建reducer</span>
<span class="token keyword">const</span> <span class="token function-variable function">reducer</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state <span class="token operator">=</span> initialState<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">"INCREMENT"</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token operator">...</span>state<span class="token punctuation">,</span> <span class="token literal-property property">counter</span><span class="token operator">:</span> state<span class="token punctuation">.</span>counter <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">"DECREMENT"</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token operator">...</span>state<span class="token punctuation">,</span> <span class="token literal-property property">counter</span><span class="token operator">:</span> state<span class="token punctuation">.</span>counter <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">"ADD_NUMBER"</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token operator">...</span>state<span class="token punctuation">,</span> <span class="token literal-property property">counter</span><span class="token operator">:</span> state<span class="token punctuation">.</span>counter <span class="token operator">+</span> action<span class="token punctuation">.</span>number<span class="token punctuation">}</span>
    <span class="token keyword">default</span><span class="token operator">:</span> 
      <span class="token keyword">return</span> state<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 根据reducer创建store</span>
<span class="token keyword">const</span> store <span class="token operator">=</span> redux<span class="token punctuation">.</span><span class="token function">createStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">)</span><span class="token punctuation">;</span>

store<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 修改store中的state</span>
store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"INCREMENT"</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// console.log(store.getState());</span>

store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"DECREMENT"</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// console.log(store.getState());</span>

store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"ADD_NUMBER"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">number</span><span class="token operator">:</span> <span class="token number">5</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// console.log(store.getState());</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3>
<ul>
<li>createStore可以帮助创建 store</li>
<li>store.dispatch 帮助派发 action , action 会传递给 store</li>
<li>store.getState 这个方法可以帮助获取 store 里边所有的数据内容</li>
<li>store.subscrible 方法订阅 store 的改变，只要 store 发生改变， store.subscrible 这个函数接收的这个回调函数就会被执行</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<p>redux 是“道”,</p>
<ul>
<li>
<p>自己玩 context</p>
</li>
<li>
<p>unstated</p>
</li>
<li>
<p>dva / mobx(双向的，例如表单) / redux (undo功能的，富文本) dva, redux toolkit, rematch,</p>
</li>
<li>
<p>https://cn.redux.js.org/docs/introduction/</p>
</li>
<li>
<p>https://www.redux.org.cn/docs/basics/Actions.html</p>
</li>
<li>
<p>https://lulujianglab.com/posts/大白话解析 Redux 、 redux-thunk 、redux-saga 和 react-redux</p>
</li>
</ul>
</div></template>


