<template><div><h1 id="react中组件之间如何通信" tabindex="-1"><a class="header-anchor" href="#react中组件之间如何通信" aria-hidden="true">#</a> React中组件之间如何通信？</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>我们将组件间通信可以拆分为两个词：</p>
<ul>
<li>组件</li>
<li>通信</li>
</ul>
<p>回顾<a href="https://mp.weixin.qq.com/s/uFjMz6BByA5eknBgkvgdeQ" target="_blank" rel="noopener noreferrer">Vue系列 (opens new window)<ExternalLinkIcon/></a>的文章，组件是<code v-pre>vue</code>中最强大的功能之一，同样组件化是<code v-pre>React</code>的核心思想</p>
<p>相比<code v-pre>vue</code>，<code v-pre>React</code>的组件更加灵活和多样，按照不同的方式可以分成很多类型的组件</p>
<p>而通信指的是发送者通过某种媒体以某种格式来传递信息到收信者以达到某个目的，广义上，任何信息的交通都是通信</p>
<p>组件间通信即指组件通过某种方式来传递信息以达到某个目的</p>
<h2 id="二、如何通信" tabindex="-1"><a class="header-anchor" href="#二、如何通信" aria-hidden="true">#</a> 二、如何通信</h2>
<p>组件传递的方式有很多种，根据传送者和接收者可以分为如下：</p>
<ul>
<li>父组件向子组件传递</li>
<li>子组件向父组件传递</li>
<li>兄弟组件之间的通信</li>
<li>父组件向后代组件传递</li>
<li>非关系组件传递</li>
</ul>
<h3 id="父组件向子组件传递" tabindex="-1"><a class="header-anchor" href="#父组件向子组件传递" aria-hidden="true">#</a> 父组件向子组件传递</h3>
<p>由于<code v-pre>React</code>的数据流动为单向的，父组件向子组件传递是最常见的方式</p>
<p>父组件在调用子组件的时候，只需要在子组件标签内传递参数，子组件通过<code v-pre>props</code>属性就能接收父组件传递过来的参数</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>function EmailInput(props) {
  return (
    &lt;label>
      Email: &lt;input value={props.email} />
    &lt;/label>
  );
}

const element = &lt;EmailInput email="123124132@163.com" />;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="子组件向父组件传递" tabindex="-1"><a class="header-anchor" href="#子组件向父组件传递" aria-hidden="true">#</a> 子组件向父组件传递</h3>
<p>子组件向父组件通信的基本思路是，父组件向子组件传一个函数，然后通过这个函数的回调，拿到子组件传过来的值</p>
<p>父组件对应代码如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class Parents extends Component {
  constructor() {
    super();
    this.state = {
      price: 0
    };
  }

  getItemPrice(e) {
    this.setState({
      price: e
    });
  }

  render() {
    return (
      &lt;div>
        &lt;div>price: {this.state.price}&lt;/div>
        {/* 向子组件中传入一个函数  */}
        &lt;Child getPrice={this.getItemPrice.bind(this)} />
      &lt;/div>
    );
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>子组件对应代码如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class Child extends Component {
  clickGoods(e) {
    // 在此函数中传入值
    this.props.getPrice(e);
  }

  render() {
    return (
      &lt;div>
        &lt;button onClick={this.clickGoods.bind(this, 100)}>goods1&lt;/button>
        &lt;button onClick={this.clickGoods.bind(this, 1000)}>goods2&lt;/button>
      &lt;/div>
    );
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="兄弟组件之间的通信" tabindex="-1"><a class="header-anchor" href="#兄弟组件之间的通信" aria-hidden="true">#</a> 兄弟组件之间的通信</h3>
<p>如果是兄弟组件之间的传递，则父组件作为中间层来实现数据的互通，通过使用父组件传递</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {count: 0}
  }
  setCount = () => {
    this.setState({count: this.state.count + 1})
  }
  render() {
    return (
      &lt;div>
        &lt;SiblingA
          count={this.state.count}
        />
        &lt;SiblingB
          onClick={this.setCount}
        />
      &lt;/div>
    );
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="父组件向后代组件传递" tabindex="-1"><a class="header-anchor" href="#父组件向后代组件传递" aria-hidden="true">#</a> 父组件向后代组件传递</h3>
<p>父组件向后代组件传递数据是一件最普通的事情，就像全局数据一样</p>
<p>使用<code v-pre>context</code>提供了组件之间通讯的一种方式，可以共享数据，其他数据都能读取对应的数据</p>
<p>通过使用<code v-pre>React.createContext</code>创建一个<code v-pre>context</code></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> const PriceContext = React.createContext('price')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>context</code>创建成功后，其下存在<code v-pre>Provider</code>组件用于创建数据源，<code v-pre>Consumer</code>组件用于接收数据，使用实例如下：</p>
<p><code v-pre>Provider</code>组件通过<code v-pre>value</code>属性用于给后代组件传递数据：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>&lt;PriceContext.Provider value={100}>
&lt;/PriceContext.Provider>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想要获取<code v-pre>Provider</code>传递的数据，可以通过<code v-pre>Consumer</code>组件或者或者使用<code v-pre>contextType</code>属性接收，对应分别如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class MyClass extends React.Component {
  static contextType = PriceContext;
  render() {
    let price = this.context;
    /* 基于这个值进行渲染工作 */
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Consumer</code>组件：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>&lt;PriceContext.Consumer>
    { /*这里是一个函数*/ }
    {
        price => &lt;div>price：{price}&lt;/div>
    }
&lt;/PriceContext.Consumer>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="非关系组件传递" tabindex="-1"><a class="header-anchor" href="#非关系组件传递" aria-hidden="true">#</a> 非关系组件传递</h3>
<p>如果组件之间关系类型比较复杂的情况，建议将数据进行一个全局资源管理，从而实现通信，例如<code v-pre>redux</code>。关于<code v-pre>redux</code>的使用后续再详细介绍</p>
<h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p>由于<code v-pre>React</code>是单向数据流，主要思想是组件不会改变接收的数据，只会监听数据的变化，当数据发生变化时它们会使用接收到的新值，而不是去修改已有的值</p>
<p>因此，可以看到通信过程中，数据的存储位置都是存放在上级位置中</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://react.docschina.org/docs/context.html</li>
</ul>
</div></template>


