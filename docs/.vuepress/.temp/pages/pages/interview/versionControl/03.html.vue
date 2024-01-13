<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-15 23:14:04
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-17 20:48:16
 * @Description: 
-->
<h1 id="git-pull-和-git-fetch" tabindex="-1"><a class="header-anchor" href="#git-pull-和-git-fetch" aria-hidden="true">#</a> git pull 和 git fetch</h1>
<p>git pull = git fetch + git merge</p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>先回顾两个命令的定义</p>
<ul>
<li>git fetch 命令用于从另一个存储库下载对象和引用</li>
<li>git pull 命令用于从另一个存储库或本地分支获取并集成(整合)</li>
</ul>
<p>再来看一次<code v-pre>git</code>的工作流程图，如下所示：</p>
<p><img src="https://static.vue-js.com/d523ba60-fac2-11eb-991d-334fd31f0201.png" alt=""></p>
<p>可以看到，<code v-pre>git fetch</code>是将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中</p>
<p>而<code v-pre>git pull</code> 则是将远程主机的最新内容拉下来后直接合并，即：<code v-pre>git pull = git fetch + git merge</code>，这样可能会产生冲突，需要手动解决</p>
<p>在我们本地的<code v-pre>git</code>文件中对应也存储了<code v-pre>git</code>本地仓库分支的<code v-pre>commit ID</code>和 跟踪的远程分支的<code v-pre>commit ID</code>，对应文件如下：</p>
<ul>
<li>.git/refs/head/[本地分支]</li>
<li>.git/refs/remotes/[正在跟踪的分支]</li>
</ul>
<p>使用 <code v-pre>git fetch</code>更新代码，本地的库中<code v-pre>master</code>的<code v-pre>commitID</code>不变</p>
<p>但是与<code v-pre>git</code>上面关联的那个<code v-pre>orign/master</code>的<code v-pre>commit ID</code>发生改变</p>
<p>这时候我们本地相当于存储了两个代码的版本号，我们还要通过<code v-pre>merge</code>去合并这两个不同的代码版本</p>
<p><img src="https://static.vue-js.com/fd23ff70-fb12-11eb-bc6f-3f06e1491664.png" alt=""></p>
<p>也就是<code v-pre>fetch</code>的时候本地的<code v-pre>master</code>没有变化，但是与远程仓关联的那个版本号被更新了，接下来就是在本地<code v-pre>merge</code>合并这两个版本号的代码</p>
<p>相比之下，使用<code v-pre>git pull</code>就更加简单粗暴，会将本地的代码更新至远程仓库里面最新的代码版本，如下图：</p>
<p><img src="https://static.vue-js.com/091b8140-fb13-11eb-bc6f-3f06e1491664.png" alt=""></p>
<h2 id="二、用法" tabindex="-1"><a class="header-anchor" href="#二、用法" aria-hidden="true">#</a> 二、用法</h2>
<p>一般远端仓库里有新的内容更新，当我们需要把新内容下载的时候，就使用到<code v-pre>git pull</code>或者<code v-pre>git fetch</code>命令</p>
<h3 id="fetch" tabindex="-1"><a class="header-anchor" href="#fetch" aria-hidden="true">#</a> fetch</h3>
<p>用法如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>git fetch <span class="token operator">&lt;</span>远程主机名<span class="token operator">></span> <span class="token operator">&lt;</span>远程分支名<span class="token operator">></span><span class="token operator">:</span><span class="token operator">&lt;</span>本地分支名<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例如从远程的<code v-pre>origin</code>仓库的<code v-pre>master</code>分支下载代码到本地并新建一个<code v-pre>temp</code>分支</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>git fetch origin master<span class="token operator">:</span>temp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果上述没有冒号，则表示将远程<code v-pre>origin</code>仓库的<code v-pre>master</code>分支拉取下来到本地当前分支</p>
<p>这里<code v-pre>git fetch</code>不会进行合并，执行后需要手动执行<code v-pre>git merge</code>合并，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>git merge temp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="pull" tabindex="-1"><a class="header-anchor" href="#pull" aria-hidden="true">#</a> pull</h3>
<p>两者的用法十分相似，<code v-pre>pull</code>用法如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>git pull <span class="token operator">&lt;</span>远程主机名<span class="token operator">></span> <span class="token operator">&lt;</span>远程分支名<span class="token operator">></span><span class="token operator">:</span><span class="token operator">&lt;</span>本地分支名<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例如将远程主机<code v-pre>origin</code>的<code v-pre>master</code>分支拉取过来，与本地的<code v-pre>branchtest</code>分支合并，命令如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>git pull origin master<span class="token operator">:</span>branchtest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同样如果上述没有冒号，则表示将远程<code v-pre>origin</code>仓库的<code v-pre>master</code>分支拉取下来与本地当前分支合并</p>
<h2 id="三、区别" tabindex="-1"><a class="header-anchor" href="#三、区别" aria-hidden="true">#</a> 三、区别</h2>
<p>相同点：</p>
<ul>
<li>在作用上他们的功能是大致相同的，都是起到了更新代码的作用</li>
</ul>
<p>不同点：</p>
<ul>
<li>git pull 是相当于从远程仓库获取最新版本，然后再与本地分支 merge，即 git pull = git fetch + git merge</li>
<li>相比起来，git fetch 更安全也更符合实际要求，在 merge 前，我们可以查看更新情况，根据实际情况再决定是否合并</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zhuanlan.zhihu.com/p/123370920</li>
<li>https://segmentfault.com/a/1190000017030384</li>
<li>https://juejin.cn/post/6844903921794859021</li>
</ul>
</div></template>


