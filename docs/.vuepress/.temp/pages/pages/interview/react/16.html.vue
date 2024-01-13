<template><div><h1 id="说说对react-hooks的理解-解决了什么问题" tabindex="-1"><a class="header-anchor" href="#说说对react-hooks的理解-解决了什么问题" aria-hidden="true">#</a> 说说对React Hooks的理解？解决了什么问题？</h1>
<p><img src="https://static.vue-js.com/8d357c50-e12e-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><code v-pre>Hook</code> 是 React 16.8 的新增特性。它可以让你在不编写 <code v-pre>class</code> 的情况下使用 <code v-pre>state</code> 以及其他的 <code v-pre>React</code> 特性</p>
<p>至于为什么引入<code v-pre>hook</code>，官方给出的动机是解决长时间使用和维护<code v-pre>react</code>过程中常遇到的问题，例如：</p>
<ul>
<li>难以重用和共享组件中的与状态相关的逻辑</li>
<li>逻辑复杂的组件难以开发与维护，当我们的组件需要处理多个互不相关的 local state 时，每个生命周期函数中可能会包含着各种互不相关的逻辑在里面</li>
<li>类组件中的this增加学习成本，类组件在基于现有工具的优化上存在些许问题</li>
<li>由于业务变动，函数组件不得不改为类组件等等</li>
</ul>
<p>在以前，函数组件也被称为无状态的组件，只负责渲染的一些工作</p>
<p>因此，现在的函数组件也可以是有状态的组件，内部也可以维护自身的状态以及做一些逻辑方面的处理</p>
<h2 id="二、有哪些" tabindex="-1"><a class="header-anchor" href="#二、有哪些" aria-hidden="true">#</a> 二、有哪些</h2>
<p>上面讲到，<code v-pre>Hooks</code>让我们的函数组件拥有了类组件的特性，例如组件内的状态、生命周期</p>
<p>最常见的<code v-pre>hooks</code>有如下：</p>
<ul>
<li>useState</li>
<li>useEffect</li>
<li>其他</li>
</ul>
<h3 id="usestate" tabindex="-1"><a class="header-anchor" href="#usestate" aria-hidden="true">#</a> useState</h3>
<p>首先给出一个例子，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import React, { useState } from 'react';

function Example() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);

  return (
    &lt;div>
      &lt;p>You clicked {count} times&lt;/p >
      &lt;button onClick={() => setCount(count + 1)}>
        Click me
      &lt;/button>
    &lt;/div>
  );
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在函数组件中通过<code v-pre>useState</code>实现函数内部维护<code v-pre>state</code>，参数为<code v-pre>state</code>默认的值，返回值是一个数组，第一个值为当前的<code v-pre>state</code>，第二个值为更新<code v-pre>state</code>的函数</p>
<p>该函数组件等价于的类组件如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      &lt;div>
        &lt;p>You clicked {this.state.count} times&lt;/p >
        &lt;button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        &lt;/button>
      &lt;/div>
    );
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上述两种代码分析，可以看出两者区别：</p>
<ul>
<li>
<p>state声明方式：在函数组件中通过 useState 直接获取，类组件通过constructor 构造函数中设置</p>
</li>
<li>
<p>state读取方式：在函数组件中直接使用变量，类组件通过<code v-pre>this.state.count</code>的方式获取</p>
</li>
<li>
<p>state更新方式：在函数组件中通过 setCount 更新，类组件通过this.setState()</p>
</li>
</ul>
<p>总的来讲，useState 使用起来更为简洁，减少了<code v-pre>this</code>指向不明确的情况</p>
<h3 id="useeffect" tabindex="-1"><a class="header-anchor" href="#useeffect" aria-hidden="true">#</a> useEffect</h3>
<p><code v-pre>useEffect</code>可以让我们在函数组件中进行一些带有副作用的操作</p>
<p>同样给出一个计时器示例：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      &lt;div>
        &lt;p>You clicked {this.state.count} times&lt;/p >
        &lt;button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        &lt;/button>
      &lt;/div>
    );
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面可以看见，组件在加载和更新阶段都执行同样操作</p>
<p>而如果使用<code v-pre>useEffect</code>后，则能够将相同的逻辑抽离出来，这是类组件不具备的方法</p>
<p>对应的<code v-pre>useEffect</code>示例如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import React, { useState, useEffect } from 'react';
function Example() {
  const [count, setCount] = useState(0);
 
  useEffect(() => {    document.title = `You clicked ${count} times`;  });
  return (
    &lt;div>
      &lt;p>You clicked {count} times&lt;/p >
      &lt;button onClick={() => setCount(count + 1)}>
        Click me
      &lt;/button>
    &lt;/div>
  );
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>useEffect</code>第一个参数接受一个回调函数，默认情况下，<code v-pre>useEffect</code>会在第一次渲染和更新之后都会执行，相当于在<code v-pre>componentDidMount</code>和<code v-pre>componentDidUpdate</code>两个生命周期函数中执行回调</p>
<p>如果某些特定值在两次重渲染之间没有发生变化，你可以跳过对 effect 的调用，这时候只需要传入第二个参数，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述传入第二个参数后，如果 <code v-pre>count</code> 的值是 <code v-pre>5</code>，而且我们的组件重渲染的时候 <code v-pre>count</code> 还是等于 <code v-pre>5</code>，React 将对前一次渲染的 <code v-pre>[5]</code> 和后一次渲染的 <code v-pre>[5]</code> 进行比较，如果是相等则跳过<code v-pre>effects</code>执行</p>
<p>回调函数中可以返回一个清除函数，这是<code v-pre>effect</code>可选的清除机制，相当于类组件中<code v-pre>componentwillUnmount</code>生命周期函数，可做一些清除副作用的操作，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>useEffect(() => {
    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
        ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以， <code v-pre>useEffect</code>相当于<code v-pre>componentDidMount</code>，<code v-pre>componentDidUpdate</code> 和 <code v-pre>componentWillUnmount</code> 这三个生命周期函数的组合</p>
<h3 id="其它-hooks" tabindex="-1"><a class="header-anchor" href="#其它-hooks" aria-hidden="true">#</a> 其它 hooks</h3>
<p>在组件通信过程中可以使用<code v-pre>useContext</code>，<code v-pre>refs</code>学习中我们也用到了<code v-pre>useRef</code>获取<code v-pre>DOM</code>结构......</p>
<p>还有很多额外的<code v-pre>hooks</code>，如：</p>
<ul>
<li>useReducer</li>
<li>useCallback</li>
<li>useMemo</li>
<li>useRef</li>
</ul>
<h2 id="三、解决什么" tabindex="-1"><a class="header-anchor" href="#三、解决什么" aria-hidden="true">#</a> 三、解决什么</h2>
<p>通过对上面的初步认识，可以看到<code v-pre>hooks</code>能够更容易解决状态相关的重用的问题：</p>
<ul>
<li>
<p>每调用useHook一次都会生成一份独立的状态</p>
</li>
<li>
<p>通过自定义hook能够更好的封装我们的功能</p>
</li>
</ul>
<p>编写<code v-pre>hooks</code>为函数式编程，每个功能都包裹在函数中，整体风格更清爽，更优雅</p>
<p><code v-pre>hooks</code>的出现，使函数组件的功能得到了扩充，拥有了类组件相似的功能，在我们日常使用中，使用<code v-pre>hooks</code>能够解决大多数问题，并且还拥有代码复用机制，因此优先考虑<code v-pre>hooks</code></p>
<h2 id="拓展" tabindex="-1"><a class="header-anchor" href="#拓展" aria-hidden="true">#</a> 拓展</h2>
<p>hooks的理念。</p>
<p>react中的hooks有一些使用限制，例如，不能写在if内部，也不能嵌套者写。这里有条件渲染。</p>
<p>react的状态和UI没有对应关系，必须按顺序走。</p>
<p>vue中的hooks就没有这个问题。Ui和状态变化是一一对应的，是否写在if中没有关系。</p>
<p>react是完全是运行时的库，vue可以在编译时</p>
<p>hooks和class都是运行在react源码底层运行时之上的API，它们的地位是平等的（厨师做了两盘菜，看看你喜欢哪个）</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> hooks   Class
   ↑      ↑
   |      |
   |      |
--------------------
react源码底层运行时
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zh-hans.reactjs.org/docs/hooks-state.html</li>
<li>https://zh-hans.reactjs.org/docs/hooks-effect.html</li>
<li>https://www.cnblogs.com/lalalagq/p/9898531.html</li>
</ul>
</div></template>


