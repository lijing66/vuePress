<template><div><h1 id="说说react服务端渲染怎么做-原理是什么" tabindex="-1"><a class="header-anchor" href="#说说react服务端渲染怎么做-原理是什么" aria-hidden="true">#</a> 说说React服务端渲染怎么做？原理是什么？</h1>
<p><img src="https://static.vue-js.com/8c93cbe0-f3f7-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>在<a href="https://mp.weixin.qq.com/s/vvUtC_aAprUjoJRnfFjA1A" target="_blank" rel="noopener noreferrer">SSR中 (opens new window)<ExternalLinkIcon/></a>，我们了解到<code v-pre>Server-Side Rendering</code> ，简称<code v-pre>SSR</code>，意为服务端渲染</p>
<p>指由服务侧完成页面的 <code v-pre>HTML</code> 结构拼接的页面处理技术，发送到浏览器，然后为其绑定状态与事件，成为完全可交互页面的过程</p>
<p><img src="https://static.vue-js.com/96dc3e20-f3f7-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>其解决的问题主要有两个：</p>
<ul>
<li>SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面</li>
<li>加速首屏加载，解决首屏白屏问题</li>
</ul>
<h2 id="二、如何做" tabindex="-1"><a class="header-anchor" href="#二、如何做" aria-hidden="true">#</a> 二、如何做</h2>
<p>在<code v-pre>react</code>中，实现<code v-pre>SSR</code>主要有两种形式：</p>
<ul>
<li>手动搭建一个 SSR 框架</li>
<li>使用成熟的SSR 框架，如 Next.JS</li>
</ul>
<p>这里主要以手动搭建一个<code v-pre>SSR</code>框架进行实现</p>
<p>首先通过<code v-pre>express</code>启动一个<code v-pre>app.js</code>文件，用于监听3000端口的请求，当请求根目录时，返回<code v-pre>HTML</code>，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span>res</span><span class="token punctuation">)</span> <span class="token operator">=></span> res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
&lt;html>
   &lt;head>
       &lt;title>ssr demo&lt;/title>
   &lt;/head>
   &lt;body>
       Hello world
   &lt;/body>
&lt;/html>
</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Exampleapp listening on port 3000!'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再服务器中编写<code v-pre>react</code>代码，在<code v-pre>app.js</code>中进行应引用</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span>

<span class="token keyword">const</span> <span class="token function-variable function">Home</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>

    <span class="token keyword">return</span> <span class="token operator">&lt;</span>div<span class="token operator">></span>home<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Home
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了让服务器能够识别<code v-pre>JSX</code>，这里需要使用<code v-pre>webpakc</code>对项目进行打包转换，创建一个配置文件<code v-pre>webpack.server.js</code>并进行相关配置，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span>    <span class="token comment">//node的path模块</span>
<span class="token keyword">const</span> nodeExternals <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack-node-externals'</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">target</span><span class="token operator">:</span><span class="token string">'node'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span><span class="token string">'development'</span><span class="token punctuation">,</span>           <span class="token comment">//开发模式</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span><span class="token string">'./app.js'</span><span class="token punctuation">,</span>             <span class="token comment">//入口</span>
    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>                     <span class="token comment">//打包出口</span>
        <span class="token literal-property property">filename</span><span class="token operator">:</span><span class="token string">'bundle.js'</span><span class="token punctuation">,</span>     <span class="token comment">//打包后的文件名</span>
        <span class="token literal-property property">path</span><span class="token operator">:</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span><span class="token string">'build'</span><span class="token punctuation">)</span>    <span class="token comment">//存放到根目录的build文件夹</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">externals</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">nodeExternals</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>  <span class="token comment">//保持node中require的引用方式</span>
    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>                  <span class="token comment">//打包规则</span>
           <span class="token literal-property property">test</span><span class="token operator">:</span>   <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js?$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>       <span class="token comment">//对所有js文件进行打包</span>
           <span class="token literal-property property">loader</span><span class="token operator">:</span><span class="token string">'babel-loader'</span><span class="token punctuation">,</span>  <span class="token comment">//使用babel-loader进行打包</span>
           <span class="token literal-property property">exclude</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span><span class="token comment">//不打包node_modules中的js文件</span>
           <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
               <span class="token literal-property property">presets</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'react'</span><span class="token punctuation">,</span><span class="token string">'stage-0'</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token string">'env'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> 
                                  <span class="token comment">//loader时额外的打包规则,对react,JSX，ES6进行转换</span>
                    <span class="token literal-property property">targets</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token literal-property property">browsers</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'last 2versions'</span><span class="token punctuation">]</span>   <span class="token comment">//对主流浏览器最近两个版本进行兼容</span>
                    <span class="token punctuation">}</span>
               <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
           <span class="token punctuation">}</span>
       <span class="token punctuation">}</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着借助<code v-pre>react-dom</code>提供了服务端渲染的 <code v-pre>renderToString</code>方法，负责把<code v-pre>React</code>组件解析成<code v-pre>html</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> express <span class="token keyword">from</span> <span class="token string">'express'</span>
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token comment">//引入React以支持JSX的语法</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> renderToString <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-dom/server'</span><span class="token comment">//引入renderToString方法</span>
<span class="token keyword">import</span> Home <span class="token keyword">from</span><span class="token string">'./src/containers/Home'</span>

<span class="token keyword">const</span> app<span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> content <span class="token operator">=</span> <span class="token function">renderToString</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>Home<span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span>res</span><span class="token punctuation">)</span> <span class="token operator">=></span> res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
&lt;html>
   &lt;head>
       &lt;title>ssr demo&lt;/title>
   &lt;/head>
   &lt;body>
        </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>content<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
   &lt;/body>
&lt;/html>
</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3001</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Exampleapp listening on port 3001!'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的过程中，已经能够成功将组件渲染到了页面上</p>
<p>但是像一些事件处理的方法，是无法在服务端完成，因此需要将组件代码在浏览器中再执行一遍，这种服务器端和客户端共用一套代码的方式就称之为<strong>同构</strong></p>
<p>重构通俗讲就是一套React代码在服务器上运行一遍，到达浏览器又运行一遍：</p>
<ul>
<li>服务端渲染完成页面结构</li>
<li>浏览器端渲染完成事件绑定</li>
</ul>
<p>浏览器实现事件绑定的方式为让浏览器去拉取<code v-pre>JS</code>文件执行，让<code v-pre>JS</code>代码来控制，因此需要引入<code v-pre>script</code>标签</p>
<p>通过<code v-pre>script</code>标签为页面引入客户端执行的<code v-pre>react</code>代码，并通过<code v-pre>express</code>的<code v-pre>static</code>中间件为<code v-pre>js</code>文件配置路由，修改如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> express <span class="token keyword">from</span> <span class="token string">'express'</span>
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token comment">//引入React以支持JSX的语法</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> renderToString <span class="token punctuation">}</span> <span class="token keyword">from</span><span class="token string">'react-dom/server'</span><span class="token comment">//引入renderToString方法</span>
<span class="token keyword">import</span> Home <span class="token keyword">from</span> <span class="token string">'./src/containers/Home'</span>
 
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span><span class="token string">'public'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//使用express提供的static中间件,中间件会将所有静态文件的路由指向public文件夹</span>
 <span class="token keyword">const</span> content <span class="token operator">=</span> <span class="token function">renderToString</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>Home<span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">)</span>
 
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span>res</span><span class="token punctuation">)</span><span class="token operator">=></span>res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
&lt;html>
   &lt;head>
       &lt;title>ssr demo&lt;/title>
   &lt;/head>
   &lt;body>
        </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>content<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
   &lt;script src="/index.js">&lt;/script>
   &lt;/body>
&lt;/html>
</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>

 app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3001</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Example app listening on port 3001!'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再客户端执行以下<code v-pre>react</code>代码，新建<code v-pre>webpack.client.js</code>作为客户端React代码的<code v-pre>webpack</code>配置文件如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span>                    <span class="token comment">//node的path模块</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span><span class="token string">'development'</span><span class="token punctuation">,</span>                         <span class="token comment">//开发模式</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span><span class="token string">'./src/client/index.js'</span><span class="token punctuation">,</span>              <span class="token comment">//入口</span>
    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>                                   <span class="token comment">//打包出口</span>
        <span class="token literal-property property">filename</span><span class="token operator">:</span><span class="token string">'index.js'</span><span class="token punctuation">,</span>                    <span class="token comment">//打包后的文件名</span>
        <span class="token literal-property property">path</span><span class="token operator">:</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span><span class="token string">'public'</span><span class="token punctuation">)</span>   <span class="token comment">//存放到根目录的build文件夹</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>                               <span class="token comment">//打包规则</span>
           <span class="token literal-property property">test</span><span class="token operator">:</span>   <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js?$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>                    <span class="token comment">//对所有js文件进行打包</span>
           <span class="token literal-property property">loader</span><span class="token operator">:</span><span class="token string">'babel-loader'</span><span class="token punctuation">,</span>               <span class="token comment">//使用babel-loader进行打包</span>
           <span class="token literal-property property">exclude</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>             <span class="token comment">//不打包node_modules中的js文件</span>
           <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
               <span class="token literal-property property">presets</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'react'</span><span class="token punctuation">,</span><span class="token string">'stage-0'</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token string">'env'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>     
                    <span class="token comment">//loader时额外的打包规则,这里对react,JSX进行转换</span>
                    <span class="token literal-property property">targets</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token literal-property property">browsers</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'last 2versions'</span><span class="token punctuation">]</span>   <span class="token comment">//对主流浏览器最近两个版本进行兼容</span>
                    <span class="token punctuation">}</span>
               <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
           <span class="token punctuation">}</span>
       <span class="token punctuation">}</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法就能够简单实现首页的<code v-pre>react</code>服务端渲染，过程对应如下图：</p>
<p><img src="https://static.vue-js.com/a2894970-f3f7-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>在做完初始渲染的时候，一个应用会存在路由的情况，配置信息如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span>                   <span class="token comment">//引入React以支持JSX</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Route <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-router-dom'</span>    <span class="token comment">//引入路由</span>
<span class="token keyword">import</span> Home <span class="token keyword">from</span> <span class="token string">'./containers/Home'</span>        <span class="token comment">//引入Home组件</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">></span>
        <span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">"/"</span> exact component<span class="token operator">=</span><span class="token punctuation">{</span>Home<span class="token punctuation">}</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>Route<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后可以通过<code v-pre>index.js</code>引用路由信息，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span>
<span class="token keyword">import</span> ReactDom <span class="token keyword">from</span> <span class="token string">'react-dom'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> BrowserRouter <span class="token punctuation">}</span> <span class="token keyword">from</span><span class="token string">'react-router-dom'</span>
<span class="token keyword">import</span> Router <span class="token keyword">from</span><span class="token string">'../Routers'</span>

<span class="token keyword">const</span> <span class="token function-variable function">App</span><span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token operator">&lt;</span>BrowserRouter<span class="token operator">></span>
           <span class="token punctuation">{</span>Router<span class="token punctuation">}</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>BrowserRouter<span class="token operator">></span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

ReactDom<span class="token punctuation">.</span><span class="token function">hydrate</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>App<span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'root'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候控制台会存在报错信息，原因在于每个<code v-pre>Route</code>组件外面包裹着一层<code v-pre>div</code>，但服务端返回的代码中并没有这个<code v-pre>div</code></p>
<p>解决方法只需要将路由信息在服务端执行一遍，使用使用<code v-pre>StaticRouter</code>来替代<code v-pre>BrowserRouter</code>，通过<code v-pre>context</code>进行参数传递</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> express <span class="token keyword">from</span> <span class="token string">'express'</span>
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token comment">//引入React以支持JSX的语法</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> renderToString <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-dom/server'</span><span class="token comment">//引入renderToString方法</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> StaticRouter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-router-dom'</span>
<span class="token keyword">import</span> Router <span class="token keyword">from</span> <span class="token string">'../Routers'</span>
 
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span><span class="token string">'public'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//使用express提供的static中间件,中间件会将所有静态文件的路由指向public文件夹</span>

app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span>res</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> content  <span class="token operator">=</span> <span class="token function">renderToString</span><span class="token punctuation">(</span><span class="token punctuation">(</span>
        <span class="token comment">//传入当前path</span>
        <span class="token comment">//context为必填参数,用于服务端渲染参数传递</span>
        <span class="token operator">&lt;</span>StaticRouter location<span class="token operator">=</span><span class="token punctuation">{</span>req<span class="token punctuation">.</span>path<span class="token punctuation">}</span> context<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">></span>
           <span class="token punctuation">{</span>Router<span class="token punctuation">}</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>StaticRouter<span class="token operator">></span>
    <span class="token punctuation">)</span><span class="token punctuation">)</span>
    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
   &lt;html>
       &lt;head>
           &lt;title>ssr demo&lt;/title>
       &lt;/head>
       &lt;body>
       &lt;div id="root"></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>content<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/div>
       &lt;script src="/index.js">&lt;/script>
       &lt;/body>
   &lt;/html>
    </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>


app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3001</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Exampleapp listening on port 3001!'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样也就完成了路由的服务端渲染</p>
<h2 id="三、原理" tabindex="-1"><a class="header-anchor" href="#三、原理" aria-hidden="true">#</a> 三、原理</h2>
<p>整体<code v-pre>react</code>服务端渲染原理并不复杂，具体如下：</p>
<p><code v-pre>node server</code> 接收客户端请求，得到当前的请求<code v-pre>url</code> 路径，然后在已有的路由表内查找到对应的组件，拿到需要请求的数据，将数据作为 <code v-pre>props</code>、<code v-pre>context</code>或者<code v-pre>store</code> 形式传入组件</p>
<p>然后基于 <code v-pre>react</code> 内置的服务端渲染方法 <code v-pre>renderToString()</code>把组件渲染为 <code v-pre>html</code>字符串在把最终的 <code v-pre>html</code>进行输出前需要将数据注入到浏览器端</p>
<p>浏览器开始进行渲染和节点对比，然后执行完成组件内事件绑定和一些交互，浏览器重用了服务端输出的 <code v-pre>html</code> 节点，整个流程结束</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zhuanlan.zhihu.com/p/52693113</li>
<li>https://segmentfault.com/a/1190000020417285</li>
<li>https://juejin.cn/post/6844904000387563533#heading-14</li>
</ul>
</div></template>


