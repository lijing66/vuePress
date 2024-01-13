<template><div><h1 id="说说react-render方法的原理-在什么时候会被触发" tabindex="-1"><a class="header-anchor" href="#说说react-render方法的原理-在什么时候会被触发" aria-hidden="true">#</a> 说说React render方法的原理？在什么时候会被触发？</h1>
<p><img src="https://static.vue-js.com/3d855230-ec6d-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="一、原理" tabindex="-1"><a class="header-anchor" href="#一、原理" aria-hidden="true">#</a> 一、原理</h2>
<p>首先，<code v-pre>render</code>函数在<code v-pre>react</code>中有两种形式：</p>
<p>在类组件中，指的是<code v-pre>render</code>方法：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Foo</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token operator">&lt;</span>h1<span class="token operator">></span> Foo <span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在函数组件中，指的是函数组件本身：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>h1<span class="token operator">></span> Foo <span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>render</code>中，我们会编写<code v-pre>jsx</code>，<code v-pre>jsx</code>通过<code v-pre>babel</code>编译后就会转化成我们熟悉的<code v-pre>js</code>格式，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">return</span> <span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">'cn'</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>Header<span class="token operator">></span> hello <span class="token operator">&lt;</span><span class="token operator">/</span>Header<span class="token operator">></span>
    <span class="token operator">&lt;</span>div<span class="token operator">></span> start <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
    Right Reserve
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>babel</code>编译后：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">return</span> <span class="token punctuation">(</span>
  React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>
    <span class="token string">'div'</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">className</span> <span class="token operator">:</span> <span class="token string">'cn'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>
      Header<span class="token punctuation">,</span>
      <span class="token keyword">null</span><span class="token punctuation">,</span>
      <span class="token string">'hello'</span>
    <span class="token punctuation">)</span><span class="token punctuation">,</span>
    React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>
      <span class="token string">'div'</span><span class="token punctuation">,</span>
      <span class="token keyword">null</span><span class="token punctuation">,</span>
      <span class="token string">'start'</span>
    <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string">'Right Reserve'</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从名字上来看，<code v-pre>createElement</code>方法用来元素的</p>
<p>在<code v-pre>react</code>中，这个元素就是虚拟<code v-pre>DOM</code>树的节点，接收三个参数：</p>
<ul>
<li>
<p>type：标签</p>
</li>
<li>
<p>attributes：标签属性，若无则为null</p>
</li>
<li>
<p>children：标签的子节点</p>
</li>
</ul>
<p>这些虚拟<code v-pre>DOM</code>树最终会渲染成真实<code v-pre>DOM</code></p>
<p>在<code v-pre>render</code>过程中，<code v-pre>React</code> 将新调用的 <code v-pre>render</code>函数返回的树与旧版本的树进行比较，这一步是决定如何更新 <code v-pre>DOM</code> 的必要步骤，然后进行 <code v-pre>diff</code> 比较，更新 <code v-pre>DOM</code>树</p>
<h2 id="二、触发时机" tabindex="-1"><a class="header-anchor" href="#二、触发时机" aria-hidden="true">#</a> 二、触发时机</h2>
<p><code v-pre>render</code>的执行时机主要分成了两部分：</p>
<ul>
<li>类组件调用 setState 修改状态</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Foo</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  state <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token function-variable function">increment</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> count <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">;</span>

    <span class="token keyword">const</span> newCount <span class="token operator">=</span> count <span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token operator">?</span> count <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">:</span> count<span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> newCount <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> count <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Foo render"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>div<span class="token operator">></span>
        <span class="token operator">&lt;</span>h1<span class="token operator">></span> <span class="token punctuation">{</span>count<span class="token punctuation">}</span> <span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
        <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>increment<span class="token punctuation">}</span><span class="token operator">></span>Increment<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>点击按钮，则调用<code v-pre>setState</code>方法，无论<code v-pre>count</code>发生变化辩护，控制台都会输出<code v-pre>Foo render</code>，证明<code v-pre>render</code>执行了</p>
<ul>
<li>函数组件通过<code v-pre>useState hook</code>修改状态</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> newCount <span class="token operator">=</span> count <span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token operator">?</span> count <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">:</span> count<span class="token punctuation">;</span>
    <span class="token function">setCount</span><span class="token punctuation">(</span>newCount<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Foo render"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">></span>
      <span class="token operator">&lt;</span>h1<span class="token operator">></span> <span class="token punctuation">{</span>count<span class="token punctuation">}</span> <span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>increment<span class="token punctuation">}</span><span class="token operator">></span>Increment<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数组件通过<code v-pre>useState</code>这种形式更新数据，当数组的值不发生改变了，就不会触发<code v-pre>render</code></p>
<ul>
<li>类组件重新渲染</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  state <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"App"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"App"</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>Foo <span class="token operator">/</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"App"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">></span>
          Change name
        <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Foo render"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">></span>
      <span class="token operator">&lt;</span>h1<span class="token operator">></span> Foo <span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只要点击了 <code v-pre>App</code> 组件内的 <code v-pre>Change name</code> 按钮，不管 <code v-pre>Foo</code> 具体实现是什么，都会被重新<code v-pre>render</code>渲染</p>
<ul>
<li>函数组件重新渲染</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>name<span class="token punctuation">,</span>setName<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">'App'</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"App"</span><span class="token operator">></span>
            <span class="token operator">&lt;</span>Foo <span class="token operator">/</span><span class="token operator">></span>
            <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"aaa"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">></span>
                <span class="token punctuation">{</span> name <span class="token punctuation">}</span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Foo render"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">></span>
      <span class="token operator">&lt;</span>h1<span class="token operator">></span> Foo <span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以发现，使用<code v-pre>useState</code>来更新状态的时候，只有首次会触发<code v-pre>Foo render</code>，后面并不会导致<code v-pre>Foo render</code></p>
<h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p><code v-pre>render</code>函数里面可以编写<code v-pre>JSX</code>，转化成<code v-pre>createElement</code>这种形式，用于生成虚拟<code v-pre>DOM</code>，最终转化成真实<code v-pre>DOM</code></p>
<p>在<code v-pre>React</code> 中，类组件只要执行了 <code v-pre>setState</code> 方法，就一定会触发 <code v-pre>render</code> 函数执行，函数组件使用<code v-pre>useState</code>更改状态不一定导致重新<code v-pre>render</code></p>
<p>组件的<code v-pre>props</code> 改变了，不一定触发 <code v-pre>render</code> 函数的执行，但是如果 <code v-pre>props</code> 的值来自于父组件或者祖先组件的 <code v-pre>state</code></p>
<p>在这种情况下，父组件或者祖先组件的 <code v-pre>state</code> 发生了改变，就会导致子组件的重新渲染</p>
<p>所以，一旦执行了<code v-pre>setState</code>就会执行<code v-pre>render</code>方法，<code v-pre>useState</code> 会判断当前值有无发生改变确定是否执行<code v-pre>render</code>方法，一旦父组件发生渲染，子组件也会渲染</p>
<p><img src="https://static.vue-js.com/229784b0-ecf5-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zhuanlan.zhihu.com/p/45091185</li>
<li>https://juejin.cn/post/6844904181493415950</li>
</ul>
</div></template>


