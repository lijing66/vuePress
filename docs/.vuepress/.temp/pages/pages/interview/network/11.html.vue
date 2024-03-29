<template><div><h1 id="web-常见的web攻击方式有哪些-如何防御" tabindex="-1"><a class="header-anchor" href="#web-常见的web攻击方式有哪些-如何防御" aria-hidden="true">#</a> web 常见的web攻击方式有哪些？如何防御？</h1>
<h2 id="web攻击" tabindex="-1"><a class="header-anchor" href="#web攻击" aria-hidden="true">#</a> web攻击</h2>
<p>Web 攻击是针对用户上网行为或网站服务器等设备进行攻击的行为，如植入恶意代码，修改网站权限，获取网站用户隐私信息等等。</p>
<p>我们常见的 Web 攻击方式有：</p>
<ul>
<li>XSS (Cross Site Scripting) 跨站脚本攻击</li>
<li>CSRF（Cross-site request forgery）跨站请求伪造</li>
<li>SQL 注入</li>
</ul>
<h2 id="xss-xss-攻击" tabindex="-1"><a class="header-anchor" href="#xss-xss-攻击" aria-hidden="true">#</a> XSS(xss)攻击</h2>
<p>XSS 攻击指的是跨站脚本攻击，是一种代码注入攻击。攻击者通过在网站注入恶意脚本，使之在用户的浏览器上运行，从而盗取用户的信息如 cookie 等。</p>
<p>XSS 的本质是因为网站没有对恶意代码进行过滤，与正常的代码混合在一起了，浏览器没有办法分辨哪些脚本是可信的，从而导致了恶意代码的执行。</p>
<p>XSS 一般分为: 存储型、反射型和 DOM 型。</p>
<ul>
<li>
<p>存储型指的是恶意代码提交到了网站的数据库中，当用户请求数据的时候，服务器将其拼接为 HTML 后返回给了用户，从而导致了恶意代码的执行。</p>
</li>
<li>
<p>反射型指的是攻击者构建了特殊的 URL，当服务器接收到请求后，从 URL 中获取数据，拼接到 HTML 后返回，从而导致了恶意代码的执行。</p>
</li>
<li>
<p>DOM 型指的是攻击者构建了特殊的 URL，用户打开网站后，js 脚本从 URL 中获取数据，从而导致了恶意代码的执行。</p>
</li>
</ul>
<h2 id="xss-攻击的预防" tabindex="-1"><a class="header-anchor" href="#xss-攻击的预防" aria-hidden="true">#</a> XSS 攻击的预防</h2>
<p>XSS 攻击的预防可以从两个方面入手：</p>
<ol>
<li>恶意代码提交的时处理</li>
<li>是浏览器执行恶意代码处理</li>
</ol>
<p>对于第一个方面，如果我们对存入数据库的数据都进行的转义处理，但是一个数据可能在多个地方使用，有的地方可能不需要转义，由于我们没有办法判断数据最后的使用场景，所以直接在输入端进行恶意代码的处理，其实是不太可靠的。</p>
<p>从浏览器的执行来进行预防，一种是使用纯前端的方式，不用服务器端拼接后返回。另一种是对需要插入到 HTML 中的代码做好充分的<code v-pre>转义</code>。对于 DOM 型的攻击，主要是前端脚本的不可靠而造成的，我们对于数据获取渲染和字符串拼接的时候应该对可能出现的恶意代码情况进行判断。</p>
<p>还有一些方式，比如使用 CSP ，CSP 的本质是建立一个白名单，告诉浏览器哪些外部资源可以加载和执行，从而防止恶意代码的注入攻击。</p>
<p>还可以对一些敏感信息进行保护，比如 cookie 使用 http-only ，使得脚本无法获取。也可以使用验证码，避免脚本伪装成用户执行一些操作。</p>
<h2 id="csrf-攻击" tabindex="-1"><a class="header-anchor" href="#csrf-攻击" aria-hidden="true">#</a> CSRF 攻击</h2>
<p>CSRF 攻击指的是跨站请求伪造攻击，攻击者诱导用户进入一个第三方网站，然后该网站向被攻击网站发送跨站请求。如果用户在被攻击网站中保存了登录状态，那么攻击者就可以利用这个登录状态，绕过后台的用户验证，冒充用户向服务器执行一些操作。</p>
<p>CSRF 攻击的本质是利用了 cookie 会在同源请求中携带发送给服务器的特点，以此来实现用户的冒充。</p>
<p>一般的 CSRF 攻击类型有三种：</p>
<ol>
<li>
<p>GET 类型的 CSRF 攻击，比如在网站中的一个 img 标签里构建一个请求，当用户打开这个网站的时候就会自动发起提交。</p>
</li>
<li>
<p>POST 类型的 CSRF 攻击，比如说构建一个表单，然后隐藏它，当用户进入页面时，自动提交这个表单。</p>
</li>
<li>
<p>链接类型的 CSRF 攻击，比如说在 a 标签的 href 属性里构建一个请求，然后诱导用户去点击。</p>
</li>
</ol>
<p>CSRF 可以用下面几种方法来防护：</p>
<p>第一种是同源检测的方法，服务器根据 http 请求头中 origin 或者 referer 信息来判断请求是否为允许访问的站点，从而对请求进行过滤。当 origin 或者 referer 信息都不存在的时候，直接阻止。这种方式的缺点是有些情况下 referer 可以被伪造。还有就是我们这种方法同时把搜索引擎的链接也给屏蔽了，所以一般网站会允许搜索引擎的页面请求，但是相应的页面请求这种请求方式也可能被攻击者给利用。</p>
<p>第二种方法是使用 CSRF Token 来进行验证，服务器向用户返回一个随机数 Token ，当网站再次发起请求时，在请求参数中加入服务器端返回的 token ，然后服务器对这个 token 进行验证。这种方法解决了使用 cookie 单一验证方式时，可能会被冒用的问题，但是这种方法存在一个缺点就是，我们需要给网站中的所有请求都添加上这个 token，操作比较繁琐。还有一个问题是一般不会只有一台网站服务器，如果我们的请求经过负载平衡转移到了其他的服务器，但是这个服务器的 session 中没有保留这个 token 的话，就没有办法验证了。这种情况我们可以通过改变 token 的构建方式来解决。</p>
<p>第三种方式使用双重 Cookie 验证的办法，服务器在用户访问网站页面时，向请求域名注入一个 Cookie，内容为随机字符串，然后当用户再次向服务器发送请求的时候，从 cookie 中取出这个字符串，添加到 URL 参数中，然后服务器通过对 cookie 中的数据和参数中的数据进行比较，来进行验证。使用这种方式是利用了攻击者只能利用 cookie，但是不能访问获取 cookie 的特点。并且这种方法比 CSRF Token 的方法更加方便，并且不涉及到分布式访问的问题。这种方法的缺点是如果网站存在 XSS 漏洞的，那么这种方式会失效。同时这种方式不能做到子域名的隔离。</p>
<p>第四种方式是使用在设置 cookie 属性的时候设置 Samesite ，限制 cookie 不能作为被第三方使用，从而可以避免被攻击者利用。Samesite 一共有两种模式，一种是严格模式，在严格模式下 cookie 在任何情况下都不可能作为第三方 Cookie 使用，在宽松模式下，cookie 可以被请求是 GET 请求，且会发生页面跳转的请求所使用。</p>
<h2 id="xss详解" tabindex="-1"><a class="header-anchor" href="#xss详解" aria-hidden="true">#</a> XSS详解</h2>
<p>XSS，跨站脚本攻击，允许攻击者将恶意代码植入到提供给其它用户使用的页面中</p>
<p><code v-pre>XSS</code>涉及到三方，即攻击者、客户端与<code v-pre>Web</code>应用</p>
<p><code v-pre>XSS</code>的攻击目标是为了盗取存储在客户端的<code v-pre>cookie</code>或者其他网站用于识别客户端身份的敏感信息。一旦获取到合法用户的信息后，攻击者甚至可以假冒合法用户与网站进行交互</p>
<p>举个例子：</p>
<p>一个搜索页面，根据<code v-pre>url</code>参数决定关键词的内容</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>&lt;%= getParameter(<span class="token punctuation">"</span></span><span class="token attr-name">keyword")</span> <span class="token attr-name">%</span><span class="token punctuation">></span></span>">
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>搜索<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>您搜索的关键词是：&lt;%= getParameter("keyword") %><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里看似并没有问题，但是如果不按套路出牌呢？</p>
<p>用户输入<code v-pre>&quot;&gt;&lt;script&gt;alert('XSS');&lt;/script&gt;</code>，拼接到 HTML 中返回给浏览器。形成了如下的 HTML：</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'XSS'</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
">
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>搜索<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  您搜索的关键词是：">
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'XSS'</span><span class="token punctuation">)</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器无法分辨出 <code v-pre>&lt;script&gt;alert('XSS');&lt;/script&gt;</code> 是恶意代码，因而将其执行，试想一下，如果是获取<code v-pre>cookie</code>发送对黑客服务器呢？</p>
<p>根据攻击的来源，<code v-pre>XSS</code>攻击可以分成：</p>
<ul>
<li>存储型</li>
<li>反射型</li>
<li>DOM 型</li>
</ul>
<h3 id="存储型" tabindex="-1"><a class="header-anchor" href="#存储型" aria-hidden="true">#</a> 存储型</h3>
<p>存储型 XSS 的攻击步骤：</p>
<ol>
<li>攻击者将恶意代码提交到目标网站的数据库中</li>
<li>用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器</li>
<li>用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行</li>
<li>恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作</li>
</ol>
<p>这种攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等</p>
<h3 id="反射型-xss" tabindex="-1"><a class="header-anchor" href="#反射型-xss" aria-hidden="true">#</a> 反射型 XSS</h3>
<p>反射型 XSS 的攻击步骤：</p>
<ol>
<li>攻击者构造出特殊的 URL，其中包含恶意代码</li>
<li>用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器</li>
<li>用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行</li>
<li>恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作</li>
</ol>
<p>反射型 XSS 跟存储型 XSS 的区别是：存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里。</p>
<p>反射型 XSS 漏洞常见于通过 URL 传递参数的功能，如网站搜索、跳转等。</p>
<p>由于需要用户主动打开恶意的 URL 才能生效，攻击者往往会结合多种手段诱导用户点击。</p>
<p>POST 的内容也可以触发反射型 XSS，只不过其触发条件比较苛刻（需要构造表单提交页面，并引导用户点击），所以非常少见</p>
<h3 id="dom-型-xss" tabindex="-1"><a class="header-anchor" href="#dom-型-xss" aria-hidden="true">#</a> DOM 型 XSS</h3>
<p>DOM 型 XSS 的攻击步骤：</p>
<ol>
<li>攻击者构造出特殊的 URL，其中包含恶意代码</li>
<li>用户打开带有恶意代码的 URL</li>
<li>用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行</li>
<li>恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作</li>
</ol>
<p>DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞</p>
<h3 id="xss-的预防" tabindex="-1"><a class="header-anchor" href="#xss-的预防" aria-hidden="true">#</a> XSS 的预防</h3>
<p>通过前面介绍，看到<code v-pre>XSS</code>攻击的两大要素：</p>
<ul>
<li>攻击者提交而恶意代码</li>
<li>浏览器执行恶意代码</li>
</ul>
<p>针对第一个要素，我们在用户输入的过程中，过滤掉用户输入的恶劣代码，然后提交给后端，但是如果攻击者绕开前端请求，直接构造请求就不能预防了</p>
<p>而如果在后端写入数据库前，对输入进行过滤，然后把内容给前端，但是这个内容在不同地方就会有不同显示</p>
<p>例如：</p>
<p>一个正常的用户输入了 <code v-pre>5 &lt; 7</code> 这个内容，在写入数据库前，被转义，变成了 <code v-pre>5 &lt; 7</code></p>
<p>在客户端中，一旦经过了 <code v-pre>escapeHTML()</code>，客户端显示的内容就变成了乱码( <code v-pre>5 &lt; 7</code> )</p>
<p>在前端中，不同的位置所需的编码也不同。</p>
<ul>
<li>当 <code v-pre>5 &lt; 7</code> 作为 HTML 拼接页面时，可以正常显示：</li>
</ul>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>comment<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>5 <span class="token entity named-entity" title="&lt;">&amp;lt;</span> 7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>当 <code v-pre>5 &lt; 7</code> 通过 Ajax 返回，然后赋值给 JavaScript 的变量时，前端得到的字符串就是转义后的字符。这个内容不能直接用于 Vue 等模板的展示，也不能直接用于内容长度计算。不能用于标题、alert 等</li>
</ul>
<p>可以看到，过滤并非可靠的，下面就要通过防止浏览器执行恶意代码：</p>
<p>在使用 <code v-pre>.innerHTML</code>、<code v-pre>.outerHTML</code>、<code v-pre>document.write()</code> 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 <code v-pre>.textContent</code>、<code v-pre>.setAttribute()</code> 等</p>
<p>如果用 <code v-pre>Vue/React</code> 技术栈，并且不使用 <code v-pre>v-html</code>/<code v-pre>dangerouslySetInnerHTML</code> 功能，就在前端 <code v-pre>render</code> 阶段避免 <code v-pre>innerHTML</code>、<code v-pre>outerHTML</code> 的 XSS 隐患</p>
<p>DOM 中的内联事件监听器，如 <code v-pre>location</code>、<code v-pre>onclick</code>、<code v-pre>onerror</code>、<code v-pre>onload</code>、<code v-pre>onmouseover</code> 等，<code v-pre>&lt;a&gt;</code> 标签的 <code v-pre>href</code> 属性，JavaScript 的 <code v-pre>eval()</code>、<code v-pre>setTimeout()</code>、<code v-pre>setInterval()</code> 等，都能把字符串作为代码运行。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- 链接内包含恶意代码 --></span>
&lt; a href=" ">1&lt;/ a>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span>
// setTimeout()/setInterval() 中调用恶意代码
setTimeout("UNTRUSTED")
setInterval("UNTRUSTED")

// location 调用恶意代码
location.href = 'UNTRUSTED'

// eval() 中调用恶意代码
eval("UNTRUSTED")
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="csrf" tabindex="-1"><a class="header-anchor" href="#csrf" aria-hidden="true">#</a> CSRF</h2>
<p>CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求</p>
<p>利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目</p>
<p>一个典型的 CSRF 攻击有着如下的流程：</p>
<ul>
<li>受害者登录 a.com，并保留了登录凭证（Cookie）</li>
<li>攻击者引诱受害者访问了 b.com</li>
<li>b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会默认携带 a.com 的 Cookie</li>
<li>a.com 接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求</li>
<li>a.com 以受害者的名义执行了 act=xx</li>
<li>攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让 a.com 执行了自己定义的操作</li>
</ul>
<p><code v-pre>csrf</code>可以通过<code v-pre>get</code>请求，即通过访问<code v-pre>img</code>的页面后，浏览器自动访问目标地址，发送请求</p>
<p>同样，也可以设置一个自动提交的表单发送<code v-pre>post</code>请求，如下：</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://bank.example/withdraw<span class="token punctuation">"</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>POST</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hidden<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>account<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>xiaoming<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hidden<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>amount<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>10000<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hidden<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>for<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hacker<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"> document<span class="token punctuation">.</span>forms<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问该页面后，表单会自动提交，相当于模拟用户完成了一次<code v-pre>POST</code>操作</p>
<p>还有一种为使用<code v-pre>a</code>标签的，需要用户点击链接才会触发</p>
<p>访问该页面后，表单会自动提交，相当于模拟用户完成了一次 POST 操作</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code>&lt; a href="http://test.com/csrf/withdraw.php?amount=1000&amp;for=hacker" taget="_blank"> 重磅消息！！ <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="csrf-的特点" tabindex="-1"><a class="header-anchor" href="#csrf-的特点" aria-hidden="true">#</a> CSRF 的特点</h3>
<ul>
<li>攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生</li>
<li>攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据</li>
<li>整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”</li>
<li>跨站请求可以用各种方式：图片 URL、超链接、CORS、Form 提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪</li>
</ul>
<h3 id="csrf-的预防" tabindex="-1"><a class="header-anchor" href="#csrf-的预防" aria-hidden="true">#</a> CSRF 的预防</h3>
<p>CSRF 通常从第三方网站发起，被攻击的网站无法防止攻击发生，只能通过增强自己网站针对 CSRF 的防护能力来提升安全性</p>
<p>防止<code v-pre>csrf</code>常用方案如下：</p>
<ul>
<li>阻止不明外域的访问
<ul>
<li>同源检测</li>
<li>Samesite Cookie</li>
</ul>
</li>
<li>提交时要求附加本域才能获取的信息
<ul>
<li>CSRF Token</li>
<li>双重 Cookie 验证</li>
</ul>
</li>
</ul>
<p>这里主要讲讲<code v-pre>token</code>这种形式，流程如下：</p>
<ul>
<li>用户打开页面的时候，服务器需要给这个用户生成一个 Token</li>
<li>对于 GET 请求，Token 将附在请求地址之后。对于 POST 请求来说，要在 form 的最后加上</li>
</ul>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>”hidden”<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>”csrftoken”<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>”tokenvalue”<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>当用户从客户端得到了 Token，再次提交给服务器的时候，服务器需要判断 Token 的有效性</li>
</ul>
<h2 id="sql-注入" tabindex="-1"><a class="header-anchor" href="#sql-注入" aria-hidden="true">#</a> SQL 注入</h2>
<p>Sql 注入攻击，是通过将恶意的 <code v-pre>Sql</code>查询或添加语句插入到应用的输入参数中，再在后台 <code v-pre>Sql</code>服务器上解析执行进行的攻击</p>
<p><img src="http://fanyouf.gitee.io/interview/assets/img/ead52fa0-8d1d-11eb-85f6-6fac77c0c9b3.3e5f4e4a.png" alt=""></p>
<p>流程如下所示：</p>
<ul>
<li>
<p>找出 SQL 漏洞的注入点</p>
</li>
<li>
<p>判断数据库的类型以及版本</p>
</li>
<li>
<p>猜解用户名和密码</p>
</li>
<li>
<p>利用工具查找 Web 后台管理入口</p>
</li>
<li>
<p>入侵和破坏</p>
</li>
</ul>
<p>预防方式如下：</p>
<ul>
<li>严格检查输入变量的类型和格式</li>
<li>过滤和转义特殊字符</li>
<li>对访问数据库的 Web 应用程序采用 Web 应用防火墙</li>
</ul>
<p>上述只是列举了常见的<code v-pre>web</code>攻击方式，实际开发过程中还会遇到很多安全问题，对于这些问题， 切记不可忽视</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://tech.meituan.com/2018/09/27/fe-security.html</li>
<li>https://developer.mozilla.org/zh-CN/docs/learn/Server-side/First_steps/Website_security</li>
</ul>
</div></template>


