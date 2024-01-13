<template><div><h1 id="react构建组件的方式有哪些-区别" tabindex="-1"><a class="header-anchor" href="#react构建组件的方式有哪些-区别" aria-hidden="true">#</a> React构建组件的方式有哪些？区别？</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>组件就是把图形、非图形的各种逻辑均抽象为一个统一的概念（组件）来实现开发的模式</p>
<p>在<code v-pre>React</code>中，一个类、一个函数都可以视为一个组件</p>
<p>在<a href="https://mp.weixin.qq.com/s/Wi0r38LBopsyQ9HesMID0g" target="_blank" rel="noopener noreferrer">之前文章 (opens new window)<ExternalLinkIcon/></a>中，我们了解到组件所存在的优势：</p>
<ul>
<li>降低整个系统的耦合度，在保持接口不变的情况下，我们可以替换不同的组件快速完成需求，例如输入框，可以替换为日历、时间、范围等组件作具体的实现</li>
<li>调试方便，由于整个系统是通过组件组合起来的，在出现问题的时候，可以用排除法直接移除组件，或者根据报错的组件快速定位问题，之所以能够快速定位，是因为每个组件之间低耦合，职责单一，所以逻辑会比分析整个系统要简单</li>
<li>提高可维护性，由于每个组件的职责单一，并且组件在系统中是被复用的，所以对代码进行优化可获得系统的整体升级</li>
</ul>
<h2 id="二、如何构建" tabindex="-1"><a class="header-anchor" href="#二、如何构建" aria-hidden="true">#</a> 二、如何构建</h2>
<p>在<code v-pre>React</code>目前来讲，组件的创建主要分成了三种方式：</p>
<ul>
<li>函数式创建</li>
<li>通过 React.createClass 方法创建</li>
<li>继承 React.Component 创建</li>
</ul>
<h3 id="函数式创建" tabindex="-1"><a class="header-anchor" href="#函数式创建" aria-hidden="true">#</a> 函数式创建</h3>
<p>在<code v-pre>React Hooks</code>出来之前，函数式组件可以视为无状态组件，只负责根据传入的<code v-pre>props</code>来展示视图，不涉及对<code v-pre>state</code>状态的操作</p>
<p>大多数组件可以写为无状态组件，通过简单组合构建其他组件</p>
<p>在<code v-pre>React</code>中，通过函数简单创建组件的示例如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>function HelloComponent(props, /* context */) {
  return &lt;div>Hello {props.name}&lt;/div>
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通过-react-createclass-方法创建" tabindex="-1"><a class="header-anchor" href="#通过-react-createclass-方法创建" aria-hidden="true">#</a> 通过 React.createClass 方法创建</h3>
<p><code v-pre>React.createClass</code>是react刚开始推荐的创建组件的方式，目前这种创建方式已经不怎么用了</p>
<p>像上述通过函数式创建的组件的方式，最终会通过<code v-pre>babel</code>转化成<code v-pre>React.createClass</code>这种形式，转化成如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>function HelloComponent(props) /* context */{
  return React.createElement(
    "div",
    null,
    "Hello ",
    props.name
  );
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于上述的编写方式过于冗杂，目前基本上不使用上</p>
<h3 id="继承-react-component-创建" tabindex="-1"><a class="header-anchor" href="#继承-react-component-创建" aria-hidden="true">#</a> 继承 React.Component 创建</h3>
<p>同样在<code v-pre>react hooks</code>出来之前，有状态的组件只能通过继承<code v-pre>React.Component</code>这种形式进行创建</p>
<p>有状态的组件也就是组件内部存在维护的数据，在类创建的方式中通过<code v-pre>this.state</code>进行访问</p>
<p>当调用<code v-pre>this.setState</code>修改组件的状态时，组价会再次会调用<code v-pre>render()</code>方法进行重新渲染</p>
<p>通过继承<code v-pre>React.Component</code>创建一个时钟示例如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      &lt;div>
        Seconds: {this.state.seconds}
      &lt;/div>
    );
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、区别" tabindex="-1"><a class="header-anchor" href="#三、区别" aria-hidden="true">#</a> 三、区别</h2>
<p>由于<code v-pre>React.createClass</code>创建的方式过于冗杂，并不建议使用</p>
<p>而像函数式创建和类组件创建的区别主要在于需要创建的组件是否需要为有状态组件：</p>
<ul>
<li>
<p>对于一些无状态的组件创建，建议使用函数式创建的方式</p>
</li>
<li>
<p>由于<code v-pre>react hooks</code>的出现，函数式组件创建的组件通过使用<code v-pre>hooks</code>方法也能使之成为有状态组件，再加上目前推崇函数式编程，所以这里建议都使用函数式的方式来创建组件</p>
</li>
</ul>
<p>在考虑组件的选择原则上，能用无状态组件则用无状态组件</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://react.docschina.org/</li>
</ul>
</div></template>


