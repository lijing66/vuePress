<template><div><h1 id="说说对-node-中的-buffer-的理解-应用场景" tabindex="-1"><a class="header-anchor" href="#说说对-node-中的-buffer-的理解-应用场景" aria-hidden="true">#</a> 说说对 Node 中的 Buffer 的理解？应用场景？</h1>
<p><img src="https://static.vue-js.com/176d02b0-c69c-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>在<code v-pre>Node</code>应用中，需要处理网络协议、操作数据库、处理图片、接收上传文件等，在网络流和文件的操作中，要处理大量二进制数据，而<code v-pre>Buffer</code>就是在内存中开辟一片区域（初次初始化为8KB），用来存放二进制数据</p>
<p>在上述操作中都会存在数据流动，每个数据流动的过程中，都会有一个最小或最大数据量</p>
<p>如果数据到达的速度比进程消耗的速度快，那么少数早到达的数据会处于等待区等候被处理。反之，如果数据到达的速度比进程消耗的数据慢，那么早先到达的数据需要等待一定量的数据到达之后才能被处理</p>
<p>这里的等待区就指的缓冲区（Buffer），它是计算机中的一个小物理单位，通常位于计算机的 <code v-pre>RAM</code> 中</p>
<p>简单来讲，<code v-pre>Nodejs</code>不能控制数据传输的速度和到达时间，只能决定何时发送数据，如果还没到发送时间，则将数据放在<code v-pre>Buffer</code>中，即在<code v-pre>RAM</code>中，直至将它们发送完毕</p>
<p>上面讲到了<code v-pre>Buffer</code>是用来存储二进制数据，其的形式可以理解成一个数组，数组中的每一项，都可以保存8位二进制：<code v-pre>00000000</code>，也就是一个字节</p>
<p>例如：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> buffer <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">"why"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其存储过程如下图所示：</p>
<p><img src="https://static.vue-js.com/20371250-c69c-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="二、使用方法" tabindex="-1"><a class="header-anchor" href="#二、使用方法" aria-hidden="true">#</a> 二、使用方法</h2>
<p><code v-pre>Buffer</code> 类在全局作用域中，无须<code v-pre>require</code>导入</p>
<p>创建<code v-pre>Buffer</code>的方法有很多种，我们讲讲下面的两种常见的形式：</p>
<ul>
<li>
<p>Buffer.from()</p>
</li>
<li>
<p>Buffer.alloc()</p>
</li>
</ul>
<h3 id="buffer-from" tabindex="-1"><a class="header-anchor" href="#buffer-from" aria-hidden="true">#</a> Buffer.from()</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> b1 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">'10'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b2 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">'10'</span><span class="token punctuation">,</span> <span class="token string">'utf8'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b3 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b4 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>b3<span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b1<span class="token punctuation">,</span> b2<span class="token punctuation">,</span> b3<span class="token punctuation">,</span> b4<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &lt;Buffer 31 30> &lt;Buffer 31 30> &lt;Buffer 0a> &lt;Buffer 0a></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="buffer-alloc" tabindex="-1"><a class="header-anchor" href="#buffer-alloc" aria-hidden="true">#</a> Buffer.alloc()</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> bAlloc1 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">alloc</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 创建一个大小为 10 个字节的缓冲区</span>
<span class="token keyword">const</span> bAlloc2 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">alloc</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 建一个长度为 10 的 Buffer,其中全部填充了值为 `1` 的字节</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bAlloc1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &lt;Buffer 00 00 00 00 00 00 00 00 00 00></span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bAlloc2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &lt;Buffer 01 01 01 01 01 01 01 01 01 01></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面创建<code v-pre>buffer</code>后，则能够<code v-pre>toString</code>的形式进行交互，默认情况下采取<code v-pre>utf8</code>字符编码形式，如下</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> buffer <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">"你好"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// &lt;Buffer e4 bd a0 e5 a5 bd></span>
<span class="token keyword">const</span> str <span class="token operator">=</span> buffer<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 你好</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果编码与解码不是相同的格式则会出现乱码的情况，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> buffer <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">"你好"</span><span class="token punctuation">,</span><span class="token string">"utf-8 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// &lt;Buffer e4 bd a0 e5 a5 bd></span>
<span class="token keyword">const</span> str <span class="token operator">=</span> buffer<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">"ascii"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token comment">// d= e%=</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当设定的范围导致字符串被截断的时候，也会存在乱码情况，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> buf <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">'Node.js 技术栈'</span><span class="token punctuation">,</span> <span class="token string">'UTF-8'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>          <span class="token comment">// &lt;Buffer 4e 6f 64 65 2e 6a 73 20 e6 8a 80 e6 9c af e6 a0 88></span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf<span class="token punctuation">.</span>length<span class="token punctuation">)</span>   <span class="token comment">// 17</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">'UTF-8'</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment">// Node.js �</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">'UTF-8'</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// Node.js 技</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所支持的字符集有如下：</p>
<ul>
<li>ascii：仅支持 7 位 ASCII 数据，如果设置去掉高位的话，这种编码是非常快的</li>
<li>utf8：多字节编码的 Unicode 字符，许多网页和其他文档格式都使用 UTF-8</li>
<li>utf16le：2 或 4 个字节，小字节序编码的 Unicode 字符，支持代理对（U+10000至 U+10FFFF）</li>
<li>ucs2，utf16le 的别名</li>
<li>base64：Base64 编码</li>
<li>latin：一种把 Buffer 编码成一字节编码的字符串的方式</li>
<li>binary：latin1 的别名，</li>
<li>hex：将每个字节编码为两个十六进制字符</li>
</ul>
<h2 id="三、应用场景" tabindex="-1"><a class="header-anchor" href="#三、应用场景" aria-hidden="true">#</a> 三、应用场景</h2>
<p><code v-pre>Buffer</code>的应用场景常常与流的概念联系在一起，例如有如下：</p>
<ul>
<li>I/O操作</li>
<li>加密解密</li>
<li>zlib.js</li>
</ul>
<h3 id="i-o操作" tabindex="-1"><a class="header-anchor" href="#i-o操作" aria-hidden="true">#</a> I/O操作</h3>
<p>通过流的形式，将一个文件的内容读取到另外一个文件</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> inputStream <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createReadStream</span><span class="token punctuation">(</span><span class="token string">'input.txt'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 创建可读流</span>
<span class="token keyword">const</span> outputStream <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createWriteStream</span><span class="token punctuation">(</span><span class="token string">'output.txt'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 创建可写流</span>

inputStream<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>outputStream<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 管道读写</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="加解密" tabindex="-1"><a class="header-anchor" href="#加解密" aria-hidden="true">#</a> 加解密</h3>
<p>在一些加解密算法中会遇到使用 <code v-pre>Buffer</code>，例如 <code v-pre>crypto.createCipheriv</code> 的第二个参数 <code v-pre>key</code> 为 <code v-pre>string</code> 或 <code v-pre>Buffer</code> 类型</p>
<h3 id="zlib-js" tabindex="-1"><a class="header-anchor" href="#zlib-js" aria-hidden="true">#</a> zlib.js</h3>
<p><code v-pre>zlib.js</code> 为 <code v-pre>Node.js</code> 的核心库之一，其利用了缓冲区（<code v-pre>Buffer</code>）的功能来操作二进制数据流，提供了压缩或解压功能</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>http://nodejs.cn/api/buffer.html</li>
<li>https://segmentfault.com/a/1190000019894714</li>
</ul>
</div></template>


