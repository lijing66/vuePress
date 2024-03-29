<template><div><h1 id="枚举类型" tabindex="-1"><a class="header-anchor" href="#枚举类型" aria-hidden="true">#</a> 枚举类型</h1>
<h2 id="枚举类型-1" tabindex="-1"><a class="header-anchor" href="#枚举类型-1" aria-hidden="true">#</a> 枚举类型</h2>
<p>枚举是组织收集有关联变量的一种方式 ,每个枚举成员都有一个 name 和一个 value。数字枚举成员值的默认类型是 number 类型</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">enum</span> Color <span class="token punctuation">{</span>
  Red<span class="token punctuation">,</span> <span class="token comment">// 默认情况下，第一个枚举值是 0，然后每个后续值依次递增 1</span>
  Green<span class="token punctuation">,</span>
  Blue
<span class="token punctuation">}</span>
<span class="token keyword">let</span> col <span class="token operator">=</span> Color<span class="token punctuation">.</span>Red<span class="token punctuation">;</span>
col <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 有效的，这也是 Color.Red</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><img src="https://static.vue-js.com/76173bf0-0b0c-11ec-a752-75723a64e8f5.png" alt=""></p>
<p>枚举是一个被命名的整型常数的集合，用于声明一组命名的常数,当一个变量有几种可能的取值时,可以将它定义为枚举类型</p>
<p>通俗来说，枚举就是一个对象的所有可能取值的集合</p>
<p>在日常生活中也很常见，例如表示星期的 SUNDAY、MONDAY、TUESDAY、WEDNESDAY、THURSDAY、FRIDAY、SATURDAY 就可以看成是一个枚举</p>
<p>枚举的说明与结构和联合相似，其形式为：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">enum</span> 枚举名<span class="token punctuation">{</span>
    标识符①<span class="token punctuation">[</span><span class="token operator">=</span>整型常数<span class="token punctuation">]</span><span class="token punctuation">,</span>
    标识符②<span class="token punctuation">[</span><span class="token operator">=</span>整型常数<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token operator">...</span>
    标识符<span class="token constant">N</span><span class="token punctuation">[</span><span class="token operator">=</span>整型常数<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>枚举变量<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、使用" tabindex="-1"><a class="header-anchor" href="#二、使用" aria-hidden="true">#</a> 二、使用</h2>
<p>枚举的使用是通过<code v-pre>enum</code>关键字进行定义，形式如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">enum</span> xxx <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>声明关键字为枚举类型的方式如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// 声明d为枚举类型Direction</span>
<span class="token keyword">let</span> d<span class="token operator">:</span> Direction
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>类型可以分成：</p>
<ul>
<li>
<p>数字枚举</p>
</li>
<li>
<p>字符串枚举</p>
</li>
<li>
<p>异构枚举</p>
</li>
</ul>
<h3 id="数字枚举" tabindex="-1"><a class="header-anchor" href="#数字枚举" aria-hidden="true">#</a> 数字枚举</h3>
<p>当我们声明一个枚举类型是,虽然没有给它们赋值,但是它们的值其实是默认的数字类型,而且默认从 0 开始依次累加:</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">enum</span> Direction <span class="token punctuation">{</span>
  Up<span class="token punctuation">,</span> <span class="token comment">// 值默认为 0</span>
  Down<span class="token punctuation">,</span> <span class="token comment">// 值默认为 1</span>
  Left<span class="token punctuation">,</span> <span class="token comment">// 值默认为 2</span>
  Right<span class="token punctuation">,</span> <span class="token comment">// 值默认为 3</span>
<span class="token punctuation">}</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Direction<span class="token punctuation">.</span>Up <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Direction<span class="token punctuation">.</span>Down <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Direction<span class="token punctuation">.</span>Left <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Direction<span class="token punctuation">.</span>Right <span class="token operator">===</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们将第一个值进行赋值后，后面的值也会根据前一个值进行累加 1：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">enum</span> Direction <span class="token punctuation">{</span>
  Up <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">,</span>
  Down<span class="token punctuation">,</span>
  Left<span class="token punctuation">,</span>
  Right<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Direction<span class="token punctuation">.</span>Up<span class="token punctuation">,</span> Direction<span class="token punctuation">.</span>Down<span class="token punctuation">,</span> Direction<span class="token punctuation">.</span>Left<span class="token punctuation">,</span> Direction<span class="token punctuation">.</span>Right<span class="token punctuation">)</span> <span class="token comment">// 10 11 12 13</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字符串枚举" tabindex="-1"><a class="header-anchor" href="#字符串枚举" aria-hidden="true">#</a> 字符串枚举</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>枚举类型的值其实也可以是字符串类型：

<span class="token keyword">enum</span> Direction <span class="token punctuation">{</span>
    Up <span class="token operator">=</span> <span class="token string">'Up'</span><span class="token punctuation">,</span>
    Down <span class="token operator">=</span> <span class="token string">'Down'</span><span class="token punctuation">,</span>
    Left <span class="token operator">=</span> <span class="token string">'Left'</span><span class="token punctuation">,</span>
    Right <span class="token operator">=</span> <span class="token string">'Right'</span>
<span class="token punctuation">}</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Direction<span class="token punctuation">[</span><span class="token string">'Right'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> Direction<span class="token punctuation">.</span>Up<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Right Up</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果设定了一个变量为字符串之后，后续的字段也需要赋值字符串，否则报错：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">enum</span> Direction <span class="token punctuation">{</span>
  Up <span class="token operator">=</span> <span class="token string">'UP'</span><span class="token punctuation">,</span>
  Down<span class="token punctuation">,</span> <span class="token comment">// error TS1061: Enum member must have initializer</span>
  Left<span class="token punctuation">,</span> <span class="token comment">// error TS1061: Enum member must have initializer</span>
  Right<span class="token punctuation">,</span> <span class="token comment">// error TS1061: Enum member must have initializer</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="异构枚举" tabindex="-1"><a class="header-anchor" href="#异构枚举" aria-hidden="true">#</a> 异构枚举</h3>
<p>即将数字枚举和字符串枚举结合起来混合起来使用，如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">enum</span> BooleanLikeHeterogeneousEnum <span class="token punctuation">{</span>
  No <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
  Yes <span class="token operator">=</span> <span class="token string">'YES'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常情况下我们很少会使用异构枚举</p>
<h3 id="本质" tabindex="-1"><a class="header-anchor" href="#本质" aria-hidden="true">#</a> 本质</h3>
<p>现在一个枚举的案例如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">enum</span> Direction <span class="token punctuation">{</span>
  Up<span class="token punctuation">,</span>
  Down<span class="token punctuation">,</span>
  Left<span class="token punctuation">,</span>
  Right<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过编译后，<code v-pre>javascript</code>如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">var</span> Direction
<span class="token punctuation">;</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>Direction<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Direction<span class="token punctuation">[</span><span class="token punctuation">(</span>Direction<span class="token punctuation">[</span><span class="token string">'Up'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'Up'</span>
  Direction<span class="token punctuation">[</span><span class="token punctuation">(</span>Direction<span class="token punctuation">[</span><span class="token string">'Down'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'Down'</span>
  Direction<span class="token punctuation">[</span><span class="token punctuation">(</span>Direction<span class="token punctuation">[</span><span class="token string">'Left'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'Left'</span>
  Direction<span class="token punctuation">[</span><span class="token punctuation">(</span>Direction<span class="token punctuation">[</span><span class="token string">'Right'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'Right'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>Direction <span class="token operator">||</span> <span class="token punctuation">(</span>Direction <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码可以看到， <code v-pre>Direction[Direction[&quot;Up&quot;] = 0] = &quot;Up&quot;</code>可以分成</p>
<ul>
<li>Direction[&quot;Up&quot;] = 0</li>
<li>Direction[0] = &quot;Up&quot;</li>
</ul>
<p>所以定义枚举类型后，可以通过正反映射拿到对应的值，如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">enum</span> Direction <span class="token punctuation">{</span>
  Up<span class="token punctuation">,</span>
  Down<span class="token punctuation">,</span>
  Left<span class="token punctuation">,</span>
  Right<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Direction<span class="token punctuation">.</span>Up <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Direction<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// Up</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并且多处定义的枚举是可以进行合并操作，如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">enum</span> Direction <span class="token punctuation">{</span>
  Up <span class="token operator">=</span> <span class="token string">'Up'</span><span class="token punctuation">,</span>
  Down <span class="token operator">=</span> <span class="token string">'Down'</span><span class="token punctuation">,</span>
  Left <span class="token operator">=</span> <span class="token string">'Left'</span><span class="token punctuation">,</span>
  Right <span class="token operator">=</span> <span class="token string">'Right'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">enum</span> Direction <span class="token punctuation">{</span>
  Center <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后，<code v-pre>js</code>代码如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">var</span> Direction
<span class="token punctuation">;</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>Direction<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Direction<span class="token punctuation">[</span><span class="token string">'Up'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'Up'</span>
  Direction<span class="token punctuation">[</span><span class="token string">'Down'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'Down'</span>
  Direction<span class="token punctuation">[</span><span class="token string">'Left'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'Left'</span>
  Direction<span class="token punctuation">[</span><span class="token string">'Right'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'Right'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>Direction <span class="token operator">||</span> <span class="token punctuation">(</span>Direction <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">;</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>Direction<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Direction<span class="token punctuation">[</span><span class="token punctuation">(</span>Direction<span class="token punctuation">[</span><span class="token string">'Center'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'Center'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>Direction <span class="token operator">||</span> <span class="token punctuation">(</span>Direction <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，<code v-pre>Direction</code>对象属性回叠加</p>
<h2 id="三、应用场景" tabindex="-1"><a class="header-anchor" href="#三、应用场景" aria-hidden="true">#</a> 三、应用场景</h2>
<p>就拿回生活的例子，后端返回的字段使用 0 - 6 标记对应的日期，这时候就可以使用枚举可提高代码可读性，如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">enum</span> Days <span class="token punctuation">{</span>
  Sun<span class="token punctuation">,</span>
  Mon<span class="token punctuation">,</span>
  Tue<span class="token punctuation">,</span>
  Wed<span class="token punctuation">,</span>
  Thu<span class="token punctuation">,</span>
  Fri<span class="token punctuation">,</span>
  Sat<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token string">'Sun'</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token string">'Mon'</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token string">'Tue'</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Days<span class="token punctuation">[</span><span class="token string">'Sat'</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">6</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>包括后端日常返回 0、1 等等状态的时候，我们都可以通过枚举去定义，这样可以提高代码的可读性，便于后续的维护</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zh.wikipedia.org/wiki/%E6%9E%9A%E4%B8%BE</li>
<li>https://www.jianshu.com/p/b9e1caa4dd98</li>
<li>https://juejin.cn/post/6844904112669065224#heading-30</li>
</ul>
</div></template>


