<template><div><h1 id="vue生命周期" tabindex="-1"><a class="header-anchor" href="#vue生命周期" aria-hidden="true">#</a> vue生命周期</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>vue 生命周期分为个四个阶段</p>
<ol>
<li>初始化阶段: beforeCreate 与 created</li>
<li>挂载阶段: beforeMount 与 mounted</li>
<li>更新阶段: beforeUpdate 与 updated</li>
<li>销毁阶段: beforeDestroy 与 destroyed</li>
</ol>
<p>平时在开发中比较常用的有3个：一般在 created 函数中发送 ajax 请求获取数据,在 mounted 中获取挂载完毕后的真实 DOM,destroy 中销毁定时器,延时器或绑定的一些事件</p>
<h2 id="父子组件生命周期" tabindex="-1"><a class="header-anchor" href="#父子组件生命周期" aria-hidden="true">#</a> 父子组件生命周期</h2>
<p>如果存在父子组件，那么顺序是：父的前3个，子的4个，父的1个。</p>
<ol>
<li>父的beforeCreate → 父的created → 父的beforeMount →</li>
<li>子的beforeCreate → 子的created → 子的beforeMount → mounted →</li>
<li>父的mounted</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>
## 生命周期是什么

生命周期<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">（Life Cycle）</span><span class="token template-punctuation string">`</span></span>的概念应用很广泛，特别是在政治、经济、环境、技术、社会等诸多领域经常出现，其基本涵义可以通俗地理解为“从摇篮到坟墓”<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">（Cradle-to-Grave）</span><span class="token template-punctuation string">`</span></span>的整个过程在<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Vue</span><span class="token template-punctuation string">`</span></span>中实例从创建到销毁的过程就是生命周期，即指从创建、初始化数据、编译模板、挂载 Dom→ 渲染、更新 → 渲染、卸载等一系列过程我们可以把组件比喻成工厂里面的一条流水线，每个工人（生命周期）站在各自的岗位，当任务流转到工人身边的时候，工人就开始工作 <span class="token constant">PS</span>：在<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Vue</span><span class="token template-punctuation string">`</span></span>生命周期钩子会自动绑定 <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">this</span><span class="token template-punctuation string">`</span></span> 上下文到实例中，因此你可以访问数据，对 <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">property</span><span class="token template-punctuation string">`</span></span> 和方法进行运算这意味着<span class="token operator">**</span>你不能使用箭头函数来定义一个生命周期方法<span class="token operator">**</span> \<span class="token punctuation">(</span>例如 <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">created: () => this.fetchTodos()</span><span class="token template-punctuation string">`</span></span>\<span class="token punctuation">)</span>

## 二、生命周期有哪些

Vue 生命周期总共可以分为 <span class="token number">4</span> 个阶段：创建前后<span class="token punctuation">,</span> 载入前后<span class="token punctuation">,</span>更新前后<span class="token punctuation">,</span>销毁前销毁后，以及一些特殊场景的生命周期（keep<span class="token operator">-</span>alive之后的两个：activated deactivated）

<span class="token operator">|</span> 生命周期      <span class="token operator">|</span> 描述                               <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token operator">:</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">|</span> <span class="token operator">:</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">|</span>
<span class="token operator">|</span> beforeCreate  <span class="token operator">|</span> 组件实例被创建之初                 <span class="token operator">|</span>
<span class="token operator">|</span> created       <span class="token operator">|</span> 组件实例已经完全创建               <span class="token operator">|</span>
<span class="token operator">|</span> beforeMount   <span class="token operator">|</span> 组件挂载之前                       <span class="token operator">|</span>
<span class="token operator">|</span> mounted       <span class="token operator">|</span> 组件挂载到实例上去之后             <span class="token operator">|</span>
<span class="token operator">|</span> beforeUpdate  <span class="token operator">|</span> 组件数据发生变化，更新之前         <span class="token operator">|</span>
<span class="token operator">|</span> updated       <span class="token operator">|</span> 组件数据更新之后                   <span class="token operator">|</span>
<span class="token operator">|</span> beforeDestroy <span class="token operator">|</span> 组件实例销毁之前                   <span class="token operator">|</span>
<span class="token operator">|</span> destroyed     <span class="token operator">|</span> 组件实例销毁之后                   <span class="token operator">|</span>
<span class="token operator">|</span> activated     <span class="token operator">|</span> keep<span class="token operator">-</span>alive 缓存的组件激活时        <span class="token operator">|</span>
<span class="token operator">|</span> deactivated   <span class="token operator">|</span> keep<span class="token operator">-</span>alive 缓存的组件停用时调用    <span class="token operator">|</span>
<span class="token operator">|</span> errorCaptured <span class="token operator">|</span> 捕获一个来自子孙组件的错误时被调用 <span class="token operator">|</span>

## 三、生命周期整体流程

<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Vue</span><span class="token template-punctuation string">`</span></span>生命周期流程图

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token operator">/</span>asset<span class="token operator">/</span><span class="token number">44114780</span><span class="token operator">-</span>3aca<span class="token operator">-</span>11eb<span class="token operator">-</span>85f6<span class="token operator">-</span>6fac77c0c9b3<span class="token punctuation">.</span>png<span class="token punctuation">)</span>

#### 具体分析

<span class="token operator">**</span>beforeCreate <span class="token operator">-</span><span class="token operator">></span> created<span class="token operator">**</span>

<span class="token operator">-</span> 初始化<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vue</span><span class="token template-punctuation string">`</span></span>实例，进行数据观测

<span class="token operator">**</span>created<span class="token operator">**</span>

<span class="token operator">-</span> 完成数据观测，属性与方法的运算，<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">watch</span><span class="token template-punctuation string">`</span></span>、<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">event</span><span class="token template-punctuation string">`</span></span>事件回调的配置
<span class="token operator">-</span> 可调用<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">methods</span><span class="token template-punctuation string">`</span></span>中的方法，访问和修改 data 数据触发响应式渲染<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">dom</span><span class="token template-punctuation string">`</span></span>，可通过<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">computed</span><span class="token template-punctuation string">`</span></span>和<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">watch</span><span class="token template-punctuation string">`</span></span>完成数据计算
<span class="token operator">-</span> 此时<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vm.$el</span><span class="token template-punctuation string">`</span></span> 并没有被创建

<span class="token operator">**</span>created <span class="token operator">-</span><span class="token operator">></span> beforeMount<span class="token operator">**</span>

<span class="token operator">-</span> 判断是否存在<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">el</span><span class="token template-punctuation string">`</span></span>选项，若不存在则停止编译，直到调用<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vm.$mount(el)</span><span class="token template-punctuation string">`</span></span>才会继续编译
<span class="token operator">-</span> 优先级：<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">render</span><span class="token template-punctuation string">`</span></span> <span class="token operator">></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">template</span><span class="token template-punctuation string">`</span></span> <span class="token operator">></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">outerHTML</span><span class="token template-punctuation string">`</span></span>
<span class="token operator">-</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vm.el</span><span class="token template-punctuation string">`</span></span>获取到的是挂载<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">DOM</span><span class="token template-punctuation string">`</span></span>的

<span class="token operator">**</span>beforeMount<span class="token operator">**</span>

<span class="token operator">-</span> 在此阶段可获取到<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vm.el</span><span class="token template-punctuation string">`</span></span>
<span class="token operator">-</span> 此阶段<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vm.el</span><span class="token template-punctuation string">`</span></span>虽已完成 <span class="token constant">DOM</span> 初始化，但并未挂载在<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">el</span><span class="token template-punctuation string">`</span></span>选项上

<span class="token operator">**</span>beforeMount <span class="token operator">-</span><span class="token operator">></span> mounted<span class="token operator">**</span>

<span class="token operator">-</span> 此阶段<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vm.el</span><span class="token template-punctuation string">`</span></span>完成挂载，<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vm.$el</span><span class="token template-punctuation string">`</span></span>生成的<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">DOM</span><span class="token template-punctuation string">`</span></span>替换了<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">el</span><span class="token template-punctuation string">`</span></span>选项所对应的<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">DOM</span><span class="token template-punctuation string">`</span></span>

<span class="token operator">**</span>mounted<span class="token operator">**</span>

<span class="token operator">-</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vm.el</span><span class="token template-punctuation string">`</span></span>已完成<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">DOM</span><span class="token template-punctuation string">`</span></span>的挂载与渲染，此刻打印<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vm.$el</span><span class="token template-punctuation string">`</span></span>，发现之前的挂载点及内容已被替换成新的 <span class="token constant">DOM</span>

<span class="token operator">**</span>beforeUpdate<span class="token operator">**</span>

<span class="token operator">-</span> 更新的数据必须是被渲染在模板上的（<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">el</span><span class="token template-punctuation string">`</span></span>、<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">template</span><span class="token template-punctuation string">`</span></span>、<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">rende</span><span class="token template-punctuation string">`</span></span>r 之一）
<span class="token operator">-</span> 此时<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">view</span><span class="token template-punctuation string">`</span></span>层还未更新
<span class="token operator">-</span> 若在<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">beforeUpdate</span><span class="token template-punctuation string">`</span></span>中再次修改数据，不会再次触发更新方法

<span class="token operator">**</span>updated<span class="token operator">**</span>

<span class="token operator">-</span> 完成<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">view</span><span class="token template-punctuation string">`</span></span>层的更新
<span class="token operator">-</span> 若在<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">updated</span><span class="token template-punctuation string">`</span></span>中再次修改数据，会再次触发更新方法（<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">beforeUpdate</span><span class="token template-punctuation string">`</span></span>、<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">updated</span><span class="token template-punctuation string">`</span></span>）

<span class="token operator">**</span>beforeDestroy<span class="token operator">**</span>

<span class="token operator">-</span> 实例被销毁前调用，此时实例属性与方法仍可访问

<span class="token operator">**</span>destroyed<span class="token operator">**</span>

<span class="token operator">-</span> 完全销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器
<span class="token operator">-</span> 并不能清除 <span class="token constant">DOM</span>，仅仅销毁实例

<span class="token operator">**</span>使用场景分析<span class="token operator">**</span>

<span class="token operator">|</span> 生命周期      <span class="token operator">|</span> 描述                                                         <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token operator">:</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">|</span> <span class="token operator">:</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">|</span>
<span class="token operator">|</span> beforeCreate  <span class="token operator">|</span> 执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务 <span class="token operator">|</span>
<span class="token operator">|</span> created       <span class="token operator">|</span> 组件初始化完毕，各种数据可以使用，常用于异步数据获取         <span class="token operator">|</span>
<span class="token operator">|</span> beforeMount   <span class="token operator">|</span> 未执行渲染、更新，dom 未创建                                 <span class="token operator">|</span>
<span class="token operator">|</span> mounted       <span class="token operator">|</span> 初始化结束，dom 已创建，可用于获取访问数据和 dom 元素        <span class="token operator">|</span>
<span class="token operator">|</span> beforeUpdate  <span class="token operator">|</span> 更新前，可用于获取更新前各种状态                             <span class="token operator">|</span>
<span class="token operator">|</span> updated       <span class="token operator">|</span> 更新后，所有状态已是最新                                     <span class="token operator">|</span>
<span class="token operator">|</span> beforeDestroy <span class="token operator">|</span> 销毁前，可用于一些定时器或订阅的取消                         <span class="token operator">|</span>
<span class="token operator">|</span> destroyed     <span class="token operator">|</span> 组件已销毁，作用同上                                         <span class="token operator">|</span>

## created和mouted的区别

<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">created</span><span class="token template-punctuation string">`</span></span>是在组件实例一旦创建完成的时候立刻调用，这时候页面<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">dom</span><span class="token template-punctuation string">`</span></span>节点并未生成。

<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">mounted</span><span class="token template-punctuation string">`</span></span>是在页面<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">dom</span><span class="token template-punctuation string">`</span></span>节点渲染完毕之后就立刻执行的。
触发时机上<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">created</span><span class="token template-punctuation string">`</span></span>是比<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">mounted</span><span class="token template-punctuation string">`</span></span>要更早的
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


