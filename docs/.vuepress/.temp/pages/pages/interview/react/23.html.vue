<template><div><h1 id="说说react-router有几种模式-实现原理" tabindex="-1"><a class="header-anchor" href="#说说react-router有几种模式-实现原理" aria-hidden="true">#</a> 说说React Router有几种模式？实现原理？</h1>
<p><img src="https://static.vue-js.com/065f7a80-e978-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>在单页应用中，一个<code v-pre>web</code>项目只有一个<code v-pre>html</code>页面，一旦页面加载完成之后，就不用因为用户的操作而进行页面的重新加载或者跳转，其特性如下：</p>
<ul>
<li>
<p>改变 url 且不让浏览器像服务器发送请求</p>
</li>
<li>
<p>在不刷新页面的前提下动态改变浏览器地址栏中的URL地址</p>
</li>
</ul>
<p>其中主要分成了两种模式：</p>
<ul>
<li>hash 模式：在url后面加上#，如http://127.0.0.1:5500/home/#/page1</li>
<li>history 模式：允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录</li>
</ul>
<h2 id="二、使用" tabindex="-1"><a class="header-anchor" href="#二、使用" aria-hidden="true">#</a> 二、使用</h2>
<p><code v-pre>React Router</code>对应的<code v-pre>hash</code>模式和<code v-pre>history</code>模式对应的组件为：</p>
<ul>
<li>HashRouter</li>
<li>BrowserRouter</li>
</ul>
<p>这两个组件的使用都十分的简单，作为最顶层组件包裹其他组件，如下所示</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 1.import { BrowserRouter as Router } from "react-router-dom";
// 2.import { HashRouter as Router } from "react-router-dom";

import React from 'react';
import {
  BrowserRouter as Router,
  // HashRouter as Router  
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Backend from './pages/Backend';
import Admin from './pages/Admin';


function App() {
  return (
    &lt;Router>
        &lt;Route path="/login" component={Login}/>
        &lt;Route path="/backend" component={Backend}/>
        &lt;Route path="/admin" component={Admin}/>
        &lt;Route path="/" component={Home}/>
    &lt;/Router>
  );
}

export default App;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、实现原理" tabindex="-1"><a class="header-anchor" href="#三、实现原理" aria-hidden="true">#</a> 三、实现原理</h2>
<p>路由描述了 <code v-pre>URL</code> 与 <code v-pre>UI</code>之间的映射关系，这种映射是单向的，即 URL 变化引起 UI 更新（无需刷新页面）</p>
<p>下面以<code v-pre>hash</code>模式为例子，改变<code v-pre>hash</code>值并不会导致浏览器向服务器发送请求，浏览器不发出请求，也就不会刷新页面</p>
<p><code v-pre>hash</code> 值改变，触发全局 <code v-pre>window</code> 对象上的 <code v-pre>hashchange</code> 事件。所以 <code v-pre>hash</code> 模式路由就是利用 <code v-pre>hashchange</code> 事件监听 <code v-pre>URL</code> 的变化，从而进行 <code v-pre>DOM</code> 操作来模拟页面跳转</p>
<p><code v-pre>react-router</code>也是基于这个特性实现路由的跳转</p>
<p>下面以<code v-pre>HashRouter</code>组件分析进行展开：</p>
<h2 id="hashrouter" tabindex="-1"><a class="header-anchor" href="#hashrouter" aria-hidden="true">#</a> HashRouter</h2>
<p><code v-pre>HashRouter</code>包裹了整应用，</p>
<p>通过<code v-pre>window.addEventListener('hashChange',callback)</code>监听<code v-pre>hash</code>值的变化，并传递给其嵌套的组件</p>
<p>然后通过<code v-pre>context</code>将<code v-pre>location</code>数据往后代组件传递，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import React, { Component } from 'react';
import { Provider } from './context'
// 该组件下Api提供给子组件使用
class HashRouter extends Component {
  constructor() {
    super()
    this.state = {
      location: {
        pathname: window.location.hash.slice(1) || '/'
      }
    }
  }
  // url路径变化 改变location
  componentDidMount() {
    window.location.hash = window.location.hash || '/'
    window.addEventListener('hashchange', () => {
      this.setState({
        location: {
          ...this.state.location,
          pathname: window.location.hash.slice(1) || '/'
        }
      }, () => console.log(this.state.location))
    })
  }
  render() {
    let value = {
      location: this.state.location
    }
    return (
      &lt;Provider value={value}>
        {
          this.props.children
        }
      &lt;/Provider>
    );
  }
}

export default HashRouter;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="router" tabindex="-1"><a class="header-anchor" href="#router" aria-hidden="true">#</a> Router</h3>
<p><code v-pre>Router</code>组件主要做的是通过<code v-pre>BrowserRouter</code>传过来的当前值，通过<code v-pre>props</code>传进来的<code v-pre>path</code>与<code v-pre>context</code>传进来的<code v-pre>pathname</code>进行匹配，然后决定是否执行渲染组件</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import React, { Component } from 'react';
import { Consumer } from './context'
const { pathToRegexp } = require("path-to-regexp");
class Route extends Component {
  render() {
    return (
      &lt;Consumer>
        {
          state => {
            console.log(state)
            let {path, component: Component} = this.props
            let pathname = state.location.pathname
            let reg = pathToRegexp(path, [], {end: false})
            // 判断当前path是否包含pathname
            if(pathname.match(reg)) {
              return &lt;Component>&lt;/Component>
            }
            return null
          }
        }
      &lt;/Consumer>
    );
  }
}
export default Route;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>
<p>https://juejin.cn/post/6870376090297171975#heading-9</p>
</li>
<li>
<p>https://segmentfault.com/a/1190000023560665</p>
</li>
</ul>
</div></template>


