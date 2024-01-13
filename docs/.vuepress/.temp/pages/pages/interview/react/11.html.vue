<template><div><h1 id="react中的key有什么作用" tabindex="-1"><a class="header-anchor" href="#react中的key有什么作用" aria-hidden="true">#</a> React中的key有什么作用？</h1>
<h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2>
<p>首先，先给出<code v-pre>react</code>组件中进行列表渲染的一个示例：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>const data = [
  { id: 0, name: 'abc' },
  { id: 1, name: 'def' },
  { id: 2, name: 'ghi' },
  { id: 3, name: 'jkl' }
];

const ListItem = (props) => {
  return &lt;li>{props.name}&lt;/li>;
};

const List = () => {
  return (
    &lt;ul>
      {data.map((item) => (
        &lt;ListItem name={item.name}>&lt;/ListItem>
      ))}
    &lt;/ul>
  );
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在输出就可以看到<code v-pre>react</code>所提示的警告信息：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Each child in a list should have a unique "key" prop.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>根据意思就可以得到渲染列表的每一个子元素都应该需要一个唯一的<code v-pre>key</code>值</p>
<p>在这里可以使用列表的<code v-pre>id</code>属性作为<code v-pre>key</code>值以解决上面这个警告</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>const List = () => {
  return (
    &lt;ul>
      {data.map((item) => (
        &lt;ListItem name={item.name} key={item.id}>&lt;/ListItem>
      ))}
    &lt;/ul>
  );
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、作用" tabindex="-1"><a class="header-anchor" href="#二、作用" aria-hidden="true">#</a> 二、作用</h2>
<p>跟<code v-pre>Vue</code>一样，<code v-pre>React</code> 也存在 <code v-pre>Diff</code>算法，而元素<code v-pre>key</code>属性的作用是用于判断元素是新创建的还是被移动的元素，从而减少不必要的元素渲染</p>
<p>因此<code v-pre>key</code>的值需要为每一个元素赋予一个确定的标识</p>
<p>如果列表数据渲染中，在数据后面插入一条数据，<code v-pre>key</code>作用并不大，如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>this.state = {
    numbers:[111,222,333]
}

insertMovie() {
  const newMovies = [...this.state.numbers, 444];
  this.setState({
    movies: newMovies
  })
}

&lt;ul>
    {
        this.state.movies.map((item, index) => {
            return &lt;li>{item}&lt;/li>
        })
    }
&lt;/ul>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>前面的元素在<code v-pre>diff</code>算法中，前面的元素由于是完全相同的，并不会产生删除创建操作，在最后一个比较的时候，则需要插入到新的<code v-pre>DOM</code>树中</p>
<p>因此，在这种情况下，元素有无<code v-pre>key</code>属性意义并不大</p>
<p>下面再来看看在前面插入数据时，使用<code v-pre>key</code>与不使用<code v-pre>key</code>的区别：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>insertMovie() {
  const newMovies = [000 ,...this.state.numbers];
  this.setState({
    movies: newMovies
  })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当拥有<code v-pre>key</code>的时候，<code v-pre>react</code>根据<code v-pre>key</code>属性匹配原有树上的子元素以及最新树上的子元素，像上述情况只需要将000元素插入到最前面位置</p>
<p>当没有<code v-pre>key</code>的时候，所有的<code v-pre>li</code>标签都需要进行修改</p>
<p>同样，并不是拥有<code v-pre>key</code>值代表性能越高，如果说只是文本内容改变了，不写<code v-pre>key</code>反而性能和效率更高</p>
<p>主要是因为不写<code v-pre>key</code>是将所有的文本内容替换一下，节点不会发生变化</p>
<p>而写<code v-pre>key</code>则涉及到了节点的增和删，发现旧<code v-pre>key</code>不存在了，则将其删除，新<code v-pre>key</code>在之前没有，则插入，这就增加性能的开销</p>
<h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2>
<p>良好使用<code v-pre>key</code>属性是性能优化的非常关键的一步，注意事项为：</p>
<ul>
<li>
<p>key 应该是唯一的</p>
</li>
<li>
<p>key不要使用随机值（随机数在下一次 render 时，会重新生成一个数字）</p>
</li>
<li>
<p>使用 index 作为 key值，对性能没有优化</p>
</li>
</ul>
<p><code v-pre>react</code>判断<code v-pre>key</code>的流程具体如下图：</p>
<p><img src="https://static.vue-js.com/3b9afe10-dd69-11eb-ab90-d9ae814b240d.png" alt=""></p>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<ul>
<li>https://zh-hans.reactjs.org/docs/lists-and-keys.html#gatsby-focus-wrapper</li>
<li>https://segmentfault.com/a/1190000017511836</li>
</ul>
</div></template>


