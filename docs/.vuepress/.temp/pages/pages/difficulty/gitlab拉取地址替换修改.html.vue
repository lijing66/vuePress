<template><div><h1 id="gitlab远程仓库地址修改后替换命令" tabindex="-1"><a class="header-anchor" href="#gitlab远程仓库地址修改后替换命令" aria-hidden="true">#</a> gitlab远程仓库地址修改后替换命令</h1>
<blockquote>
<p>1、通过 <code>git remote -v</code> 查看当前拉取远程仓库地址</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>git remote <span class="token operator">-</span>v
origin http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>xxxxx<span class="token punctuation">.</span><span class="token function">git</span> <span class="token punctuation">(</span>fetch<span class="token punctuation">)</span>
origin http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>xxxxx<span class="token punctuation">.</span><span class="token function">git</span> <span class="token punctuation">(</span>push<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>2、重命名标签</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>git remote rename origin old<span class="token operator">-</span>origin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>3、添加新标签</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>git remote add origin http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>xxxxx<span class="token punctuation">.</span>git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>4、删除旧标签</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>git remote remove old<span class="token operator">-</span>origin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>5、重新查看标签地址</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>git remote <span class="token operator">-</span>v 
origin http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>xxxxx<span class="token punctuation">.</span><span class="token function">git</span> <span class="token punctuation">(</span>fetch<span class="token punctuation">)</span>
origin http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>xxxxx<span class="token punctuation">.</span><span class="token function">git</span> <span class="token punctuation">(</span>push<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>6、执行拉取命令验证</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>git pull origin master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>此时会提示登录，使用原有accessToken登录后 可进行正常的拉取提交操作，如原使用SSHKeys鉴权方式的，请重新生成key进行绑定</p>
</blockquote>
<ul>
<li>弹出登录的话</li>
<li>账号是 gitlab登录名称或者邮箱</li>
<li>密码是access token 申请的那串代码</li>
</ul>
</div></template>


