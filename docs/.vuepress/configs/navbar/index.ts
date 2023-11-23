/*
 * @Author: lijing
 * @Date: 2023-11-23 21:08:56
 * @LastEditors: lijing
 * @LastEditTime: 2023-11-23 22:45:01
 * @Description: 
 */
import type { NavbarConfig } from '@vuepress/theme-default'

export const navbar: NavbarConfig = [
  {
      text: '首页',
      link: '/',
  },
  {
    text: '技术难点',
    children: [
      {
        text: 'VuePress',
        children: [
          '/pages/difficulty/index.md',
        ],
      },
      {
        text: '打包工具',
        children: [
          '/zh/reference/bundler/vite.md',
          '/zh/reference/bundler/webpack.md',
        ],
      },
      {
        text: '默认主题',
        children: [
          '/zh/reference/default-theme/config.md',
          '/zh/reference/default-theme/frontmatter.md',
          '/zh/reference/default-theme/components.md',
          '/zh/reference/default-theme/markdown.md',
          '/zh/reference/default-theme/styles.md',
          '/zh/reference/default-theme/extending.md',
        ],
      },
    ],
  }
]