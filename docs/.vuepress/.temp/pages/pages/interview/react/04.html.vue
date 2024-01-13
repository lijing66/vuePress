<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-15 23:10:47
 * @LastEditors: lijing
 * @LastEditTime: 2024-01-14 00:16:53
 * @Description: 
-->
<h1 id="state-和-props有什么区别" tabindex="-1"><a class="header-anchor" href="#state-和-props有什么区别" aria-hidden="true">#</a> state 和 props有什么区别？</h1>
<p><img src="https://static.vue-js.com/7f272780-d440-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="一、state" tabindex="-1"><a class="header-anchor" href="#一、state" aria-hidden="true">#</a> 一、state</h2>
<p>一个组件的显示形态可以由数据状态和外部参数所决定，而数据状态就是<code v-pre>state</code>，一般在 <code v-pre>constructor</code> 中初始化</p>
<p>当需要修改里面的值的状态需要通过调用<code v-pre>setState</code>来改变，从而达到更新组件内部数据的作用，并且重新调用组件<code v-pre>render</code>方法，如下面的例子：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Button</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">updateCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prevState<span class="token punctuation">,</span> props</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> prevState<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token operator">&lt;</span>button
                    onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">updateCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
                    <span class="token operator">></span>
                Clicked <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count<span class="token punctuation">}</span> times
            <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>setState</code>还可以接受第二个参数，它是一个函数，会在<code v-pre>setState</code>调用完成并且组件开始重新渲染时被调用，可以用来监听渲染是否完成</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'JS每日一题'</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setState finished'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、props" tabindex="-1"><a class="header-anchor" href="#二、props" aria-hidden="true">#</a> 二、props</h2>
<p><code v-pre>React</code>的核心思想就是组件化思想，页面会被切分成一些独立的、可复用的组件</p>
<p>组件从概念上看就是一个函数，可以接受一个参数作为输入值，这个参数就是<code v-pre>props</code>，所以可以把<code v-pre>props</code>理解为从外部传入组件内部的数据</p>
<p><code v-pre>react</code>具有单向数据流的特性，所以他的主要作用是从父组件向子组件中传递数据</p>
<p><code v-pre>props</code>除了可以传字符串，数字，还可以传递对象，数组甚至是回调函数，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Welcome</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>h1<span class="token operator">></span>Hello <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token operator">&lt;</span>Welcome name<span class="token operator">=</span><span class="token string">"Sara"</span> onNameChanged<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>handleName<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述<code v-pre>name</code>属性与<code v-pre>onNameChanged</code>方法都能在子组件的<code v-pre>props</code>变量中访问</p>
<p>在子组件中，<code v-pre>props</code>在内部不可变的，如果想要改变它看，只能通过外部组件传入新的<code v-pre>props</code>来重新渲染子组件，否则子组件的<code v-pre>props</code>和展示形式不会改变</p>
<h2 id="三、区别" tabindex="-1"><a class="header-anchor" href="#三、区别" aria-hidden="true">#</a> 三、区别</h2>
<p>相同点：</p>
<ul>
<li>两者都是 JavaScript 对象</li>
<li>两者都是用于保存信息</li>
<li>props 和 state 都能触发渲染更新</li>
</ul>
<p>区别：</p>
<ul>
<li>props 是外部传递给组件的，而 state 是在组件内被组件自己管理的，一般在 constructor 中初始化</li>
<li>props 在组件内部是不可修改的，但 state 在组件内部可以进行修改</li>
<li>state 是多变的、可以修改</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://lucybain.com/blog/2016/react-state-vs-pros/</li>
<li>https://juejin.cn/post/6844904009203974158</li>
</ul>
</div></template>


