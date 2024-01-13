<template><div><h1 id="在react中组件间过渡动画如何实现" tabindex="-1"><a class="header-anchor" href="#在react中组件间过渡动画如何实现" aria-hidden="true">#</a> 在react中组件间过渡动画如何实现？</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>在日常开发中，页面切换时的转场动画是比较基础的一个场景</p>
<p>当一个组件在显示与消失过程中存在过渡动画，可以很好的增加用户的体验</p>
<p>在<code v-pre>react</code>中实现过渡动画效果会有很多种选择，如<code v-pre>react-transition-group</code>，<code v-pre>react-motion</code>，<code v-pre>Animated</code>，以及原生的<code v-pre>CSS</code>都能完成切换动画</p>
<h2 id="二、如何实现" tabindex="-1"><a class="header-anchor" href="#二、如何实现" aria-hidden="true">#</a> 二、如何实现</h2>
<p>在<code v-pre>react</code>中，<code v-pre>react-transition-group</code>是一种很好的解决方案，其为元素添加<code v-pre>enter</code>，<code v-pre>enter-active</code>，<code v-pre>exit</code>，<code v-pre>exit-active</code>这一系列勾子</p>
<p>可以帮助我们方便的实现组件的入场和离场动画</p>
<p>其主要提供了三个主要的组件：</p>
<ul>
<li>CSSTransition：在前端开发中，结合 CSS 来完成过渡动画效果</li>
<li>SwitchTransition：两个组件显示和隐藏切换时，使用该组件</li>
<li>TransitionGroup：将多个动画组件包裹在其中，一般用于列表中元素的动画</li>
</ul>
<h3 id="csstransition" tabindex="-1"><a class="header-anchor" href="#csstransition" aria-hidden="true">#</a> CSSTransition</h3>
<p>其实现动画的原理在于，当<code v-pre>CSSTransition</code>的<code v-pre>in</code>属性置为<code v-pre>true</code>时，<code v-pre>CSSTransition</code>首先会给其子组件加上<code v-pre>xxx-enter</code>、<code v-pre>xxx-enter-active</code>的<code v-pre>class</code>执行动画</p>
<p>当动画执行结束后，会移除两个<code v-pre>class</code>，并且添加<code v-pre>-enter-done</code>的<code v-pre>class</code></p>
<p>所以可以利用这一点，通过<code v-pre>css</code>的<code v-pre>transition</code>属性，让元素在两个状态之间平滑过渡，从而得到相应的动画效果</p>
<p>当<code v-pre>in</code>属性置为<code v-pre>false</code>时，<code v-pre>CSSTransition</code>会给子组件加上<code v-pre>xxx-exit</code>和<code v-pre>xxx-exit-active</code>的<code v-pre>class</code>，然后开始执行动画，当动画结束后，移除两个<code v-pre>class</code>，然后添加<code v-pre>-enter-done</code>的<code v-pre>class</code></p>
<p>如下例子：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>export default class App2 extends React.PureComponent {

  state = {show: true};

  onToggle = () => this.setState({show: !this.state.show});

  render() {
    const {show} = this.state;
    return (
      &lt;div className={'container'}>
        &lt;div className={'square-wrapper'}>
          &lt;CSSTransition
            in={show}
            timeout={500}
            classNames={'fade'}
            unmountOnExit={true}
          >
            &lt;div className={'square'} />
          &lt;/CSSTransition>
        &lt;/div>
        &lt;Button onClick={this.onToggle}>toggle&lt;/Button>
      &lt;/div>
    );
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应<code v-pre>css</code>样式如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>.fade-enter {
  opacity: 0;
  transform: translateX(100%);
}

.fade-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 500ms;
}

.fade-exit {
  opacity: 1;
  transform: translateX(0);
}

.fade-exit-active {
  opacity: 0;
  transform: translateX(-100%);
  transition: all 500ms;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="switchtransition" tabindex="-1"><a class="header-anchor" href="#switchtransition" aria-hidden="true">#</a> SwitchTransition</h3>
<p><code v-pre>SwitchTransition</code>可以完成两个组件之间切换的炫酷动画</p>
<p>比如有一个按钮需要在<code v-pre>on</code>和<code v-pre>off</code>之间切换，我们希望看到<code v-pre>on</code>先从左侧退出，<code v-pre>off</code>再从右侧进入</p>
<p><code v-pre>SwitchTransition</code>中主要有一个属性<code v-pre>mode</code>，对应两个值：</p>
<ul>
<li>in-out：表示新组件先进入，旧组件再移除；</li>
<li>out-in：表示就组件先移除，新组建再进入</li>
</ul>
<p><code v-pre>SwitchTransition</code>组件里面要有<code v-pre>CSSTransition</code>，不能直接包裹你想要切换的组件</p>
<p>里面的<code v-pre>CSSTransition</code>组件不再像以前那样接受<code v-pre>in</code>属性来判断元素是何种状态，取而代之的是<code v-pre>key</code>属性</p>
<p>下面给出一个按钮入场和出场的示例，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import { SwitchTransition, CSSTransition } from "react-transition-group";

export default class SwitchAnimation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOn: true
    }
  }

  render() {
    const {isOn} = this.state;

    return (
      &lt;SwitchTransition mode="out-in">
        &lt;CSSTransition classNames="btn"
                       timeout={500}
                       key={isOn ? "on" : "off"}>
          {
          &lt;button onClick={this.btnClick.bind(this)}>
            {isOn ? "on": "off"}
          &lt;/button>
        }
        &lt;/CSSTransition>
      &lt;/SwitchTransition>
    )
  }

  btnClick() {
    this.setState({isOn: !this.state.isOn})
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>css</code>文件对应如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>.btn-enter {
  transform: translate(100%, 0);
  opacity: 0;
}

.btn-enter-active {
  transform: translate(0, 0);
  opacity: 1;
  transition: all 500ms;
}

.btn-exit {
  transform: translate(0, 0);
  opacity: 1;
}

.btn-exit-active {
  transform: translate(-100%, 0);
  opacity: 0;
  transition: all 500ms;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="transitiongroup" tabindex="-1"><a class="header-anchor" href="#transitiongroup" aria-hidden="true">#</a> TransitionGroup</h3>
<p>当有一组动画的时候，就可将这些<code v-pre>CSSTransition</code>放入到一个<code v-pre>TransitionGroup</code>中来完成动画</p>
<p>同样<code v-pre>CSSTransition</code>里面没有<code v-pre>in</code>属性，用到了<code v-pre>key</code>属性</p>
<p><code v-pre>TransitionGroup</code>在感知<code v-pre>children</code>发生变化的时候，先保存移除的节点，当动画结束后才真正移除</p>
<p>其处理方式如下：</p>
<ul>
<li>
<p>插入的节点，先渲染dom，然后再做动画</p>
</li>
<li>
<p>删除的节点，先做动画，然后再删除dom</p>
</li>
</ul>
<p>如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import React, { PureComponent } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default class GroupAnimation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      friends: []
    }
  }

  render() {
    return (
      &lt;div>
        &lt;TransitionGroup>
          {
            this.state.friends.map((item, index) => {
              return (
                &lt;CSSTransition classNames="friend" timeout={300} key={index}>
                  &lt;div>{item}&lt;/div>
                &lt;/CSSTransition>
              )
            })
          }
        &lt;/TransitionGroup>
        &lt;button onClick={e => this.addFriend()}>+friend&lt;/button>
      &lt;/div>
    )
  }

  addFriend() {
    this.setState({
      friends: [...this.state.friends, "coderwhy"]
    })
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应<code v-pre>css</code>如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>.friend-enter {
    transform: translate(100%, 0);
    opacity: 0;
}

.friend-enter-active {
    transform: translate(0, 0);
    opacity: 1;
    transition: all 500ms;
}

.friend-exit {
    transform: translate(0, 0);
    opacity: 1;
}

.friend-exit-active {
    transform: translate(-100%, 0);
    opacity: 0;
    transition: all 500ms;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://segmentfault.com/a/1190000018861018</li>
<li>https://mp.weixin.qq.com/s/14HneI7SpfrRHKtqgosIiA</li>
</ul>
</div></template>


