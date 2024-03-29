<template><div><h1 id="说说你对闭包的理解-闭包使用场景" tabindex="-1"><a class="header-anchor" href="#说说你对闭包的理解-闭包使用场景" aria-hidden="true">#</a> 说说你对闭包的理解？闭包使用场景</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>闭包是一个可以访问其他函数内部变量的函数，主要作用是解决变量污染问题，也可以用来延长局部变量的生命周期。闭包在 js 中使用比较多，几乎是无处不在的。一般大多数情况下，在回调函数中闭包用的是最多的。</p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><img src="https://static.vue-js.com/c141a030-6a7a-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）</p>
<p>也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域</p>
<p>在 <code v-pre>JavaScript</code>中，每当创建一个函数，闭包就会在函数创建的同时被创建出来，作为函数内部与外部连接起来的一座桥梁</p>
<p>下面给出一个简单的例子</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'Mozilla'</span> <span class="token comment">// name 是一个被 init 创建的局部变量</span>
  <span class="token keyword">function</span> <span class="token function">displayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// displayName() 是内部函数，一个闭包</span>
    <span class="token function">alert</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token comment">// 使用了父函数中声明的变量</span>
  <span class="token punctuation">}</span>
  <span class="token function">displayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>displayName()</code> 没有自己的局部变量。然而，由于闭包的特性，它可以访问到外部函数的变量</p>
<h2 id="二、使用场景" tabindex="-1"><a class="header-anchor" href="#二、使用场景" aria-hidden="true">#</a> 二、使用场景</h2>
<p>任何闭包的使用场景都离不开这两点：</p>
<ul>
<li>创建私有变量</li>
<li>延长变量的生命周期</li>
</ul>
<blockquote>
<p>一般函数的词法环境在函数返回后就被销毁，但是闭包会保存对创建时所在词法环境的引用，即便创建时所在的执行上下文被销毁，但创建时所在词法环境依然存在，以达到延长变量的生命周期的目的</p>
</blockquote>
<p>下面举个例子：</p>
<p>在页面上添加一些可以调整字号的按钮</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">makeSizer</span><span class="token punctuation">(</span><span class="token parameter">size</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>style<span class="token punctuation">.</span>fontSize <span class="token operator">=</span> size <span class="token operator">+</span> <span class="token string">'px'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> size12 <span class="token operator">=</span> <span class="token function">makeSizer</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> size14 <span class="token operator">=</span> <span class="token function">makeSizer</span><span class="token punctuation">(</span><span class="token number">14</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> size16 <span class="token operator">=</span> <span class="token function">makeSizer</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span>

document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'size-12'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>onclick <span class="token operator">=</span> size12
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'size-14'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>onclick <span class="token operator">=</span> size14
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'size-16'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>onclick <span class="token operator">=</span> size16
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="柯里化函数" tabindex="-1"><a class="header-anchor" href="#柯里化函数" aria-hidden="true">#</a> 柯里化函数</h3>
<p>柯里化的目的在于避免频繁调用具有相同参数函数的同时，又能够轻松的重用</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 假设我们有一个求长方形面积的函数</span>
<span class="token keyword">function</span> <span class="token function">getArea</span><span class="token punctuation">(</span><span class="token parameter">width<span class="token punctuation">,</span> height</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> width <span class="token operator">*</span> height
<span class="token punctuation">}</span>
<span class="token comment">// 如果我们碰到的长方形的宽老是10</span>
<span class="token keyword">const</span> area1 <span class="token operator">=</span> <span class="token function">getArea</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> area2 <span class="token operator">=</span> <span class="token function">getArea</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> area3 <span class="token operator">=</span> <span class="token function">getArea</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">)</span>

<span class="token comment">// 我们可以使用闭包柯里化这个计算面积的函数</span>
<span class="token keyword">function</span> <span class="token function">getArea</span><span class="token punctuation">(</span><span class="token parameter">width</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">height</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> width <span class="token operator">*</span> height
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> getTenWidthArea <span class="token operator">=</span> <span class="token function">getArea</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
<span class="token comment">// 之后碰到宽度为10的长方形就可以这样计算面积</span>
<span class="token keyword">const</span> area1 <span class="token operator">=</span> <span class="token function">getTenWidthArea</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>

<span class="token comment">// 而且如果遇到宽度偶尔变化也可以轻松复用</span>
<span class="token keyword">const</span> getTwentyWidthArea <span class="token operator">=</span> <span class="token function">getArea</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用闭包模拟私有方法" tabindex="-1"><a class="header-anchor" href="#使用闭包模拟私有方法" aria-hidden="true">#</a> 使用闭包模拟私有方法</h3>
<p>在<code v-pre>JavaScript</code>中，没有支持声明私有变量，但我们可以使用闭包来模拟私有方法</p>
<p>下面举个例子：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> Counter <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> privateCounter <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">function</span> <span class="token function">changeBy</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    privateCounter <span class="token operator">+=</span> val
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">increment</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">changeBy</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">decrement</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">changeBy</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">value</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> privateCounter
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> Counter1 <span class="token operator">=</span> <span class="token function">makeCounter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> Counter2 <span class="token operator">=</span> <span class="token function">makeCounter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Counter1<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">/* logs 0 */</span>
Counter1<span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
Counter1<span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Counter1<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">/* logs 2 */</span>
Counter1<span class="token punctuation">.</span><span class="token function">decrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Counter1<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">/* logs 1 */</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Counter2<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">/* logs 0 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述通过使用闭包来定义公共函数，并令其可以访问私有函数和变量，这种方式也叫模块方式</p>
<p>两个计数器 <code v-pre>Counter1</code> 和 <code v-pre>Counter2</code> 是维护它们各自的独立性的，每次调用其中一个计数器时，通过改变这个变量的值，会改变这个闭包的词法环境，不会影响另一个闭包中的变量</p>
<h3 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h3>
<p>例如计数器、延迟调用、回调等闭包的应用，其核心思想还是创建私有变量和延长变量的生命周期</p>
<h2 id="三、注意事项" tabindex="-1"><a class="header-anchor" href="#三、注意事项" aria-hidden="true">#</a> 三、注意事项</h2>
<p>如果不是某些特定任务需要使用闭包，在其它函数中创建函数是不明智的，因为闭包在处理速度和内存消耗方面对脚本性能具有负面影响</p>
<p>例如，在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。</p>
<p>原因在于每个对象的创建，方法都会被重新赋值</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">MyObject</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> message</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>message <span class="token operator">=</span> message<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">getName</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name
  <span class="token punctuation">}</span>

  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">getMessage</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>message
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码中，我们并没有利用到闭包的好处，因此可以避免使用闭包。修改成如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">MyObject</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> message</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>message <span class="token operator">=</span> message<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token class-name">MyObject</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getName</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name
<span class="token punctuation">}</span>
<span class="token class-name">MyObject</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getMessage</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>message
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


