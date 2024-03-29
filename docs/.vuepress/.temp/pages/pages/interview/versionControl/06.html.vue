<template><div><h1 id="git-reset-和-git-revert-的理解-区别" tabindex="-1"><a class="header-anchor" href="#git-reset-和-git-revert-的理解-区别" aria-hidden="true">#</a> git reset 和 git revert 的理解？区别？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<ul>
<li>git revert 是用一次新的 commit 来回滚之前的 commit，git reset 是直接删除指定的 commit</li>
<li>git reset 是把 HEAD 向后移动了一下，而 git revert 是 HEAD 继续前进</li>
</ul>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<h3 id="git-reset" tabindex="-1"><a class="header-anchor" href="#git-reset" aria-hidden="true">#</a> git reset</h3>
<p><code v-pre>reset</code>用于回退版本，可以遗弃不再使用的提交</p>
<p>执行遗弃时，需要根据影响的范围而指定不同的参数，可以指定是否复原索引或工作树内容</p>
<p><img src="https://static.vue-js.com/ab4d0c00-ff72-11eb-bc6f-3f06e1491664.png" alt=""></p>
<h3 id="git-revert" tabindex="-1"><a class="header-anchor" href="#git-revert" aria-hidden="true">#</a> git revert</h3>
<p>在当前提交后面，新增一次提交，抵消掉上一次提交导致的所有变化，不会改变过去的历史，主要是用于安全地取消过去发布的提交</p>
<p><img src="https://static.vue-js.com/bd12c290-ff72-11eb-991d-334fd31f0201.png" alt=""></p>
<h2 id="二、如何用" tabindex="-1"><a class="header-anchor" href="#二、如何用" aria-hidden="true">#</a> 二、如何用</h2>
<h3 id="git-reset-1" tabindex="-1"><a class="header-anchor" href="#git-reset-1" aria-hidden="true">#</a> git reset</h3>
<p>当没有指定<code v-pre>ID</code>的时候，默认使用<code v-pre>HEAD</code>，如果指定<code v-pre>ID</code>，那么就是基于指向<code v-pre>ID</code>去变动暂存区或工作区的内容</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 没有指定ID, 暂存区的内容会被当前ID版本号的内容覆盖，工作区不变</span>
git reset

<span class="token comment">// 指定ID，暂存区的内容会被指定ID版本号的内容覆盖，工作区不变</span>
git reset <span class="token operator">&lt;</span><span class="token constant">ID</span><span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>日志<code v-pre>ID</code>可以通过查询，可以<code v-pre>git log</code>进行查询，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>commit <span class="token function">a7700083ace1204ccdff9f71631fb34c9913f7c5</span> <span class="token punctuation">(</span><span class="token constant">HEAD</span> <span class="token operator">-</span><span class="token operator">></span> master<span class="token punctuation">)</span>
<span class="token literal-property property">Author</span><span class="token operator">:</span> linguanghui <span class="token operator">&lt;</span>linguanghui@baidu<span class="token punctuation">.</span>com<span class="token operator">></span>
<span class="token literal-property property">Date</span><span class="token operator">:</span>   Tue Aug <span class="token number">17</span> <span class="token number">22</span><span class="token operator">:</span><span class="token number">34</span><span class="token operator">:</span><span class="token number">40</span> <span class="token number">2021</span> <span class="token operator">+</span><span class="token number">0800</span>

    second commit

commit e31118663ce66717edd8a179688a7f3dde5a9393
<span class="token literal-property property">Author</span><span class="token operator">:</span> linguanghui <span class="token operator">&lt;</span>linguanghui@baidu<span class="token punctuation">.</span>com<span class="token operator">></span>
<span class="token literal-property property">Date</span><span class="token operator">:</span>   Tue Aug <span class="token number">17</span> <span class="token number">22</span><span class="token operator">:</span><span class="token number">20</span><span class="token operator">:</span><span class="token number">01</span> <span class="token number">2021</span> <span class="token operator">+</span><span class="token number">0800</span>

    first commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>常见命令如下：</p>
<ul>
<li>
<p>--mixed（默认）：默认的时候，只有暂存区变化</p>
</li>
<li>
<p>--hard 参数：如果使用 --hard 参数，那么工作区也会变化</p>
</li>
<li>
<p>--soft：如果使用 --soft 参数，那么暂存区和工作区都不会变化</p>
</li>
</ul>
<p><img src="https://static.vue-js.com/225b41e0-ff73-11eb-bc6f-3f06e1491664.png" alt=""></p>
<h3 id="git-revert-1" tabindex="-1"><a class="header-anchor" href="#git-revert-1" aria-hidden="true">#</a> git revert</h3>
<p>跟<code v-pre>git reset</code>用法基本一致，<code v-pre>git revert</code> 撤销某次操作，此次操作之前和之后的 <code v-pre>commit</code>和<code v-pre>history</code>都会保留，并且把这次撤销，作为一次最新的提交，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>git revert <span class="token operator">&lt;</span>commit_id<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果撤销前一个版本，可以通过如下命令：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>git revert <span class="token constant">HEAD</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>撤销前前一次，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>git revert <span class="token constant">HEAD</span><span class="token operator">^</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="三、区别" tabindex="-1"><a class="header-anchor" href="#三、区别" aria-hidden="true">#</a> 三、区别</h2>
<p>撤销（revert）被设计为撤销公开的提交（比如已经 push）的安全方式，<code v-pre>git reset</code>被设计为重设本地更改</p>
<p>因为两个命令的目的不同，它们的实现也不一样：重设完全地移除了一堆更改，而撤销保留了原来的更改，用一个新的提交来实现撤销</p>
<p>两者主要区别如下：</p>
<ul>
<li>git revert 是用一次新的 commit 来回滚之前的 commit，git reset 是直接删除指定的 commit</li>
<li>git reset 是把 HEAD 向后移动了一下，而 git revert 是 HEAD 继续前进，只是新的 commit 的内容和要 revert 的内容正好相反，能够抵消要被 revert 的内容</li>
<li>在回滚这一操作上看，效果差不多。但是在日后继续 merge 以前的老版本时有区别</li>
</ul>
<blockquote>
<p>git revert 是用一次逆向的 commit“中和”之前的提交，因此日后合并老的 branch 时，之前提交合并的代码仍然存在，导致不能够重新合并</p>
<p>但是 git reset 是之间把某些 commit 在某个 branch 上删除，因而和老的 branch 再次 merge 时，这些被回滚的 commit 应该还会被引入</p>
</blockquote>
<ul>
<li>如果回退分支的代码以后还需要的情况则使用<code v-pre>git revert</code>， 如果分支是提错了没用的并且不想让别人发现这些错误代码，则使用<code v-pre>git reset</code></li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://juejin.cn/post/6844903542931587086</li>
<li>https://marklodato.github.io/visual-git-guide/index-zh-cn.html#reset</li>
</ul>
</div></template>


