<template><div><h1 id="node性能如何进行监控以及优化" tabindex="-1"><a class="header-anchor" href="#node性能如何进行监控以及优化" aria-hidden="true">#</a> Node性能如何进行监控以及优化？</h1>
<p><img src="https://static.vue-js.com/bb37dae0-d179-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="一、-是什么" tabindex="-1"><a class="header-anchor" href="#一、-是什么" aria-hidden="true">#</a> 一、 是什么</h2>
<p><code v-pre>Node</code>作为一门服务端语言，性能方面尤为重要，其衡量指标一般有如下：</p>
<ul>
<li>CPU</li>
<li>内存</li>
<li>I/O</li>
<li>网络</li>
</ul>
<h3 id="cpu" tabindex="-1"><a class="header-anchor" href="#cpu" aria-hidden="true">#</a> CPU</h3>
<p>主要分成了两部分：</p>
<ul>
<li>CPU负载：在某个时间段内，占用以及等待CPU的进程总数</li>
<li>CPU使用率：CPU时间占用状况，等于 1 - 空闲CPU时间(idle time) / CPU总时间</li>
</ul>
<p>这两个指标都是用来评估系统当前CPU的繁忙程度的量化指标</p>
<p><code v-pre>Node</code>应用一般不会消耗很多的<code v-pre>CPU</code>，如果<code v-pre>CPU</code>占用率高，则表明应用存在很多同步操作，导致异步任务回调被阻塞</p>
<h3 id="内存指标" tabindex="-1"><a class="header-anchor" href="#内存指标" aria-hidden="true">#</a> 内存指标</h3>
<p>内存是一个非常容易量化的指标。 内存占用率是评判一个系统的内存瓶颈的常见指标。 对于Node来说，内部内存堆栈的使用状态也是一个可以量化的指标</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// /app/lib/memory.js</span>
<span class="token keyword">const</span> os <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'os'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 获取当前Node内存堆栈情况</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> rss<span class="token punctuation">,</span> heapUsed<span class="token punctuation">,</span> heapTotal <span class="token punctuation">}</span> <span class="token operator">=</span> process<span class="token punctuation">.</span><span class="token function">memoryUsage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 获取系统空闲内存</span>
<span class="token keyword">const</span> sysFree <span class="token operator">=</span> os<span class="token punctuation">.</span><span class="token function">freemem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 获取系统总内存</span>
<span class="token keyword">const</span> sysTotal <span class="token operator">=</span> os<span class="token punctuation">.</span><span class="token function">totalmem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">memory</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">sys</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token operator">-</span> sysFree <span class="token operator">/</span> sysTotal<span class="token punctuation">,</span>  <span class="token comment">// 系统内存占用率</span>
      <span class="token literal-property property">heap</span><span class="token operator">:</span> heapUsed <span class="token operator">/</span> headTotal<span class="token punctuation">,</span>   <span class="token comment">// Node堆内存占用率</span>
      <span class="token literal-property property">node</span><span class="token operator">:</span> rss <span class="token operator">/</span> sysTotal<span class="token punctuation">,</span>         <span class="token comment">// Node占用系统内存的比例</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>rss：表示node进程占用的内存总量。</li>
<li>heapTotal：表示堆内存的总量。</li>
<li>heapUsed：实际堆内存的使用量。</li>
<li>external ：外部程序的内存使用量，包含Node核心的C++程序的内存使用量</li>
</ul>
<p>在<code v-pre>Node</code>中，一个进程的最大内存容量为1.5GB。因此我们需要减少内存泄露</p>
<h3 id="磁盘-i-o" tabindex="-1"><a class="header-anchor" href="#磁盘-i-o" aria-hidden="true">#</a> 磁盘 I/O</h3>
<p>硬盘的<code v-pre>IO</code> 开销是非常昂贵的，硬盘 IO 花费的 CPU 时钟周期是内存的 164000 倍</p>
<p>内存 <code v-pre>IO</code>比磁盘<code v-pre>IO</code> 快非常多，所以使用内存缓存数据是有效的优化方法。常用的工具如 <code v-pre>redis</code>、<code v-pre>memcached</code>等</p>
<p>并不是所有数据都需要缓存，访问频率高，生成代价比较高的才考虑是否缓存，也就是说影响你性能瓶颈的考虑去缓存，并且而且缓存还有缓存雪崩、缓存穿透等问题要解决</p>
<h2 id="二、如何监控" tabindex="-1"><a class="header-anchor" href="#二、如何监控" aria-hidden="true">#</a> 二、如何监控</h2>
<p>关于性能方面的监控，一般情况都需要借助工具来实现</p>
<p>这里采用<code v-pre>Easy-Monitor 2.0</code>，其是轻量级的 <code v-pre>Node.js</code> 项目内核性能监控 + 分析工具，在默认模式下，只需要在项目入口文件 <code v-pre>require</code> 一次，无需改动任何业务代码即可开启内核级别的性能监控分析</p>
<p>使用方法如下：</p>
<p>在你的项目入口文件中按照如下方式引入，当然请传入你的项目名称：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> easyMonitor <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'easy-monitor'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">easyMonitor</span><span class="token punctuation">(</span><span class="token string">'你的项目名称'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>打开你的浏览器，访问 <code v-pre>http://localhost:12333</code> ，即可看到进程界面</p>
<p>关于定制化开发、通用配置项以及如何动态更新配置项详见官方文档</p>
<h2 id="三、如何优化" tabindex="-1"><a class="header-anchor" href="#三、如何优化" aria-hidden="true">#</a> 三、如何优化</h2>
<p>关于<code v-pre>Node</code>的性能优化的方式有：</p>
<ul>
<li>使用最新版本Node.js</li>
<li>正确使用流 Stream</li>
<li>代码层面优化</li>
<li>内存管理优化</li>
</ul>
<h3 id="使用最新版本node-js" tabindex="-1"><a class="header-anchor" href="#使用最新版本node-js" aria-hidden="true">#</a> 使用最新版本Node.js</h3>
<p>每个版本的性能提升主要来自于两个方面：</p>
<ul>
<li>V8 的版本更新</li>
<li>Node.js 内部代码的更新优化</li>
</ul>
<h3 id="正确使用流-stream" tabindex="-1"><a class="header-anchor" href="#正确使用流-stream" aria-hidden="true">#</a> 正确使用流 Stream</h3>
<p>在<code v-pre>Node</code>中，很多对象都实现了流，对于一个大文件可以通过流的形式发送，不需要将其完全读入内存</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> http <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'http'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// bad</span>
http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">'/data.txt'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// good</span>
http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> stream <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createReadStream</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">'/data.txt'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    stream<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="代码层面优化" tabindex="-1"><a class="header-anchor" href="#代码层面优化" aria-hidden="true">#</a> 代码层面优化</h3>
<p>合并查询，将多次查询合并一次，减少数据库的查询次数</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// bad</span>
<span class="token keyword">for</span> user_id <span class="token keyword">in</span> userIds 
     <span class="token keyword">let</span> account <span class="token operator">=</span> user_account<span class="token punctuation">.</span><span class="token function">findOne</span><span class="token punctuation">(</span>user_id<span class="token punctuation">)</span>

<span class="token comment">// good</span>
<span class="token keyword">const</span> user_account_map <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>   <span class="token comment">// 注意这个对象将会消耗大量内存。</span>
user_account<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>user_id <span class="token keyword">in</span> user_ids<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">account</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    user_account_map<span class="token punctuation">[</span>account<span class="token punctuation">.</span>user_id<span class="token punctuation">]</span> <span class="token operator">=</span>  account
<span class="token punctuation">}</span>
<span class="token keyword">for</span> user_id <span class="token keyword">in</span> userIds 
    <span class="token keyword">var</span> account <span class="token operator">=</span> user_account_map<span class="token punctuation">[</span>user_id<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="内存管理优化" tabindex="-1"><a class="header-anchor" href="#内存管理优化" aria-hidden="true">#</a> 内存管理优化</h3>
<p>在 V8 中，主要将内存分为新生代和老生代两代：</p>
<ul>
<li>新生代：对象的存活时间较短。新生对象或只经过一次垃圾回收的对象</li>
<li>老生代：对象存活时间较长。经历过一次或多次垃圾回收的对象</li>
</ul>
<p>若新生代内存空间不够，直接分配到老生代</p>
<p>通过减少内存占用，可以提高服务器的性能。如果有内存泄露，也会导致大量的对象存储到老生代中，服务器性能会大大降低</p>
<p>如下面情况：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> buffer <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">'/source/index.htm'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
    <span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>
        ctx<span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">'html'</span><span class="token punctuation">;</span>
        ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> buffer<span class="token punctuation">;</span>
        leak<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">'/source/index.htm'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> leak <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>leak</code>的内存非常大，造成内存泄露，应当避免这样的操作，通过减少内存使用，是提高服务性能的手段之一</p>
<p>而节省内存最好的方式是使用池，其将频用、可复用对象存储起来，减少创建和销毁操作</p>
<p>例如有个图片请求接口，每次请求，都需要用到类。若每次都需要重新new这些类，并不是很合适，在大量请求时，频繁创建和销毁这些类，造成内存抖动</p>
<p>使用对象池的机制，对这种频繁需要创建和销毁的对象保存在一个对象池中。每次用到该对象时，就取对象池空闲的对象，并对它进行初始化操作，从而提高框架的性能</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://segmentfault.com/a/1190000039327565</li>
<li>https://zhuanlan.zhihu.com/p/50055740</li>
<li>https://segmentfault.com/a/1190000010231628</li>
</ul>
</div></template>


