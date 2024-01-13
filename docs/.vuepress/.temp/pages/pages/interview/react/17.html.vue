<template><div><h1 id="说说react中引入css的方式有哪几种-区别" tabindex="-1"><a class="header-anchor" href="#说说react中引入css的方式有哪几种-区别" aria-hidden="true">#</a> 说说react中引入css的方式有哪几种？区别？</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>组件式开发选择合适的<code v-pre>css</code>解决方案尤为重要</p>
<p>通常会遵循以下规则：</p>
<ul>
<li>可以编写局部css，不会随意污染其他组件内的原生；</li>
<li>可以编写动态的css，可以获取当前组件的一些状态，根据状态的变化生成不同的css样式；</li>
<li>支持所有的css特性：伪类、动画、媒体查询等；</li>
<li>编写起来简洁方便、最好符合一贯的css风格特点</li>
</ul>
<p>在这一方面，<code v-pre>vue</code>使用<code v-pre>css</code>起来更为简洁：</p>
<ul>
<li>通过 style 标签编写样式</li>
<li>scoped 属性决定编写的样式是否局部有效</li>
<li>lang 属性设置预处理器</li>
<li>内联样式风格的方式来根据最新状态设置和改变css</li>
</ul>
<p>而在<code v-pre>react</code>中，引入<code v-pre>CSS</code>就不如<code v-pre>Vue</code>方便简洁，其引入<code v-pre>css</code>的方式有很多种，各有利弊</p>
<h2 id="二、方式" tabindex="-1"><a class="header-anchor" href="#二、方式" aria-hidden="true">#</a> 二、方式</h2>
<p>常见的<code v-pre>CSS</code>引入方式有以下：</p>
<ul>
<li>在组件内直接使用</li>
<li>组件中引入 .css 文件</li>
<li>组件中引入 .module.css 文件</li>
<li>CSS in JS</li>
</ul>
<h3 id="在组件内直接使用" tabindex="-1"><a class="header-anchor" href="#在组件内直接使用" aria-hidden="true">#</a> 在组件内直接使用</h3>
<p>直接在组件中书写<code v-pre>css</code>样式，通过<code v-pre>style</code>属性直接引入，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import React, { Component } from "react";

const div1 = {
  width: "300px",
  margin: "30px auto",
  backgroundColor: "#44014C",  //驼峰法
  minHeight: "200px",
  boxSizing: "border-box"
};

class Test extends Component {
  constructor(props, context) {
    super(props);
  }
 
  render() {
    return (
     &lt;div>
       &lt;div style={div1}>123&lt;/div>
       &lt;div style={{backgroundColor:"red"}}>
     &lt;/div>
    );
  }
}

export default Test;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面可以看到，<code v-pre>css</code>属性需要转换成驼峰写法</p>
<p>这种方式优点：</p>
<ul>
<li>内联样式, 样式之间不会有冲突</li>
<li>可以动态获取当前state中的状态</li>
</ul>
<p>缺点：</p>
<ul>
<li>
<p>写法上都需要使用驼峰标识</p>
</li>
<li>
<p>某些样式没有提示</p>
</li>
<li>
<p>大量的样式, 代码混乱</p>
</li>
<li>
<p>某些样式无法编写(比如伪类/伪元素)</p>
</li>
</ul>
<h3 id="组件中引入css文件" tabindex="-1"><a class="header-anchor" href="#组件中引入css文件" aria-hidden="true">#</a> 组件中引入css文件</h3>
<p>将<code v-pre>css</code>单独写在一个<code v-pre>css</code>文件中，然后在组件中直接引入</p>
<p><code v-pre>App.css</code>文件：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>.title {
  color: red;
  font-size: 20px;
}

.desc {
  color: green;
  text-decoration: underline;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>组件中引入：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import React, { PureComponent } from 'react';

import Home from './Home';

import './App.css';

export default class App extends PureComponent {
  render() {
    return (
      &lt;div className="app">
        &lt;h2 className="title">我是App的标题&lt;/h2>
        &lt;p className="desc">我是App中的一段文字描述&lt;/p >
        &lt;Home/>
      &lt;/div>
    )
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式存在不好的地方在于样式是全局生效，样式之间会互相影响</p>
<h3 id="组件中引入-module-css-文件" tabindex="-1"><a class="header-anchor" href="#组件中引入-module-css-文件" aria-hidden="true">#</a> 组件中引入 .module.css 文件</h3>
<p>将<code v-pre>css</code>文件作为一个模块引入，这个模块中的所有<code v-pre>css</code>，只作用于当前组件。不会影响当前组件的后代组件</p>
<p>这种方式是<code v-pre>webpack</code>特工的方案，只需要配置<code v-pre>webpack</code>配置文件中<code v-pre>modules:true</code>即可</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import React, { PureComponent } from 'react';

import Home from './Home';

import './App.module.css';

export default class App extends PureComponent {
  render() {
    return (
      &lt;div className="app">
        &lt;h2 className="title">我是App的标题&lt;/h2>
        &lt;p className="desc">我是App中的一段文字描述&lt;/p >
        &lt;Home/>
      &lt;/div>
    )
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式能够解决局部作用域问题，但也有一定的缺陷：</p>
<ul>
<li>引用的类名，不能使用连接符(.xxx-xx)，在 JavaScript 中是不识别的</li>
<li>所有的 className 都必须使用 {style.className} 的形式来编写</li>
<li>不方便动态来修改某些样式，依然需要使用内联样式的方式；</li>
</ul>
<h3 id="css-in-js" tabindex="-1"><a class="header-anchor" href="#css-in-js" aria-hidden="true">#</a> CSS in JS</h3>
<p>CSS-in-JS， 是指一种模式，其中<code v-pre>CSS</code>由 <code v-pre>JavaScript</code>生成而不是在外部文件中定义</p>
<p>此功能并不是 React 的一部分，而是由第三方库提供，例如：</p>
<ul>
<li>styled-components</li>
<li>emotion</li>
<li>glamorous</li>
</ul>
<p>下面主要看看<code v-pre>styled-components</code>的基本使用</p>
<p>本质是通过函数的调用，最终创建出一个组件：</p>
<ul>
<li>这个组件会被自动添加上一个不重复的class</li>
<li>styled-components会给该class添加相关的样式</li>
</ul>
<p>基本使用如下：</p>
<p>创建一个<code v-pre>style.js</code>文件用于存放样式组件：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>export const SelfLink = styled.div`
  height: 50px;
  border: 1px solid red;
  color: yellow;
`;

export const SelfButton = styled.div`
  height: 150px;
  width: 150px;
  color: ${props => props.color};
  background-image: url(${props => props.src});
  background-size: 150px 150px;
`;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>引入样式组件也很简单：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import React, { Component } from "react";

import { SelfLink, SelfButton } from "./style";

class Test extends Component {
  constructor(props, context) {
    super(props);
  }  
 
  render() {
    return (
     &lt;div>
       &lt;SelfLink title="People's Republic of China">app.js&lt;/SelfLink>
       &lt;SelfButton color="palevioletred" style={{ color: "pink" }} src={fist}>
          SelfButton
        &lt;/SelfButton>
     &lt;/div>
    );
  }
}

export default Test;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、区别" tabindex="-1"><a class="header-anchor" href="#三、区别" aria-hidden="true">#</a> 三、区别</h2>
<p>通过上面四种样式的引入，可以看到：</p>
<ul>
<li>
<p>在组件内直接使用<code v-pre>css</code>该方式编写方便，容易能够根据状态修改样式属性，但是大量的演示编写容易导致代码混乱</p>
</li>
<li>
<p>组件中引入 .css 文件符合我们日常的编写习惯，但是作用域是全局的，样式之间会层叠</p>
</li>
<li>
<p>引入.module.css 文件能够解决局部作用域问题，但是不方便动态修改样式，需要使用内联的方式进行样式的编写</p>
</li>
<li>
<p>通过css in js 这种方法，可以满足大部分场景的应用，可以类似于预处理器一样样式嵌套、定义、修改状态等</p>
</li>
</ul>
<p>至于使用<code v-pre>react</code>用哪种方案引入<code v-pre>css</code>，并没有一个绝对的答案，可以根据各自情况选择合适的方案</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zh-hans.reactjs.org/docs/faq-styling.html#gatsby-focus-wrapper</li>
<li>https://mp.weixin.qq.com/s/oywTpNKEikMXn8QTBgITow</li>
</ul>
</div></template>


