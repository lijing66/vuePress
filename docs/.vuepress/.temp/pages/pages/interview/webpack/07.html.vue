<template><div><h1 id="说说如何借助-webpack-来优化前端性能" tabindex="-1"><a class="header-anchor" href="#说说如何借助-webpack-来优化前端性能" aria-hidden="true">#</a> 说说如何借助 webpack 来优化前端性能？</h1>
<p>一、背景</p>
<p>随着前端的项目逐渐扩大，必然会带来的一个问题就是性能 尤其在大型复杂的项目中，前端业务可能因为一个小小的数据依赖，导致整个页面卡顿甚至奔溃 一般项目在完成后，会通过<code v-pre>webpack</code>进行打包，利用 webpack 对前端项目性能优化是一个十分重要的环节</p>
<p>二、如何优化 通过 webpack 优化前端的手段有：</p>
<ul>
<li>JS 代码压缩</li>
<li>CSS 代码压缩</li>
<li>Html 文件代码压缩</li>
<li>文件大小压缩</li>
<li>图片压缩</li>
<li>Tree Shaking</li>
<li>代码分离</li>
<li>内联 chunk</li>
</ul>
<p>具体实现的链接 ：<a href="https://zhuanlan.zhihu.com/p/139498741" target="_blank" rel="noopener noreferrer">浅谈 webpack 性能优化（内附 webpack 学习笔记） (opens new window)<ExternalLinkIcon/></a></p>
<h2 id="一、背景" tabindex="-1"><a class="header-anchor" href="#一、背景" aria-hidden="true">#</a> 一、背景</h2>
<p><img src="https://static.vue-js.com/15e1ace0-aee4-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>随着前端的项目逐渐扩大，必然会带来的一个问题就是性能</p>
<p>尤其在大型复杂的项目中，前端业务可能因为一个小小的数据依赖，导致整个页面卡顿甚至奔溃</p>
<p>一般项目在完成后，会通过<code v-pre>webpack</code>进行打包，利用<code v-pre>webpack</code>对前端项目性能优化是一个十分重要的环节</p>
<h2 id="二、如何优化" tabindex="-1"><a class="header-anchor" href="#二、如何优化" aria-hidden="true">#</a> 二、如何优化</h2>
<p>通过<code v-pre>webpack</code>优化前端的手段有：</p>
<ul>
<li>JS 代码压缩</li>
<li>CSS 代码压缩</li>
<li>Html 文件代码压缩</li>
<li>文件大小压缩</li>
<li>图片压缩</li>
<li>Tree Shaking</li>
<li>代码分离</li>
<li>内联 chunk</li>
</ul>
<h3 id="js-代码压缩" tabindex="-1"><a class="header-anchor" href="#js-代码压缩" aria-hidden="true">#</a> JS 代码压缩</h3>
<p><code v-pre>terser</code>是一个<code v-pre>JavaScript</code>的解释、绞肉机、压缩机的工具集，可以帮助我们压缩、丑化我们的代码，让<code v-pre>bundle</code>更小</p>
<p>在<code v-pre>production</code>模式下，<code v-pre>webpack</code> 默认就是使用 <code v-pre>TerserPlugin</code> 来处理我们的代码的。如果想要自定义配置它，配置方法如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> TerserPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'terser-webpack-plugin'</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
    <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">minimize</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token keyword">new</span> <span class="token class-name">TerserPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">parallel</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 电脑cpu核数-1</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>属性介绍如下：</p>
<ul>
<li>extractComments：默认值为 true，表示会将注释抽取到一个单独的文件中，开发阶段，我们可设置为 false ，不保留注释</li>
<li>parallel：使用多进程并发运行提高构建的速度，默认值是 true，并发运行的默认数量： os.cpus().length - 1</li>
<li>terserOptions：设置我们的 terser 相关的配置：</li>
<li>compress：设置压缩相关的选项，mangle：设置丑化相关的选项，可以直接设置为 true</li>
<li>mangle：设置丑化相关的选项，可以直接设置为 true</li>
<li>toplevel：底层变量是否进行转换</li>
<li>keep_classnames：保留类的名称</li>
<li>keep_fnames：保留函数的名称</li>
</ul>
<h3 id="css-代码压缩" tabindex="-1"><a class="header-anchor" href="#css-代码压缩" aria-hidden="true">#</a> CSS 代码压缩</h3>
<p><code v-pre>CSS</code>压缩通常是去除无用的空格等，因为很难去修改选择器、属性的名称、值等</p>
<p>CSS 的压缩我们可以使用另外一个插件：<code v-pre>css-minimizer-webpack-plugin</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>npm install css<span class="token operator">-</span>minimizer<span class="token operator">-</span>webpack<span class="token operator">-</span>plugin <span class="token operator">-</span><span class="token constant">D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置方法如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> CssMinimizerPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'css-minimizer-webpack-plugin'</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">minimize</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token keyword">new</span> <span class="token class-name">CssMinimizerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">parallel</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="html-文件代码压缩" tabindex="-1"><a class="header-anchor" href="#html-文件代码压缩" aria-hidden="true">#</a> Html 文件代码压缩</h3>
<p>使用<code v-pre>HtmlWebpackPlugin</code>插件来生成<code v-pre>HTML</code>的模板时候，通过配置属性<code v-pre>minify</code>进行<code v-pre>html</code>优化</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
    <span class="token literal-property property">plugin</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token keyword">new</span> <span class="token class-name">HtmlwebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token operator">...</span>
            <span class="token literal-property property">minify</span><span class="token operator">:</span><span class="token punctuation">{</span>
                <span class="token literal-property property">minifyCSS</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 是否压缩css</span>
                <span class="token literal-property property">collapseWhitespace</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 是否折叠空格</span>
                <span class="token literal-property property">removeComments</span><span class="token operator">:</span><span class="token boolean">true</span> <span class="token comment">// 是否移除注释</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置了<code v-pre>minify</code>，实际会使用另一个插件<code v-pre>html-minifier-terser</code></p>
<h3 id="文件大小压缩" tabindex="-1"><a class="header-anchor" href="#文件大小压缩" aria-hidden="true">#</a> 文件大小压缩</h3>
<p>对文件的大小进行压缩，减少<code v-pre>http</code>传输过程中宽带的损耗</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>npm install compression<span class="token operator">-</span>webpack<span class="token operator">-</span>plugin <span class="token operator">-</span><span class="token constant">D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">ComepressionPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(css|js)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token comment">// 哪些文件需要压缩</span>
  <span class="token literal-property property">threshold</span><span class="token operator">:</span> <span class="token number">500</span><span class="token punctuation">,</span> <span class="token comment">// 设置文件多大开始压缩</span>
  <span class="token literal-property property">minRatio</span><span class="token operator">:</span> <span class="token number">0.7</span><span class="token punctuation">,</span> <span class="token comment">// 至少压缩的比例</span>
  <span class="token literal-property property">algorithm</span><span class="token operator">:</span> <span class="token string">'gzip'</span><span class="token punctuation">,</span> <span class="token comment">// 采用的压缩算法</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="图片压缩" tabindex="-1"><a class="header-anchor" href="#图片压缩" aria-hidden="true">#</a> 图片压缩</h3>
<p>一般来说在打包之后，一些图片文件的大小是远远要比 <code v-pre>js</code> 或者 <code v-pre>css</code> 文件要来的大，所以图片压缩较为重要</p>
<p>配置方法如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(png|jpg|gif)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">'file-loader'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'[name]_[hash].[ext]'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">outputPath</span><span class="token operator">:</span> <span class="token string">'images/'</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">'image-webpack-loader'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token comment">// 压缩 jpeg 的配置</span>
            <span class="token literal-property property">mozjpeg</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">progressive</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
              <span class="token literal-property property">quality</span><span class="token operator">:</span> <span class="token number">65</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token comment">// 使用 imagemin**-optipng 压缩 png，enable: false 为关闭</span>
            <span class="token literal-property property">optipng</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">enabled</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token comment">// 使用 imagemin-pngquant 压缩 png</span>
            <span class="token literal-property property">pngquant</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">quality</span><span class="token operator">:</span> <span class="token string">'65-90'</span><span class="token punctuation">,</span>
              <span class="token literal-property property">speed</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token comment">// 压缩 gif 的配置</span>
            <span class="token literal-property property">gifsicle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">interlaced</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token comment">// 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式</span>
            <span class="token literal-property property">webp</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">quality</span><span class="token operator">:</span> <span class="token number">75</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tree-shaking" tabindex="-1"><a class="header-anchor" href="#tree-shaking" aria-hidden="true">#</a> Tree Shaking</h3>
<p><code v-pre>Tree Shaking</code> 是一个术语，在计算机中表示消除死代码，依赖于<code v-pre>ES Module</code>的静态语法分析（不执行任何的代码，可以明确知道模块的依赖关系）</p>
<p>在<code v-pre>webpack</code>实现<code v-pre>Trss shaking</code>有两种不同的方案：</p>
<ul>
<li>usedExports：通过标记某些函数是否被使用，之后通过 Terser 来进行优化的</li>
<li>sideEffects：跳过整个模块/文件，直接查看该文件是否有副作用</li>
</ul>
<p>两种不同的配置方案， 有不同的效果</p>
<h4 id="usedexports" tabindex="-1"><a class="header-anchor" href="#usedexports" aria-hidden="true">#</a> usedExports</h4>
<p>配置方法也很简单，只需要将<code v-pre>usedExports</code>设为<code v-pre>true</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
    <span class="token literal-property property">optimization</span><span class="token operator">:</span><span class="token punctuation">{</span>
        usedExports
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用之后，没被用上的代码在<code v-pre>webpack</code>打包中会加入<code v-pre>unused harmony export mul</code>注释，用来告知 <code v-pre>Terser</code> 在优化时，可以删除掉这段代码</p>
<p>如下面<code v-pre>sum</code>函数没被用到，<code v-pre>webpack</code>打包会添加注释，<code v-pre>terser</code>在优化时，则将该函数去掉</p>
<p><img src="https://static.vue-js.com/21b2e200-aee4-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h4 id="sideeffects" tabindex="-1"><a class="header-anchor" href="#sideeffects" aria-hidden="true">#</a> sideEffects</h4>
<p><code v-pre>sideEffects</code>用于告知<code v-pre>webpack compiler</code>哪些模块时有副作用，配置方法是在<code v-pre>package.json</code>中设置<code v-pre>sideEffects</code>属性</p>
<p>如果<code v-pre>sideEffects</code>设置为 false，就是告知<code v-pre>webpack</code>可以安全的删除未用到的<code v-pre>exports</code></p>
<p>如果有些文件需要保留，可以设置为数组的形式</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token string-property property">"sideEffecis"</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token string">"./src/util/format.js"</span><span class="token punctuation">,</span>
    <span class="token string">"*.css"</span> <span class="token comment">// 所有的css文件</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述都是关于<code v-pre>javascript</code>的<code v-pre>tree shaking</code>，<code v-pre>css</code>同样也能够实现<code v-pre>tree shaking</code></p>
<h4 id="css-tree-shaking" tabindex="-1"><a class="header-anchor" href="#css-tree-shaking" aria-hidden="true">#</a> css tree shaking</h4>
<p><code v-pre>css</code>进行<code v-pre>tree shaking</code>优化可以安装<code v-pre>PurgeCss</code>插件</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>npm install purgecss<span class="token operator">-</span>plugin<span class="token operator">-</span>webpack <span class="token operator">-</span><span class="token constant">D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> PurgeCssPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'purgecss-webpack-plugin'</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token keyword">new</span> <span class="token class-name">PurgeCssPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span>glob<span class="token punctuation">.</span><span class="token function">sync</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">'./src'</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/**/*</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">nodir</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">}</span><span class="token comment">// src里面的所有文件</span>
            <span class="token function-variable function">satelist</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">standard</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">"html"</span><span class="token punctuation">]</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>paths：表示要检测哪些目录下的内容需要被分析，配合使用 glob</li>
<li>默认情况下，Purgecss 会将我们的 html 标签的样式移除掉，如果我们希望保留，可以添加一个 safelist 的属性</li>
</ul>
<h3 id="代码分离" tabindex="-1"><a class="header-anchor" href="#代码分离" aria-hidden="true">#</a> 代码分离</h3>
<p>将代码分离到不同的<code v-pre>bundle</code>中，之后我们可以按需加载，或者并行加载这些文件</p>
<p>默认情况下，所有的<code v-pre>JavaScript</code>代码（业务代码、第三方依赖、暂时没有用到的模块）在首页全部都加载，就会影响首页的加载速度</p>
<p>代码分离可以分出出更小的<code v-pre>bundle</code>，以及控制资源加载优先级，提供代码的加载性能</p>
<p>这里通过<code v-pre>splitChunksPlugin</code>来实现，该插件<code v-pre>webpack</code>已经默认安装和集成，只需要配置即可</p>
<p>默认配置中，chunks 仅仅针对于异步（async）请求，我们可以设置为 initial 或者 all</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
    <span class="token literal-property property">optimization</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">splitChunks</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token literal-property property">chunks</span><span class="token operator">:</span><span class="token string">"all"</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>splitChunks</code>主要属性有如下：</p>
<ul>
<li>Chunks，对同步代码还是异步代码进行处理</li>
<li>minSize： 拆分包的大小, 至少为 minSize，如何包的大小不超过 minSize，这个包不会拆分</li>
<li>maxSize： 将大于 maxSize 的包，拆分为不小于 minSize 的包</li>
<li>minChunks：被引入的次数，默认是 1</li>
</ul>
<h3 id="内联-chunk" tabindex="-1"><a class="header-anchor" href="#内联-chunk" aria-hidden="true">#</a> 内联 chunk</h3>
<p>可以通过<code v-pre>InlineChunkHtmlPlugin</code>插件将一些<code v-pre>chunk</code>的模块内联到<code v-pre>html</code>，如<code v-pre>runtime</code>的代码（对模块进行解析、加载、模块信息相关的代码），代码量并不大，但是必须加载的</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> InlineChunkHtmlPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'react-dev-utils/InlineChunkHtmlPlugin'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'html-webpack-plugin'</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
    <span class="token literal-property property">plugin</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token keyword">new</span> <span class="token class-name">InlineChunkHtmlPlugin</span><span class="token punctuation">(</span>HtmlWebpackPlugin<span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">runtime.+\.js</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h3>
<p>关于<code v-pre>webpack</code>对前端性能的优化，可以通过文件体积大小入手，其次还可通过分包的形式、减少 http 请求次数等方式，实现对前端性能的优化</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zhuanlan.zhihu.com/p/139498741 /</li>
</ul>
</div></template>


