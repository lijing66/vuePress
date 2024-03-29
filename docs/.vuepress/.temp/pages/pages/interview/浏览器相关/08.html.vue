<template><div><h1 id="ajax原理是什么-如何实现" tabindex="-1"><a class="header-anchor" href="#ajax原理是什么-如何实现" aria-hidden="true">#</a> ajax原理是什么？如何实现？</h1>
<h2 id="ajax是什么" tabindex="-1"><a class="header-anchor" href="#ajax是什么" aria-hidden="true">#</a> ajax是什么</h2>
<p><code v-pre>AJAX</code>全称(Async Javascript and XML)</p>
<p>即异步的<code v-pre>JavaScript</code> 和<code v-pre>XML</code>，是一种创建交互式网页应用的网页开发技术，可以在不重新加载整个网页的情况下，与服务器交换数据，并且更新部分网页</p>
<p><code v-pre>Ajax</code>的原理简单来说通过<code v-pre>XmlHttpRequest</code>对象来向服务器发异步请求，从服务器获得数据，然后用<code v-pre>JavaScript</code>来操作<code v-pre>DOM</code>而更新页面</p>
<p>流程图如下：</p>
<p><img src="https://static.vue-js.com/af42de10-7b2a-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>下面举个例子：</p>
<p>领导想找小李汇报一下工作，就委托秘书去叫小李，自己就接着做其他事情，直到秘书告诉他小李已经到了，最后小李跟领导汇报工作</p>
<p><code v-pre>Ajax</code>请求数据流程与“领导想找小李汇报一下工作”类似，上述秘书就相当于<code v-pre>XMLHttpRequest</code>对象，领导相当于浏览器，响应数据相当于小李</p>
<p>浏览器可以发送<code v-pre>HTTP</code>请求后，接着做其他事情，等收到<code v-pre>XHR</code>返回来的数据再进行操作</p>
<h2 id="实现过程" tabindex="-1"><a class="header-anchor" href="#实现过程" aria-hidden="true">#</a> 实现过程</h2>
<p>实现 <code v-pre>Ajax</code>异步交互需要服务器逻辑进行配合，需要完成以下步骤：</p>
<ul>
<li>
<p>创建 <code v-pre>Ajax</code>的核心对象 <code v-pre>XMLHttpRequest</code>对象</p>
</li>
<li>
<p>通过 <code v-pre>XMLHttpRequest</code> 对象的 <code v-pre>open()</code> 方法与服务端建立连接</p>
</li>
<li>
<p>构建请求所需的数据内容，并通过<code v-pre>XMLHttpRequest</code> 对象的 <code v-pre>send()</code> 方法发送给服务器端</p>
</li>
<li>
<p>通过 <code v-pre>XMLHttpRequest</code> 对象提供的 <code v-pre>onreadystatechange</code> 事件监听服务器端你的通信状态</p>
</li>
<li>
<p>接受并处理服务端向客户端响应的数据结果</p>
</li>
<li>
<p>将处理结果更新到 <code v-pre>HTML</code>页面中</p>
</li>
</ul>
<h3 id="创建xmlhttprequest对象" tabindex="-1"><a class="header-anchor" href="#创建xmlhttprequest对象" aria-hidden="true">#</a> 创建XMLHttpRequest对象</h3>
<p>通过<code v-pre>XMLHttpRequest()</code> 构造函数用于初始化一个 <code v-pre>XMLHttpRequest</code> 实例对象</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="与服务器建立连接" tabindex="-1"><a class="header-anchor" href="#与服务器建立连接" aria-hidden="true">#</a> 与服务器建立连接</h3>
<p>通过 <code v-pre>XMLHttpRequest</code> 对象的 <code v-pre>open()</code> 方法与服务器建立连接</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> url<span class="token punctuation">,</span> <span class="token punctuation">[</span>async<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">,</span> user<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">,</span> password<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数说明：</p>
<ul>
<li>
<p><code v-pre>method</code>：表示当前的请求方式，常见的有<code v-pre>GET</code>、<code v-pre>POST</code></p>
</li>
<li>
<p><code v-pre>url</code>：服务端地址</p>
</li>
<li>
<p><code v-pre>async</code>：布尔值，表示是否异步执行操作，默认为<code v-pre>true</code></p>
</li>
<li>
<p><code v-pre>user</code>: 可选的用户名用于认证用途；默认为`null</p>
</li>
<li>
<p><code v-pre>password</code>: 可选的密码用于认证用途，默认为`null</p>
</li>
</ul>
<h3 id="给服务端发送数据" tabindex="-1"><a class="header-anchor" href="#给服务端发送数据" aria-hidden="true">#</a> 给服务端发送数据</h3>
<p>通过 <code v-pre>XMLHttpRequest</code> 对象的 <code v-pre>send()</code> 方法，将客户端页面的数据发送给服务端</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">[</span>body<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>body</code>: 在 <code v-pre>XHR</code> 请求中要发送的数据体，如果不传递数据则为 <code v-pre>null</code></p>
<p>如果使用<code v-pre>GET</code>请求发送数据的时候，需要注意如下：</p>
<ul>
<li>将请求数据添加到<code v-pre>open()</code>方法中的<code v-pre>url</code>地址中</li>
<li>发送请求数据中的<code v-pre>send()</code>方法中参数设置为<code v-pre>null</code></li>
</ul>
<h3 id="绑定onreadystatechange事件" tabindex="-1"><a class="header-anchor" href="#绑定onreadystatechange事件" aria-hidden="true">#</a> 绑定onreadystatechange事件</h3>
<p><code v-pre>onreadystatechange</code> 事件用于监听服务器端的通信状态，主要监听的属性为<code v-pre>XMLHttpRequest.readyState</code> ,</p>
<p>关于<code v-pre>XMLHttpRequest.readyState</code>属性有<strong>五个</strong>状态，如下图显示</p>
<p><img src="https://static.vue-js.com/9782fc90-7b31-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>只要 <code v-pre>readyState</code>属性值一变化，就会触发一次 <code v-pre>readystatechange</code> 事件</p>
<p><code v-pre>XMLHttpRequest.responseText</code>属性用于接收服务器端的响应结果</p>
<p>举个例子：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
request<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">// 整个请求过程完毕</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>status <span class="token operator">>=</span> <span class="token number">200</span> <span class="token operator">&amp;&amp;</span> request<span class="token punctuation">.</span>status <span class="token operator">&lt;=</span> <span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>responseText<span class="token punctuation">)</span> <span class="token comment">// 服务端返回的结果</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>status <span class="token operator">>=</span><span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"错误信息："</span> <span class="token operator">+</span> request<span class="token punctuation">.</span>status<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
request<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'POST'</span><span class="token punctuation">,</span><span class="token string">'http://xxxx'</span><span class="token punctuation">)</span>
request<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="封装" tabindex="-1"><a class="header-anchor" href="#封装" aria-hidden="true">#</a> 封装</h2>
<p>通过上面对<code v-pre>XMLHttpRequest</code>对象的了解，下面来封装一个简单的<code v-pre>ajax</code>请求</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">//封装一个ajax请求</span>
<span class="token keyword">function</span> <span class="token function">ajax</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//创建XMLHttpRequest对象</span>
    <span class="token keyword">const</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">//初始化参数的内容</span>
    options <span class="token operator">=</span> options <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    options<span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>type <span class="token operator">||</span> <span class="token string">'GET'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    options<span class="token punctuation">.</span>dataType <span class="token operator">=</span> options<span class="token punctuation">.</span>dataType <span class="token operator">||</span> <span class="token string">'json'</span>
    <span class="token keyword">const</span> params <span class="token operator">=</span> options<span class="token punctuation">.</span>data

    <span class="token comment">//发送请求</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">'GET'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'GET'</span><span class="token punctuation">,</span> options<span class="token punctuation">.</span>url <span class="token operator">+</span> <span class="token string">'?'</span> <span class="token operator">+</span> params<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
        xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">'POST'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'POST'</span><span class="token punctuation">,</span> options<span class="token punctuation">.</span>url<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
        xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span>

    <span class="token comment">//接收请求</span>
    xhr<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> status <span class="token operator">=</span> xhr<span class="token punctuation">.</span>status
            <span class="token keyword">if</span> <span class="token punctuation">(</span>status <span class="token operator">>=</span> <span class="token number">200</span> <span class="token operator">&amp;&amp;</span> status <span class="token operator">&lt;</span> <span class="token number">300</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                options<span class="token punctuation">.</span>success <span class="token operator">&amp;&amp;</span> options<span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>responseText<span class="token punctuation">,</span> xhr<span class="token punctuation">.</span>responseXML<span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                options<span class="token punctuation">.</span>fail <span class="token operator">&amp;&amp;</span> options<span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用方式如下</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">ajax</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">dataType</span><span class="token operator">:</span> <span class="token string">'json'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">'https://xxxx'</span><span class="token punctuation">,</span>
    <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">text<span class="token punctuation">,</span>xml</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">//请求成功后的回调函数</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">fail</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">status</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">////请求失败后的回调函数</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="promise封装ajax" tabindex="-1"><a class="header-anchor" href="#promise封装ajax" aria-hidden="true">#</a> promise封装ajax</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>funtion <span class="token function">myAjax</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">//创建XMLHttpRequest对象</span>
    <span class="token keyword">const</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">//初始化参数的内容</span>
    options <span class="token operator">=</span> options <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    options<span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>type <span class="token operator">||</span> <span class="token string">'GET'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    options<span class="token punctuation">.</span>dataType <span class="token operator">=</span> options<span class="token punctuation">.</span>dataType <span class="token operator">||</span> <span class="token string">'json'</span>
    <span class="token keyword">const</span> params <span class="token operator">=</span> options<span class="token punctuation">.</span>data

    <span class="token comment">//发送请求</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">'GET'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'GET'</span><span class="token punctuation">,</span> options<span class="token punctuation">.</span>url <span class="token operator">+</span> <span class="token string">'?'</span> <span class="token operator">+</span> params<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
        xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">'POST'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'POST'</span><span class="token punctuation">,</span> options<span class="token punctuation">.</span>url<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
        xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span>

    <span class="token comment">//接收请求</span>
    xhr<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> status <span class="token operator">=</span> xhr<span class="token punctuation">.</span>status
            <span class="token keyword">if</span> <span class="token punctuation">(</span>status <span class="token operator">>=</span> <span class="token number">200</span> <span class="token operator">&amp;&amp;</span> status <span class="token operator">&lt;</span> <span class="token number">300</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">resolve</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>responseText<span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token function">reject</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
                     
<span class="token comment">// 调用</span>
<span class="token function">myAjax</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="第三方的ajax" tabindex="-1"><a class="header-anchor" href="#第三方的ajax" aria-hidden="true">#</a> 第三方的ajax</h2>
<p>比原生ajax更加高级的内容是：fetch和axios。</p>
<p>其中fetch是属于原生的API，可以直接使用，而axios需要单独安装包才可以使用。</p>
</div></template>


