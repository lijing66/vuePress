<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-15 23:14:04
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-15 23:22:05
 * @Description: 
-->
<h1 id="说说-git-中-head、工作树和索引之间的区别" tabindex="-1"><a class="header-anchor" href="#说说-git-中-head、工作树和索引之间的区别" aria-hidden="true">#</a> 说说 Git 中 HEAD、工作树和索引之间的区别？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<ul>
<li>HEAD 指针指向我们所在的分支最新提交</li>
<li>工作树是查看和编辑的（源）文件的实际内容</li>
<li>索引是放置你想要提交给 git 仓库文件的地方</li>
</ul>
<h2 id="一、head" tabindex="-1"><a class="header-anchor" href="#一、head" aria-hidden="true">#</a> 一、HEAD</h2>
<p><img src="https://static.vue-js.com/2de056a0-fa40-11eb-991d-334fd31f0201.png" alt=""></p>
<p>在<code v-pre>git</code>中，可以存在很多分支，其本质上是一个指向<code v-pre>commit</code>对象的可变指针，而<code v-pre>Head</code>是一个特别的指针，是一个指向你正在工作中的本地分支的指针</p>
<p>简单来讲，就是你现在在哪儿，HEAD 就指向哪儿</p>
<p>例如当前我们处于<code v-pre>master</code>分支，所以<code v-pre>HEAD</code>这个指针指向了<code v-pre>master</code>分支指针</p>
<p><img src="https://static.vue-js.com/36cb0da0-fa40-11eb-991d-334fd31f0201.png" alt=""></p>
<p>然后通过调用<code v-pre>git checkout test</code>切换到<code v-pre>test</code>分支，那么<code v-pre>HEAD</code>则指向<code v-pre>test</code>分支，如下图：</p>
<p><img src="https://static.vue-js.com/3e86ba80-fa40-11eb-991d-334fd31f0201.png" alt=""></p>
<p>但我们在<code v-pre>test</code>分支再一次<code v-pre>commit</code>信息的时候，<code v-pre>HEAD</code>指针仍然指向了<code v-pre>test</code>分支指针，而<code v-pre>test</code>分支指针已经指向了最新创建的提交，如下图：</p>
<p><img src="https://static.vue-js.com/439839b0-fa66-11eb-991d-334fd31f0201.png" alt=""></p>
<p>这个<code v-pre>HEAD</code>存储的位置就在<code v-pre>.git/HEAD</code>目录中，查看信息可以看到<code v-pre>HEAD</code>指向了另一个文件</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$ cat <span class="token punctuation">.</span>git<span class="token operator">/</span><span class="token constant">HEAD</span>
<span class="token literal-property property">ref</span><span class="token operator">:</span> refs<span class="token operator">/</span>heads<span class="token operator">/</span>master

$ cat <span class="token punctuation">.</span>git<span class="token operator">/</span>refs<span class="token operator">/</span>heads<span class="token operator">/</span>master
7406a10efcc169bbab17827aeda189aa20376f7f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个文件的内容是一串哈希码，而这个哈希码正是<code v-pre>master</code>分支上最新的提交所对应的哈希码</p>
<p>所以，当我们切换分支的时候，<code v-pre>HEAD</code>指针通常指向我们所在的分支，当我们在某个分支上创建新的提交时，分支指针总是会指向当前分支的最新提交</p>
<p>所以，HEAD 指针 ——–&gt; 分支指针 ——–&gt; 最新提交</p>
<h2 id="二、工作树和索引" tabindex="-1"><a class="header-anchor" href="#二、工作树和索引" aria-hidden="true">#</a> 二、工作树和索引</h2>
<p>在<code v-pre>Git</code>管理下，大家实际操作的目录被称为工作树，也就是工作区域</p>
<p>在数据库和工作树之间有索引，索引是为了向数据库提交作准备的区域，也被称为暂存区域</p>
<p><img src="https://static.vue-js.com/46e5ac40-fa40-11eb-bc6f-3f06e1491664.png" alt=""></p>
<p><code v-pre>Git</code>在执行提交的时候，不是直接将工作树的状态保存到数据库，而是将设置在中间索引区域的状态保存到数据库</p>
<p>因此，要提交文件，首先需要把文件加入到索引区域中。</p>
<p>所以，凭借中间的索引，可以避免工作树中不必要的文件提交，还可以将文件修改内容的一部分加入索引区域并提交</p>
<h2 id="三、区别" tabindex="-1"><a class="header-anchor" href="#三、区别" aria-hidden="true">#</a> 三、区别</h2>
<p>从所在的位置来看：</p>
<ul>
<li>
<p>HEAD 指针通常指向我们所在的分支，当我们在某个分支上创建新的提交时，分支指针总是会指向当前分支的最新提交</p>
</li>
<li>
<p>工作树是查看和编辑的（源）文件的实际内容</p>
</li>
<li>
<p>索引是放置你想要提交给 git 仓库文件的地方，如工作树的代码通过 git add 则添加到 git 索引中，通过 git commit 则将索引区域的文件提交到 git 仓库中</p>
</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://backlog.com/git-tutorial/cn/intro/intro1_4.html</li>
<li>https://juejin.cn/post/6844903598522908686</li>
<li>https://www.zsythink.net/archives/3412</li>
</ul>
</div></template>


