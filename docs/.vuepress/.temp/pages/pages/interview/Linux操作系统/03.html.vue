<template><div><h1 id="说说-linux系统下-文件操作常用的命令有哪些" tabindex="-1"><a class="header-anchor" href="#说说-linux系统下-文件操作常用的命令有哪些" aria-hidden="true">#</a> 说说 linux系统下 文件操作常用的命令有哪些？</h1>
<p><img src="https://static.vue-js.com/6cb38ac0-03c1-11ec-a752-75723a64e8f5.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><code v-pre>Linux</code> 是一个开源的操作系统（OS），是一系列Linux内核基础上开发的操作系统的总称（常见的有Ubuntu、centos）</p>
<p>系统通常会包含以下4个主要部分</p>
<ul>
<li>内核</li>
<li>shell</li>
<li>文件系统</li>
<li>应用程序</li>
</ul>
<p>文件系统是一个<strong>目录树的结构</strong>，文件系统结构从一个根目录开始，根目录下可以有任意多个文件和子目录，子目录中又可以有任意多个文件和子目录</p>
<p><img src="https://static.vue-js.com/b71b64c0-03c1-11ec-a752-75723a64e8f5.png" alt=""></p>
<h2 id="二、文件操作" tabindex="-1"><a class="header-anchor" href="#二、文件操作" aria-hidden="true">#</a> 二、文件操作</h2>
<p>常见处理目录的命令如下：</p>
<ul>
<li>ls（英文全拼：list files）: 列出目录及文件名</li>
<li>cd（英文全拼：change directory）：切换目录</li>
<li>pwd（英文全拼：print work directory）：显示目前的目录</li>
<li>mkdir（英文全拼：make directory）：创建一个新的目录</li>
<li>rmdir（英文全拼：remove directory）：删除一个空的目录</li>
<li>cp（英文全拼：copy file）: 复制文件或目录</li>
<li>rm（英文全拼：remove）: 删除文件或目录</li>
<li>mv（英文全拼：move file）: 移动文件与目录，或修改文件与目录的名称</li>
</ul>
<h3 id="ls" tabindex="-1"><a class="header-anchor" href="#ls" aria-hidden="true">#</a> ls</h3>
<p>列出目录文件，选项与参数：</p>
<ul>
<li>-a ：全部的文件，连同隐藏文件( 开头为 . 的文件) 一起列出来(常用)</li>
<li>-d ：仅列出目录本身，而不是列出目录内的文件数据(常用)</li>
<li>-l ：长数据串列出，包含文件的属性与权限等等数据；(常用)</li>
</ul>
<p>例如将家目录下的所有文件列出来(含属性与隐藏档)</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span>root@www <span class="token operator">~</span><span class="token punctuation">]</span># ls <span class="token operator">-</span>al <span class="token operator">~</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="cd" tabindex="-1"><a class="header-anchor" href="#cd" aria-hidden="true">#</a> cd</h3>
<p>切换工作目录</p>
<p>语法：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> cd <span class="token punctuation">[</span>相对路径或绝对路径<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code># 表示回到自己的家目录，亦即是 <span class="token operator">/</span>root 这个目录
<span class="token punctuation">[</span>root@www runoob<span class="token punctuation">]</span># cd <span class="token operator">~</span>

# 表示去到目前的上一级目录，亦即是 <span class="token operator">/</span>root 的上一级目录的意思；
<span class="token punctuation">[</span>root@www <span class="token operator">~</span><span class="token punctuation">]</span># cd <span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pwd" tabindex="-1"><a class="header-anchor" href="#pwd" aria-hidden="true">#</a> pwd</h3>
<p><code v-pre>pwd</code> 是 <code v-pre>Print Working Directory</code> 的缩写，也就是显示目前所在目录的命令。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span>root@www <span class="token operator">~</span><span class="token punctuation">]</span># pwd <span class="token punctuation">[</span><span class="token operator">-</span><span class="token constant">P</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>选项与参数：</p>
<ul>
<li>-P ：显示出确实的路径，而非使用连结 (link) 路径</li>
</ul>
<h3 id="mkdir" tabindex="-1"><a class="header-anchor" href="#mkdir" aria-hidden="true">#</a> mkdir</h3>
<p>创建新目录</p>
<p>语法：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>mkdir <span class="token punctuation">[</span><span class="token operator">-</span>mp<span class="token punctuation">]</span> 目录名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>选项与参数：</p>
<ul>
<li>-m ：配置文件的权限</li>
<li>-p ：帮助你直接将所需要的目录(包含上一级目录)递归创建起来</li>
</ul>
<h3 id="rmdir-删除空的目录" tabindex="-1"><a class="header-anchor" href="#rmdir-删除空的目录" aria-hidden="true">#</a> rmdir (删除空的目录)</h3>
<p>语法：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> rmdir <span class="token punctuation">[</span><span class="token operator">-</span>p<span class="token punctuation">]</span> 目录名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>选项与参数：</p>
<ul>
<li>-p ：连同上一级『空的』目录也一起删除</li>
</ul>
<h3 id="cp" tabindex="-1"><a class="header-anchor" href="#cp" aria-hidden="true">#</a> cp</h3>
<p>即拷贝文件和目录</p>
<p>语法：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>cp 目标文件 拷贝文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>用法如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>cp file file_copy <span class="token operator">--</span><span class="token operator">></span> file 是目标文件，file_copy 是拷贝出来的文件
cp file one <span class="token operator">--</span><span class="token operator">></span> 把 file 文件拷贝到 one 目录下，并且文件名依然为 file
cp file one<span class="token operator">/</span>file_copy <span class="token operator">--</span><span class="token operator">></span> 把 file 文件拷贝到 one 目录下，文件名为file_copy
cp <span class="token operator">*</span><span class="token punctuation">.</span>txt folder <span class="token operator">--</span><span class="token operator">></span> 把当前目录下所有 txt 文件拷贝到 folder 目录下
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>常用参数如下：</p>
<ul>
<li><code v-pre>-r</code> 递归的拷贝，常用来拷贝一整个目录</li>
</ul>
<h3 id="rm-移除文件或目录" tabindex="-1"><a class="header-anchor" href="#rm-移除文件或目录" aria-hidden="true">#</a> rm (移除文件或目录)</h3>
<p>语法：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> rm <span class="token punctuation">[</span><span class="token operator">-</span>fir<span class="token punctuation">]</span> 文件或目录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>选项与参数：</p>
<ul>
<li>-f ：就是 force 的意思，忽略不存在的文件，不会出现警告信息；</li>
<li>-i ：互动模式，在删除前会询问使用者是否动作</li>
<li>-r ：递归删除啊！最常用在目录的删除了！这是非常危险的选项！！</li>
</ul>
<h3 id="mv-移动文件与目录-或修改名称" tabindex="-1"><a class="header-anchor" href="#mv-移动文件与目录-或修改名称" aria-hidden="true">#</a> mv (移动文件与目录，或修改名称)</h3>
<p>语法：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span>root@www <span class="token operator">~</span><span class="token punctuation">]</span># mv <span class="token punctuation">[</span><span class="token operator">-</span>fiu<span class="token punctuation">]</span> source destination
<span class="token punctuation">[</span>root@www <span class="token operator">~</span><span class="token punctuation">]</span># mv <span class="token punctuation">[</span>options<span class="token punctuation">]</span> source1 source2 source3 <span class="token operator">...</span><span class="token punctuation">.</span> directory
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>选项与参数：</p>
<ul>
<li>-f ：force 强制的意思，如果目标文件已经存在，不会询问而直接覆盖；</li>
<li>-i ：若目标文件 (destination) 已经存在时，就会询问是否覆盖！</li>
<li>-u ：若目标文件已经存在，且 source 比较新，才会升级 (update)</li>
</ul>
<h3 id="ln" tabindex="-1"><a class="header-anchor" href="#ln" aria-hidden="true">#</a> ln</h3>
<p><code v-pre>Linux</code> 文件的存储方式分为3个部分，文件名、文件内容以及权限，其中文件名的列表是存储在硬盘的其它地方和文件内容是分开存放的，每个文件名通过 <code v-pre>inode</code> 标识绑定到文件内容</p>
<p><code v-pre>Linux</code> 下有两种链接类型：硬链接和软链接</p>
<h4 id="硬链接" tabindex="-1"><a class="header-anchor" href="#硬链接" aria-hidden="true">#</a> 硬链接</h4>
<p>使链接的两个文件共享同样文件内容，就是同样的 <code v-pre>inode</code> ，一旦文件1和文件2之间有了硬链接，那么修改任何一个文件，修改的都是同一块内容</p>
<p>语法：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code># 创建 file2 为 file1 的硬链接
ln file1 file2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://static.vue-js.com/c92e7800-03c1-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>删除文件1不会影响删除文件2，对于硬链接来说，删除任意一方的文件，共同指向的文件内容并不会从硬盘上删除</p>
<p>只有同时删除了两个文件后后，它们共同指向的文件内容才会消失。</p>
<h4 id="软链接" tabindex="-1"><a class="header-anchor" href="#软链接" aria-hidden="true">#</a> 软链接</h4>
<p>类似<code v-pre>window</code>系统的快捷方式</p>
<p>使用方式：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>ln <span class="token operator">-</span>s file1 file2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://static.vue-js.com/d5a22eb0-03c1-11ec-8e64-91fdec0f05a1.png" alt="">其实 <code v-pre>file2</code> 只是 <code v-pre>file1</code> 的一个快捷方式，它指向的是 <code v-pre>file1</code> ，所以显示的是 <code v-pre>file1</code> 的内容，但其实 <code v-pre>file2</code> 的 <code v-pre>inode</code> 与 <code v-pre>file1</code> 并不相同</p>
<p>如果</p>
<p>删除了 <code v-pre>file2</code> 的话， <code v-pre>file1</code> 是不会受影响的，但如果删除 <code v-pre>file1</code> 的话， <code v-pre>file2</code> 就会变成死链接，因为指向的文件不见了</p>
<h2 id="三、文件查看" tabindex="-1"><a class="header-anchor" href="#三、文件查看" aria-hidden="true">#</a> 三、文件查看</h2>
<p>常见的文件内容查看有如下：</p>
<ul>
<li>cat 由第一行开始显示文件内容</li>
<li>less 一页一页的显示文件内容</li>
<li>head 只看头几行</li>
<li>tail 只看尾巴几行</li>
</ul>
<h3 id="cat" tabindex="-1"><a class="header-anchor" href="#cat" aria-hidden="true">#</a> cat</h3>
<p>由第一行开始显示文件内容</p>
<p>语法：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>cat <span class="token punctuation">[</span><span class="token operator">-</span>AbEnTv<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>常见的选项与参数如下：</p>
<ul>
<li>-b ：列出行号，仅针对非空白行做行号显示，空白行不标行号！</li>
<li>-n ：列印出行号，连同空白行也会有行号，与 -b 的选项不同</li>
</ul>
<h3 id="less" tabindex="-1"><a class="header-anchor" href="#less" aria-hidden="true">#</a> less</h3>
<p>一页一页翻动，以下实例输出/etc/man.config文件的内容：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span>root@www <span class="token operator">~</span><span class="token punctuation">]</span># less <span class="token operator">/</span>etc<span class="token operator">/</span>man<span class="token punctuation">.</span>config
#
# Generated automatically from man<span class="token punctuation">.</span>conf<span class="token punctuation">.</span>in by the
# configure script<span class="token punctuation">.</span>
#
# man<span class="token punctuation">.</span>conf from man<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">.</span>6d
<span class="token operator">...</span><span class="token punctuation">.</span><span class="token punctuation">(</span>中间省略<span class="token punctuation">)</span><span class="token operator">...</span><span class="token punctuation">.</span>
<span class="token operator">:</span>   <span class="token operator">&lt;=</span><span class="token operator">=</span> 这里可以等待你输入命令！
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>less运行时可以输入的命令有：</p>
<ul>
<li>空白键 ：向下翻动一页；</li>
<li>[pagedown]：向下翻动一页；</li>
<li>[pageup] ：向上翻动一页；</li>
<li>/字串 ：向下搜寻『字串』的功能；</li>
<li>?字串 ：向上搜寻『字串』的功能；</li>
<li>n ：重复前一个搜寻 (与 / 或 ? 有关！)</li>
<li>N ：反向的重复前一个搜寻 (与 / 或 ? 有关！)</li>
<li>q ：离开 less 这个程序</li>
</ul>
<h3 id="head" tabindex="-1"><a class="header-anchor" href="#head" aria-hidden="true">#</a> head</h3>
<p>取出文件前面几行</p>
<p>语法：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>head <span class="token punctuation">[</span><span class="token operator">-</span>n number<span class="token punctuation">]</span> 文件 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>选项与参数：</p>
<ul>
<li>-n ：后面接数字，代表显示几行的意思</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span>root@www <span class="token operator">~</span><span class="token punctuation">]</span># head <span class="token operator">/</span>etc<span class="token operator">/</span>man<span class="token punctuation">.</span>config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="tail" tabindex="-1"><a class="header-anchor" href="#tail" aria-hidden="true">#</a> tail</h3>
<p>取出文件后面几行</p>
<p>语法：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>tail <span class="token punctuation">[</span><span class="token operator">-</span>n number<span class="token punctuation">]</span> 文件 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>选项与参数：</p>
<ul>
<li>-n ：后面接数字，代表显示几行的意思</li>
<li>-f ：表示持续侦测后面所接的档名，要等到按下[ctrl]-c才会结束tail的侦测</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://www.runoob.com/linux/linux-file-content-manage.html</li>
<li>https://juejin.cn/post/6938385978004340744#heading-35</li>
<li>https://zh.wikipedia.org/wiki/Linux</li>
</ul>
</div></template>


