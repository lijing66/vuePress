/*
 * @Author: lijing
 * @Date: 2023-11-23 21:08:56
 * @LastEditors: lijing
 * @LastEditTime: 2023-11-24 10:46:07
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
    link: '/pages/difficulty/',
  },
  {
    text: '面试记录',
    link: '/pages/interview/',
  }
]