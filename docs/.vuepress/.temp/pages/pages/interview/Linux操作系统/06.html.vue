<template><div><h1 id="说说你对输入输出重定向和管道的理解-应用场景" tabindex="-1"><a class="header-anchor" href="#说说你对输入输出重定向和管道的理解-应用场景" aria-hidden="true">#</a> 说说你对输入输出重定向和管道的理解？应用场景？</h1>
<p><img src="https://static.vue-js.com/1036dde0-0634-11ec-a752-75723a64e8f5.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><code v-pre>linux</code>中有三种标准输入输出，分别是<code v-pre>STDIN</code>，<code v-pre>STDOUT</code>，<code v-pre>STDERR</code>，对应的数字是0、1、2：</p>
<ul>
<li>STDIN 是标准输入，默认从键盘读取信息</li>
<li>STDOUT 是标准输出，默认将输出结果输出至终端</li>
<li>STDERR 是标准错误，默认将输出结果输出至终端</li>
</ul>
<p>对于任何<code v-pre>linux</code>命令的执行会有下面的过程：</p>
<p><img src="https://static.vue-js.com/1a57caf0-0634-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>一条命令的执行需要键盘等的标准输入，命令的执行和正确或错误，其中的每一个双向箭头就是一个通道，所以数据流可以流入到文件端（<strong>重定向或管道</strong>）</p>
<p>简单来讲，重定向就是把本来要显示在终端的命令结果，输送到别的地方，分成：</p>
<ul>
<li>输入重定向：流出到屏幕如果命令所需的输入不是来自键盘，而是来自指定的文件</li>
<li>输出重定向：命令的输出可以不显示在屏幕，而是写在指定的文件中</li>
</ul>
<p>管道就是把两个命令连接起来使用，一个命令的输出作为另一个命令的输入</p>
<p>两者的区别在于：</p>
<ul>
<li>管道触发两个子进程，执行 | 两边的程序；而重定向是在一个进程内执行。</li>
<li>管道两边都是shell命令</li>
<li>重定向符号的右边只能是Linux文件</li>
<li>重定向符号的优先级大于管道</li>
</ul>
<h2 id="二、命令" tabindex="-1"><a class="header-anchor" href="#二、命令" aria-hidden="true">#</a> 二、命令</h2>
<p>重定向常见的命令符号有：</p>
<ul>
<li>&gt; ： 输出重定向到一个文件或设备 覆盖原来的文件</li>
</ul>
<blockquote>
<p>如果该文件不存在，则新建一个文件</p>
<p>如果该文件已经存在，会把文件内容覆盖</p>
<p>这些操纵不会征用用户的确认</p>
</blockquote>
<ul>
<li>&gt;&gt; ：输出重定向到一个文件或设备，但是是 追加原来的文件的末尾</li>
<li>&lt; ：用于制定命令的输入</li>
<li>&lt;&lt; ：从键盘的输入重定向为某个命令的输入</li>
</ul>
<blockquote>
<p>以逐行输入的模式（回车键进行换行）</p>
<p>所有输入的行都将在输入结束字符串之后发送给命令</p>
</blockquote>
<ul>
<li>2&gt; 将一个标准错误输出重定向到一个文件或设备，会覆盖原来的文件</li>
<li>2&gt;&gt; 将一个标准错误输出重定向到一个文件或设备，是追加到原来的文件</li>
<li>2&gt;&amp;1：组合符号，将标准错误输出重定向到标准输出相同的地方</li>
</ul>
<blockquote>
<p>1就是代表标准输出</p>
</blockquote>
<ul>
<li>&gt;&amp; 将一个标准错误输出重定向到一个文件或设备覆盖原来的文件</li>
<li>|&amp; 将一个标准错误管道输出到另一个命令作为输入</li>
</ul>
<h2 id="三、应用场景" tabindex="-1"><a class="header-anchor" href="#三、应用场景" aria-hidden="true">#</a> 三、应用场景</h2>
<p>将当前目录的文件输出重定向到<code v-pre>1.txt</code>文件中，并且会清空原有的<code v-pre>1.txt</code>的内容</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>ls <span class="token operator">-</span>a <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">.</span>txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者以追加的形式，重定向输入到<code v-pre>1.txt</code>中</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>ls <span class="token operator">-</span>a <span class="token operator">>></span> <span class="token number">1</span><span class="token punctuation">.</span>txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将标准错误输出到某个文件，可以如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$ touch <span class="token number">2</span><span class="token operator">></span> <span class="token number">2</span><span class="token punctuation">.</span>txt
$ cat <span class="token number">2</span><span class="token punctuation">.</span>txt
<span class="token literal-property property">touch</span><span class="token operator">:</span> 缺少了文件操作数
请尝试执行 <span class="token string">"touch --help"</span> 来获取更多信息。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过组合符号将两者结合一起，无论进程输出的信息是正确还是错误的信息，都会重定向到指定的文件里</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span>root@linguanghui home<span class="token punctuation">]</span># abc <span class="token operator">&amp;</span><span class="token operator">></span> file<span class="token punctuation">.</span>txt
<span class="token punctuation">[</span>root@linguanghui home<span class="token punctuation">]</span># cat file<span class="token punctuation">.</span>txt 
<span class="token operator">-</span>bash<span class="token operator">:</span> abc<span class="token operator">:</span> command not found
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再者通过管道查询文件内容是否包含想要的信息：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>cat test<span class="token punctuation">.</span>txt <span class="token operator">|</span> grep <span class="token operator">-</span>n <span class="token string">'xxx'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述<code v-pre>cat test.txt</code>会将<code v-pre>test.txt</code>的内容作为标准输出，然后利用管道，将其作为<code v-pre>grep -n 'xxx'</code>命令的标准输入。</p>
<h3 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h3>
<ul>
<li>https://segmentfault.com/a/1190000020519335</li>
<li>https://murphypei.github.io/blog/2018/04/linux-redirect-pipe</li>
<li>https://www.huaweicloud.com/articles/0fb70e8c724ae79f4fc8d676cd6160d3.html</li>
</ul>
</div></template>


