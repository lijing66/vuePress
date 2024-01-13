<template><div><h1 id="如何提高组件的渲染效率的-在react中如何避免不必要的render" tabindex="-1"><a class="header-anchor" href="#如何提高组件的渲染效率的-在react中如何避免不必要的render" aria-hidden="true">#</a> 如何提高组件的渲染效率的？在React中如何避免不必要的render？</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><code v-pre>react</code> 基于虚拟 <code v-pre>DOM</code> 和高效 <code v-pre>Diff</code>算法的完美配合，实现了对 <code v-pre>DOM</code>最小粒度的更新，大多数情况下，<code v-pre>React</code>对 <code v-pre>DOM</code>的渲染效率足以我们的业务日常</p>
<p>复杂业务场景下，性能问题依然会困扰我们。此时需要采取一些措施来提升运行性能，避免不必要的渲染则是业务中常见的优化手段之一</p>
<h2 id="二、如何做" tabindex="-1"><a class="header-anchor" href="#二、如何做" aria-hidden="true">#</a> 二、如何做</h2>
<p>在之前文章中，我们了解到<code v-pre>render</code>的触发时机，简单来讲就是类组件通过调用<code v-pre>setState</code>方法， 就会导致<code v-pre>render</code>，父组件一旦发生<code v-pre>render</code>渲染，子组件一定也会执行<code v-pre>render</code>渲染</p>
<p>从上面可以看到，父组件渲染导致子组件渲染，子组件并没有发生任何改变，这时候就可以从避免无谓的渲染，具体实现的方式有如下：</p>
<ul>
<li>shouldComponentUpdate</li>
<li>PureComponent</li>
<li>React.memo</li>
</ul>
<h3 id="shouldcomponentupdate" tabindex="-1"><a class="header-anchor" href="#shouldcomponentupdate" aria-hidden="true">#</a> shouldComponentUpdate</h3>
<p>通过<code v-pre>shouldComponentUpdate</code>生命周期函数来比对 <code v-pre>state</code>和 <code v-pre>props</code>，确定是否要重新渲染</p>
<p>默认情况下返回<code v-pre>true</code>表示重新渲染，如果不希望组件重新渲染，返回 <code v-pre>false</code> 即可</p>
<h3 id="purecomponent" tabindex="-1"><a class="header-anchor" href="#purecomponent" aria-hidden="true">#</a> PureComponent</h3>
<p>跟<code v-pre>shouldComponentUpdate</code>原理基本一致，通过对 <code v-pre>props</code> 和 <code v-pre>state</code>的浅比较结果来实现 <code v-pre>shouldComponentUpdate</code>，源码大致如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>if (this._compositeType === CompositeTypes.PureClass) {
    shouldUpdate = !shallowEqual(prevProps, nextProps) || ! shallowEqual(inst.state, nextState);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>shallowEqual</code>对应方法大致如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * is 方法来判断两个值是否是相等的值，为何这么写可以移步 MDN 的文档
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x: mixed, y: mixed): boolean {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x &amp;&amp; y !== y;
  }
}

function shallowEqual(objA: mixed, objB: mixed): boolean {
  // 首先对基本类型进行比较
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // 长度不相等直接返回false
  if (keysA.length !== keysB.length) {
    return false;
  }

  // key相等的情况下，再去循环比较
  for (let i = 0; i &lt; keysA.length; i++) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当对象包含复杂的数据结构时，对象深层的数据已改变却没有触发 <code v-pre>render</code></p>
<p>注意：在<code v-pre>react</code>中，是不建议使用深层次结构的数据</p>
<h3 id="react-memo" tabindex="-1"><a class="header-anchor" href="#react-memo" aria-hidden="true">#</a> React.memo</h3>
<p><code v-pre>React.memo</code>用来缓存组件的渲染，避免不必要的更新，其实也是一个高阶组件，与 <code v-pre>PureComponent</code> 十分类似。但不同的是， <code v-pre>React.memo</code> 只能用于函数组件</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import { memo } from 'react';

function Button(props) {
  // Component code
}

export default memo(Button);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果需要深层次比较，这时候可以给<code v-pre>memo</code>第二个参数传递比较函数</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>function arePropsEqual(prevProps, nextProps) {
  // your code
  return prevProps === nextProps;
}

export default memo(Button, arePropsEqual);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p>在实际开发过程中，前端性能问题是一个必须考虑的问题，随着业务的复杂，遇到性能问题的概率也在增高</p>
<p>除此之外，建议将页面进行更小的颗粒化，如果一个过大，当状态发生修改的时候，就会导致整个大组件的渲染，而对组件进行拆分后，粒度变小了，也能够减少子组件不必要的渲染</p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://juejin.cn/post/6844903781679759367#heading-12</li>
</ul>
</div></template>


