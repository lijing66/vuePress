<template><div><h1 id="数据类型和存储上的差别" tabindex="-1"><a class="header-anchor" href="#数据类型和存储上的差别" aria-hidden="true">#</a> <a href="#">#</a> 数据类型和存储上的差别</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> <a href="#">#</a> 简版</h2>
<p>在 js 中把我们的数据进行了分类,可以理解为 2 大类：</p>
<ol>
<li>基本数据类型（6种）:string,number,null,Boolean,undefined,symbol</li>
<li>引用数据类型（3种）: Object,Array,Function</li>
</ol>
<p>区别:基本数据类型保存在栈里面,可以直接访问他的值,引用数据类型保存在堆里面,栈里面保存的是地址,通过栈里面的地址去访问堆里面的值</p>
<h2 id="如何判断数据类型" tabindex="-1"><a class="header-anchor" href="#如何判断数据类型" aria-hidden="true">#</a> <a href="#">#</a> 如何判断数据类型</h2>
<p>在js中比较常见的有4个api与判断数据的类型有关。分别是typeof, instanceof, Array.isArray, Function.prototype.toString.call。</p>
<ol>
<li>
<p><code v-pre>typeof</code> 判断的粒度比较粗，它能准确判断基础类型（不包括null）和 Object 和 Function。 换句话，它<strong>不能</strong>判断<code v-pre>null</code> 和 <code v-pre>Array</code> ，会把他们都判断为<code v-pre>object</code>。</p>
</li>
<li>
<p>instanceof 用来判断对象的更具体的类型。<a href="http://fanyouf.gitee.io/interview/handwritten/06.html" target="_blank" rel="noopener noreferrer">instanceof的模拟实现<ExternalLinkIcon/></a>, 它的主要原理的是沿着对象的原型链的方向，判断原型对象是否是构造器的prototype。 <a href="http://fanyouf.gitee.io/interview/js/03.html" target="_blank" rel="noopener noreferrer">instanceof和typeof的区别<ExternalLinkIcon/></a></p>
</li>
<li>
<p>Array.isArray 专门用来判断是否是数组。</p>
</li>
<li>
<p><code v-pre>Function.prototype.toString.call</code> 是最全面的方法了。它的代码运行如下：</p>
</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 以数组为例</span>
<span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// [object Array]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>它得到的返回结果是一个<code v-pre>字符串</code>，注意，<code v-pre>不是数组</code>！ 如果希望得到具体的类型,继续使用<code v-pre>Object.prototype.toString.call([]).slice(8,-1).toLowerCase()</code>可以得到具体的类型。`。代码中的-1表示倒数第一个元素。toLowerCase()表示小写。</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> <a href="#">#</a> 前言</h2>
<p>在<code v-pre>JavaScript</code>中，我们可以分成两种类型：</p>
<ul>
<li>基本类型</li>
<li>复杂类型</li>
</ul>
<p>两种类型的区别是：存储位置不同</p>
<h2 id="基本类型" tabindex="-1"><a class="header-anchor" href="#基本类型" aria-hidden="true">#</a> <a href="#">#</a> 基本类型</h2>
<p>基本类型主要为以下 6 种：</p>
<ul>
<li>Number</li>
<li>String</li>
<li>Boolean</li>
<li>Undefined</li>
<li>null</li>
<li>symbol</li>
</ul>
<h3 id="number" tabindex="-1"><a class="header-anchor" href="#number" aria-hidden="true">#</a> <a href="#">#</a> Number</h3>
<p>数值最常见的整数类型格式则为十进制，还可以设置八进制（零开头）、十六进制（0x 开头）</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> intNum <span class="token operator">=</span> <span class="token number">55</span> <span class="token comment">// 10进制的55</span>
<span class="token keyword">let</span> num1 <span class="token operator">=</span> <span class="token number">070</span> <span class="token comment">// 8进制的56</span>
<span class="token keyword">let</span> hexNum1 <span class="token operator">=</span> <span class="token number">0xa</span> <span class="token comment">//16进制的10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浮点类型则在数值汇总必须包含小数点，还可通过科学计数法表示</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> floatNum1 <span class="token operator">=</span> <span class="token number">1.1</span>
<span class="token keyword">let</span> floatNum2 <span class="token operator">=</span> <span class="token number">0.1</span>
<span class="token keyword">let</span> floatNum3 <span class="token operator">=</span> <span class="token number">0.1</span> <span class="token comment">// 有效，但不推荐</span>
<span class="token keyword">let</span> floatNum <span class="token operator">=</span> <span class="token number">3.125e7</span> <span class="token comment">// 等于 31250000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在数值类型中，存在一个特殊数值<code v-pre>NaN</code>，意为“不是数值”，用于表示本来要返回数值的操作失败了（而不是抛出错误）</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">0</span> <span class="token operator">/</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// NaN</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">0</span> <span class="token operator">/</span> <span class="token operator">+</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// NaN</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="undefined" tabindex="-1"><a class="header-anchor" href="#undefined" aria-hidden="true">#</a> <a href="#">#</a> Undefined</h3>
<p><code v-pre>Undefined</code> 类型只有一个值，就是特殊值 <code v-pre>undefined</code>。当使用 <code v-pre>var</code>或 <code v-pre>let</code>声明了变量但没有初始化时，就相当于给变量赋予了 <code v-pre>undefined</code>值</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> message
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message <span class="token operator">==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>包含<code v-pre>undefined</code> 值的变量跟未定义变量是有区别的</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> message <span class="token comment">// 这个变量被声明了，只是值为 undefined</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span> <span class="token comment">// "undefined"</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span> <span class="token comment">// 没有声明过这个变量，报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="string" tabindex="-1"><a class="header-anchor" href="#string" aria-hidden="true">#</a> <a href="#">#</a> String</h3>
<p>字符串可以使用双引号（&quot;）、单引号（'）或反引号（`）标示</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> firstName <span class="token operator">=</span> <span class="token string">'John'</span>
<span class="token keyword">let</span> lastName <span class="token operator">=</span> <span class="token string">'Jacob'</span>
<span class="token keyword">let</span> lastName <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Jingleheimerschmidt</span><span class="token template-punctuation string">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>字符串是不可变的，意思是一旦创建，它们的值就不能变了</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> lang <span class="token operator">=</span> <span class="token string">'Java'</span>
lang <span class="token operator">=</span> lang <span class="token operator">+</span> <span class="token string">'Script'</span> <span class="token comment">// 先销毁再创建</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="null" tabindex="-1"><a class="header-anchor" href="#null" aria-hidden="true">#</a> <a href="#">#</a> Null</h3>
<p><code v-pre>Null</code>类型同样只有一个值，即特殊值 <code v-pre>null</code></p>
<p>逻辑上讲， null 值表示一个空对象指针，这也是给<code v-pre>typeof</code>传一个 <code v-pre>null</code> 会返回 <code v-pre>&quot;object&quot;</code> 的原因</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> car <span class="token operator">=</span> <span class="token keyword">null</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> car<span class="token punctuation">)</span> <span class="token comment">// "object"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>undefined</code> 值是由 <code v-pre>null</code>值派生而来</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>只要变量要保存对象，而当时又没有那个对象可保存，就可用 <code v-pre>null</code>来填充该变量</p>
<h3 id="boolean" tabindex="-1"><a class="header-anchor" href="#boolean" aria-hidden="true">#</a> <a href="#">#</a> Boolean</h3>
<p><code v-pre>Boolean</code>（布尔值）类型有两个字面值： <code v-pre>true</code> 和<code v-pre>false</code></p>
<p>通过<code v-pre>Boolean</code>可以将其他类型的数据转化成布尔值</p>
<p>规则如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>数据类型      				转换为 <span class="token boolean">true</span> 的值      				转换为 <span class="token boolean">false</span> 的值
 String        				 非空字符串          					<span class="token string">""</span>
 Number 				非零数值（包括无穷值）						<span class="token number">0</span> 、 <span class="token number">NaN</span>
 Object 					 任意对象 							   <span class="token keyword">null</span>
Undefined 					<span class="token constant">N</span><span class="token operator">/</span><span class="token constant">A</span> （不存在） 						<span class="token keyword">undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="symbol" tabindex="-1"><a class="header-anchor" href="#symbol" aria-hidden="true">#</a> <a href="#">#</a> Symbol</h3>
<p>Symbol （符号）是原始值，且符号实例是唯一、不可变的。符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> genericSymbol <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> otherGenericSymbol <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>genericSymbol <span class="token operator">==</span> otherGenericSymbol<span class="token punctuation">)</span> <span class="token comment">// false</span>

<span class="token keyword">let</span> fooSymbol <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> otherFooSymbol <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>fooSymbol <span class="token operator">==</span> otherFooSymbol<span class="token punctuation">)</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、引用类型" tabindex="-1"><a class="header-anchor" href="#二、引用类型" aria-hidden="true">#</a> <a href="#">#</a> 二、引用类型</h2>
<p>复杂类型统称为<code v-pre>Object</code>，我们这里主要讲述下面三种：</p>
<ul>
<li>Object</li>
<li>Array</li>
<li>Function</li>
</ul>
<h3 id="object" tabindex="-1"><a class="header-anchor" href="#object" aria-hidden="true">#</a> <a href="#">#</a> Object</h3>
<p>创建<code v-pre>object</code>常用方式为对象字面量表示法，属性名可以是字符串或数值</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Nicholas'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">29</span><span class="token punctuation">,</span>
  <span class="token number">5</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="array" tabindex="-1"><a class="header-anchor" href="#array" aria-hidden="true">#</a> <a href="#">#</a> Array</h3>
<p><code v-pre>JavaScript</code>数组是一组有序的数据，但跟其他语言不同的是，数组中每个槽位可以存储任意类型的数据。并且，数组也是动态大小的，会随着数据添加而自动增长</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'red'</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">20</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
colors<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="function" tabindex="-1"><a class="header-anchor" href="#function" aria-hidden="true">#</a> <a href="#">#</a> Function</h3>
<p>函数实际上是对象，每个函数都是 <code v-pre>Function</code>类型的实例，而 <code v-pre>Function</code>也有属性和方法，跟其他引用类型一样</p>
<p>函数存在三种常见的表达方式：</p>
<ul>
<li>函数声明</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 函数声明</span>
<span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter">num1<span class="token punctuation">,</span> num2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> num1 <span class="token operator">+</span> num2
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>函数表达式</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token function-variable function">sum</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">num1<span class="token punctuation">,</span> num2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> num1 <span class="token operator">+</span> num2
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>箭头函数</li>
</ul>
<p>函数声明和函数表达式两种方式</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token function-variable function">sum</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">num1<span class="token punctuation">,</span> num2</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> num1 <span class="token operator">+</span> num2
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="其他引用类型" tabindex="-1"><a class="header-anchor" href="#其他引用类型" aria-hidden="true">#</a> <a href="#">#</a> 其他引用类型</h3>
<p>除了上述说的三种之外，还包括<code v-pre>Date</code>、<code v-pre>RegExp</code>、<code v-pre>Map</code>、<code v-pre>Set</code>等......</p>
<h2 id="三、存储区别" tabindex="-1"><a class="header-anchor" href="#三、存储区别" aria-hidden="true">#</a> <a href="#">#</a> 三、存储区别</h2>
<p>基本数据类型和引用数据类型存储在内存中的位置不同：</p>
<ul>
<li>
<p>基本数据类型存储在栈中</p>
</li>
<li>
<p>引用类型的对象存储于堆中</p>
</li>
</ul>
<p>当我们把变量赋值给一个变量时，解析器首先要确认的就是这个值是基本类型值还是引用类型值</p>
<p>下面来举个例子</p>
<h3 id="基本类型-1" tabindex="-1"><a class="header-anchor" href="#基本类型-1" aria-hidden="true">#</a> <a href="#">#</a> 基本类型</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">10</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> a <span class="token comment">// 赋值操作</span>
b <span class="token operator">=</span> <span class="token number">20</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token comment">// 10值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>a</code>的值为一个基本类型，是存储在栈中，将<code v-pre>a</code>的值赋给<code v-pre>b</code>，虽然两个变量的值相等，但是两个变量保存了两个不同的内存地址</p>
<p>下图演示了基本类型赋值的过程：</p>
<p><img src="https://static.vue-js.com/906ffb90-6463-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h3 id="引用类型" tabindex="-1"><a class="header-anchor" href="#引用类型" aria-hidden="true">#</a> <a href="#">#</a> 引用类型</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> obj2 <span class="token operator">=</span> obj1
obj2<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'Xxx'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// xxx</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>引用类型数据存放在内对内中，每个堆内存中有一个引用地址，该引用地址存放在栈中</p>
<p><code v-pre>obj1</code>是一个引用类型，在赋值操作过程汇总，实际是将堆内存对象在栈内存的引用地址复制了一份给了<code v-pre>obj2</code>，实际上他们共同指向了同一个堆内存对象，所以更改<code v-pre>obj2</code>会对<code v-pre>obj1</code>产生影响</p>
<p>下图演示这个引用类型赋值过程</p>
<p><img src="https://static.vue-js.com/a34bdd10-6463-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> <a href="#">#</a> 小结</h3>
<ul>
<li>声明变量时不同的内存地址分配：
<ul>
<li>简单类型的值存放在栈中，在栈中存放的是对应的值</li>
<li>引用类型对应的值存储在堆中，在栈中存放的是指向堆内存的地址</li>
</ul>
</li>
<li>不同的类型数据导致赋值变量时的不同：
<ul>
<li>简单类型赋值，是生成相同的值，两个对象对应不同的地址</li>
<li>复杂类型赋值，是将保存对象的内存地址赋值给另一个变量。也就是两个变量指向堆内存中同一个对象</li>
</ul>
</li>
</ul>
</div></template>


