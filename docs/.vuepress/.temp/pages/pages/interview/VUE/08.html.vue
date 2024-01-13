<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-14 22:29:11
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-15 23:16:01
 * @Description: 
-->
<h2 id="计算属性和-watcher" tabindex="-1"><a class="header-anchor" href="#计算属性和-watcher" aria-hidden="true">#</a> 计算属性和 watcher</h2>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>区别: watch 侦听某一数据的变化从而会触发函数,当数据为对象类型时,对象中的属性值变化时需要使用深度侦听 deep 属性,也可在页面第一次加载时使用立即侦听 immdiate 属性 computed 计算属性是触发函数内部任一依赖项的变化都会重新执行该函数,计算属性有缓存,多次重复使用计算属性时会从缓存中获取返回值,计算属性必须要有 return 关键词</p>
<p>vue 中的 watcher 有三类</p>
<ol>
<li>render watcher</li>
<li>computed</li>
<li>自定义 watcher</li>
</ol>
<p>computed 是一种特殊的 watcher</p>
<p>watch 和 computed 都是以函数为基础的,它们都是通过监听自身依赖的数据在变化时触发相关的函数去实现自身数据的变动。</p>
<h2 id="不同点" tabindex="-1"><a class="header-anchor" href="#不同点" aria-hidden="true">#</a> 不同点</h2>
<h3 id="运行时机不同" tabindex="-1"><a class="header-anchor" href="#运行时机不同" aria-hidden="true">#</a> 运行时机不同</h3>
<ol>
<li>computed 是在 HTML,DOM 加载后马上执行的，如赋值；（属性将被混入到 Vue 实例）</li>
<li>watch 它用于观察 Vue 实例上的数据变动，一般情况下是依赖项的值变化之后再执行，当然可以设置立刻执行</li>
</ol>
<h3 id="计算属性有缓存" tabindex="-1"><a class="header-anchor" href="#计算属性有缓存" aria-hidden="true">#</a> 计算属性有缓存</h3>
<h3 id="代码内容不同" tabindex="-1"><a class="header-anchor" href="#代码内容不同" aria-hidden="true">#</a> 代码内容不同</h3>
<p>watcher 可以写任意的逻辑代码；而计算属性必须是同步的计算，并返回</p>
</div></template>


