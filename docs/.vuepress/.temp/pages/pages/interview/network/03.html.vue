<template><div><h1 id="说说-http1-0-1-1-2-0-的区别" tabindex="-1"><a class="header-anchor" href="#说说-http1-0-1-1-2-0-的区别" aria-hidden="true">#</a> 说说 HTTP1.0/1.1/2.0 的区别?</h1>
<h2 id="简版" tabindex="-1"><a class="header-anchor" href="#简版" aria-hidden="true">#</a> 简版</h2>
<p>HTTP/2 的升级, 对于用户来说, 是跨时代的, 基于 HTTP/2, 用户访问网页的速度会非常快 (充分利用带宽)</p>
<p>HTTP/2: 淘宝, 天猫, 京东等, 已做升级 ....</p>
<ol>
<li>HTTP/2 采⽤⼆进制格式来传输数据，⽽⾮ HTTP 1.x 的⽂本格式，⼆进制协议解析起来更⾼效</li>
<li>HTTP/2 采用一些头部压缩技术，减少在请求和响应头中重复携带的数据，降低网络负担</li>
<li>HTTP/2 采⽤服务器推送方式，主动向客户端推送资源，提高页面加载效率</li>
<li>HTTP/2 采⽤多路复用机制，减少需要创建的连接数量，降低资源占用和性能消耗</li>
</ol>
<p>下面是一些与之关联的技术知识:</p>
<p><strong>⼆进制格式分帧</strong></p>
<p>帧：HTTP/2 数据通信的最⼩单位消息，是指 HTTP/2 中逻辑上的 HTTP 消息（例如请求、响应等）。消息由⼀个或多个帧组成</p>
<p>流：存在于连接中的⼀个虚拟通道，它可以承载双向消息，且每个流都有唯⼀的整数 ID</p>
<p><strong>头部压缩</strong></p>
<p>在 HTTP1.x 中，请求和响应中会重复携带一些不常改变、冗⻓的头数据，给⽹络带来额外负担。</p>
<p>在 HTTP/2 中，客户端和服务端使⽤ “⾸部表” 来跟踪和存储之前发送过的键值对，</p>
<p>相同的数据不再随着每次请求和响应发送。⾸部表在连接存续期间始终存在，由客户端和服务器共同渐进更新。</p>
<p>每个新的⾸部键值对，要么被追加到当前表的末尾，要么替换表中已存在的键值对。</p>
<p>可以简单的理解为：只发送差异数据，⽽不是全部发送，从⽽减少头部的信息量</p>
<p><strong>服务器推送</strong></p>
<p>服务端可以在发送⻚⾯ HTML 内容时，再主动推送一些其它资源，⽽不⽤等到浏览器解析到相应的位置时发起请求后再作响应。</p>
<p>例如，服务端可以主动把 JS 和 CSS ⽂件推送给客户端，⽽不需要客户端解析 HTML 时再发送这些请求。</p>
<p>不过，服务端的主动推送行为，客户端有权利选择是否要接收。</p>
<p>如果服务端推送的资源已经被浏览器缓存过，浏览器可以通过发送 RST_STREAM 帧来拒收。</p>
<p><strong>多路复用</strong></p>
<p>在 HTTP 1.x 中如果想并发多个请求的话，必须使⽤多个 TCP 链接，但浏览器为了控制资源，</p>
<p>会对单个域名有 6 个 TCP 链接的数量限制。而在 HTTP/2 中：</p>
<ul>
<li>
<p>同域名下的所有通信，都在单个连接上完成</p>
</li>
<li>
<p>单个连接可以承载任意数量的双向数据流</p>
</li>
<li>
<p>数据流以消息的形式发送，⽽消息⼜由⼀个或多个帧组成（多个帧可以乱序发送，因为可以根据帧⾸部的流标识来重新组装）</p>
</li>
</ul>
<p>小结:HTTP1.X 同一时间, 只能并发建立 6-8 个 TCP 连接, 一个连接同时只能一个请求 (虽然可以 keep-alive 复用, 但也得一个个来) (建立连接的成本比较高, 不让一次性建立太多连接) 而新版本 HTTP/2 建立一次连接, 就可以并发很多个请求 所以 HTTP/2 的升级, 大大提升了页面加载的效率</p>
<h2 id="一、http1-0" tabindex="-1"><a class="header-anchor" href="#一、http1-0" aria-hidden="true">#</a> 一、HTTP1.0</h2>
<p><img src="https://static.vue-js.com/e167a580-b93a-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p><code v-pre>HTTP</code>协议的第二个版本，第一个在通讯中指定版本号的 HTTP 协议版本</p>
<p><code v-pre>HTTP 1.0</code> 浏览器与服务器只保持短暂的连接，每次请求都需要与服务器建立一个<code v-pre>TCP</code>连接</p>
<p>服务器完成请求处理后立即断开<code v-pre>TCP</code>连接，服务器不跟踪每个客户也不记录过去的请求</p>
<p>简单来讲，每次与服务器交互，都需要新开一个连接</p>
<p><img src="https://static.vue-js.com/efff4da0-b93a-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>例如，解析<code v-pre>html</code>文件，当发现文件中存在资源文件的时候，这时候又创建单独的链接</p>
<p>最终导致，一个<code v-pre>html</code>文件的访问包含了多次的请求和响应，每次请求都需要创建连接、关系连接</p>
<p>这种形式明显造成了性能上的缺陷</p>
<p>如果需要建立长连接，需要设置一个非标准的 Connection 字段 <code v-pre>Connection: keep-alive</code></p>
<h2 id="二、http1-1" tabindex="-1"><a class="header-anchor" href="#二、http1-1" aria-hidden="true">#</a> 二、HTTP1.1</h2>
<p>在<code v-pre>HTTP1.1</code>中，默认支持长连接（<code v-pre>Connection: keep-alive</code>），即在一个 TCP 连接上可以传送多个<code v-pre>HTTP</code>请求和响应，减少了建立和关闭连接的消耗和延迟</p>
<p>建立一次连接，多次请求均由这个连接完成</p>
<p><img src="https://static.vue-js.com/22db2b90-b93b-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>这样，在加载<code v-pre>html</code>文件的时候，文件中多个请求和响应就可以在一个连接中传输</p>
<p>同时，<code v-pre>HTTP 1.1</code>还允许客户端不用等待上一次请求结果返回，就可以发出下一次请求，但服务器端必须按照接收到客户端请求的先后顺序依次回送响应结果，以保证客户端能够区分出每次请求的响应内容，这样也显著地减少了整个下载过程所需要的时间</p>
<p>同时，<code v-pre>HTTP1.1</code>在<code v-pre>HTTP1.0</code>的基础上，增加更多的请求头和响应头来完善的功能，如下：</p>
<ul>
<li>引入了更多的缓存控制策略，如 If-Unmodified-Since, If-Match, If-None-Match 等缓存头来控制缓存策略</li>
<li>引入 range，允许值请求资源某个部分</li>
<li>引入 host，实现了在一台 WEB 服务器上可以在同一个 IP 地址和端口号上使用不同的主机名来创建多个虚拟 WEB 站点</li>
</ul>
<p>并且还添加了其他的请求方法：<code v-pre>put</code>、<code v-pre>delete</code>、<code v-pre>options</code>...</p>
<h2 id="三、http2-0" tabindex="-1"><a class="header-anchor" href="#三、http2-0" aria-hidden="true">#</a> 三、HTTP2.0</h2>
<p>而<code v-pre>HTTP2.0</code>在相比之前版本，性能上有很大的提升，如添加了一个特性：</p>
<ul>
<li>多路复用</li>
<li>二进制分帧</li>
<li>首部压缩</li>
<li>服务器推送</li>
</ul>
<h3 id="多路复用" tabindex="-1"><a class="header-anchor" href="#多路复用" aria-hidden="true">#</a> 多路复用</h3>
<p><code v-pre>HTTP/2</code> 复用<code v-pre>TCP</code>连接，在一个连接里，客户端和浏览器都可以<strong>同时</strong>发送多个请求或回应，而且不用按照顺序一一对应，这样就避免了”队头堵塞”</p>
<p><img src="https://static.vue-js.com/313f1980-b93b-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>上图中，可以看到第四步中<code v-pre>css</code>、<code v-pre>js</code>资源是同时发送到服务端</p>
<h3 id="二进制分帧" tabindex="-1"><a class="header-anchor" href="#二进制分帧" aria-hidden="true">#</a> 二进制分帧</h3>
<p>帧是<code v-pre>HTTP2</code>通信中最小单位信息</p>
<p><code v-pre>HTTP/2</code> 采用二进制格式传输数据，而非 <code v-pre>HTTP 1.x</code>的文本格式，解析起来更高效</p>
<p>将请求和响应数据分割为更小的帧，并且它们采用二进制编码</p>
<p><code v-pre>HTTP2</code>中，同域名下所有通信都在单个连接上完成，该连接可以承载任意数量的双向数据流</p>
<p>每个数据流都以消息的形式发送，而消息又由一个或多个帧组成。多个帧之间可以乱序发送，根据帧首部的流标识可以重新组装，这也是多路复用同时发送数据的实现条件</p>
<h3 id="首部压缩" tabindex="-1"><a class="header-anchor" href="#首部压缩" aria-hidden="true">#</a> 首部压缩</h3>
<p><code v-pre>HTTP/2</code>在客户端和服务器端使用“首部表”来跟踪和存储之前发送的键值对，对于相同的数据，不再通过每次请求和响应发送</p>
<p>首部表在<code v-pre>HTTP/2</code>的连接存续期内始终存在，由客户端和服务器共同渐进地更新</p>
<p>例如：下图中的两个请求， 请求一发送了所有的头部字段，第二个请求则只需要发送差异数据，这样可以减少冗余数据，降低开销</p>
<p><img src="https://static.vue-js.com/3c536740-b93b-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h3 id="服务器推送" tabindex="-1"><a class="header-anchor" href="#服务器推送" aria-hidden="true">#</a> 服务器推送</h3>
<p><code v-pre>HTTP2</code>引入服务器推送，允许服务端推送资源给客户端</p>
<p>服务器会顺便把一些客户端需要的资源一起推送到客户端，如在响应一个页面请求中，就可以随同页面的其它资源</p>
<p>免得客户端再次创建连接发送请求到服务器端获取</p>
<p>这种方式非常合适加载静态资源</p>
<p><img src="https://static.vue-js.com/47130550-b93b-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h2 id="四、总结" tabindex="-1"><a class="header-anchor" href="#四、总结" aria-hidden="true">#</a> 四、总结</h2>
<p>HTTP1.0：</p>
<ul>
<li>浏览器与服务器只保持短暂的连接，浏览器的每次请求都需要与服务器建立一个 TCP 连接</li>
</ul>
<p>HTTP1.1：</p>
<ul>
<li>引入了持久连接，即 TCP 连接默认不关闭，可以被多个请求复用</li>
<li>在同一个 TCP 连接里面，客户端可以同时发送多个请求</li>
<li>虽然允许复用 TCP 连接，但是同一个 TCP 连接里面，所有的数据通信是按次序进行的，服务器只有处理完一个请求，才会接着处理下一个请求。如果前面的处理特别慢，后面就会有许多请求排队等着</li>
<li>新增了一些请求方法</li>
<li>新增了一些请求头和响应头</li>
</ul>
<p>HTTP2.0：</p>
<ul>
<li>采用二进制格式而非文本格式</li>
<li>完全多路复用，而非有序并阻塞的、只需一个连接即可实现并行</li>
<li>使用报头压缩，降低开销</li>
<li>服务器推送</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE#HTTP/1.0</li>
<li>https://www.jianshu.com/p/52d86558ca57</li>
<li>https://segmentfault.com/a/1190000016496448</li>
<li>https://zhuanlan.zhihu.com/p/26559480</li>
</ul>
</div></template>


