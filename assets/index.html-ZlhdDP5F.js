import{_ as n,o as s,c as a,a as e,b as p}from"./app-du5sw6ua.js";const t={},o=p(`<h1 id="这是记录搬迁了面试题的地方" tabindex="-1"><a class="header-anchor" href="#这是记录搬迁了面试题的地方" aria-hidden="true">#</a> 这是记录搬迁了面试题的地方</h1><p><code>todo -----------------------&gt; 图片还没有引入成为本地需要解决，防止人家下线无法使用</code></p><h1 id="下面是两种sidebar使用方式-面试记录栏目使用第一种比较繁琐" tabindex="-1"><a class="header-anchor" href="#下面是两种sidebar使用方式-面试记录栏目使用第一种比较繁琐" aria-hidden="true">#</a> 下面是两种sidebar使用方式（面试记录栏目使用第一种比较繁琐）</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token punctuation">{</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;面试记录&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">// 是否折叠</span>
    <span class="token literal-property property">collapsible</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token comment">// 自动生成标题为目录的层级--层级对照-标题 # ## ### #### 1234级别标题</span>
    <span class="token comment">// 注意生成层级需要使用第二种方式</span>
    <span class="token literal-property property">sidebarDepth</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;自定义md菜单名称&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">sidebarDepth</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
        <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&quot;/xxx/aa.md&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 这种方式好处是，直接生成，标题索引目录，在侧边栏</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;面试记录&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">// 是否折叠</span>
    <span class="token literal-property property">collapsible</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">sidebarDepth</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token comment">// 菜单名称会根据aa.md中的第一个标题名称生成</span>
      <span class="token string">&#39;/xxx/aa.md&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;/xxx/bb.md&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function l(i,c){return s(),a("div",null,[e(`
 * @Author: lijing
 * @Date: 2023-11-23 11:48:23
 * @LastEditors: lijing
 * @LastEditTime: 2024-01-13 18:41:33
 * @Description: 
`),o])}const u=n(t,[["render",l],["__file","index.html.vue"]]);export{u as default};
