<template><div><h1 id="react生命周期" tabindex="-1"><a class="header-anchor" href="#react生命周期" aria-hidden="true">#</a> React生命周期</h1>
<h2 id="react生命周期是什么" tabindex="-1"><a class="header-anchor" href="#react生命周期是什么" aria-hidden="true">#</a> React生命周期是什么</h2>
<p>生命周期<code v-pre>（Life Cycle）</code>的概念应用很广泛，特别是在经济、环境、技术、社会等诸多领域经常出现，其基本涵义可以通俗地理解为“从摇篮到坟墓”<code v-pre>（Cradle-to-Grave）</code>的整个过程</p>
<p>跟<code v-pre>Vue</code>一样，<code v-pre>React</code>整个组件生命周期包括从创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程</p>
<h2 id="二、流程" tabindex="-1"><a class="header-anchor" href="#二、流程" aria-hidden="true">#</a> 二、流程</h2>
<p>这里主要讲述<code v-pre>react16.4</code>之后的生命周期，可以分成三个阶段：</p>
<ul>
<li>创建阶段</li>
<li>更新阶段</li>
<li>卸载阶段</li>
</ul>
<h3 id="创建阶段" tabindex="-1"><a class="header-anchor" href="#创建阶段" aria-hidden="true">#</a> 创建阶段</h3>
<p>创建阶段主要分成了以下几个生命周期方法：</p>
<ul>
<li>constructor</li>
<li>getDerivedStateFromProps</li>
<li>render</li>
<li>componentDidMount</li>
</ul>
<h4 id="constructor" tabindex="-1"><a class="header-anchor" href="#constructor" aria-hidden="true">#</a> constructor</h4>
<p>实例过程中自动调用的方法，在方法内部通过<code v-pre>super</code>关键字获取来自父组件的<code v-pre>props</code></p>
<p>在该方法中，通常的操作为初始化<code v-pre>state</code>状态或者在<code v-pre>this</code>上挂载方法</p>
<h3 id="getderivedstatefromprops" tabindex="-1"><a class="header-anchor" href="#getderivedstatefromprops" aria-hidden="true">#</a> getDerivedStateFromProps</h3>
<p>该方法是新增的生命周期方法，是一个静态的方法，因此不能访问到组件的实例</p>
<p>执行时机：组件创建和更新阶段，不论是<code v-pre>props</code>变化还是<code v-pre>state</code>变化，也会调用</p>
<p>在每次<code v-pre>render</code>方法前调用，第一个参数为即将更新的<code v-pre>props</code>，第二个参数为上一个状态的<code v-pre>state</code>，可以比较<code v-pre>props</code> 和 <code v-pre>state</code>来加一些限制条件，防止无用的state更新</p>
<p>该方法需要返回一个新的对象作为新的<code v-pre>state</code>或者返回<code v-pre>null</code>表示<code v-pre>state</code>状态不需要更新</p>
<h3 id="render" tabindex="-1"><a class="header-anchor" href="#render" aria-hidden="true">#</a> render</h3>
<p>类组件必须实现的方法，用于渲染<code v-pre>DOM</code>结构，可以访问组件<code v-pre>state</code>与<code v-pre>prop</code>属性</p>
<p>注意： 不要在 <code v-pre>render</code> 里面 <code v-pre>setState</code>, 否则会触发死循环导致内存崩溃</p>
<h3 id="componentdidmount" tabindex="-1"><a class="header-anchor" href="#componentdidmount" aria-hidden="true">#</a> componentDidMount</h3>
<p>组件挂载到真实<code v-pre>DOM</code>节点后执行，其在<code v-pre>render</code>方法之后执行</p>
<p>此方法多用于执行一些数据获取，事件监听等操作</p>
<h3 id="更新阶段" tabindex="-1"><a class="header-anchor" href="#更新阶段" aria-hidden="true">#</a> 更新阶段</h3>
<p>该阶段的函数主要为如下方法：</p>
<ul>
<li>getDerivedStateFromProps</li>
<li>shouldComponentUpdate</li>
<li>render</li>
<li>getSnapshotBeforeUpdate</li>
<li>componentDidUpdate</li>
</ul>
<h3 id="getderivedstatefromprops-1" tabindex="-1"><a class="header-anchor" href="#getderivedstatefromprops-1" aria-hidden="true">#</a> getDerivedStateFromProps</h3>
<p>该方法介绍同上</p>
<h2 id="shouldcomponentupdate" tabindex="-1"><a class="header-anchor" href="#shouldcomponentupdate" aria-hidden="true">#</a> shouldComponentUpdate</h2>
<p>用于告知组件本身基于当前的<code v-pre>props</code>和<code v-pre>state</code>是否需要重新渲染组件，默认情况返回<code v-pre>true</code></p>
<p>执行时机：到新的props或者state时都会调用，通过返回true或者false告知组件更新与否</p>
<p>一般情况，不建议在该周期方法中进行深层比较，会影响效率</p>
<p>同时也不能调用<code v-pre>setState</code>，否则会导致无限循环调用更新</p>
<h3 id="render-1" tabindex="-1"><a class="header-anchor" href="#render-1" aria-hidden="true">#</a> render</h3>
<p>介绍如上</p>
<h3 id="getsnapshotbeforeupdate" tabindex="-1"><a class="header-anchor" href="#getsnapshotbeforeupdate" aria-hidden="true">#</a> getSnapshotBeforeUpdate</h3>
<p>该周期函数在<code v-pre>render</code>后执行，执行之时<code v-pre>DOM</code>元素还没有被更新</p>
<p>该方法返回的一个<code v-pre>Snapshot</code>值，作为<code v-pre>componentDidUpdate</code>第三个参数传入</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">getSnapshotBeforeUpdate</span><span class="token punctuation">(</span><span class="token parameter">prevProps<span class="token punctuation">,</span> prevState</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'#enter getSnapshotBeforeUpdate'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token string">'foo'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">componentDidUpdate</span><span class="token punctuation">(</span><span class="token parameter">prevProps<span class="token punctuation">,</span> prevState<span class="token punctuation">,</span> snapshot</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'#enter componentDidUpdate snapshot = '</span><span class="token punctuation">,</span> snapshot<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此方法的目的在于获取组件更新前的一些信息，比如组件的滚动位置之类的，在组件更新后可以根据这些信息恢复一些UI视觉上的状态</p>
<h3 id="componentdidupdate" tabindex="-1"><a class="header-anchor" href="#componentdidupdate" aria-hidden="true">#</a> componentDidUpdate</h3>
<p>执行时机：组件更新结束后触发</p>
<p>在该方法中，可以根据前后的<code v-pre>props</code>和<code v-pre>state</code>的变化做相应的操作，如获取数据，修改<code v-pre>DOM</code>样式等</p>
<h3 id="卸载阶段" tabindex="-1"><a class="header-anchor" href="#卸载阶段" aria-hidden="true">#</a> 卸载阶段</h3>
<h2 id="componentwillunmount" tabindex="-1"><a class="header-anchor" href="#componentwillunmount" aria-hidden="true">#</a> componentWillUnmount</h2>
<p>此方法用于组件卸载前，清理一些注册是监听事件，或者取消订阅的网络请求等</p>
<p>一旦一个组件实例被卸载，其不会被再次挂载，而只可能是被重新创建</p>
<h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p>新版生命周期整体流程如下图所示：</p>
<p><img src="https://static.vue-js.com/66c999c0-d373-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>旧的生命周期流程图如下：</p>
<p><img src="https://static.vue-js.com/d379e420-d374-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>通过两个图的对比，可以发现新版的生命周期减少了以下三种方法：</p>
<ul>
<li>componentWillMount</li>
<li>componentWillReceiveProps</li>
<li>componentWillUpdate</li>
</ul>
<p>其实这三个方法仍然存在，只是在前者加上了<code v-pre>UNSAFE_</code>前缀，如<code v-pre>UNSAFE_componentWillMount</code>，并不像字面意思那样表示不安全，而是表示这些生命周期的代码可能在未来的 <code v-pre>react</code>版本可能废除</p>
<p>同时也新增了两个生命周期函数：</p>
<ul>
<li>getDerivedStateFromProps</li>
<li>getSnapshotBeforeUpdate</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://github.com/pomelovico/keep/issues/23</li>
<li>https://segmentfault.com/a/1190000020268993</li>
</ul>
</div></template>


