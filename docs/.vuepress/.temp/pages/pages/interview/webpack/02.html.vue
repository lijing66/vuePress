<template><div><h1 id="说说-webpack-中常见的-loader-解决了什么问题" tabindex="-1"><a class="header-anchor" href="#说说-webpack-中常见的-loader-解决了什么问题" aria-hidden="true">#</a> 说说 webpack 中常见的 Loader？解决了什么问题？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>webpack 做的事情，仅仅是分析出各种模块的依赖关系，然后形成资源列表，最终打包生成到指定的文件中。 更多的功能需要借助 loaders 和 plugins 完成。</p>
<p>比如说：在代码中有一张图片需要进行打包，webpack 可以把图片读出来，但是不能将图片当做 js 代码来读，所以需要一个加载器 loader 来帮助我们把图片的二进制数据转变为 js 代码，loader 的作用说白了就是将一种形式的代码通过逻辑转变成另一种形式的代码，转换后的代码 webpack 就能识别了。loader 的功能定位是转换代码</p>
<p>以下就是常见的 loader：</p>
<ul>
<li>image-loader：加载并且压缩图片文件</li>
<li>css-loader：帮助 webpack 打包处理 css 文件，使用 css-loader 必须要配合使用 style-loader</li>
<li>style-loader：用于将 css 编译完成的样式，挂载到页面的 style 标签上。但是要注意 loader 执行顺序，style-loader 要放在第一位，loader 都是从后往前执行</li>
<li>babel-loader：把 ES6 转换成 ES5</li>
<li>sass-loader: css 预处理器，能更好的编写 css</li>
<li>postcss-loader: 用于补充 css 样式在各种浏览器的前缀，很方便，不需要手动写了</li>
<li>eslint-loader: 用于检查代码是否符合规范，是否存在语法错误</li>
<li>url-loader: 处理图片类型资源，可以根据图片的大小进行不同的操作，如果图片大小大于指定大小，则将图片进行资源打包，否则将图片转换为 base64 格式字符串，再把这个字符串打包到 JS 文件里</li>
</ul>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><img src="https://static.vue-js.com/5660fc40-a6ff-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p><code v-pre>loader</code> 用于对模块的&quot;源代码&quot;进行转换，在 <code v-pre>import</code> 或&quot;加载&quot;模块时预处理文件</p>
<p><code v-pre>webpack</code>做的事情，仅仅是分析出各种模块的依赖关系，然后形成资源列表，最终打包生成到指定的文件中。如下图所示：</p>
<p><img src="https://static.vue-js.com/7b8d9640-a6ff-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>在<code v-pre>webpack</code>内部中，任何文件都是模块，不仅仅只是<code v-pre>js</code>文件</p>
<p>默认情况下，在遇到<code v-pre>import</code>或者<code v-pre>require</code>加载模块的时候，<code v-pre>webpack</code>只支持对<code v-pre>js</code> 和 <code v-pre>json</code> 文件打包</p>
<p>像<code v-pre>css</code>、<code v-pre>sass</code>、<code v-pre>png</code>等这些类型的文件的时候，<code v-pre>webpack</code>则无能为力，这时候就需要配置对应的<code v-pre>loader</code>进行文件内容的解析</p>
<p>在加载模块的时候，执行顺序如下：</p>
<p><img src="https://static.vue-js.com/9c2c43b0-a6ff-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>当 <code v-pre>webpack</code> 碰到不识别的模块的时候，<code v-pre>webpack</code> 会在配置的中查找该文件解析规则</p>
<p>关于配置<code v-pre>loader</code>的方式有三种：</p>
<ul>
<li>配置方式（推荐）：在 webpack.config.js 文件中指定 loader</li>
<li>内联方式：在每个 import 语句中显式指定 loader</li>
<li>CLI 方式：在 shell 命令中指定它们</li>
</ul>
<h3 id="配置方式" tabindex="-1"><a class="header-anchor" href="#配置方式" aria-hidden="true">#</a> 配置方式</h3>
<p>关于<code v-pre>loader</code>的配置，我们是写在<code v-pre>module.rules</code>属性中，属性介绍如下：</p>
<ul>
<li>
<p><code v-pre>rules</code>是一个数组的形式，因此我们可以配置很多个<code v-pre>loader</code></p>
</li>
<li>
<p>每一个<code v-pre>loader</code>对应一个对象的形式，对象属性<code v-pre>test</code> 为匹配的规则，一般情况为正则表达式</p>
</li>
<li>
<p>属性<code v-pre>use</code>针对匹配到文件类型，调用对应的 <code v-pre>loader</code> 进行处理</p>
</li>
</ul>
<p>代码编写，如下形式：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span> <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">'style-loader'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">'css-loader'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">modules</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span> <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">'sass-loader'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、特性" tabindex="-1"><a class="header-anchor" href="#二、特性" aria-hidden="true">#</a> 二、特性</h2>
<p>这里继续拿上述代码，来讲讲<code v-pre>loader</code>的特性</p>
<p>从上述代码可以看到，在处理<code v-pre>css</code>模块的时候，<code v-pre>use</code>属性中配置了三个<code v-pre>loader</code>分别处理<code v-pre>css</code>文件</p>
<p>因为<code v-pre>loader</code>支持链式调用，链中的每个<code v-pre>loader</code>会处理之前已处理过的资源，最终变为<code v-pre>js</code>代码。顺序为相反的顺序执行，即上述执行方式为<code v-pre>sass-loader</code>、<code v-pre>css-loader</code>、<code v-pre>style-loader</code></p>
<p>除此之外，<code v-pre>loader</code>的特性还有如下：</p>
<ul>
<li>loader 可以是同步的，也可以是异步的</li>
<li>loader 运行在 Node.js 中，并且能够执行任何操作</li>
<li>除了常见的通过 <code v-pre>package.json</code> 的 <code v-pre>main</code> 来将一个 npm 模块导出为 loader，还可以在 module.rules 中使用 <code v-pre>loader</code> 字段直接引用一个模块</li>
<li>插件(plugin)可以为 loader 带来更多特性</li>
<li>loader 能够产生额外的任意文件</li>
</ul>
<p>可以通过 loader 的预处理函数，为 JavaScript 生态系统提供更多能力。用户现在可以更加灵活地引入细粒度逻辑，例如：压缩、打包、语言翻译和更多其他特性</p>
<h2 id="三、常见的-loader" tabindex="-1"><a class="header-anchor" href="#三、常见的-loader" aria-hidden="true">#</a> 三、常见的 loader</h2>
<p>在页面开发过程中，我们经常性加载除了<code v-pre>js</code>文件以外的内容，这时候我们就需要配置响应的<code v-pre>loader</code>进行加载</p>
<p>常见的<code v-pre>loader</code>如下：</p>
<ul>
<li>style-loader: 将 css 添加到 DOM 的内联样式标签 style 里</li>
<li>css-loader :允许将 css 文件通过 require 的方式引入，并返回 css 代码</li>
<li>less-loader: 处理 less</li>
<li>sass-loader: 处理 sass</li>
<li>postcss-loader: 用 postcss 来处理 CSS</li>
<li>autoprefixer-loader: 处理 CSS3 属性前缀，已被弃用，建议直接使用 postcss</li>
<li>file-loader: 分发文件到 output 目录并返回相对路径</li>
<li>url-loader: 和 file-loader 类似，但是当文件小于设定的 limit 时可以返回一个 Data Url</li>
<li>html-minify-loader: 压缩 HTML</li>
<li>babel-loader :用 babel 来转换 ES6 文件到 ES</li>
</ul>
<p>下面给出一些常见的<code v-pre>loader</code>的使用：</p>
<h3 id="css-loader" tabindex="-1"><a class="header-anchor" href="#css-loader" aria-hidden="true">#</a> css-loader</h3>
<p>分析 <code v-pre>css</code> 模块之间的关系，并合成⼀个 <code v-pre>css</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>npm install <span class="token operator">--</span>save<span class="token operator">-</span>dev css<span class="token operator">-</span>loader
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token operator">...</span><span class="token punctuation">,</span>
 <span class="token punctuation">{</span>
  <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
    <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">"css-loader"</span><span class="token punctuation">,</span>
      <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
     <span class="token comment">// 启用/禁用 url() 处理</span>
     <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
     <span class="token comment">// 启用/禁用 @import 处理</span>
     <span class="token keyword">import</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token comment">// 启用/禁用 Sourcemap</span>
        <span class="token literal-property property">sourceMap</span><span class="token operator">:</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果只通过<code v-pre>css-loader</code>加载文件，这时候页面代码设置的样式并没有生效</p>
<p>原因在于，<code v-pre>css-loader</code>只是负责将<code v-pre>.css</code>文件进行一个解析，而并不会将解析后的<code v-pre>css</code>插入到页面中</p>
<p>如果我们希望再完成插入<code v-pre>style</code>的操作，那么我们还需要另外一个<code v-pre>loader</code>，就是<code v-pre>style-loader</code></p>
<h3 id="style-loader" tabindex="-1"><a class="header-anchor" href="#style-loader" aria-hidden="true">#</a> style-loader</h3>
<p>把 <code v-pre>css-loader</code> 生成的内容，用 <code v-pre>style</code> 标签挂载到页面的 <code v-pre>head</code> 中</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>npm install <span class="token operator">--</span>save<span class="token operator">-</span>dev style<span class="token operator">-</span>loader
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token operator">...</span><span class="token punctuation">,</span>
 <span class="token punctuation">{</span>
  <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
    <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"style-loader"</span><span class="token punctuation">,</span> <span class="token string">"css-loader"</span><span class="token punctuation">]</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同一个任务的 <code v-pre>loader</code> 可以同时挂载多个，处理顺序为：从右到左，从下往上</p>
<h3 id="less-loader" tabindex="-1"><a class="header-anchor" href="#less-loader" aria-hidden="true">#</a> less-loader</h3>
<p>开发中，我们也常常会使用<code v-pre>less</code>、<code v-pre>sass</code>、<code v-pre>stylus</code>预处理器编写<code v-pre>css</code>样式，使开发效率提高，这里需要使用<code v-pre>less-loader</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>npm install less<span class="token operator">-</span>loader <span class="token operator">-</span><span class="token constant">D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token operator">...</span><span class="token punctuation">,</span>
 <span class="token punctuation">{</span>
  <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
    <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"style-loader"</span><span class="token punctuation">,</span> <span class="token string">"css-loader"</span><span class="token punctuation">,</span><span class="token string">"less-loader"</span><span class="token punctuation">]</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="raw-loader" tabindex="-1"><a class="header-anchor" href="#raw-loader" aria-hidden="true">#</a> raw-loader</h3>
<p>在 <code v-pre>webpack</code>中通过 <code v-pre>import</code>方式导入文件内容，该<code v-pre>loader</code>并不是内置的，所以首先要安装</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>npm install <span class="token operator">--</span>save<span class="token operator">-</span>dev raw<span class="token operator">-</span>loader
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后在 webpack.config.js 中进行配置</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span><span class="token punctuation">,</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(txt|md)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token string">'raw-loader'</span>
     <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="file-loader" tabindex="-1"><a class="header-anchor" href="#file-loader" aria-hidden="true">#</a> file-loader</h3>
<p>把识别出的资源模块，移动到指定的输出⽬目录，并且返回这个资源在输出目录的地址(字符串)</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>npm install --save-dev file-loader
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token operator">...</span><span class="token punctuation">,</span>
 <span class="token punctuation">{</span>
  <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(png|jpe?g|gif)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
    <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">"file-loader"</span><span class="token punctuation">,</span>
      <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// placeholder 占位符 [name] 源资源模块的名称</span>
        <span class="token comment">// [ext] 源资源模块的后缀</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"[name]_[hash].[ext]"</span><span class="token punctuation">,</span>
        <span class="token comment">//打包后的存放位置</span>
        <span class="token literal-property property">outputPath</span><span class="token operator">:</span> <span class="token string">"./images"</span><span class="token punctuation">,</span>
        <span class="token comment">// 打包后文件的 url</span>
        <span class="token literal-property property">publicPath</span><span class="token operator">:</span> <span class="token string">'./images'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="url-loader" tabindex="-1"><a class="header-anchor" href="#url-loader" aria-hidden="true">#</a> url-loader</h3>
<p>可以处理理 <code v-pre>file-loader</code> 所有的事情，但是遇到图片格式的模块，可以选择性的把图片转成 <code v-pre>base64</code> 格式的字符串，并打包到 <code v-pre>js</code> 中，对小体积的图片比较合适，大图片不合适。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>npm install --save-dev url-loader
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token operator">...</span><span class="token punctuation">,</span>
 <span class="token punctuation">{</span>
  <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(png|jpe?g|gif)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
    <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">"url-loader"</span><span class="token punctuation">,</span>
      <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// placeholder 占位符 [name] 源资源模块的名称</span>
        <span class="token comment">// [ext] 源资源模块的后缀</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"[name]_[hash].[ext]"</span><span class="token punctuation">,</span>
        <span class="token comment">//打包后的存放位置</span>
        <span class="token literal-property property">outputPath</span><span class="token operator">:</span> <span class="token string">"./images"</span>
        <span class="token comment">// 打包后文件的 url</span>
        <span class="token literal-property property">publicPath</span><span class="token operator">:</span> <span class="token string">'./images'</span><span class="token punctuation">,</span>
        <span class="token comment">// 小于 100 字节转成 base64 格式</span>
        <span class="token literal-property property">limit</span><span class="token operator">:</span> <span class="token number">100</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://webpack.docschina.org/concepts/loaders/</li>
<li>https://segmentfault.com/a/1190000018680530 /</li>
</ul>
</div></template>


