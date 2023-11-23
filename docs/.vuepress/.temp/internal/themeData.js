export const themeData = JSON.parse("{\"logo\":\"/images/donghua.gif\",\"navbar\":[{\"text\":\"首页\",\"link\":\"/\"},{\"text\":\"技术难点\",\"children\":[{\"text\":\"VuePress\",\"children\":[\"/pages/difficulty/index.md\"]},{\"text\":\"打包工具\",\"children\":[\"/zh/reference/bundler/vite.md\",\"/zh/reference/bundler/webpack.md\"]},{\"text\":\"默认主题\",\"children\":[\"/zh/reference/default-theme/config.md\",\"/zh/reference/default-theme/frontmatter.md\",\"/zh/reference/default-theme/components.md\",\"/zh/reference/default-theme/markdown.md\",\"/zh/reference/default-theme/styles.md\",\"/zh/reference/default-theme/extending.md\"]}]}],\"sidebar\":{\"/pages/\":[{\"text\":\"指南\",\"children\":[\"/pages/interview/index.md\"]}]},\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

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
