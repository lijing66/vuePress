<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-15 23:11:46
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-15 23:32:09
 * @Description: 
-->
<h1 id="数据结构" tabindex="-1"><a class="header-anchor" href="#数据结构" aria-hidden="true">#</a> 数据结构</h1>
<h2 id="数据结构是什么" tabindex="-1"><a class="header-anchor" href="#数据结构是什么" aria-hidden="true">#</a> 数据结构是什么</h2>
<p>数据结构是计算机存储、组织数据的方式，是指相互之间存在一种或多种特定关系的数据元素的集合</p>
<p>前面讲到，一个程序 = 算法 + 数据结构，数据结构是实现算法的基础，选择合适的数据结构可以带来更高的运行或者存储效率</p>
<p>数据元素相互之间的关系称为结构，根据数据元素之间关系的不同特性，通常有如下四类基本的结构：</p>
<ul>
<li>集合结构：该结构的数据元素间的关系是“属于同一个集合”</li>
<li>线性结构：该结构的数据元素之间存在着一对一的关系</li>
<li>树型结构：该结构的数据元素之间存在着一对多的关系</li>
<li>图形结构：该结构的数据元素之间存在着多对多的关系，也称网状结构</li>
</ul>
<p>由于数据结构种类太多，逻辑结构可以再分成为：</p>
<ul>
<li>线性结构：有序数据元素的集合，其中数据元素之间的关系是一对一的关系，除了第一个和最后一个数据元素之外，其它数据元素都是首尾相接的</li>
<li>非线性结构：各个数据元素不再保持在一个线性序列中，每个数据元素可能与零个或者多个其他数据元素发生关联</li>
</ul>
<p><img src="https://static.vue-js.com/9aedc5d0-1aa6-11ec-8e64-91fdec0f05a1.png" alt=""></p>
<h2 id="数据结构有哪些" tabindex="-1"><a class="header-anchor" href="#数据结构有哪些" aria-hidden="true">#</a> 数据结构有哪些</h2>
<p>常见的数据结构有如下：</p>
<ul>
<li>数组</li>
<li>栈</li>
<li>队列</li>
<li>链表</li>
<li><a href="http://fanyouf.gitee.io/interview/algorithm/tree.html" target="_blank" rel="noopener noreferrer">树<ExternalLinkIcon/></a></li>
<li>图</li>
<li>堆</li>
<li>散列表</li>
</ul>
<h3 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h3>
<p>在程序设计中，为了处理方便， 一般情况把具有相同类型的若干变量按有序的形式组织起来，这些按序排列的同类数据元素的集合称为数组</p>
<h3 id="栈" tabindex="-1"><a class="header-anchor" href="#栈" aria-hidden="true">#</a> 栈</h3>
<p>一种特殊的线性表，只能在某一端插入和删除的特殊线性表，按照先进后出的特性存储数据</p>
<p>先进入的数据被压入栈底，最后的数据在栈顶，需要读数据的时候从栈顶开始弹出数据</p>
<h3 id="队列" tabindex="-1"><a class="header-anchor" href="#队列" aria-hidden="true">#</a> 队列</h3>
<p>跟栈基本一致，也是一种特殊的线性表，其特性是先进先出，只允许在表的前端进行删除操作，而在表的后端进行插入操作</p>
<h3 id="链表" tabindex="-1"><a class="header-anchor" href="#链表" aria-hidden="true">#</a> 链表</h3>
<p>是一种物理存储单元上非连续、非顺序的存储结构，数据元素的逻辑顺序是通过链表中的指针链接次序实现的</p>
<p>链表由一系列结点（链表中每一个元素称为结点）组成，结点可以在运行时动态生成</p>
<p>一般情况，每个结点包括两个部分：一个是存储数据元素的数据域，另一个是存储下一个结点地址的指针域</p>
<h3 id="树" tabindex="-1"><a class="header-anchor" href="#树" aria-hidden="true">#</a> 树</h3>
<p>树是典型的非线性结构，在树的结构中，有且仅有一个根结点，该结点没有前驱结点。在树结构中的其他结点都有且仅有一个前驱结点，而且可以有两个以上的后继结点</p>
<h3 id="图" tabindex="-1"><a class="header-anchor" href="#图" aria-hidden="true">#</a> 图</h3>
<p>一种非线性结构。在图结结构中，数据结点一般称为顶点，而边是顶点的有序偶对。如果两个顶点之间存在一条边，那么就表示这两个顶点具有相邻关系</p>
<h3 id="堆" tabindex="-1"><a class="header-anchor" href="#堆" aria-hidden="true">#</a> 堆</h3>
<p>堆是一种特殊的树形数据结构，每个结点都有一个值，特点是根结点的值最小（或最大），且根结点的两个子树也是一个堆</p>
<h3 id="散列表" tabindex="-1"><a class="header-anchor" href="#散列表" aria-hidden="true">#</a> 散列表</h3>
<p>若结构中存在关键字和<code v-pre>K</code>相等的记录，则必定在<code v-pre>f(K)</code>的存储位置上，不需比较便可直接取得所查记录</p>
<h2 id="三、区别" tabindex="-1"><a class="header-anchor" href="#三、区别" aria-hidden="true">#</a> 三、区别</h2>
<p>上述的数据结构，之前的区别可以分成线性结构和非线性结构：</p>
<ul>
<li>线性结构有：数组、栈、队列、链表等</li>
<li>非线性结构有：树、图、堆等</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84</li>
<li>https://baike.baidu.com/item/数据结构/1450</li>
</ul>
</div></template>


