<template><div><h1 id="说说对-node-中的-fs模块的理解-有哪些常用方法" tabindex="-1"><a class="header-anchor" href="#说说对-node-中的-fs模块的理解-有哪些常用方法" aria-hidden="true">#</a> 说说对 Node 中的 fs模块的理解? 有哪些常用方法</h1>
<p><img src="https://static.vue-js.com/a141e5c0-c46a-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>fs（filesystem），该模块提供本地文件的读写能力，基本上是<code v-pre>POSIX</code>文件操作命令的简单包装</p>
<p>可以说，所有与文件的操作都是通过<code v-pre>fs</code>核心模块实现</p>
<p>导入模块如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个模块对所有文件系统操作提供异步（不具有<code v-pre>sync</code> 后缀）和同步（具有 <code v-pre>sync</code> 后缀）两种操作方式，而供开发者选择</p>
<h3 id="二、文件知识" tabindex="-1"><a class="header-anchor" href="#二、文件知识" aria-hidden="true">#</a> 二、文件知识</h3>
<p>在计算机中有关于文件的知识：</p>
<ul>
<li>权限位 mode</li>
<li>标识位 flag</li>
<li>文件描述为 fd</li>
</ul>
<h3 id="权限位-mode" tabindex="-1"><a class="header-anchor" href="#权限位-mode" aria-hidden="true">#</a> 权限位 mode</h3>
<p><img src="https://static.vue-js.com/4f4d41a0-c46b-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>针对文件所有者、文件所属组、其他用户进行权限分配，其中类型又分成读、写和执行，具备权限位4、2、1，不具备权限为0</p>
<p>如在<code v-pre>linux</code>查看文件权限位：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>drwxr<span class="token operator">-</span>xr<span class="token operator">-</span>x <span class="token number">1</span> PandaShen <span class="token number">197121</span> <span class="token number">0</span> Jun <span class="token number">28</span> <span class="token number">14</span><span class="token operator">:</span><span class="token number">41</span> core
<span class="token operator">-</span>rw<span class="token operator">-</span>r<span class="token operator">--</span>r<span class="token operator">--</span> <span class="token number">1</span> PandaShen <span class="token number">197121</span> <span class="token number">293</span> Jun <span class="token number">23</span> <span class="token number">17</span><span class="token operator">:</span><span class="token number">44</span> index<span class="token punctuation">.</span>md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在开头前十位中，<code v-pre>d</code>为文件夹，<code v-pre>-</code>为文件，后九位就代表当前用户、用户所属组和其他用户的权限位，按每三位划分，分别代表读（r）、写（w）和执行（x），- 代表没有当前位对应的权限</p>
<h3 id="标识位" tabindex="-1"><a class="header-anchor" href="#标识位" aria-hidden="true">#</a> 标识位</h3>
<p>标识位代表着对文件的操作方式，如可读、可写、即可读又可写等等，如下表所示：</p>
<table>
<thead>
<tr>
<th>符号</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>r</td>
<td>读取文件，如果文件不存在则抛出异常。</td>
</tr>
<tr>
<td>r+</td>
<td>读取并写入文件，如果文件不存在则抛出异常。</td>
</tr>
<tr>
<td>rs</td>
<td>读取并写入文件，指示操作系统绕开本地文件系统缓存。</td>
</tr>
<tr>
<td>w</td>
<td>写入文件，文件不存在会被创建，存在则清空后写入。</td>
</tr>
<tr>
<td>wx</td>
<td>写入文件，排它方式打开。</td>
</tr>
<tr>
<td>w+</td>
<td>读取并写入文件，文件不存在则创建文件，存在则清空后写入。</td>
</tr>
<tr>
<td>wx+</td>
<td>和 w+ 类似，排他方式打开。</td>
</tr>
<tr>
<td>a</td>
<td>追加写入，文件不存在则创建文件。</td>
</tr>
<tr>
<td>ax</td>
<td>与 a 类似，排他方式打开。</td>
</tr>
<tr>
<td>a+</td>
<td>读取并追加写入，不存在则创建。</td>
</tr>
<tr>
<td>ax+</td>
<td>与 a+ 类似，排他方式打开。</td>
</tr>
</tbody>
</table>
<h3 id="文件描述为-fd" tabindex="-1"><a class="header-anchor" href="#文件描述为-fd" aria-hidden="true">#</a> 文件描述为 fd</h3>
<p>操作系统会为每个打开的文件分配一个名为文件描述符的数值标识，文件操作使用这些文件描述符来识别与追踪每个特定的文件</p>
<p><code v-pre>Window</code>系统使用了一个不同但概念类似的机制来追踪资源，为方便用户，<code v-pre>NodeJS</code>抽象了不同操作系统间的差异，为所有打开的文件分配了数值的文件描述符</p>
<p>在 <code v-pre>NodeJS</code>中，每操作一个文件，文件描述符是递增的，文件描述符一般从 <code v-pre>3</code> 开始，因为前面有 <code v-pre>0</code>、<code v-pre>1</code>、<code v-pre>2</code>三个比较特殊的描述符，分别代表 <code v-pre>process.stdin</code>（标准输入）、<code v-pre>process.stdout</code>（标准输出）和 <code v-pre>process.stderr</code>（错误输出）</p>
<h2 id="三、方法" tabindex="-1"><a class="header-anchor" href="#三、方法" aria-hidden="true">#</a> 三、方法</h2>
<p>下面针对<code v-pre>fs</code>模块常用的方法进行展开：</p>
<ul>
<li>文件读取</li>
<li>文件写入</li>
<li>文件追加写入</li>
<li>文件拷贝</li>
<li>创建目录</li>
</ul>
<h3 id="文件读取" tabindex="-1"><a class="header-anchor" href="#文件读取" aria-hidden="true">#</a> 文件读取</h3>
<h4 id="fs-readfilesync" tabindex="-1"><a class="header-anchor" href="#fs-readfilesync" aria-hidden="true">#</a> fs.readFileSync</h4>
<p>同步读取，参数如下：</p>
<ul>
<li>第一个参数为读取文件的路径或文件描述符</li>
<li>第二个参数为 options，默认值为 null，其中有 encoding（编码，默认为 null）和 flag（标识位，默认为 r），也可直接传入 encoding</li>
</ul>
<p>结果为返回文件的内容</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> buf <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span><span class="token string">"1.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> data <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span><span class="token string">"1.txt"</span><span class="token punctuation">,</span> <span class="token string">"utf8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &lt;Buffer 48 65 6c 6c 6f></span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Hello</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="fs-readfile" tabindex="-1"><a class="header-anchor" href="#fs-readfile" aria-hidden="true">#</a> fs.readFile</h4>
<p>异步读取方法 <code v-pre>readFile</code> 与 <code v-pre>readFileSync</code> 的前两个参数相同，最后一个参数为回调函数，函数内有两个参数 <code v-pre>err</code>（错误）和 <code v-pre>data</code>（数据），该方法没有返回值，回调函数在读取文件成功后执行</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">"1.txt"</span><span class="token punctuation">,</span> <span class="token string">"utf8"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
       console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Hello</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件写入" tabindex="-1"><a class="header-anchor" href="#文件写入" aria-hidden="true">#</a> 文件写入</h3>
<h4 id="writefilesync" tabindex="-1"><a class="header-anchor" href="#writefilesync" aria-hidden="true">#</a> writeFileSync</h4>
<p>同步写入，有三个参数：</p>
<ul>
<li>
<p>第一个参数为写入文件的路径或文件描述符</p>
</li>
<li>
<p>第二个参数为写入的数据，类型为 String 或 Buffer</p>
</li>
<li>
<p>第三个参数为 options，默认值为 null，其中有 encoding（编码，默认为 utf8）、 flag（标识位，默认为 w）和 mode（权限位，默认为 0o666），也可直接传入 encoding</p>
</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

fs<span class="token punctuation">.</span><span class="token function">writeFileSync</span><span class="token punctuation">(</span><span class="token string">"2.txt"</span><span class="token punctuation">,</span> <span class="token string">"Hello world"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> data <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span><span class="token string">"2.txt"</span><span class="token punctuation">,</span> <span class="token string">"utf8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Hello world</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="writefile" tabindex="-1"><a class="header-anchor" href="#writefile" aria-hidden="true">#</a> writeFile</h4>
<p>异步写入，<code v-pre>writeFile</code> 与 <code v-pre>writeFileSync</code> 的前三个参数相同，最后一个参数为回调函数，函数内有一个参数 <code v-pre>err</code>（错误），回调函数在文件写入数据成功后执行</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

fs<span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span><span class="token string">"2.txt"</span><span class="token punctuation">,</span> <span class="token string">"Hello world"</span><span class="token punctuation">,</span> <span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">"2.txt"</span><span class="token punctuation">,</span> <span class="token string">"utf8"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Hello world</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件追加写入" tabindex="-1"><a class="header-anchor" href="#文件追加写入" aria-hidden="true">#</a> 文件追加写入</h3>
<h4 id="appendfilesync" tabindex="-1"><a class="header-anchor" href="#appendfilesync" aria-hidden="true">#</a> appendFileSync</h4>
<p>参数如下：</p>
<ul>
<li>第一个参数为写入文件的路径或文件描述符</li>
<li>第二个参数为写入的数据，类型为 String 或 Buffer</li>
<li>第三个参数为 options，默认值为 null，其中有 encoding（编码，默认为 utf8）、 flag（标识位，默认为 a）和 mode（权限位，默认为 0o666），也可直接传入 encoding</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

fs<span class="token punctuation">.</span><span class="token function">appendFileSync</span><span class="token punctuation">(</span><span class="token string">"3.txt"</span><span class="token punctuation">,</span> <span class="token string">" world"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> data <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span><span class="token string">"3.txt"</span><span class="token punctuation">,</span> <span class="token string">"utf8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="appendfile" tabindex="-1"><a class="header-anchor" href="#appendfile" aria-hidden="true">#</a> appendFile</h4>
<p>异步追加写入方法 <code v-pre>appendFile</code> 与 <code v-pre>appendFileSync</code> 的前三个参数相同，最后一个参数为回调函数，函数内有一个参数 <code v-pre>err</code>（错误），回调函数在文件追加写入数据成功后执行</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

fs<span class="token punctuation">.</span><span class="token function">appendFile</span><span class="token punctuation">(</span><span class="token string">"3.txt"</span><span class="token punctuation">,</span> <span class="token string">" world"</span><span class="token punctuation">,</span> <span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">"3.txt"</span><span class="token punctuation">,</span> <span class="token string">"utf8"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Hello world</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件拷贝" tabindex="-1"><a class="header-anchor" href="#文件拷贝" aria-hidden="true">#</a> 文件拷贝</h3>
<h4 id="copyfilesync" tabindex="-1"><a class="header-anchor" href="#copyfilesync" aria-hidden="true">#</a> copyFileSync</h4>
<p>同步拷贝</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

fs<span class="token punctuation">.</span><span class="token function">copyFileSync</span><span class="token punctuation">(</span><span class="token string">"3.txt"</span><span class="token punctuation">,</span> <span class="token string">"4.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> data <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span><span class="token string">"4.txt"</span><span class="token punctuation">,</span> <span class="token string">"utf8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Hello world</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="copyfile" tabindex="-1"><a class="header-anchor" href="#copyfile" aria-hidden="true">#</a> copyFile</h4>
<p>异步拷贝</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

fs<span class="token punctuation">.</span><span class="token function">copyFile</span><span class="token punctuation">(</span><span class="token string">"3.txt"</span><span class="token punctuation">,</span> <span class="token string">"4.txt"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">"4.txt"</span><span class="token punctuation">,</span> <span class="token string">"utf8"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Hello world</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建目录" tabindex="-1"><a class="header-anchor" href="#创建目录" aria-hidden="true">#</a> 创建目录</h3>
<h4 id="mkdirsync" tabindex="-1"><a class="header-anchor" href="#mkdirsync" aria-hidden="true">#</a> mkdirSync</h4>
<p>同步创建，参数为一个目录的路径，没有返回值，在创建目录的过程中，必须保证传入的路径前面的文件目录都存在，否则会抛出异常</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 假设已经有了 a 文件夹和 a 下的 b 文件夹</span>
fs<span class="token punctuation">.</span><span class="token function">mkdirSync</span><span class="token punctuation">(</span><span class="token string">"a/b/c"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="mkdir" tabindex="-1"><a class="header-anchor" href="#mkdir" aria-hidden="true">#</a> mkdir</h4>
<p>异步创建，第二个参数为回调函数</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>fs<span class="token punctuation">.</span><span class="token function">mkdir</span><span class="token punctuation">(</span><span class="token string">"a/b/c"</span><span class="token punctuation">,</span> <span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>err<span class="token punctuation">)</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"创建成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>
<p>http://nodejs.cn/api/fs.html</p>
</li>
<li>
<p>https://segmentfault.com/a/1190000019913303</p>
</li>
</ul>
</div></template>


