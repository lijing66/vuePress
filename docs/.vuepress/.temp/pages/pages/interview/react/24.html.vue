<template><div><h1 id="说说你对immutable的理解-如何应用在react项目中" tabindex="-1"><a class="header-anchor" href="#说说你对immutable的理解-如何应用在react项目中" aria-hidden="true">#</a> 说说你对immutable的理解？如何应用在react项目中？</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>Immutable，不可改变的，在计算机中，即指一旦创建，就不能再被更改的数据</p>
<p>对 <code v-pre>Immutable</code>对象的任何修改或添加删除操作都会返回一个新的 <code v-pre>Immutable</code>对象</p>
<p><code v-pre>Immutable</code> 实现的原理是 <code v-pre>Persistent Data Structure</code>（持久化数据结构）:</p>
<ul>
<li>用一种数据结构来保存数据</li>
<li>当数据被修改时，会返回一个对象，但是新的对象会尽可能的利用之前的数据结构而不会对内存造成浪费</li>
</ul>
<p>也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变，同时为了避免 <code v-pre>deepCopy</code>把所有节点都复制一遍带来的性能损耗，<code v-pre>Immutable</code> 使用了 <code v-pre>Structural Sharing</code>（结构共享）</p>
<p>如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享</p>
<p>如下图所示：</p>
<p><img src="https://pic4.zhimg.com/80/2b4c801a7b40eefcd4ee6767fb984fdf_720w.gif" alt=""></p>
<h2 id="二、如何使用" tabindex="-1"><a class="header-anchor" href="#二、如何使用" aria-hidden="true">#</a> 二、如何使用</h2>
<p>使用<code v-pre>Immutable</code>对象最主要的库是<code v-pre>immutable.js</code></p>
<p>immutable.js 是一个完全独立的库，无论基于什么框架都可以用它</p>
<p>其出现场景在于弥补 Javascript 没有不可变数据结构的问题，通过 structural sharing来解决的性能问题</p>
<p>内部提供了一套完整的 Persistent Data Structure，还有很多易用的数据类型，如<code v-pre>Collection</code>、<code v-pre>List</code>、<code v-pre>Map</code>、<code v-pre>Set</code>、<code v-pre>Record</code>、<code v-pre>Seq</code>，其中：</p>
<ul>
<li>
<p>List: 有序索引集，类似 JavaScript 中的 Array</p>
</li>
<li>
<p>Map: 无序索引集，类似 JavaScript 中的 Object</p>
</li>
<li>
<p>Set: 没有重复值的集合</p>
</li>
</ul>
<p>主要的方法如下：</p>
<ul>
<li>fromJS()：将一个js数据转换为Immutable类型的数据</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>const obj = Immutable.fromJS({a:'123',b:'234'})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>toJS()：将一个Immutable数据转换为JS类型的数据</li>
<li>is()：对两个对象进行比较</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import { Map, is } from 'immutable'
const map1 = Map({ a: 1, b: 1, c: 1 })
const map2 = Map({ a: 1, b: 1, c: 1 })
map1 === map2   //false
Object.is(map1, map2) // false
is(map1, map2) // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>get(key)：对数据或对象取值</p>
</li>
<li>
<p>getIn([]) ：对嵌套对象或数组取值，传参为数组，表示位置</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>let abs = Immutable.fromJS({a: {b:2}});
abs.getIn(['a', 'b']) // 2
abs.getIn(['a', 'c']) // 子级没有值

let arr = Immutable.fromJS([1 ,2, 3, {a: 5}]);
arr.getIn([3, 'a']); // 5
arr.getIn([3, 'c']); // 子级没有值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下例子：使用方法如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import Immutable from 'immutable';
foo = Immutable.fromJS({a: {b: 1}});
bar = foo.setIn(['a', 'b'], 2);   // 使用 setIn 赋值
console.log(foo.getIn(['a', 'b']));  // 使用 getIn 取值，打印 1
console.log(foo === bar);  //  打印 false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果换到原生的<code v-pre>js</code>，则对应如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>let foo = {a: {b: 1}};
let bar = foo;
bar.a.b = 2;
console.log(foo.a.b);  // 打印 2
console.log(foo === bar);  //  打印 true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、在react中应用" tabindex="-1"><a class="header-anchor" href="#三、在react中应用" aria-hidden="true">#</a> 三、在React中应用</h2>
<p>使用 <code v-pre>Immutable</code>可以给 <code v-pre>React</code> 应用带来性能的优化，主要体现在减少渲染的次数</p>
<p>在做<code v-pre>react</code>性能优化的时候，为了避免重复渲染，我们会在<code v-pre>shouldComponentUpdate()</code>中做对比，当返回<code v-pre>true</code>执行<code v-pre>render</code>方法</p>
<p><code v-pre>Immutable</code>通过<code v-pre>is</code>方法则可以完成对比，而无需像一样通过深度比较的方式比较</p>
<p>在使用<code v-pre>redux</code>过程中也可以结合<code v-pre>Immutable</code>，不使用<code v-pre>Immutable</code>前修改一个数据需要做一个深拷贝</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import '_' from 'lodash';

const Component = React.createClass({
  getInitialState() {
    return {
      data: { times: 0 }
    }
  },
  handleAdd() {
    let data = _.cloneDeep(this.state.data);
    data.times = data.times + 1;
    this.setState({ data: data });
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 Immutable 后：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>getInitialState() {
  return {
    data: Map({ times: 0 })
  }
},
  handleAdd() {
    this.setState({ data: this.state.data.update('times', v => v + 1) });
    // 这时的 times 并不会改变
    console.log(this.state.data.get('times'));
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同理，在<code v-pre>redux</code>中也可以将数据进行<code v-pre>fromJS</code>处理</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import * as constants from './constants'
import {fromJS} from 'immutable'
const defaultState = fromJS({ //将数据转化成immutable数据
    home:true,
    focused:false,
    mouseIn:false,
    list:[],
    page:1,
    totalPage:1
})
export default(state=defaultState,action)=>{
    switch(action.type){
        case constants.SEARCH_FOCUS:
            return state.set('focused',true) //更改immutable数据
        case constants.CHANGE_HOME_ACTIVE:
            return state.set('home',action.value)
        case constants.SEARCH_BLUR:
            return state.set('focused',false)
        case constants.CHANGE_LIST:
            // return state.set('list',action.data).set('totalPage',action.totalPage)
            //merge效率更高，执行一次改变多个数据
            return state.merge({
                list:action.data,
                totalPage:action.totalPage
            })
        case constants.MOUSE_ENTER:
            return state.set('mouseIn',true)
        case constants.MOUSE_LEAVE:
            return state.set('mouseIn',false)
        case constants.CHANGE_PAGE:
            return state.set('page',action.page)
        default:
            return state
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zhuanlan.zhihu.com/p/20295971?spm=a2c4e.11153940.blogcont69516.18.4f275a00EzBHjr&amp;columnSlug=purerender</li>
<li>https://www.jianshu.com/p/7bf04638e82a</li>
</ul>
</div></template>


