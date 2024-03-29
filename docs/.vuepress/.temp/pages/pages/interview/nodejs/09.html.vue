<template><div><h1 id="说说-node-文件查找的优先级以及-require-方法的文件查找策略" tabindex="-1"><a class="header-anchor" href="#说说-node-文件查找的优先级以及-require-方法的文件查找策略" aria-hidden="true">#</a> 说说 Node 文件查找的优先级以及 Require 方法的文件查找策略?</h1>
<p><img src="https://static.vue-js.com/15913530-c9ba-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="一、模块规范" tabindex="-1"><a class="header-anchor" href="#一、模块规范" aria-hidden="true">#</a> 一、模块规范</h2>
<p><code v-pre>NodeJS</code>对<code v-pre>CommonJS</code>进行了支持和实现，让我们在开发<code v-pre>node</code>的过程中可以方便的进行模块化开发：</p>
<ul>
<li>在Node中每一个js文件都是一个单独的模块</li>
<li>模块中包括CommonJS规范的核心变量：exports、module.exports、require</li>
<li>通过上述变量进行模块化开发</li>
</ul>
<p>而模块化的核心是导出与导入，在<code v-pre>Node</code>中通过<code v-pre>exports</code>与<code v-pre>module.exports</code>负责对模块中的内容进行导出，通过<code v-pre>require</code>函数导入其他模块（自定义模块、系统模块、第三方库模块）中的内容</p>
<h2 id="二、查找策略" tabindex="-1"><a class="header-anchor" href="#二、查找策略" aria-hidden="true">#</a> 二、查找策略</h2>
<p><code v-pre>require</code>方法接收一下几种参数的传递：</p>
<ul>
<li>原生模块：http、fs、path等</li>
<li>相对路径的文件模块：./mod或../mod</li>
<li>绝对路径的文件模块：/pathtomodule/mod</li>
<li>目录作为模块：./dirname</li>
<li>非原生模块的文件模块：mod</li>
</ul>
<p><code v-pre>require</code>参数较为简单，但是内部的加载却是十分复杂的，其加载优先级也各自不同，如下图：</p>
<p><img src="https://static.vue-js.com/33ae8ef0-c9ba-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>从上图可以看见，文件模块存在缓存区，寻找模块路径的时候都会优先从缓存中加载已经存在的模块</p>
<h3 id="原生模块" tabindex="-1"><a class="header-anchor" href="#原生模块" aria-hidden="true">#</a> 原生模块</h3>
<p>而像原生模块这些，通过<code v-pre>require</code>方法在解析文件名之后，优先检查模块是否在原生模块列表中，如果在则从原生模块中加载</p>
<h3 id="绝对路径、相对路径" tabindex="-1"><a class="header-anchor" href="#绝对路径、相对路径" aria-hidden="true">#</a> 绝对路径、相对路径</h3>
<p>如果<code v-pre>require</code>绝对路径的文件，则直接查找对应的路径，速度最快</p>
<p>相对路径的模块则相对于当前调用<code v-pre>require</code>的文件去查找</p>
<p>如果按确切的文件名没有找到模块，则 <code v-pre>NodeJs</code> 会尝试带上 <code v-pre>.js</code>、<code v-pre>.json</code>或 <code v-pre>.node</code>拓展名再加载</p>
<h3 id="目录作为模块" tabindex="-1"><a class="header-anchor" href="#目录作为模块" aria-hidden="true">#</a> 目录作为模块</h3>
<p>默认情况是根据根目录中<code v-pre>package.json</code>文件的<code v-pre>main</code>来指定目录模块，如：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span> <span class="token string-property property">"name"</span> <span class="token operator">:</span> <span class="token string">"some-library"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"main"</span> <span class="token operator">:</span> <span class="token string">"main.js"</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果这是在<code v-pre>./some-library node_modules</code>目录中，则 <code v-pre>require('./some-library')</code> 会试图加载 <code v-pre>./some-library/main.js</code></p>
<p>如果目录里没有 <code v-pre>package.json</code>文件，或者 <code v-pre>main</code>入口不存在或无法解析，则会试图加载目录下的 <code v-pre>index.js</code> 或 <code v-pre>index.node</code> 文件</p>
<h3 id="非原生模块" tabindex="-1"><a class="header-anchor" href="#非原生模块" aria-hidden="true">#</a> 非原生模块</h3>
<p>在每个文件中都存在<code v-pre>module.paths</code>，表示模块的搜索路径，<code v-pre>require</code>就是根据其来寻找文件</p>
<p>在<code v-pre>window</code>下输出如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span> <span class="token string">'c:\\nodejs\\node_modules'</span><span class="token punctuation">,</span>
<span class="token string">'c:\\node_modules'</span> <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出<code v-pre>module path</code>的生成规则为：从当前文件目录开始查找<code v-pre>node_modules</code>目录；然后依次进入父目录，查找父目录下的<code v-pre>node_modules</code>目录，依次迭代，直到根目录下的<code v-pre>node_modules</code>目录</p>
<p>当都找不到的时候，则会从系统<code v-pre>NODE_PATH</code>环境变量查找</p>
<h4 id="举个例子" tabindex="-1"><a class="header-anchor" href="#举个例子" aria-hidden="true">#</a> 举个例子：</h4>
<p>如果在<code v-pre>/home/ry/projects/foo.js</code>文件里调用了 <code v-pre>require('bar.js')</code>，则 Node.js 会按以下顺序查找：</p>
<ul>
<li>/home/ry/projects/node_modules/bar.js</li>
<li>/home/ry/node_modules/bar.js</li>
<li>/home/node_modules/bar.js</li>
<li>/node_modules/bar.js</li>
</ul>
<p>这使得程序本地化它们的依赖，避免它们产生冲突</p>
<h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p>通过上面模块的文件查找策略之后，总结下文件查找的优先级：</p>
<ul>
<li>
<p>缓存的模块优先级最高</p>
</li>
<li>
<p>如果是内置模块，则直接返回，优先级仅次缓存的模块</p>
</li>
<li>
<p>如果是绝对路径 / 开头，则从根目录找</p>
</li>
<li>
<p>如果是相对路径 ./开头，则从当前require文件相对位置找</p>
</li>
<li>
<p>如果文件没有携带后缀，先从js、json、node按顺序查找</p>
</li>
<li>
<p>如果是目录，则根据 package.json的main属性值决定目录下入口文件，默认情况为 index.js</p>
</li>
<li>
<p>如果文件为第三方模块，则会引入 node_modules 文件，如果不在当前仓库文件中，则自动从上级递归查找，直到根目录</p>
</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>http://nodejs.cn/api/modules.html#modules_file_modules</li>
<li>https://blog.csdn.net/qq_36801250/article/details/106352686</li>
<li>https://www.cnblogs.com/samve/p/10805908.html</li>
</ul>
</div></template>


