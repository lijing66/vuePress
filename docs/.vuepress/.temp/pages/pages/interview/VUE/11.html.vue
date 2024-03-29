<template><div><h1 id="vue组件通信方式" tabindex="-1"><a class="header-anchor" href="#vue组件通信方式" aria-hidden="true">#</a> Vue组件通信方式</h1>
<h2 id="vue组件通信方式-1" tabindex="-1"><a class="header-anchor" href="#vue组件通信方式-1" aria-hidden="true">#</a> Vue组件通信方式</h2>
<ol>
<li>
<p>父子通讯。父传子，在子组件的标签上通过自定义属性传递父组件的数据,子组件的内部通过 props 接收父向子传递的数据。子传父，在子组件的标签上自定义事件,自定义事件的值是父组件的方法,在子组件内部通过 this.$emit()方法触发事件，第一个参数为自定义事件,第二个参数可以传递子组件的内部数据,此时父组件中的方法就可以执行了。 还有<a href="http://fanyouf.gitee.io/interview/vue/26.html" target="_blank" rel="noopener noreferrer"><code v-pre>v-model</code>, <code v-pre>.sync</code><ExternalLinkIcon/></a> 等语法糖</p>
</li>
<li>
<p>兄弟组件通信: 可以采取 eventbus 实现数据传递。</p>
</li>
<li>
<p>跨组件层级组件通信</p>
</li>
</ol>
<ul>
<li>依赖注入。在祖先组件中通过 provide 提供数据,在后代组件中通过 inject 接收数据。</li>
<li>vuex。</li>
</ul>
<p>其他的还有： $ref, $root, $parent, $children 等引用,或者直接把信息绑定到 window 对象上。</p>
<h2 id="组件间通信的概念" tabindex="-1"><a class="header-anchor" href="#组件间通信的概念" aria-hidden="true">#</a> 组件间通信的概念</h2>
<p>开始之前，我们把<strong>组件间通信</strong>这个词进行拆分</p>
<ul>
<li>组件</li>
<li>通信</li>
</ul>
<p>都知道组件是<code v-pre>vue</code>最强大的功能之一，<code v-pre>vue</code>中每一个<code v-pre>.vue</code>我们都可以视之为一个组件通信指的是发送者通过某种媒体以某种格式来传递信息到收信者以达到某个目的。</p>
<p>广义上，任何信息的交通都是通信<strong>组件间通信</strong>即指组件(<code v-pre>.vue</code>)通过某种方式来传递信息以达到某个目的举个栗子我们在使用<code v-pre>UI</code>框架中的<code v-pre>table</code>组件，可能会往<code v-pre>table</code>组件中传入某些数据，这个本质就形成了组件之间的通信</p>
<h2 id="组件间通信解决了什么" tabindex="-1"><a class="header-anchor" href="#组件间通信解决了什么" aria-hidden="true">#</a> 组件间通信解决了什么</h2>
<p>在古代，人们通过驿站、飞鸽传书、烽火报警、符号、语言、眼神、触碰等方式进行信息传递，到了今天，随着科技水平的飞速发展，通信基本完全利用有线或无线电完成，相继出现了有线电话、固定电话、无线电话、手机、互联网甚至视频电话等各种通信方式从上面这段话，我们可以看到通信的本质是信息同步，共享回到<code v-pre>vue</code>中，每个组件之间的都有独自的作用域，组件间的数据是无法共享的但实际开发工作中我们常常需要让组件之间共享数据，这也是组件通信的目的要让它们互相之间能进行通讯，这样才能构成一个有机的完整系统</p>
<h2 id="组件间通信的分类" tabindex="-1"><a class="header-anchor" href="#组件间通信的分类" aria-hidden="true">#</a> 组件间通信的分类</h2>
<p>组件间通信的分类可以分成以下四类：</p>
<ol>
<li>父子组件之间的通信</li>
<li>兄弟组件之间的通信</li>
<li>祖孙与后代组件之间的通信</li>
<li>非关系组件间之间的通信</li>
</ol>
<p>关系图:</p>
<p><img src="http://fanyouf.gitee.io/interview/assets/img/85b92400-3aca-11eb-ab90-d9ae814b240d.0f480811.png" alt=""></p>
<h2 id="组件间通信的方案" tabindex="-1"><a class="header-anchor" href="#组件间通信的方案" aria-hidden="true">#</a> 组件间通信的方案</h2>
<p>整理<code v-pre>vue</code>中 8 种常规的通信方案</p>
<ol>
<li>父子
<ol>
<li>props +$emit</li>
<li>v-model</li>
<li>.sync</li>
<li>使用 ref</li>
</ol>
</li>
<li>兄弟
<ol>
<li>EventBus</li>
</ol>
</li>
<li>祖先后代
<ol>
<li><code v-pre>$parent</code> 或<code v-pre>$root</code></li>
<li>attrs 与 listeners</li>
<li>Provide 与 Inject</li>
</ol>
</li>
<li>Vuex</li>
</ol>
<h3 id="attrs-传递数据" tabindex="-1"><a class="header-anchor" href="#attrs-传递数据" aria-hidden="true">#</a> attrs 传递数据</h3>
<p>子组件：Com.vue，自己没有明确定义 props</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
子组件，
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>父组件： App.vue</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code># 通过自定义属性的方式传递给子组件
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Com</span> <span class="token attr-name">a</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>1</span> <span class="token attr-name">b</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>2</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Com</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，由于子组件内部没有明确定义 props 来接收，那么此时的 a,b 在子组件内部如何接收？ 可以通过 attrs 来接收（不是 props）</p>
<h3 id="props-传递数据" tabindex="-1"><a class="header-anchor" href="#props-传递数据" aria-hidden="true">#</a> props 传递数据</h3>
<p><img src="http://fanyouf.gitee.io/interview/assets/img/8f80a670-3aca-11eb-ab90-d9ae814b240d.aafc65de.png" alt=""></p>
<ul>
<li>适用场景：父组件传递数据给子组件</li>
<li>子组件设置<code v-pre>props</code>属性，定义接收父组件传递过来的参数</li>
<li>父组件在使用子组件标签中通过字面量来传递值</li>
</ul>
<p><code v-pre>Children.vue</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">props</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token comment">// 字符串形式</span>
 <span class="token literal-property property">name</span><span class="token operator">:</span>String <span class="token comment">// 接收的类型参数</span>
    <span class="token comment">// 对象形式</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token punctuation">{</span>  
        <span class="token literal-property property">type</span><span class="token operator">:</span>Number<span class="token punctuation">,</span> <span class="token comment">// 接收的类型为数值</span>
        <span class="token literal-property property">defaule</span><span class="token operator">:</span><span class="token number">18</span><span class="token punctuation">,</span>  <span class="token comment">// 默认值为18</span>
       <span class="token literal-property property">require</span><span class="token operator">:</span><span class="token boolean">true</span> <span class="token comment">// age属性必须传递</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Father.vue</code>组件</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Children</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>jack<span class="token punctuation">"</span></span> <span class="token attr-name">age</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>18</span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="emit-触发自定义事件" tabindex="-1"><a class="header-anchor" href="#emit-触发自定义事件" aria-hidden="true">#</a> $emit 触发自定义事件</h3>
<ul>
<li>适用场景：子组件传递数据给父组件</li>
<li>子组件通过<code v-pre>$emit触发</code>自定义事件，<code v-pre>$emit</code>第二个参数为传递的数值</li>
<li>父组件绑定监听器获取到子组件传递过来的参数</li>
</ul>
<p><code v-pre>Chilfen.vue</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">'add'</span><span class="token punctuation">,</span> good<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>Father.vue</code></p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Children</span> <span class="token attr-name">@add</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cartAdd($event)<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="ref" tabindex="-1"><a class="header-anchor" href="#ref" aria-hidden="true">#</a> ref</h3>
<ul>
<li>父组件在使用子组件的时候设置<code v-pre>ref</code></li>
<li>父组件通过设置子组件<code v-pre>ref</code>来获取数据</li>
</ul>
<p>父组件</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">;</span><span class="token operator">&lt;</span>Children ref<span class="token operator">=</span><span class="token string">'foo'</span> <span class="token operator">/</span><span class="token operator">></span>

<span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>foo <span class="token comment">// 获取子组件实例，通过子组件实例我们就能拿到对应的数据</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="eventbus" tabindex="-1"><a class="header-anchor" href="#eventbus" aria-hidden="true">#</a> EventBus</h3>
<ul>
<li>使用场景：兄弟组件传值</li>
<li>创建一个中央事件总线<code v-pre>EventBus</code></li>
<li>兄弟组件通过<code v-pre>$emit</code>触发自定义事件，<code v-pre>$emit</code>第二个参数为传递的数值</li>
<li>另一个兄弟组件通过<code v-pre>$on</code>监听自定义事件</li>
</ul>
<p><code v-pre>Bus.js</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 创建一个中央时间总线类</span>
<span class="token keyword">class</span> <span class="token class-name">Bus</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 存放事件的名字</span>
  <span class="token punctuation">}</span>
  <span class="token function">$on</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">$emit</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">cb</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">cb</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// main.js</span>
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$bus <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Bus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 将$bus挂载到vue实例的原型上</span>
<span class="token comment">// 另一种方式</span>
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$bus <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// Vue已经实现了Bus的功能</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Children1.vue</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>$bus<span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>Children2.vue</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>$bus<span class="token punctuation">.</span><span class="token function">$on</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handle<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="parent-或-root" tabindex="-1"><a class="header-anchor" href="#parent-或-root" aria-hidden="true">#</a> $parent 或$ root</h3>
<p>通过共同祖辈<code v-pre>$parent</code>或者<code v-pre>$root</code>搭建通信桥连</p>
<p>兄弟组件</p>
<p><code v-pre>this.$parent.on('add',this.add)</code></p>
<p>另一个兄弟组件</p>
<p><code v-pre>this.$parent.emit('add')</code></p>
<h3 id="attrs-与-listeners" tabindex="-1"><a class="header-anchor" href="#attrs-与-listeners" aria-hidden="true">#</a> $attrs 与 $listeners</h3>
<ul>
<li>适用场景：祖先传递数据给子孙</li>
<li>设置批量向下传属性<code v-pre>$attrs</code>和 <code v-pre>$listeners</code></li>
<li>包含了父级作用域中不作为 <code v-pre>prop</code> 被识别 (且获取) 的特性绑定 ( class 和 style 除外)。</li>
<li>可以通过 <code v-pre>v-bind=&quot;$attrs&quot;</code> 传⼊内部组件</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// child：并未在props中声明foo</span>
<span class="token operator">&lt;</span>p<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span>$attrs<span class="token punctuation">.</span>foo<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>

<span class="token comment">// parent</span>
<span class="token operator">&lt;</span>HelloWorld foo<span class="token operator">=</span><span class="token string">"foo"</span><span class="token operator">/</span><span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 给Grandson隔代传值，communication/index.vue</span>
<span class="token operator">&lt;</span>Child2 msg<span class="token operator">=</span><span class="token string">"lalala"</span> @some<span class="token operator">-</span>event<span class="token operator">=</span><span class="token string">"onSomeEvent"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>Child2<span class="token operator">></span>

<span class="token comment">// Child2做展开</span>
<span class="token operator">&lt;</span>Grandson v<span class="token operator">-</span>bind<span class="token operator">=</span><span class="token string">"$attrs"</span> v<span class="token operator">-</span>on<span class="token operator">=</span><span class="token string">"$listeners"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>Grandson<span class="token operator">></span>

<span class="token comment">// Grandson使⽤</span>
<span class="token operator">&lt;</span>div @click<span class="token operator">=</span><span class="token string">"$emit('some-event', 'msg from grandson')"</span><span class="token operator">></span>
<span class="token punctuation">{</span><span class="token punctuation">{</span>msg<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="provide-与-inject" tabindex="-1"><a class="header-anchor" href="#provide-与-inject" aria-hidden="true">#</a> provide 与 inject</h3>
<ul>
<li>在祖先组件定义<code v-pre>provide</code>属性，返回传递的值</li>
<li>在后代组件通过<code v-pre>inject</code>接收组件传递过来的值</li>
</ul>
<p>祖先组件</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">provide</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">foo</span><span class="token operator">:</span><span class="token string">'foo'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后代组件</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">inject</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'foo'</span><span class="token punctuation">]</span> <span class="token comment">// 获取到祖先组件传递过来的值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="vuex" tabindex="-1"><a class="header-anchor" href="#vuex" aria-hidden="true">#</a> <code v-pre>vuex</code></h3>
<ul>
<li>
<p>适用场景: 复杂关系的组件数据传递</p>
</li>
<li>
<p><code v-pre>Vuex</code>作用相当于一个用来存储共享变量的容器 <img src="http://fanyouf.gitee.io/interview/assets/img/fa207cd0-3aca-11eb-ab90-d9ae814b240d.b3f994c7.png" alt=""></p>
</li>
<li>
<p><code v-pre>state</code>用来存放共享变量的地方</p>
</li>
<li>
<p><code v-pre>getter</code>，可以增加一个<code v-pre>getter</code>派生状态，(相当于<code v-pre>store</code>中的计算属性），用来获得共享变量的值</p>
</li>
<li>
<p><code v-pre>mutations</code>用来存放修改<code v-pre>state</code>的方法。</p>
</li>
<li>
<p><code v-pre>actions</code>也是用来存放修改 state 的方法，不过<code v-pre>action</code>是在<code v-pre>mutations</code>的基础上进行。常用来做一些异步操作</p>
</li>
</ul>
<h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3>
<ul>
<li>父子关系的组件数据传递选择 <code v-pre>props</code> 与 <code v-pre>$emit</code>进行传递，也可选择<code v-pre>ref</code></li>
<li>兄弟关系的组件数据传递可选择<code v-pre>$bus</code>，其次可以选择<code v-pre>$parent</code>进行传递</li>
<li>祖先与后代组件数据传递可选择<code v-pre>attrs</code>与<code v-pre>listeners</code>或者 <code v-pre>Provide</code>与 <code v-pre>Inject</code></li>
<li>复杂关系的组件数据传递可以通过<code v-pre>vuex</code>存放共享的变量</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://juejin.cn/post/6844903990052782094#heading-0</li>
<li>https://zh.wikipedia.org/wiki/%E9%80%9A%E4%BF%A1</li>
<li>https://vue3js.cn/docs/zh</li>
<li>https://www.jianshu.com/p/28707cf08d70</li>
</ul>
</div></template>


