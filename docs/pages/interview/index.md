<!--
 * @Author: lijing
 * @Date: 2023-11-23 11:48:23
 * @LastEditors: lijing
 * @LastEditTime: 2024-01-13 18:41:33
 * @Description: 
-->
# 这是记录搬迁了面试题的地方

`todo -----------------------> 图片还没有引入成为本地需要解决，防止人家下线无法使用`

# 下面是两种sidebar使用方式（面试记录栏目使用第一种比较繁琐）

```js
  {
    text: '面试记录',
    // 是否折叠
    collapsible: true,
    // 自动生成标题为目录的层级--层级对照-标题 # ## ### #### 1234级别标题
    // 注意生成层级需要使用第二种方式
    sidebarDepth: 2,
    children: [
      {
        text: "自定义md菜单名称",
        sidebarDepth: 2,
        link: "/xxx/aa.md",
        children: [],
      }
    ],
  },
  // 这种方式好处是，直接生成，标题索引目录，在侧边栏
  {
    text: '面试记录',
    // 是否折叠
    collapsible: true,
    sidebarDepth: 2,
    children: [
      // 菜单名称会根据aa.md中的第一个标题名称生成
      '/xxx/aa.md',
      '/xxx/bb.md',
    ],
  },
```