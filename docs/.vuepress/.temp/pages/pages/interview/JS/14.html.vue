<template><div><h1 id="javascript-字符串的常用方法有哪些" tabindex="-1"><a class="header-anchor" href="#javascript-字符串的常用方法有哪些" aria-hidden="true">#</a> JavaScript 字符串的常用方法有哪些？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<ul>
<li>indexOf: 查询某个字符下标，一般用于判断字符串中是否包含某些字符</li>
<li>split: 切割字符串，返回值是切割后的新数组</li>
<li>substring: 截取字符串，返回值是截取后的字符串</li>
<li>replace: 替换字符串，返回值是替换后的新字符串</li>
<li>toLowerCase ： 转小写</li>
<li>toUpperCase ： 转大写</li>
</ul>
<h2 id="操作方法" tabindex="-1"><a class="header-anchor" href="#操作方法" aria-hidden="true">#</a> 操作方法</h2>
<p>我们也可将字符串常用的操作方法归纳为增、删、改、查，需要知道字符串的特点是一旦创建了，就不可变</p>
<h3 id="增" tabindex="-1"><a class="header-anchor" href="#增" aria-hidden="true">#</a> 增</h3>
<p>这里增的意思并不是说直接增添内容，而是创建字符串的一个副本，再进行操作</p>
<p>除了常用<code v-pre>+</code>以及<code v-pre>${}</code>进行字符串拼接之外，还可通过<code v-pre>concat</code></p>
<h4 id="concat" tabindex="-1"><a class="header-anchor" href="#concat" aria-hidden="true">#</a> concat</h4>
<p>用于将一个或多个字符串拼接成一个新字符串</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> stringValue <span class="token operator">=</span> <span class="token string">'hello '</span>
<span class="token keyword">let</span> result <span class="token operator">=</span> stringValue<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">'world'</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span> <span class="token comment">// "hello world"</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stringValue<span class="token punctuation">)</span> <span class="token comment">// "hello"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删" tabindex="-1"><a class="header-anchor" href="#删" aria-hidden="true">#</a> 删</h3>
<p>这里的删的意思并不是说删除原字符串的内容，而是创建字符串的一个副本，再进行操作</p>
<p>常见的有：</p>
<ul>
<li>slice()</li>
<li>substr()</li>
<li>substring()</li>
</ul>
<p>这三个方法都返回调用它们的字符串的一个子字符串，而且都接收一或两个参数。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> stringValue <span class="token operator">=</span> <span class="token string">'hello world'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stringValue<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// "lo world"</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stringValue<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// "lo world"</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stringValue<span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// "lo world"</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stringValue<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// "lo w"</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stringValue<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// "lo w"</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stringValue<span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// "lo worl"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="改" tabindex="-1"><a class="header-anchor" href="#改" aria-hidden="true">#</a> 改</h3>
<p>这里改的意思也不是改变原字符串，而是创建字符串的一个副本，再进行操作</p>
<p>常见的有：</p>
<ul>
<li>
<p>trim()、trimLeft()、trimRight()</p>
</li>
<li>
<p>repeat()</p>
</li>
<li>
<p>padStart()、padEnd()</p>
</li>
<li>
<p>toLowerCase()、 toUpperCase()</p>
</li>
</ul>
<h4 id="trim-、trimleft-、trimright" tabindex="-1"><a class="header-anchor" href="#trim-、trimleft-、trimright" aria-hidden="true">#</a> trim()、trimLeft()、trimRight()</h4>
<p>删除前、后或前后所有空格符，再返回新的字符串</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> stringValue <span class="token operator">=</span> <span class="token string">' hello world '</span>
<span class="token keyword">let</span> trimmedStringValue <span class="token operator">=</span> stringValue<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stringValue<span class="token punctuation">)</span> <span class="token comment">// " hello world "</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>trimmedStringValue<span class="token punctuation">)</span> <span class="token comment">// "hello world"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="repeat" tabindex="-1"><a class="header-anchor" href="#repeat" aria-hidden="true">#</a> repeat()</h4>
<p>接收一个整数参数，表示要将字符串复制多少次，然后返回拼接所有副本后的结果</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> stringValue <span class="token operator">=</span> <span class="token string">'na '</span>
<span class="token keyword">let</span> copyResult <span class="token operator">=</span> stringValue<span class="token punctuation">.</span><span class="token function">repeat</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// na na</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="padend" tabindex="-1"><a class="header-anchor" href="#padend" aria-hidden="true">#</a> padEnd()</h4>
<p>复制字符串，如果小于指定长度，则在相应一边填充字符，直至满足长度条件</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> stringValue <span class="token operator">=</span> <span class="token string">'foo'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stringValue<span class="token punctuation">.</span><span class="token function">padStart</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// " foo"</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stringValue<span class="token punctuation">.</span><span class="token function">padStart</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> <span class="token string">'.'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// "......foo"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tolowercase-、-touppercase" tabindex="-1"><a class="header-anchor" href="#tolowercase-、-touppercase" aria-hidden="true">#</a> toLowerCase()、 toUpperCase()</h3>
<p>大小写转化</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> stringValue <span class="token operator">=</span> <span class="token string">'hello world'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stringValue<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// "HELLO WORLD"</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stringValue<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// "hello world"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查" tabindex="-1"><a class="header-anchor" href="#查" aria-hidden="true">#</a> 查</h3>
<p>除了通过索引的方式获取字符串的值，还可通过：</p>
<ul>
<li>
<p>chatAt()</p>
</li>
<li>
<p>indexOf()</p>
</li>
<li>
<p>startWith()</p>
</li>
<li>
<p>includes()</p>
</li>
</ul>
<h4 id="charat" tabindex="-1"><a class="header-anchor" href="#charat" aria-hidden="true">#</a> charAt()</h4>
<p>返回给定索引位置的字符，由传给方法的整数参数指定</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> message <span class="token operator">=</span> <span class="token string">'abcde'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// "c"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="indexof" tabindex="-1"><a class="header-anchor" href="#indexof" aria-hidden="true">#</a> indexOf()</h4>
<p>从字符串开头去搜索传入的字符串，并返回位置（如果没找到，则返回 -1 ）</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> stringValue <span class="token operator">=</span> <span class="token string">'hello world'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stringValue<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'o'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="startwith-、includes" tabindex="-1"><a class="header-anchor" href="#startwith-、includes" aria-hidden="true">#</a> startWith()、includes()</h4>
<p>从字符串中搜索传入的字符串，并返回一个表示是否包含的布尔值</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> message <span class="token operator">=</span> <span class="token string">'foobarbaz'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">'bar'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">'bar'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">'qux'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、转换方法" tabindex="-1"><a class="header-anchor" href="#二、转换方法" aria-hidden="true">#</a> 二、转换方法</h2>
<h3 id="split" tabindex="-1"><a class="header-anchor" href="#split" aria-hidden="true">#</a> split</h3>
<p>把字符串按照指定的分割符，拆分成数组中的每一项</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> str <span class="token operator">=</span> <span class="token string">'12+23+34'</span>
<span class="token keyword">let</span> arr <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">'+'</span><span class="token punctuation">)</span> <span class="token comment">// [12,23,34]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、模板匹配方法" tabindex="-1"><a class="header-anchor" href="#三、模板匹配方法" aria-hidden="true">#</a> 三、模板匹配方法</h2>
<p>针对正则表达式，字符串设计了几个方法：</p>
<ul>
<li>match()</li>
<li>search()</li>
<li>replace()</li>
</ul>
<h3 id="match" tabindex="-1"><a class="header-anchor" href="#match" aria-hidden="true">#</a> match()</h3>
<p>接收一个参数，可以是一个正则表达式字符串，也可以是一个<code v-pre>RegExp</code>对象，返回数组</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> text <span class="token operator">=</span> <span class="token string">'cat, bat, sat, fat'</span>
<span class="token keyword">let</span> pattern <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">.at</span><span class="token regex-delimiter">/</span></span>
<span class="token keyword">let</span> matches <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>pattern<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>matches<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// "cat"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="search" tabindex="-1"><a class="header-anchor" href="#search" aria-hidden="true">#</a> search()</h3>
<p>接收一个参数，可以是一个正则表达式字符串，也可以是一个<code v-pre>RegExp</code>对象，找到则返回匹配索引，否则返回 -1</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> text <span class="token operator">=</span> <span class="token string">'cat, bat, sat, fat'</span>
<span class="token keyword">let</span> pos <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">at</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>pos<span class="token punctuation">)</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="replace" tabindex="-1"><a class="header-anchor" href="#replace" aria-hidden="true">#</a> replace()</h3>
<p>接收两个参数，第一个参数为匹配的内容，第二个参数为替换的元素（可用函数）</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> text <span class="token operator">=</span> <span class="token string">'cat, bat, sat, fat'</span>
<span class="token keyword">let</span> result <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">'at'</span><span class="token punctuation">,</span> <span class="token string">'ond'</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span> <span class="token comment">// "cond, bat, sat, fat"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


