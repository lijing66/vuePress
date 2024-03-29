<template><div><h1 id="git-stash-的理解" tabindex="-1"><a class="header-anchor" href="#git-stash-的理解" aria-hidden="true">#</a> git stash 的理解</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>当你在项目的一部分上已经工作一段时间后，此时并没有提交，也不想提交，默认情况下，是不能切换分支的，而你想要切换到另一个分支或者拉下远端的代码去做一点别的事情，这时你可以用 git stash： 把当前的修改内容暂存一下。</p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>stash，译为存放，在 git 中，可以理解为保存当前工作进度，会把暂存区和工作区的改动进行保存，这些修改会保存在一个栈上</p>
<p>后续你可以在任何时候任何分支重新将某次的修改推出来，重新应用这些更改的代码</p>
<p>默认情况下，<code v-pre>git stash</code>会缓存下列状态的文件：</p>
<ul>
<li>添加到暂存区的修改（staged changes）</li>
<li>Git 跟踪的但并未添加到暂存区的修改（unstaged changes）</li>
</ul>
<p>但以下状态的文件不会缓存：</p>
<ul>
<li>在工作目录中新的文件（untracked files）</li>
<li>被忽略的文件（ignored files）</li>
</ul>
<p>如果想要上述的文件都被缓存，可以使用<code v-pre>-u</code>或者<code v-pre>--include-untracked</code>可以工作目录新的文件，使用<code v-pre>-a</code>或者<code v-pre>--all</code>命令可以当前目录下的所有修改</p>
<h2 id="git-stash-常见的命令" tabindex="-1"><a class="header-anchor" href="#git-stash-常见的命令" aria-hidden="true">#</a> git stash 常见的命令</h2>
<p>关于<code v-pre>git stash</code>常见的命令如下：</p>
<ul>
<li>
<p>git stash</p>
</li>
<li>
<p>git stash save</p>
</li>
<li>
<p>git stash list</p>
</li>
<li>
<p>git stash pop</p>
</li>
<li>
<p>git stash apply</p>
</li>
<li>
<p>git stash show</p>
</li>
<li>
<p>git stash drop</p>
</li>
<li>
<p>git stash clear</p>
</li>
</ul>
<h3 id="git-stash" tabindex="-1"><a class="header-anchor" href="#git-stash" aria-hidden="true">#</a> git stash</h3>
<p>保存当前工作进度，会把暂存区和工作区的改动保存起来</p>
<h3 id="git-stash-save" tabindex="-1"><a class="header-anchor" href="#git-stash-save" aria-hidden="true">#</a> git stash save</h3>
<p><code v-pre>git stash save</code>可以用于存储修改.并且将<code v-pre>git</code>的工作状态切回到<code v-pre>HEAD</code>也就是上一次合法提交上</p>
<p>如果给定具体的文件路径,<code v-pre>git stash</code>只会处理路径下的文件.其他的文件不会被存储，其存在一些参数：</p>
<ul>
<li>
<p>--keep-index 或者 -k 只会存储为加入 git 管理的文件</p>
</li>
<li>
<p>--include-untracked 为追踪的文件也会被缓存,当前的工作空间会被恢复为完全清空的状态</p>
</li>
<li>
<p>-a 或者 --all 命令可以当前目录下的所有修改，包括被 git 忽略的文件</p>
</li>
</ul>
<h3 id="git-stash-list" tabindex="-1"><a class="header-anchor" href="#git-stash-list" aria-hidden="true">#</a> git stash list</h3>
<p>显示保存进度的列表。也就意味着，<code v-pre>git stash</code>命令可以多次执行，当多次使用<code v-pre>git stash</code>命令后，栈里会充满未提交的代码，如下：</p>
<p><img src="https://static.vue-js.com/50216dd0-fccf-11eb-bc6f-3f06e1491664.png" alt=""></p>
<p>其中，<code v-pre>stash@{0}</code>、<code v-pre>stash@{1}</code>就是当前<code v-pre>stash</code>的名称</p>
<h3 id="git-stash-pop" tabindex="-1"><a class="header-anchor" href="#git-stash-pop" aria-hidden="true">#</a> git stash pop</h3>
<p><code v-pre>git stash pop</code> 从栈中读取最近一次保存的内容，也就是栈顶的<code v-pre>stash</code>会恢复到工作区</p>
<p>也可以通过 <code v-pre>git stash pop</code> + <code v-pre>stash</code>名字执行恢复哪个<code v-pre>stash</code>恢复到当前目录</p>
<p>如果从<code v-pre>stash</code>中恢复的内容和当前目录中的内容发生了冲突，则需要手动修复冲突或者创建新的分支来解决冲突</p>
<h3 id="git-stash-apply" tabindex="-1"><a class="header-anchor" href="#git-stash-apply" aria-hidden="true">#</a> git stash apply</h3>
<p>将堆栈中的内容应用到当前目录，不同于<code v-pre>git stash pop</code>，该命令不会将内容从堆栈中删除</p>
<p>也就说该命令能够将堆栈的内容多次应用到工作目录中，适应于多个分支的情况</p>
<p>同样，可以通过<code v-pre>git stash apply</code> + <code v-pre>stash</code>名字执行恢复哪个<code v-pre>stash</code>恢复到当前目录</p>
<h3 id="git-stash-show" tabindex="-1"><a class="header-anchor" href="#git-stash-show" aria-hidden="true">#</a> git stash show</h3>
<p>查看堆栈中最新保存的<code v-pre>stash</code>和当前目录的差异</p>
<p>通过使用<code v-pre>git stash show -p</code>查看详细的不同</p>
<p>通过使用<code v-pre>git stash show stash@{1}</code>查看指定的<code v-pre>stash</code>和当前目录差异</p>
<p><img src="https://static.vue-js.com/458620a0-fccf-11eb-bc6f-3f06e1491664.png" alt=""></p>
<h3 id="git-stash-drop" tabindex="-1"><a class="header-anchor" href="#git-stash-drop" aria-hidden="true">#</a> git stash drop</h3>
<p><code v-pre>git stash drop</code> + <code v-pre>stash</code>名称表示从堆栈中移除某个指定的 stash</p>
<h3 id="git-stash-clear" tabindex="-1"><a class="header-anchor" href="#git-stash-clear" aria-hidden="true">#</a> git stash clear</h3>
<p>删除所有存储的进度</p>
<h2 id="三、应用场景" tabindex="-1"><a class="header-anchor" href="#三、应用场景" aria-hidden="true">#</a> 三、应用场景</h2>
<p>当你在项目的一部分上已经工作一段时间后，所有东西都进入了混乱的状态， 而这时你想要切换到另一个分支或者拉下远端的代码去做一点别的事情</p>
<p>但是你创建一次未完成的代码的<code v-pre>commit</code>提交，这时候就可以使用<code v-pre>git stash</code></p>
<p>例如以下场景：</p>
<p>当你的开发进行到一半,但是代码还不想进行提交 ,然后需要同步去关联远端代码时.如果你本地的代码和远端代码没有冲突时,可以直接通过<code v-pre>git pull</code>解决</p>
<p>但是如果可能发生冲突怎么办.直接<code v-pre>git pull</code>会拒绝覆盖当前的修改，这时候就可以依次使用下述的命令：</p>
<ul>
<li>git stash</li>
<li>git pull</li>
<li>git stash pop</li>
</ul>
<p>或者当你开发到一半，现在要修改别的分支问题的时候，你也可以使用<code v-pre>git stash</code>缓存当前区域的代码</p>
<ul>
<li>git stash：保存开发到一半的代码</li>
<li>git commit -m '修改问题'</li>
<li>git stash pop：将代码追加到最新的提交之后</li>
</ul>
</div></template>


