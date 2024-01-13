<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-14 21:48:34
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-14 21:50:23
 * @Description: 
-->
<h1 id="reduce" tabindex="-1"><a class="header-anchor" href="#reduce" aria-hidden="true">#</a> reduce</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<ul>
<li>
<p>reduce 作用：给每一个元素执行一次回调函数，并且返回最终的结果</p>
</li>
<li>
<p>reduce 参数有两个：第一个是回调函数，第二个是初始值。 一般初始值都会设置为 0，目的是避免空数组报错</p>
<ul>
<li>回调函数内部常用的形参有三个，依次是累加值、当前元素、当前下标</li>
<li>回调函数内部的 return 返回值就是下一次回调的累加值</li>
</ul>
</li>
<li>
<p>reduce 方法的返回值:就是执行完遍历之后，最终的累加值</p>
</li>
</ul>
</div></template>


