<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-14 22:29:15
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-15 23:19:59
 * @Description: 
-->
<h1 id="vue3-和-vue2-的区别" tabindex="-1"><a class="header-anchor" href="#vue3-和-vue2-的区别" aria-hidden="true">#</a> vue3 和 vue2 的区别</h1>
<h2 id="区别" tabindex="-1"><a class="header-anchor" href="#区别" aria-hidden="true">#</a> 区别</h2>
<ol>
<li>
<p>性能更高了，主要得益于响应式的原理换成了 proxy，VNode diff 的算法进行了优化。</p>
</li>
<li>
<p>体积更小了，删除了一些没必要或不常用到的 API，例如 filter、$on,$off 等；按需导入，能更好的 <code v-pre>Tree Shaking</code>。</p>
</li>
<li>
<p>对 TS 支持更好啦，因为它本身源码就是用 TS 重写的。</p>
</li>
<li>
<p>Composition API（组合 API），相比较 Vue2 的 options api，对于开发大型项目更利于代码的复用和维护。</p>
</li>
<li>
<p>新特性，例如 Fragment、Teleport、Suspense 等。</p>
</li>
</ol>
<h2 id="vue3-带来的哪些变化" tabindex="-1"><a class="header-anchor" href="#vue3-带来的哪些变化" aria-hidden="true">#</a> vue3 带来的哪些变化</h2>
<h3 id="对于-vue-的高阶开发者" tabindex="-1"><a class="header-anchor" href="#对于-vue-的高阶开发者" aria-hidden="true">#</a> 对于 vue 的高阶开发者</h3>
<ul>
<li>新的 RFC 机制让 Vue 新语法的讨论更加高效和透明</li>
<li>Vue3 提供了自定义渲染器让开发跨端应用时更加得心应手。</li>
<li>全部的模块使用 TypeScript 重构，能够带来更好的可维护性。</li>
<li>响应式系统可以单独抽离使用。</li>
</ul>
<h3 id="对于-vue-的普通用户" tabindex="-1"><a class="header-anchor" href="#对于-vue-的普通用户" aria-hidden="true">#</a> 对于 vue 的普通用户</h3>
<ul>
<li>工程化工具 Vite 带来了更丝滑的调试体验。</li>
<li>Vue3 内部的优化（响应式系统基于 Proxy，静态标记，tree-shaking 等），使得性能更高，体积更小</li>
<li>Composition API 组合语法带来了更好的组织代码的形式。</li>
<li>内置了新的 Fragment、Teleport 和 Suspense 等组件。</li>
</ul>
<h2 id="vu3的非兼容变更" tabindex="-1"><a class="header-anchor" href="#vu3的非兼容变更" aria-hidden="true">#</a> vu3的非兼容变更</h2>
<p>非兼容变更的意思是破坏性的修改： 之前在vue2 中的不能用了。</p>
<h3 id="global-api" tabindex="-1"><a class="header-anchor" href="#global-api" aria-hidden="true">#</a> Global API</h3>
<ul>
<li>全局 <code v-pre>Vue API</code> 已更改为使用应用程序实例</li>
<li>全局和内部 <code v-pre>API</code> 已经被重构为可 <code v-pre>tree-shakable</code></li>
</ul>
<h3 id="模板指令" tabindex="-1"><a class="header-anchor" href="#模板指令" aria-hidden="true">#</a> 模板指令</h3>
<ul>
<li>组件上 <code v-pre>v-model</code> 用法已更改</li>
<li><code v-pre>&lt;template v-for&gt;</code>和 非 <code v-pre>v-for</code>节点上<code v-pre>key</code>用法已更改</li>
<li>在同一元素上使用的 <code v-pre>v-if</code> 和 <code v-pre>v-for</code> 优先级已更改</li>
<li><code v-pre>v-bind=&quot;object&quot;</code> 现在排序敏感</li>
<li><code v-pre>v-for</code> 中的 <code v-pre>ref</code> 不再注册 <code v-pre>ref</code> 数组</li>
</ul>
<h3 id="组件" tabindex="-1"><a class="header-anchor" href="#组件" aria-hidden="true">#</a> 组件</h3>
<ul>
<li>只能使用普通函数创建功能组件</li>
<li><code v-pre>functional</code> 属性在单文件组件 <code v-pre>(SFC)</code></li>
<li>异步组件现在需要 <code v-pre>defineAsyncComponent</code> 方法来创建</li>
</ul>
<h3 id="渲染函数" tabindex="-1"><a class="header-anchor" href="#渲染函数" aria-hidden="true">#</a> 渲染函数</h3>
<ul>
<li>渲染函数<code v-pre>API</code>改变</li>
<li><code v-pre>$scopedSlots</code> property 已删除，所有插槽都通过 <code v-pre>$slots</code> 作为函数暴露</li>
<li>自定义指令 API 已更改为与组件生命周期一致</li>
<li>一些转换 <code v-pre>class</code> 被重命名了：
<ul>
<li><code v-pre>v-enter</code> -&gt; <code v-pre>v-enter-from</code></li>
<li><code v-pre>v-leave</code> -&gt; <code v-pre>v-leave-from</code></li>
</ul>
</li>
<li>组件 <code v-pre>watch</code> 选项和实例方法 <code v-pre>$watch</code>不再支持点分隔字符串路径，请改用计算函数作为参数</li>
<li>在 <code v-pre>Vue 2.x</code> 中，应用根容器的 <code v-pre>outerHTML</code> 将替换为根组件模板 (如果根组件没有模板/渲染选项，则最终编译为模板)。<code v-pre>VUE3.x</code> 现在使用应用程序容器的 <code v-pre>innerHTML</code>。</li>
</ul>
<h3 id="其他小改变" tabindex="-1"><a class="header-anchor" href="#其他小改变" aria-hidden="true">#</a> 其他小改变</h3>
<ul>
<li><code v-pre>destroyed</code> 生命周期选项被重命名为 <code v-pre>unmounted</code></li>
<li><code v-pre>beforeDestroy</code> 生命周期选项被重命名为 <code v-pre>beforeUnmount</code></li>
<li><code v-pre>[prop default</code>工厂函数不再有权访问 <code v-pre>this</code> 是上下文</li>
<li>自定义指令 API 已更改为与组件生命周期一致</li>
<li><code v-pre>data</code> 应始终声明为函数</li>
<li>来自 <code v-pre>mixin</code> 的 <code v-pre>data</code> 选项现在可简单地合并</li>
<li><code v-pre>attribute</code> 强制策略已更改</li>
<li>一些过渡 <code v-pre>class</code> 被重命名</li>
<li>组建 watch 选项和实例方法 <code v-pre>$watch</code>不再支持以点分隔的字符串路径。请改用计算属性函数作为参数。</li>
<li><code v-pre>&lt;template&gt;</code> 没有特殊指令的标记 (<code v-pre>v-if/else-if/else</code>、<code v-pre>v-for</code> 或 <code v-pre>v-slot</code>) 现在被视为普通元素，并将生成原生的 <code v-pre>&lt;template&gt;</code> 元素，而不是渲染其内部内容。</li>
<li>在<code v-pre>Vue 2.x</code> 中，应用根容器的 <code v-pre>outerHTML</code> 将替换为根组件模板 (如果根组件没有模板/渲染选项，则最终编译为模板)。<code v-pre>Vue 3.x</code> 现在使用应用容器的 <code v-pre>innerHTML</code>，这意味着容器本身不再被视为模板的一部分。</li>
</ul>
<h3 id="移除-api" tabindex="-1"><a class="header-anchor" href="#移除-api" aria-hidden="true">#</a> 移除 API</h3>
<ul>
<li><code v-pre>keyCode</code> 支持作为 <code v-pre>v-on</code> 的修饰符</li>
<li><code v-pre>$on</code>，<code v-pre>$off</code>和<code v-pre>$once</code> 实例方法</li>
<li>过滤<code v-pre>filter</code></li>
<li>内联模板 <code v-pre>attribute</code></li>
<li><code v-pre>$destroy</code> 实例方法。用户不应再手动管理单个<code v-pre>Vue</code> 组件的生命周期。</li>
</ul>
</div></template>


