<template><div><h1 id="接口的理解-应用场景" tabindex="-1"><a class="header-anchor" href="#接口的理解-应用场景" aria-hidden="true">#</a> 接口的理解？应用场景？</h1>
<h2 id="ts-的接口" tabindex="-1"><a class="header-anchor" href="#ts-的接口" aria-hidden="true">#</a> ts 的接口</h2>
<p>interface, 一般用来定义对象的类型。 例如：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要点</p>
<ul>
<li>属性
<ul>
<li>可选属性 ?修饰</li>
<li>只读属性 readonly 修饰</li>
</ul>
</li>
<li>继承。一个接口可以继承自另一个或者多个接口，关键字 extends</li>
</ul>
<h2 id="接口是什么" tabindex="-1"><a class="header-anchor" href="#接口是什么" aria-hidden="true">#</a> 接口是什么</h2>
<p><strong>接口</strong>是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的<strong>类</strong>去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法</p>
<p>简单来讲，一个接口所描述的是一个对象相关的属性和方法，但并不提供具体创建此对象实例的方法</p>
<p><code v-pre>typescript</code>的核心功能之一就是对类型做检测，虽然这种检测方式是“鸭式辨型法”，而接口的作用就是为为这些类型命名和为你的代码或第三方代码定义一个约定</p>
<h2 id="二、使用方式" tabindex="-1"><a class="header-anchor" href="#二、使用方式" aria-hidden="true">#</a> 二、使用方式</h2>
<p>接口定义如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">interface_name</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例如有一个函数，这个函数接受一个 <code v-pre>User</code> 对象，然后返回这个 <code v-pre>User</code> 对象的 <code v-pre>name</code> 属性:</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">getUserName</span> <span class="token operator">=</span> <span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token operator">=></span> user<span class="token punctuation">.</span>name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以看到，参数需要有一个<code v-pre>user</code>的<code v-pre>name</code>属性，可以通过接口描述<code v-pre>user</code>参数的结构</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">getUserName</span> <span class="token operator">=</span> <span class="token punctuation">(</span>user<span class="token operator">:</span> User<span class="token punctuation">)</span> <span class="token operator">=></span> user<span class="token punctuation">.</span>name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些属性并不一定全部实现，上述传入的对象必须拥有<code v-pre>name</code>和<code v-pre>age</code>属性，否则<code v-pre>typescript</code>在编译阶段会报错，如下图：</p>
<p><img src="https://static.vue-js.com/25d3a790-0b2b-11ec-a752-75723a64e8f5.png" alt=""></p>
<p>如果不想要<code v-pre>age</code>属性的话，这时候可以采用<strong>可选属性</strong>，如下表示：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span>
  age<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候<code v-pre>age</code>属性则可以是<code v-pre>number</code>类型或者<code v-pre>undefined</code>类型</p>
<p>有些时候，我们想要一个属性变成只读属性，在<code v-pre>typescript</code>只需要使用<code v-pre>readonly</code>声明，如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span>
  age<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token keyword">readonly</span> isMale<span class="token operator">:</span> <span class="token builtin">boolean</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们修改属性的时候，就会出现警告，如下所示：</p>
<p><img src="https://static.vue-js.com/2f6d3c30-0b2b-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>这是属性中有一个函数，可以如下表示：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span>
  age<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token keyword">readonly</span> isMale<span class="token operator">:</span> <span class="token builtin">boolean</span>
  <span class="token function-variable function">say</span><span class="token operator">:</span> <span class="token punctuation">(</span>words<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果传递的对象不仅仅是上述的属性，这时候可以使用：</p>
<ul>
<li>类型推断</li>
</ul>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">getUserName</span> <span class="token operator">=</span> <span class="token punctuation">(</span>user<span class="token operator">:</span> User<span class="token punctuation">)</span> <span class="token operator">=></span> user<span class="token punctuation">.</span>name
<span class="token function">getUserName</span><span class="token punctuation">(</span><span class="token punctuation">{</span>color<span class="token operator">:</span> <span class="token string">'yellow'</span><span class="token punctuation">}</span> <span class="token keyword">as</span> User<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>给接口添加字符串<strong>索引签名</strong></li>
</ul>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token punctuation">[</span>propName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">any</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接口还能实现继承，如下图：</p>
<p><img src="https://static.vue-js.com/38a41760-0b2b-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>也可以继承多个，父类通过逗号隔开，如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Father</span> <span class="token punctuation">{</span>
  color<span class="token operator">:</span> String
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Mother</span> <span class="token punctuation">{</span>
  height<span class="token operator">:</span> Number
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Son</span> <span class="token keyword">extends</span> <span class="token class-name">Father</span><span class="token punctuation">,</span> Mother <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span>
  age<span class="token operator">:</span> Number
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、应用场景" tabindex="-1"><a class="header-anchor" href="#三、应用场景" aria-hidden="true">#</a> 三、应用场景</h2>
<p>例如在<code v-pre>javascript</code>中定义一个函数，用来获取用户的姓名和年龄：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">getUserInfo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token keyword">return</span> name<span class="token operator">:</span> $<span class="token punctuation">{</span>user<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token punctuation">,</span> age<span class="token operator">:</span> $<span class="token punctuation">{</span>user<span class="token punctuation">.</span>age<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果多人开发的都需要用到这个函数的时候，如果没有注释，则可能出现各种运行时的错误，这时候就可以使用接口定义参数变量：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// 先定义一个接口</span>
<span class="token keyword">interface</span> <span class="token class-name">IUser</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> getUserInfo <span class="token operator">=</span> <span class="token punctuation">(</span>user<span class="token operator">:</span> IUser<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">name: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>user<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, age: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>user<span class="token punctuation">.</span>age<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
<span class="token punctuation">}</span>

<span class="token comment">// 正确的调用</span>
<span class="token function">getUserInfo</span><span class="token punctuation">(</span><span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'koala'</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">18</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>包括后面讲到类的时候也会应用到接口</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://www.tslang.cn/docs/handbook/interfaces.html</li>
</ul>
</div></template>


