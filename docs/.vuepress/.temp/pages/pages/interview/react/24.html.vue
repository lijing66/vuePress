<template><div><h1 id="说说你对immutable的理解-如何应用在react项目中" tabindex="-1"><a class="header-anchor" href="#说说你对immutable的理解-如何应用在react项目中" aria-hidden="true">#</a> 说说你对immutable的理解？如何应用在react项目中？</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>Immutable，不可改变的，在计算机中，即指一旦创建，就不能再被更改的数据</p>
<p>对 <code v-pre>Immutable</code>对象的任何修改或添加删除操作都会返回一个新的 <code v-pre>Immutable</code>对象</p>
<p><code v-pre>Immutable</code> 实现的原理是 <code v-pre>Persistent Data Structure</code>（持久化数据结构）:</p>
<ul>
<li>用一种数据结构来保存数据</li>
<li>当数据被修改时，会返回一个对象，但是新的对象会尽可能的利用之前的数据结构而不会对内存造成浪费</li>
</ul>
<p>也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变，同时为了避免 <code v-pre>deepCopy</code>把所有节点都复制一遍带来的性能损耗，<code v-pre>Immutable</code> 使用了 <code v-pre>Structural Sharing</code>（结构共享）</p>
<p>如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享</p>
<p>如下图所示：</p>
<p><img src="https://pic4.zhimg.com/80/2b4c801a7b40eefcd4ee6767fb984fdf_720w.gif" alt=""></p>
<h2 id="二、如何使用" tabindex="-1"><a class="header-anchor" href="#二、如何使用" aria-hidden="true">#</a> 二、如何使用</h2>
<p>使用<code v-pre>Immutable</code>对象最主要的库是<code v-pre>immutable.js</code></p>
<p>immutable.js 是一个完全独立的库，无论基于什么框架都可以用它</p>
<p>其出现场景在于弥补 Javascript 没有不可变数据结构的问题，通过 structural sharing来解决的性能问题</p>
<p>内部提供了一套完整的 Persistent Data Structure，还有很多易用的数据类型，如<code v-pre>Collection</code>、<code v-pre>List</code>、<code v-pre>Map</code>、<code v-pre>Set</code>、<code v-pre>Record</code>、<code v-pre>Seq</code>，其中：</p>
<ul>
<li>
<p>List: 有序索引集，类似 JavaScript 中的 Array</p>
</li>
<li>
<p>Map: 无序索引集，类似 JavaScript 中的 Object</p>
</li>
<li>
<p>Set: 没有重复值的集合</p>
</li>
</ul>
<p>主要的方法如下：</p>
<ul>
<li>fromJS()：将一个js数据转换为Immutable类型的数据</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> Immutable<span class="token punctuation">.</span><span class="token function">fromJS</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">a</span><span class="token operator">:</span><span class="token string">'123'</span><span class="token punctuation">,</span><span class="token literal-property property">b</span><span class="token operator">:</span><span class="token string">'234'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>toJS()：将一个Immutable数据转换为JS类型的数据</li>
<li>is()：对两个对象进行比较</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Map<span class="token punctuation">,</span> is <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'immutable'</span>
<span class="token keyword">const</span> map1 <span class="token operator">=</span> <span class="token function">Map</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> map2 <span class="token operator">=</span> <span class="token function">Map</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
map1 <span class="token operator">===</span> map2   <span class="token comment">//false</span>
Object<span class="token punctuation">.</span><span class="token function">is</span><span class="token punctuation">(</span>map1<span class="token punctuation">,</span> map2<span class="token punctuation">)</span> <span class="token comment">// false</span>
<span class="token function">is</span><span class="token punctuation">(</span>map1<span class="token punctuation">,</span> map2<span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>get(key)：对数据或对象取值</p>
</li>
<li>
<p>getIn([]) ：对嵌套对象或数组取值，传参为数组，表示位置</p>
</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> abs <span class="token operator">=</span> Immutable<span class="token punctuation">.</span><span class="token function">fromJS</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">b</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
abs<span class="token punctuation">.</span><span class="token function">getIn</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 2</span>
abs<span class="token punctuation">.</span><span class="token function">getIn</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 子级没有值</span>

<span class="token keyword">let</span> arr <span class="token operator">=</span> Immutable<span class="token punctuation">.</span><span class="token function">fromJS</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span> <span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
arr<span class="token punctuation">.</span><span class="token function">getIn</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">'a'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 5</span>
arr<span class="token punctuation">.</span><span class="token function">getIn</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 子级没有值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下例子：使用方法如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Immutable <span class="token keyword">from</span> <span class="token string">'immutable'</span><span class="token punctuation">;</span>
foo <span class="token operator">=</span> Immutable<span class="token punctuation">.</span><span class="token function">fromJS</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
bar <span class="token operator">=</span> foo<span class="token punctuation">.</span><span class="token function">setIn</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 使用 setIn 赋值</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span><span class="token function">getIn</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 使用 getIn 取值，打印 1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo <span class="token operator">===</span> bar<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//  打印 false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果换到原生的<code v-pre>js</code>，则对应如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> bar <span class="token operator">=</span> foo<span class="token punctuation">;</span>
bar<span class="token punctuation">.</span>a<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span>a<span class="token punctuation">.</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 打印 2</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo <span class="token operator">===</span> bar<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//  打印 true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、在react中应用" tabindex="-1"><a class="header-anchor" href="#三、在react中应用" aria-hidden="true">#</a> 三、在React中应用</h2>
<p>使用 <code v-pre>Immutable</code>可以给 <code v-pre>React</code> 应用带来性能的优化，主要体现在减少渲染的次数</p>
<p>在做<code v-pre>react</code>性能优化的时候，为了避免重复渲染，我们会在<code v-pre>shouldComponentUpdate()</code>中做对比，当返回<code v-pre>true</code>执行<code v-pre>render</code>方法</p>
<p><code v-pre>Immutable</code>通过<code v-pre>is</code>方法则可以完成对比，而无需像一样通过深度比较的方式比较</p>
<p>在使用<code v-pre>redux</code>过程中也可以结合<code v-pre>Immutable</code>，不使用<code v-pre>Immutable</code>前修改一个数据需要做一个深拷贝</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">'_'</span> <span class="token keyword">from</span> <span class="token string">'lodash'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> Component <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createClass</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">getInitialState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">times</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">handleAdd</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> data <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token function">cloneDeep</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    data<span class="token punctuation">.</span>times <span class="token operator">=</span> data<span class="token punctuation">.</span>times <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">data</span><span class="token operator">:</span> data <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 Immutable 后：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">getInitialState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token function">Map</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">times</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">handleAdd</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>data<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token string">'times'</span><span class="token punctuation">,</span> <span class="token parameter">v</span> <span class="token operator">=></span> v <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 这时的 times 并不会改变</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>data<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'times'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同理，在<code v-pre>redux</code>中也可以将数据进行<code v-pre>fromJS</code>处理</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> constants <span class="token keyword">from</span> <span class="token string">'./constants'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>fromJS<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'immutable'</span>
<span class="token keyword">const</span> defaultState <span class="token operator">=</span> <span class="token function">fromJS</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token comment">//将数据转化成immutable数据</span>
    <span class="token literal-property property">home</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">focused</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">mouseIn</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">list</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">page</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">totalPage</span><span class="token operator">:</span><span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">default</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token operator">=</span>defaultState<span class="token punctuation">,</span>action</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    <span class="token keyword">switch</span><span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">case</span> constants<span class="token punctuation">.</span><span class="token constant">SEARCH_FOCUS</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'focused'</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token comment">//更改immutable数据</span>
        <span class="token keyword">case</span> constants<span class="token punctuation">.</span><span class="token constant">CHANGE_HOME_ACTIVE</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'home'</span><span class="token punctuation">,</span>action<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
        <span class="token keyword">case</span> constants<span class="token punctuation">.</span><span class="token constant">SEARCH_BLUR</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'focused'</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">)</span>
        <span class="token keyword">case</span> constants<span class="token punctuation">.</span><span class="token constant">CHANGE_LIST</span><span class="token operator">:</span>
            <span class="token comment">// return state.set('list',action.data).set('totalPage',action.totalPage)</span>
            <span class="token comment">//merge效率更高，执行一次改变多个数据</span>
            <span class="token keyword">return</span> state<span class="token punctuation">.</span><span class="token function">merge</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">list</span><span class="token operator">:</span>action<span class="token punctuation">.</span>data<span class="token punctuation">,</span>
                <span class="token literal-property property">totalPage</span><span class="token operator">:</span>action<span class="token punctuation">.</span>totalPage
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">case</span> constants<span class="token punctuation">.</span><span class="token constant">MOUSE_ENTER</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'mouseIn'</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span>
        <span class="token keyword">case</span> constants<span class="token punctuation">.</span><span class="token constant">MOUSE_LEAVE</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'mouseIn'</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">)</span>
        <span class="token keyword">case</span> constants<span class="token punctuation">.</span><span class="token constant">CHANGE_PAGE</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'page'</span><span class="token punctuation">,</span>action<span class="token punctuation">.</span>page<span class="token punctuation">)</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zhuanlan.zhihu.com/p/20295971?spm=a2c4e.11153940.blogcont69516.18.4f275a00EzBHjr&amp;columnSlug=purerender</li>
<li>https://www.jianshu.com/p/7bf04638e82a</li>
</ul>
</div></template>


