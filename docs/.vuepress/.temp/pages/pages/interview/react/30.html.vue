<template><div><h1 id="说说-react-性能优化的手段有哪些" tabindex="-1"><a class="header-anchor" href="#说说-react-性能优化的手段有哪些" aria-hidden="true">#</a> 说说 React 性能优化的手段有哪些？</h1>
<ul>
<li>react dev tools</li>
<li>profile 时间</li>
<li>chrome dev -&gt; performance</li>
</ul>
<h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h2>
<p>把不变和变的分离 例如：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>组件<span class="token number">1</span><span class="token operator">></span>
   <span class="token operator">&lt;</span>input value<span class="token operator">=</span><span class="token punctuation">{</span>val<span class="token punctuation">}</span> onChange<span class="token operator">=</span><span class="token punctuation">{</span>onChange<span class="token punctuation">}</span><span class="token operator">></span>
   <span class="token operator">&lt;</span>组件<span class="token number">2</span> <span class="token operator">/</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>组件<span class="token number">1</span><span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>组件2是会拖慢性能的</li>
<li>在组件1内部，变化的内容在input部分，不是在组件2内</li>
</ul>
<p>改进 把变化的拿走</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>组件<span class="token number">1</span><span class="token operator">></span>
   <span class="token operator">&lt;</span>input组件 <span class="token operator">/</span><span class="token operator">></span>
   <span class="token operator">&lt;</span>组件<span class="token number">2</span> <span class="token operator">/</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>组件<span class="token number">1</span><span class="token operator">></span>

<span class="token comment">// 新创建一个组件</span>
<span class="token operator">&lt;</span>input组件<span class="token operator">></span>、
<span class="token operator">&lt;</span>input value<span class="token operator">=</span><span class="token punctuation">{</span>val<span class="token punctuation">}</span> onChange<span class="token operator">=</span><span class="token punctuation">{</span>onChange<span class="token punctuation">}</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>input组件<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://static.vue-js.com/a9e83b00-f270-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><code v-pre>React</code>凭借<code v-pre>virtual DOM</code>和<code v-pre>diff</code>算法拥有高效的性能，但是某些情况下，性能明显可以进一步提高</p>
<p>在前面文章中，我们了解到类组件通过调用<code v-pre>setState</code>方法， 就会导致<code v-pre>render</code>，父组件一旦发生<code v-pre>render</code>渲染，子组件一定也会执行<code v-pre>render</code>渲染</p>
<p>当我们想要更新一个子组件的时候，如下图绿色部分：</p>
<p><img src="https://static.vue-js.com/b41f6f30-f270-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>理想状态只调用该路径下的组件<code v-pre>render</code>：</p>
<p><img src="https://static.vue-js.com/bc0f2460-f270-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>但是<code v-pre>react</code>的默认做法是调用所有组件的<code v-pre>render</code>，再对生成的虚拟<code v-pre>DOM</code>进行对比（黄色部分），如不变则不进行更新</p>
<p><img src="https://static.vue-js.com/c2f0c4f0-f270-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>从上图可见，黄色部分<code v-pre>diff</code>算法对比是明显的性能浪费的情况</p>
<h2 id="二、如何做" tabindex="-1"><a class="header-anchor" href="#二、如何做" aria-hidden="true">#</a> 二、如何做</h2>
<p>在<a href="https://mp.weixin.qq.com/s/h4NX4Plr6TCjoIhlawiJTg" target="_blank" rel="noopener noreferrer">React中如何避免不必要的render (opens new window)<ExternalLinkIcon/></a>中，我们了解到如何避免不必要的<code v-pre>render</code>来应付上面的问题，主要手段是通过<code v-pre>shouldComponentUpdate</code>、<code v-pre>PureComponent</code>、<code v-pre>React.memo</code>，这三种形式这里就不再复述</p>
<p>除此之外， 常见性能优化常见的手段有如下：</p>
<ul>
<li>
<p>避免使用内联函数</p>
</li>
<li>
<p>使用 React Fragments 避免额外标记</p>
</li>
<li>
<p>使用 Immutable</p>
</li>
<li>
<p>懒加载组件</p>
</li>
<li>
<p>事件绑定方式</p>
</li>
<li>
<p>服务端渲染</p>
</li>
</ul>
<h4 id="避免使用内联函数" tabindex="-1"><a class="header-anchor" href="#避免使用内联函数" aria-hidden="true">#</a> 避免使用内联函数</h4>
<p>如果我们使用内联函数，则每次调用<code v-pre>render</code>函数时都会创建一个新的函数实例，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">InlineFunctionComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>div<span class="token operator">></span>
        <span class="token operator">&lt;</span>h1<span class="token operator">></span>Welcome Guest<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
        <span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string">"button"</span> onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">inputValue</span><span class="token operator">:</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">}</span> value<span class="token operator">=</span><span class="token string">"Click For Inline Function"</span> <span class="token operator">/</span><span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该在组件内部创建一个函数，并将事件绑定到该函数本身。这样每次调用 <code v-pre>render</code> 时就不会创建单独的函数实例，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">InlineFunctionComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  
  <span class="token function-variable function">setNewStateData</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">inputValue</span><span class="token operator">:</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>div<span class="token operator">></span>
        <span class="token operator">&lt;</span>h1<span class="token operator">></span>Welcome Guest<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
        <span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string">"button"</span> onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>setNewStateData<span class="token punctuation">}</span> value<span class="token operator">=</span><span class="token string">"Click For Inline Function"</span> <span class="token operator">/</span><span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用-react-fragments-避免额外标记" tabindex="-1"><a class="header-anchor" href="#使用-react-fragments-避免额外标记" aria-hidden="true">#</a> 使用 React Fragments 避免额外标记</h4>
<p>用户创建新组件时，每个组件应具有单个父标签。父级不能有两个标签，所以顶部要有一个公共标签，所以我们经常在组件顶部添加额外标签<code v-pre>div</code></p>
<p>这个额外标签除了充当父标签之外，并没有其他作用，这时候则可以使用<code v-pre>fragement</code></p>
<p>其不会向组件引入任何额外标记，但它可以作为父级标签的作用，如下所示：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">NestedRoutingComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>
            <span class="token operator">&lt;</span><span class="token operator">></span>
                <span class="token operator">&lt;</span>h1<span class="token operator">></span>This is the Header Component<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
                <span class="token operator">&lt;</span>h2<span class="token operator">></span>Welcome To Demo Page<span class="token operator">&lt;</span><span class="token operator">/</span>h2<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span><span class="token operator">></span>
        <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="事件绑定方式" tabindex="-1"><a class="header-anchor" href="#事件绑定方式" aria-hidden="true">#</a> 事件绑定方式</h3>
<p>在<a href="https://mp.weixin.qq.com/s/VfQ34ZEPXUXsimzMaJ_41A" target="_blank" rel="noopener noreferrer">事件绑定方式 (opens new window)<ExternalLinkIcon/></a>中，我们了解到四种事假绑定的方式</p>
<p>从性能方面考虑，在<code v-pre>render</code>方法中使用<code v-pre>bind</code>和<code v-pre>render</code>方法中使用箭头函数这两种形式在每次组件<code v-pre>render</code>的时候都会生成新的方法实例，性能欠缺</p>
<p>而<code v-pre>constructor</code>中<code v-pre>bind</code>事件与定义阶段使用箭头函数绑定这两种形式只会生成一个方法实例，性能方面会有所改善</p>
<h3 id="使用-immutable" tabindex="-1"><a class="header-anchor" href="#使用-immutable" aria-hidden="true">#</a> 使用 Immutable</h3>
<p>在<a href="https://mp.weixin.qq.com/s/laYJ_KNa8M5JNBnIolMDAA" target="_blank" rel="noopener noreferrer">理解Immutable中 (opens new window)<ExternalLinkIcon/></a>，我们了解到使用 <code v-pre>Immutable</code>可以给 <code v-pre>React</code> 应用带来性能的优化，主要体现在减少渲染的次数</p>
<p>在做<code v-pre>react</code>性能优化的时候，为了避免重复渲染，我们会在<code v-pre>shouldComponentUpdate()</code>中做对比，当返回<code v-pre>true</code>执行<code v-pre>render</code>方法</p>
<p><code v-pre>Immutable</code>通过<code v-pre>is</code>方法则可以完成对比，而无需像一样通过深度比较的方式比较</p>
<h3 id="懒加载组件" tabindex="-1"><a class="header-anchor" href="#懒加载组件" aria-hidden="true">#</a> 懒加载组件</h3>
<p>从工程方面考虑，<code v-pre>webpack</code>存在代码拆分能力，可以为应用创建多个包，并在运行时动态加载，减少初始包的大小</p>
<p>而在<code v-pre>react</code>中使用到了<code v-pre>Suspense</code>和 <code v-pre>lazy</code>组件实现代码拆分功能，基本使用如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> johanComponent <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">lazy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/* webpackChunkName: "johanComponent" */</span> <span class="token string">'./myAwesome.component'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">johanAsyncComponent</span> <span class="token operator">=</span> <span class="token parameter">props</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>React<span class="token punctuation">.</span>Suspense fallback<span class="token operator">=</span><span class="token punctuation">{</span><span class="token operator">&lt;</span>Spinner <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">}</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>johanComponent <span class="token punctuation">{</span><span class="token operator">...</span>props<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>React<span class="token punctuation">.</span>Suspense<span class="token operator">></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="服务端渲染" tabindex="-1"><a class="header-anchor" href="#服务端渲染" aria-hidden="true">#</a> 服务端渲染</h3>
<p>采用服务端渲染端方式，可以使用户更快的看到渲染完成的页面</p>
<p>服务端渲染，需要起一个<code v-pre>node</code>服务，可以使用<code v-pre>express</code>、<code v-pre>koa</code>等，调用<code v-pre>react</code>的<code v-pre>renderToString</code>方法，将根组件渲染成字符串，再输出到响应中</p>
<p>例如：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> renderToString <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-dom/server"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> MyPage <span class="token keyword">from</span> <span class="token string">"./MyPage"</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">"&lt;!DOCTYPE html>&lt;html>&lt;head>&lt;title>My Page&lt;/title>&lt;/head>&lt;body>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">"&lt;div id='content'>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  res<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token function">renderToString</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>MyPage<span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">"&lt;/div>&lt;/body>&lt;/html>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>客户端使用render方法来生成HTML</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">'react-dom'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> MyPage <span class="token keyword">from</span> <span class="token string">"./MyPage"</span><span class="token punctuation">;</span>
ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>MyPage <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'app'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h3>
<p>除此之外，还存在的优化手段有组件拆分、合理使用<code v-pre>hooks</code>等性能优化手段...</p>
<h3 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h3>
<p>通过上面初步学习，我们了解到<code v-pre>react</code>常见的性能优化可以分成三个层面：</p>
<ul>
<li>代码层面</li>
<li>工程层面</li>
<li>框架机制层面</li>
</ul>
<p>通过这三个层面的优化结合，能够使基于<code v-pre>react</code>项目的性能更上一层楼</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zhuanlan.zhihu.com/p/108666350</li>
<li>https://segmentfault.com/a/1190000007811296</li>
</ul>
</div></template>


