<template><div><h1 id="数组的常用方法有哪些" tabindex="-1"><a class="header-anchor" href="#数组的常用方法有哪些" aria-hidden="true">#</a> 数组的常用方法有哪些？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>数组的方法有很多，大概分为以下几类</p>
<ul>
<li>遍历方法
<ul>
<li>map: 遍历数组，并做一一映射，得到一个新数组</li>
<li>forEach：遍历数组，没有返回值</li>
<li>filter:筛选数组，保留符合要求的元素</li>
<li>some:判断数组是否有元素满足条件（相当于逻辑或：一真则真，全假为假）</li>
<li>every:判断数组是否所有满足都满足条件（相当于逻辑与：一假则假，全真为真）</li>
<li>find:查找满足条件的第一个元素</li>
<li>findIndex:查找满足条件的第一个元素的下标</li>
<li>reduce:给数组每一个元素执行一次回调，一般用于数组元素求和（也可以求最大值、最小值）</li>
</ul>
</li>
<li>增删改查方法
<ul>
<li>push() : 末尾新增元素，返回值是新数组长度</li>
<li>unshift():开头新增元素，返回值是新数组长度</li>
<li>pop() ：末尾删除元素，返回值是删除的那个末尾元素</li>
<li>shift()： 开头删除元素，返回值是开头的那个末尾元素</li>
<li>splice() : 删除指定下标元素，第三个参数是一个剩余参数，可以在删除的元素后面插入元素</li>
</ul>
</li>
<li>其他方法
<ul>
<li>reverse:翻转数组，会修改数组自身</li>
<li>sort: 数组排序，会修改数组自身</li>
<li>json: 拼接数组元素，返回值是拼接之后的字符串</li>
<li>slice: 根据下标范围查询数组元素，返回值是查询后的新数组</li>
<li>indexOf: 查询元素下标，一般用于元素是值类型</li>
</ul>
</li>
</ul>
<h2 id="操作方法" tabindex="-1"><a class="header-anchor" href="#操作方法" aria-hidden="true">#</a> 操作方法</h2>
<p>数组基本操作可以归纳为 增、删、改、查，需要留意的是哪些方法会对原数组产生影响，哪些方法不会</p>
<p>下面对数组常用的操作方法做一个归纳</p>
<h3 id="增" tabindex="-1"><a class="header-anchor" href="#增" aria-hidden="true">#</a> 增</h3>
<p>下面前三种是对原数组产生影响的增添方法，第四种则不会对原数组产生影响</p>
<ul>
<li>push() - 数组的尾部添加，影响原数组</li>
<li>unshift() - 数组的头部添加，影响原数组</li>
<li>splice() - 影响原数组</li>
<li>concat() - 不影响原数组</li>
</ul>
<h4 id="push" tabindex="-1"><a class="header-anchor" href="#push" aria-hidden="true">#</a> push()</h4>
<p><code v-pre>push()</code>方法接收任意数量的参数，并将它们添加到数组末尾，返回数组的最新长度</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// 创建一个数组</span>
<span class="token keyword">let</span> count <span class="token operator">=</span> colors<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'red'</span><span class="token punctuation">,</span> <span class="token string">'green'</span><span class="token punctuation">)</span> <span class="token comment">// 推入两项</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="unshift" tabindex="-1"><a class="header-anchor" href="#unshift" aria-hidden="true">#</a> unshift()</h4>
<p>unshift()在数组开头添加任意多个值，然后返回新的数组长度</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> colors <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 创建一个数组</span>
<span class="token keyword">let</span> count <span class="token operator">=</span> colors<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span><span class="token string">'red'</span><span class="token punctuation">,</span> <span class="token string">'green'</span><span class="token punctuation">)</span> <span class="token comment">// 从数组开头推入两项</span>
<span class="token function">alert</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="splice" tabindex="-1"><a class="header-anchor" href="#splice" aria-hidden="true">#</a> splice</h4>
<p>传入三个参数，分别是开始位置、0（要删除的元素数量）、插入的元素，返回空数组</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'red'</span><span class="token punctuation">,</span> <span class="token string">'green'</span><span class="token punctuation">,</span> <span class="token string">'blue'</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> removed <span class="token operator">=</span> colors<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">'yellow'</span><span class="token punctuation">,</span> <span class="token string">'orange'</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>colors<span class="token punctuation">)</span> <span class="token comment">// red,yellow,orange,green,blue</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>removed<span class="token punctuation">)</span> <span class="token comment">// []</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="concat" tabindex="-1"><a class="header-anchor" href="#concat" aria-hidden="true">#</a> concat()</h4>
<p>首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组，不会影响原始数组</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'red'</span><span class="token punctuation">,</span> <span class="token string">'green'</span><span class="token punctuation">,</span> <span class="token string">'blue'</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> colors2 <span class="token operator">=</span> colors<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">'yellow'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'black'</span><span class="token punctuation">,</span> <span class="token string">'brown'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>colors<span class="token punctuation">)</span> <span class="token comment">// ["red", "green","blue"]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>colors2<span class="token punctuation">)</span> <span class="token comment">// ["red", "green", "blue", "yellow", "black", "brown"]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删" tabindex="-1"><a class="header-anchor" href="#删" aria-hidden="true">#</a> 删</h3>
<p>下面三种都会影响原数组，最后一项不影响原数组：</p>
<ul>
<li>pop()： 删除数组的最后一项</li>
<li>shift()： 删除数组的第一项</li>
<li>splice()</li>
<li>slice()</li>
</ul>
<h4 id="pop" tabindex="-1"><a class="header-anchor" href="#pop" aria-hidden="true">#</a> pop()</h4>
<p><code v-pre>pop()</code> 方法用于删除数组的最后一项，同时减少数组的<code v-pre>length</code> 值，返回被删除的项</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'red'</span><span class="token punctuation">,</span> <span class="token string">'green'</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> item <span class="token operator">=</span> colors<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 取得最后一项</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token comment">// green</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>colors<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="shift" tabindex="-1"><a class="header-anchor" href="#shift" aria-hidden="true">#</a> shift()</h4>
<p><code v-pre>shift()</code>方法用于删除数组的第一项，同时减少数组的<code v-pre>length</code> 值，返回被删除的项</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'red'</span><span class="token punctuation">,</span> <span class="token string">'green'</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> item <span class="token operator">=</span> colors<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 取得第一项</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token comment">// red</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>colors<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="splice-1" tabindex="-1"><a class="header-anchor" href="#splice-1" aria-hidden="true">#</a> splice()</h4>
<p>传入两个参数，分别是开始位置，删除元素的数量，返回包含删除元素的数组</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'red'</span><span class="token punctuation">,</span> <span class="token string">'green'</span><span class="token punctuation">,</span> <span class="token string">'blue'</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> removed <span class="token operator">=</span> colors<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// 删除第一项</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>colors<span class="token punctuation">)</span> <span class="token comment">// green,blue</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>removed<span class="token punctuation">)</span> <span class="token comment">// red，只有一个元素的数组</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="slice" tabindex="-1"><a class="header-anchor" href="#slice" aria-hidden="true">#</a> slice()</h3>
<p>slice() 用于创建一个包含原有数组中一个或多个元素的新数组，不会影响原始数组</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'red'</span><span class="token punctuation">,</span> <span class="token string">'green'</span><span class="token punctuation">,</span> <span class="token string">'blue'</span><span class="token punctuation">,</span> <span class="token string">'yellow'</span><span class="token punctuation">,</span> <span class="token string">'purple'</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> colors2 <span class="token operator">=</span> colors<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> colors3 <span class="token operator">=</span> colors<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>colors<span class="token punctuation">)</span> <span class="token comment">// red,green,blue,yellow,purple</span>
concole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>colors2<span class="token punctuation">)</span> <span class="token comment">// green,blue,yellow,purple</span>
concole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>colors3<span class="token punctuation">)</span> <span class="token comment">// green,blue,yellow</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="改" tabindex="-1"><a class="header-anchor" href="#改" aria-hidden="true">#</a> 改</h4>
<p>即修改原来数组的内容，常用<code v-pre>splice</code></p>
<h4 id="splice-2" tabindex="-1"><a class="header-anchor" href="#splice-2" aria-hidden="true">#</a> splice()</h4>
<p>传入三个参数，分别是开始位置，要删除元素的数量，要插入的任意多个元素，返回删除元素的数组，对原数组产生影响</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'red'</span><span class="token punctuation">,</span> <span class="token string">'green'</span><span class="token punctuation">,</span> <span class="token string">'blue'</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> removed <span class="token operator">=</span> colors<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'red'</span><span class="token punctuation">,</span> <span class="token string">'purple'</span><span class="token punctuation">)</span> <span class="token comment">// 插入两个值，删除一个元素</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>colors<span class="token punctuation">)</span> <span class="token comment">// red,red,purple,blue</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>removed<span class="token punctuation">)</span> <span class="token comment">// green，只有一个元素的数组</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查" tabindex="-1"><a class="header-anchor" href="#查" aria-hidden="true">#</a> 查</h4>
<p>即查找元素，返回元素坐标或者元素值</p>
<ul>
<li>indexOf()</li>
<li>includes()</li>
<li>find()</li>
</ul>
<h4 id="indexof" tabindex="-1"><a class="header-anchor" href="#indexof" aria-hidden="true">#</a> indexOf()</h4>
<p>返回要查找的元素在数组中的位置，如果没找到则返回 -1</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> numbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
numbers<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token comment">// 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="includes" tabindex="-1"><a class="header-anchor" href="#includes" aria-hidden="true">#</a> includes()</h4>
<p>返回要查找的元素在数组中的位置，找到返回<code v-pre>true</code>，否则<code v-pre>false</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> numbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
numbers<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="find" tabindex="-1"><a class="header-anchor" href="#find" aria-hidden="true">#</a> find()</h4>
<p>返回第一个匹配的元素</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> people <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Matt'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">27</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Nicholas'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">29</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
people<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">element<span class="token punctuation">,</span> index<span class="token punctuation">,</span> array</span><span class="token punctuation">)</span> <span class="token operator">=></span> element<span class="token punctuation">.</span>age <span class="token operator">&lt;</span> <span class="token number">28</span><span class="token punctuation">)</span> <span class="token comment">// // {name: "Matt", age: 27}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="排序方法" tabindex="-1"><a class="header-anchor" href="#排序方法" aria-hidden="true">#</a> 排序方法</h2>
<p>数组有两个方法可以用来对元素重新排序：</p>
<ul>
<li>reverse()</li>
<li>sort()</li>
</ul>
<h3 id="reverse" tabindex="-1"><a class="header-anchor" href="#reverse" aria-hidden="true">#</a> reverse()</h3>
<p>顾名思义，将数组元素方向反转</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> values <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>
values<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">alert</span><span class="token punctuation">(</span>values<span class="token punctuation">)</span> <span class="token comment">// 5,4,3,2,1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sort" tabindex="-1"><a class="header-anchor" href="#sort" aria-hidden="true">#</a> sort()</h3>
<p>sort()方法接受一个比较函数，用于判断哪个值应该排在前面</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token parameter">value1<span class="token punctuation">,</span> value2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>value1 <span class="token operator">&lt;</span> value2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value1 <span class="token operator">></span> value2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">1</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">0</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> values <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">]</span>
values<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>compare<span class="token punctuation">)</span>
<span class="token function">alert</span><span class="token punctuation">(</span>values<span class="token punctuation">)</span> <span class="token comment">// 0,1,5,10,15</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、转换方法" tabindex="-1"><a class="header-anchor" href="#三、转换方法" aria-hidden="true">#</a> 三、转换方法</h2>
<p>常见的转换方法有：</p>
<h3 id="join" tabindex="-1"><a class="header-anchor" href="#join" aria-hidden="true">#</a> join()</h3>
<p>join() 方法接收一个参数，即字符串分隔符，返回包含所有项的字符串</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'red'</span><span class="token punctuation">,</span> <span class="token string">'green'</span><span class="token punctuation">,</span> <span class="token string">'blue'</span><span class="token punctuation">]</span>
<span class="token function">alert</span><span class="token punctuation">(</span>colors<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">','</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// red,green,blue</span>
<span class="token function">alert</span><span class="token punctuation">(</span>colors<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">'||'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// red||green||blue</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="迭代方法" tabindex="-1"><a class="header-anchor" href="#迭代方法" aria-hidden="true">#</a> 迭代方法</h2>
<p>常用来迭代数组的方法（都不改变原数组）有如下：</p>
<ul>
<li>some()</li>
<li>every()</li>
<li>forEach()</li>
<li>filter()</li>
<li>map()</li>
</ul>
<h3 id="some" tabindex="-1"><a class="header-anchor" href="#some" aria-hidden="true">#</a> some()</h3>
<p>对数组每一项都运行传入的测试函数，如果至少有 1 个元素返回 true ，则这个方法返回 true</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> numbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> someResult <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">some</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index<span class="token punctuation">,</span> array</span><span class="token punctuation">)</span> <span class="token operator">=></span> item <span class="token operator">></span> <span class="token number">2</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>someResult<span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="every" tabindex="-1"><a class="header-anchor" href="#every" aria-hidden="true">#</a> every()</h3>
<p>对数组每一项都运行传入的测试函数，如果所有元素都返回 true ，则这个方法返回 true</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> numbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> everyResult <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">every</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index<span class="token punctuation">,</span> array</span><span class="token punctuation">)</span> <span class="token operator">=></span> item <span class="token operator">></span> <span class="token number">2</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>everyResult<span class="token punctuation">)</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="foreach" tabindex="-1"><a class="header-anchor" href="#foreach" aria-hidden="true">#</a> forEach()</h3>
<p>对数组每一项都运行传入的函数，没有返回值</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> numbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
numbers<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index<span class="token punctuation">,</span> array</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 执行某些操作</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="filter" tabindex="-1"><a class="header-anchor" href="#filter" aria-hidden="true">#</a> filter()</h3>
<p>对数组每一项都运行传入的函数，函数返回 <code v-pre>true</code> 的项会组成数组之后返回</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> numbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> filterResult <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index<span class="token punctuation">,</span> array</span><span class="token punctuation">)</span> <span class="token operator">=></span> item <span class="token operator">></span> <span class="token number">2</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>filterResult<span class="token punctuation">)</span> <span class="token comment">// 3,4,5,4,3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> map()</h3>
<p>对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> numbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> mapResult <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index<span class="token punctuation">,</span> array</span><span class="token punctuation">)</span> <span class="token operator">=></span> item <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>mapResult<span class="token punctuation">)</span> <span class="token comment">// 2,4,6,8,10,8,6,4,2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


