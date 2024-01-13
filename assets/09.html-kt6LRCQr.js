import{_ as n,o as s,c as a,a as t,b as p}from"./app-du5sw6ua.js";const e={},o=p(`<h2 id="_1-服务器代码-服务器使用的node-express搭建的" tabindex="-1"><a class="header-anchor" href="#_1-服务器代码-服务器使用的node-express搭建的" aria-hidden="true">#</a> 1-服务器代码 [服务器使用的node，express搭建的]</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;express&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> cors <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;cors&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">cors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/list&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">let</span> num <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    num<span class="token operator">++</span>
    list<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">src</span><span class="token operator">:</span> <span class="token string">&#39;https://img1.baidu.com/it/u=337195790,3454436041&amp;fm=253&amp;fmt=auto&amp;app=138&amp;f=PNG?w=300&amp;h=500&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">我是</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>num<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">号嘉宾</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">tid</span><span class="token operator">:</span> num<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;http://127.0.0.1:2000&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-前端代码-前端使用分页效果实现" tabindex="-1"><a class="header-anchor" href="#_2-前端代码-前端使用分页效果实现" aria-hidden="true">#</a> 2- 前端代码 [前端使用分页效果实现]</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span>
 <span class="token operator">*</span> @Descripttion<span class="token operator">:</span> 
 <span class="token operator">*</span> @Author<span class="token operator">:</span> voanit
 <span class="token operator">*</span> @Date<span class="token operator">:</span> <span class="token number">2022</span><span class="token operator">-</span><span class="token number">04</span><span class="token operator">-</span><span class="token number">22</span> <span class="token number">22</span><span class="token operator">:</span><span class="token number">25</span><span class="token operator">:</span><span class="token number">52</span>
 <span class="token operator">*</span> @LastEditors<span class="token operator">:</span> voanit
 <span class="token operator">*</span> @LastEditTime<span class="token operator">:</span> <span class="token number">2022</span><span class="token operator">-</span><span class="token number">04</span><span class="token operator">-</span><span class="token number">28</span> <span class="token number">14</span><span class="token operator">:</span><span class="token number">14</span><span class="token operator">:</span><span class="token number">44</span>
<span class="token operator">--</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">!</span><span class="token constant">DOCTYPE</span> html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>html lang<span class="token operator">=</span><span class="token string">&quot;en&quot;</span><span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>head<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>meta charset<span class="token operator">=</span><span class="token string">&quot;UTF-8&quot;</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>meta http<span class="token operator">-</span>equiv<span class="token operator">=</span><span class="token string">&quot;X-UA-Compatible&quot;</span> content<span class="token operator">=</span><span class="token string">&quot;IE=edge&quot;</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>meta name<span class="token operator">=</span><span class="token string">&quot;viewport&quot;</span> content<span class="token operator">=</span><span class="token string">&quot;width=device-width, initial-scale=1.0&quot;</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>title<span class="token operator">&gt;</span>Document<span class="token operator">&lt;</span><span class="token operator">/</span>title<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>script src<span class="token operator">=</span><span class="token string">&quot;https://cdn.bootcdn.net/ajax/libs/axios/0.26.1/axios.min.js&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>style<span class="token operator">&gt;</span>
    <span class="token operator">*</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">padding</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
      <span class="token literal-property property">margin</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    #container <span class="token punctuation">{</span>
      <span class="token literal-property property">height</span><span class="token operator">:</span> 100vh<span class="token punctuation">;</span>
      <span class="token literal-property property">overflow</span><span class="token operator">:</span> auto<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token punctuation">.</span>item <span class="token punctuation">{</span>
      <span class="token literal-property property">display</span><span class="token operator">:</span> flex<span class="token punctuation">;</span>
      <span class="token literal-property property">padding</span><span class="token operator">:</span> 10px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    img <span class="token punctuation">{</span>
      <span class="token literal-property property">width</span><span class="token operator">:</span> 150px<span class="token punctuation">;</span>
      <span class="token literal-property property">height</span><span class="token operator">:</span> 150px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>style<span class="token operator">&gt;</span>


<span class="token operator">&lt;</span><span class="token operator">/</span>head<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">&quot;container&quot;</span><span class="token operator">&gt;</span> <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> <span class="token operator">&lt;</span>script src<span class="token operator">=</span><span class="token string">&quot;./index.js&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span> <span class="token operator">--</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>

    <span class="token comment">// /* 1-直接渲染页面直接卡死 */</span>
    <span class="token comment">// const renderList = async () =&gt; {</span>
    <span class="token comment">//   console.time(&#39;列表时间&#39;)</span>
    <span class="token comment">//   const { data: list } = await axios.get(&#39;http://127.0.0.1:2000/list&#39;)</span>
    <span class="token comment">//   // 获取container对象</span>
    <span class="token comment">//   const container = document.getElementById(&#39;container&#39;)</span>
    <span class="token comment">//   var str = &#39;&#39;</span>
    <span class="token comment">//   list.forEach(item =&gt; {</span>
    <span class="token comment">//     str += \`&lt;div class=&#39;item&#39;&gt;&lt;span&gt;\${item.text}&lt;/span&gt;&lt;/div&gt;\`</span>
    <span class="token comment">//   })</span>
    <span class="token comment">//   container.innerHTML = str</span>
    <span class="token comment">//   console.timeEnd(&#39;列表时间&#39;)</span>
    <span class="token comment">// }</span>
    <span class="token comment">// renderList()</span>
    <span class="token comment">/* 2-分页渲染 */</span>
    <span class="token keyword">const</span> <span class="token function-variable function">renderList</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">time</span><span class="token punctuation">(</span><span class="token string">&#39;列表时间&#39;</span><span class="token punctuation">)</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token literal-property property">data</span><span class="token operator">:</span> list <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;http://127.0.0.1:2000/list&#39;</span><span class="token punctuation">)</span>
      <span class="token comment">// console.log(list);</span>
      <span class="token keyword">const</span> total <span class="token operator">=</span> list<span class="token punctuation">.</span>length <span class="token comment">// 总条数</span>
      <span class="token keyword">const</span> page <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">// 当前第一页</span>
      <span class="token keyword">const</span> limit <span class="token operator">=</span> <span class="token number">200</span> <span class="token comment">// 每页显示200条</span>
      <span class="token keyword">const</span> totalPage <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">ceil</span><span class="token punctuation">(</span>total <span class="token operator">/</span> limit<span class="token punctuation">)</span><span class="token comment">// 计算得到总页码数</span>

      <span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">page</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>page <span class="token operator">&gt;=</span> totalPage<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token comment">// 表示超出最大页码数或者理解成最后一页</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token comment">//每次循环渲染200条</span>
          <span class="token comment">/*
          page=0 [0,200]
          page=1 [200,400]
          ...
          一直page&gt;总页码数就终止递归次循环
          */</span>
          <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> page <span class="token operator">*</span> limit<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> page <span class="token operator">*</span> limit <span class="token operator">+</span> limit<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> item <span class="token operator">=</span> list<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token comment">// 获取200条中的每一项</span>
            <span class="token keyword">const</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span><span class="token comment">// 动态创建一个divv元素</span>
            div<span class="token punctuation">.</span>className <span class="token operator">=</span> <span class="token string">&#39;item&#39;</span><span class="token comment">// 定义一个name</span>
            div<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;span&gt;阿牛哥：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>item<span class="token punctuation">.</span>text<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;</span><span class="token template-punctuation string">\`</span></span> <span class="token comment">// 给每一项添加属性</span>
            container<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>div<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
          <span class="token function">render</span><span class="token punctuation">(</span>page <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token function">render</span><span class="token punctuation">(</span>page<span class="token punctuation">)</span>
      console<span class="token punctuation">.</span><span class="token function">timeEnd</span><span class="token punctuation">(</span><span class="token string">&#39;列表时间&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">renderList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function c(l,i){return s(),a("div",null,[t(`
 * @Author: lijing
 * @Date: 2023-12-15 23:12:54
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-17 21:14:30
 * @Description: 
`),o])}const u=n(e,[["render",c],["__file","09.html.vue"]]);export{u as default};
