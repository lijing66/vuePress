<template><div><h1 id="bom的理解-常见的bom对象哪些" tabindex="-1"><a class="header-anchor" href="#bom的理解-常见的bom对象哪些" aria-hidden="true">#</a> BOM的理解，常见的BOM对象哪些？</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><code v-pre>BOM</code> (Browser Object Model)，浏览器对象模型，提供了独立于内容与浏览器窗口进行交互的对象</p>
<p>其作用就是跟浏览器做一些交互效果,比如如何进行页面的后退，前进，刷新，浏览器的窗口发生变化，滚动条的滚动，以及获取客户的一些信息如：浏览器品牌版本，屏幕分辨率</p>
<p>浏览器的全部内容可以看成<code v-pre>DOM</code>，整个浏览器可以看成<code v-pre>BOM</code>。区别如下：</p>
<p>DOM:</p>
<ul>
<li>文档对象模型</li>
</ul>
<p><img src="https://static.vue-js.com/482f33e0-8089-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h2 id="二、window" tabindex="-1"><a class="header-anchor" href="#二、window" aria-hidden="true">#</a> 二、window</h2>
<p><code v-pre>Bom</code>的核心对象是<code v-pre>window</code>，它表示浏览器的一个实例</p>
<p>在浏览器中，<code v-pre>window</code>对象有双重角色，即是浏览器窗口的一个接口，又是全局对象</p>
<p>因此所有在全局作用域中声明的变量、函数都会变成<code v-pre>window</code>对象的属性和方法</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'js每日一题'</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">lookName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//js每日一题</span>
<span class="token function">lookName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                <span class="token comment">//js每日一题</span>
window<span class="token punctuation">.</span><span class="token function">lookName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>         <span class="token comment">//js每日一题</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于窗口控制方法如下：</p>
<ul>
<li><code v-pre>moveBy(x,y)</code>：从当前位置水平移动窗体x个像素，垂直移动窗体y个像素，x为负数，将向左移动窗体，y为负数，将向上移动窗体</li>
<li><code v-pre>moveTo(x,y)</code>：移动窗体左上角到相对于屏幕左上角的(x,y)点</li>
<li><code v-pre>resizeBy(w,h)</code>：相对窗体当前的大小，宽度调整w个像素，高度调整h个像素。如果参数为负值，将缩小窗体，反之扩大窗体</li>
<li><code v-pre>resizeTo(w,h)</code>：把窗体宽度调整为w个像素，高度调整为h个像素</li>
<li><code v-pre>scrollTo(x,y)</code>：如果有滚动条，将横向滚动条移动到相对于窗体宽度为x个像素的位置，将纵向滚动条移动到相对于窗体高度为y个像素的位置</li>
<li><code v-pre>scrollBy(x,y)</code>： 如果有滚动条，将横向滚动条向左移动x个像素，将纵向滚动条向下移动y个像素</li>
</ul>
<p><code v-pre>window.open()</code> 既可以导航到一个特定的<code v-pre>url</code>，也可以打开一个新的浏览器窗口</p>
<p>如果 <code v-pre>window.open()</code> 传递了第二个参数，且该参数是已有窗口或者框架的名称，那么就会在目标窗口加载第一个参数指定的URL</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'htttp://www.vue3js.cn'</span><span class="token punctuation">,</span><span class="token string">'topFrame'</span><span class="token punctuation">)</span>
<span class="token operator">==</span><span class="token operator">></span> <span class="token operator">&lt;</span> a href<span class="token operator">=</span><span class="token string">" "</span> target<span class="token operator">=</span><span class="token string">"topFrame"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span> a<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>window.open()</code> 会返回新窗口的引用，也就是新窗口的 <code v-pre>window</code> 对象</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> myWin <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'http://www.vue3js.cn'</span><span class="token punctuation">,</span><span class="token string">'myWin'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>window.close()</code> 仅用于通过 <code v-pre>window.open()</code> 打开的窗口</p>
<p>新创建的 <code v-pre>window</code> 对象有一个 <code v-pre>opener</code> 属性，该属性指向打开他的原始窗口对象</p>
<h2 id="三、location" tabindex="-1"><a class="header-anchor" href="#三、location" aria-hidden="true">#</a> 三、location</h2>
<p><code v-pre>url</code>地址如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">http</span><span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>foouser<span class="token operator">:</span>barpassword@www<span class="token punctuation">.</span>wrox<span class="token punctuation">.</span>com<span class="token operator">:</span><span class="token number">80</span><span class="token operator">/</span>WileyCDA<span class="token operator">/</span><span class="token operator">?</span>q<span class="token operator">=</span>javascript#contents
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>location</code>属性描述如下：</p>
<table>
<thead>
<tr>
<th>属性名</th>
<th>例子</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>hash</td>
<td>&quot;#contents&quot;</td>
<td>utl中#后面的字符，没有则返回空串</td>
</tr>
<tr>
<td>host</td>
<td>www.wrox.com:80</td>
<td>服务器名称和端口号</td>
</tr>
<tr>
<td>hostname</td>
<td>www.wrox.com</td>
<td>域名，不带端口号</td>
</tr>
<tr>
<td>href</td>
<td>http://www.wrox.com:80/WileyCDA/?q=javascript#contents</td>
<td>完整url</td>
</tr>
<tr>
<td>pathname</td>
<td>&quot;/WileyCDA/&quot;</td>
<td>服务器下面的文件路径</td>
</tr>
<tr>
<td>port</td>
<td>80</td>
<td>url的端口号，没有则为空</td>
</tr>
<tr>
<td>protocol</td>
<td>http:</td>
<td>使用的协议</td>
</tr>
<tr>
<td>search</td>
<td>?q=javascript</td>
<td>url的查询字符串，通常为？后面的内容</td>
</tr>
</tbody>
</table>
<p>除了 <code v-pre>hash</code>之外，只要修改<code v-pre>location</code>的一个属性，就会导致页面重新加载新<code v-pre>URL</code></p>
<p><code v-pre>location.reload()</code>，此方法可以重新刷新当前页面。这个方法会根据最有效的方式刷新页面，如果页面自上一次请求以来没有改变过，页面就会从浏览器缓存中重新加载</p>
<p>如果要强制从服务器中重新加载，传递一个参数<code v-pre>true</code>即可</p>
<h2 id="四、navigator" tabindex="-1"><a class="header-anchor" href="#四、navigator" aria-hidden="true">#</a> 四、navigator</h2>
<p><code v-pre>navigator</code> 对象主要用来获取浏览器的属性，区分浏览器类型。属性较多，且兼容性比较复杂</p>
<p>下表列出了<code v-pre>navigator</code>对象接口定义的属性和方法：</p>
<p><img src="https://static.vue-js.com/6797ab40-8089-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p><img src="https://static.vue-js.com/74096620-8089-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="五、screen" tabindex="-1"><a class="header-anchor" href="#五、screen" aria-hidden="true">#</a> 五、screen</h2>
<p>保存的纯粹是客户端能力信息，也就是浏览器窗口外面的客户端显示器的信息，比如像素宽度和像素高度</p>
<p><img src="https://static.vue-js.com/7d6b21e0-8089-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h2 id="六、history" tabindex="-1"><a class="header-anchor" href="#六、history" aria-hidden="true">#</a> 六、history</h2>
<p><code v-pre>history</code>对象主要用来操作浏览器<code v-pre>URL</code>的历史记录，可以通过参数向前，向后，或者向指定<code v-pre>URL</code>跳转</p>
<p>常用的属性如下：</p>
<ul>
<li><code v-pre>history.go()</code></li>
</ul>
<p>接收一个整数数字或者字符串参数：向最近的一个记录中包含指定字符串的页面跳转，</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>history<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token string">'maixaofei.com'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当参数为整数数字的时候，正数表示向前跳转指定的页面，负数为向后跳转指定的页面</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>history<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token comment">//向前跳转三个记录</span>
history<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">//向后跳转一个记录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>history.forward()</code>：向前跳转一个页面</li>
<li><code v-pre>history.back()</code>：向后跳转一个页面</li>
<li><code v-pre>history.length</code>：获取历史记录数</li>
</ul>
</div></template>


