<template><div><h1 id="大文件上传如何做断点续传" tabindex="-1"><a class="header-anchor" href="#大文件上传如何做断点续传" aria-hidden="true">#</a> 大文件上传如何做断点续传？</h1>
<h2 id="是什么" tabindex="-1"><a class="header-anchor" href="#是什么" aria-hidden="true">#</a> 是什么</h2>
<p>不管怎样简单的需求，在量级达到一定层次时，都会变得异常复杂</p>
<p>文件上传简单，文件变大就复杂</p>
<p>上传大文件时，以下几个变量会影响我们的用户体验</p>
<ul>
<li>服务器处理数据的能力</li>
<li>请求超时</li>
<li>网络波动</li>
</ul>
<p>上传时间会变长，高频次文件上传失败，失败后又需要重新上传等等</p>
<p>为了解决上述问题，我们需要对大文件上传单独处理</p>
<p>这里涉及到分片上传及断点续传两个概念</p>
<h3 id="分片上传" tabindex="-1"><a class="header-anchor" href="#分片上传" aria-hidden="true">#</a> 分片上传</h3>
<p>分片上传，就是将所要上传的文件，按照一定的大小，将整个文件分隔成多个数据块（Part）来进行分片上传</p>
<p>如下图</p>
<p><img src="http://fanyouf.gitee.io/interview/nb//interview/assets/img/21db7520-8ba4-11eb-85f6-6fac77c0c9b3.5be3b5bb.png" alt=""></p>
<p>上传完之后再由服务端对所有上传的文件进行汇总整合成原始的文件</p>
<p>大致流程如下：</p>
<ol>
<li>将需要上传的文件按照一定的分割规则，分割成相同大小的数据块；</li>
<li>初始化一个分片上传任务，返回本次分片上传唯一标识；</li>
<li>按照一定的策略（串行或并行）发送各个分片数据块；</li>
<li>发送完成后，服务端根据判断数据上传是否完整，如果完整，则进行数据块合成得到原始文件</li>
</ol>
<h3 id="断点续传" tabindex="-1"><a class="header-anchor" href="#断点续传" aria-hidden="true">#</a> 断点续传</h3>
<p>断点续传指的是在下载或上传时，将下载或上传任务人为的划分为几个部分</p>
<p>每一个部分采用一个线程进行上传或下载，如果碰到网络故障，可以从已经上传或下载的部分开始继续上传下载未完成的部分，而没有必要从头开始上传下载。用户可以节省时间，提高速度</p>
<p>一般实现方式有两种：</p>
<ul>
<li>服务器端返回，告知从哪开始</li>
<li>浏览器端自行处理</li>
</ul>
<p>上传过程中将文件在服务器写为临时文件，等全部写完了（文件上传完），将此临时文件重命名为正式文件即可</p>
<p>如果中途上传中断过，下次上传的时候根据当前临时文件大小，作为在客户端读取文件的偏移量，从此位置继续读取文件数据块，上传到服务器从此偏移量继续写入文件即可</p>
<h2 id="实现思路" tabindex="-1"><a class="header-anchor" href="#实现思路" aria-hidden="true">#</a> 实现思路</h2>
<p>整体思路比较简单，拿到文件，保存文件唯一性标识，切割文件，分段上传，每次上传一段，根据唯一性标识判断文件上传进度，直到文件的全部片段上传完毕</p>
<p><img src="http://fanyouf.gitee.io/interview/assets/img/image-20220803184035358.5612c169.png" alt="image-20220803184035358"></p>
<p>下面的内容都是伪代码</p>
<p>读取文件内容：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">handleFileChange</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">const</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span> <span class="token operator">=</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>files
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>file<span class="token punctuation">)</span> <span class="token keyword">return</span> 
  <span class="token keyword">this</span><span class="token punctuation">.</span>file <span class="token operator">=</span> file
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>核心代码</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token function">uploadFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>file<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> 
      <span class="token punctuation">}</span>
		  <span class="token comment">// todos： 判断文件类别</span>
      
      <span class="token comment">// 1. 文件拆片</span>
      <span class="token keyword">const</span> chunks <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createFileChunk</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>file<span class="token punctuation">)</span>
      <span class="token comment">// const hash = await this.calculateHashWorker()</span>
      <span class="token comment">// const hash1 = await this.calculateHashIdle()</span>
      <span class="token comment">// console.log('文件hash',hash)</span>
      <span class="token comment">// console.log('文件hash1',hash1)</span>
      
      <span class="token comment">// 2. 计算文件的hash值。这hash将用来唯一标识这个文件</span>
      <span class="token keyword">const</span> hash <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">calculateHashSample</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>hash <span class="token operator">=</span> hash

      <span class="token comment">// 3. 尝试上传</span>
  		<span class="token comment">// 3.1 文件是否上传过? 如果上传过，就秒传成功</span>
      <span class="token comment">// 3.2 如果没有，是否有存在的切片?</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span><span class="token literal-property property">data</span><span class="token operator">:</span><span class="token punctuation">{</span>uploaded<span class="token punctuation">,</span> uploadedList<span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$http<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/checkfile'</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
        <span class="token literal-property property">hash</span><span class="token operator">:</span><span class="token keyword">this</span><span class="token punctuation">.</span>hash<span class="token punctuation">,</span>
        <span class="token literal-property property">ext</span><span class="token operator">:</span><span class="token keyword">this</span><span class="token punctuation">.</span>file<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">'.'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>uploaded<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 秒传</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$message<span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token string">'秒传成功'</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 4. 上传</span>
      <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">uploadChunks</span><span class="token punctuation">(</span>uploadedList<span class="token punctuation">,</span> chunks<span class="token punctuation">)</span>

    <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>createFileChunk</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 创建分片</span>
    <span class="token function">createFileChunk</span><span class="token punctuation">(</span><span class="token parameter">file<span class="token punctuation">,</span>size<span class="token operator">=</span><span class="token constant">CHUNK_SIZE</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">const</span> chunks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> 
      <span class="token keyword">let</span> cur <span class="token operator">=</span> <span class="token number">0</span>
      <span class="token keyword">while</span><span class="token punctuation">(</span>cur<span class="token operator">&lt;</span><span class="token keyword">this</span><span class="token punctuation">.</span>file<span class="token punctuation">.</span>size<span class="token punctuation">)</span><span class="token punctuation">{</span>
        chunks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">index</span><span class="token operator">:</span>cur<span class="token punctuation">,</span> <span class="token literal-property property">file</span><span class="token operator">:</span><span class="token keyword">this</span><span class="token punctuation">.</span>file<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>cur<span class="token punctuation">,</span>cur<span class="token operator">+</span>size<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
        cur<span class="token operator">+=</span>size
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> chunks
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>uploadChunks</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token function">uploadChunks</span><span class="token punctuation">(</span><span class="token parameter">uploadedList<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> chunks</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

      <span class="token keyword">this</span><span class="token punctuation">.</span>chunks <span class="token operator">=</span> chunks<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">chunk<span class="token punctuation">,</span>index</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
        <span class="token comment">// 切片的名字 hash+index</span>
        <span class="token keyword">const</span> name <span class="token operator">=</span> hash <span class="token operator">+</span><span class="token string">'-'</span><span class="token operator">+</span> index
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
          hash<span class="token punctuation">,</span>
          name<span class="token punctuation">,</span>
          index<span class="token punctuation">,</span>
          <span class="token literal-property property">chunk</span><span class="token operator">:</span>chunk<span class="token punctuation">.</span>file<span class="token punctuation">,</span>
          <span class="token comment">// 设置进度条，已经上传的，设为100</span>
          <span class="token literal-property property">progress</span><span class="token operator">:</span>uploadedList<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token operator">></span><span class="token operator">-</span><span class="token number">1</span> <span class="token operator">?</span><span class="token number">100</span><span class="token operator">:</span><span class="token number">0</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      <span class="token keyword">const</span> requests <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>chunks
        <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">chunk</span><span class="token operator">=></span>uploadedList<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>chunk<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token operator">==</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">chunk<span class="token punctuation">,</span>index</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
          <span class="token comment">// 转成promise</span>
          <span class="token keyword">const</span> form <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          form<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">'chunk'</span><span class="token punctuation">,</span>chunk<span class="token punctuation">.</span>chunk<span class="token punctuation">)</span>
          form<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">'hash'</span><span class="token punctuation">,</span>chunk<span class="token punctuation">.</span>hash<span class="token punctuation">)</span>
          form<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">'name'</span><span class="token punctuation">,</span>chunk<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
          <span class="token comment">// form.append('index',chunk.index)</span>
          <span class="token keyword">return</span> <span class="token punctuation">{</span>form<span class="token punctuation">,</span> <span class="token literal-property property">index</span><span class="token operator">:</span>chunk<span class="token punctuation">.</span>index<span class="token punctuation">,</span><span class="token literal-property property">error</span><span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>form<span class="token punctuation">,</span>index<span class="token punctuation">}</span></span><span class="token punctuation">)</span><span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>$http<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/uploadfile'</span><span class="token punctuation">,</span>form<span class="token punctuation">,</span><span class="token punctuation">{</span>
          <span class="token function-variable function">onUploadProgress</span><span class="token operator">:</span><span class="token parameter">progress</span><span class="token operator">=></span><span class="token punctuation">{</span>
            <span class="token comment">// 不是整体的进度条了，而是每个区块有自己的进度条，整体的进度条需要计算</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>chunks<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">.</span>progress <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>progress<span class="token punctuation">.</span>loaded<span class="token operator">/</span>progress<span class="token punctuation">.</span>total<span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token comment">// @todo 并发量控制 </span>
      <span class="token comment">// 尝试申请tcp链接过多，也会造成卡顿</span>
      <span class="token comment">// 异步的并阿叔控制，</span>
      <span class="token comment">// await Promise.all(requests)</span>

      <span class="token comment">// await this.sendRequest(requests)</span>
      <span class="token keyword">await</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span>requests<span class="token punctuation">)</span>
      <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">mergeRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>合并文件</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token function">mergeRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">const</span> ret <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$http<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/mergefile'</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
        <span class="token literal-property property">ext</span><span class="token operator">:</span><span class="token keyword">this</span><span class="token punctuation">.</span>file<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">'.'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token literal-property property">size</span><span class="token operator">:</span><span class="token constant">CHUNK_SIZE</span><span class="token punctuation">,</span>
        <span class="token literal-property property">hash</span><span class="token operator">:</span><span class="token keyword">this</span><span class="token punctuation">.</span>hash
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用<code v-pre>md5</code>实现文件的唯一性</p>
<p>import sparkMD5 from 'spark-md5'</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 计算当前文件的hash</span>
    <span class="token keyword">async</span> <span class="token function">calculateHashSample</span><span class="token punctuation">(</span><span class="token parameter">file</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

      <span class="token comment">// 布隆过滤器  判断一个数据存在与否</span>
      <span class="token comment">// 1个G的文件，抽样后5M以内</span>
      <span class="token comment">// hash一样，文件不一定一样</span>
      <span class="token comment">// hash不一样，文件一定不一样</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token operator">=></span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> spark <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">sparkMD5<span class="token punctuation">.</span>ArrayBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">const</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token keyword">const</span> size <span class="token operator">=</span> file<span class="token punctuation">.</span>size
        <span class="token keyword">const</span> offset <span class="token operator">=</span> <span class="token number">2</span><span class="token operator">*</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span>
        <span class="token comment">// 第一个2M，最后一个区块数据全要</span>
        <span class="token keyword">let</span> chunks <span class="token operator">=</span> <span class="token punctuation">[</span>file<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span>offset<span class="token punctuation">)</span><span class="token punctuation">]</span>

        <span class="token keyword">let</span> cur <span class="token operator">=</span> offset
        <span class="token keyword">while</span><span class="token punctuation">(</span>cur<span class="token operator">&lt;</span>size<span class="token punctuation">)</span><span class="token punctuation">{</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span>cur<span class="token operator">+</span>offset<span class="token operator">>=</span>size<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// 最后一个区快</span>
            chunks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>cur<span class="token punctuation">,</span> cur<span class="token operator">+</span>offset<span class="token punctuation">)</span><span class="token punctuation">)</span>

          <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token comment">// 中间的区块</span>
            <span class="token keyword">const</span> mid <span class="token operator">=</span> cur<span class="token operator">+</span>offset<span class="token operator">/</span><span class="token number">2</span>
            <span class="token keyword">const</span> end <span class="token operator">=</span> cur<span class="token operator">+</span>offset
            chunks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>cur<span class="token punctuation">,</span> cur<span class="token operator">+</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            chunks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>mid<span class="token punctuation">,</span> mid<span class="token operator">+</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            chunks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>end<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">,</span> end<span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
          cur<span class="token operator">+=</span>offset
        <span class="token punctuation">}</span>
        <span class="token comment">// 中间的，取前中后各2各字节</span>
        reader<span class="token punctuation">.</span><span class="token function">readAsArrayBuffer</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span>chunks<span class="token punctuation">)</span><span class="token punctuation">)</span>
        reader<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token parameter">e</span><span class="token operator">=></span><span class="token punctuation">{</span>
          spark<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">)</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>hashProgress <span class="token operator">=</span> <span class="token number">100</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>spark<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后开始对文件进行分割</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
reader<span class="token punctuation">.</span><span class="token function">readAsArrayBuffer</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
reader<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"load"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//每10M切割一段,这里只做一个切割演示，实际切割需要循环切割，</span>
    <span class="token keyword">var</span> slice <span class="token operator">=</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token operator">*</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>h5上传一个（一片）</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> formdata <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
formdata<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">'0'</span><span class="token punctuation">,</span> slice<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//这里是有一个坑的，部分设备无法获取文件名称，和文件类型，这个在最后给出解决方案</span>
formdata<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">'filename'</span><span class="token punctuation">,</span> file<span class="token punctuation">.</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'load'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//xhr.responseText</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'POST'</span><span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>formdata<span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'progress'</span><span class="token punctuation">,</span> updateProgress<span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span>upload<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'progress'</span><span class="token punctuation">,</span> updateProgress<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">updateProgress</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>lengthComputable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//进度条</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里给出常见的图片和视频的文件类型判断</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">checkFileType</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> file<span class="token punctuation">,</span> back</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token doc-comment comment">/**
* type png jpg mp4 ...
* file input.change=> this.files[0]
* back callback(boolean)
*/</span>
    <span class="token keyword">var</span> args <span class="token operator">=</span> arguments<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span>length <span class="token operator">!=</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">back</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">var</span> type <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// type = '(png|jpg)' , 'png'</span>
    <span class="token keyword">var</span> file <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> back <span class="token operator">=</span> <span class="token keyword">typeof</span> args<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">'function'</span> <span class="token operator">?</span> args<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>file<span class="token punctuation">.</span>type <span class="token operator">==</span> <span class="token string">''</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果系统无法获取文件类型，则读取二进制流，对二进制进行解析文件类型</span>
        <span class="token keyword">var</span> imgType <span class="token operator">=</span> <span class="token punctuation">[</span>
            <span class="token string">'ff d8 ff'</span><span class="token punctuation">,</span> <span class="token comment">//jpg</span>
            <span class="token string">'89 50 4e'</span><span class="token punctuation">,</span> <span class="token comment">//png</span>

            <span class="token string">'0 0 0 14 66 74 79 70 69 73 6F 6D'</span><span class="token punctuation">,</span> <span class="token comment">//mp4</span>
            <span class="token string">'0 0 0 18 66 74 79 70 33 67 70 35'</span><span class="token punctuation">,</span> <span class="token comment">//mp4</span>
            <span class="token string">'0 0 0 0 66 74 79 70 33 67 70 35'</span><span class="token punctuation">,</span> <span class="token comment">//mp4</span>
            <span class="token string">'0 0 0 0 66 74 79 70 4D 53 4E 56'</span><span class="token punctuation">,</span> <span class="token comment">//mp4</span>
            <span class="token string">'0 0 0 0 66 74 79 70 69 73 6F 6D'</span><span class="token punctuation">,</span> <span class="token comment">//mp4</span>

            <span class="token string">'0 0 0 18 66 74 79 70 6D 70 34 32'</span><span class="token punctuation">,</span> <span class="token comment">//m4v</span>
            <span class="token string">'0 0 0 0 66 74 79 70 6D 70 34 32'</span><span class="token punctuation">,</span> <span class="token comment">//m4v</span>

            <span class="token string">'0 0 0 14 66 74 79 70 71 74 20 20'</span><span class="token punctuation">,</span> <span class="token comment">//mov</span>
            <span class="token string">'0 0 0 0 66 74 79 70 71 74 20 20'</span><span class="token punctuation">,</span> <span class="token comment">//mov</span>
            <span class="token string">'0 0 0 0 6D 6F 6F 76'</span><span class="token punctuation">,</span> <span class="token comment">//mov</span>

            <span class="token string">'4F 67 67 53 0 02'</span><span class="token punctuation">,</span> <span class="token comment">//ogg</span>
            <span class="token string">'1A 45 DF A3'</span><span class="token punctuation">,</span> <span class="token comment">//ogg</span>

            <span class="token string">'52 49 46 46 x x x x 41 56 49 20'</span><span class="token punctuation">,</span> <span class="token comment">//avi (RIFF fileSize fileType LIST)(52 49 46 46,DC 6C 57 09,41 56 49 20,4C 49 53 54)</span>
        <span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> typeName <span class="token operator">=</span> <span class="token punctuation">[</span>
            <span class="token string">'jpg'</span><span class="token punctuation">,</span>
            <span class="token string">'png'</span><span class="token punctuation">,</span>
            <span class="token string">'mp4'</span><span class="token punctuation">,</span>
            <span class="token string">'mp4'</span><span class="token punctuation">,</span>
            <span class="token string">'mp4'</span><span class="token punctuation">,</span>
            <span class="token string">'mp4'</span><span class="token punctuation">,</span>
            <span class="token string">'mp4'</span><span class="token punctuation">,</span>
            <span class="token string">'m4v'</span><span class="token punctuation">,</span>
            <span class="token string">'m4v'</span><span class="token punctuation">,</span>
            <span class="token string">'mov'</span><span class="token punctuation">,</span>
            <span class="token string">'mov'</span><span class="token punctuation">,</span>
            <span class="token string">'mov'</span><span class="token punctuation">,</span>
            <span class="token string">'ogg'</span><span class="token punctuation">,</span>
            <span class="token string">'ogg'</span><span class="token punctuation">,</span>
            <span class="token string">'avi'</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> sliceSize <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">png|jpg|jpeg</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">3</span> <span class="token operator">:</span> <span class="token number">12</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        reader<span class="token punctuation">.</span><span class="token function">readAsArrayBuffer</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
        reader<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"load"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">var</span> slice <span class="token operator">=</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> sliceSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
            reader <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>slice <span class="token operator">&amp;&amp;</span> slice<span class="token punctuation">.</span>byteLength <span class="token operator">==</span> sliceSize<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">var</span> view <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Uint8Array</span><span class="token punctuation">(</span>slice<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                view<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                view <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token keyword">var</span> idx <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">' '</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>imgType<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>idx <span class="token operator">></span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">back</span><span class="token punctuation">(</span>typeName<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    arr <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">></span> <span class="token number">3</span> <span class="token operator">&amp;&amp;</span> i <span class="token operator">&lt;</span> <span class="token number">8</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token keyword">return</span> <span class="token string">'x'</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                        <span class="token keyword">return</span> v<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">var</span> idx <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">' '</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>imgType<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>idx <span class="token operator">></span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token function">back</span><span class="token punctuation">(</span>typeName<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                        <span class="token function">back</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>

                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token function">back</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> type <span class="token operator">=</span> file<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(\w+)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token function">back</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用方法如下</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">checkFileType</span><span class="token punctuation">(</span><span class="token string">'(mov|mp4|avi)'</span><span class="token punctuation">,</span>file<span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">fileType</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// fileType = mp4,</span>
    <span class="token comment">// 如果file的类型不在枚举之列，则返回false</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面上传文件的一步，可以改成：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>formdata<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">'filename'</span><span class="token punctuation">,</span> md5code<span class="token operator">+</span><span class="token string">'.'</span><span class="token operator">+</span>fileType<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>有了切割上传后，也就有了文件唯一标识信息，断点续传变成了后台的一个小小的逻辑判断</p>
<p>后端主要做的内容为：根据前端传给后台的<code v-pre>md5</code>值，到服务器磁盘查找是否有之前未完成的文件合并信息（也就是未完成的半成品文件切片），取到之后根据上传切片的数量，返回数据告诉前端开始从第几节上传</p>
<p>如果想要暂停切片的上传，可以使用<code v-pre>XMLHttpRequest</code>的 <code v-pre>abort</code>方法</p>
<h2 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h2>
<ul>
<li>大文件加速上传：当文件大小超过预期大小时，使用分片上传可实现并行上传多个 Part， 以加快上传速度</li>
<li>网络环境较差：建议使用分片上传。当出现上传失败的时候，仅需重传失败的Part</li>
<li>流式上传：可以在需要上传的文件大小还不确定的情况下开始上传。这种场景在视频监控等行业应用中比较常见</li>
</ul>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2>
<p>当前的伪代码，只是提供一个简单的思路，想要把事情做到极致，我们还需要考虑到更多场景，比如</p>
<ul>
<li>切片上传失败怎么办</li>
<li>上传过程中刷新页面怎么办</li>
<li>如何进行并行上传</li>
<li>切片什么时候按数量切，什么时候按大小切</li>
<li>如何结合 Web Worker 处理大文件上传</li>
<li>如何实现秒传</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>
<p>https://gitee.com/fanyouf/nb/commit/80813904c644f4ed088968a32b81ebda068af345</p>
</li>
<li>
<p>https://segmentfault.com/a/1190000009448892</p>
</li>
<li>
<p>https://baike.baidu.com/</p>
</li>
</ul>
</div></template>


