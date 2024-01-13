<template><div><h1 id="super-和super-props-有什么区别" tabindex="-1"><a class="header-anchor" href="#super-和super-props-有什么区别" aria-hidden="true">#</a> super()和super(props)有什么区别？</h1>
<p><img src="https://static.vue-js.com/618abaf0-d71c-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<h2 id="一、es6类" tabindex="-1"><a class="header-anchor" href="#一、es6类" aria-hidden="true">#</a> 一、ES6类</h2>
<p>在<code v-pre>ES6</code>中，通过<code v-pre>extends</code>关键字实现类的继承，方式如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class sup {
    constructor(name) {
        this.name = name
    }

    printName() {
        console.log(this.name)
    }
}


class sub extends sup{
    constructor(name,age) {
        super(name) // super代表的事父类的构造函数
        this.age = age
    }

    printAge() {
        console.log(this.age)
    }
}

let jack = new sub('jack',20)
jack.printName()    //输出 : jack
jack.printAge()    //输出 : 20
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，可以看到通过<code v-pre>super</code>关键字实现调用父类，<code v-pre>super</code>代替的是父类的构建函数，使用<code v-pre>super(name)</code>相当于调用<code v-pre>sup.prototype.constructor.call(this,name)</code></p>
<p>如果在子类中不使用<code v-pre>super</code>，关键字，则会引发报错，如下：<img src="https://static.vue-js.com/6ab40190-d71c-11eb-85f6-6fac77c0c9b3.png" alt=""></p>
<p>报错的原因是 子类是没有自己的<code v-pre>this</code>对象的，它只能继承父类的<code v-pre>this</code>对象，然后对其进行加工</p>
<p>而<code v-pre>super()</code>就是将父类中的<code v-pre>this</code>对象继承给子类的，没有<code v-pre>super()</code>子类就得不到<code v-pre>this</code>对象</p>
<p>如果先调用<code v-pre>this</code>，再初始化<code v-pre>super()</code>，同样是禁止的行为</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class sub extends sup{
    constructor(name,age) {
        this.age = age
        super(name) // super代表的事父类的构造函数
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以在子类<code v-pre>constructor</code>中，必须先代用<code v-pre>super</code>才能引用<code v-pre>this</code></p>
<h2 id="二、类组件" tabindex="-1"><a class="header-anchor" href="#二、类组件" aria-hidden="true">#</a> 二、类组件</h2>
<p>在<code v-pre>React</code>中，类组件是基于<code v-pre>es6</code>的规范实现的，继承<code v-pre>React.Component</code>，因此如果用到<code v-pre>constructor</code>就必须写<code v-pre>super()</code>才初始化<code v-pre>this</code></p>
<p>这时候，在调用<code v-pre>super()</code>的时候，我们一般都需要传入<code v-pre>props</code>作为参数，如果不传进去，<code v-pre>React</code>内部也会将其定义在组件实例中</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// React 内部
const instance = new YourComponent(props);
instance.props = props;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以无论有没有<code v-pre>constructor</code>，在<code v-pre>render</code>中<code v-pre>this.props</code>都是可以使用的，这是<code v-pre>React</code>自动附带的，是可以不写的：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class HelloMessage extends React.Component{
    render (){
        return (
            &lt;div>nice to meet you! {this.props.name}&lt;/div>
        );
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是也不建议使用<code v-pre>super()</code>代替<code v-pre>super(props)</code></p>
<p>因为在<code v-pre>React</code>会在类组件构造函数生成实例后再给<code v-pre>this.props</code>赋值，所以在不传递<code v-pre>props</code>在<code v-pre>super</code>的情况下，调用<code v-pre>this.props</code>为<code v-pre>undefined</code>，如下情况：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class Button extends React.Component {
  constructor(props) {
    super(); // 没传入 props
    console.log(props);      //  {}
    console.log(this.props); //  undefined
  // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而传入<code v-pre>props</code>的则都能正常访问，确保了 <code v-pre>this.props</code> 在构造函数执行完毕之前已被赋值，更符合逻辑，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>class Button extends React.Component {
  constructor(props) {
    super(props); // 没传入 props
    console.log(props);      //  {}
    console.log(this.props); //  {}
  // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p>在<code v-pre>React</code>中，类组件基于<code v-pre>ES6</code>，所以在<code v-pre>constructor</code>中必须使用<code v-pre>super</code></p>
<p>在调用<code v-pre>super</code>过程，无论是否传入<code v-pre>props</code>，<code v-pre>React</code>内部都会将<code v-pre>porps</code>赋值给组件实例<code v-pre>porps</code>属性中</p>
<p>如果只调用了<code v-pre>super()</code>，那么<code v-pre>this.props</code>在<code v-pre>super()</code>和构造函数结束之间仍是<code v-pre>undefined</code></p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://overreacted.io/zh-hans/why-do-we-write-super-props/</li>
<li>https://segmentfault.com/q/1010000008340434</li>
</ul>
</div></template>


