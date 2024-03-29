<template><div><h1 id="说说react的事件机制" tabindex="-1"><a class="header-anchor" href="#说说react的事件机制" aria-hidden="true">#</a> 说说React的事件机制？</h1>
<p><img src="https://static.vue-js.com/f054f080-d86f-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><code v-pre>React</code>基于浏览器的事件机制自身实现了一套事件机制，包括事件注册、事件的合成、事件冒泡、事件派发等</p>
<p>在<code v-pre>React</code>中这套事件机制被称之为合成事件</p>
<h4 id="合成事件-syntheticevent" tabindex="-1"><a class="header-anchor" href="#合成事件-syntheticevent" aria-hidden="true">#</a> 合成事件（SyntheticEvent）</h4>
<p>合成事件是 <code v-pre>React</code>模拟原生 <code v-pre>DOM</code>事件所有能力的一个事件对象，即浏览器原生事件的跨浏览器包装器</p>
<p>根据 <code v-pre>W3C</code>规范来定义合成事件，兼容所有浏览器，拥有与浏览器原生事件相同的接口，例如：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> button <span class="token operator">=</span> <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>handleClick<span class="token punctuation">}</span><span class="token operator">></span>按钮<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果想要获得原生<code v-pre>DOM</code>事件，可以通过<code v-pre>e.nativeEvent</code>属性获取</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>nativeEvent<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> button <span class="token operator">=</span> <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>handleClick<span class="token punctuation">}</span><span class="token operator">></span>按钮<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面可以看到<code v-pre>React</code>事件和原生事件也非常的相似，但也有一定的区别：</p>
<ul>
<li>事件名称命名方式不同</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 原生事件绑定方式</span>
<span class="token operator">&lt;</span>button onclick<span class="token operator">=</span><span class="token string">"handleClick()"</span><span class="token operator">></span>按钮命名<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
      
<span class="token comment">// React 合成事件绑定方式</span>
<span class="token keyword">const</span> button <span class="token operator">=</span> <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>handleClick<span class="token punctuation">}</span><span class="token operator">></span>按钮命名<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>事件处理函数书写不同</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 原生事件 事件处理函数写法</span>
<span class="token operator">&lt;</span>button onclick<span class="token operator">=</span><span class="token string">"handleClick()"</span><span class="token operator">></span>按钮命名<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
      
<span class="token comment">// React 合成事件 事件处理函数写法</span>
<span class="token keyword">const</span> button <span class="token operator">=</span> <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>handleClick<span class="token punctuation">}</span><span class="token operator">></span>按钮命名<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然<code v-pre>onclick</code>看似绑定到<code v-pre>DOM</code>元素上，但实际并不会把事件代理函数直接绑定到真实的节点上，而是把所有的事件绑定到结构的最外层，使用一个统一的事件去监听</p>
<p>这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象</p>
<p>当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。这样做简化了事件处理和回收机制，效率也有很大提升</p>
<h2 id="二、执行顺序" tabindex="-1"><a class="header-anchor" href="#二、执行顺序" aria-hidden="true">#</a> 二、执行顺序</h2>
<p>关于<code v-pre>React</code>合成事件与原生事件执行顺序，可以看看下面一个例子：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span>  React  <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span><span class="token punctuation">{</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>parentRef <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>childRef <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"React componentDidMount！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>parentRef<span class="token punctuation">.</span>current<span class="token operator">?.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"原生事件：父元素 DOM 事件监听！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>childRef<span class="token punctuation">.</span>current<span class="token operator">?.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"原生事件：子元素 DOM 事件监听！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"原生事件：document DOM 事件监听！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function-variable function">parentClickFun</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"React 事件：父元素事件监听！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token function-variable function">childClickFun</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"React 事件：子元素事件监听！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>div ref<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>parentRef<span class="token punctuation">}</span> onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>parentClickFun<span class="token punctuation">}</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>div ref<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>childRef<span class="token punctuation">}</span> onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>childClickFun<span class="token punctuation">}</span><span class="token operator">></span>
          分析事件执行顺序
        <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出顺序为：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>原生事件：子元素 <span class="token constant">DOM</span> 事件监听！ 
原生事件：父元素 <span class="token constant">DOM</span> 事件监听！ 
React 事件：子元素事件监听！ 
React 事件：父元素事件监听！ 
原生事件：document <span class="token constant">DOM</span> 事件监听！ 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以得出以下结论：</p>
<ul>
<li>React 所有事件都挂载在 document 对象上</li>
<li>当真实 DOM 元素触发事件，会冒泡到 document 对象后，再处理 React 事件</li>
<li>所以会先执行原生事件，然后处理 React 事件</li>
<li>最后真正执行 document 上挂载的事件</li>
</ul>
<p>对应过程如图所示：</p>
<p><img src="https://static.vue-js.com/08e22ff0-d870-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>所以想要阻止不同时间段的冒泡行为，对应使用不同的方法，对应如下：</p>
<ul>
<li>
<p>阻止合成事件间的冒泡，用e.stopPropagation()</p>
</li>
<li>
<p>阻止合成事件与最外层 document 上的事件间的冒泡，用e.nativeEvent.stopImmediatePropagation()</p>
</li>
<li>
<p>阻止合成事件与除最外层document上的原生事件上的冒泡，通过判断e.target来避免</p>
</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token parameter">e</span> <span class="token operator">=></span> <span class="token punctuation">{</span>   
    <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>target <span class="token operator">&amp;&amp;</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token string">'div.code'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
        <span class="token keyword">return</span><span class="token punctuation">;</span>    
    <span class="token punctuation">}</span>    
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>   <span class="token literal-property property">active</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p><code v-pre>React</code>事件机制总结如下：</p>
<ul>
<li>React 上注册的事件最终会绑定在document这个 DOM 上，而不是 React 组件对应的 DOM(减少内存开销就是因为所有的事件都绑定在 document 上，其他节点没有绑定事件)</li>
<li>React 自身实现了一套事件冒泡机制，所以这也就是为什么我们 event.stopPropagation()无效的原因。</li>
<li>React 通过队列的形式，从触发的组件向父组件回溯，然后调用他们 JSX 中定义的 callback</li>
<li>React 有一套自己的合成事件 SyntheticEvent</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zh-hans.reactjs.org/docs/events.html</li>
<li>https://segmentfault.com/a/1190000015725214?utm_source=sf-similar-article</li>
<li>https://segmentfault.com/a/1190000038251163</li>
</ul>
</div></template>


