<template><div><h1 id="说说-loader-和-plugin-的区别-编写-loader-plugin-的思路" tabindex="-1"><a class="header-anchor" href="#说说-loader-和-plugin-的区别-编写-loader-plugin-的思路" aria-hidden="true">#</a> 说说 Loader 和 Plugin 的区别？编写 Loader，Plugin 的思路？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>一、区别</p>
<ol>
<li>loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中</li>
<li>plugin 赋予了 webpack 各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决 loader 无法实现的其他事</li>
</ol>
<p>两者在运行时机上的</p>
<ol start="3">
<li>loader 运行在打包文件之前</li>
<li>plugins 在整个编译周期都起作用</li>
</ol>
<p>二、编写 loader 在编写 loader 前，我们首先需要了解 loader 的本质 其本质为函数，函数中的 this 作为上下文会被 https://so.csdn.net/so/search?q=webpack&amp;spm=1001.2101.3001.7020 填充，因此我们不能将 loader 设为一个箭头函数 函数接受一个参数，为 webpack 传递给 loader 的文件源内容 函数中 this 是由 webpack 提供的对象，能够获取当前 loader 所需要的各种信息 函数中有异步操作或同步操作，异步操作通过 this.callback 返回，返回值要求为 string 或者 Buffer</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 导出一个函数，source为webpack传递给loader的文件源内容</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> content <span class="token operator">=</span> <span class="token function">doSomeThing2JsString</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span>

  <span class="token comment">// 如果 loader 配置了 options 对象，那么this.query将指向 options</span>
  <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>query

  <span class="token comment">// 可以用作解析其他模块路径的上下文</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'this.context'</span><span class="token punctuation">)</span>

  <span class="token comment">/*
   * this.callback 参数：
   * error：Error | null，当 loader 出错时向外抛出一个 error
   * content：String | Buffer，经过 loader 编译后需要导出的内容
   * sourceMap：为方便调试生成的编译后内容的 source map
   * ast：本次编译生成的 AST 静态语法树，之后执行的 loader 可以直接使用这个 AST，进而省去重复生成 AST 的过程
   */</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> content<span class="token punctuation">)</span> <span class="token comment">// 异步</span>
  <span class="token keyword">return</span> content <span class="token comment">// 同步</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>三、编写 plugin</p>
<p>由于 webpack 基于发布订阅模式，在运行的生命周期中会广播出许多事件，插件通过监听这些事件，就可以在特定的阶段执行自己的插件任务</p>
<p>在之前也了解过 webpack 编译会创建两个核心对象：</p>
<p>compiler：包含了 webpack 环境的所有的配置信息，包括 options，loader 和 plugin，和 webpack 整个生命周期相关的钩子</p>
<p>compilation：作为 plugin 内置事件回调函数的参数，包含了当前的模块资源、编译生成资源、变化的文件以及被跟踪依赖的状态信息。当检测到一个文件变化，一次新的 Compilation 将被创建</p>
<p>如果自己要实现 plugin，也需要遵循一定的规范：</p>
<p>插件必须是一个函数或者是一个包含 apply 方法的对象，这样才能访问 compiler 实例</p>
<p>传给每个插件的 compiler 和 compilation 对象都是同一个引用，因此不建议修改</p>
<p>异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住</p>
<p>实现 plugin 的模板如下</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MyPlugin</span> <span class="token punctuation">{</span>
  <span class="token comment">// Webpack 会调用 MyPlugin 实例的 apply 方法给插件实例传入 compiler 对象</span>
  <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 找到合适的事件钩子，实现自己的插件功能</span>
    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>emit<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token string">'MyPlugin'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">compilation</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// compilation: 当前打包构建流程的上下文</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>compilation<span class="token punctuation">)</span>

      <span class="token comment">// do something...</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="一、区别" tabindex="-1"><a class="header-anchor" href="#一、区别" aria-hidden="true">#</a> 一、区别</h2>
<p><img src="https://static.vue-js.com/93042280-a894-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>前面两节我们有提到<code v-pre>Loader</code>与<code v-pre>Plugin</code>对应的概念，先来回顾下</p>
<ul>
<li>loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中</li>
<li>plugin 赋予了 webpack 各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决 loader 无法实现的其他事</li>
</ul>
<p>从整个运行时机上来看，如下图所示：</p>
<p><img src="https://static.vue-js.com/9a04ec40-a7c2-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>可以看到，两者在运行时机上的区别：</p>
<ul>
<li>loader 运行在打包文件之前</li>
<li>plugins 在整个编译周期都起作用</li>
</ul>
<p>在<code v-pre>Webpack</code> 运行的生命周期中会广播出许多事件，<code v-pre>Plugin</code> 可以监听这些事件，在合适的时机通过<code v-pre>Webpack</code>提供的 <code v-pre>API</code>改变输出结果</p>
<p>对于<code v-pre>loader</code>，实质是一个转换器，将 A 文件进行编译形成 B 文件，操作的是文件，比如将<code v-pre>A.scss</code>或<code v-pre>A.less</code>转变为<code v-pre>B.css</code>，单纯的文件转换过程</p>
<h2 id="二、编写-loader" tabindex="-1"><a class="header-anchor" href="#二、编写-loader" aria-hidden="true">#</a> 二、编写 loader</h2>
<p>在编写 <code v-pre>loader</code> 前，我们首先需要了解 <code v-pre>loader</code> 的本质</p>
<p>其本质为函数，函数中的 <code v-pre>this</code> 作为上下文会被 <code v-pre>webpack</code> 填充，因此我们不能将 <code v-pre>loader</code>设为一个箭头函数</p>
<p>函数接受一个参数，为 <code v-pre>webpack</code> 传递给 <code v-pre>loader</code> 的文件源内容</p>
<p>函数中 <code v-pre>this</code> 是由 <code v-pre>webpack</code> 提供的对象，能够获取当前 <code v-pre>loader</code> 所需要的各种信息</p>
<p>函数中有异步操作或同步操作，异步操作通过 <code v-pre>this.callback</code> 返回，返回值要求为 <code v-pre>string</code> 或者 <code v-pre>Buffer</code></p>
<p>代码如下所示：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 导出一个函数，source为webpack传递给loader的文件源内容</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> content <span class="token operator">=</span> <span class="token function">doSomeThing2JsString</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span>

  <span class="token comment">// 如果 loader 配置了 options 对象，那么this.query将指向 options</span>
  <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>query

  <span class="token comment">// 可以用作解析其他模块路径的上下文</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'this.context'</span><span class="token punctuation">)</span>

  <span class="token comment">/*
   * this.callback 参数：
   * error：Error | null，当 loader 出错时向外抛出一个 error
   * content：String | Buffer，经过 loader 编译后需要导出的内容
   * sourceMap：为方便调试生成的编译后内容的 source map
   * ast：本次编译生成的 AST 静态语法树，之后执行的 loader 可以直接使用这个 AST，进而省去重复生成 AST 的过程
   */</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> content<span class="token punctuation">)</span> <span class="token comment">// 异步</span>
  <span class="token keyword">return</span> content <span class="token comment">// 同步</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般在编写<code v-pre>loader</code>的过程中，保持功能单一，避免做多种功能</p>
<p>如<code v-pre>less</code>文件转换成 <code v-pre>css</code>文件也不是一步到位，而是 <code v-pre>less-loader</code>、<code v-pre>css-loader</code>、<code v-pre>style-loader</code>几个 <code v-pre>loader</code>的链式调用才能完成转换</p>
<h2 id="三、编写-plugin" tabindex="-1"><a class="header-anchor" href="#三、编写-plugin" aria-hidden="true">#</a> 三、编写 plugin</h2>
<p>由于<code v-pre>webpack</code>基于发布订阅模式，在运行的生命周期中会广播出许多事件，插件通过监听这些事件，就可以在特定的阶段执行自己的插件任务</p>
<p>在之前也了解过，<code v-pre>webpack</code>编译会创建两个核心对象：</p>
<ul>
<li>compiler：包含了 webpack 环境的所有的配置信息，包括 options，loader 和 plugin，和 webpack 整个生命周期相关的钩子</li>
<li>compilation：作为 plugin 内置事件回调函数的参数，包含了当前的模块资源、编译生成资源、变化的文件以及被跟踪依赖的状态信息。当检测到一个文件变化，一次新的 Compilation 将被创建</li>
</ul>
<p>如果自己要实现<code v-pre>plugin</code>，也需要遵循一定的规范：</p>
<ul>
<li>插件必须是一个函数或者是一个包含 <code v-pre>apply</code> 方法的对象，这样才能访问<code v-pre>compiler</code>实例</li>
<li>传给每个插件的 <code v-pre>compiler</code> 和 <code v-pre>compilation</code> 对象都是同一个引用，因此不建议修改</li>
<li>异步的事件需要在插件处理完任务时调用回调函数通知 <code v-pre>Webpack</code> 进入下一个流程，不然会卡住</li>
</ul>
<p>实现<code v-pre>plugin</code>的模板如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MyPlugin</span> <span class="token punctuation">{</span>
  <span class="token comment">// Webpack 会调用 MyPlugin 实例的 apply 方法给插件实例传入 compiler 对象</span>
  <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 找到合适的事件钩子，实现自己的插件功能</span>
    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>emit<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token string">'MyPlugin'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">compilation</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// compilation: 当前打包构建流程的上下文</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>compilation<span class="token punctuation">)</span>

      <span class="token comment">// do something...</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>emit</code> 事件发生时，代表源文件的转换和组装已经完成，可以读取到最终将输出的资源、代码块、模块及其依赖，并且可以修改输出资源的内容</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://webpack.docschina.org/api/loaders/</li>
<li>https://webpack.docschina.org/api/compiler-hooks/</li>
<li>https://segmentfault.com/a/1190000039877943</li>
</ul>
</div></template>


