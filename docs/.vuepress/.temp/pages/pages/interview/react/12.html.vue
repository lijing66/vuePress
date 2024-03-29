<template><div><h1 id="react-refs-的理解" tabindex="-1"><a class="header-anchor" href="#react-refs-的理解" aria-hidden="true">#</a> React refs 的理解</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><code v-pre>Refs</code> 在计算机中称为弹性文件系统（英语：Resilient File System，简称ReFS）</p>
<p><code v-pre>React</code> 中的 <code v-pre>Refs</code>提供了一种方式，允许我们访问 <code v-pre>DOM</code>节点或在 <code v-pre>render</code>方法中创建的 <code v-pre>React</code>元素</p>
<p>本质为<code v-pre>ReactDOM.render()</code>返回的组件实例，如果是渲染组件则返回的是组件实例，如果渲染<code v-pre>dom</code>则返回的是具体的<code v-pre>dom</code>节点</p>
<h2 id="二、如何使用" tabindex="-1"><a class="header-anchor" href="#二、如何使用" aria-hidden="true">#</a> 二、如何使用</h2>
<p>创建<code v-pre>ref</code>的形式有三种：</p>
<ul>
<li>传入字符串，使用时通过 this.refs.传入的字符串的格式获取对应的元素</li>
<li>传入对象，对象是通过 React.createRef() 方式创建出来，使用时获取到创建的对象中存在 current 属性就是对应的元素</li>
<li>传入函数，该函数会在 DOM 被挂载时进行回调，这个函数会传入一个 元素对象，可以自己保存，使用时，直接拿到之前保存的元素对象即可</li>
<li>传入hook，hook是通过 useRef() 方式创建，使用时通过生成hook对象的 current 属性就是对应的元素</li>
</ul>
<h3 id="传入字符串" tabindex="-1"><a class="header-anchor" href="#传入字符串" aria-hidden="true">#</a> 传入字符串</h3>
<p>只需要在对应元素或组件中<code v-pre>ref</code>属性</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>myRef <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>div ref<span class="token operator">=</span><span class="token string">"myref"</span> <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问当前节点的方式如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>refs<span class="token punctuation">.</span>myref<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">"hello"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="传入对象" tabindex="-1"><a class="header-anchor" href="#传入对象" aria-hidden="true">#</a> 传入对象</h3>
<p><code v-pre>refs</code>通过<code v-pre>React.createRef()</code>创建，然后将<code v-pre>ref</code>属性添加到<code v-pre>React</code>元素中，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>myRef <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>div ref<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>myRef<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 <code v-pre>ref</code> 被传递给 <code v-pre>render</code> 中的元素时，对该节点的引用可以在 <code v-pre>ref</code> 的 <code v-pre>current</code> 属性中访问</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>myRef<span class="token punctuation">.</span>current<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="传入函数" tabindex="-1"><a class="header-anchor" href="#传入函数" aria-hidden="true">#</a> 传入函数</h3>
<p>当<code v-pre>ref</code>传入为一个函数的时候，在渲染过程中，回调函数参数会传入一个元素对象，然后通过实例将对象进行保存</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>myRef <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>div ref<span class="token operator">=</span><span class="token punctuation">{</span><span class="token parameter">element</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>myref <span class="token operator">=</span> element<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>获取<code v-pre>ref</code>对象只需要通过先前存储的对象即可</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>myref 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="传入hook" tabindex="-1"><a class="header-anchor" href="#传入hook" aria-hidden="true">#</a> 传入hook</h3>
<p>通过<code v-pre>useRef</code>创建一个<code v-pre>ref</code>，整体使用方式与<code v-pre>React.createRef</code>一致</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> myref <span class="token operator">=</span> <span class="token function">useRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span><span class="token operator">></span>
      <span class="token operator">&lt;</span>div ref<span class="token operator">=</span><span class="token punctuation">{</span>myref<span class="token punctuation">}</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span><span class="token operator">></span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>获取<code v-pre>ref</code>属性也是通过<code v-pre>hook</code>对象的<code v-pre>current</code>属性</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> node <span class="token operator">=</span> myref<span class="token punctuation">.</span>current<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述三种情况都是<code v-pre>ref</code>属性用于原生<code v-pre>HTML</code>元素上，如果<code v-pre>ref</code>设置的组件为一个类组件的时候，<code v-pre>ref</code>对象接收到的是组件的挂载实例</p>
<p>注意的是，不能在函数组件上使用<code v-pre>ref</code>属性，因为他们并没有实例</p>
<h2 id="三、应用场景" tabindex="-1"><a class="header-anchor" href="#三、应用场景" aria-hidden="true">#</a> 三、应用场景</h2>
<p>在某些情况下，我们会通过使用<code v-pre>refs</code>来更新组件，但这种方式并不推荐，更多情况我们是通过<code v-pre>props</code>与<code v-pre>state</code>的方式进行去重新渲染子元素</p>
<p>过多使用<code v-pre>refs</code>，会使组件的实例或者是<code v-pre>DOM</code>结构暴露，违反组件封装的原则</p>
<p>例如，避免在 <code v-pre>Dialog</code> 组件里暴露 <code v-pre>open()</code> 和 <code v-pre>close()</code> 方法，最好传递 <code v-pre>isOpen</code> 属性</p>
<p>但下面的场景使用<code v-pre>refs</code>非常有用：</p>
<ul>
<li>对Dom元素的焦点控制、内容选择、控制</li>
<li>对Dom元素的内容设置及媒体播放</li>
<li>对Dom元素的操作和对组件实例的操作</li>
<li>集成第三方 DOM 库</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zh-hans.reactjs.org/docs/refs-and-the-dom.html</li>
<li>https://segmentfault.com/a/1190000020842342</li>
</ul>
</div></template>


