<template><div><h1 id="如何实现jwt鉴权机制-说说你的思路" tabindex="-1"><a class="header-anchor" href="#如何实现jwt鉴权机制-说说你的思路" aria-hidden="true">#</a> 如何实现jwt鉴权机制？说说你的思路</h1>
<p><img src="https://static.vue-js.com/efff62b0-cd88-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>JWT（JSON Web Token），本质就是一个字符串书写规范，如下图，作用是用来在用户和服务器之间传递安全可靠的信息</p>
<p><img src="https://static.vue-js.com/052904c0-cd89-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>在目前前后端分离的开发过程中，使用<code v-pre>token</code>鉴权机制用于身份验证是最常见的方案，流程如下：</p>
<ul>
<li>服务器当验证用户账号和密码正确的时候，给用户颁发一个令牌，这个令牌作为后续用户访问一些接口的凭证</li>
<li>后续访问会根据这个令牌判断用户时候有权限进行访问</li>
</ul>
<p><code v-pre>Token</code>，分成了三部分，头部（Header）、载荷（Payload）、签名（Signature），并以<code v-pre>.</code>进行拼接。其中头部和载荷都是以<code v-pre>JSON</code>格式存放数据，只是进行了编码</p>
<p><img src="https://static.vue-js.com/1175f990-cd89-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h3 id="header" tabindex="-1"><a class="header-anchor" href="#header" aria-hidden="true">#</a> header</h3>
<p>每个JWT都会带有头部信息，这里主要声明使用的算法。声明算法的字段名为<code v-pre>alg</code>，同时还有一个<code v-pre>typ</code>的字段，默认<code v-pre>JWT</code>即可。以下示例中算法为HS256</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>  <span class="token string-property property">"alg"</span><span class="token operator">:</span> <span class="token string">"HS256"</span><span class="token punctuation">,</span>  <span class="token string-property property">"typ"</span><span class="token operator">:</span> <span class="token string">"JWT"</span> <span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因为JWT是字符串，所以我们还需要对以上内容进行Base64编码，编码后字符串如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9        
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="payload" tabindex="-1"><a class="header-anchor" href="#payload" aria-hidden="true">#</a> payload</h3>
<p>载荷即消息体，这里会存放实际的内容，也就是<code v-pre>Token</code>的数据声明，例如用户的<code v-pre>id</code>和<code v-pre>name</code>，默认情况下也会携带令牌的签发时间<code v-pre>iat</code>，通过还可以设置过期时间，如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">"sub"</span><span class="token operator">:</span> <span class="token string">"1234567890"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"name"</span><span class="token operator">:</span> <span class="token string">"John Doe"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"iat"</span><span class="token operator">:</span> <span class="token number">1516239022</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样进行Base64编码后，字符串如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="signature" tabindex="-1"><a class="header-anchor" href="#signature" aria-hidden="true">#</a> Signature</h3>
<p>签名是对头部和载荷内容进行签名，一般情况，设置一个<code v-pre>secretKey</code>，对前两个的结果进行<code v-pre>HMACSHA25</code>算法，公式如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Signature <span class="token operator">=</span> <span class="token constant">HMACSHA256</span><span class="token punctuation">(</span><span class="token function">base64Url</span><span class="token punctuation">(</span>header<span class="token punctuation">)</span><span class="token operator">+</span><span class="token punctuation">.</span><span class="token operator">+</span><span class="token function">base64Url</span><span class="token punctuation">(</span>payload<span class="token punctuation">)</span><span class="token punctuation">,</span>secretKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一旦前面两部分数据被篡改，只要服务器加密用的密钥没有泄露，得到的签名肯定和之前的签名不一致</p>
<h2 id="二、如何实现" tabindex="-1"><a class="header-anchor" href="#二、如何实现" aria-hidden="true">#</a> 二、如何实现</h2>
<p><code v-pre>Token</code>的使用分成了两部分：</p>
<ul>
<li>生成token：登录成功的时候，颁发token</li>
<li>验证token：访问某些资源或者接口时，验证token</li>
</ul>
<h3 id="生成-token" tabindex="-1"><a class="header-anchor" href="#生成-token" aria-hidden="true">#</a> 生成 token</h3>
<p>借助第三方库<code v-pre>jsonwebtoken</code>，通过<code v-pre>jsonwebtoken</code> 的 <code v-pre>sign</code> 方法生成一个 <code v-pre>token</code>：</p>
<ul>
<li>
<p>第一个参数指的是 Payload</p>
</li>
<li>
<p>第二个是秘钥，服务端特有</p>
</li>
<li>
<p>第三个参数是 option，可以定义 token 过期时间</p>
</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> crypto <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"crypto"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  jwt <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"jsonwebtoken"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// TODO:使用数据库</span>
<span class="token comment">// 这里应该是用数据库存储，这里只是演示用</span>
<span class="token keyword">let</span> userList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">UserController</span> <span class="token punctuation">{</span>
  <span class="token comment">// 用户登录</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> data <span class="token operator">=</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>body<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>data<span class="token punctuation">.</span>name <span class="token operator">||</span> <span class="token operator">!</span>data<span class="token punctuation">.</span>password<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token string">"000002"</span><span class="token punctuation">,</span> 
        <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">"参数不合法"</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> userList<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> item<span class="token punctuation">.</span>name <span class="token operator">===</span> data<span class="token punctuation">.</span>name <span class="token operator">&amp;&amp;</span> item<span class="token punctuation">.</span>password <span class="token operator">===</span> crypto<span class="token punctuation">.</span><span class="token function">createHash</span><span class="token punctuation">(</span><span class="token string">'md5'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>password<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">digest</span><span class="token punctuation">(</span><span class="token string">'hex'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 生成token</span>
      <span class="token keyword">const</span> token <span class="token operator">=</span> jwt<span class="token punctuation">.</span><span class="token function">sign</span><span class="token punctuation">(</span>  
        <span class="token punctuation">{</span>
          <span class="token literal-property property">name</span><span class="token operator">:</span> result<span class="token punctuation">.</span>name
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token string">"test_token"</span><span class="token punctuation">,</span> <span class="token comment">// secret</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">expiresIn</span><span class="token operator">:</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token punctuation">}</span> <span class="token comment">// 过期时间：60 * 60 s</span>
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token string">"0"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">"登录成功"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          token
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token string">"000002"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">"用户名或密码错误"</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> UserController<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在前端接收到<code v-pre>token</code>后，一般情况会通过<code v-pre>localStorage</code>进行缓存，然后将<code v-pre>token</code>放到<code v-pre>HTTP</code>请求头<code v-pre>Authorization</code> 中，关于<code v-pre>Authorization</code> 的设置，前面要加上 Bearer ，注意后面带有空格</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>axios<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token parameter">config</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> token <span class="token operator">=</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'token'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  config<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>common<span class="token punctuation">[</span><span class="token string">'Authorization'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'Bearer '</span> <span class="token operator">+</span> token<span class="token punctuation">;</span> <span class="token comment">// 留意这里的 Authorization</span>
  <span class="token keyword">return</span> config<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="校验token" tabindex="-1"><a class="header-anchor" href="#校验token" aria-hidden="true">#</a> 校验token</h3>
<p>使用 <code v-pre>koa-jwt</code> 中间件进行验证，方式比较简单</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">/</span> 注意：放在路由前面
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">koajwt</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">secret</span><span class="token operator">:</span> <span class="token string">'test_token'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">unless</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token comment">// 配置白名单</span>
  <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\/api\/register</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\/api\/login</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>secret 必须和 sign 时候保持一致</li>
<li>可以通过 unless 配置接口白名单，也就是哪些 URL 可以不用经过校验，像登陆/注册都可以不用校验</li>
<li>校验的中间件需要放在需要校验的路由前面，无法对前面的 URL 进行校验</li>
</ul>
<p>获取<code v-pre>token</code>用户的信息方法如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/api/userInfo'</span><span class="token punctuation">,</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span>next</span><span class="token punctuation">)</span> <span class="token operator">=></span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> authorization <span class="token operator">=</span>  ctx<span class="token punctuation">.</span>header<span class="token punctuation">.</span>authorization <span class="token comment">// 获取jwt</span>
    <span class="token keyword">const</span> token <span class="token operator">=</span> authorization<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">'Beraer '</span><span class="token punctuation">,</span><span class="token string">''</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> jwt<span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span>token<span class="token punctuation">,</span><span class="token string">'test_token'</span><span class="token punctuation">)</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> result
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：上述的<code v-pre>HMA256</code>加密算法为单秘钥的形式，一旦泄露后果非常的危险</p>
<p>在分布式系统中，每个子系统都要获取到秘钥，那么这个子系统根据该秘钥可以发布和验证令牌，但有些服务器只需要验证令牌</p>
<p>这时候可以采用非对称加密，利用私钥发布令牌，公钥验证令牌，加密算法可以选择<code v-pre>RS256</code></p>
<h2 id="三、优缺点" tabindex="-1"><a class="header-anchor" href="#三、优缺点" aria-hidden="true">#</a> 三、优缺点</h2>
<p>优点：</p>
<ul>
<li>json具有通用性，所以可以跨语言</li>
<li>组成简单，字节占用小，便于传输</li>
<li>服务端无需保存会话信息，很容易进行水平扩展</li>
<li>一处生成，多处使用，可以在分布式系统中，解决单点登录问题</li>
<li>可防护CSRF攻击</li>
</ul>
<p>缺点：</p>
<ul>
<li>payload部分仅仅是进行简单编码，所以只能用于存储逻辑必需的非敏感信息</li>
<li>需要保护好加密密钥，一旦泄露后果不堪设想</li>
<li>为避免token被劫持，最好使用https协议</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html</li>
<li>https://blog.wangjunfeng.com/post/golang-jwt/ /</li>
</ul>
</div></template>


