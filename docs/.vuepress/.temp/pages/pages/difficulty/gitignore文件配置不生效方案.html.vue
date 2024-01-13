<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-12 10:46:53
 * @LastEditors: lijing
 * @LastEditTime: 2024-01-13 18:43:12
 * @Description: 
-->
<h1 id="gitignore文件配置不生效方案" tabindex="-1"><a class="header-anchor" href="#gitignore文件配置不生效方案" aria-hidden="true">#</a> .gitignore文件配置不生效方案</h1>
<h1 id="一、问题" tabindex="-1"><a class="header-anchor" href="#一、问题" aria-hidden="true">#</a> 一、问题</h1>
<p>在上次提交代码的时候，连同node_modules、logs等一些没有必要的文件夹或文件都上传了，在.gitignore文件中都把它们加进去了，没想到不起作用，上网查阅之后才知道自己在第一次提交的时候git被跟踪了，所以再加入.gitignore后是没有作用的</p>
<h1 id="二、解决方法" tabindex="-1"><a class="header-anchor" href="#二、解决方法" aria-hidden="true">#</a> 二、解决方法</h1>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>git ls<span class="token operator">-</span>files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>使用此命令，可以看到被追中的文件</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>git rm <span class="token operator">-</span>r <span class="token operator">--</span>cached 文件名<span class="token operator">/</span> <span class="token operator">-</span>f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>例如：git rm -r --cached node_modules/ -f 可以把追踪的文件去除掉</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>git ls<span class="token operator">-</span>files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>去除掉之后，再使用这个命令查看一些，是否还存在，不存在，成功，然后再git add . 再commit 再push。</p>
</blockquote>
</div></template>


