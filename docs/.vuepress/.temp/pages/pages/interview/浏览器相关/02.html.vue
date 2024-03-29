<template><div><h1 id="谈谈-javascript-中的类型转换机制" tabindex="-1"><a class="header-anchor" href="#谈谈-javascript-中的类型转换机制" aria-hidden="true">#</a> 谈谈 JavaScript 中的类型转换机制</h1>
<h2 id="一、概述" tabindex="-1"><a class="header-anchor" href="#一、概述" aria-hidden="true">#</a> 一、概述</h2>
<p>前面我们讲到，<code v-pre>JS</code>中有六种简单数据类型：<code v-pre>undefined</code>、<code v-pre>null</code>、<code v-pre>boolean</code>、<code v-pre>string</code>、<code v-pre>number</code>、<code v-pre>symbol</code>，以及引用类型：<code v-pre>object</code></p>
<p>但是我们在声明的时候只有一种数据类型，只有到运行期间才会确定当前类型</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> x <span class="token operator">=</span> y <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> a<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>x</code>的值在编译阶段是无法获取的，只有等到程序运行时才能知道</p>
<p>虽然变量的数据类型是不确定的，但是各种运算符对数据类型是有要求的，如果运算子的类型与预期不符合，就会触发类型转换机制</p>
<p>常见的类型转换有：</p>
<ul>
<li>强制转换（显示转换）</li>
<li>自动转换（隐式转换）</li>
</ul>
<h2 id="二、显示转换" tabindex="-1"><a class="header-anchor" href="#二、显示转换" aria-hidden="true">#</a> 二、显示转换</h2>
<p>显示转换，即我们很清楚可以看到这里发生了类型的转变，常见的方法有：</p>
<ul>
<li>Number()</li>
<li>parseInt()</li>
<li>String()</li>
<li>Boolean()</li>
</ul>
<h3 id="number" tabindex="-1"><a class="header-anchor" href="#number" aria-hidden="true">#</a> Number()</h3>
<p>将任意类型的值转化为数值</p>
<p>先给出类型转换规则：</p>
<p><img src="https://static.vue-js.com/915b7300-6692-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>实践一下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">Number</span><span class="token punctuation">(</span><span class="token number">324</span><span class="token punctuation">)</span> <span class="token comment">// 324</span>

<span class="token comment">// 字符串：如果可以被解析为数值，则转换为相应的数值</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">'324'</span><span class="token punctuation">)</span> <span class="token comment">// 324</span>

<span class="token comment">// 字符串：如果不可以被解析为数值，返回 NaN</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">'324abc'</span><span class="token punctuation">)</span> <span class="token comment">// NaN</span>

<span class="token comment">// 空字符串转为0</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span> <span class="token comment">// 0</span>

<span class="token comment">// 布尔值：true 转成 1，false 转成 0</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token comment">// 1</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token comment">// 0</span>

<span class="token comment">// undefined：转成 NaN</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token comment">// NaN</span>

<span class="token comment">// null：转成0</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// 0</span>

<span class="token comment">// 对象：通常转换成NaN(除了只包含单个数值的数组)</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// NaN</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// NaN</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面可以看到，<code v-pre>Number</code>转换的时候是很严格的，只要有一个字符无法转成数值，整个字符串就会被转为<code v-pre>NaN</code></p>
<h3 id="parseint" tabindex="-1"><a class="header-anchor" href="#parseint" aria-hidden="true">#</a> parseInt()</h3>
<p><code v-pre>parseInt</code>相比<code v-pre>Number</code>，就没那么严格了，<code v-pre>parseInt</code>函数逐个解析字符，遇到不能转换的字符就停下来</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">'32a3'</span><span class="token punctuation">)</span> <span class="token comment">//32</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="string" tabindex="-1"><a class="header-anchor" href="#string" aria-hidden="true">#</a> String()</h3>
<p>可以将任意类型的值转化成字符串</p>
<p>给出转换规则图：</p>
<p><img src="https://static.vue-js.com/48dd8eb0-6692-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>实践一下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 数值：转为相应的字符串</span>
<span class="token function">String</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// "1"</span>

<span class="token comment">//字符串：转换后还是原来的值</span>
<span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">)</span> <span class="token comment">// "a"</span>

<span class="token comment">//布尔值：true转为字符串"true"，false转为字符串"false"</span>
<span class="token function">String</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token comment">// "true"</span>

<span class="token comment">//undefined：转为字符串"undefined"</span>
<span class="token function">String</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token comment">// "undefined"</span>

<span class="token comment">//null：转为字符串"null"</span>
<span class="token function">String</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// "null"</span>

<span class="token comment">//对象</span>
<span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// "[object Object]"</span>
<span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// "1,2,3"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="boolean" tabindex="-1"><a class="header-anchor" href="#boolean" aria-hidden="true">#</a> Boolean()</h3>
<p>可以将任意类型的值转为布尔值，转换规则如下：</p>
<p><img src="https://static.vue-js.com/53bdad10-6692-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>实践一下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token number">NaN</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Boolean</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、隐式转换" tabindex="-1"><a class="header-anchor" href="#三、隐式转换" aria-hidden="true">#</a> 三、隐式转换</h2>
<p>在隐式转换中，我们可能最大的疑惑是 ：何时发生隐式转换？</p>
<p>我们这里可以归纳为两种情况发生隐式转换的场景：</p>
<ul>
<li>比较运算（<code v-pre>==</code>、<code v-pre>!=</code>、<code v-pre>&gt;</code>、<code v-pre>&lt;</code>）、<code v-pre>if</code>、<code v-pre>while</code>需要布尔值地方</li>
<li>算术运算（<code v-pre>+</code>、<code v-pre>-</code>、<code v-pre>*</code>、<code v-pre>/</code>、<code v-pre>%</code>）</li>
</ul>
<p>除了上面的场景，还要求运算符两边的操作数不是同一类型</p>
<h3 id="自动转换为布尔值" tabindex="-1"><a class="header-anchor" href="#自动转换为布尔值" aria-hidden="true">#</a> 自动转换为布尔值</h3>
<p>在需要布尔值的地方，就会将非布尔值的参数自动转为布尔值，系统内部会调用<code v-pre>Boolean</code>函数</p>
<p>可以得出个小结：</p>
<ul>
<li>undefined</li>
<li>null</li>
<li>false</li>
<li>+0</li>
<li>-0</li>
<li>NaN</li>
<li>&quot;&quot;</li>
</ul>
<p>除了上面几种会被转化成<code v-pre>false</code>，其他都换被转化成<code v-pre>true</code></p>
<h3 id="自动转换成字符串" tabindex="-1"><a class="header-anchor" href="#自动转换成字符串" aria-hidden="true">#</a> 自动转换成字符串</h3>
<p>遇到预期为字符串的地方，就会将非字符串的值自动转为字符串</p>
<p>具体规则是：先将复合类型的值转为原始类型的值，再将原始类型的值转为字符串</p>
<p>常发生在<code v-pre>+</code>运算中，一旦存在字符串，则会进行字符串拼接操作</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token string">'5'</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token comment">// '51'</span>
<span class="token string">'5'</span> <span class="token operator">+</span> <span class="token boolean">true</span> <span class="token comment">// "5true"</span>
<span class="token string">'5'</span> <span class="token operator">+</span> <span class="token boolean">false</span> <span class="token comment">// "5false"</span>
<span class="token string">'5'</span> <span class="token operator">+</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// "5[object Object]"</span>
<span class="token string">'5'</span> <span class="token operator">+</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// "5"</span>
<span class="token string">'5'</span> <span class="token operator">+</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// "5function (){}"</span>
<span class="token string">'5'</span> <span class="token operator">+</span> <span class="token keyword">undefined</span> <span class="token comment">// "5undefined"</span>
<span class="token string">'5'</span> <span class="token operator">+</span> <span class="token keyword">null</span> <span class="token comment">// "5null"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自动转换成数值" tabindex="-1"><a class="header-anchor" href="#自动转换成数值" aria-hidden="true">#</a> 自动转换成数值</h3>
<p>除了<code v-pre>+</code>有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token string">'5'</span> <span class="token operator">-</span> <span class="token string">'2'</span> <span class="token comment">// 3</span>
<span class="token string">'5'</span> <span class="token operator">*</span> <span class="token string">'2'</span> <span class="token comment">// 10</span>
<span class="token boolean">true</span> <span class="token operator">-</span> <span class="token number">1</span>  <span class="token comment">// 0</span>
<span class="token boolean">false</span> <span class="token operator">-</span> <span class="token number">1</span> <span class="token comment">// -1</span>
<span class="token string">'1'</span> <span class="token operator">-</span> <span class="token number">1</span>   <span class="token comment">// 0</span>
<span class="token string">'5'</span> <span class="token operator">*</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>    <span class="token comment">// 0</span>
<span class="token boolean">false</span> <span class="token operator">/</span> <span class="token string">'5'</span> <span class="token comment">// 0</span>
<span class="token string">'abc'</span> <span class="token operator">-</span> <span class="token number">1</span>   <span class="token comment">// NaN</span>
<span class="token keyword">null</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token comment">// 1</span>
<span class="token keyword">undefined</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token comment">// NaN</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>null</code>转为数值时，值为<code v-pre>0</code> 。<code v-pre>undefined</code>转为数值时，值为<code v-pre>NaN</code></p>
</div></template>


