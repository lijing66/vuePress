<template><div><h1 id="说说react服务端渲染怎么做-原理是什么" tabindex="-1"><a class="header-anchor" href="#说说react服务端渲染怎么做-原理是什么" aria-hidden="true">#</a> 说说React服务端渲染怎么做？原理是什么？</h1>
<p><img src="https://static.vue-js.com/8c93cbe0-f3f7-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>在<a href="https://mp.weixin.qq.com/s/vvUtC_aAprUjoJRnfFjA1A" target="_blank" rel="noopener noreferrer">SSR中 (opens new window)<ExternalLinkIcon/></a>，我们了解到<code v-pre>Server-Side Rendering</code> ，简称<code v-pre>SSR</code>，意为服务端渲染</p>
<p>指由服务侧完成页面的 <code v-pre>HTML</code> 结构拼接的页面处理技术，发送到浏览器，然后为其绑定状态与事件，成为完全可交互页面的过程</p>
<p><img src="https://static.vue-js.com/96dc3e20-f3f7-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>其解决的问题主要有两个：</p>
<ul>
<li>SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面</li>
<li>加速首屏加载，解决首屏白屏问题</li>
</ul>
<h2 id="二、如何做" tabindex="-1"><a class="header-anchor" href="#二、如何做" aria-hidden="true">#</a> 二、如何做</h2>
<p>在<code v-pre>react</code>中，实现<code v-pre>SSR</code>主要有两种形式：</p>
<ul>
<li>手动搭建一个 SSR 框架</li>
<li>使用成熟的SSR 框架，如 Next.JS</li>
</ul>
<p>这里主要以手动搭建一个<code v-pre>SSR</code>框架进行实现</p>
<p>首先通过<code v-pre>express</code>启动一个<code v-pre>app.js</code>文件，用于监听3000端口的请求，当请求根目录时，返回<code v-pre>HTML</code>，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>const express = require('express')
const app = express()
app.get('/', (req,res) => res.send(`
&lt;html>
   &lt;head>
       &lt;title>ssr demo&lt;/title>
   &lt;/head>
   &lt;body>
       Hello world
   &lt;/body>
&lt;/html>
`))

app.listen(3000, () => console.log('Exampleapp listening on port 3000!'))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再服务器中编写<code v-pre>react</code>代码，在<code v-pre>app.js</code>中进行应引用</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import React from 'react'

const Home = () =>{

    return &lt;div>home&lt;/div>

}

export default Home
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了让服务器能够识别<code v-pre>JSX</code>，这里需要使用<code v-pre>webpakc</code>对项目进行打包转换，创建一个配置文件<code v-pre>webpack.server.js</code>并进行相关配置，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>const path = require('path')    //node的path模块
const nodeExternals = require('webpack-node-externals')

module.exports = {
    target:'node',
    mode:'development',           //开发模式
    entry:'./app.js',             //入口
    output: {                     //打包出口
        filename:'bundle.js',     //打包后的文件名
        path:path.resolve(__dirname,'build')    //存放到根目录的build文件夹
    },
    externals: [nodeExternals()],  //保持node中require的引用方式
    module: {
        rules: [{                  //打包规则
           test:   /\.js?$/,       //对所有js文件进行打包
           loader:'babel-loader',  //使用babel-loader进行打包
           exclude: /node_modules/,//不打包node_modules中的js文件
           options: {
               presets: ['react','stage-0',['env', { 
                                  //loader时额外的打包规则,对react,JSX，ES6进行转换
                    targets: {
                        browsers: ['last 2versions']   //对主流浏览器最近两个版本进行兼容
                    }
               }]]
           }
       }]
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着借助<code v-pre>react-dom</code>提供了服务端渲染的 <code v-pre>renderToString</code>方法，负责把<code v-pre>React</code>组件解析成<code v-pre>html</code></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import express from 'express'
import React from 'react'//引入React以支持JSX的语法
import { renderToString } from 'react-dom/server'//引入renderToString方法
import Home from'./src/containers/Home'

const app= express()
const content = renderToString(&lt;Home/>)
app.get('/',(req,res) => res.send(`
&lt;html>
   &lt;head>
       &lt;title>ssr demo&lt;/title>
   &lt;/head>
   &lt;body>
        ${content}
   &lt;/body>
&lt;/html>
`))

app.listen(3001, () => console.log('Exampleapp listening on port 3001!'))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的过程中，已经能够成功将组件渲染到了页面上</p>
<p>但是像一些事件处理的方法，是无法在服务端完成，因此需要将组件代码在浏览器中再执行一遍，这种服务器端和客户端共用一套代码的方式就称之为<strong>同构</strong></p>
<p>重构通俗讲就是一套React代码在服务器上运行一遍，到达浏览器又运行一遍：</p>
<ul>
<li>服务端渲染完成页面结构</li>
<li>浏览器端渲染完成事件绑定</li>
</ul>
<p>浏览器实现事件绑定的方式为让浏览器去拉取<code v-pre>JS</code>文件执行，让<code v-pre>JS</code>代码来控制，因此需要引入<code v-pre>script</code>标签</p>
<p>通过<code v-pre>script</code>标签为页面引入客户端执行的<code v-pre>react</code>代码，并通过<code v-pre>express</code>的<code v-pre>static</code>中间件为<code v-pre>js</code>文件配置路由，修改如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import express from 'express'
import React from 'react'//引入React以支持JSX的语法
import { renderToString } from'react-dom/server'//引入renderToString方法
import Home from './src/containers/Home'
 
const app = express()
app.use(express.static('public'));
//使用express提供的static中间件,中间件会将所有静态文件的路由指向public文件夹
 const content = renderToString(&lt;Home/>)
 
app.get('/',(req,res)=>res.send(`
&lt;html>
   &lt;head>
       &lt;title>ssr demo&lt;/title>
   &lt;/head>
   &lt;body>
        ${content}
   &lt;script src="/index.js">&lt;/script>
   &lt;/body>
&lt;/html>
`))

 app.listen(3001, () =>console.log('Example app listening on port 3001!'))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再客户端执行以下<code v-pre>react</code>代码，新建<code v-pre>webpack.client.js</code>作为客户端React代码的<code v-pre>webpack</code>配置文件如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>const path = require('path')                    //node的path模块

module.exports = {
    mode:'development',                         //开发模式
    entry:'./src/client/index.js',              //入口
    output: {                                   //打包出口
        filename:'index.js',                    //打包后的文件名
        path:path.resolve(__dirname,'public')   //存放到根目录的build文件夹
    },
    module: {
        rules: [{                               //打包规则
           test:   /\.js?$/,                    //对所有js文件进行打包
           loader:'babel-loader',               //使用babel-loader进行打包
           exclude: /node_modules/,             //不打包node_modules中的js文件
           options: {
               presets: ['react','stage-0',['env', {     
                    //loader时额外的打包规则,这里对react,JSX进行转换
                    targets: {
                        browsers: ['last 2versions']   //对主流浏览器最近两个版本进行兼容
                    }
               }]]
           }
       }]
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法就能够简单实现首页的<code v-pre>react</code>服务端渲染，过程对应如下图：</p>
<p><img src="https://static.vue-js.com/a2894970-f3f7-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>在做完初始渲染的时候，一个应用会存在路由的情况，配置信息如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import React from 'react'                   //引入React以支持JSX
import { Route } from 'react-router-dom'    //引入路由
import Home from './containers/Home'        //引入Home组件

export default (
    &lt;div>
        &lt;Route path="/" exact component={Home}>&lt;/Route>
    &lt;/div>
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后可以通过<code v-pre>index.js</code>引用路由信息，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from'react-router-dom'
import Router from'../Routers'

const App= () => {
    return (
        &lt;BrowserRouter>
           {Router}
        &lt;/BrowserRouter>
    )
}

ReactDom.hydrate(&lt;App/>, document.getElementById('root'))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候控制台会存在报错信息，原因在于每个<code v-pre>Route</code>组件外面包裹着一层<code v-pre>div</code>，但服务端返回的代码中并没有这个<code v-pre>div</code></p>
<p>解决方法只需要将路由信息在服务端执行一遍，使用使用<code v-pre>StaticRouter</code>来替代<code v-pre>BrowserRouter</code>，通过<code v-pre>context</code>进行参数传递</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import express from 'express'
import React from 'react'//引入React以支持JSX的语法
import { renderToString } from 'react-dom/server'//引入renderToString方法
import { StaticRouter } from 'react-router-dom'
import Router from '../Routers'
 
const app = express()
app.use(express.static('public'));
//使用express提供的static中间件,中间件会将所有静态文件的路由指向public文件夹

app.get('/',(req,res)=>{
    const content  = renderToString((
        //传入当前path
        //context为必填参数,用于服务端渲染参数传递
        &lt;StaticRouter location={req.path} context={{}}>
           {Router}
        &lt;/StaticRouter>
    ))
    res.send(`
   &lt;html>
       &lt;head>
           &lt;title>ssr demo&lt;/title>
       &lt;/head>
       &lt;body>
       &lt;div id="root">${content}&lt;/div>
       &lt;script src="/index.js">&lt;/script>
       &lt;/body>
   &lt;/html>
    `)
})


app.listen(3001, () => console.log('Exampleapp listening on port 3001!'))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样也就完成了路由的服务端渲染</p>
<h2 id="三、原理" tabindex="-1"><a class="header-anchor" href="#三、原理" aria-hidden="true">#</a> 三、原理</h2>
<p>整体<code v-pre>react</code>服务端渲染原理并不复杂，具体如下：</p>
<p><code v-pre>node server</code> 接收客户端请求，得到当前的请求<code v-pre>url</code> 路径，然后在已有的路由表内查找到对应的组件，拿到需要请求的数据，将数据作为 <code v-pre>props</code>、<code v-pre>context</code>或者<code v-pre>store</code> 形式传入组件</p>
<p>然后基于 <code v-pre>react</code> 内置的服务端渲染方法 <code v-pre>renderToString()</code>把组件渲染为 <code v-pre>html</code>字符串在把最终的 <code v-pre>html</code>进行输出前需要将数据注入到浏览器端</p>
<p>浏览器开始进行渲染和节点对比，然后执行完成组件内事件绑定和一些交互，浏览器重用了服务端输出的 <code v-pre>html</code> 节点，整个流程结束</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zhuanlan.zhihu.com/p/52693113</li>
<li>https://segmentfault.com/a/1190000020417285</li>
<li>https://juejin.cn/post/6844904000387563533#heading-14</li>
</ul>
</div></template>


