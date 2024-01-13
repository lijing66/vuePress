<template><div><h1 id="react事件绑定的方式" tabindex="-1"><a class="header-anchor" href="#react事件绑定的方式" aria-hidden="true">#</a> React事件绑定的方式</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>在<code v-pre>react</code>应用中，事件名都是用小驼峰格式进行书写，例如<code v-pre>onclick</code>要改写成<code v-pre>onClick</code></p>
<p>最简单的事件绑定如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class ShowAlert extends React.Component {
  showAlert() {
    console.log("Hi");
  }

  render() {
    return &lt;button onClick={this.showAlert}>show&lt;/button>;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面可以看到，事件绑定的方法需要使用<code v-pre>{}</code>包住</p>
<p>上述的代码看似没有问题，但是当将处理函数输出代码换成<code v-pre>console.log(this)</code>的时候，点击按钮，则会发现控制台输出<code v-pre>undefined</code></p>
<h2 id="二、如何绑定" tabindex="-1"><a class="header-anchor" href="#二、如何绑定" aria-hidden="true">#</a> 二、如何绑定</h2>
<p>为了解决上面正确输出<code v-pre>this</code>的问题，常见的绑定方式有如下：</p>
<ul>
<li>render方法中使用bind</li>
<li>render方法中使用箭头函数</li>
<li>constructor中bind</li>
<li>定义阶段使用箭头函数绑定</li>
</ul>
<h3 id="render方法中使用bind" tabindex="-1"><a class="header-anchor" href="#render方法中使用bind" aria-hidden="true">#</a> render方法中使用bind</h3>
<p>如果使用一个类组件，在其中给某个组件/元素一个<code v-pre>onClick</code>属性，它现在并会自定绑定其<code v-pre>this</code>到当前组件，解决这个问题的方法是在事件函数后使用<code v-pre>.bind(this)</code>将<code v-pre>this</code>绑定到当前组件中</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class App extends React.Component {
  handleClick() {
    console.log('this > ', this);
  }
  render() {
    return (
      &lt;div onClick={this.handleClick.bind(this)}>test&lt;/div>
    )
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式在组件每次<code v-pre>render</code>渲染的时候，都会重新进行<code v-pre>bind</code>的操作，影响性能</p>
<h3 id="render方法中使用箭头函数" tabindex="-1"><a class="header-anchor" href="#render方法中使用箭头函数" aria-hidden="true">#</a> render方法中使用箭头函数</h3>
<p>通过<code v-pre>ES6</code>的上下文来将<code v-pre>this</code>的指向绑定给当前组件，同样再每一次<code v-pre>render</code>的时候都会生成新的方法，影响性能</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class App extends React.Component {
  handleClick() {
    console.log('this > ', this);
  }
  render() {
    return (
      &lt;div onClick={e => this.handleClick(e)}>test&lt;/div>
    )
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="constructor中bind" tabindex="-1"><a class="header-anchor" href="#constructor中bind" aria-hidden="true">#</a> constructor中bind</h2>
<p>在<code v-pre>constructor</code>中预先<code v-pre>bind</code>当前组件，可以避免在<code v-pre>render</code>操作中重复绑定</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('this > ', this);
  }
  render() {
    return (
      &lt;div onClick={this.handleClick}>test&lt;/div>
    )
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="定义阶段使用箭头函数绑定" tabindex="-1"><a class="header-anchor" href="#定义阶段使用箭头函数绑定" aria-hidden="true">#</a> 定义阶段使用箭头函数绑定</h3>
<p>跟上述方式三一样，能够避免在<code v-pre>render</code>操作中重复绑定，实现也非常的简单，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class App extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick = () => {
    console.log('this > ', this);
  }
  render() {
    return (
      &lt;div onClick={this.handleClick}>test&lt;/div>
    )
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、区别" tabindex="-1"><a class="header-anchor" href="#三、区别" aria-hidden="true">#</a> 三、区别</h2>
<p>上述四种方法的方式，区别主要如下：</p>
<ul>
<li>编写方面：方式一、方式二写法简单，方式三的编写过于冗杂</li>
<li>性能方面：方式一和方式二在每次组件render的时候都会生成新的方法实例，性能问题欠缺。若该函数作为属性值传给子组件的时候，都会导致额外的渲染。而方式三、方式四只会生成一个方法实例</li>
</ul>
<p>综合上述，方式四是最优的事件绑定方式</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://segmentfault.com/a/1190000011317515 /</li>
</ul>
</div></template>


