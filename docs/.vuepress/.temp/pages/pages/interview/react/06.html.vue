<template><div><h1 id="说说-react中的setstate执行机制" tabindex="-1"><a class="header-anchor" href="#说说-react中的setstate执行机制" aria-hidden="true">#</a> 说说 React中的setState执行机制</h1>
<p><img src="https://static.vue-js.com/3acb8ca0-d825-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>一个组件的显示形态可以由数据状态和外部参数所决定，而数据状态就是<code v-pre>state</code></p>
<p>当需要修改里面的值的状态需要通过调用<code v-pre>setState</code>来改变，从而达到更新组件内部数据的作用</p>
<p>如下例子：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import React, { Component } from 'react'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "Hello World"
        }
    }

    render() {
        return (
            &lt;div>
                &lt;h2>{this.state.message}&lt;/h2>
                &lt;button onClick={e => this.changeText()}>面试官系列&lt;/button>
            &lt;/div>
        )
    }

    changeText() {
        this.setState({
            message: "JS每日一题"
        })
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过点击按钮触发<code v-pre>onclick</code>事件，执行<code v-pre>this.setState</code>方法更新<code v-pre>state</code>状态，然后重新执行<code v-pre>render</code>函数，从而导致页面的视图更新</p>
<p>如果直接修改<code v-pre>state</code>的状态，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>changeText() {
    this.state.message = "你好啊,李银河";
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们会发现页面并不会有任何反应，但是<code v-pre>state</code>的状态是已经发生了改变</p>
<p>这是因为<code v-pre>React</code>并不像<code v-pre>vue2</code>中调用<code v-pre>Object.defineProperty</code>数据响应式或者<code v-pre>Vue3</code>调用<code v-pre>Proxy</code>监听数据的变化</p>
<p>必须通过<code v-pre>setState</code>方法来告知<code v-pre>react</code>组件<code v-pre>state</code>已经发生了改变</p>
<p>关于<code v-pre>state</code>方法的定义是从<code v-pre>React.Component</code>中继承，定义的源码如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Component.prototype.setState = function(partialState, callback) {
  invariant(
    typeof partialState === 'object' ||
      typeof partialState === 'function' ||
      partialState == null,
    'setState(...): takes an object of state variables to update or a ' +
      'function which returns an object of state variables.',
  );
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面可以看到<code v-pre>setState</code>第一个参数可以是一个对象，或者是一个函数，而第二个参数是一个回调函数，用于可以实时的获取到更新之后的数据</p>
<h2 id="二、更新类型" tabindex="-1"><a class="header-anchor" href="#二、更新类型" aria-hidden="true">#</a> 二、更新类型</h2>
<p>在使用<code v-pre>setState</code>更新数据的时候，<code v-pre>setState</code>的更新类型分成：</p>
<ul>
<li>异步更新</li>
<li>同步更新</li>
</ul>
<h3 id="异步更新" tabindex="-1"><a class="header-anchor" href="#异步更新" aria-hidden="true">#</a> 异步更新</h3>
<p>先举出一个例子：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>changeText() {
  this.setState({
    message: "你好啊"
  })
  console.log(this.state.message); // Hello World
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面可以看到，最终打印结果为<code v-pre>Hello world</code>，并不能在执行完<code v-pre>setState</code>之后立马拿到最新的<code v-pre>state</code>的结果</p>
<p>如果想要立刻获取更新后的值，在第二个参数的回调中更新后会执行</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>changeText() {
  this.setState({
    message: "你好啊"
  }, () => {
    console.log(this.state.message); // 你好啊
  });
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="同步更新" tabindex="-1"><a class="header-anchor" href="#同步更新" aria-hidden="true">#</a> 同步更新</h3>
<p>同样先给出一个在<code v-pre>setTimeout</code>中更新的例子：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>changeText() {
  setTimeout(() => {
    this.setState({
      message: "你好啊
    });
    console.log(this.state.message); // 你好啊
  }, 0);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子中，可以看到更新是同步</p>
<p>再来举一个原生<code v-pre>DOM</code>事件的例子：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>componentDidMount() {
  const btnEl = document.getElementById("btn");
  btnEl.addEventListener('click', () => {
    this.setState({
      message: "你好啊,李银河"
    });
    console.log(this.state.message); // 你好啊,李银河
  })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3>
<ul>
<li>在组件生命周期或React合成事件中，setState是异步</li>
<li>在setTimeout或者原生dom事件中，setState是同步</li>
</ul>
<h3 id="三、批量更新" tabindex="-1"><a class="header-anchor" href="#三、批量更新" aria-hidden="true">#</a> 三、批量更新</h3>
<p>同样先给出一个例子：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>handleClick = () => {
    this.setState({
        count: this.state.count + 1,
    })
    console.log(this.state.count) // 1

    this.setState({
        count: this.state.count + 1,
    })
    console.log(this.state.count) // 1

    this.setState({
        count: this.state.count + 1,
    })
    console.log(this.state.count) // 1
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>点击按钮触发事件，打印的都是 1，页面显示 <code v-pre>count</code> 的值为 2</p>
<p>对同一个值进行多次 <code v-pre>setState</code>， <code v-pre>setState</code> 的批量更新策略会对其进行覆盖，取最后一次的执行结果</p>
<p>上述的例子，实际等价于如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Object.assign(
  previousState,
  {index: state.count+ 1},
  {index: state.count+ 1},
  ...
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于后面的数据会覆盖前面的更改，所以最终只加了一次</p>
<p>如果是下一个<code v-pre>state</code>依赖前一个<code v-pre>state</code>的话，推荐给<code v-pre>setState</code>一个参数传入一个<code v-pre>function</code>，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>onClick = () => {
    this.setState((prevState, props) => {
      return {count: prevState.count + 1};
    });
    this.setState((prevState, props) => {
      return {count: prevState.count + 1};
    });
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而在<code v-pre>setTimeout</code>或者原生<code v-pre>dom</code>事件中，由于是同步的操作，所以并不会进行覆盖现象</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://juejin.cn/post/6844903667426918408</li>
<li>https://juejin.cn/post/6844903636749778958</li>
<li>https://segmentfault.com/a/1190000039077904</li>
</ul>
</div></template>


