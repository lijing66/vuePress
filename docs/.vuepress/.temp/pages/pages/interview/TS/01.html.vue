<template><div><h1 id="typescript与javascript" tabindex="-1"><a class="header-anchor" href="#typescript与javascript" aria-hidden="true">#</a> TypeScript与JavaScript</h1>
<h2 id="typescript与javascript-1" tabindex="-1"><a class="header-anchor" href="#typescript与javascript-1" aria-hidden="true">#</a> TypeScript与JavaScript</h2>
<ul>
<li>TS 是 js 的超集，是 js 的语法糖， 可以在 ts 文件里面写任意的 js 代码</li>
<li>ts 在浏览器和 nodejs 环境不能直接执行， 需要经过编译转换为 js 才能在浏览器和 nodejs 里面执行</li>
<li>开发大型复杂前端工程，需要接口、继承、强类型等特性，这些是 js 所没有的，用 ts 就能很好的解决这些问题</li>
<li>现在的 vue3 源码底层都是 ts 书写， vue2 和 react 源码底层是 Flow 类型系统</li>
</ul>
<h2 id="typescript是什么" tabindex="-1"><a class="header-anchor" href="#typescript是什么" aria-hidden="true">#</a> TypeScript是什么</h2>
<p><code v-pre>TypeScript</code> 是 <code v-pre>JavaScript</code> 的类型的超集，支持<code v-pre>ES6</code>语法，支持面向对象编程的概念，如类、接口、继承、泛型等</p>
<blockquote>
<p>超集，不得不说另外一个概念，子集，怎么理解这两个呢，举个例子，如果一个集合 A 里面的的所有元素集合 B 里面都存在，那么我们可以理解集合 B 是集合 A 的超集，集合 A 为集合 B 的子集</p>
</blockquote>
<p><img src="https://static.vue-js.com/61c2c1f0-0950-11ec-a752-75723a64e8f5.png" alt=""></p>
<p>其是一种静态类型检查的语言，提供了类型注解，在代码编译阶段就可以检查出数据类型的错误</p>
<p>同时扩展了<code v-pre>JavaScript</code> 的语法，所以任何现有的<code v-pre>JavaScript</code> 程序可以不加改变的在 <code v-pre>TypeScript</code> 下工作</p>
<p>为了保证兼容性，<code v-pre>TypeScript</code> 在编译阶段需要编译器编译成纯 <code v-pre>JavaScript</code> 来运行，是为大型应用之开发而设计的语言，如下：</p>
<p><code v-pre>ts</code> 文件如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> hello<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">'Hello World!'</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>hello<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>编译文件后：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> hello <span class="token operator">=</span> <span class="token string">'Hello World!'</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>hello<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="typescript的特点" tabindex="-1"><a class="header-anchor" href="#typescript的特点" aria-hidden="true">#</a> TypeScript的特点</h2>
<p><code v-pre>TypeScript</code> 的特性主要有如下：</p>
<ul>
<li><strong>类型注解和编译时类型检查</strong> ：在编译时批注变量类型</li>
<li><strong>类型推断</strong>：ts 中没有批注变量类型会自动推断变量的类型</li>
<li><strong>类型擦除</strong>：在编译过程中批注的内容和接口会在运行时利用工具擦除</li>
<li><strong>接口</strong>：ts 中用接口来定义对象类型</li>
<li><strong>枚举</strong>：用于取值被限定在一定范围内的场景</li>
<li><strong>Mixin</strong>：可以接受任意类型的值</li>
<li><strong>泛型编程</strong>：写代码时使用一些以后才指定的类型</li>
<li><strong>名字空间</strong>：名字只在该区域内有效，其他区域可重复使用该名字而不冲突</li>
<li><strong>元组</strong>：元组合并了不同类型的对象，相当于一个可以装不同类型数据的数组</li>
<li>...</li>
</ul>
<h3 id="类型注解" tabindex="-1"><a class="header-anchor" href="#类型注解" aria-hidden="true">#</a> 类型注解</h3>
<p>通过类型注解提供在编译时启动类型检查的静态类型，这是可选的，而且可以忽略而使用 <code v-pre>JavaScript</code> 常规的动态类型</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">Add</span><span class="token punctuation">(</span>left<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> right<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> left <span class="token operator">+</span> right
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于基本类型的批注是 <code v-pre>number</code>、<code v-pre>bool</code> 和 <code v-pre>string</code>，而弱或动态类型的结构则是 <code v-pre>any</code> 类型</p>
<h3 id="类型推断" tabindex="-1"><a class="header-anchor" href="#类型推断" aria-hidden="true">#</a> 类型推断</h3>
<p>当类型没有给出时，TypeScript 编译器利用类型推断来推断类型，如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> str <span class="token operator">=</span> <span class="token string">'string'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>变量 <code v-pre>str</code> 被推断为字符串类型，这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时</p>
<p>如果缺乏声明而不能推断出类型，那么它的类型被视作默认的动态 <code v-pre>any</code> 类型</p>
<h3 id="接口" tabindex="-1"><a class="header-anchor" href="#接口" aria-hidden="true">#</a> 接口</h3>
<p>接口简单来说就是用来描述对象的类型 数据的类型有 <code v-pre>number</code>、<code v-pre>null</code>、<code v-pre>string</code> 等数据格式，对象的类型就是用接口来描述的</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> tom<span class="token operator">:</span> Person <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">'Tom'</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="typescript和javascript的区别" tabindex="-1"><a class="header-anchor" href="#typescript和javascript的区别" aria-hidden="true">#</a> TypeScript和JavaScript的区别</h2>
<ul>
<li>TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法</li>
<li>TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译</li>
<li>TypeScript 文件的后缀名 .ts （.ts，.tsx，.dts），JavaScript 文件是 .js</li>
<li>在编写 TypeScript 的文件的时候就会自动编译成 js 文件</li>
</ul>
<p>更多的区别如下图所示：</p>
<p><img src="https://static.vue-js.com/6b544040-0950-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li><a href="https://zhuanlan.zhihu.com/p/140012915" target="_blank" rel="noopener noreferrer">https://zhuanlan.zhihu.com/p/140012915 (opens new window)<ExternalLinkIcon/></a></li>
<li><a href="https://www.jianshu.com/p/c8aaba6e8ce0" target="_blank" rel="noopener noreferrer">https://www.jianshu.com/p/c8aaba6e8ce0 (opens new window)<ExternalLinkIcon/></a></li>
<li><a href="https://www.cnblogs.com/powertoolsteam/p/13500668.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/powertoolsteam/p/13500668.html (opens new window)<ExternalLinkIcon/></a></li>
</ul>
</div></template>


