<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-15 23:10:47
 * @LastEditors: lijing
 * @LastEditTime: 2024-01-13 17:22:50
 * @Description: 
-->
<h1 id="说说-real-dom和-virtual-dom-的区别-优缺点" tabindex="-1"><a class="header-anchor" href="#说说-real-dom和-virtual-dom-的区别-优缺点" aria-hidden="true">#</a> 说说 Real DOM和 Virtual DOM 的区别？优缺点？</h1>
<p><img src="https://static.vue-js.com/f1d36350-d302-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>Real DOM，真实<code v-pre>DOM</code>， 意思为文档对象模型，是一个结构化文本的抽象，在页面渲染出的每一个结点都是一个真实<code v-pre>DOM</code>结构，如下：</p>
<p><img src="https://static.vue-js.com/fc7ba8d0-d302-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p><code v-pre>Virtual Dom</code>，本质上是以 <code v-pre>JavaScript</code> 对象形式存在的对 <code v-pre>DOM</code> 的描述</p>
<p>创建虚拟<code v-pre>DOM</code>目的就是为了更好将虚拟的节点渲染到页面视图中，虚拟<code v-pre>DOM</code>对象的节点与真实<code v-pre>DOM</code>的属性一一照应</p>
<p>在<code v-pre>React</code>中，<code v-pre>JSX</code>是其一大特性，可以让你在<code v-pre>JS</code>中通过使用<code v-pre>XML</code>的方式去直接声明界面的<code v-pre>DOM</code>结构</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> vDom <span class="token operator">=</span> <span class="token operator">&lt;</span>h1<span class="token operator">></span>Hello World<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span> <span class="token comment">// 创建h1标签，右边千万不能加引号</span>
<span class="token keyword">const</span> root <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'root'</span><span class="token punctuation">)</span> <span class="token comment">// 找到&lt;div id="root">&lt;/div>节点</span>
ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>vDom<span class="token punctuation">,</span> root<span class="token punctuation">)</span> <span class="token comment">// 把创建的h1标签渲染到root节点上</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述中，<code v-pre>ReactDOM.render()</code>用于将你创建好的虚拟<code v-pre>DOM</code>节点插入到某个真实节点上，并渲染到页面上</p>
<p><code v-pre>JSX</code>实际是一种语法糖，在使用过程中会被<code v-pre>babel</code>进行编译转化成<code v-pre>JS</code>代码，上述<code v-pre>VDOM</code>转化为如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> vDom <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>
  <span class="token string">'h1'</span>， 
  <span class="token punctuation">{</span> <span class="token literal-property property">className</span><span class="token operator">:</span> <span class="token string">'hClass'</span><span class="token punctuation">,</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'hId'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string">'hello world'</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，<code v-pre>JSX</code>就是为了简化直接调用<code v-pre>React.createElement()</code> 方法：</p>
<ul>
<li>
<p>第一个参数是标签名，例如h1、span、table...</p>
</li>
<li>
<p>第二个参数是个对象，里面存着标签的一些属性，例如id、class等</p>
<p>第三个参数是节点中的文本</p>
</li>
</ul>
<p>通过<code v-pre>console.log(VDOM)</code>，则能够得到虚拟<code v-pre>VDOM</code>消息</p>
<p><img src="https://static.vue-js.com/1716b9a0-d303-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>所以可以得到，<code v-pre>JSX</code>通过<code v-pre>babel</code>的方式转化成<code v-pre>React.createElement</code>执行，返回值是一个对象，也就是虚拟<code v-pre>DOM</code></p>
<h2 id="二、区别" tabindex="-1"><a class="header-anchor" href="#二、区别" aria-hidden="true">#</a> 二、区别</h2>
<p>两者的区别如下：</p>
<ul>
<li>虚拟DOM不会进行排版与重绘操作，而真实DOM会频繁重排与重绘</li>
<li>虚拟DOM的总损耗是“虚拟DOM增删改+真实DOM差异增删改+排版与重绘”，真实DOM的总损耗是“真实DOM完全增删改+排版与重绘”</li>
</ul>
<p>拿<a href="https://mp.weixin.qq.com/s?__biz=MzU1OTgxNDQ1Nw==&amp;mid=2247484516&amp;idx=1&amp;sn=965a4ce32bf93adb9ed112922c5cb8f5&amp;chksm=fc10c632cb674f2484fdf914d76fba55afcefca3b5adcbe6cf4b0c7fd36e29d0292e8cefceb5&amp;scene=178&amp;cur_album_id=1711105826272116736#rd" target="_blank" rel="noopener noreferrer">以前文章 (opens new window)<ExternalLinkIcon/></a>举过的例子：</p>
<p>传统的原生<code v-pre>api</code>或<code v-pre>jQuery</code>去操作<code v-pre>DOM</code>时，浏览器会从构建<code v-pre>DOM</code>树开始从头到尾执行一遍流程</p>
<p>当你在一次操作时，需要更新10个<code v-pre>DOM</code>节点，浏览器没这么智能，收到第一个更新<code v-pre>DOM</code>请求后，并不知道后续还有9次更新操作，因此会马上执行流程，最终执行10次流程</p>
<p>而通过<code v-pre>VNode</code>，同样更新10个<code v-pre>DOM</code>节点，虚拟<code v-pre>DOM</code>不会立即操作<code v-pre>DOM</code>，而是将这10次更新的<code v-pre>diff</code>内容保存到本地的一个<code v-pre>js</code>对象中，最终将这个<code v-pre>js</code>对象一次性<code v-pre>attach</code>到<code v-pre>DOM</code>树上，避免大量的无谓计算</p>
<h2 id="三、优缺点" tabindex="-1"><a class="header-anchor" href="#三、优缺点" aria-hidden="true">#</a> 三、优缺点</h2>
<p>真实<code v-pre>DOM</code>的优势：</p>
<ul>
<li>易用</li>
</ul>
<p>缺点：</p>
<ul>
<li>效率低，解析速度慢，内存占用量过高</li>
<li>性能差：频繁操作真实DOM，易于导致重绘与回流</li>
</ul>
<p>使用虚拟<code v-pre>DOM</code>的优势如下：</p>
<ul>
<li>
<p>简单方便：如果使用手动操作真实<code v-pre>DOM</code>来完成页面，繁琐又容易出错，在大规模应用下维护起来也很困难</p>
</li>
<li>
<p>性能方面：使用Virtual DOM，能够有效避免真实DOM数频繁更新，减少多次引起重绘与回流，提高性能</p>
</li>
<li>
<p>跨平台：React借助虚拟DOM， 带来了跨平台的能力，一套代码多端运行</p>
</li>
</ul>
<p>缺点：</p>
<ul>
<li>在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化</li>
<li>首次渲染大量DOM时，由于多了一层虚拟DOM的计算，速度比正常稍慢</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://juejin.cn/post/6844904052971536391</li>
<li>https://www.html.cn/qa/other/22832.html</li>
</ul>
</div></template>


