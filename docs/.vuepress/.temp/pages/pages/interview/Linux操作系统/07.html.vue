<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-15 23:08:24
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-17 21:08:56
 * @Description: 
-->
<h1 id="说说你对-shell-的理解-常见的命令" tabindex="-1"><a class="header-anchor" href="#说说你对-shell-的理解-常见的命令" aria-hidden="true">#</a> 说说你对 shell 的理解？常见的命令？</h1>
<p><img src="https://static.vue-js.com/71003620-0883-11ec-a752-75723a64e8f5.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><code v-pre>Shell</code>是一个由<code v-pre>c</code>语言编写的应用程序，它是用户使用 Linux 的桥梁。Shell 既是一种命令语言，又是一种程序设计语言</p>
<p>它连接了用户和<code v-pre>Linux</code>内核，让用户能够更加高效、安全、低成本地使用 <code v-pre>Linux</code> 内核</p>
<p>其本身并不是内核的一部分，它只是站在内核的基础上编写的一个应用程序，它和 QQ、微信等其它软件没有什么区别，特殊的地方就是开机立马启动，并呈现在用户面前</p>
<p>主要作用是接收用户输入的命令，并对命令进行处理，处理完毕后再将结果反馈给用户，比如输出到显示器、写入到文件等，同样能够调用和组织其他的应用程序，相当于一个领导者的身份，如下图：</p>
<p><img src="https://static.vue-js.com/80db0ca0-0883-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>那么<code v-pre>shell</code>脚本就是多个 <code v-pre>Shell</code> 命令的组合并通过 <code v-pre>if</code> 条件分支控制或循环来组合运算，实现一些复杂功能，文件后缀名为<code v-pre>.sh</code></p>
<p>常用的 <code v-pre>ls</code> 命令，它本身也是一个 <code v-pre>Shell</code> 脚本，通过执行这个 <code v-pre>Shell</code> 脚本可以列举当前目录下的文件列表，如下创建一个<code v-pre>hello.sh</code>脚本</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token hashbang comment">#!/bin/bash</span>

# 执行的命令主体
ls
echo <span class="token string">"hello world"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>#!/bin/bash ：指定脚本要使用的 Shell 类型为 Bash</p>
</li>
<li>
<p>ls、echo： 脚本文件的内容，表明我们执行 hello.sh 脚本时会列举出当前目录的文件列表并且会向控制台打印 `hello world</p>
</li>
</ul>
<p>执行方式为<code v-pre>.hello.zsh</code></p>
<h2 id="二、种类" tabindex="-1"><a class="header-anchor" href="#二、种类" aria-hidden="true">#</a> 二、种类</h2>
<p><code v-pre>Linux</code> 的 <code v-pre>Shell</code> 种类众多，只要能给用户提供命令行环境的程序，常见的有：</p>
<ul>
<li>
<p>Bourne Shell（sh），是目前所有 Shell 的祖先，被安装在几乎所有发源于 Unix 的操作系统上</p>
</li>
<li>
<p>Bourne Again shell（bash） ，是 sh 的一个进阶版本，比 sh 更优秀， bash 是目前大多数 Linux 发行版以及 macOS 操作系统的默认 Shell</p>
</li>
<li>
<p>C Shell（csh） ，它的语法类似 C 语言</p>
</li>
<li>
<p>TENEX C Shell（tcsh） ，它是 csh 的优化版本</p>
</li>
<li>
<p>Korn shell（ksh） ，一般在收费的 Unix 版本上比较多见</p>
</li>
<li>
<p>Z Shell（zsh） ，它是一种比较新近的 Shell ，集 bash 、 ksh 和 tcsh 各家之大成</p>
</li>
</ul>
<p><img src="https://static.vue-js.com/8e739440-0883-11ec-a752-75723a64e8f5.png" alt=""></p>
<p>关于 <code v-pre>Shell</code> 的几个常见命令：</p>
<ul>
<li>ls：查看文件</li>
<li>cd：切换工作目录</li>
<li>pwd：显示用户当前目录</li>
<li>mkdir：创建目录</li>
<li>cp：拷贝</li>
<li>rm：删除</li>
<li>mv：移动</li>
<li>du：显示目录所占用的磁盘空间</li>
</ul>
<h2 id="三、命令" tabindex="-1"><a class="header-anchor" href="#三、命令" aria-hidden="true">#</a> 三、命令</h2>
<p><code v-pre>Shell</code> 并不是简单的堆砌命令，我们还可以在 <code v-pre>Shell</code> 中编程，这和使用 <code v-pre>C++</code>、<code v-pre>C#</code>、<code v-pre>Java</code>、<code v-pre>Python</code> 等常见的编程语言并没有什么两样。</p>
<p>Shell 虽然没有 C++、Java、Python 等强大，但也支持了基本的编程元素，例如：</p>
<ul>
<li>if...else 选择结构，case...in 开关语句，for、while、until 循环；</li>
<li>变量、数组、字符串、注释、加减乘除、逻辑运算等概念；</li>
<li>函数，包括用户自定义的函数和内置函数（例如 printf、export、eval 等）</li>
</ul>
<p>下面以<code v-pre>bash</code>为例简单了解一下<code v-pre>shell</code>的基本使用</p>
<h3 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h3>
<p><code v-pre>Bash</code> 没有数据类型的概念，所有的变量值都是字符串，可以保存一个数字、一个字符、一个字符串等等</p>
<p>同时无需提前声明变量，给变量赋值会直接创建变量</p>
<p>访问变量的语法形式为：<code v-pre>${var}</code> 和 <code v-pre>$var</code> 。</p>
<p>变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界，所以推荐加花括号。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>word<span class="token operator">=</span><span class="token string">"hello"</span>
echo $<span class="token punctuation">{</span>word<span class="token punctuation">}</span>
# Output<span class="token operator">:</span> hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="条件控制" tabindex="-1"><a class="header-anchor" href="#条件控制" aria-hidden="true">#</a> 条件控制</h3>
<p>跟其它程序设计语言一样，Bash 中的条件语句让我们可以决定一个操作是否被执行。结果取决于一个包在<code v-pre>[[ ]]</code>里的表达式</p>
<p>跟其他语言一样，使用<code v-pre>if...else</code>进行表达，如果中括号里的表达式为真，那么<code v-pre>then</code>和<code v-pre>fi</code>之间的代码会被执行，如果则<code v-pre>else</code>和<code v-pre>fi</code>之间的代码会被执行</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token number">2</span> <span class="token operator">-</span>ne <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> then
  echo <span class="token string">"true"</span>
<span class="token keyword">else</span>
  echo <span class="token string">"false"</span>
fi
# Output<span class="token operator">:</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>fi</code>标志着条件代码块的结束</p>
<h3 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h3>
<p>bash 函数定义语法如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span> <span class="token keyword">function</span> <span class="token punctuation">]</span> funname <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
    action<span class="token punctuation">;</span>
    <span class="token punctuation">[</span><span class="token keyword">return</span> int<span class="token punctuation">;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>函数定义时，function 关键字可有可无</li>
<li>函数返回值 - return 返回函数返回值，返回值类型只能为整数（0-255）。如果不加 return 语句，shell 默认将以最后一条命令的运行结果，作为函数返回值</li>
<li>函数返回值在调用该函数后通过 $? 来获得</li>
<li>所有函数在使用前必须定义。这意味着必须将函数放在脚本开始部分，直至 shell 解释器首次发现它时，才可以使用。调用函数仅使用其函数名即可</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>http://c.biancheng.net/view/706.html</li>
<li>https://juejin.cn/post/6930013333454061575</li>
</ul>
</div></template>


