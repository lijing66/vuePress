<template><div><h1 id="说说你对react-router的理解-常用的router组件有哪些" tabindex="-1"><a class="header-anchor" href="#说说你对react-router的理解-常用的router组件有哪些" aria-hidden="true">#</a> 说说你对React Router的理解？常用的Router组件有哪些？</h1>
<p><img src="https://static.vue-js.com/c6635670-e8ac-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><code v-pre>react-router</code>等前端路由的原理大致相同，可以实现无刷新的条件下切换显示不同的页面</p>
<p>路由的本质就是页面的<code v-pre>URL</code>发生改变时，页面的显示结果可以根据<code v-pre>URL</code>的变化而变化，但是页面不会刷新</p>
<p>因此，可以通过前端路由可以实现单页(SPA)应用</p>
<p><code v-pre>react-router</code>主要分成了几个不同的包：</p>
<ul>
<li>
<p>react-router: 实现了路由的核心功能</p>
</li>
<li>
<p>react-router-dom： 基于 react-router，加入了在浏览器运行环境下的一些功能</p>
</li>
<li>
<p>react-router-native：基于 react-router，加入了 react-native 运行环境下的一些功能</p>
</li>
<li>
<p>react-router-config: 用于配置静态路由的工具库</p>
</li>
</ul>
<h2 id="二、有哪些" tabindex="-1"><a class="header-anchor" href="#二、有哪些" aria-hidden="true">#</a> 二、有哪些</h2>
<p>这里主要讲述的是<code v-pre>react-router-dom</code>的常用<code v-pre>API</code>，主要是提供了一些组件：</p>
<ul>
<li>BrowserRouter、HashRouter</li>
<li>Route</li>
<li>Link、NavLink</li>
<li>switch</li>
<li>redirect</li>
</ul>
<h3 id="browserrouter、hashrouter" tabindex="-1"><a class="header-anchor" href="#browserrouter、hashrouter" aria-hidden="true">#</a> BrowserRouter、HashRouter</h3>
<p><code v-pre>Router</code>中包含了对路径改变的监听，并且会将相应的路径传递给子组件</p>
<p><code v-pre>BrowserRouter</code>是<code v-pre>history</code>模式，<code v-pre>HashRouter</code>模式</p>
<p>使用两者作为最顶层组件包裹其他组件</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> BrowserRouter <span class="token keyword">as</span> Router <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-router-dom"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>Router<span class="token operator">></span>
      <span class="token operator">&lt;</span>main<span class="token operator">></span>
        <span class="token operator">&lt;</span>nav<span class="token operator">></span>
          <span class="token operator">&lt;</span>ul<span class="token operator">></span>
            <span class="token operator">&lt;</span>li<span class="token operator">></span>
              <span class="token operator">&lt;</span> a href<span class="token operator">=</span><span class="token string">" "</span><span class="token operator">></span>Home<span class="token operator">&lt;</span><span class="token operator">/</span> a<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
            <span class="token operator">&lt;</span>li<span class="token operator">></span>
              <span class="token operator">&lt;</span> a href<span class="token operator">=</span><span class="token string">"/about"</span><span class="token operator">></span>About<span class="token operator">&lt;</span><span class="token operator">/</span> a<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
            <span class="token operator">&lt;</span>li<span class="token operator">></span>
              <span class="token operator">&lt;</span> a href<span class="token operator">=</span><span class="token string">"/contact"</span><span class="token operator">></span>Contact<span class="token operator">&lt;</span><span class="token operator">/</span> a<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
          <span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>nav<span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>main<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>Router<span class="token operator">></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="route" tabindex="-1"><a class="header-anchor" href="#route" aria-hidden="true">#</a> Route</h3>
<p><code v-pre>Route</code>用于路径的匹配，然后进行组件的渲染，对应的属性如下：</p>
<ul>
<li>path 属性：用于设置匹配到的路径</li>
<li>component 属性：设置匹配到路径后，渲染的组件</li>
<li>render 属性：设置匹配到路径后，渲染的内容</li>
<li>exact 属性：开启精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> BrowserRouter <span class="token keyword">as</span> Router<span class="token punctuation">,</span> Route <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-router-dom"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>Router<span class="token operator">></span>
      <span class="token operator">&lt;</span>main<span class="token operator">></span>
        <span class="token operator">&lt;</span>nav<span class="token operator">></span>
          <span class="token operator">&lt;</span>ul<span class="token operator">></span>
            <span class="token operator">&lt;</span>li<span class="token operator">></span>
              <span class="token operator">&lt;</span> a href<span class="token operator">=</span><span class="token string">"/"</span><span class="token operator">></span>Home<span class="token operator">&lt;</span><span class="token operator">/</span> a<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
            <span class="token operator">&lt;</span>li<span class="token operator">></span>
              <span class="token operator">&lt;</span> a href<span class="token operator">=</span><span class="token string">"/about"</span><span class="token operator">></span>About<span class="token operator">&lt;</span><span class="token operator">/</span> a<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
            <span class="token operator">&lt;</span>li<span class="token operator">></span>
              <span class="token operator">&lt;</span> a href<span class="token operator">=</span><span class="token string">"/contact"</span><span class="token operator">></span>Contact<span class="token operator">&lt;</span><span class="token operator">/</span> a<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
          <span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>nav<span class="token operator">></span>
        <span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">"/"</span> render<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token operator">&lt;</span>h1<span class="token operator">></span>Welcome<span class="token operator">!</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span><span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>main<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>Router<span class="token operator">></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="link、navlink" tabindex="-1"><a class="header-anchor" href="#link、navlink" aria-hidden="true">#</a> Link、NavLink</h3>
<p>通常路径的跳转是使用<code v-pre>Link</code>组件，最终会被渲染成<code v-pre>a</code>元素，其中属性<code v-pre>to</code>代替<code v-pre>a</code>标题的<code v-pre>href</code>属性</p>
<p><code v-pre>NavLink</code>是在<code v-pre>Link</code>基础之上增加了一些样式属性，例如组件被选中时，发生样式变化，则可以设置<code v-pre>NavLink</code>的一下属性：</p>
<ul>
<li>activeStyle：活跃时（匹配时）的样式</li>
<li>activeClassName：活跃时添加的class</li>
</ul>
<p>如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>NavLink to<span class="token operator">=</span><span class="token string">"/"</span> exact activeStyle<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">"red"</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">></span>首页<span class="token operator">&lt;</span><span class="token operator">/</span>NavLink<span class="token operator">></span>
<span class="token operator">&lt;</span>NavLink to<span class="token operator">=</span><span class="token string">"/about"</span> activeStyle<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">"red"</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">></span>关于<span class="token operator">&lt;</span><span class="token operator">/</span>NavLink<span class="token operator">></span>
<span class="token operator">&lt;</span>NavLink to<span class="token operator">=</span><span class="token string">"/profile"</span> activeStyle<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">"red"</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">></span>我的<span class="token operator">&lt;</span><span class="token operator">/</span>NavLink<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果需要实现<code v-pre>js</code>实现页面的跳转，那么可以通过下面的形式：</p>
<p>通过<code v-pre>Route</code>作为顶层组件包裹其他组件后,页面组件就可以接收到一些路由相关的东西，比如<code v-pre>props.history</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">Contact</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> history <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>Fragment<span class="token operator">></span>
    <span class="token operator">&lt;</span>h1<span class="token operator">></span>Contact<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
    <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> history<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">></span>Go to home<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
    <span class="token operator">&lt;</span>FakeText <span class="token operator">/</span><span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>Fragment<span class="token operator">></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>props</code>中接收到的<code v-pre>history</code>对象具有一些方便的方法，如<code v-pre>goBack</code>，<code v-pre>goForward</code>,<code v-pre>push</code></p>
<h3 id="redirect" tabindex="-1"><a class="header-anchor" href="#redirect" aria-hidden="true">#</a> redirect</h3>
<p>用于路由的重定向，当这个组件出现时，就会执行跳转到对应的<code v-pre>to</code>路径中，如下例子：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">About</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>
  <span class="token literal-property property">match</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">{</span> name <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
  <span class="token comment">// props.match.params.name</span>
  <span class="token operator">&lt;</span>Fragment<span class="token operator">></span>
    <span class="token punctuation">{</span>name <span class="token operator">!==</span> <span class="token string">"tom"</span> <span class="token operator">?</span> <span class="token operator">&lt;</span>Redirect to<span class="token operator">=</span><span class="token string">"/"</span> <span class="token operator">/</span><span class="token operator">></span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">}</span>
    <span class="token operator">&lt;</span>h1<span class="token operator">></span>About <span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
    <span class="token operator">&lt;</span>FakeText <span class="token operator">/</span><span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>Fragment<span class="token operator">></span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述组件当接收到的路由参数<code v-pre>name</code> 不等于 <code v-pre>tom</code> 的时候，将会自动重定向到首页</p>
<h3 id="switch" tabindex="-1"><a class="header-anchor" href="#switch" aria-hidden="true">#</a> switch</h3>
<p><code v-pre>swich</code>组件的作用适用于当匹配到第一个组件的时候，后面的组件就不应该继续匹配</p>
<p>如下例子：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>Switch<span class="token operator">></span>
  <span class="token operator">&lt;</span>Route exact path<span class="token operator">=</span><span class="token string">"/"</span> component<span class="token operator">=</span><span class="token punctuation">{</span>Home<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>
  <span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">"/about"</span> component<span class="token operator">=</span><span class="token punctuation">{</span>About<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>
  <span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">"/profile"</span> component<span class="token operator">=</span><span class="token punctuation">{</span>Profile<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>
  <span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">"/:userid"</span> component<span class="token operator">=</span><span class="token punctuation">{</span>User<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>
  <span class="token operator">&lt;</span>Route component<span class="token operator">=</span><span class="token punctuation">{</span>NoMatch<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>Switch<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果不使用<code v-pre>switch</code>组件进行包裹</p>
<p>除了一些路由相关的组件之外，<code v-pre>react-router</code>还提供一些<code v-pre>hooks</code>，如下：</p>
<ul>
<li>useHistory</li>
<li>useParams</li>
<li>useLocation</li>
</ul>
<h3 id="usehistory" tabindex="-1"><a class="header-anchor" href="#usehistory" aria-hidden="true">#</a> useHistory</h3>
<p><code v-pre>useHistory</code>可以让组件内部直接访问<code v-pre>history</code>，无须通过<code v-pre>props</code>获取</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useHistory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-router-dom"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">Contact</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> history <span class="token operator">=</span> <span class="token function">useHistory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>Fragment<span class="token operator">></span>
      <span class="token operator">&lt;</span>h1<span class="token operator">></span>Contact<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> history<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">></span>Go to home<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>Fragment<span class="token operator">></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="useparams" tabindex="-1"><a class="header-anchor" href="#useparams" aria-hidden="true">#</a> useParams</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">About</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> name <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useParams</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token comment">// props.match.params.name</span>
    <span class="token operator">&lt;</span>Fragment<span class="token operator">></span>
      <span class="token punctuation">{</span>name <span class="token operator">!==</span> <span class="token string">"John Doe"</span> <span class="token operator">?</span> <span class="token operator">&lt;</span>Redirect to<span class="token operator">=</span><span class="token string">"/"</span> <span class="token operator">/</span><span class="token operator">></span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">}</span>
      <span class="token operator">&lt;</span>h1<span class="token operator">></span>About <span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
      <span class="token operator">&lt;</span>Route component<span class="token operator">=</span><span class="token punctuation">{</span>Contact<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>Fragment<span class="token operator">></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="uselocation" tabindex="-1"><a class="header-anchor" href="#uselocation" aria-hidden="true">#</a> useLocation</h3>
<p><code v-pre>useLocation</code> 会返回当前 <code v-pre>URL</code>的 <code v-pre>location</code>对象</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useLocation <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-router-dom"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">Contact</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> pathname <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useLocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>Fragment<span class="token operator">></span>
      <span class="token operator">&lt;</span>h1<span class="token operator">></span>Contact<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
      <span class="token operator">&lt;</span>p<span class="token operator">></span>Current <span class="token constant">URL</span><span class="token operator">:</span> <span class="token punctuation">{</span>pathname<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p <span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>Fragment<span class="token operator">></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、参数传递" tabindex="-1"><a class="header-anchor" href="#三、参数传递" aria-hidden="true">#</a> 三、参数传递</h2>
<p>这些路由传递参数主要分成了三种形式：</p>
<ul>
<li>动态路由的方式</li>
<li>search传递参数</li>
<li>to传入对象</li>
</ul>
<h3 id="动态路由" tabindex="-1"><a class="header-anchor" href="#动态路由" aria-hidden="true">#</a> 动态路由</h3>
<p>动态路由的概念指的是路由中的路径并不会固定</p>
<p>例如将<code v-pre>path</code>在<code v-pre>Route</code>匹配时写成<code v-pre>/detail/:id</code>，那么 <code v-pre>/detail/abc</code>、<code v-pre>/detail/123</code>都可以匹配到该<code v-pre>Route</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>NavLink to<span class="token operator">=</span><span class="token string">"/detail/abc123"</span><span class="token operator">></span>详情<span class="token operator">&lt;</span><span class="token operator">/</span>NavLink<span class="token operator">></span>

<span class="token operator">&lt;</span>Switch<span class="token operator">></span>
    <span class="token operator">...</span> 其他Route
    <span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">"/detail/:id"</span> component<span class="token operator">=</span><span class="token punctuation">{</span>Detail<span class="token punctuation">}</span><span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>Route component<span class="token operator">=</span><span class="token punctuation">{</span>NoMatch<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>Switch<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>获取参数方式如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>match<span class="token punctuation">.</span>params<span class="token punctuation">.</span>xxx<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="search传递参数" tabindex="-1"><a class="header-anchor" href="#search传递参数" aria-hidden="true">#</a> search传递参数</h3>
<p>在跳转的路径中添加了一些query参数；</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>NavLink to<span class="token operator">=</span><span class="token string">"/detail2?name=why&amp;age=18"</span><span class="token operator">></span>详情<span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>NavLink<span class="token operator">></span>

<span class="token operator">&lt;</span>Switch<span class="token operator">></span>
  <span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">"/detail2"</span> component<span class="token operator">=</span><span class="token punctuation">{</span>Detail2<span class="token punctuation">}</span><span class="token operator">/</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>Switch<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>获取形式如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>location<span class="token punctuation">.</span>search<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="to传入对象" tabindex="-1"><a class="header-anchor" href="#to传入对象" aria-hidden="true">#</a> to传入对象</h3>
<p>传递方式如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>NavLink to<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>
    <span class="token literal-property property">pathname</span><span class="token operator">:</span> <span class="token string">"/detail2"</span><span class="token punctuation">,</span> 
    <span class="token literal-property property">query</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"kobe"</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">state</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">1.98</span><span class="token punctuation">,</span> <span class="token literal-property property">address</span><span class="token operator">:</span> <span class="token string">"洛杉矶"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">search</span><span class="token operator">:</span> <span class="token string">"?apikey=123"</span>
  <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">></span>
  详情<span class="token number">2</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>NavLink<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>获取参数的形式如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>location<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>http://react-guide.github.io/react-router-cn/docs/API.html#route</li>
</ul>
</div></template>


