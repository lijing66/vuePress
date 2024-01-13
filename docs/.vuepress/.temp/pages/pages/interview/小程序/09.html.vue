<template><div><!--
 * @Author: lijing
 * @Date: 2023-12-15 23:08:53
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-15 23:45:22
 * @Description: 
-->
<h1 id="小程序常见业务" tabindex="-1"><a class="header-anchor" href="#小程序常见业务" aria-hidden="true">#</a> 小程序常见业务</h1>
<h2 id="小程序的登录流程" tabindex="-1"><a class="header-anchor" href="#小程序的登录流程" aria-hidden="true">#</a> 小程序的登录流程</h2>
<p><img src="http://fanyouf.gitee.io/interview/assets/img/image-20220916112742682.6ead8975.png" alt=""></p>
<h2 id="小程序的兼容性问题" tabindex="-1"><a class="header-anchor" href="#小程序的兼容性问题" aria-hidden="true">#</a> 小程序的兼容性问题：</h2>
<p><strong>小程序ios端的日期为NaN-NaN...</strong></p>
<p>原因：一般日期为&quot;2020-08-08 08:08:08&quot;格式，ios日期只支持&quot;2020/08/08 08:08:08&quot;</p>
<p>解决办法：运用正则转为需要的ios兼容的格式</p>
<p><strong>中文字符传参问题</strong></p>
<p>​ ios端不会自动编码和解码中文字符串，最好自己传参前先用encodeURIComponent转码一下</p>
<p><strong>视频地址中文或特殊字符时ios下闪退问题</strong></p>
<p>​ 当视频的地址中有中文或特殊字符时，ios下播放会闪退</p>
<p>​ 解决办法：更改视频地址使其不包含以上字符，或转换成短链。</p>
<h2 id="小程序性能优化" tabindex="-1"><a class="header-anchor" href="#小程序性能优化" aria-hidden="true">#</a> 小程序性能优化</h2>
<ol>
<li>
<p>提高页面加载速度</p>
<ul>
<li>控制包的大小。措施：压缩代码，清理无用的代码 使用外部图片</li>
<li>采用分包策略 及分包预加载。</li>
</ul>
</li>
<li>
<p>提升渲染性能</p>
<ul>
<li>减少使用setData。合并setData的调用，减少通讯的次数，减少每次通讯的数据量</li>
<li>上拉加载更多页 考虑使用防抖节流</li>
</ul>
</li>
</ol>
<h2 id="小程序和普通网页开发的区别" tabindex="-1"><a class="header-anchor" href="#小程序和普通网页开发的区别" aria-hidden="true">#</a> 小程序和普通网页开发的区别</h2>
<ol>
<li>网页开发渲染线程和脚本线程是互斥的，这也是为什么长时间的脚本运行可能会导致页面失去响应；小程序二者是分开的，分别运行在不同的线程中</li>
<li>网页开发者可以使用到各种浏览器暴露出来的 DOM API，进行 DOM 选中和操作； 小程序的逻辑层和渲染层是分开的，逻辑层运行在 JSCore 中，并没有一个完整浏览器对象，因而缺少相关的DOM API和BOM API。</li>
<li>网页开发者需要面对的环境是各式各样的浏览器； 而小程序开发过程中需要面对的是两大操作系统 iOS 和 Android 的微信客户端</li>
<li>网页开发者在开发网页的时候，只需要使用到浏览器，并且搭配上一些辅助工具或者编辑器即可。 小程序的开发则有所不同，需要经过申请小程序帐号、安装小程序开发者工具、配置项目等等过程方可完成。</li>
<li>网页 标签 div span img..... 小程序 view text image button template block</li>
<li>普通的网页 做不到 小程序可以使用 api调用 手机底层接口 比如：获取摄像头、获取通讯录、获取相册...</li>
</ol>
<h2 id="小程序多端编译怎么实现" tabindex="-1"><a class="header-anchor" href="#小程序多端编译怎么实现" aria-hidden="true">#</a> 小程序多端编译怎么实现</h2>
<p>可以使用跨端小程序框架。如uni-app、taro，我个人能熟练使用uni-app进行跨端开发。</p>
<h2 id="小程序双向绑定的和vue的什么区别" tabindex="-1"><a class="header-anchor" href="#小程序双向绑定的和vue的什么区别" aria-hidden="true">#</a> 小程序双向绑定的和vue的什么区别</h2>
<p>小程序只支持简易双向绑定。如小程序用双向绑定时是不支持路径写法的。如loginForm.username。</p>
<h2 id="原生小程序的生命周期" tabindex="-1"><a class="header-anchor" href="#原生小程序的生命周期" aria-hidden="true">#</a> 原生小程序的生命周期</h2>
<p><a href="http://fanyouf.gitee.io/interview/applet/lifecycle.html" target="_blank" rel="noopener noreferrer">具体<ExternalLinkIcon/></a></p>
<p>小程序的生命周期分为三类：</p>
<ol>
<li>
<p>应用生命周期（app.js中）：onLaunch，onShow，onHide。onLaunch应用启动的时候触发，一般在这个钩子里判断一下有没有新版本，以及根据参数里的scene参数统计用户来源。onShow，onHide分别在小程序切前台和切后台的时候触发。</p>
</li>
<li>
<p>页面生命周期（每个页面中）：onLoad，onShow，onReady，onHide，onUnLoad。onLoad是页面加载的时候触发，是最新触发的，一般在onLoad里面发送请求获取页面的数据。onShow，onHide分别在页面显示和隐藏的时候触发。onReady相当于vue里的mounted，onUnLoad在页面卸载的时候触发。</p>
</li>
<li>
<p>组件生命周期（每个组件中）：created，attached，ready，detached。 created在组件实例刚刚被创建时执行，此时还不能调用 <code v-pre>setData</code>。</p>
</li>
</ol>
<h2 id="uni-app的生命周期" tabindex="-1"><a class="header-anchor" href="#uni-app的生命周期" aria-hidden="true">#</a> uni-app的生命周期</h2>
<p>uni-app的生命周期和小程序差不多。</p>
<ul>
<li>应用的和页面的都是用的小程序的生命周期。</li>
<li>组件的使用的是vue的生命周期，及beforeCreate/created，beforeMount/mounted，beforeUpdate/updated，beforeDestory/destoryed。</li>
</ul>
<h2 id="上线后小程序的报错去哪看" tabindex="-1"><a class="header-anchor" href="#上线后小程序的报错去哪看" aria-hidden="true">#</a> 上线后小程序的报错去哪看</h2>
<ol>
<li>
<p>去后台有个We分析，可以去那里看。</p>
</li>
<li>
<p>我们开发的时候，一般会在关键节点添加打点，所以也可以去我们自己后台看。</p>
</li>
</ol>
<h2 id="小程序上拉加载-下拉刷新" tabindex="-1"><a class="header-anchor" href="#小程序上拉加载-下拉刷新" aria-hidden="true">#</a> 小程序上拉加载，下拉刷新</h2>
<ol>
<li>上拉加载监听onReachBottom钩子，触发时机跟配置的onReachBottomDistance的值有关。</li>
<li>下拉刷新必须先开启页面的下拉刷新配置，通过将enablePullDownRefresh的值变为true开启，开启后通过监听onPullDownRefresh钩子监听用户的下拉操作。</li>
</ol>
</div></template>


