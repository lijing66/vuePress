<template><div><h1 id="受控组件和非受控组件" tabindex="-1"><a class="header-anchor" href="#受控组件和非受控组件" aria-hidden="true">#</a> 受控组件和非受控组件</h1>
<h2 id="一、受控组件" tabindex="-1"><a class="header-anchor" href="#一、受控组件" aria-hidden="true">#</a> 一、受控组件</h2>
<p>受控组件，简单来讲，就是受我们控制的组件，组件的状态全程响应外部数据</p>
<p>举个简单的例子：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class TestComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = { username: 'lindaidai' };
  }
  render () {
    return &lt;input name="username" value={this.state.username} />
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候当我们在输入框输入内容的时候，会发现输入的内容并无法显示出来，也就是<code v-pre>input</code>标签是一个可读的状态</p>
<p>这是因为<code v-pre>value</code>被<code v-pre>this.state.username</code>所控制住。当用户输入新的内容时，<code v-pre>this.state.username</code>并不会自动更新，这样的话<code v-pre>input</code>内的内容也就不会变了</p>
<p>如果想要解除被控制，可以为<code v-pre>input</code>标签设置<code v-pre>onChange</code>事件，输入的时候触发事件函数，在函数内部实现<code v-pre>state</code>的更新，从而导致<code v-pre>input</code>框的内容页发现改变</p>
<p>因此，受控组件我们一般需要初始状态和一个状态更新事件函数</p>
<h2 id="二、非受控组件" tabindex="-1"><a class="header-anchor" href="#二、非受控组件" aria-hidden="true">#</a> 二、非受控组件</h2>
<p>非受控组件，简单来讲，就是不受我们控制的组件</p>
<p>一般情况是在初始化的时候接受外部数据，然后自己在内部存储其自身状态</p>
<p>当需要时，可以使用<code v-pre>ref</code> 查询 <code v-pre>DOM</code>并查找其当前值，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import React, { Component } from 'react';

export class UnControll extends Component {
  constructor (props) {
    super(props);
    this.inputRef = React.createRef();
  }
  handleSubmit = (e) => {
    console.log('我们可以获得input内的值为', this.inputRef.current.value);
    e.preventDefault();
  }
  render () {
    return (
      &lt;form onSubmit={e => this.handleSubmit(e)}>
        &lt;input defaultValue="lindaidai" ref={this.inputRef} />
        &lt;input type="submit" value="提交" />
      &lt;/form>
    )
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于<code v-pre>refs</code>的详情使用可以参考<a href="https://mp.weixin.qq.com/s/ZBKWcslVBi0IKQgz7lYzbA" target="_blank" rel="noopener noreferrer">之前文章 (opens new window)<ExternalLinkIcon/></a></p>
<h2 id="三、应用场景" tabindex="-1"><a class="header-anchor" href="#三、应用场景" aria-hidden="true">#</a> 三、应用场景</h2>
<p>大部分时候推荐使用受控组件来实现表单，因为在受控组件中，表单数据由<code v-pre>React</code>组件负责处理</p>
<p>如果选择非受控组件的话，控制能力较弱，表单数据就由<code v-pre>DOM</code>本身处理，但更加方便快捷，代码量少</p>
<p>针对两者的区别，其应用场景如下图所示：</p>
<p><img src="https://static.vue-js.com/f28aed20-df2f-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>http://meloguo.com/2018/10/08/受控与非受控组件/</li>
<li>https://zhuanlan.zhihu.com/p/37579677</li>
</ul>
</div></template>


