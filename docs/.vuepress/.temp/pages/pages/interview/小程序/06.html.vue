<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-15 23:08:53
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-15 23:44:57
 * @Description: 
-->
<h1 id="说说微信小程序的发布流程" tabindex="-1"><a class="header-anchor" href="#说说微信小程序的发布流程" aria-hidden="true">#</a> 说说微信小程序的发布流程？</h1>
<h2 id="一、背景" tabindex="-1"><a class="header-anchor" href="#一、背景" aria-hidden="true">#</a> 一、背景</h2>
<p>在中大型的公司里，人员的分工非常仔细，一般会有不同岗位角色的员工同时参与同一个小程序项目。为此，小程序平台设计了不同的权限管理使得项目管理者可以更加高效管理整个团队的协同工作</p>
<p><img src="https://static.vue-js.com/e76aff50-3652-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>以往我们在开发完网页之后，需要把网页的代码和资源放在服务器上，让用户通过互联网来访问</p>
<p>在小程序的平台里，开发者完成开发之后，需要在开发者工具提交小程序的代码包，然后在小程序后台发布小程序</p>
<p><img src="https://static.vue-js.com/fe5da190-3652-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<h2 id="二、流程" tabindex="-1"><a class="header-anchor" href="#二、流程" aria-hidden="true">#</a> 二、流程</h2>
<p>关于发布的流程，主要分成了三个部分：</p>
<ul>
<li>上传代码</li>
<li>提交审核</li>
<li>发布版本</li>
</ul>
<h3 id="上传代码" tabindex="-1"><a class="header-anchor" href="#上传代码" aria-hidden="true">#</a> 上传代码</h3>
<p>在开发者工具中，可以点击代码上传功能：</p>
<p><img src="https://static.vue-js.com/08f19bc0-3653-11ec-a752-75723a64e8f5.png" alt=""></p>
<p>然后就可以填写版本信息：</p>
<p><img src="https://static.vue-js.com/1d02c8f0-3653-11ec-a752-75723a64e8f5.png" alt=""></p>
<p>然后点击上传，编译器则会提示上传代码成功</p>
<h3 id="提交审核" tabindex="-1"><a class="header-anchor" href="#提交审核" aria-hidden="true">#</a> 提交审核</h3>
<p>代码上传完毕，就可以登陆微信公众号的官网首页，点击【开发管理】，查看应用详情：</p>
<p><img src="https://static.vue-js.com/281038e0-3653-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>提交审核过程需要填写审核信息，如下图：</p>
<p><img src="https://static.vue-js.com/33d97ec0-3653-11ec-a752-75723a64e8f5.png" alt=""></p>
<p>提交审核成功之后如下图：</p>
<p><img src="https://static.vue-js.com/3e4c3550-3653-11ec-a752-75723a64e8f5.png" alt=""></p>
<h3 id="发布版本" tabindex="-1"><a class="header-anchor" href="#发布版本" aria-hidden="true">#</a> 发布版本</h3>
<p>当审核通过之后，即可提交发布</p>
<p><img src="https://static.vue-js.com/495140d0-3653-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<p>发布成功之后则如下：</p>
<p><img src="https://static.vue-js.com/5293b4c0-3653-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<h2 id="三、扩展" tabindex="-1"><a class="header-anchor" href="#三、扩展" aria-hidden="true">#</a> 三、扩展</h2>
<p>上述是最简单的小程序代码发布的流程，通常的流程如下：</p>
<ul>
<li>代码管理服务器上新建分支</li>
<li>开发测试新需求</li>
<li>测试完成后，将本地分支合并到 master 分支</li>
<li>拉取 master 分支最新代码，执行 build 命令生成小程序可执行文件</li>
<li>开发者工具点击“上传”</li>
<li>提审</li>
<li>发布</li>
</ul>
<p>但是面对多人协调开发的时候，有可能出现已经上线的代码还没合并到<code v-pre>master</code>的情况</p>
<p>因此可以考虑自动化构建部署，就是将从开发到部署的一系列流程变成自动化，衔接连贯，在构建失败时能够告知开发者，构建成功后能够告知测试和实施人员，可参考如下流程图：</p>
<p><img src="https://static.vue-js.com/602d9bf0-3653-11ec-a752-75723a64e8f5.png" alt=""></p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://juejin.cn/post/6994414162700927012</li>
<li>https://www.leapcloud.cn/website/docs/doc_config/xiaochengxu/xiaochengxu.html</li>
</ul>
</div></template>


