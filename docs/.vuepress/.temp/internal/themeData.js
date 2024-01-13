export const themeData = JSON.parse("{\"logo\":\"/images/donghua.gif\",\"navbar\":[{\"text\":\"首页\",\"link\":\"/\"},{\"text\":\"技术难点\",\"link\":\"/pages/difficulty/\"},{\"text\":\"面试记录\",\"link\":\"/pages/interview/\"}],\"sidebar\":{\"/pages/difficulty/\":[{\"text\":\"技术难点\",\"children\":[\"/pages/difficulty/index.md\",\"/pages/difficulty/gitignore文件配置不生效方案.md\",\"/pages/difficulty/gitlab拉取地址替换修改.md\"]}],\"/pages/interview/\":[{\"text\":\"面试记录\",\"children\":[]},{\"text\":\"CSS\",\"collapsible\":true,\"sidebarDepth\":2,\"children\":[{\"text\":\"01 CSS新特性\",\"link\":\"/pages/interview/CSS/01.md\"},{\"text\":\"02 BFC\",\"sidebarDepth\":1,\"link\":\"/pages/interview/CSS/02.md\",\"children\":[]},{\"text\":\"03盒子模型\",\"sidebarDepth\":2,\"link\":\"/pages/interview/CSS/03.md\",\"children\":[]},{\"text\":\"04flexbox\",\"sidebarDepth\":2,\"link\":\"/pages/interview/CSS/04.md\",\"children\":[]},{\"text\":\"05画一个三角形\",\"sidebarDepth\":2,\"link\":\"/pages/interview/CSS/05.md\",\"children\":[]},{\"text\":\"06css选择器\",\"sidebarDepth\":2,\"link\":\"/pages/interview/CSS/06.md\",\"children\":[]},{\"text\":\"07em/px/rem/vh/vw 区别?\",\"sidebarDepth\":2,\"link\":\"/pages/interview/CSS/07.md\",\"children\":[]},{\"text\":\"08响应式设计\",\"sidebarDepth\":2,\"link\":\"/pages/interview/CSS/08.md\",\"children\":[]},{\"text\":\"09如何实现常见布局\",\"sidebarDepth\":2,\"link\":\"/pages/interview/CSS/09.md\",\"children\":[]},{\"text\":\"10文本溢出的省略样式？\",\"sidebarDepth\":2,\"link\":\"/pages/interview/CSS/10.md\",\"children\":[]},{\"text\":\"11生成一个固定宽高比的盒子\",\"sidebarDepth\":2,\"link\":\"/pages/interview/CSS/11.md\",\"children\":[]},{\"text\":\"12块级元素和行内元素和行内块的区别\",\"sidebarDepth\":2,\"link\":\"/pages/interview/CSS/12.md\",\"children\":[]},{\"text\":\"13link 和 import 的区别\",\"sidebarDepth\":2,\"link\":\"/pages/interview/CSS/13.md\",\"children\":[]}]},{\"text\":\"JS\",\"collapsible\":true,\"sidebarDepth\":2,\"children\":[{\"text\":\"01引用类型和基本类型的区别\",\"sidebarDepth\":2,\"link\":\"/pages/interview/JS/01.md\"},{\"text\":\"02== 和 === 区别\",\"sidebarDepth\":2,\"link\":\"/pages/interview/JS/02.md\"},{\"text\":\"03typeof 与 instanceof 区别\",\"sidebarDepth\":2,\"link\":\"/pages/interview/JS/03.md\"},{\"text\":\"04深拷贝与浅拷贝\",\"link\":\"/pages/interview/JS/04.md\"},{\"text\":\"05说说你对作用域链的理解\",\"link\":\"/pages/interview/JS/05.md\"},{\"text\":\"06箭头函数\",\"link\":\"/pages/interview/JS/06.md\"},{\"text\":\"07原型和原型链\",\"link\":\"/pages/interview/JS/07.md\"},{\"text\":\"08闭包\",\"link\":\"/pages/interview/JS/08.md\"},{\"text\":\"09内存泄漏\",\"link\":\"/pages/interview/JS/09.md\"},{\"text\":\"10bind、call、apply 区别\",\"link\":\"/pages/interview/JS/10.md\"},{\"text\":\"11继承\",\"link\":\"/pages/interview/JS/11.md\"},{\"text\":\"12new 操作符\",\"link\":\"/pages/interview/JS/12.md\"},{\"text\":\"13数组的常用方法\",\"link\":\"/pages/interview/JS/13.md\"},{\"text\":\"14字符串的常用方法\",\"link\":\"/pages/interview/JS/14.md\"},{\"text\":\"15reduce\",\"link\":\"/pages/interview/JS/15.md\"},{\"text\":\"16this 对象的理解\",\"link\":\"/pages/interview/JS/16.md\"},{\"text\":\"17高阶函数\",\"link\":\"/pages/interview/JS/17.md\"},{\"text\":\"18防抖和节流\",\"link\":\"/pages/interview/JS/18.md\"},{\"text\":\"19递归\",\"link\":\"/pages/interview/JS/19.md\"},{\"text\":\"20函数缓存\",\"link\":\"/pages/interview/JS/20.md\"},{\"text\":\"21柯里化\",\"link\":\"/pages/interview/JS/21.md\"},{\"text\":\"22函数式编程\",\"link\":\"/pages/interview/JS/22.md\"},{\"text\":\"23Proxy\",\"link\":\"/pages/interview/JS/23.md\"},{\"text\":\"24Promise\",\"link\":\"/pages/interview/JS/24.md\"},{\"text\":\"25给数字加上千分位\",\"link\":\"/pages/interview/JS/25.md\"},{\"text\":\"26数组扁平化\",\"link\":\"/pages/interview/JS/26.md\"},{\"text\":\"27数组去重\",\"link\":\"/pages/interview/JS/27.md\"}]},{\"text\":\"Vue\",\"collapsible\":true,\"sidebarDepth\":2,\"children\":[{\"text\":\"01vue的响应式原理\",\"link\":\"/pages/interview/VUE/01.md\"},{\"text\":\"02虚拟DOM\",\"link\":\"/pages/interview/VUE/02.md\"},{\"text\":\"03diff算法\",\"link\":\"/pages/interview/VUE/03.md\"},{\"text\":\"04vue中的key\",\"link\":\"/pages/interview/VUE/04.md\"},{\"text\":\"05$nextTick?\",\"link\":\"/pages/interview/VUE/05.md\"},{\"text\":\"06$set\",\"link\":\"/pages/interview/VUE/06.md\"},{\"text\":\"07v-show和v-if\",\"link\":\"/pages/interview/VUE/07.md\"},{\"text\":\"08计算属性和watcher的区别\",\"link\":\"/pages/interview/VUE/08.md\"},{\"text\":\"09生命周期\",\"link\":\"/pages/interview/VUE/09.md\"},{\"text\":\"10v-if和v-for不一起用\",\"link\":\"/pages/interview/VUE/10.md\"},{\"text\":\"11组件间通信方式\",\"link\":\"/pages/interview/VUE/11.md\"},{\"text\":\"12mixin\",\"link\":\"/pages/interview/VUE/12.md\"},{\"text\":\"13slot\",\"link\":\"/pages/interview/VUE/13.md\"},{\"text\":\"14SPA单页应用\",\"link\":\"/pages/interview/VUE/14.md\"},{\"text\":\"15vuex\",\"link\":\"/pages/interview/VUE/15.md\"},{\"text\":\"16Vue.use\",\"link\":\"/pages/interview/VUE/16.md\"},{\"text\":\"17自定义指令\",\"link\":\"/pages/interview/VUE/17.md\"},{\"text\":\"18过滤器\",\"link\":\"/pages/interview/VUE/18.md\"},{\"text\":\"19Proxy替代defineProperty的好处\",\"link\":\"/pages/interview/VUE/19.md\"},{\"text\":\"20keep-alive\",\"link\":\"/pages/interview/VUE/20.md\"},{\"text\":\"21对象新属性界面不刷新?\",\"link\":\"/pages/interview/VUE/21.md\"},{\"text\":\"22常用的修饰符和应用场景\",\"link\":\"/pages/interview/VUE/22.md\"},{\"text\":\"23Vue3跟Vue2的区别\",\"link\":\"/pages/interview/VUE/23.md\"},{\"text\":\"24Vue3性能提升主要是通过哪几方面体现的\",\"link\":\"/pages/interview/VUE/24.md\"},{\"text\":\"25watch和watchEffect\",\"link\":\"/pages/interview/VUE/25.md\"},{\"text\":\"26v-model和sync\",\"link\":\"/pages/interview/VUE/26.md\"},{\"text\":\"27路由守卫\",\"link\":\"/pages/interview/VUE/27.md\"},{\"text\":\"28路由模式\",\"link\":\"/pages/interview/VUE/28.md\"}]},{\"text\":\"版本控制\",\"collapsible\":true,\"sidebarDepth\":2,\"children\":[{\"text\":\"01fork-clone-branch的区别?\",\"link\":\"/pages/interview/versionControl/01.md\"},{\"text\":\"02HEAD-工作树-索引之间的区别？\",\"link\":\"/pages/interview/versionControl/02.md\"},{\"text\":\"03pull和fetch的区别？\",\"link\":\"/pages/interview/versionControl/03.md\"},{\"text\":\"04冲突的场景及如何解决\",\"link\":\"/pages/interview/versionControl/04.md\"},{\"text\":\"05常用的命令有哪些？\",\"link\":\"/pages/interview/versionControl/05.md\"},{\"text\":\"06reset和revert的区别\",\"link\":\"/pages/interview/versionControl/06.md\"},{\"text\":\"07stash应用场景\",\"link\":\"/pages/interview/versionControl/07.md\"},{\"text\":\"08rebase和merge的区别\",\"link\":\"/pages/interview/versionControl/08.md\"}]},{\"text\":\"ts\",\"collapsible\":true,\"sidebarDepth\":2,\"children\":[{\"text\":\"01Ts与js的区别\",\"link\":\"/pages/interview/TS/01.md\"},{\"text\":\"02ts数据类型有哪些\",\"link\":\"/pages/interview/TS/02.md\"},{\"text\":\"03ts枚举类型\",\"link\":\"/pages/interview/TS/03.md\"},{\"text\":\"04ts接口\",\"link\":\"/pages/interview/TS/04.md\"},{\"text\":\"05ts类\",\"link\":\"/pages/interview/TS/05.md\"},{\"text\":\"06ts函数\",\"link\":\"/pages/interview/TS/06.md\"},{\"text\":\"07ts泛型\",\"link\":\"/pages/interview/TS/07.md\"},{\"text\":\"08ts高级类型\",\"link\":\"/pages/interview/TS/08.md\"}]},{\"text\":\"webpack\",\"collapsible\":true,\"sidebarDepth\":2,\"children\":[{\"text\":\"01webpack的理解\",\"link\":\"/pages/interview/webpack/01.md\"},{\"text\":\"02webpack中常见的Loader？解决了什么问题？\",\"link\":\"/pages/interview/webpack/02.md\"},{\"text\":\"03webpack中常见的Plugin？解决了什么问题？\",\"link\":\"/pages/interview/webpack/03.md\"},{\"text\":\"04Loader和Plugin的区别？编写Loader，Plugin的思路？\",\"link\":\"/pages/interview/webpack/04.md\"},{\"text\":\"05webpack的proxy的工作原理\",\"link\":\"/pages/interview/webpack/05.md\"},{\"text\":\"06webpack的热更新是如何做到的？原理是什么？\",\"link\":\"/pages/interview/webpack/06.md\"},{\"text\":\"07提高构建速度？\",\"link\":\"/pages/interview/webpack/07.md\"}]},{\"text\":\"网络相关\",\"collapsible\":true,\"sidebarDepth\":2,\"children\":[{\"text\":\"01HTTP和HTTPS 的区别?\",\"link\":\"/pages/interview/network/01.md\"},{\"text\":\"02HTTPS是如何保证安全的？\",\"link\":\"/pages/interview/network/02.md\"},{\"text\":\"03HTTP1.0/1.1/2.0 的区别?\",\"link\":\"/pages/interview/network/03.md\"},{\"text\":\"04地址栏输入URL回车后发生了什么\",\"link\":\"/pages/interview/network/04.md\"},{\"text\":\"05常见的状态码有哪些，适用场景？\",\"link\":\"/pages/interview/network/05.md\"},{\"text\":\"06GET和POST的区别？\",\"link\":\"/pages/interview/network/06.md\"},{\"text\":\"07请求头有哪些? 作用？\",\"link\":\"/pages/interview/network/07.md\"},{\"text\":\"08TCP三次握手和四次挥手\",\"link\":\"/pages/interview/network/08.md\"},{\"text\":\"09跨域\",\"link\":\"/pages/interview/network/09.md\"},{\"text\":\"10对WebSocket的理解\",\"link\":\"/pages/interview/network/10.md\"},{\"text\":\"11常见的web攻击方式\",\"link\":\"/pages/interview/network/11.md\"},{\"text\":\"12web项目优化\",\"link\":\"/pages/interview/network/12.md\"}]},{\"text\":\"nb\",\"collapsible\":true,\"sidebarDepth\":2,\"children\":[{\"text\":\"01如何实现单点登录\",\"link\":\"/pages/interview/nb/01.md\"},{\"text\":\"02如何做大文件断点续传\",\"link\":\"/pages/interview/nb/02.md\"},{\"text\":\"03元素是否在可视区域\",\"link\":\"/pages/interview/nb/03.md\"}]},{\"text\":\"手写\",\"collapsible\":true,\"sidebarDepth\":2,\"children\":[{\"text\":\"call-apply-bind\",\"link\":\"/pages/interview/手写/01.md\"},{\"text\":\"缓存函数\",\"link\":\"/pages/interview/手写/02.md\"},{\"text\":\"求对象中所有属性值之和\",\"link\":\"/pages/interview/手写/03.md\"},{\"text\":\"从2[a]1[bc]到aabc\",\"link\":\"/pages/interview/手写/04.md\"},{\"text\":\"平铺结构转树状结构\",\"link\":\"/pages/interview/手写/05.md\"},{\"text\":\"instanceof\",\"link\":\"/pages/interview/手写/06.md\"},{\"text\":\"拍平数组\",\"link\":\"/pages/interview/手写/07.md\"},{\"text\":\"深拷贝\",\"link\":\"/pages/interview/手写/08.md\"},{\"text\":\"10万条数据\",\"link\":\"/pages/interview/手写/09.md\"},{\"text\":\"数组中元素的频次\",\"link\":\"/pages/interview/手写/10.md\"},{\"text\":\"数值转二进制求1的个数\",\"link\":\"/pages/interview/手写/11.md\"},{\"text\":\"树形节点搜索返回路径\",\"link\":\"/pages/interview/手写/12.md\"},{\"text\":\"使用setTimeout来模拟setInterval\",\"link\":\"/pages/interview/手写/13.md\"},{\"text\":\"一维数组路径搜索\",\"link\":\"/pages/interview/手写/14.md\"},{\"text\":\"相邻字符串去重\",\"link\":\"/pages/interview/手写/15.md\"},{\"text\":\"二维螺旋数组\",\"link\":\"/pages/interview/手写/16.md\"},{\"text\":\"css下滑线动画\",\"link\":\"/pages/interview/手写/17.md\"},{\"text\":\"判断鼠标进入元素的方向\",\"link\":\"/pages/interview/手写/18.md\"},{\"text\":\"获取对象任意属性值的方法\",\"link\":\"/pages/interview/手写/19.md\"},{\"text\":\"找树中最大的叶子\",\"link\":\"/pages/interview/手写/20.md\"},{\"text\":\"获取对象任意属性值的方法?\",\"link\":\"/pages/interview/手写/21.md\"},{\"text\":\"有序数组合并\",\"link\":\"/pages/interview/VUE/22.md\"}]},{\"text\":\"算法与数据结构\",\"collapsible\":true,\"sidebarDepth\":2,\"children\":[{\"text\":\"算法的理解？应用场景？\",\"link\":\"/pages/interview/算法与数据结构/01.md\"},{\"text\":\"时间复杂度，空间复杂度？\",\"link\":\"/pages/interview/算法与数据结构/02.md\"},{\"text\":\"常用数据结构有哪些?\",\"link\":\"/pages/interview/算法与数据结构/03.md\"},{\"text\":\"栈、队列的理解？应用场景？\",\"link\":\"/pages/interview/算法与数据结构/04.md\"},{\"text\":\"链表及常见的操作\",\"link\":\"/pages/interview/算法与数据结构/05.md\"},{\"text\":\"集合及常见的操作\",\"link\":\"/pages/interview/算法与数据结构/06.md\"},{\"text\":\"树的理解\",\"link\":\"/pages/interview/算法与数据结构/07.md\"},{\"text\":\"堆的理解\",\"link\":\"/pages/interview/算法与数据结构/08.md\"},{\"text\":\"图的理解？相关操作有哪些？\",\"link\":\"/pages/interview/算法与数据结构/09.md\"},{\"text\":\"常见的排序算法有哪些？区别？\",\"link\":\"/pages/interview/算法与数据结构/10.md\"},{\"text\":\"冒泡排序的理解？\",\"link\":\"/pages/interview/算法与数据结构/11.md\"},{\"text\":\"选择排序的理解？\",\"link\":\"/pages/interview/算法与数据结构/12.md\"},{\"text\":\"插入排序的理解？\",\"link\":\"/pages/interview/算法与数据结构/13.md\"},{\"text\":\"归并排序的理解？\",\"link\":\"/pages/interview/算法与数据结构/14.md\"},{\"text\":\"快速排序的理解？\",\"link\":\"/pages/interview/算法与数据结构/15.md\"},{\"text\":\"二分查找的理解？\",\"link\":\"/pages/interview/算法与数据结构/16.md\"},{\"text\":\"说分而治之、动态规划的理解？区别？?\",\"link\":\"/pages/interview/算法与数据结构/17.md\"},{\"text\":\"贪心算法、回溯算法的理解？应用场景？\",\"link\":\"/pages/interview/算法与数据结构/18.md\"}]},{\"text\":\"react\",\"collapsible\":true,\"sidebarDepth\":2,\"children\":[{\"text\":\"对react的理解？有哪些特性？\",\"link\":\"/pages/interview/react/01.md\"},{\"text\":\" Real DOM和 Virtual DOM 的区别？优缺点？\",\"link\":\"/pages/interview/react/02.md\"},{\"text\":\" react 生命周期有哪些不同阶段？每个阶段对应的方法是？\",\"link\":\"/pages/interview/react/03.md\"},{\"text\":\"state 和 props有什么区别？\",\"link\":\"/pages/interview/react/04.md\"},{\"text\":\"super()和super(props)有什么区别？\",\"link\":\"/pages/interview/react/05.md\"},{\"text\":\" react中的setState执行机制\",\"link\":\"/pages/interview/react/06.md\"},{\"text\":\"react的事件机制？\",\"link\":\"/pages/interview/react/07.md\"},{\"text\":\"react事件绑定的方式有哪些？区别？\",\"link\":\"/pages/interview/react/08.md\"},{\"text\":\"react构建组件的方式有哪些？区别？\",\"link\":\"/pages/interview/react/09.md\"},{\"text\":\"react中组件之间如何通信？\",\"link\":\"/pages/interview/react/10.md\"},{\"text\":\"react中的key有什么作用？\",\"link\":\"/pages/interview/react/11.md\"},{\"text\":\"对react refs 的理解？应用场景？\",\"link\":\"/pages/interview/react/12.md\"},{\"text\":\"对react中类组件和函数组件的理解？有什么区别？\",\"link\":\"/pages/interview/react/13.md\"},{\"text\":\"对受控组件和非受控组件的理解？应用场景？\",\"link\":\"/pages/interview/react/14.md\"},{\"text\":\"对高阶组件的理解？应用场景?\",\"link\":\"/pages/interview/react/15.md\"},{\"text\":\"对react Hooks的理解？解决了什么问题？\",\"link\":\"/pages/interview/react/16.md\"},{\"text\":\"react中引入css的方式有哪几种？区别？\",\"link\":\"/pages/interview/react/17.md\"},{\"text\":\"在react中组件间过渡动画如何实现？\",\"link\":\"/pages/interview/react/18.md\"},{\"text\":\"Redux的理解？其工作原理？\",\"link\":\"/pages/interview/react/19.md\"},{\"text\":\"对Redux中间件的理解？常用的中间件有哪些？实现原理？\",\"link\":\"/pages/interview/react/20.md\"},{\"text\":\"你在react项目中是如何使用Redux的? 项目结构是如何划分的？\",\"link\":\"/pages/interview/react/21.md\"},{\"text\":\"react Router的理解？常用的Router组件有哪些？\",\"link\":\"/pages/interview/react/22.md\"},{\"text\":\"react Router有几种模式？实现原理？？\",\"link\":\"/pages/interview/react/23.md\"},{\"text\":\"immutable的理解？如何应用在react项目中？\",\"link\":\"/pages/interview/react/24.md\"},{\"text\":\"react render方法的原理？在什么时候会被触发？\",\"link\":\"/pages/interview/react/25.md\"},{\"text\":\"你是如何提高组件的渲染效率的？在react中如何避免不必要的render？\",\"link\":\"/pages/interview/react/26.md\"},{\"text\":\"react diff的原理是什么？\",\"link\":\"/pages/interview/react/27.md\"},{\"text\":\"对Fiber架构的理解？解决了什么问题？\",\"link\":\"/pages/interview/react/28.md\"},{\"text\":\"react Jsx转换成真实DOM过程？\",\"link\":\"/pages/interview/react/29.md\"},{\"text\":\" react 性能优化的手段有哪些？\",\"link\":\"/pages/interview/react/30.md\"},{\"text\":\"你在react项目是如何捕获错误的？\",\"link\":\"/pages/interview/react/31.md\"},{\"text\":\"react服务端渲染怎么做？原理是什么？\",\"link\":\"/pages/interview/react/32.md\"},{\"text\":\"你在使用react 过程中遇到的常见问题？如何解决?\",\"link\":\"/pages/interview/react/33.md\"}]},{\"text\":\"nodejs\",\"collapsible\":true,\"sidebarDepth\":2,\"children\":[{\"text\":\"Node.js 的理解？优缺点？应用场景？\",\"link\":\"/pages/interview/nodejs/01.md\"},{\"text\":\"Node.js 有哪些全局对象？\",\"link\":\"/pages/interview/nodejs/02.md\"},{\"text\":\"对 Node 中的 process 的理解？有哪些常用方法?\",\"link\":\"/pages/interview/nodejs/03.md\"},{\"text\":\"对 Node 中的 fs模块的理解? 有哪些常用方法\",\"link\":\"/pages/interview/nodejs/04.md\"},{\"text\":\"对 Node 中的 Buffer 的理解？应用场景？\",\"link\":\"/pages/interview/nodejs/05.md\"},{\"text\":\"对 Node 中的 Stream 的理解？应用场景？\",\"link\":\"/pages/interview/nodejs/06.md\"},{\"text\":\"Node中的EventEmitter? 如何实现一个EventEmitter?\",\"link\":\"/pages/interview/nodejs/07.md\"},{\"text\":\"对 nodejs 中的事件循环机制理解?\",\"link\":\"/pages/interview/nodejs/08.md\"},{\"text\":\"Node 文件查找的优先级以及 Require 方法的文件查找策略?\",\"link\":\"/pages/interview/nodejs/09.md\"},{\"text\":\"对中间件概念的理解，如何封装 node 中间件？\",\"link\":\"/pages/interview/nodejs/10.md\"},{\"text\":\"如何实现jwt鉴权机制？\",\"link\":\"/pages/interview/nodejs/11.md\"},{\"text\":\"如何实现文件上传？\",\"link\":\"/pages/interview/nodejs/12.md\"},{\"text\":\"如果让你来设计一个分页功能, 你会怎么设计? 前后端如何交互?\",\"link\":\"/pages/interview/nodejs/13.md\"},{\"text\":\"Node性能如何进行监控以及优化？\",\"link\":\"/pages/interview/nodejs/14.md\"}]},{\"text\":\"浏览器相关\",\"collapsible\":true,\"sidebarDepth\":2,\"children\":[{\"text\":\"事件循环\",\"link\":\"/pages/interview/浏览器相关/01.md\"},{\"text\":\"类型转换机制\",\"link\":\"/pages/interview/浏览器相关/02.md\"},{\"text\":\"执行上下文和执行栈\",\"link\":\"/pages/interview/浏览器相关/03.md\"},{\"text\":\"常见的DOM操作\",\"link\":\"/pages/interview/浏览器相关/04.md\"},{\"text\":\"常见的BOM操作\",\"link\":\"/pages/interview/浏览器相关/05.md\"},{\"text\":\"事件模型\",\"link\":\"/pages/interview/浏览器相关/06.md\"},{\"text\":\"事件委托\",\"link\":\"/pages/interview/浏览器相关/07.md\"},{\"text\":\"ajax原理是什么？如何实现？\",\"link\":\"/pages/interview/浏览器相关/08.md\"},{\"text\":\"正则表达式\",\"link\":\"/pages/interview/浏览器相关/09.md\"},{\"text\":\"本地存储的方式有哪些？区别及应用场景？\",\"link\":\"/pages/interview/浏览器相关/10.md\"},{\"text\":\"数字精度丢失\",\"link\":\"/pages/interview/浏览器相关/11.md\"},{\"text\":\"上拉加载下拉刷新\",\"link\":\"/pages/interview/浏览器相关/12.md\"}]},{\"text\":\"小程序\",\"collapsible\":true,\"sidebarDepth\":2,\"children\":[{\"text\":\"微信小程序的理解？优缺点？\",\"link\":\"/pages/interview/小程序/01.md\"},{\"text\":\"微信小程序的生命周期函数有哪些？\",\"link\":\"/pages/interview/小程序/02.md\"},{\"text\":\"微信小程序中路由跳转的方式有哪些？区别？\",\"link\":\"/pages/interview/小程序/03.md\"},{\"text\":\"提高微信小程序的应用速度的手段有哪些？\",\"link\":\"/pages/interview/小程序/04.md\"},{\"text\":\"微信小程序的登录流程？\",\"link\":\"/pages/interview/小程序/05.md\"},{\"text\":\"微信小程序的发布流程？\",\"link\":\"/pages/interview/小程序/06.md\"},{\"text\":\"微信小程序的支付流程？\",\"link\":\"/pages/interview/小程序/07.md\"},{\"text\":\"微信小程序的实现原理？\",\"link\":\"/pages/interview/小程序/08.md\"},{\"text\":\"微信小程序常见面试题？\",\"link\":\"/pages/interview/小程序/09.md\"}]},{\"text\":\"设计模式\",\"collapsible\":true,\"sidebarDepth\":2,\"children\":[{\"text\":\"对设计模式的理解？常见的设计模式有哪些？\",\"link\":\"/pages/interview/设计模式/01.md\"},{\"text\":\"单例模式的理解？如何实现？\",\"link\":\"/pages/interview/设计模式/02.md\"},{\"text\":\"工厂模式\",\"link\":\"/pages/interview/设计模式/03.md\"},{\"text\":\"策略模式\",\"link\":\"/pages/interview/设计模式/04.md\"},{\"text\":\"代理模式\",\"link\":\"/pages/interview/设计模式/05.md\"},{\"text\":\"发布订阅、观察者模式的区别？\",\"link\":\"/pages/interview/设计模式/06.md\"}]},{\"text\":\"linux操作系统\",\"collapsible\":true,\"sidebarDepth\":2,\"children\":[{\"text\":\"操作系统的理解？核心概念有哪些？\",\"link\":\"/pages/interview/Linux操作系统/01.md\"},{\"text\":\"什么是进程？什么是线程？区别？\",\"link\":\"/pages/interview/Linux操作系统/02.md\"},{\"text\":\" linux系统下 文件操作常用的命令有哪些？\",\"link\":\"/pages/interview/Linux操作系统/03.md\"},{\"text\":\" linux 系统下 文本编辑常用的命令有哪些？\",\"link\":\"/pages/interview/Linux操作系统/04.md\"},{\"text\":\" linux 用户管理的理解？相关的命令有哪些？\",\"link\":\"/pages/interview/Linux操作系统/05.md\"},{\"text\":\"输入输出重定向和管道的理解？应用场景？\",\"link\":\"/pages/interview/Linux操作系统/06.md\"},{\"text\":\" shell 的理解？常见的命令？\",\"link\":\"/pages/interview/Linux操作系统/07.md\"}]}]},\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
