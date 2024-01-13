<template><div><h1 id="typescript-的数据类型有哪些" tabindex="-1"><a class="header-anchor" href="#typescript-的数据类型有哪些" aria-hidden="true">#</a> typescript 的数据类型有哪些？</h1>
<h2 id="ts-的数据类型" tabindex="-1"><a class="header-anchor" href="#ts-的数据类型" aria-hidden="true">#</a> ts 的数据类型</h2>
<ul>
<li>因为 ts 最大特点就是类型检查，所以会有很多种数据类型供我们使用</li>
<li>ts 和 js 共有的类型有： boolean number string array object (symbol，undefined,null 不常用)</li>
<li>TS 独有的数据类型有 interface, type any, unknown, void,never, tuple, <a href="http://fanyouf.gitee.io/interview/ts/03.html" target="_blank" rel="noopener noreferrer">enum<ExternalLinkIcon/></a></li>
</ul>
<h2 id="ts-的数据类型是什么" tabindex="-1"><a class="header-anchor" href="#ts-的数据类型是什么" aria-hidden="true">#</a> ts 的数据类型是什么</h2>
<p><img src="https://static.vue-js.com/d88f9450-0998-11ec-a752-75723a64e8f5.png" alt=""></p>
<p><code v-pre>typescript</code> 和 <code v-pre>javascript</code>几乎一样，拥有相同的数据类型，另外在<code v-pre>javascript</code>基础上提供了更加实用的类型供开发使用</p>
<p>在开发阶段，可以为明确的变量定义为某种类型，这样<code v-pre>typescript</code>就能在编译阶段进行类型检查，当类型不合符预期结果的时候则会出现错误提示</p>
<h2 id="二、有哪些" tabindex="-1"><a class="header-anchor" href="#二、有哪些" aria-hidden="true">#</a> 二、有哪些</h2>
<p><code v-pre>typescript</code> 的数据类型主要有如下：</p>
<ul>
<li>boolean（布尔类型）</li>
<li>number（数字类型）</li>
<li>string（字符串类型）</li>
<li>array（数组类型）</li>
<li>tuple（元组类型）</li>
<li>enum（枚举类型）</li>
<li>any（任意类型）</li>
<li>null 和 undefined 类型</li>
<li>void 类型</li>
<li>never 类型</li>
<li>object 对象类型</li>
</ul>
<h3 id="boolean" tabindex="-1"><a class="header-anchor" href="#boolean" aria-hidden="true">#</a> boolean</h3>
<p>布尔类型</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> flag<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token comment">// flag = 123; // 错误</span>
flag <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token comment">//正确</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="number" tabindex="-1"><a class="header-anchor" href="#number" aria-hidden="true">#</a> number</h3>
<p>数字类型，和<code v-pre>javascript</code>一样，<code v-pre>typescript</code>的数值类型都是浮点数，可支持二进制、八进制、十进制和十六进制</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> num<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">123</span>
<span class="token comment">// num = '456'; // 错误</span>
num <span class="token operator">=</span> <span class="token number">456</span> <span class="token comment">//正确</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进制表示：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> decLiteral<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">6</span> <span class="token comment">// 十进制</span>
<span class="token keyword">let</span> hexLiteral<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0xf00d</span> <span class="token comment">// 十六进制</span>
<span class="token keyword">let</span> binaryLiteral<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0b1010</span> <span class="token comment">// 二进制</span>
<span class="token keyword">let</span> octalLiteral<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0o744</span> <span class="token comment">// 八进制</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="string" tabindex="-1"><a class="header-anchor" href="#string" aria-hidden="true">#</a> string</h3>
<p>字符串类型，和<code v-pre>JavaScript</code>一样，可以使用双引号（<code v-pre>&quot;</code>）或单引号（<code v-pre>'</code>）表示字符串</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> str<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">'this is ts'</span>
str <span class="token operator">=</span> <span class="token string">'test'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>作为超集，当然也可以使用模版字符串``进行包裹，通过 ${} 嵌入变量</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Gene</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> age<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">37</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> sentence<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> `Hello<span class="token punctuation">,</span> my name <span class="token keyword">is</span> $<span class="token punctuation">{</span> name <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="array" tabindex="-1"><a class="header-anchor" href="#array" aria-hidden="true">#</a> array</h3>
<p>数组类型，跟<code v-pre>javascript</code>一致，通过<code v-pre>[]</code>进行包裹，有两种写法：</p>
<p>方式一：元素类型后面接上 <code v-pre>[]</code></p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> arr<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'12'</span><span class="token punctuation">,</span> <span class="token string">'23'</span><span class="token punctuation">]</span>
arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'45'</span><span class="token punctuation">,</span> <span class="token string">'56'</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>方式二：使用数组泛型，<code v-pre>Array&lt;元素类型&gt;</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> arr<span class="token operator">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span>
arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'45'</span><span class="token punctuation">,</span> <span class="token string">'56'</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tuple" tabindex="-1"><a class="header-anchor" href="#tuple" aria-hidden="true">#</a> tuple</h3>
<p>元祖类型，允许表示一个已知元素数量和类型的数组，各元素的类型不必相同</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> tupleArr<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">boolean</span><span class="token punctuation">]</span>
tupleArr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">,</span> <span class="token string">'34'</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">]</span> <span class="token comment">//ok</span>
typleArr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">,</span> <span class="token string">'34'</span><span class="token punctuation">]</span> <span class="token comment">// no ok</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>赋值的类型、位置、个数需要和定义（生明）的类型、位置、个数一致</p>
<h3 id="enum" tabindex="-1"><a class="header-anchor" href="#enum" aria-hidden="true">#</a> enum</h3>
<p><code v-pre>enum</code>类型是对 JavaScript 标准数据类型的一个补充，使用枚举类型可以为一组数值赋予友好的名字</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">enum</span> Color <span class="token punctuation">{</span>
  Red<span class="token punctuation">,</span>
  Green<span class="token punctuation">,</span>
  Blue<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> c<span class="token operator">:</span> Color <span class="token operator">=</span> Color<span class="token punctuation">.</span>Green
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="any" tabindex="-1"><a class="header-anchor" href="#any" aria-hidden="true">#</a> any</h3>
<p>可以指定任何类型的值，在编程阶段还不清楚类型的变量指定一个类型，不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查，这时候可以使用<code v-pre>any</code>类型</p>
<p>使用<code v-pre>any</code>类型允许被赋值为任意类型，甚至可以调用其属性、方法</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> num<span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=</span> <span class="token number">123</span>
num <span class="token operator">=</span> <span class="token string">'str'</span>
num <span class="token operator">=</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义存储各种类型数据的数组时，示例代码如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> arrayList<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">'fine'</span><span class="token punctuation">]</span>
arrayList<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="null-和-和-undefined" tabindex="-1"><a class="header-anchor" href="#null-和-和-undefined" aria-hidden="true">#</a> null 和 和 undefined</h3>
<p>在<code v-pre>JavaScript</code> 中 <code v-pre>null</code>表示 &quot;什么都没有&quot;，是一个只有一个值的特殊类型，表示一个空对象引用，而<code v-pre>undefined</code>表示一个没有设置值的变量</p>
<p>默认情况下<code v-pre>null</code>和<code v-pre>undefined</code>是所有类型的子类型， 就是说你可以把 <code v-pre>null</code>和 <code v-pre>undefined</code>赋值给 <code v-pre>number</code>类型的变量</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> num<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token comment">// 数值类型 或者 undefined</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token comment">// 正确</span>
num <span class="token operator">=</span> <span class="token number">123</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token comment">// 正确</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是<code v-pre>ts</code>配置了<code v-pre>--strictNullChecks</code>标记，<code v-pre>null</code>和<code v-pre>undefined</code>只能赋值给<code v-pre>void</code>和它们各自</p>
<h3 id="void" tabindex="-1"><a class="header-anchor" href="#void" aria-hidden="true">#</a> void</h3>
<p>用于标识方法返回值的类型，表示该方法没有返回值。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'Hello Runoob'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="never" tabindex="-1"><a class="header-anchor" href="#never" aria-hidden="true">#</a> never</h3>
<p><code v-pre>never</code>是其他类型 （包括<code v-pre>null</code>和 <code v-pre>undefined</code>）的子类型，可以赋值给任何类型，代表从不会出现的值</p>
<p>但是没有类型是 never 的子类型，这意味着声明 <code v-pre>never</code> 的变量只能被 <code v-pre>never</code> 类型所赋值。</p>
<p><code v-pre>never</code> 类型一般用来指定那些总是会抛出异常、无限循环</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> a<span class="token operator">:</span> <span class="token builtin">never</span>
a <span class="token operator">=</span> <span class="token number">123</span> <span class="token comment">// 错误的写法</span>

a <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 正确的写法</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'错误'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 返回never的函数必须存在无法达到的终点</span>
<span class="token keyword">function</span> <span class="token function">error</span><span class="token punctuation">(</span>message<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">never</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="object" tabindex="-1"><a class="header-anchor" href="#object" aria-hidden="true">#</a> object</h3>
<p>对象类型，非原始类型，常见的形式通过<code v-pre>{}</code>进行包裹</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> obj<span class="token operator">:</span> object
obj <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'Wang'</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">25</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p>和<code v-pre>javascript</code>基本一致，也分成：</p>
<ul>
<li>基本类型</li>
<li>引用类型</li>
</ul>
<p>在基础类型上，<code v-pre>typescript</code>增添了<code v-pre>void</code>、<code v-pre>any</code>、<code v-pre>emum</code>等原始类型</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://www.tslang.cn/docs/handbook/basic-types.html</li>
</ul>
</div></template>


