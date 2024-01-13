<template><div><h1 id="说说-webpack-中常见的-plugin-解决了什么问题" tabindex="-1"><a class="header-anchor" href="#说说-webpack-中常见的-plugin-解决了什么问题" aria-hidden="true">#</a> 说说 webpack 中常见的 Plugin？解决了什么问题？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>webpack 中的 plugin 赋予其各种灵活的功能，例如打包优化、资源管理、环境变量注入等，它们会运行在 webpack 的不同阶段（钩子 / 生命周期），贯穿了 webpack 整个编译周期</p>
<p>目的：在于解决 loader 解决不了的其他的问题</p>
<p>关于整个编译生命周期钩子，有如下：</p>
<p>entry-option ：初始化 option</p>
<p>run</p>
<p>compile：真正开始的编译，在创建 compilation 对象之前</p>
<p>compilation ：生成好了 compilation 对象</p>
<p>make 从 entry 开始递归分析依赖，准备对每个模块进行 build</p>
<p>after-compile：编译 build 过程结束</p>
<p>emit ：在将内存中 assets 内容写到磁盘文件夹之前</p>
<p>after-emit ：在将内存中 assets 内容写到磁盘文件夹之后</p>
<p>done：完成所有的编译过程</p>
<p>failed：编译失败的时候</p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><img src="https://static.vue-js.com/8d3978a0-a7c2-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p><code v-pre>Plugin</code>（Plug-in）是一种计算机应用程序，它和主应用程序互相交互，以提供特定的功能</p>
<p>是一种遵循一定规范的应用程序接口编写出来的程序，只能运行在程序规定的系统下，因为其需要调用原纯净系统提供的函数库或者数据</p>
<p><code v-pre>webpack</code>中的<code v-pre>plugin</code>也是如此，<code v-pre>plugin</code>赋予其各种灵活的功能，例如打包优化、资源管理、环境变量注入等，它们会运行在 <code v-pre>webpack</code> 的不同阶段（钩子 / 生命周期），贯穿了<code v-pre>webpack</code>整个编译周期</p>
<p><img src="https://static.vue-js.com/9a04ec40-a7c2-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>目的在于解决<code v-pre>loader</code> 无法实现的其他事</p>
<h3 id="配置方式" tabindex="-1"><a class="header-anchor" href="#配置方式" aria-hidden="true">#</a> 配置方式</h3>
<p>这里讲述文件的配置方式，一般情况，通过配置文件导出对象中<code v-pre>plugins</code>属性传入<code v-pre>new</code>实例对象。如下所示：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'html-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 通过 npm 安装</span>
<span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 访问内置的插件</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>ProgressPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'./src/index.html'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、特性" tabindex="-1"><a class="header-anchor" href="#二、特性" aria-hidden="true">#</a> 二、特性</h2>
<p>其本质是一个具有<code v-pre>apply</code>方法<code v-pre>javascript</code>对象</p>
<p><code v-pre>apply</code> 方法会被 <code v-pre>webpack compiler</code>调用，并且在整个编译生命周期都可以访问 <code v-pre>compiler</code>对象</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> pluginName <span class="token operator">=</span> <span class="token string">'ConsoleLogOnBuildWebpackPlugin'</span>

<span class="token keyword">class</span> <span class="token class-name">ConsoleLogOnBuildWebpackPlugin</span> <span class="token punctuation">{</span>
  <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>run<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span>pluginName<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">compilation</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'webpack 构建过程开始！'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> ConsoleLogOnBuildWebpackPlugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>compiler hook</code> 的 <code v-pre>tap</code>方法的第一个参数，应是驼峰式命名的插件名称</p>
<p>关于整个编译生命周期钩子，有如下：</p>
<ul>
<li>entry-option ：初始化 option</li>
<li>run</li>
<li>compile： 真正开始的编译，在创建 compilation 对象之前</li>
<li>compilation ：生成好了 compilation 对象</li>
<li>make 从 entry 开始递归分析依赖，准备对每个模块进行 build</li>
<li>after-compile： 编译 build 过程结束</li>
<li>emit ：在将内存中 assets 内容写到磁盘文件夹之前</li>
<li>after-emit ：在将内存中 assets 内容写到磁盘文件夹之后</li>
<li>done： 完成所有的编译过程</li>
<li>failed： 编译失败的时候</li>
</ul>
<h2 id="三、常见的-plugin" tabindex="-1"><a class="header-anchor" href="#三、常见的-plugin" aria-hidden="true">#</a> 三、常见的 Plugin</h2>
<p>常见的<code v-pre>plugin</code>有如图所示：</p>
<p><img src="https://static.vue-js.com/bd749400-a7c2-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>下面介绍几个常用的插件用法：</p>
<h3 id="htmlwebpackplugin" tabindex="-1"><a class="header-anchor" href="#htmlwebpackplugin" aria-hidden="true">#</a> HtmlWebpackPlugin</h3>
<p>在打包结束后，⾃动生成⼀个 <code v-pre>html</code> ⽂文件，并把打包生成的<code v-pre>js</code> 模块引⼊到该 <code v-pre>html</code> 中</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>npm install <span class="token operator">--</span>save<span class="token operator">-</span>dev html<span class="token operator">-</span>webpack<span class="token operator">-</span>plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// webpack.config.js</span>
<span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"html-webpack-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
 <span class="token operator">...</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
     <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
       <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">"My App"</span><span class="token punctuation">,</span>
       <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"app.html"</span><span class="token punctuation">,</span>
       <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">"./src/html/index.html"</span>
     <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span><span class="token punctuation">.</span><span class="token operator">/</span>src<span class="token operator">/</span>html<span class="token operator">/</span>index<span class="token punctuation">.</span>html<span class="token operator">--</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">!</span><span class="token constant">DOCTYPE</span> html<span class="token operator">></span>
<span class="token operator">&lt;</span>html lang<span class="token operator">=</span><span class="token string">"en"</span><span class="token operator">></span>
  <span class="token operator">&lt;</span>head<span class="token operator">></span>
    <span class="token operator">&lt;</span>meta charset<span class="token operator">=</span><span class="token string">"UTF-8"</span> <span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>meta name<span class="token operator">=</span><span class="token string">"viewport"</span> content<span class="token operator">=</span><span class="token string">"width=device-width, initial-scale=1.0"</span> <span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>meta http<span class="token operator">-</span>equiv<span class="token operator">=</span><span class="token string">"X-UA-Compatible"</span> content<span class="token operator">=</span><span class="token string">"ie=edge"</span> <span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>title<span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">%=</span>htmlWebpackPlugin<span class="token punctuation">.</span>options<span class="token punctuation">.</span>title<span class="token operator">%</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>title<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>head<span class="token operator">></span>
  <span class="token operator">&lt;</span>body<span class="token operator">></span>
    <span class="token operator">&lt;</span>h1<span class="token operator">></span>html<span class="token operator">-</span>webpack<span class="token operator">-</span>plugin<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>html</code> 模板中，可以通过 <code v-pre>&lt;%=htmlWebpackPlugin.options.XXX%&gt;</code> 的方式获取配置的值</p>
<p>更多的配置可以自寻查找</p>
<h3 id="clean-webpack-plugin" tabindex="-1"><a class="header-anchor" href="#clean-webpack-plugin" aria-hidden="true">#</a> clean-webpack-plugin</h3>
<p>删除（清理）构建目录</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>npm install <span class="token operator">--</span>save<span class="token operator">-</span>dev clean<span class="token operator">-</span>webpack<span class="token operator">-</span>plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span>CleanWebpackPlugin<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'clean-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
 <span class="token operator">...</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token operator">...</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">CleanWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token operator">...</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mini-css-extract-plugin" tabindex="-1"><a class="header-anchor" href="#mini-css-extract-plugin" aria-hidden="true">#</a> mini-css-extract-plugin</h3>
<p>提取 <code v-pre>CSS</code> 到一个单独的文件中</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>npm install <span class="token operator">--</span>save<span class="token operator">-</span>dev mini<span class="token operator">-</span>css<span class="token operator">-</span>extract<span class="token operator">-</span>plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> MiniCssExtractPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'mini-css-extract-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
 <span class="token operator">...</span><span class="token punctuation">,</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
   <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
     <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.s[ac]ss$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
     <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
       <span class="token literal-property property">loader</span><span class="token operator">:</span> MiniCssExtractPlugin<span class="token punctuation">.</span>loader
     <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token string">'css-loader'</span><span class="token punctuation">,</span>
          <span class="token string">'sass-loader'</span>
        <span class="token punctuation">]</span>
   <span class="token punctuation">}</span>
   <span class="token punctuation">]</span>
 <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token operator">...</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">MiniCssExtractPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
     <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'[name].css'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token operator">...</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="defineplugin" tabindex="-1"><a class="header-anchor" href="#defineplugin" aria-hidden="true">#</a> DefinePlugin</h3>
<p>允许在编译时创建配置的全局对象，是一个<code v-pre>webpack</code>内置的插件，不需要安装</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> DefinePlugun <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack'</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
 <span class="token operator">...</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token keyword">new</span> <span class="token class-name">DefinePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token constant">BASE_URL</span><span class="token operator">:</span><span class="token string">'"./"'</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候编译<code v-pre>template</code>模块的时候，就能通过下述形式获取全局对象</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>link rel<span class="token operator">=</span><span class="token string">"icon"</span> href<span class="token operator">=</span><span class="token string">"&lt;%= BASE_URL%>favicon.ico>"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="copy-webpack-plugin" tabindex="-1"><a class="header-anchor" href="#copy-webpack-plugin" aria-hidden="true">#</a> copy-webpack-plugin</h3>
<p>复制文件或目录到执行区域，如<code v-pre>vue</code>的打包过程中，如果我们将一些文件放到<code v-pre>public</code>的目录下，那么这个目录会被复制到<code v-pre>dist</code>文件夹中</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>npm install copy<span class="token operator">-</span>webpack<span class="token operator">-</span>plugin <span class="token operator">-</span><span class="token constant">D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">CopyWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">parrerns</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">from</span><span class="token operator">:</span> <span class="token string">'public'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">globOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">ignore</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'**/index.html'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>复制的规则在<code v-pre>patterns</code>属性中设置：</p>
<ul>
<li>
<p>from：设置从哪一个源中开始复制</p>
</li>
<li>
<p>to：复制到的位置，可以省略，会默认复制到打包的目录下</p>
</li>
<li>
<p>globOptions：设置一些额外的选项，其中可以编写需要忽略的文件</p>
</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://webpack.docschina.org/concepts/plugins/</li>
<li>https://baike.baidu.com/item/Plugin</li>
<li>https://segmentfault.com/a/1190000018695134</li>
</ul>
</div></template>


