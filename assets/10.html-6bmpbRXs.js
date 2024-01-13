import{_ as n,o as s,c as a,b as t}from"./app-du5sw6ua.js";const p={},e=t(`<h1 id="v-if-和-v-for-的优先级是什么" tabindex="-1"><a class="header-anchor" href="#v-if-和-v-for-的优先级是什么" aria-hidden="true">#</a> v-if 和 v-for 的优先级是什么？</h1><h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2><p>v-if 不能和 v-for 一起使用的原因是 v-for 的优先级比 v-if 高，先循环再做分支判断,一起使用会造成性能浪费 解决方案有两种:</p><ol><li><p>把 v-if 放在 v-for 的外层</p></li><li><p>把需要 v-for 的值先在计算属性中过滤一次</p></li></ol><p>最终结论：</p><p>v2 中：<code>v-for</code>优先级比<code>v-if</code>高</p><p>v3 中：<code>v-if</code>优先级比<code>v-for</code>高</p><p>使用过程中，不要把它们同时用在一个元素上。</p><h2 id="作用" tabindex="-1"><a class="header-anchor" href="#作用" aria-hidden="true">#</a> 作用</h2><p><code>v-if</code> 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 <code>true</code>值的时候被渲染</p><p><code>v-for</code> 指令基于一个数组来渲染一个列表。<code>v-for</code> 指令需要使用 <code>item in items</code> 形式的特殊语法，其中 <code>items</code> 是源数据数组或者对象，而 <code>item</code> 则是被迭代的数组元素的别名</p><p>在 <code>v-for</code> 的时候，建议设置<code>key</code>值，并且保证每个<code>key</code>值是独一无二的，这便于<code>diff</code>算法进行优化</p><p>两者在用法上</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Modal</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isShow<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item in items<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item.id<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    {{ item.label }}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="优先级" tabindex="-1"><a class="header-anchor" href="#优先级" aria-hidden="true">#</a> 优先级</h2><p><code>v-if</code>与<code>v-for</code>都是<code>vue</code>模板系统中的指令</p><p>在<code>vue</code>模板编译的时候，会将指令系统转化成可执行的<code>render</code>函数</p><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3><p>编写一个<code>p</code>标签，同时使用<code>v-if</code>与 <code>v-for</code></p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isShow<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item in items<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ item.title }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建<code>vue</code>实例，存放<code>isShow</code>与<code>items</code>数据</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;foo&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;baz&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">isShow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>items <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">0</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模板指令的代码都会生成在<code>render</code>函数中，通过<code>app.$options.render</code>就能得到渲染函数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>ƒ <span class="token function">anonymous</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">with</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span>
    <span class="token function">_c</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">attrs</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;app&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">_l</span><span class="token punctuation">(</span><span class="token punctuation">(</span>items<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">(</span>isShow<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token function">_c</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token function">_v</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span> <span class="token function">_s</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>title<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">_e</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>_l</code>是<code>vue</code>的列表渲染函数，函数内部都会进行一次<code>if</code>判断</p><p>初步得到结论：<code>v-for</code>优先级是比<code>v-if</code>高</p><p>再将<code>v-for</code>与<code>v-if</code>置于不同标签</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isShow<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item in items<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{item.title}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再输出下<code>render</code>函数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>ƒ <span class="token function">anonymous</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">with</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token keyword">return</span>
    <span class="token function">_c</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token literal-property property">attrs</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token string-property property">&quot;id&quot;</span><span class="token operator">:</span><span class="token string">&quot;app&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token punctuation">(</span>isShow<span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">[</span><span class="token function">_v</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">_l</span><span class="token punctuation">(</span><span class="token punctuation">(</span>items<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token keyword">return</span> <span class="token function">_c</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token function">_v</span><span class="token punctuation">(</span><span class="token function">_s</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>title<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">:</span><span class="token function">_e</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候我们可以看到，<code>v-for</code>与<code>v-if</code>作用在不同标签时候，是先进行判断，再进行列表的渲染</p><p>我们再在查看下<code>vue2</code>源码</p><p>源码位置：<code>\\vue-dev\\src\\compiler\\codegen\\index.js</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">genElement</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> ASTElement<span class="token punctuation">,</span> <span class="token literal-property property">state</span><span class="token operator">:</span> CodegenState</span><span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>parent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    el<span class="token punctuation">.</span>pre <span class="token operator">=</span> el<span class="token punctuation">.</span>pre <span class="token operator">||</span> el<span class="token punctuation">.</span>parent<span class="token punctuation">.</span>pre
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>staticRoot <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>el<span class="token punctuation">.</span>staticProcessed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">genStatic</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>once <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>el<span class="token punctuation">.</span>onceProcessed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">genOnce</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>for <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>el<span class="token punctuation">.</span>forProcessed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">genFor</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>if <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>el<span class="token punctuation">.</span>ifProcessed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">genIf</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>tag <span class="token operator">===</span> <span class="token string">&#39;template&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>el<span class="token punctuation">.</span>slotTarget <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>state<span class="token punctuation">.</span>pre<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">genChildren</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token string">&#39;void 0&#39;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>tag <span class="token operator">===</span> <span class="token string">&#39;slot&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">genSlot</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> state<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// component or element</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在进行<code>if</code>判断的时候，<code>v-for</code>是比<code>v-if</code>先进行判断</p><p>最终结论：</p><p>v2 中：<code>v-for</code>优先级比<code>v-if</code>高</p><p>v3 中：<code>v-if</code>优先级比<code>v-for</code>高</p><h2 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> 注意事项</h2><ol><li>永远不要把 <code>v-if</code> 和 <code>v-for</code> 同时用在同一个元素上</li><li>如果避免出现这种情况，则在外层嵌套<code>template</code>（页面渲染不生成<code>dom</code>节点），在这一层进行 v-if 判断，然后在内部进行 v-for 循环</li></ol><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isShow<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item in items<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>如果条件出现在循环内部，可通过计算属性<code>computed</code>提前过滤掉那些不需要显示的项</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">items</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> item<span class="token punctuation">.</span>isShow
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,43),o=[e];function c(l,u){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","10.html.vue"]]);export{k as default};
