export const data = JSON.parse("{\"key\":\"v-05c6de82\",\"path\":\"/pages/interview/webpack/06.html\",\"title\":\"说说 webpack 的热更新是如何做到的？原理是什么？\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"简版\",\"slug\":\"简版\",\"link\":\"#简版\",\"children\":[{\"level\":3,\"title\":\"一、是什么\",\"slug\":\"一、是什么\",\"link\":\"#一、是什么\",\"children\":[]}]},{\"level\":2,\"title\":\"二、实现原理\",\"slug\":\"二、实现原理\",\"link\":\"#二、实现原理\",\"children\":[]},{\"level\":2,\"title\":\"三、总结\",\"slug\":\"三、总结\",\"link\":\"#三、总结\",\"children\":[]},{\"level\":2,\"title\":\"参考文献\",\"slug\":\"参考文献\",\"link\":\"#参考文献\",\"children\":[]}],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"pages/interview/webpack/06.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
