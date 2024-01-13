<template><div><h1 id="vue-路由守卫" tabindex="-1"><a class="header-anchor" href="#vue-路由守卫" aria-hidden="true">#</a> vue 路由守卫</h1>
<p>分类：</p>
<ol>
<li>全局的。
<ul>
<li>全局前置：router.beforeEach((to, from, next)=&gt;{})</li>
<li>全局解析守卫：在 2.5.0+ 你可以用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。</li>
<li>全局后置：router.afterEach((to, from)=&gt;{})</li>
</ul>
</li>
<li>路由独享：路由配置上直接定义 beforeEnter 守卫</li>
<li>组件内的守卫。他们的格式就像created钩子一样。
<ul>
<li>beforeRouteEnter</li>
<li>beforeRouteUpdate (2.2 新增)</li>
<li>beforeRouteLeave</li>
</ul>
</li>
</ol>
<p>注意：参数或查询的改变并不会触发<code v-pre>进入/离开</code>的导航守卫。你可以:</p>
<ol>
<li>通过观察 $route 对象来应对这些变化</li>
<li>或使用 beforeRouteUpdate 的组件内守卫。</li>
</ol>
<h3 id="路由独享的守卫" tabindex="-1"><a class="header-anchor" href="#路由独享的守卫" aria-hidden="true">#</a> 路由独享的守卫</h3>
<p>你可以在路由配置上直接定义 beforeEnter 守卫：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'/foo'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">component</span><span class="token operator">:</span> Foo<span class="token punctuation">,</span>
      <span class="token function-variable function">beforeEnter</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="组件内的守卫" tabindex="-1"><a class="header-anchor" href="#组件内的守卫" aria-hidden="true">#</a> 组件内的守卫</h3>
<p>在组件内部，直接定义以下路由导航守卫：</p>
<ul>
<li>beforeRouteEnter</li>
<li>beforeRouteUpdate (2.2 新增)</li>
<li>beforeRouteLeave</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Foo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">...</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token function">beforeRouteEnter</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 在渲染该组件的对应路由被 confirm 前调用</span>
    <span class="token comment">// 不！能！获取组件实例 `this`</span>
    <span class="token comment">// 因为当守卫执行前，组件实例还没被创建</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">beforeRouteUpdate</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 在当前路由改变，但是该组件被复用时调用</span>
    <span class="token comment">// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，</span>
    <span class="token comment">// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。</span>
    <span class="token comment">// 可以访问组件实例 `this`</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">beforeRouteLeave</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 导航离开该组件的对应路由时调用</span>
    <span class="token comment">// 可以访问组件实例 `this`</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="完整的导航解析流程" tabindex="-1"><a class="header-anchor" href="#完整的导航解析流程" aria-hidden="true">#</a> 完整的导航解析流程</h3>
<ol>
<li>导航被触发。</li>
<li>在失活的组件里调用 beforeRouteLeave 守卫。</li>
<li>调用全局的 beforeEach 守卫。</li>
<li>在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。</li>
<li>在路由配置里调用 beforeEnter。</li>
<li>解析异步路由组件。</li>
<li>在被激活的组件里调用 beforeRouteEnter。</li>
<li>调用全局的 beforeResolve 守卫 (2.5+)。</li>
<li>导航被确认。</li>
<li>调用全局的 afterEach 钩子。</li>
<li>触发 DOM 更新。</li>
<li>调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。</li>
</ol>
</div></template>


