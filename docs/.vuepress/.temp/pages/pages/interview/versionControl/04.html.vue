<template><div><h1 id="说说-git-发生冲突的场景-如何解决" tabindex="-1"><a class="header-anchor" href="#说说-git-发生冲突的场景-如何解决" aria-hidden="true">#</a> 说说 git 发生冲突的场景？如何解决？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<ul>
<li>
<p>场景：一般是两个人同时更改了同一文件的同一个地方，这时合并时就会报冲突。</p>
</li>
<li>
<p>解决：将合并失败的文件手动编辑为我们希望的内容，再提交。在使用vscode时，它会有一些非常清晰的提示，可以很方便的解决冲突。</p>
</li>
</ul>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>一般情况下，出现分支的场景有如下：</p>
<ul>
<li>多个分支代码合并到一个分支时</li>
<li>多个分支向同一个远端分支推送</li>
</ul>
<p>具体情况就是，多个分支修改了同一个文件（任何地方）或者多个分支修改了同一个文件的名称</p>
<p>如果两个分支中分别修改了不同文件中的部分，是不会产生冲突，直接合并即可</p>
<p>应用在命令中，就是<code v-pre>push</code>、<code v-pre>pull</code>、<code v-pre>stash</code>、<code v-pre>rebase</code>等命令下都有可能产生冲突情况，从本质上来讲，都是<code v-pre>merge</code>和<code v-pre>patch</code>（应用补丁）时产生冲突</p>
<h2 id="二、分析" tabindex="-1"><a class="header-anchor" href="#二、分析" aria-hidden="true">#</a> 二、分析</h2>
<p>在本地主分值<code v-pre>master</code>创建一个<code v-pre>a.txt</code>文件，文件起始位置写上<code v-pre>master commit</code>，如下：</p>
<p><img src="https://static.vue-js.com/959ade20-fdb3-11eb-991d-334fd31f0201.png" alt=""></p>
<p>然后提交到仓库：</p>
<ul>
<li>git add a.txt</li>
<li>git commit -m 'master first commit'</li>
</ul>
<p>创建一个新的分支<code v-pre>featurel1</code>分支，并进行切换，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>git checkout -b featurel1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后修改<code v-pre>a.txt</code>文件首行文字为 <code v-pre>featurel commit</code>，然后添加到暂存区，并开始进行提交到仓库：</p>
<ul>
<li>git add a.txt</li>
<li>git commit -m 'featurel first change'</li>
</ul>
<p>然后通过<code v-pre>git checkout master</code>切换到主分支，通过<code v-pre>git merge</code>进行合并，发现不会冲突</p>
<p>此时<code v-pre>a.txt</code>文件的内容变成<code v-pre>featurel commit</code>，没有出现冲突情况，这是因为<code v-pre>git</code>在内部发生了快速合并</p>
<blockquote>
<p>如果当前分支的每一个提交(commit)都已经存在另一个分支里了，git 就会执行一个“快速向前”(fast forward)操作</p>
<p>git 不创建任何新的提交(commit)，只是将当前分支指向合并进来的分支</p>
</blockquote>
<p>如果此时切换到<code v-pre>featurel</code>分支，将文件的内容修改成<code v-pre>featrue second commit</code>，然后提交到本地仓库</p>
<p>然后切换到主分支，如果此时在<code v-pre>a.txt</code>文件再次修改，修改成<code v-pre>mastet second commit</code>，然后再次提交到本地仓库</p>
<p>此时，<code v-pre>master</code>分支和<code v-pre>feature1</code>分支各自都分别有新的提交，变成了下图所示：</p>
<p><img src="https://static.vue-js.com/a05488c0-fdb3-11eb-991d-334fd31f0201.png" alt=""></p>
<p>这种情况下，无法执行快速合并，只能试图把各自的修改合并起来，但这种合并就可能会有冲突</p>
<p>现在通过<code v-pre>git merge featurel</code>进行分支合并，如下所示：</p>
<p><img src="https://static.vue-js.com/b0991d90-fdb3-11eb-bc6f-3f06e1491664.png" alt=""></p>
<p>从冲突信息可以看到，<code v-pre>a.txt</code>发生冲突，必须手动解决冲突之后再提交</p>
<p>而<code v-pre>git status</code>同样可以告知我们冲突的文件：</p>
<p><img src="https://static.vue-js.com/c5823430-fdb3-11eb-991d-334fd31f0201.png" alt=""></p>
<p>打开<code v-pre>a.txt</code>文件，可以看到如下内容：</p>
<p><img src="https://static.vue-js.com/ce7a0a90-fdb3-11eb-bc6f-3f06e1491664.png" alt=""></p>
<p><code v-pre>git</code>用<code v-pre>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>，<code v-pre>=======</code>，<code v-pre>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>标记出不同分支的内容：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token string">"&lt;&lt;&lt;&lt;&lt;&lt;&lt;"</span> 和 <span class="token string">"======="</span> 之间的区域就是当前更改的内容
<span class="token string">"======="</span> 和 <span class="token string">">>>>>>>"</span> 之间的区域就是传入进来更改的内容
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在要做的事情就是将冲突的内容进行更改，对每个文件使用 <code v-pre>git add</code> 命令来将其标记为冲突已解决。 一旦暂存这些原本有冲突的文件，<code v-pre>Git</code>就会将它们标记为冲突已解决然后再提交：</p>
<ul>
<li>git add a.txt</li>
<li>git commit -m &quot;conflict fixed&quot;</li>
</ul>
<p>此时<code v-pre>master</code>分支和<code v-pre>feature1</code>分支变成了下图所示：</p>
<p><img src="https://static.vue-js.com/d7421e60-fdb3-11eb-bc6f-3f06e1491664.png" alt=""></p>
<p>使用<code v-pre>git log</code>命令可以看到合并的信息：</p>
<p><img src="https://static.vue-js.com/e0dfd1b0-fdb3-11eb-991d-334fd31f0201.png" alt=""></p>
<h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p>当<code v-pre>Git</code>无法自动合并分支时，就必须首先解决冲突，解决冲突后，再提交，合并完成</p>
<p>解决冲突就是把<code v-pre>Git</code>合并失败的文件手动编辑为我们希望的内容，再提交</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://www.liaoxuefeng.com/wiki/896043488029600/900004111093344</li>
</ul>
</div></template>


