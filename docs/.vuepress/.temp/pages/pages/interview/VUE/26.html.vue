<template><div><h1 id="v-model和-sync" tabindex="-1"><a class="header-anchor" href="#v-model和-sync" aria-hidden="true">#</a> v-model和.sync</h1>
<p>一般来说 v-model 指令在表单及元素上创建双向数据绑定,但 v-model 本质是语法糖, 也可以用在自定义的组件中。另一个与v-model有相似功能的双向绑定语法糖就是 .sync修饰符。在这里就两者的使用进行一下总结:</p>
<p>相同点：都是语法糖，都可以实现父子组件中的数据的双向通信。</p>
<p>.sync与v-model区别是</p>
<ol>
<li>区别点：格式不同： <code v-pre>v-model=&quot;num&quot;, :num.sync=&quot;num&quot;</code></li>
<li>原理不同： (1) v-model： @input + value (2) :num.sync: @update:num</li>
<li>在vue2中，v-model只能用一次；.sync可以有多个。在vue3中，v-model可以支持多次使用了，同时也移除了.sync。</li>
</ol>
<h2 id="v-model" tabindex="-1"><a class="header-anchor" href="#v-model" aria-hidden="true">#</a> v-model</h2>
<ol>
<li>作用 v-model是用来对表单元素做双向绑定，例如，<code v-pre>&lt;input&gt;</code>、<code v-pre>&lt;textarea&gt;</code>及 <code v-pre>&lt;select&gt;</code> 等等。 例如:</li>
</ol>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>value<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>   //这里的v-model里面的value可以直接获取到用户的输入值
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> son <span class="token keyword">from</span> <span class="token string">'@/yanshi/son.vue'</span>
 <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token punctuation">{</span>
     <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">''</span>    <span class="token comment">//这里定义的value变量可以直接将上面获取到的值进行操作</span>
   <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们在input输入框里面输入了某个在值的时候,下面就可以直接获取到我们的输入值,而不需要操作dom元素进行获取</p>
<h2 id="v-model的本质" tabindex="-1"><a class="header-anchor" href="#v-model的本质" aria-hidden="true">#</a> v-model的本质</h2>
<p>v-model的本质上来说,是一个语法糖 目前咱们习惯性的写法是这样的: <code v-pre>&lt;input v-model=&quot;val&quot; type=&quot;text&quot;&gt;</code></p>
<p>但是实质上的完整写法: <code v-pre>&lt;input :value=&quot;val&quot; @input=&quot;val=$event.target.value&quot; /&gt;</code></p>
<p>也可以将@input后面写成一个函数,然后在methods中进行赋值操作。</p>
<h2 id="自定义组件的v-model用法" tabindex="-1"><a class="header-anchor" href="#自定义组件的v-model用法" aria-hidden="true">#</a> 自定义组件的v-model用法</h2>
<p>这里需要用到父子传值的相关知识:</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
  <span class="token operator">&lt;</span>div<span class="token operator">></span>
    <span class="token operator">&lt;</span>son v<span class="token operator">-</span>model<span class="token operator">=</span><span class="token string">"num"</span><span class="token operator">/</span><span class="token operator">></span> 
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span>使用子组件<span class="token operator">--</span><span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">import</span> son <span class="token keyword">from</span> <span class="token string">'@/son.vue'</span>   <span class="token comment">//引入子组件</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    son    <span class="token comment">//注册子组件</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">num</span><span class="token operator">:</span> <span class="token number">100</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里先定义了一个father组件和一个son组件,并且将son组件引入到father组件中,并且给son组件绑定了v-model进行了传值。</p>
<p>此时,我们需要到son组件中接收这个值并且使用.子组件中使用$emit()方法，抛出事件,并传值</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
      <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

<span class="token operator">&lt;</span>template<span class="token operator">></span>
  <span class="token operator">&lt;</span>div<span class="token operator">></span>
    <span class="token literal-property property">我是son组件里面接收到的值</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> value <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token operator">&lt;</span>button @click<span class="token operator">=</span><span class="token string">"$emit('input',value+1)"</span><span class="token operator">></span>点我value<span class="token operator">+</span><span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样的话,就可以完成父子组件之间的数据双向绑定效果,并且不会出现报错</p>
<h2 id="sync修饰符" tabindex="-1"><a class="header-anchor" href="#sync修饰符" aria-hidden="true">#</a> .sync修饰符</h2>
<ol>
<li>.sync修饰符作用 相比较与v-model来说,sync修饰符就简单很多了: .sync修饰符可以实现子组件与父组件的双向绑定，并且可以实现子组件同步修改父组件的值。</li>
<li>.sync修饰符本质</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>正常父传子： 
<span class="token operator">&lt;</span>son <span class="token operator">:</span>a<span class="token operator">=</span><span class="token string">"num"</span> <span class="token operator">:</span>b<span class="token operator">=</span><span class="token string">"num2"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>son<span class="token operator">></span>

加上sync之后父传子： 
<span class="token operator">&lt;</span>son <span class="token operator">:</span>a<span class="token punctuation">.</span>sync<span class="token operator">=</span><span class="token string">"num"</span> <span class="token punctuation">.</span>b<span class="token punctuation">.</span>sync<span class="token operator">=</span><span class="token string">"num2"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>son<span class="token operator">></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它等价于</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>son
  <span class="token operator">:</span>a<span class="token operator">=</span><span class="token string">"num"</span> @update<span class="token operator">:</span>a<span class="token operator">=</span><span class="token string">"val=>num=val"</span>
  <span class="token operator">:</span>b<span class="token operator">=</span><span class="token string">"num2"</span> @update<span class="token operator">:</span>b<span class="token operator">=</span><span class="token string">"val=>num2=val"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>son<span class="token operator">></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相当于多了一个事件监听，事件名是 <code v-pre>update:a</code>，回调函数中，会把接收到的值赋值给属性绑定的数据项中。</p>
<p>这里面的传值与接收与正常的父向子传值没有区别,唯一的区别在于往回传值的时候$emit所调用的事件名必须是<code v-pre>update:属性名</code></p>
</div></template>


