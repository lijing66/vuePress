<template><div><h1 id="说说react-jsx转换成真实dom过程" tabindex="-1"><a class="header-anchor" href="#说说react-jsx转换成真实dom过程" aria-hidden="true">#</a> 说说React Jsx转换成真实DOM过程？</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><code v-pre>react</code>通过将组件编写的<code v-pre>JSX</code>映射到屏幕，以及组件中的状态发生了变化之后 <code v-pre>React</code>会将这些「变化」更新到屏幕上</p>
<p>在前面文章了解中，<code v-pre>JSX</code>通过<code v-pre>babel</code>最终转化成<code v-pre>React.createElement</code>这种形式，例如：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>div<span class="token operator">></span>
  <span class="token operator">&lt;</span> img src<span class="token operator">=</span><span class="token string">"avatar.png"</span> className<span class="token operator">=</span><span class="token string">"profile"</span> <span class="token operator">/</span><span class="token operator">></span>
  <span class="token operator">&lt;</span>Hello <span class="token operator">/</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会被<code v-pre>bebel</code>转化成如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>
  <span class="token string">"div"</span><span class="token punctuation">,</span>
  <span class="token keyword">null</span><span class="token punctuation">,</span>
  React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"img"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">src</span><span class="token operator">:</span> <span class="token string">"avatar.png"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">className</span><span class="token operator">:</span> <span class="token string">"profile"</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>Hello<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在转化过程中，<code v-pre>babel</code>在编译时会判断 JSX 中组件的首字母：</p>
<ul>
<li>
<p>当首字母为小写时，其被认定为原生 <code v-pre>DOM</code> 标签，<code v-pre>createElement</code> 的第一个变量被编译为字符串</p>
</li>
<li>
<p>当首字母为大写时，其被认定为自定义组件，createElement 的第一个变量被编译为对象</p>
</li>
</ul>
<p>最终都会通过<code v-pre>RenderDOM.render(...)</code>方法进行挂载，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>App <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">,</span>  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"root"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="二、过程" tabindex="-1"><a class="header-anchor" href="#二、过程" aria-hidden="true">#</a> 二、过程</h2>
<p>在<code v-pre>react</code>中，节点大致可以分成四个类别：</p>
<ul>
<li>原生标签节点</li>
<li>文本节点</li>
<li>函数组件</li>
<li>类组件</li>
</ul>
<p>如下所示：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">ClassComponent</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> defaultProps <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">"pink"</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"border"</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>h3<span class="token operator">></span>ClassComponent<span class="token operator">&lt;</span><span class="token operator">/</span>h3<span class="token operator">></span>
        <span class="token operator">&lt;</span>p className<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>color<span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p <span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">FunctionComponent</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"border"</span><span class="token operator">></span>
      FunctionComponent
      <span class="token operator">&lt;</span>p<span class="token operator">></span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p <span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> jsx <span class="token operator">=</span> <span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"border"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>p<span class="token operator">></span>xx<span class="token operator">&lt;</span><span class="token operator">/</span>p <span class="token operator">></span>
    <span class="token operator">&lt;</span> a href<span class="token operator">=</span><span class="token string">" "</span><span class="token operator">></span>xxx<span class="token operator">&lt;</span><span class="token operator">/</span> a<span class="token operator">></span>
    <span class="token operator">&lt;</span>FunctionComponent name<span class="token operator">=</span><span class="token string">"函数组件"</span> <span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>ClassComponent name<span class="token operator">=</span><span class="token string">"类组件"</span> color<span class="token operator">=</span><span class="token string">"red"</span> <span class="token operator">/</span><span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些类别最终都会被转化成<code v-pre>React.createElement</code>这种形式</p>
<p><code v-pre>React.createElement</code>其被调用时会传⼊标签类型<code v-pre>type</code>，标签属性<code v-pre>props</code>及若干子元素<code v-pre>children</code>，作用是生成一个虚拟<code v-pre>Dom</code>对象，如下所示：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createElement</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> config<span class="token punctuation">,</span> <span class="token operator">...</span>children</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">delete</span> config<span class="token punctuation">.</span>__self<span class="token punctuation">;</span>
        <span class="token keyword">delete</span> config<span class="token punctuation">.</span>__source<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ! 源码中做了详细处理，⽐如过滤掉key、ref等</span>
    <span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>config<span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> children<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">child</span> <span class="token operator">=></span>
   <span class="token keyword">typeof</span> child <span class="token operator">===</span> <span class="token string">"object"</span> <span class="token operator">?</span> child <span class="token operator">:</span> <span class="token function">createTextNode</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        type<span class="token punctuation">,</span>
        props
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">createTextNode</span><span class="token punctuation">(</span><span class="token parameter">text</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token constant">TEXT</span><span class="token punctuation">,</span>
        <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token literal-property property">nodeValue</span><span class="token operator">:</span> text
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    createElement
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>createElement</code>会根据传入的节点信息进行一个判断：</p>
<ul>
<li>如果是原生标签节点， type 是字符串，如div、span</li>
<li>如果是文本节点， type就没有，这里是 TEXT</li>
<li>如果是函数组件，type 是函数名</li>
<li>如果是类组件，type 是类名</li>
</ul>
<p>虚拟<code v-pre>DOM</code>会通过<code v-pre>ReactDOM.render</code>进行渲染成真实<code v-pre>DOM</code>，使用方法如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> container<span class="token punctuation">[</span><span class="token punctuation">,</span> callback<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当首次调用时，容器节点里的所有 <code v-pre>DOM</code> 元素都会被替换，后续的调用则会使用 <code v-pre>React</code> 的 <code v-pre>diff</code>算法进行高效的更新</p>
<p>如果提供了可选的回调函数<code v-pre>callback</code>，该回调将在组件被渲染或更新之后被执行</p>
<p><code v-pre>render</code>大致实现方法如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"vnode"</span><span class="token punctuation">,</span> vnode<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 虚拟DOM对象</span>
    <span class="token comment">// vnode _> node</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token function">createNode</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> container<span class="token punctuation">)</span><span class="token punctuation">;</span>
    container<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 创建真实DOM节点</span>
<span class="token keyword">function</span> <span class="token function">createNode</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> parentNode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> node <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span>type<span class="token punctuation">,</span> props<span class="token punctuation">}</span> <span class="token operator">=</span> vnode<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token constant">TEXT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        node <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> type <span class="token operator">===</span> <span class="token string">"string"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        node <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> type <span class="token operator">===</span> <span class="token string">"function"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        node <span class="token operator">=</span> type<span class="token punctuation">.</span>isReactComponent
            <span class="token operator">?</span> <span class="token function">updateClassComponent</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> parentNode<span class="token punctuation">)</span>
        <span class="token operator">:</span> <span class="token function">updateFunctionComponent</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> parentNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        node <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createDocumentFragment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">reconcileChildren</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>children<span class="token punctuation">,</span> node<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">updateNode</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> props<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> node<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 遍历下子vnode，然后把子vnode->真实DOM节点，再插入父node中</span>
<span class="token keyword">function</span> <span class="token function">reconcileChildren</span><span class="token punctuation">(</span><span class="token parameter">children<span class="token punctuation">,</span> node</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> child <span class="token operator">=</span> children<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> child<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">render</span><span class="token punctuation">(</span>child<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">,</span> node<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token function">render</span><span class="token punctuation">(</span>child<span class="token punctuation">,</span> node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">updateNode</span><span class="token punctuation">(</span><span class="token parameter">node<span class="token punctuation">,</span> nextVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>nextVal<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">k</span> <span class="token operator">=></span> k <span class="token operator">!==</span> <span class="token string">"children"</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">k</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>k<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">"on"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> eventName <span class="token operator">=</span> k<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLocaleLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            node<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>eventName<span class="token punctuation">,</span> nextVal<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            node<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">=</span> nextVal<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 返回真实dom节点</span>
<span class="token comment">// 执行函数</span>
<span class="token keyword">function</span> <span class="token function">updateFunctionComponent</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> parentNode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span>type<span class="token punctuation">,</span> props<span class="token punctuation">}</span> <span class="token operator">=</span> vnode<span class="token punctuation">;</span>
    <span class="token keyword">let</span> vvnode <span class="token operator">=</span> <span class="token function">type</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token function">createNode</span><span class="token punctuation">(</span>vvnode<span class="token punctuation">,</span> parentNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> node<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 返回真实dom节点</span>
<span class="token comment">// 先实例化，再执行render函数</span>
<span class="token keyword">function</span> <span class="token function">updateClassComponent</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> parentNode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span>type<span class="token punctuation">,</span> props<span class="token punctuation">}</span> <span class="token operator">=</span> vnode<span class="token punctuation">;</span>
    <span class="token keyword">let</span> cmp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">type</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> vvnode <span class="token operator">=</span> cmp<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token function">createNode</span><span class="token punctuation">(</span>vvnode<span class="token punctuation">,</span> parentNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> node<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    render
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p>在<code v-pre>react</code>源码中，虚拟<code v-pre>Dom</code>转化成真实<code v-pre>Dom</code>整体流程如下图所示：</p>
<p><img src="https://static.vue-js.com/28824fa0-f00a-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>其渲染流程如下所示：</p>
<ul>
<li>使用React.createElement或JSX编写React组件，实际上所有的 JSX 代码最后都会转换成React.createElement(...) ，Babel帮助我们完成了这个转换的过程。</li>
<li>createElement函数对key和ref等特殊的props进行处理，并获取defaultProps对默认props进行赋值，并且对传入的孩子节点进行处理，最终构造成一个虚拟DOM对象</li>
<li>ReactDOM.render将生成好的虚拟DOM渲染到指定容器上，其中采用了批处理、事务等机制并且对特定浏览器进行了性能优化，最终转换为真实DOM</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://bbs.huaweicloud.com/blogs/265503)</li>
<li>https://huang-qing.github.io/react/2019/05/29/React-VirDom/</li>
<li>https://segmentfault.com/a/1190000018891454</li>
</ul>
</div></template>


