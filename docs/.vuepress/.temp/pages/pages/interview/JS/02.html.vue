<template><div><h1 id="和-区别" tabindex="-1"><a class="header-anchor" href="#和-区别" aria-hidden="true">#</a> == 和 === 区别</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<ul>
<li>= : 一个等号为赋值操作</li>
<li>== :二个等号为判断,判断的是值是否相等,相等返回 true,不等返回 false</li>
<li>===: 三个等号为全等,判断的是值和类型是否相等,相等返回 true,不等返回 false</li>
</ul>
<h2 id="等于操作符" tabindex="-1"><a class="header-anchor" href="#等于操作符" aria-hidden="true">#</a> 等于操作符</h2>
<p>等于操作符用两个等于号（ == ）表示，如果操作数相等，则会返回 <code v-pre>true</code></p>
<p>前面文章，我们提到在<code v-pre>JavaScript</code>中存在隐式转换。等于操作符（==）在比较中会先进行类型转换，再确定操作数是否相等</p>
<p>遵循以下规则：</p>
<ol>
<li>如果任一操作数是布尔值，则将其转换为数值再比较是否相等</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> result1 <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token operator">==</span> <span class="token number">1</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>如果一个操作数是字符串，另一个操作数是数值，则尝试将字符串转换为数值，再比较是否相等</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> result1 <span class="token operator">=</span> <span class="token string">'55'</span> <span class="token operator">==</span> <span class="token number">55</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>如果一个操作数是对象，另一个操作数不是，则调用对象的 <code v-pre>valueOf()</code>方法取得其原始值，再根据前面的规则进行比较</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">valueOf</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">1</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> result1 <span class="token operator">=</span> obj <span class="token operator">==</span> <span class="token number">1</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li><code v-pre>null</code>和<code v-pre>undefined</code>相等</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> result1 <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token operator">==</span> <span class="token keyword">undefined</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5">
<li>如果有任一操作数是 <code v-pre>NaN</code> ，则相等操作符返回 <code v-pre>false</code></li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> result1 <span class="token operator">=</span> <span class="token number">NaN</span> <span class="token operator">==</span> <span class="token number">NaN</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="6">
<li>如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回<code v-pre>true</code></li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"xxx"</span><span class="token punctuation">}</span>
<span class="token keyword">let</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"xxx"</span><span class="token punctuation">}</span>
<span class="token keyword">let</span> result1 <span class="token operator">=</span> <span class="token punctuation">(</span>obj1 <span class="token operator">==</span> obj2 <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面进一步做个小结：</p>
<ul>
<li>
<p>两个都为简单类型，字符串和布尔值都会转换成数值，再比较</p>
</li>
<li>
<p>简单类型与引用类型比较，对象转化成其原始类型的值，再比较</p>
</li>
<li>
<p>两个都为引用类型，则比较它们是否指向同一个对象</p>
</li>
<li>
<p>null 和 undefined 相等</p>
</li>
<li>
<p>存在 NaN 则返回 false</p>
</li>
</ul>
<h2 id="全等操作符" tabindex="-1"><a class="header-anchor" href="#全等操作符" aria-hidden="true">#</a> 全等操作符</h2>
<p>全等操作符由 3 个等于号（ === ）表示，只有两个操作数在不转换的前提下相等才返回 <code v-pre>true</code>。即类型相同，值也需相同</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> result1 <span class="token operator">=</span> <span class="token string">'55'</span> <span class="token operator">===</span> <span class="token number">55</span> <span class="token comment">// false，不相等，因为数据类型不同</span>
<span class="token keyword">let</span> result2 <span class="token operator">=</span> <span class="token number">55</span> <span class="token operator">===</span> <span class="token number">55</span> <span class="token comment">// true，相等，因为数据类型相同值也相同</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>undefined</code> 和 <code v-pre>null</code> 与自身严格相等</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> result1 <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token comment">//true</span>
<span class="token keyword">let</span> result2 <span class="token operator">=</span> <span class="token keyword">undefined</span> <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token comment">//true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="区别" tabindex="-1"><a class="header-anchor" href="#区别" aria-hidden="true">#</a> 区别</h2>
<p>相等操作符（==）会做类型转换，再进行值的比较，全等运算符不会做类型转换</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> result1 <span class="token operator">=</span> <span class="token string">'55'</span> <span class="token operator">===</span> <span class="token number">55</span> <span class="token comment">// false，不相等，因为数据类型不同</span>
<span class="token keyword">let</span> result2 <span class="token operator">=</span> <span class="token number">55</span> <span class="token operator">===</span> <span class="token number">55</span> <span class="token comment">// true，相等，因为数据类型相同值也相同</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>null</code> 和 <code v-pre>undefined</code> 比较，相等操作符（==）为<code v-pre>true</code>，全等为<code v-pre>false</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> result1 <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token operator">==</span> <span class="token keyword">undefined</span> <span class="token comment">// true</span>
<span class="token keyword">let</span> result2 <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3>
<p>相等运算符隐藏的类型转换，会带来一些违反直觉的结果</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token string">''</span> <span class="token operator">==</span> <span class="token string">'0'</span> <span class="token comment">// false</span>
<span class="token number">0</span> <span class="token operator">==</span> <span class="token string">''</span> <span class="token comment">// true</span>
<span class="token number">0</span> <span class="token operator">==</span> <span class="token string">'0'</span> <span class="token comment">// true</span>

<span class="token boolean">false</span> <span class="token operator">==</span> <span class="token string">'false'</span> <span class="token comment">// false</span>
<span class="token boolean">false</span> <span class="token operator">==</span> <span class="token string">'0'</span> <span class="token comment">// true</span>

<span class="token boolean">false</span> <span class="token operator">==</span> <span class="token keyword">undefined</span> <span class="token comment">// false</span>
<span class="token boolean">false</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token comment">// false</span>
<span class="token keyword">null</span> <span class="token operator">==</span> <span class="token keyword">undefined</span> <span class="token comment">// true</span>

<span class="token string">' \t\r\n'</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但在比较<code v-pre>null</code>的情况的时候，我们一般使用相等操作符<code v-pre>==</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>obj<span class="token punctuation">.</span>x <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span> <span class="token comment">//执行</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等同于下面写法</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>x <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> obj<span class="token punctuation">.</span>x <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用相等操作符（==）的写法明显更加简洁了</p>
<p>所以，除了在比较对象属性为<code v-pre>null</code>或者<code v-pre>undefined</code>的情况下，我们可以使用相等操作符（==），其他情况建议一律使用全等操作符（===）</p>
<h2 id="a-1-a-2-a-3" tabindex="-1"><a class="header-anchor" href="#a-1-a-2-a-3" aria-hidden="true">#</a> a==1&amp;&amp;a==2&amp;&amp;a==3</h2>
<p>这是一道面试题，目标是让<code v-pre>a==1&amp;&amp;a==2&amp;&amp;a==3</code>成立。注意这里是两个等号，</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span> <span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// a.valueOf = function() {</span>
<span class="token comment">//     return this.value += 1;</span>
<span class="token comment">// };</span>
a<span class="token punctuation">.</span><span class="token function-variable function">toString</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">+=</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token operator">==</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> a<span class="token operator">==</span><span class="token number">2</span> <span class="token operator">&amp;&amp;</span> a<span class="token operator">==</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>a</code>是一个对象，判断a的值时，对象到数字的转换： 1、如果对象具有valueOf( )方法，后者返回一个原始值，则JavaScript将这个原始值转换为数字（如果需要的话）并返回这个数字。 2、否则，如果对象具有toString( )方法，后者返回一个原始值，则JavaScript将其转化并返回。 3、否则，JavaScript抛出一个类型错误异常。</p>
<h2 id="a-1-a-2-a-3-1" tabindex="-1"><a class="header-anchor" href="#a-1-a-2-a-3-1" aria-hidden="true">#</a> a===1&amp;&amp;a===2&amp;&amp;a===3</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> value <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">//window.value</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>window<span class="token punctuation">,</span> <span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token operator">===</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> a<span class="token operator">===</span><span class="token number">2</span> <span class="token operator">&amp;&amp;</span> a<span class="token operator">===</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


