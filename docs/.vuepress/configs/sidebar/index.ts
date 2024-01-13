/*
 * @Author: lijing
 * @Date: 2023-11-23 21:08:59
 * @LastEditors: lijing
 * @LastEditTime: 2024-01-13 18:44:15
 * @Description: 
 */
import type { SidebarConfig } from '@vuepress/theme-default'
import { getInterviewSidebar } from './interview'
export const sidebar: SidebarConfig = {
  '/pages/difficulty/': [
    {
      text: '技术难点',
      children: [
        "/pages/difficulty/index.md",
        "/pages/difficulty/gitignore文件配置不生效方案.md",
        "/pages/difficulty/gitlab拉取地址替换修改.md"
      ],
    },
  ],
  '/pages/interview/': getInterviewSidebar()
}