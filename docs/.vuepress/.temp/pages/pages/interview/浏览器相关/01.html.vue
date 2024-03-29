<template><div><h1 id="事件循环" tabindex="-1"><a class="header-anchor" href="#事件循环" aria-hidden="true">#</a> 事件循环</h1>
<p>事件循环不是js的语言层面的内容，是js的宿主环境（浏览器，nodeJS）的讨论内容</p>
<h2 id="浏览器事件循环" tabindex="-1"><a class="header-anchor" href="#浏览器事件循环" aria-hidden="true">#</a> 浏览器事件循环</h2>
<p>浏览器本身是一个复杂的系统，它要做的事情非常多，例如： 执行js代码，请求图片资源，解析css，渲染页面，响应鼠标的点击等等。在实现层面，浏览器内部会用不同的功能模块去完成不同的事情。这些不同的模块就体现为进程。 <img src="http://fanyouf.gitee.io/interview/brower//interview/assets/img/image.dfcb8726.png" alt="Alt text"></p>
<p><img src="http://fanyouf.gitee.io/interview/assets/img/lyq.8b1ed07b.png" alt="Alt text"></p>
<p>进一步把进程进行划分：</p>
<ol>
<li>主进程。用来协调控制其他子进程。</li>
<li>GPU进程。用于3D绘制等。</li>
<li>渲染进程。就是我们说的浏览器内核，负责具体页面的渲染，脚本执行，事件处理等。每个tab页背后就有一个渲染进程。</li>
</ol>
<p>进程这个单位还是比较大，它进一步拆分多个线程。可以理解为一个页面上的事还是比较多，要多找些小弟来完成。具体来说，一个渲染进程包括：</p>
<ol>
<li>主线程。统一调度</li>
<li>GUI渲染线程。负责渲染页面，布局和绘制。与JS引擎互斥。</li>
<li>JS引擎线程。负责处理解析和执行javascript脚本程序。</li>
<li>事件触发线程。用来控制事件循环（鼠标点击、setTimeout、ajax等）。当事件满足触发条件时，将事件放入到JS引擎所在的执行队列中。</li>
<li>setInterval与setTimeout所在的线程。定时任务并不是由JS引擎计时的，是由定时触发线程来计时的。计时完毕后，通知事件触发线程</li>
<li>异步http请求线程。浏览器有一个单独的线程用于处理AJAX请求，当请求完成时，若有回调函数，通知事件触发线程。</li>
<li>io线程。用来接收其他进程的消息。</li>
</ol>
<p>每个渲染进程都有一个主线程，并且主线程非常繁忙，既要处理 DOM，又要计算样式，还要处理布局，同时还需要处理 JavaScript 任务以及各种输入事件。要让这么多不同类型的任务在主线程中有条不紊地执行，这就需要一个系统来统筹调度这些任务，这个统筹调度系统就是消息队列和事件循环。</p>
<p>任务有很多，人只有一个，且任意时刻只能做一件事（不是一边走路一边听课这种事哈），那怎么办，就是排队呗</p>
<p>eventLoop</p>
<p>主线程上要做很多事情，例如：js代码执行，页面布局计算，渲染等 主线程同一时刻只能做一件事，事情多了就要排队。所以主线程维护了任务队列。 某个事件发生时，事件触发线程 就把对应的任务添加到主线程的任务队列中。 主线程上的任务完成之后，就会从任务队列中取出任务来执行。</p>
<p>任务是以事件及其回调的方式存在的。当事件（用户的点击，图片的成功加载）发生时，将其回调添加到任务队列；主线程上的任务完成之后，就会从任务队列中取出任务来执行，此过程不断重复从而形成一个循环，称为<code v-pre>eventLoop</code></p>
<h2 id="同步任务和异步任务" tabindex="-1"><a class="header-anchor" href="#同步任务和异步任务" aria-hidden="true">#</a> 同步任务和异步任务</h2>
<p>首先，<code v-pre>JavaScript</code> 是一门单线程的语言，意味着同一时间内只能做一件事，但是这并不意味着单线程就是阻塞，而实现单线程非阻塞的方法就是事件循环</p>
<p>在<code v-pre>JavaScript</code>中，所有的任务都可以分为</p>
<ul>
<li>
<p>同步任务：立即执行的任务，同步任务一般会直接进入到主线程中执行</p>
</li>
<li>
<p>异步任务：异步执行的任务，比如<code v-pre>ajax</code>网络请求，<code v-pre>setTimeout</code>定时函数等</p>
</li>
</ul>
<p>同步任务与异步任务的运行流程图如下：</p>
<p><img src="https://static.vue-js.com/61efbc20-7cb8-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>从上面我们可以看到，同步任务进入主线程，即主执行栈，异步任务进入任务队列，主线程内的任务执行完毕为空，会去任务队列读取对应的任务，推入主线程执行。上述过程的不断重复就是<code v-pre>事件循环</code></p>
<h2 id="宏任务与微任务" tabindex="-1"><a class="header-anchor" href="#宏任务与微任务" aria-hidden="true">#</a> 宏任务与微任务</h2>
<p>异步任务 再细分为宏任务和微任务。引入微任务的作用是让异步任务也能有优先级：微任务 优先于 宏任务 执行。</p>
<h3 id="微任务" tabindex="-1"><a class="header-anchor" href="#微任务" aria-hidden="true">#</a> 微任务</h3>
<p>一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前</p>
<p>常见的微任务有：</p>
<ul>
<li>
<p>Promise.then</p>
</li>
<li>
<p>MutaionObserver</p>
</li>
<li>
<p>Object.observe（已废弃；Proxy 对象替代）</p>
</li>
<li>
<p>process.nextTick（Node.js）</p>
</li>
</ul>
<h3 id="宏任务" tabindex="-1"><a class="header-anchor" href="#宏任务" aria-hidden="true">#</a> 宏任务</h3>
<p>宏任务的时间粒度比较大，执行的时间间隔是不能精确控制的，对一些高实时性的需求就不太符合</p>
<p>常见的宏任务有：</p>
<ul>
<li>script (可以理解为外层同步代码)</li>
<li>setTimeout/setInterval</li>
<li>UI rendering/UI事件</li>
<li>postMessage、MessageChannel</li>
<li>setImmediate、I/O（Node.js）</li>
</ul>
<p>这时候，事件循环，宏任务，微任务的关系如图所示</p>
<p><img src="https://static.vue-js.com/6e80e5e0-7cb8-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>按照这个流程，它的执行机制是：</p>
<ul>
<li>执行一个宏任务，如果遇到微任务就将它放到微任务的事件队列中</li>
<li>当前宏任务执行完成后，会查看微任务的事件队列，然后将里面的所有微任务依次执行完</li>
</ul>
<p>回到题目</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'new Promise'</span><span class="token punctuation">)</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'then'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>流程如下</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 遇到 console.log(1) ，直接打印 1</span>
<span class="token comment">// 遇到定时器，属于新的宏任务，留着后面执行</span>
<span class="token comment">// 遇到 new Promise，这个是直接执行的，打印 'new Promise'</span>
<span class="token comment">// .then 属于微任务，放入微任务队列，后面再执行</span>
<span class="token comment">// 遇到 console.log(3) 直接打印 3</span>
<span class="token comment">// 好了本轮宏任务执行完毕，现在去微任务列表查看是否有微任务，发现 .then 的回调，执行它，打印 'then'</span>
<span class="token comment">// 当一次宏任务执行完，再去执行新的宏任务，这里就剩一个定时器的宏任务了，执行它，打印 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="async与await" tabindex="-1"><a class="header-anchor" href="#async与await" aria-hidden="true">#</a> async与await</h2>
<p><code v-pre>async</code> 是异步的意思，<code v-pre>await</code>则可以理解为 <code v-pre>async wait</code>。所以可以理解<code v-pre>async</code>就是用来声明一个异步方法，而 <code v-pre>await</code>是用来等待异步方法执行</p>
<h3 id="async" tabindex="-1"><a class="header-anchor" href="#async" aria-hidden="true">#</a> async</h3>
<p><code v-pre>async</code>函数返回一个<code v-pre>promise</code>对象，下面两种方法是等效的</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">'TEST'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// asyncF is equivalent to f!</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">asyncF</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'TEST'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="await" tabindex="-1"><a class="header-anchor" href="#await" aria-hidden="true">#</a> await</h3>
<p>正常情况下，<code v-pre>await</code>命令后面是一个 <code v-pre>Promise</code>对象，返回该对象的结果。如果不是 <code v-pre>Promise</code>对象，就直接返回对应的值</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 等同于</span>
    <span class="token comment">// return 123</span>
    <span class="token keyword">return</span> <span class="token keyword">await</span> <span class="token number">123</span>
<span class="token punctuation">}</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 123</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不管<code v-pre>await</code>后面跟着的是什么，<code v-pre>await</code>都会阻塞后面的代码</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">fn1</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> <span class="token function">fn2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// 阻塞</span>
<span class="token punctuation">}</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">fn2</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'fn2'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">fn1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子中，<code v-pre>await</code> 会阻塞下面的代码（即加入微任务队列），先执行 <code v-pre>async</code>外面的同步代码，同步代码执行完，再回到 <code v-pre>async</code> 函数中，再执行之前阻塞的代码</p>
<p>所以上述输出结果为：<code v-pre>1</code>，<code v-pre>fn2</code>，<code v-pre>3</code>，<code v-pre>2</code></p>
<h2 id="练习题" tabindex="-1"><a class="header-anchor" href="#练习题" aria-hidden="true">#</a> 练习题</h2>
<p>通过对上面的了解，我们对<code v-pre>JavaScript</code>对各种场景的执行顺序有了大致的了解</p>
<p>这里直接上代码：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'async1 start'</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'async1 end'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'async2'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script start'</span><span class="token punctuation">)</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'settimeout'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise1'</span><span class="token punctuation">)</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise2'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script end'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析过程：</p>
<ol>
<li>执行整段代码，遇到 <code v-pre>console.log('script start')</code> 直接打印结果，输出 <code v-pre>script start</code></li>
<li>遇到定时器了，它是宏任务，先放着不执行</li>
<li>遇到 <code v-pre>async1()</code>，执行 <code v-pre>async1</code> 函数，先打印 <code v-pre>async1 start</code>，下面遇到<code v-pre>await</code>怎么办？先执行 <code v-pre>async2</code>，打印 <code v-pre>async2</code>，然后阻塞下面代码（即加入微任务列表），跳出去执行同步代码</li>
<li>跳到 <code v-pre>new Promise</code> 这里，直接执行，打印 <code v-pre>promise1</code>，下面遇到 <code v-pre>.then()</code>，它是微任务，放到微任务列表等待执行</li>
<li>最后一行直接打印 <code v-pre>script end</code>，现在同步代码执行完了，开始执行微任务，即 <code v-pre>await</code>下面的代码，打印 <code v-pre>async1 end</code></li>
<li>继续执行下一个微任务，即执行 <code v-pre>then</code> 的回调，打印 <code v-pre>promise2</code></li>
<li>上一个宏任务所有事都做完了，开始下一个宏任务，就是定时器，打印 <code v-pre>settimeout</code></li>
</ol>
<p>所以最后的结果是：<code v-pre>script start</code>、<code v-pre>async1 start</code>、<code v-pre>async2</code>、<code v-pre>promise1</code>、<code v-pre>script end</code>、<code v-pre>async1 end</code>、<code v-pre>promise2</code>、<code v-pre>settimeout</code></p>
</div></template>


