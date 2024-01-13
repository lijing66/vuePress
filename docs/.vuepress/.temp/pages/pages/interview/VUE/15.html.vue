<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-14 22:29:14
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-15 23:17:05
 * @Description: 
-->
<h1 id="vuex" tabindex="-1"><a class="header-anchor" href="#vuex" aria-hidden="true">#</a> vuex</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<ul>
<li>vuex 是为了解决整个网站状态数据共享问题的,虽然有父向子,子向父等数据传递,但在网站开发过程中一些无直接关联关系的组件也需要共享相同的数据时,就需要使用 vuex 了</li>
</ul>
<p>vuex 中有六个主要的成员:</p>
<ul>
<li>state 是用来存储数据的</li>
<li>mutations 是用来修改 state 中的数据的方法</li>
<li>actions 是用来处理一些异步操作数据的行为方法</li>
<li>getters 有点类似计算属性,是对 state 中的数据做了一些处理</li>
<li>modules 是用来对复杂业务分模块的,每个模块也可以有 state,mutaions,actions,getters</li>
<li>plugins 插件。比较常用的有用来持久化的 vuex-persistedstate</li>
</ul>
<h2 id="vuex-是什么" tabindex="-1"><a class="header-anchor" href="#vuex-是什么" aria-hidden="true">#</a> vuex 是什么</h2>
<p><code v-pre>Vuex</code> 是一个专为 <code v-pre>Vue.js</code> 应用程序开发的<strong>状态管理模式</strong>。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。</p>
<p>vuex 的出现解决了：</p>
<p>1.多个组件共享状态时，单向数据流的简洁性很容易被破坏： 2.多个视图依赖于同一状态。 3.来自不同视图的行为需要变更同一状态。</p>
<h2 id="vuex-的数据传递流程" tabindex="-1"><a class="header-anchor" href="#vuex-的数据传递流程" aria-hidden="true">#</a> Vuex 的数据传递流程</h2>
<p>当组件进行数据修改的时候我们需要：</p>
<ol>
<li>调用 dispatch 来触发 actions 里面的方法。</li>
<li>actions 里面的每个方法中都会 有一个 commit 方法，当方法执行时会通过 commit 来触发 mutations 里面的方法进行数据的修改。</li>
<li>mutations 里面 的每个函数都会有一个 state 参数，这样就可以在 mutations 里面进行 state 的 数据修改</li>
<li>当数据修改完毕后，会传导给页面,页面也会发生改变</li>
</ol>
<h2 id="vuex-的-mutation-和-action-之间的区别" tabindex="-1"><a class="header-anchor" href="#vuex-的-mutation-和-action-之间的区别" aria-hidden="true">#</a> Vuex 的 Mutation 和 Action 之间的区别</h2>
<p>我们可以从以下三个方面对两者进行分析：</p>
<p>第一点 =&gt; 流程顺序</p>
<p>“相应视图---&gt;修改 State”拆分成两部分，视图触发 Action，Action 再触发 Mutation。</p>
<p>第二点 =&gt; 角色定位</p>
<p>基于流程顺序，二者扮演不同的角色。</p>
<p>Mutation：专注于修改 State，理论上是修改 State 的唯一途径。</p>
<p>Action：业务代码、异步请求。</p>
<p>第三点 =&gt; 限制</p>
<p>角色不同，二者有不同的限制。</p>
<p>Mutation：必须同步执行。</p>
<p>Action：可以异步，但不能直接操作 State。而且可以通过 action 来提交 mutations</p>
<h2 id="持久化" tabindex="-1"><a class="header-anchor" href="#持久化" aria-hidden="true">#</a> 持久化</h2>
<p>vuex 是保存在内存中的，刷新之后就会丢失。</p>
<p>可以通过 vuex-presisit 插件来做持久化</p>
<h2 id="流程图" tabindex="-1"><a class="header-anchor" href="#流程图" aria-hidden="true">#</a> 流程图</h2>
<p><img src="http://fanyouf.gitee.io/interview/assets/img/image-20220728001210496.ddc60e9f.png" alt="image-20220728001210496"></p>
</div></template>


