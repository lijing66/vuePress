<template><div><h1 id="watch和watcheffect" tabindex="-1"><a class="header-anchor" href="#watch和watcheffect" aria-hidden="true">#</a> watch和watchEffect</h1>
<p>watchEffect是Vue3提供的api,vue2中是没有的。它和watch的功能类似，都可以用来监听数据的变化，并执行回调。他们的区别有：</p>
<ol>
<li>执行时机：watchEffect会自动收集函数里面变量的响应式依赖。在初始化的时候watchEffect会自动执行一次（这是无法阻止的），之后watchEffect会根据收集到的响应式依赖，在变量发生改变时就会被触发。而watch是惰性地执行副作用，它不会立即执行，但可以配置 immediate，使其主动触发</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> <span class="token function">watchEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
       console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>test<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>
 <span class="token function">watch</span> <span class="token punctuation">(</span>test<span class="token punctuation">.</span>value<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span>oldval</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
       console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
 <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span> <span class="token literal-property property">immediate</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
 <span class="token comment">//效果差不多</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>
<p>参数不同：watchEffect只需要传递一个回调函数，不需要传递侦听的数据，它会在页面加载时主动执行一次，来收集依赖；而watch至少要有两个参数（第三个参数是配置项），第一个参数是侦听的数据，第二个参数是回调函数</p>
</li>
<li>
<p>watchEffect获取不到更改前的值；而watch可以同时获取更改前和更改后的值,能更具体的说明那些状态发生变化是触发侦听器的执行</p>
</li>
<li>
<p>watchEffect可以返回一个函数，用来手动停止监听</p>
</li>
</ol>
<h2 id="watcheffect的使用" tabindex="-1"><a class="header-anchor" href="#watcheffect的使用" aria-hidden="true">#</a> watchEffect的使用</h2>
<p>下面例子中watchEffect中只有name是响应式对像，它会在页面初始化的时候就执行一次用于收集name的响应式依赖，changeName事件被触发时，name被改变了，对应的就会触发watchEffect；当changeAge触发时，因为并没有在watchEffect中使用age，所以watchEffect没有收集到对应的响应式依赖，watchEffect就不会被触发。</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>{{ name }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>{{ age }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>changeName<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>修改name<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>changeAge<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>修改Age<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
 ​
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> watchEffect<span class="token punctuation">,</span> defineComponent<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vue"</span><span class="token punctuation">;</span>
 ​
<span class="token comment">//watchEffect：自动收集响应式依赖，默认初始化就会执行一次</span>
<span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">"小花"</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> age <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span>
 ​
<span class="token function">watchEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"name:"</span><span class="token punctuation">,</span> name<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token function-variable function">changeName</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> name<span class="token punctuation">.</span>value <span class="token operator">+=</span> <span class="token string">"花"</span>
<span class="token keyword">const</span> <span class="token function-variable function">changeAge</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> age<span class="token punctuation">.</span>value <span class="token operator">+=</span> <span class="token number">1</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="停止监听" tabindex="-1"><a class="header-anchor" href="#停止监听" aria-hidden="true">#</a> 停止监听</h2>
<p>wacthEffect会返回一个函数，这个函数可用于停止所有的wacthEffect的侦听。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> stop <span class="token operator">=</span> <span class="token function">watchEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"userInfo:"</span><span class="token punctuation">,</span> name<span class="token punctuation">.</span>value<span class="token punctuation">,</span>age<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
 ​
<span class="token keyword">const</span> <span class="token function-variable function">changeName</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> name<span class="token punctuation">.</span>value <span class="token operator">+=</span> <span class="token string">"花"</span>
<span class="token keyword">const</span> <span class="token function-variable function">changeAge</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
   age<span class="token punctuation">.</span>value <span class="token operator">+=</span> <span class="token number">1</span>
   <span class="token comment">// 当 age > 18 时停止侦听</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span>age<span class="token punctuation">.</span>value <span class="token operator">></span> <span class="token number">18</span><span class="token punctuation">)</span> <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最新修改: 8/11/2023, 11:51:39 AM</p>
<p>希望对你有帮助</p>
<p>← <a href="/interview/vue/24.html" target="_blank" rel="noopener noreferrer">24Vue3性能提升主要是通过哪几方面体现的<ExternalLinkIcon/></a> <a href="/interview/vue/26.html" target="_blank" rel="noopener noreferrer">26v-model和sync<ExternalLinkIcon/></a> →</p>
</div></template>


