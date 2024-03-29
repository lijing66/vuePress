<template><div><h1 id="说说对nodejs中的事件循环机制理解" tabindex="-1"><a class="header-anchor" href="#说说对nodejs中的事件循环机制理解" aria-hidden="true">#</a> 说说对Nodejs中的事件循环机制理解?</h1>
<p><img src="https://static.vue-js.com/e0faf3c0-c90e-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>在<a href="https://github.com/febobo/web-interview/issues/73" target="_blank" rel="noopener noreferrer">浏览器事件循环 (opens new window)<ExternalLinkIcon/></a>中，我们了解到<code v-pre>javascript</code>在浏览器中的事件循环机制，其是根据<code v-pre>HTML5</code>定义的规范来实现</p>
<p>而在<code v-pre>NodeJS</code>中，事件循环是基于<code v-pre>libuv</code>实现，<code v-pre>libuv</code>是一个多平台的专注于异步IO的库，如下图最右侧所示：</p>
<p><img src="https://static.vue-js.com/ea690b90-c90e-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>上图<code v-pre>EVENT_QUEUE</code> 给人看起来只有一个队列，但<code v-pre>EventLoop</code>存在6个阶段，每个阶段都有对应的一个先进先出的回调队列</p>
<h2 id="二、流程" tabindex="-1"><a class="header-anchor" href="#二、流程" aria-hidden="true">#</a> 二、流程</h2>
<p>上节讲到事件循环分成了六个阶段，对应如下：</p>
<p><img src="https://static.vue-js.com/f2e34d80-c90e-11eb-ab90-d9ae814b240d.png" alt=""></p>
<ul>
<li>timers阶段：这个阶段执行timer（setTimeout、setInterval）的回调</li>
<li>定时器检测阶段(timers)：本阶段执行 timer 的回调，即 setTimeout、setInterval 里面的回调函数</li>
<li>I/O事件回调阶段(I/O callbacks)：执行延迟到下一个循环迭代的 I/O 回调，即上一轮循环中未被执行的一些I/O回调</li>
<li>闲置阶段(idle, prepare)：仅系统内部使用</li>
<li>轮询阶段(poll)：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞</li>
<li>检查阶段(check)：setImmediate() 回调函数在这里执行</li>
<li>关闭事件回调阶段(close callback)：一些关闭的回调函数，如：socket.on('close', ...)</li>
</ul>
<p>每个阶段对应一个队列，当事件循环进入某个阶段时, 将会在该阶段内执行回调，直到队列耗尽或者回调的最大数量已执行, 那么将进入下一个处理阶段</p>
<p>除了上述6个阶段，还存在<code v-pre>process.nextTick</code>，其不属于事件循环的任何一个阶段，它属于该阶段与下阶段之间的过渡, 即本阶段执行结束, 进入下一个阶段前, 所要执行的回调，类似插队</p>
<p>流程图如下所示：</p>
<p><img src="https://static.vue-js.com/fbe731d0-c90e-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>在<code v-pre>Node</code>中，同样存在宏任务和微任务，与浏览器中的事件循环相似</p>
<p>微任务对应有：</p>
<ul>
<li>next tick queue：process.nextTick</li>
<li>other queue：Promise的then回调、queueMicrotask</li>
</ul>
<p>宏任务对应有：</p>
<ul>
<li>timer queue：setTimeout、setInterval</li>
<li>poll queue：IO事件</li>
<li>check queue：setImmediate</li>
<li>close queue：close事件</li>
</ul>
<p>其执行顺序为：</p>
<ul>
<li>next tick microtask queue</li>
<li>other microtask queue</li>
<li>timer queue</li>
<li>poll queue</li>
<li>check queue</li>
<li>close queue</li>
</ul>
<h2 id="三、题目" tabindex="-1"><a class="header-anchor" href="#三、题目" aria-hidden="true">#</a> 三、题目</h2>
<p>通过上面的学习，下面开始看看题目</p>
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
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setTimeout0'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setTimeout2'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">)</span>

<span class="token function">setImmediate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setImmediate'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

process<span class="token punctuation">.</span><span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'nextTick1'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

process<span class="token punctuation">.</span><span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'nextTick2'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise1'</span><span class="token punctuation">)</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise2'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise3'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script end'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析过程：</p>
<ul>
<li>
<p>先找到同步任务，输出script start</p>
</li>
<li>
<p>遇到第一个 setTimeout，将里面的回调函数放到 timer 队列中</p>
</li>
<li>
<p>遇到第二个 setTimeout，300ms后将里面的回调函数放到 timer 队列中</p>
</li>
<li>
<p>遇到第一个setImmediate，将里面的回调函数放到 check 队列中</p>
</li>
<li>
<p>遇到第一个 nextTick，将其里面的回调函数放到本轮同步任务执行完毕后执行</p>
</li>
<li>
<p>执行 async1函数，输出 async1 start</p>
</li>
<li>
<p>执行 async2 函数，输出 async2，async2 后面的输出 async1 end进入微任务，等待下一轮的事件循环</p>
</li>
<li>
<p>遇到第二个，将其里面的回调函数放到本轮同步任务执行完毕后执行</p>
</li>
<li>
<p>遇到 new Promise，执行里面的立即执行函数，输出 promise1、promise2</p>
</li>
<li>
<p>then里面的回调函数进入微任务队列</p>
</li>
<li>
<p>遇到同步任务，输出 script end</p>
</li>
<li>
<p>执行下一轮回到函数，先依次输出 nextTick 的函数，分别是 nextTick1、nextTick2</p>
</li>
<li>
<p>然后执行微任务队列，依次输出 async1 end、promise3</p>
</li>
<li>
<p>执行timer 队列，依次输出 setTimeout0</p>
</li>
<li>
<p>接着执行 check 队列，依次输出 setImmediate</p>
</li>
<li>
<p>300ms后，timer 队列存在任务，执行输出 setTimeout2</p>
</li>
</ul>
<p>执行结果如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>script start
async1 start
async2
promise1
promise2
script end
nextTick1
nextTick2
async1 end
promise3
setTimeout0
setImmediate
setTimeout2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后有一道是关于<code v-pre>setTimeout</code>与<code v-pre>setImmediate</code>的输出顺序</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"setTimeout"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">setImmediate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"setImmediate"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出情况如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>情况一：
setTimeout
setImmediate

情况二：
setImmediate
setTimeout
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析下流程：</p>
<ul>
<li>外层同步代码一次性全部执行完，遇到异步API就塞到对应的阶段</li>
<li>遇到<code v-pre>setTimeout</code>，虽然设置的是0毫秒触发，但实际上会被强制改成1ms，时间到了然后塞入<code v-pre>times</code>阶段</li>
<li>遇到<code v-pre>setImmediate</code>塞入<code v-pre>check</code>阶段</li>
<li>同步代码执行完毕，进入Event Loop</li>
<li>先进入<code v-pre>times</code>阶段，检查当前时间过去了1毫秒没有，如果过了1毫秒，满足<code v-pre>setTimeout</code>条件，执行回调，如果没过1毫秒，跳过</li>
<li>跳过空的阶段，进入check阶段，执行<code v-pre>setImmediate</code>回调</li>
</ul>
<p>这里的关键在于这1ms，如果同步代码执行时间较长，进入<code v-pre>Event Loop</code>的时候1毫秒已经过了，<code v-pre>setTimeout</code>先执行，如果1毫秒还没到，就先执行了<code v-pre>setImmediate</code></p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://segmentfault.com/a/1190000012258592</li>
<li>https://juejin.cn/post/6844904100195205133 /</li>
</ul>
</div></template>


