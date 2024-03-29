<template><div><h1 id="说说你对-typescript-中函数的理解-与-javascript-函数的区别" tabindex="-1"><a class="header-anchor" href="#说说你对-typescript-中函数的理解-与-javascript-函数的区别" aria-hidden="true">#</a> 说说你对 TypeScript 中函数的理解？与 JavaScript 函数的区别？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<ul>
<li>
<p>函数是 JavaScript 应用程序的基础。 它帮助你实现抽象层，模拟类，信息隐藏和模块， TypeScript 为 JavaScript 函数添加了额外的功能，让我们可以更容易地使用</p>
</li>
<li>
<p>TS 中的函数大部分和 JS 相同,不同之处在于 ts 会在函数的（参数）这中间和后面加上类型声明</p>
</li>
</ul>
<ol>
<li>ts 中函数声明和实现分离的写法</li>
</ol>
<p>a. 利用 type 声明一个函数 <code v-pre>type AddFun = (a:number, b:number)=&gt;number;</code></p>
<p>b. 利用 interface 声明函数, <code v-pre>interface AddFun { (a:number, b:number):number }</code></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>函数是<code v-pre>JavaScript</code> 应用程序的基础，帮助我们实现抽象层、模拟类、信息隐藏和模块</p>
<p>在<code v-pre>TypeScript</code> 里，虽然已经支持类、命名空间和模块，但函数仍然是主要定义行为的方式，<code v-pre>TypeScript</code> 为 <code v-pre>JavaScript</code> 函数添加了额外的功能，丰富了更多的应用场景</p>
<p>函数类型在 <code v-pre>TypeScript</code> 类型系统中扮演着非常重要的角色，它们是可组合系统的核心构建块</p>
<h2 id="二、使用方式" tabindex="-1"><a class="header-anchor" href="#二、使用方式" aria-hidden="true">#</a> 二、使用方式</h2>
<p>跟<code v-pre>javascript</code> 定义函数十分相似，可以通过<code v-pre>funciton</code> 关键字、箭头函数等形式去定义，例如下面一个简单的加法函数：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> add <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">-</span> a <span class="token operator">+</span> b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述只定义了函数的两个参数类型，这个时候整个函数虽然没有被显式定义，但是实际上<code v-pre>TypeScript</code> 编译器是能够通过类型推断到这个函数的类型，如下图所示：</p>
<p><img src="https://static.vue-js.com/4b3415b0-0d42-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>当鼠标放置在第三行<code v-pre>add</code>函数名的时候，会出现完整的函数定义类型，通过<code v-pre>:</code> 的形式来定于参数类型，通过 <code v-pre>=&gt;</code> 连接参数和返回值类型</p>
<p>当我们没有提供函数实现的情况下，有两种声明函数类型的方式，如下所示：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// 方式一</span>
<span class="token keyword">type</span> <span class="token class-name">LongHand</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token comment">// 方式二</span>
<span class="token keyword">type</span> <span class="token class-name">ShortHand</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">number</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当存在函数重载时，只能使用方式一的形式</p>
<h3 id="可选参数" tabindex="-1"><a class="header-anchor" href="#可选参数" aria-hidden="true">#</a> 可选参数</h3>
<p>当函数的参数可能是不存在的，只需要在参数后面加上 <code v-pre>?</code> 代表参数可能不存在，如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">+</span> <span class="token punctuation">(</span>b <span class="token operator">?</span> b <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这时候参数<code v-pre>b</code>可以是<code v-pre>number</code>类型或者<code v-pre>undefined</code>类型，即可以传一个<code v-pre>number</code>类型或者不传都可以</p>
<h3 id="剩余类型" tabindex="-1"><a class="header-anchor" href="#剩余类型" aria-hidden="true">#</a> 剩余类型</h3>
<p>剩余参数与<code v-pre>JavaScript</code>的语法类似，需要用 <code v-pre>...</code> 来表示剩余参数</p>
<p>如果剩余参数 <code v-pre>rest</code> 是一个由<code v-pre>number</code>类型组成的数组，则如下表示：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token operator">...</span>rest<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=></span> rest<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">+</span> b<span class="token punctuation">,</span> a<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="函数重载" tabindex="-1"><a class="header-anchor" href="#函数重载" aria-hidden="true">#</a> 函数重载</h3>
<p>允许创建数项名称相同但输入输出类型或个数不同的子程序，它可以简单地称为一个单独功能可以执行多项任务的能力</p>
<p>关于<code v-pre>typescript</code>函数重载，必须要把精确的定义放在前面，最后函数实现时，需要使用 <code v-pre>|</code>操作符或者<code v-pre>?</code>操作符，把所有可能的输入类型全部包含进去，用于具体实现</p>
<p>这里的函数重载也只是多个函数的声明，具体的逻辑还需要自己去写，<code v-pre>typescript</code>并不会真的将你的多个重名 <code v-pre>function</code>的函数体进行合并</p>
<p>例如我们有一个 add 函数，它可以接收 <code v-pre>string</code>类型的参数进行拼接，也可以接收 <code v-pre>number</code> 类型的参数进行相加，如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// 上边是声明</span>
<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span>arg1<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> arg2<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span>arg1<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> arg2<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token comment">// 因为我们在下边有具体函数的实现，所以这里并不需要添加 declare 关键字</span>

<span class="token comment">// 下边是实现</span>
<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span>arg1<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">,</span> arg2<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 arg1 + arg2</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> arg1 <span class="token operator">===</span> <span class="token string">'string'</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> arg2 <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> arg1 <span class="token operator">+</span> arg2
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> arg1 <span class="token operator">===</span> <span class="token string">'number'</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> arg2 <span class="token operator">===</span> <span class="token string">'number'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> arg1 <span class="token operator">+</span> arg2
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、区别" tabindex="-1"><a class="header-anchor" href="#三、区别" aria-hidden="true">#</a> 三、区别</h2>
<p>从上面可以看到：</p>
<ul>
<li>从定义的方式而言，typescript 声明函数需要定义参数类型或者声明返回值类型</li>
<li>typescript 在参数中，添加可选参数供使用者选择</li>
<li>typescript 增添函数重载功能，使用者只需要通过查看函数声明的方式，即可知道函数传递的参数个数以及类型</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://www.tslang.cn/docs/handbook/functions.html</li>
<li>https://zh.wikipedia.org/wiki/%E5%87%BD%E6%95%B0%E9%87%8D%E8%BD%BD</li>
<li>https://jkchao.github.io/typescript-book-chinese/typings/functions.html#%E9%87%8D%E8%BD%BD</li>
</ul>
</div></template>


