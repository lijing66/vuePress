<template><div><h1 id="说说react-jsx转换成真实dom过程" tabindex="-1"><a class="header-anchor" href="#说说react-jsx转换成真实dom过程" aria-hidden="true">#</a> 说说React Jsx转换成真实DOM过程？</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p><code v-pre>react</code>通过将组件编写的<code v-pre>JSX</code>映射到屏幕，以及组件中的状态发生了变化之后 <code v-pre>React</code>会将这些「变化」更新到屏幕上</p>
<p>在前面文章了解中，<code v-pre>JSX</code>通过<code v-pre>babel</code>最终转化成<code v-pre>React.createElement</code>这种形式，例如：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>&lt;div>
  &lt; img src="avatar.png" className="profile" />
  &lt;Hello />
&lt;/div>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会被<code v-pre>bebel</code>转化成如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>React.createElement(
  "div",
  null,
  React.createElement("img", {
    src: "avatar.png",
    className: "profile"
  }),
  React.createElement(Hello, null)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在转化过程中，<code v-pre>babel</code>在编译时会判断 JSX 中组件的首字母：</p>
<ul>
<li>
<p>当首字母为小写时，其被认定为原生 <code v-pre>DOM</code> 标签，<code v-pre>createElement</code> 的第一个变量被编译为字符串</p>
</li>
<li>
<p>当首字母为大写时，其被认定为自定义组件，createElement 的第一个变量被编译为对象</p>
</li>
</ul>
<p>最终都会通过<code v-pre>RenderDOM.render(...)</code>方法进行挂载，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ReactDOM.render(&lt;App />,  document.getElementById("root"));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="二、过程" tabindex="-1"><a class="header-anchor" href="#二、过程" aria-hidden="true">#</a> 二、过程</h2>
<p>在<code v-pre>react</code>中，节点大致可以分成四个类别：</p>
<ul>
<li>原生标签节点</li>
<li>文本节点</li>
<li>函数组件</li>
<li>类组件</li>
</ul>
<p>如下所示：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class ClassComponent extends Component {
  static defaultProps = {
    color: "pink"
  };
  render() {
    return (
      &lt;div className="border">
        &lt;h3>ClassComponent&lt;/h3>
        &lt;p className={this.props.color}>{this.props.name}&lt;/p >
      &lt;/div>
    );
  }
}

function FunctionComponent(props) {
  return (
    &lt;div className="border">
      FunctionComponent
      &lt;p>{props.name}&lt;/p >
    &lt;/div>
  );
}

const jsx = (
  &lt;div className="border">
    &lt;p>xx&lt;/p >
    &lt; a href=" ">xxx&lt;/ a>
    &lt;FunctionComponent name="函数组件" />
    &lt;ClassComponent name="类组件" color="red" />
  &lt;/div>
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些类别最终都会被转化成<code v-pre>React.createElement</code>这种形式</p>
<p><code v-pre>React.createElement</code>其被调用时会传⼊标签类型<code v-pre>type</code>，标签属性<code v-pre>props</code>及若干子元素<code v-pre>children</code>，作用是生成一个虚拟<code v-pre>Dom</code>对象，如下所示：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>function createElement(type, config, ...children) {
    if (config) {
        delete config.__self;
        delete config.__source;
    }
    // ! 源码中做了详细处理，⽐如过滤掉key、ref等
    const props = {
        ...config,
        children: children.map(child =>
   typeof child === "object" ? child : createTextNode(child)
  )
    };
    return {
        type,
        props
    };
}
function createTextNode(text) {
    return {
        type: TEXT,
        props: {
            children: [],
            nodeValue: text
        }
    };
}
export default {
    createElement
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>createElement</code>会根据传入的节点信息进行一个判断：</p>
<ul>
<li>如果是原生标签节点， type 是字符串，如div、span</li>
<li>如果是文本节点， type就没有，这里是 TEXT</li>
<li>如果是函数组件，type 是函数名</li>
<li>如果是类组件，type 是类名</li>
</ul>
<p>虚拟<code v-pre>DOM</code>会通过<code v-pre>ReactDOM.render</code>进行渲染成真实<code v-pre>DOM</code>，使用方法如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ReactDOM.render(element, container[, callback])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当首次调用时，容器节点里的所有 <code v-pre>DOM</code> 元素都会被替换，后续的调用则会使用 <code v-pre>React</code> 的 <code v-pre>diff</code>算法进行高效的更新</p>
<p>如果提供了可选的回调函数<code v-pre>callback</code>，该回调将在组件被渲染或更新之后被执行</p>
<p><code v-pre>render</code>大致实现方法如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>function render(vnode, container) {
    console.log("vnode", vnode); // 虚拟DOM对象
    // vnode _> node
    const node = createNode(vnode, container);
    container.appendChild(node);
}

// 创建真实DOM节点
function createNode(vnode, parentNode) {
    let node = null;
    const {type, props} = vnode;
    if (type === TEXT) {
        node = document.createTextNode("");
    } else if (typeof type === "string") {
        node = document.createElement(type);
    } else if (typeof type === "function") {
        node = type.isReactComponent
            ? updateClassComponent(vnode, parentNode)
        : updateFunctionComponent(vnode, parentNode);
    } else {
        node = document.createDocumentFragment();
    }
    reconcileChildren(props.children, node);
    updateNode(node, props);
    return node;
}

// 遍历下子vnode，然后把子vnode->真实DOM节点，再插入父node中
function reconcileChildren(children, node) {
    for (let i = 0; i &lt; children.length; i++) {
        let child = children[i];
        if (Array.isArray(child)) {
            for (let j = 0; j &lt; child.length; j++) {
                render(child[j], node);
            }
        } else {
            render(child, node);
        }
    }
}
function updateNode(node, nextVal) {
    Object.keys(nextVal)
        .filter(k => k !== "children")
        .forEach(k => {
        if (k.slice(0, 2) === "on") {
            let eventName = k.slice(2).toLocaleLowerCase();
            node.addEventListener(eventName, nextVal[k]);
        } else {
            node[k] = nextVal[k];
        }
    });
}

// 返回真实dom节点
// 执行函数
function updateFunctionComponent(vnode, parentNode) {
    const {type, props} = vnode;
    let vvnode = type(props);
    const node = createNode(vvnode, parentNode);
    return node;
}

// 返回真实dom节点
// 先实例化，再执行render函数
function updateClassComponent(vnode, parentNode) {
    const {type, props} = vnode;
    let cmp = new type(props);
    const vvnode = cmp.render();
    const node = createNode(vvnode, parentNode);
    return node;
}
export default {
    render
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p>在<code v-pre>react</code>源码中，虚拟<code v-pre>Dom</code>转化成真实<code v-pre>Dom</code>整体流程如下图所示：</p>
<p><img src="https://static.vue-js.com/28824fa0-f00a-11eb-ab90-d9ae814b240d.png" alt=""></p>
<p>其渲染流程如下所示：</p>
<ul>
<li>使用React.createElement或JSX编写React组件，实际上所有的 JSX 代码最后都会转换成React.createElement(...) ，Babel帮助我们完成了这个转换的过程。</li>
<li>createElement函数对key和ref等特殊的props进行处理，并获取defaultProps对默认props进行赋值，并且对传入的孩子节点进行处理，最终构造成一个虚拟DOM对象</li>
<li>ReactDOM.render将生成好的虚拟DOM渲染到指定容器上，其中采用了批处理、事务等机制并且对特定浏览器进行了性能优化，最终转换为真实DOM</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://bbs.huaweicloud.com/blogs/265503)</li>
<li>https://huang-qing.github.io/react/2019/05/29/React-VirDom/</li>
<li>https://segmentfault.com/a/1190000018891454</li>
</ul>
</div></template>


