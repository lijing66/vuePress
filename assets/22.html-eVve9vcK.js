import{_ as n,o as s,c as a,a as t,b as p}from"./app-du5sw6ua.js";const e={},o=p(`<h1 id="下划线字符串转换成驼峰" tabindex="-1"><a class="header-anchor" href="#下划线字符串转换成驼峰" aria-hidden="true">#</a> 下划线字符串转换成驼峰</h1><h2 id="下划线转成驼峰-题目说明" tabindex="-1"><a class="header-anchor" href="#下划线转成驼峰-题目说明" aria-hidden="true">#</a> 下划线转成驼峰-题目说明</h2><p>实现一个方法 camel()，将输入的下划线风格的字符串转换成驼峰风格，举例：</p><ul><li>user_name 转换成 userName</li><li>fate_stay_night 转换成 fateStayNight</li><li>you_are_LUCKY 转换成 youAreLucky</li><li>出现在其他位置的 _ 直接忽略，举例： <code>_page_title</code> 转换成 <code>pageTitle</code>, <code>__mem_cache__</code> 转换成 <code>memCache</code></li></ul><h2 id="参考代码" tabindex="-1"><a class="header-anchor" href="#参考代码" aria-hidden="true">#</a> 参考代码</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">camel</span><span class="token punctuation">(</span><span class="token parameter">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">// 转成全小写</span>
  string <span class="token operator">=</span> string<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// 用正则去掉前后的_</span>
  <span class="token keyword">var</span> words <span class="token operator">=</span> string<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^_{1,}|_{1,}$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// 拆成数组</span>
  words <span class="token operator">=</span> words<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;_&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> camelString <span class="token operator">=</span> words<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token comment">// 遍历  </span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> words<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> str<span class="token operator">=</span> words<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token comment">// 第一个字母大写</span>
    camelString <span class="token operator">+=</span> str<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> str<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> camelString<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">camel</span><span class="token punctuation">(</span><span class="token string">&#39;user_name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">camel</span><span class="token punctuation">(</span><span class="token string">&#39;fate_stay_night&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">camel</span><span class="token punctuation">(</span><span class="token string">&#39;you_are_LUCKY&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">camel</span><span class="token punctuation">(</span><span class="token string">&#39;_page_title&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">camel</span><span class="token punctuation">(</span><span class="token string">&#39;__mem_cache__&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function c(l,i){return s(),a("div",null,[t(`
 * @Author: lijing
 * @Date: 2023-12-15 23:12:55
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-17 21:16:25
 * @Description: 
`),o])}const r=n(e,[["render",c],["__file","22.html.vue"]]);export{r as default};