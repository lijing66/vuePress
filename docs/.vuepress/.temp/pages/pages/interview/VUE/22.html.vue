<template><div><h1 id="vue-常用的修饰符有哪些有什么应用场景" tabindex="-1"><a class="header-anchor" href="#vue-常用的修饰符有哪些有什么应用场景" aria-hidden="true">#</a> Vue 常用的修饰符有哪些有什么应用场景</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>在<code v-pre>Vue</code>中，修饰符处理了许多<code v-pre>DOM</code>事件的细节，让我们不再需要花大量的时间去处理这些烦恼的事情，而能有更多的精力专注于程序的逻辑处理</p>
<p><code v-pre>vue</code>中修饰符分为以下五种：</p>
<ol>
<li>表单修饰符. lazy，trim，number，</li>
<li>事件修饰符 .stop 相当于 event.stopPropagation()，用来阻止冒泡。.prevent 相当于 envet.preventDefault()，用来阻止默认事件。.native 监听组件根元素的原生事件。.once 只触发一次。</li>
<li>鼠标按键修饰符</li>
<li>键值修饰符 <code v-pre>@keyup.Enter=&quot;回调&quot;</code></li>
<li>v-bind 修饰符 .prop设置自定义标签属性，避免暴露数据，防止污染 HTML 结构</li>
</ol>
<h3 id="表单修饰符" tabindex="-1"><a class="header-anchor" href="#表单修饰符" aria-hidden="true">#</a> 表单修饰符</h3>
<p>在我们填写表单的时候用得最多的是<code v-pre>input</code>标签，指令用得最多的是<code v-pre>v-model</code></p>
<p>关于表单的修饰符有如下：</p>
<ul>
<li>lazy</li>
<li>trim</li>
<li>number</li>
</ul>
<h4 id="lazy" tabindex="-1"><a class="header-anchor" href="#lazy" aria-hidden="true">#</a> lazy</h4>
<p>在我们填完信息，光标离开标签的时候，才会将值赋予给<code v-pre>value</code>，也就是在<code v-pre>change</code>事件之后再进行信息同步</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">v-model.lazy</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>value<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>{{value}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="trim" tabindex="-1"><a class="header-anchor" href="#trim" aria-hidden="true">#</a> trim</h4>
<p>自动过滤用户输入的首空格字符，而中间的空格不会过滤</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">v-model.trim</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>value<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="number" tabindex="-1"><a class="header-anchor" href="#number" aria-hidden="true">#</a> number</h4>
<p>自动将用户的输入值转为数值类型，但如果这个值无法被<code v-pre>parseFloat</code>解析，则会返回原来的值</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">v-model.number</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>age<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>number<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="事件修饰符" tabindex="-1"><a class="header-anchor" href="#事件修饰符" aria-hidden="true">#</a> 事件修饰符</h3>
<p>事件修饰符是对事件捕获以及目标进行了处理，有如下修饰符：</p>
<ul>
<li>stop</li>
<li>prevent</li>
<li>self</li>
<li>once</li>
<li>capture</li>
<li>passive</li>
<li>native</li>
</ul>
<h4 id="stop" tabindex="-1"><a class="header-anchor" href="#stop" aria-hidden="true">#</a> stop</h4>
<p>阻止了事件冒泡，相当于调用了<code v-pre>event.stopPropagation</code>方法</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>shout(2)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click.stop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>shout(1)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>ok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
//只输出1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="prevent" tabindex="-1"><a class="header-anchor" href="#prevent" aria-hidden="true">#</a> prevent</h4>
<p>阻止了事件的默认行为，相当于调用了<code v-pre>event.preventDefault</code>方法</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name"><span class="token namespace">v-on:</span>submit.prevent</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>onSubmit<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="self" tabindex="-1"><a class="header-anchor" href="#self" aria-hidden="true">#</a> self</h4>
<p>只当在 <code v-pre>event.target</code> 是当前元素自身时触发处理函数</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name"><span class="token namespace">v-on:</span>click.self</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>doThat<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 <code v-pre>v-on:click.prevent.self</code> 会阻止<strong>所有的点击</strong>，而 <code v-pre>v-on:click.self.prevent</code> 只会阻止对元素自身的点击</p>
</blockquote>
<h4 id="once" tabindex="-1"><a class="header-anchor" href="#once" aria-hidden="true">#</a> once</h4>
<p>绑定了事件以后只能触发一次，第二次就不会触发</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click.once</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>shout(1)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>ok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="capture" tabindex="-1"><a class="header-anchor" href="#capture" aria-hidden="true">#</a> capture</h4>
<p>使事件触发从包含这个元素的顶层开始往下触发</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">@click.capture</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>shout(1)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    obj1
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">@click.capture</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>shout(2)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    obj2
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>shout(3)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    obj3
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>shout(4)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    obj4
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
// 输出结构: 1 2 4 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="passive" tabindex="-1"><a class="header-anchor" href="#passive" aria-hidden="true">#</a> passive</h4>
<p>在移动端，当我们在监听元素滚动事件的时候，会一直触发<code v-pre>onscroll</code>事件会让我们的网页变卡，因此我们使用这个修饰符的时候，相当于给<code v-pre>onscroll</code>事件整了一个<code v-pre>.lazy</code>修饰符</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 --></span>
<span class="token comment">&lt;!-- 而不会等待 `onScroll` 完成  --></span>
<span class="token comment">&lt;!-- 这其中包含 `event.preventDefault()` 的情况 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name"><span class="token namespace">v-on:</span>scroll.passive</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>onScroll<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>不要把 <code v-pre>.passive</code> 和 <code v-pre>.prevent</code> 一起使用,因为 <code v-pre>.prevent</code> 将会被忽略，同时浏览器可能会向你展示一个警告。</p>
<p><code v-pre>passive</code> 会告诉浏览器你不想阻止事件的默认行为</p>
</blockquote>
<h4 id="native" tabindex="-1"><a class="header-anchor" href="#native" aria-hidden="true">#</a> native</h4>
<p>让组件变成像<code v-pre>html</code>内置标签那样监听根元素的原生事件，否则组件上使用 <code v-pre>v-on</code> 只会监听自定义事件</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-component</span> <span class="token attr-name"><span class="token namespace">v-on:</span>click.native</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>doSomething<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-component</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>使用.native 修饰符来操作普通 HTML 标签是会令事件失效的</p>
</blockquote>
<h3 id="鼠标按键修饰符" tabindex="-1"><a class="header-anchor" href="#鼠标按键修饰符" aria-hidden="true">#</a> 鼠标按键修饰符</h3>
<p>鼠标按键修饰符针对的就是左键、右键、中键点击，有如下：</p>
<ul>
<li>left 左键点击</li>
<li>right 右键点击</li>
<li>middle 中键点击</li>
</ul>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click.left</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>shout(1)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>ok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click.right</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>shout(1)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>ok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click.middle</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>shout(1)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>ok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="键盘修饰符" tabindex="-1"><a class="header-anchor" href="#键盘修饰符" aria-hidden="true">#</a> 键盘修饰符</h3>
<p>键盘修饰符是用来修饰键盘事件（<code v-pre>onkeyup</code>，<code v-pre>onkeydown</code>）的，有如下：</p>
<p><code v-pre>keyCode</code>存在很多，但<code v-pre>vue</code>为我们提供了别名，分为以下两种：</p>
<ul>
<li>普通键（enter、tab、delete、space、esc、up...）</li>
<li>系统修饰键（ctrl、alt、meta、shift...）</li>
</ul>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code>// 只有按键为keyCode的时候才触发
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">@keyup.keyCode</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>shout()<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>还可以通过以下方式自定义一些全局的键盘码别名</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>keyCodes<span class="token punctuation">.</span>f2 <span class="token operator">=</span> <span class="token number">113</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="v-bind-修饰符" tabindex="-1"><a class="header-anchor" href="#v-bind-修饰符" aria-hidden="true">#</a> v-bind 修饰符</h3>
<p>v-bind 修饰符主要是为属性进行操作，用来分别有如下：</p>
<ul>
<li>async</li>
<li>prop</li>
<li>camel</li>
</ul>
<h4 id="async" tabindex="-1"><a class="header-anchor" href="#async" aria-hidden="true">#</a> async</h4>
<p>能对<code v-pre>props</code>进行一个双向绑定</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">//父组件</span>
<span class="token operator">&lt;</span>comp <span class="token operator">:</span>myMessage<span class="token punctuation">.</span>sync<span class="token operator">=</span><span class="token string">"bar"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>comp<span class="token operator">></span>
<span class="token comment">//子组件</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">'update:myMessage'</span><span class="token punctuation">,</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上这种方法相当于以下的简写</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">//父亲组件</span>
<span class="token operator">&lt;</span>comp <span class="token operator">:</span>myMessage<span class="token operator">=</span><span class="token string">"bar"</span> @update<span class="token operator">:</span>myMessage<span class="token operator">=</span><span class="token string">"func"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>comp<span class="token operator">></span>
<span class="token function">func</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
 <span class="token keyword">this</span><span class="token punctuation">.</span>bar <span class="token operator">=</span> e<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//子组件js</span>
<span class="token function">func2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">'update:myMessage'</span><span class="token punctuation">,</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code v-pre>async</code>需要注意以下两点：</p>
<ul>
<li>
<p>使用<code v-pre>sync</code>的时候，子组件传递的事件名格式必须为<code v-pre>update:value</code>，其中<code v-pre>value</code>必须与子组件中<code v-pre>props</code>中声明的名称完全一致</p>
</li>
<li>
<p>注意带有 <code v-pre>.sync</code> 修饰符的 <code v-pre>v-bind</code> 不能和表达式一起使用</p>
</li>
<li>
<p>将 <code v-pre>v-bind.sync</code> 用在一个字面量的对象上，例如 <code v-pre>v-bind.sync=”{ title: doc.title }”</code>，是无法正常工作的</p>
</li>
</ul>
<h4 id="props" tabindex="-1"><a class="header-anchor" href="#props" aria-hidden="true">#</a> props</h4>
<p>.prop设置自定义标签属性，避免暴露数据，防止污染 HTML 结构</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>uid<span class="token punctuation">"</span></span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title1<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1<span class="token punctuation">"</span></span> <span class="token attr-name">:index.prop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="camel" tabindex="-1"><a class="header-anchor" href="#camel" aria-hidden="true">#</a> camel</h4>
<p>将命名变为驼峰命名法，如将<code v-pre>view-Box</code>属性名转换为 <code v-pre>viewBox</code></p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span> <span class="token attr-name">:viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewBox<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="三、应用场景" tabindex="-1"><a class="header-anchor" href="#三、应用场景" aria-hidden="true">#</a> 三、应用场景</h2>
<p>根据每一个修饰符的功能，我们可以得到以下修饰符的应用场景：</p>
<ul>
<li>.stop：阻止事件冒泡</li>
<li>.native：绑定原生事件</li>
<li>.once：事件只执行一次</li>
<li>.self ：将事件绑定在自身身上，相当于阻止事件冒泡</li>
<li>.prevent：阻止默认事件</li>
<li>.caption：用于事件捕获</li>
<li>.once：只触发一次</li>
<li>.keyCode：监听特定键盘按下</li>
<li>.right：右键</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://segmentfault.com/a/1190000016786254</li>
<li>https://vue3js.cn/docs/zh</li>
</ul>
</div></template>


