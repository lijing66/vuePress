<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-12 22:26:17
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-14 21:46:48
 * @Description: 
-->
<h1 id="箭头函数" tabindex="-1"><a class="header-anchor" href="#箭头函数" aria-hidden="true">#</a> 箭头函数</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p><a href="https://www.bilibili.com/video/BV1iW4y1k7Ci?p=6&amp;vd_source=c29247aaf6a5467f0f252a389801de84" target="_blank" rel="noopener noreferrer">参考视频 (opens new window)<ExternalLinkIcon/></a></p>
<p>箭头函数是ES6提出了的新语法。它最大的意义是解放了Function的功能。 在js中，Function是一等公民，它不但承担了本质的函数的功能，还可以做构造函数来使用，现在有了箭头函数，其实大大简化了Function的使用频率。</p>
<p>与普通函数相比，他：</p>
<ol>
<li>写法更加简洁，可以根据具体情况省略 小括号，return 等。这一点在高阶函数的使用中特别方便。例如,数组的map, forEach等.</li>
<li>箭头函数内部没有自己的 this ,它的this就是外层作用域的 this 。它不能通过call,apply,bind来修改。</li>
<li>箭头函数内部没有arguments对象。但是，es6配套提供了剩余参数，可以用来替代argument.</li>
<li>不能当前构造器来使用。</li>
</ol>
<p>我现在在写v3的代码，所以使用箭头函数还是比较多的。</p>
</div></template>


