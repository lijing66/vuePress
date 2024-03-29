<template><div><h1 id="说说你对-typescript-中高级类型的理解-有哪些" tabindex="-1"><a class="header-anchor" href="#说说你对-typescript-中高级类型的理解-有哪些" aria-hidden="true">#</a> 说说你对 TypeScript 中高级类型的理解？有哪些？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<ol>
<li>
<p>交叉类型 T &amp; U 其语法规则和逻辑 “与” 的符号一致, 简单点就是将多个类型合并成一个类型 (自己理解的话叫做「合并类型」更好记一点) <code v-pre>const linkBtn: Button &amp; Link = {xxx}</code></p>
</li>
<li>
<p>联合类型 T | U 语法规则和逻辑 “或” 的符号一致, 表示其类型为连接的多个类型中的任意一个 <code v-pre>interface Button { type: 'default' | 'primary' | 'danger'}</code></p>
</li>
<li>
<p>类型别名 type type Alias = T | U. 前面提到的交叉类型与联合类型如果有多个地方需要使用，就需要通过类型别名的方式，给这两种类型声明一个别名。类型别名与声明变量的语法类似，只需要把 const、let 换成 type 关键字即可 <code v-pre>type InnerType = 'default' | 'primary' | 'danger'</code></p>
</li>
<li>
<p>类型索引 keyof, 类似于 Object.keys ，用于获取一个接口中 Key 的联合类型</p>
</li>
<li>
<p>类型约束 extends, 这里的 extends 关键词不同于在 class 后使用 extends 的继承作用，泛型内使用的主要作用是对泛型加以约束 <code v-pre>type BaseType = string | number | boolean</code> ,使用 <code v-pre>function copy&lt;T extends BaseType&gt;(arg: T): T {}</code> 表示泛型变量 T 只能是字符串、数字、布尔这几种基础类型</p>
</li>
<li>
<p>extends 经常与 keyof 一起使用，例如我们有一个方法专门用来获取对象的值，但是这个对象并不确定，我们就可以使用 extends 和 keyof 进行约束 <code v-pre>function getValue&lt;T, K extends keyof T&gt;(obj: T, key: K) {}</code></p>
</li>
<li>
<p>类型映射 in， in 关键词的作用主要是做类型的映射，遍历已有接口的 key 或者是遍历联合类型， <code v-pre>type ReadOnlyObj = { readonly [P in ObjKeys]: Obj[P]; }</code></p>
</li>
</ol>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>除了<code v-pre>string</code>、<code v-pre>number</code>、<code v-pre>boolean</code> 这种基础类型外，在 <code v-pre>typescript</code> 类型声明中还存在一些高级的类型应用</p>
<p>这些高级类型，是<code v-pre>typescript</code>为了保证语言的灵活性，所使用的一些语言特性。这些特性有助于我们应对复杂多变的开发场景</p>
<h2 id="二、有哪些" tabindex="-1"><a class="header-anchor" href="#二、有哪些" aria-hidden="true">#</a> 二、有哪些</h2>
<p>常见的高级类型有如下：</p>
<ul>
<li>交叉类型</li>
<li>联合类型</li>
<li>类型别名</li>
<li>类型索引</li>
<li>类型约束</li>
<li>映射类型</li>
<li>条件类型</li>
</ul>
<h3 id="交叉类型" tabindex="-1"><a class="header-anchor" href="#交叉类型" aria-hidden="true">#</a> 交叉类型</h3>
<p>通过 <code v-pre>&amp;</code> 将多个类型合并为一个类型，包含了所需的所有类型的特性，本质上是一种并的操作</p>
<p>语法如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token constant">T</span> <span class="token operator">&amp;</span> <span class="token constant">U</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>适用于对象合并场景，如下将声明一个函数，将两个对象合并成一个对象并返回：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token generic-function"><span class="token function">extend</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>first<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> second<span class="token operator">:</span> <span class="token constant">U</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token constant">T</span> <span class="token operator">&amp;</span> <span class="token constant">U</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> result<span class="token operator">:</span> <span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">&amp;</span> <span class="token constant">U</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> first<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> first<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> second<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>result<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            result<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> second<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> result
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="联合类型" tabindex="-1"><a class="header-anchor" href="#联合类型" aria-hidden="true">#</a> 联合类型</h3>
<p>联合类型的语法规则和逻辑 “或” 的符号一致，表示其类型为连接的多个类型中的任意一个，本质上是一个交的关系</p>
<p>语法如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token constant">T</span> <span class="token operator">|</span> <span class="token constant">U</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例如 <code v-pre>number</code> | <code v-pre>string</code> | <code v-pre>boolean</code> 的类型只能是这三个的一种，不能共存</p>
<p>如下所示：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">formatCommandline</span><span class="token punctuation">(</span>command<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> line <span class="token operator">=</span> <span class="token string">''</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> command <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    line <span class="token operator">=</span> command<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    line <span class="token operator">=</span> command<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">' '</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="类型别名" tabindex="-1"><a class="header-anchor" href="#类型别名" aria-hidden="true">#</a> 类型别名</h3>
<p>类型别名会给一个类型起个新名字，类型别名有时和接口很像，但是可以作用于原始值、联合类型、元组以及其它任何你需要手写的类型</p>
<p>可以使用 <code v-pre>type SomeName = someValidTypeAnnotation</code>的语法来创建类型别名：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">some</span> <span class="token operator">=</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token builtin">string</span>

<span class="token keyword">const</span> b<span class="token operator">:</span> some <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token comment">// ok</span>
<span class="token keyword">const</span> c<span class="token operator">:</span> some <span class="token operator">=</span> <span class="token string">'hello'</span> <span class="token comment">// ok</span>
<span class="token keyword">const</span> d<span class="token operator">:</span> some <span class="token operator">=</span> <span class="token number">123</span> <span class="token comment">// 不能将类型“123”分配给类型“some”</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外类型别名可以是泛型:</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Container<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> value<span class="token operator">:</span> <span class="token constant">T</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>也可以使用类型别名来在属性里引用自己：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Tree<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  value<span class="token operator">:</span> <span class="token constant">T</span>
  left<span class="token operator">:</span> Tree<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>
  right<span class="token operator">:</span> Tree<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，类型别名和接口使用十分相似，都可以描述一个对象或者函数</p>
<p>两者最大的区别在于，<code v-pre>interface</code>只能用于定义对象类型，而 <code v-pre>type</code> 的声明方式除了对象之外还可以定义交叉、联合、原始类型等，类型声明的方式适用范围显然更加广泛</p>
<h3 id="类型索引" tabindex="-1"><a class="header-anchor" href="#类型索引" aria-hidden="true">#</a> 类型索引</h3>
<p><code v-pre>keyof</code> 类似于 <code v-pre>Object.keys</code> ，用于获取一个接口中 Key 的联合类型。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Button</span> <span class="token punctuation">{</span>
  type<span class="token operator">:</span> <span class="token builtin">string</span>
  text<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">ButtonKeys</span> <span class="token operator">=</span> <span class="token keyword">keyof</span> Button
<span class="token comment">// 等效于</span>
<span class="token keyword">type</span> <span class="token class-name">ButtonKeys</span> <span class="token operator">=</span> <span class="token string">'type'</span> <span class="token operator">|</span> <span class="token string">'text'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="类型约束" tabindex="-1"><a class="header-anchor" href="#类型约束" aria-hidden="true">#</a> 类型约束</h3>
<p>通过关键字 <code v-pre>extend</code> 进行约束，不同于在 <code v-pre>class</code> 后使用 <code v-pre>extends</code> 的继承作用，泛型内使用的主要作用是对泛型加以约束</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">BaseType</span> <span class="token operator">=</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">boolean</span>

<span class="token comment">// 这里表示 copy 的参数</span>
<span class="token comment">// 只能是字符串、数字、布尔这几种基础类型</span>
<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">copy</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> BaseType<span class="token operator">></span></span></span><span class="token punctuation">(</span>arg<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> arg
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类型约束通常和类型索引一起使用，例如我们有一个方法专门用来获取对象的值，但是这个对象并不确定，我们就可以使用 <code v-pre>extends</code> 和 <code v-pre>keyof</code> 进行约束。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token generic-function"><span class="token function">getValue</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>obj<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> key<span class="token operator">:</span> <span class="token constant">K</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> a<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>
<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token function">getValue</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">'a'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="映射类型" tabindex="-1"><a class="header-anchor" href="#映射类型" aria-hidden="true">#</a> 映射类型</h3>
<p>通过 <code v-pre>in</code> 关键字做类型的映射，遍历已有接口的 <code v-pre>key</code> 或者是遍历联合类型，如下例子：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Readonly<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">readonly</span> <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Obj</span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token builtin">string</span>
  b<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">ReadOnlyObj</span> <span class="token operator">=</span> Readonly<span class="token operator">&lt;</span>Obj<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述的结构，可以分成这些步骤：</p>
<ul>
<li>keyof T：通过类型索引 keyof 的得到联合类型 'a' | 'b'</li>
<li>P in keyof T 等同于 p in 'a' | 'b'，相当于执行了一次 forEach 的逻辑，遍历 'a' | 'b'</li>
</ul>
<p>所以最终<code v-pre>ReadOnlyObj</code>的接口为下述：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">ReadOnlyObj</span> <span class="token punctuation">{</span>
  <span class="token keyword">readonly</span> a<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token keyword">readonly</span> b<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="条件类型" tabindex="-1"><a class="header-anchor" href="#条件类型" aria-hidden="true">#</a> 条件类型</h3>
<p>条件类型的语法规则和三元表达式一致，经常用于一些类型不确定的情况。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token constant">U</span></span> <span class="token operator">?</span> <span class="token constant">X</span> <span class="token operator">:</span> <span class="token constant">Y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面的意思就是，如果 T 是 U 的子集，就是类型 X，否则为类型 Y</p>
<h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p>可以看到，如果只是掌握了 <code v-pre>typeScript</code> 的一些基础类型，可能很难游刃有余的去使用 <code v-pre>typeScript</code>，需要了解一些<code v-pre>typescript</code>的高阶用法</p>
<p>并且<code v-pre>typescript</code>在版本的迭代中新增了很多功能，需要不断学习与掌握</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://www.tslang.cn/docs/handbook/advanced-types.html</li>
<li>https://juejin.cn/post/6844904003604578312</li>
<li>https://zhuanlan.zhihu.com/p/103846208</li>
</ul>
</div></template>


