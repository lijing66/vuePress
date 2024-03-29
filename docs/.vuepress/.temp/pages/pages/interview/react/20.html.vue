<template><div><h1 id="说说对redux中间件的理解-常用的中间件有哪些-实现原理" tabindex="-1"><a class="header-anchor" href="#说说对redux中间件的理解-常用的中间件有哪些-实现原理" aria-hidden="true">#</a> 说说对Redux中间件的理解？常用的中间件有哪些？实现原理？</h1>
<p><img src="https://static.vue-js.com/4520bbd0-e699-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>中间件（Middleware）是介于应用系统和系统软件之间的一类软件，它使用系统软件所提供的基础服务（功能），衔接网络上应用系统的各个部分或不同的应用，能够达到资源共享、功能共享的目的</p>
<p>在上篇文章中，了解到了<code v-pre>Redux</code>整个工作流程，当<code v-pre>action</code>发出之后，<code v-pre>reducer</code>立即算出<code v-pre>state</code>，整个过程是一个同步的操作</p>
<p>那么如果需要支持异步操作，或者支持错误处理、日志监控，这个过程就可以用上中间件</p>
<p><code v-pre>Redux</code>中，中间件就是放在就是在<code v-pre>dispatch</code>过程，在分发<code v-pre>action</code>进行拦截处理，如下图：</p>
<p><img src="https://static.vue-js.com/57edf750-e699-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>其本质上一个函数，对<code v-pre>store.dispatch</code>方法进行了改造，在发出 <code v-pre>Action</code>和执行 <code v-pre>Reducer</code>这两步之间，添加了其他功能</p>
<h2 id="二、常用的中间件" tabindex="-1"><a class="header-anchor" href="#二、常用的中间件" aria-hidden="true">#</a> 二、常用的中间件</h2>
<p>有很多优秀的<code v-pre>redux</code>中间件，如：</p>
<ul>
<li>redux-thunk：用于异步操作</li>
<li>redux-logger：用于日志记录</li>
</ul>
<p>上述的中间件都需要通过<code v-pre>applyMiddlewares</code>进行注册，作用是将所有的中间件组成一个数组，依次执行</p>
<p>然后作为第二个参数传入到<code v-pre>createStore</code>中</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>
  reducer<span class="token punctuation">,</span>
  <span class="token function">applyMiddleware</span><span class="token punctuation">(</span>thunk<span class="token punctuation">,</span> logger<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="redux-thunk" tabindex="-1"><a class="header-anchor" href="#redux-thunk" aria-hidden="true">#</a> redux-thunk</h3>
<p><code v-pre>redux-thunk</code>是官网推荐的异步处理中间件</p>
<p>默认情况下的<code v-pre>dispatch(action)</code>，<code v-pre>action</code>需要是一个<code v-pre>JavaScript</code>的对象</p>
<p><code v-pre>redux-thunk</code>中间件会判断你当前传进来的数据类型，如果是一个函数，将会给函数传入参数值（dispatch，getState）</p>
<ul>
<li>dispatch函数用于我们之后再次派发action</li>
<li>getState函数考虑到我们之后的一些操作需要依赖原来的状态，用于让我们可以获取之前的一些状态</li>
</ul>
<p>所以<code v-pre>dispatch</code>可以写成下述函数的形式：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">getHomeMultidataAction</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">dispatch</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"http://xxx.xx.xx.xx/test"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> data <span class="token operator">=</span> res<span class="token punctuation">.</span>data<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
      <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">changeBannersAction</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>banner<span class="token punctuation">.</span>list<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">changeRecommendsAction</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>recommend<span class="token punctuation">.</span>list<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="redux-logger" tabindex="-1"><a class="header-anchor" href="#redux-logger" aria-hidden="true">#</a> redux-logger</h3>
<p>如果想要实现一个日志功能，则可以使用现成的<code v-pre>redux-logger</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>
<span class="token keyword">import</span> <span class="token punctuation">{</span> applyMiddleware<span class="token punctuation">,</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'redux'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> createLogger <span class="token keyword">from</span> <span class="token string">'redux-logger'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> logger <span class="token operator">=</span> <span class="token function">createLogger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>
  reducer<span class="token punctuation">,</span>
  <span class="token function">applyMiddleware</span><span class="token punctuation">(</span>logger<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样我们就能简单通过中间件函数实现日志记录的信息</p>
<h2 id="三、实现原理" tabindex="-1"><a class="header-anchor" href="#三、实现原理" aria-hidden="true">#</a> 三、实现原理</h2>
<p>首先看看<code v-pre>applyMiddlewares</code>的源码</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">applyMiddleware</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>middlewares</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">createStore</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter">reducer<span class="token punctuation">,</span> preloadedState<span class="token punctuation">,</span> enhancer</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">,</span> preloadedState<span class="token punctuation">,</span> enhancer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> dispatch <span class="token operator">=</span> store<span class="token punctuation">.</span>dispatch<span class="token punctuation">;</span>
    <span class="token keyword">var</span> chain <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">var</span> middlewareAPI <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">getState</span><span class="token operator">:</span> store<span class="token punctuation">.</span>getState<span class="token punctuation">,</span>
      <span class="token function-variable function">dispatch</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">dispatch</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    chain <span class="token operator">=</span> middlewares<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">middleware</span> <span class="token operator">=></span> <span class="token function">middleware</span><span class="token punctuation">(</span>middlewareAPI<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dispatch <span class="token operator">=</span> <span class="token function">compose</span><span class="token punctuation">(</span><span class="token operator">...</span>chain<span class="token punctuation">)</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span>dispatch<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token operator">...</span>store<span class="token punctuation">,</span> dispatch<span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有中间件被放进了一个数组<code v-pre>chain</code>，然后嵌套执行，最后执行<code v-pre>store.dispatch</code>。可以看到，中间件内部（<code v-pre>middlewareAPI</code>）可以拿到<code v-pre>getState</code>和<code v-pre>dispatch</code>这两个方法</p>
<p>在上面的学习中，我们了解到了<code v-pre>redux-thunk</code>的基本使用</p>
<p>内部会将<code v-pre>dispatch</code>进行一个判断，然后执行对应操作，原理如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">patchThunk</span><span class="token punctuation">(</span><span class="token parameter">store</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> next <span class="token operator">=</span> store<span class="token punctuation">.</span>dispatch<span class="token punctuation">;</span>

    <span class="token keyword">function</span> <span class="token function">dispatchAndThunk</span><span class="token punctuation">(</span><span class="token parameter">action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> action <span class="token operator">===</span> <span class="token string">"function"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">action</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span>dispatch<span class="token punctuation">,</span> store<span class="token punctuation">.</span>getState<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token function">next</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    store<span class="token punctuation">.</span>dispatch <span class="token operator">=</span> dispatchAndThunk<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现一个日志输出的原理也非常简单，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> next <span class="token operator">=</span> store<span class="token punctuation">.</span>dispatch<span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">dispatchAndLog</span><span class="token punctuation">(</span><span class="token parameter">action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"dispatching:"</span><span class="token punctuation">,</span> <span class="token function">addAction</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">next</span><span class="token punctuation">(</span><span class="token function">addAction</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"新的state:"</span><span class="token punctuation">,</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

store<span class="token punctuation">.</span>dispatch <span class="token operator">=</span> dispatchAndLog<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html</li>
</ul>
</div></template>


