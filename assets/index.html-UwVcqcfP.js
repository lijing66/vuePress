import{_ as n,o as s,c as a,a as e,b as t}from"./app-du5sw6ua.js";const p={},c=t(`<h1 id="测试功能-此栏目以下文件暂时放置后续修改" tabindex="-1"><a class="header-anchor" href="#测试功能-此栏目以下文件暂时放置后续修改" aria-hidden="true">#</a> 测试功能（此栏目以下文件暂时放置后续修改）</h1><p>下列正则需要在vscode中使用，爬虫copy下页面后，用来处理下列展示</p><blockquote><p>这个正则表达式的含义是：匹配以一位数字或两位数字开头的行，或者匹配至少3行连续的空白行。在VS Code的搜索框中输入这个正则表达式，然后点击搜索按钮，就可以找到同时满足这两个条件的行了。</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token operator">^</span>\\d<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token operator">+</span>$\\n<span class="token operator">|</span><span class="token operator">^</span>\\s<span class="token operator">*</span>$\\<span class="token function">n</span><span class="token punctuation">(</span><span class="token parameter">\\s<span class="token operator">*</span>$\\n</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token punctuation">}</span>
  <span class="token comment">// 解决下列展示占位</span>
  <span class="token number">1</span>  
  <span class="token number">2</span>  
  <span class="token number">3</span>  
  <span class="token number">4</span>  
  <span class="token number">5</span>  
  <span class="token number">6</span>  
  <span class="token number">7</span>  
  <span class="token number">8</span>  
  <span class="token number">9</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function o(i,l){return s(),a("div",null,[e(`
 * @Author: lijing
 * @Date: 2023-11-23 11:48:16
 * @LastEditors: lijing
 * @LastEditTime: 2024-01-13 18:43:51
 * @Description: 
`),c])}const u=n(p,[["render",o],["__file","index.html.vue"]]);export{u as default};
