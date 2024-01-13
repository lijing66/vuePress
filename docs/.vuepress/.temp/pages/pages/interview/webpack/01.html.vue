<template><div><h1 id="说说你对-webpack-的理解-解决了什么问题" tabindex="-1"><a class="header-anchor" href="#说说你对-webpack-的理解-解决了什么问题" aria-hidden="true">#</a> 说说你对 webpack 的理解？解决了什么问题？</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<ul>
<li>
<p>WebPack 是一个模块打包工具，可以使用 WebPack 管理模块。在 webpack 看来，项目里所有资源皆模块，分析模块间的依赖关系，最终编绎输出模块为 HTML、JavaScript、CSS 以及各种静态文件（图片、字体等），让开发过程更加高效。</p>
</li>
<li>
<p>对于不同类型的资源，webpack 有对应的模块加载器 loader，比如说，</p>
</li>
</ul>
<p>CSS</p>
<ul>
<li>
<p>解析 CSS 的 css-loader、style-loader，</p>
</li>
<li>
<p>解析 less 的 less-loader，sass 的 sass-loader,</p>
</li>
</ul>
<p>JS</p>
<ul>
<li>解析将 TypeScript 转换成 JavaScript 的 ts-loader,</li>
<li>解析 ES6 为 ES5 的 babel-loader，</li>
<li>解析 JavaScript 代码规范的 eslint-loader</li>
</ul>
<p>Vue</p>
<ul>
<li>解析.vue 文件的 vue-loader、</li>
<li>静态资源：音视频、文件、json</li>
<li>解析常用图片以及音视频资源的 url-loader、</li>
<li>解析文件的 file-loader，</li>
<li>解析 JSON 文件的 json-loader，</li>
</ul>
<h2 id="一、背景" tabindex="-1"><a class="header-anchor" href="#一、背景" aria-hidden="true">#</a> 一、背景</h2>
<p><img src="https://static.vue-js.com/898ed570-a578-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p><code v-pre>Webpack</code> 最初的目标是实现前端项目的模块化，旨在更高效地管理和维护项目中的每一个资源</p>
<h4 id="模块化" tabindex="-1"><a class="header-anchor" href="#模块化" aria-hidden="true">#</a> 模块化</h4>
<p>最早的时候，我们会通过文件划分的形式实现模块化，也就是将每个功能及其相关状态数据各自单独放到不同的<code v-pre>JS</code> 文件中</p>
<p>约定每个文件是一个独立的模块，然后再将这些<code v-pre>js</code>文件引入到页面，一个<code v-pre>script</code>标签对应一个模块，然后调用模块化的成员</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script src<span class="token operator">=</span><span class="token string">"module-a.js"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
<span class="token operator">&lt;</span>script src<span class="token operator">=</span><span class="token string">"module-b.js"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但这种模块弊端十分的明显，模块都是在全局中工作，大量模块成员污染了环境，模块与模块之间并没有依赖关系、维护困难、没有私有空间等问题</p>
<p>项目一旦变大，上述问题会尤其明显</p>
<p>随后，就出现了命名空间方式，规定每个模块只暴露一个全局对象，然后模块的内容都挂载到这个对象中</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>moduleA <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">method1</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'moduleA#method1'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式也并没有解决第一种方式的依赖等问题</p>
<p>再后来，我们使用立即执行函数为模块提供私有空间，通过参数的形式作为依赖声明，如下</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// module-a.js</span>
<span class="token punctuation">;</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">$</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'module-a'</span>

  <span class="token keyword">function</span> <span class="token function">method1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name <span class="token operator">+</span> <span class="token string">'#method1'</span><span class="token punctuation">)</span>
    <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'body'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">animate</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">margin</span><span class="token operator">:</span> <span class="token string">'200px'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  window<span class="token punctuation">.</span>moduleA <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">method1</span><span class="token operator">:</span> method1<span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>jQuery<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述的方式都是早期解决模块的方式，但是仍然存在一些没有解决的问题。例如，我们是用过<code v-pre>script</code>标签在页面引入这些模块的，这些模块的加载并不受代码的控制，时间一久维护起来也十分的麻烦</p>
<p>理想的解决方式是，在页面中引入一个<code v-pre>JS</code>入口文件，其余用到的模块可以通过代码控制，按需加载进来</p>
<p>除了模块加载的问题以外，还需要规定模块化的规范，如今流行的则是<code v-pre>CommonJS</code>、<code v-pre>ES Modules</code></p>
<h2 id="二、问题" tabindex="-1"><a class="header-anchor" href="#二、问题" aria-hidden="true">#</a> 二、问题</h2>
<p>从后端渲染的<code v-pre>JSP</code>、<code v-pre>PHP</code>，到前端原生<code v-pre>JavaScript</code>，再到<code v-pre>jQuery</code>开发，再到目前的三大框架<code v-pre>Vue</code>、<code v-pre>React</code>、<code v-pre>Angular</code></p>
<p>开发方式，也从<code v-pre>javascript</code>到后面的<code v-pre>es5</code>、<code v-pre>es6、7、8、9、10</code>，再到<code v-pre>typescript</code>，包括编写<code v-pre>CSS</code>的预处理器<code v-pre>less</code>、<code v-pre>scss</code>等</p>
<p>现代前端开发已经变得十分的复杂，所以我们开发过程中会遇到如下的问题：</p>
<ul>
<li>需要通过模块化的方式来开发</li>
<li>使用一些高级的特性来加快我们的开发效率或者安全性，比如通过 ES6+、TypeScript 开发脚本逻辑，通过 sass、less 等方式来编写 css 样式代码</li>
<li>监听文件的变化来并且反映到浏览器上，提高开发的效率</li>
<li>JavaScript 代码需要模块化，HTML 和 CSS 这些资源文件也会面临需要被模块化的问题</li>
<li>开发完成后我们还需要将代码进行压缩、合并以及其他相关的优化</li>
</ul>
<p>而<code v-pre>webpack</code>恰巧可以解决以上问题</p>
<h2 id="三、是什么" tabindex="-1"><a class="header-anchor" href="#三、是什么" aria-hidden="true">#</a> 三、是什么</h2>
<p><code v-pre>webpack</code> 是一个用于现代<code v-pre>JavaScript</code>应用程序的静态模块打包工具</p>
<ul>
<li>静态模块</li>
</ul>
<p>这里的静态模块指的是开发阶段，可以被 <code v-pre>webpack</code> 直接引用的资源（可以直接被获取打包进<code v-pre>bundle.js</code>的资源）</p>
<p>当 <code v-pre>webpack</code>处理应用程序时，它会在内部构建一个依赖图，此依赖图对应映射到项目所需的每个模块（不再局限<code v-pre>js</code>文件），并生成一个或多个 <code v-pre>bundle</code></p>
<p><img src="https://static.vue-js.com/9ce194a0-a578-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h4 id="webpack的能力" tabindex="-1"><a class="header-anchor" href="#webpack的能力" aria-hidden="true">#</a> <code v-pre>webpack</code>的能力：</h4>
<p><strong>编译代码能力</strong>，提高效率，解决浏览器兼容问题 <img src="https://static.vue-js.com/c5c2d360-a592-11eb-ab90-d9ae814b240d.png" alt=""> <strong>模块整合能力</strong>，提高性能，可维护性，解决浏览器频繁请求文件的问题 <img src="https://static.vue-js.com/d306d260-a592-11eb-ab90-d9ae814b240d.png" alt=""> <strong>万物皆可模块能力</strong>，项目维护性增强，支持不同种类的前端模块类型，统一的模块化方案，所有资源文件的加载都可以通过代码控制 <img src="https://static.vue-js.com/e3c5a040-a592-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://webpack.docschina.org/concepts/</li>
<li>https://zhuanlan.zhihu.com/p/267875652</li>
</ul>
</div></template>


