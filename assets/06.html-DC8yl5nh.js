import{_ as e,o as t,c as a,a as i,b as s}from"./app-du5sw6ua.js";const r={},n=s('<h1 id="什么是-set" tabindex="-1"><a class="header-anchor" href="#什么是-set" aria-hidden="true">#</a> 什么是$set？</h1><h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2><p>问：简单描述一下$set</p><p>答：数据变化视图不更新问题, 当在项目中直接设置数组的某一项的值，或者直接设置对象的某个属性值，这个时候，你会发现页面并没有更新。这是因为 Object.defineProperty()限制，监听不到变化。</p><p>解决方式：this.$set(你要改变的数组/对象，你要改变的位置/key，你要改成什么 value)</p><p>$set 的实现原理</p><ul><li><p>如果目标是数组，直接使用数组的 splice 方法触发相应式；</p></li><li><p>如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理（ defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）</p></li></ul><p>补充延伸：vue 源码里缓存了 array 的原型链，然后重写了这几个方法，触发这几个方法的时候会 observer 数据，意思是使用这些方法不用再进行额外的操作，视图自动进行更新。 推荐使用 splice 方法会比较好自定义,因为 splice 可以在数组的任何位置进行删除/添加操作, 总共提供了 7 个方法都可实现响应式： splice()、 push()、pop()、shift()、unshift()、sort()、reverse()</p><h2 id="set" tabindex="-1"><a class="header-anchor" href="#set" aria-hidden="true">#</a> $set</h2><p>格式： <code>$set(对象，属性名，值)</code></p><p>作用：手动添加响应式的效果</p>',11);function c(p,d){return t(),a("div",null,[i(`
 * @Author: lijing
 * @Date: 2023-12-14 22:29:11
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-15 23:15:42
 * @Description: 
`),n])}const h=e(r,[["render",c],["__file","06.html.vue"]]);export{h as default};
