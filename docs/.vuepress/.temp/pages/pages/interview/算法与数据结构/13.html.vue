<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-15 23:11:46
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-17 21:12:33
 * @Description: 
-->
<h1 id="插入排序" tabindex="-1"><a class="header-anchor" href="#插入排序" aria-hidden="true">#</a> 插入排序</h1>
<h2 id="是什么" tabindex="-1"><a class="header-anchor" href="#是什么" aria-hidden="true">#</a> 是什么</h2>
<p>插入排序（Insertion Sort），一般也被称为<strong>直接插入排序</strong>。对于少量元素的排序，它是一个有效、简单的算法.</p>
<p>实现思想: 将新数据逐个插入到有序的数组中，最终得到的序列就是完全排序好的数据。</p>
<h2 id="难点" tabindex="-1"><a class="header-anchor" href="#难点" aria-hidden="true">#</a> 难点</h2>
<p>在思考这类问题时，最重要的问题是找个中间态：排序工作做到中途时的处理。</p>
<p>例如：[1,10,11,7] 这个数组来说，前边3项都是有序的，那如何把7放入正确的位置？</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">11</span> <span class="token punctuation">}</span>   <span class="token operator">&lt;</span>—  <span class="token number">7</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如何把7插入到合适的位置？</p>
<h2 id="基本的思路是" tabindex="-1"><a class="header-anchor" href="#基本的思路是" aria-hidden="true">#</a> 基本的思路是</h2>
<ol>
<li>在有序的部分1,10,11中找到合适的位置</li>
<li>在这个位置插入7，并将后续的元素整体后移</li>
</ol>
<p>代码如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span>

<span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> curIdx <span class="token operator">=</span> i
        <span class="token keyword">var</span> curItem <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
        <span class="token keyword">var</span> idx <span class="token operator">=</span> <span class="token function">findIndex</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> i<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> curItem<span class="token punctuation">)</span>
        
        <span class="token function">move</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span>idx<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">move</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> newIdx<span class="token punctuation">,</span> oldIdx</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    
    <span class="token keyword">var</span> curItem <span class="token operator">=</span> arr<span class="token punctuation">[</span>oldIdx<span class="token punctuation">]</span>
    <span class="token comment">// 从原来的位置上删除</span>
    arr<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>oldIdx<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 插入到新的位置</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>newIdx<span class="token operator">===</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        arr<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>curItem<span class="token punctuation">)</span> 
    <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
        arr<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>newIdx<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>curItem<span class="token punctuation">)</span> 
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">findIndex</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> idx<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>idx<span class="token operator">>=</span><span class="token number">0</span> <span class="token operator">&amp;&amp;</span> arr<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token operator">></span>val<span class="token punctuation">)</span><span class="token punctuation">{</span>
        idx<span class="token operator">--</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> idx
    
<span class="token punctuation">}</span>

<span class="token function">f</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>当前项（7）和有序区（1,10,11）的最后一项（11）比较。</li>
<li>如果当前项(7) &lt; 有序区的最后一项（11）。交换他们，变成了(1,10,7,11)。这样就结束了吗？并没有,还要继续比较当前项</li>
<li>比较当前项和有序区的倒数第二项</li>
</ol>
<p>排序的过程：循环交换相邻的元素。</p>
<p>不是&quot;先找到位置，然后再插入元素”，而是边找位置边移动。因为找位置要循环，移动也要循环，这样效率太低了。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span>

<span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> curIdx <span class="token operator">=</span> i
        <span class="token keyword">var</span> lastIdx <span class="token operator">=</span> curIdx <span class="token operator">-</span> <span class="token number">1</span>

        <span class="token keyword">while</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>lastIdx<span class="token punctuation">]</span> <span class="token operator">></span> arr<span class="token punctuation">[</span>curIdx<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> lastIdx <span class="token operator">></span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">swap</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> curIdx<span class="token punctuation">,</span> lastIdx<span class="token punctuation">)</span><span class="token punctuation">;</span>
            curIdx<span class="token operator">--</span>
            lastIdx <span class="token operator">=</span> curIdx <span class="token operator">-</span> <span class="token number">1</span>
            
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">swap</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> i <span class="token punctuation">,</span>j</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> t <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span>
    arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> t
<span class="token punctuation">}</span>

<span class="token function">f</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、如何实现" tabindex="-1"><a class="header-anchor" href="#二、如何实现" aria-hidden="true">#</a> 二、如何实现</h2>
<p>将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。</p>
<p>从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置</p>
<p>如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面</p>
<p><img src="https://www.runoob.com/wp-content/uploads/2019/03/insertionSort.gif" alt=""></p>
<p>用代码表示则如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">insertionSort</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> len <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token keyword">let</span> preIndex<span class="token punctuation">,</span> current<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        preIndex <span class="token operator">=</span> i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        current <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>preIndex <span class="token operator">>=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> arr<span class="token punctuation">[</span>preIndex<span class="token punctuation">]</span> <span class="token operator">></span> current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            arr<span class="token punctuation">[</span>preIndex<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>preIndex<span class="token punctuation">]</span><span class="token punctuation">;</span>
            preIndex<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        arr<span class="token punctuation">[</span>preIndex<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> current<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> arr<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在插入排序中，当待排序数组是有序时，是最优的情况，只需当前数跟前一个数比较一下就可以了，这时一共需要比较<code v-pre>N- 1</code>次，时间复杂度为<code v-pre>O(n)</code></p>
<p>最坏的情况是待排序数组是逆序的，此时需要比较次数最多，总次数记为：1+2+3+…+N-1，所以，插入排序最坏情况下的时间复杂度为<code v-pre>O(n^2)</code></p>
<p>通过上面了解，可以看到插入排序是一种稳定的排序方式</p>
<h2 id="三、应用场景" tabindex="-1"><a class="header-anchor" href="#三、应用场景" aria-hidden="true">#</a> 三、应用场景</h2>
<p>插入排序时间复杂度是 O(n2)，适用于数据量不大，算法稳定性要求高，且数据局部或整体有序的数列排序</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://baike.baidu.com/item/%E6%8F%92%E5%85%A5%E6%8E%92%E5%BA%8F/7214992</li>
<li>http://data.biancheng.net/view/65.html</li>
</ul>
</div></template>


