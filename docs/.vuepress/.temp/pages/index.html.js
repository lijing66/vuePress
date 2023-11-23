export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"heroImage\":\"/images/donghua.gif\",\"heroText\":\"月照一江秋水\",\"tagline\":\"读万遍，不如手敲一遍\",\"actions\":[{\"text\":\"快速上手 →\",\"link\":\"/\",\"type\":\"primary\"}],\"features\":[{\"title\":\"记录\",\"details\":\"所有文章会带有环境、版本等前置说明，且均会带有实践示例（可直接运行）或者图示说明（为了更好的理解学习）\"},{\"title\":\"学习进步\",\"details\":\"主要目的是记录学习过程以及归纳整理，不敢保证涉及面广和深，但主打一个实践出真知！（有兴趣的小伙伴们也可以联系我上传自己的干货，放心所有文章会带有署名、出处）\"},{\"title\":\"场景|设计\",\"details\":\"为了不再受常规业务开发的限制，这里会收集优秀的场景、设计文章，旨在开拓视野、提高思维格局、打破原有的瓶颈\"}]},\"headers\":[],\"git\":{\"updatedTime\":1700750788000,\"contributors\":[{\"name\":\"lijing\",\"email\":\"lijing@aipark.com\",\"commits\":2}]},\"filePathRelative\":\"README.md\"}")

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
