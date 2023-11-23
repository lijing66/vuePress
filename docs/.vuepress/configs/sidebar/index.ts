/*
 * @Author: lijing
 * @Date: 2023-11-23 21:08:59
 * @LastEditors: lijing
 * @LastEditTime: 2023-11-23 22:49:25
 * @Description: 
 */
import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebar: SidebarConfig = {
  '/pages/': [
    {
      text: '指南',
      children: [
        '/pages/interview/index.md',
      ],
    },
  ],
}