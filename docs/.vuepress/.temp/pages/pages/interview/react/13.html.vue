<template><div><h1 id="说说对react中类组件和函数组件的理解-有什么区别" tabindex="-1"><a class="header-anchor" href="#说说对react中类组件和函数组件的理解-有什么区别" aria-hidden="true">#</a> 说说对React中类组件和函数组件的理解？有什么区别？</h1>
<h2 id="一、类组件" tabindex="-1"><a class="header-anchor" href="#一、类组件" aria-hidden="true">#</a> 一、类组件</h2>
<p>类组件，顾名思义，也就是通过使用<code v-pre>ES6</code>类的编写形式去编写组件，该类必须继承<code v-pre>React.Component</code></p>
<p>如果想要访问父组件传递过来的参数，可通过<code v-pre>this.props</code>的方式去访问</p>
<p>在组件中必须实现<code v-pre>render</code>方法，在<code v-pre>return</code>中返回<code v-pre>React</code>对象，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class Welcome extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return &lt;h1>Hello, {this.props.name}&lt;/h1>
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、函数组件" tabindex="-1"><a class="header-anchor" href="#二、函数组件" aria-hidden="true">#</a> 二、函数组件</h2>
<p>函数组件，顾名思义，就是通过函数编写的形式去实现一个<code v-pre>React</code>组件，是<code v-pre>React</code>中定义组件最简单的方式</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>function Welcome(props) {
  return &lt;h1>Hello, {props.name}&lt;/h1>;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数第一个参数为<code v-pre>props</code>用于接收父组件传递过来的参数</p>
<h2 id="三、区别" tabindex="-1"><a class="header-anchor" href="#三、区别" aria-hidden="true">#</a> 三、区别</h2>
<p>针对两种<code v-pre>React</code>组件，其区别主要分成以下几大方向：</p>
<ul>
<li>
<p>编写形式</p>
</li>
<li>
<p>状态管理</p>
</li>
<li>
<p>生命周期</p>
</li>
<li>
<p>调用方式</p>
</li>
<li>
<p>获取渲染的值</p>
</li>
</ul>
<h3 id="编写形式" tabindex="-1"><a class="header-anchor" href="#编写形式" aria-hidden="true">#</a> 编写形式</h3>
<p>两者最明显的区别在于编写形式的不同，同一种功能的实现可以分别对应类组件和函数组件的编写形式</p>
<p>函数组件：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>function Welcome(props) {
  return &lt;h1>Hello, {props.name}&lt;/h1>;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类组件：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class Welcome extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return &lt;h1>Hello, {this.props.name}&lt;/h1>
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="状态管理" tabindex="-1"><a class="header-anchor" href="#状态管理" aria-hidden="true">#</a> 状态管理</h3>
<p>在<code v-pre>hooks</code>出来之前，函数组件就是无状态组件，不能保管组件的状态，不像类组件中调用<code v-pre>setState</code></p>
<p>如果想要管理<code v-pre>state</code>状态，可以使用<code v-pre>useState</code>，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>const FunctionalComponent = () => {
    const [count, setCount] = React.useState(0);

    return (
        &lt;div>
            &lt;p>count: {count}&lt;/p >
            &lt;button onClick={() => setCount(count + 1)}>Click&lt;/button>
        &lt;/div>
    );
};

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用<code v-pre>hooks</code>情况下，一般如果函数组件调用<code v-pre>state</code>，则需要创建一个类组件或者<code v-pre>state</code>提升到你的父组件中，然后通过<code v-pre>props</code>对象传递到子组件</p>
<h3 id="生命周期" tabindex="-1"><a class="header-anchor" href="#生命周期" aria-hidden="true">#</a> 生命周期</h3>
<p>在函数组件中，并不存在生命周期，这是因为这些生命周期钩子都来自于继承的<code v-pre>React.Component</code></p>
<p>所以，如果用到生命周期，就只能使用类组件</p>
<p>但是函数组件使用<code v-pre>useEffect</code>也能够完成替代生命周期的作用，这里给出一个简单的例子：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>const FunctionalComponent = () => {
    useEffect(() => {
        console.log("Hello");
    }, []);
    return &lt;h1>Hello, World&lt;/h1>;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述简单的例子对应类组件中的<code v-pre>componentDidMount</code>生命周期</p>
<p>如果在<code v-pre>useEffect</code>回调函数中<code v-pre>return</code>一个函数，则<code v-pre>return</code>函数会在组件卸载的时候执行，正如<code v-pre>componentWillUnmount</code></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>const FunctionalComponent = () => {
 React.useEffect(() => {
   return () => {
     console.log("Bye");
   };
 }, []);
 return &lt;h1>Bye, World&lt;/h1>;
};

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="调用方式" tabindex="-1"><a class="header-anchor" href="#调用方式" aria-hidden="true">#</a> 调用方式</h3>
<p>如果是一个函数组件，调用则是执行函数即可：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 你的代码 
function SayHi() { 
    return &lt;p>Hello, React&lt;/p > 
} 
// React内部 
const result = SayHi(props) // » &lt;p>Hello, React&lt;/p >
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是一个类组件，则需要将组件进行实例化，然后调用实例对象的<code v-pre>render</code>方法：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 你的代码 
class SayHi extends React.Component { 
    render() { 
        return &lt;p>Hello, React&lt;/p > 
    } 
} 
// React内部 
const instance = new SayHi(props) // » SayHi {} 
const result = instance.render() // » &lt;p>Hello, React&lt;/p >
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取渲染的值" tabindex="-1"><a class="header-anchor" href="#获取渲染的值" aria-hidden="true">#</a> 获取渲染的值</h3>
<p>首先给出一个示例</p>
<p>函数组件对应如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  }

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  }

  return (
    &lt;button onClick={handleClick}>Follow&lt;/button>
  )
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类组件对应如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class ProfilePage extends React.Component {
  showMessage() {
    alert('Followed ' + this.props.user);
  }

  handleClick() {
    setTimeout(this.showMessage.bind(this), 3000);
  }

  render() {
    return &lt;button onClick={this.handleClick.bind(this)}>Follow&lt;/button>
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两者看起来实现功能是一致的，但是在类组件中，输出<code v-pre>this.props.user</code>，<code v-pre>Props</code>在 <code v-pre>React</code>中是不可变的所以它永远不会改变，但是 <code v-pre>this</code> 总是可变的，以便您可以在 <code v-pre>render</code> 和生命周期函数中读取新版本</p>
<p>因此，如果我们的组件在请求运行时更新。<code v-pre>this.props</code> 将会改变。<code v-pre>showMessage</code>方法从“最新”的 <code v-pre>props</code> 中读取 <code v-pre>user</code></p>
<p>而函数组件，本身就不存在<code v-pre>this</code>，<code v-pre>props</code>并不发生改变，因此同样是点击，<code v-pre>alert</code>的内容仍旧是之前的内容</p>
<h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3>
<p>两种组件都有各自的优缺点</p>
<p>函数组件语法更短、更简单，这使得它更容易开发、理解和测试</p>
<p>而类组件也会因大量使用 <code v-pre>this</code>而让人感到困惑</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zh-hans.reactjs.org/docs/components-and-props.html#function-and-class-components</li>
<li>https://juejin.cn/post/6844903806140973069</li>
</ul>
</div></template>


