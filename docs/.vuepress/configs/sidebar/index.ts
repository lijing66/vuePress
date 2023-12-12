/*
 * @Author: lijing
 * @Date: 2023-11-23 21:08:59
 * @LastEditors: lijing
 * @LastEditTime: 2023-12-12 22:25:13
 * @Description: 
 */
import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebar: SidebarConfig = {
  '/pages/difficulty/': [
    {
      text: '技术难点',
      children: [
        "/pages/difficulty/index.md"
      ],
    },
  ],
  '/pages/interview/': [
    {
      text: '面试记录',
      children: [
        {
          text: "CSS",
          collapsible: true,
          sidebarDepth: 2,
          link: "/pages/interview/index.md",
          children: [
            { text: "01 CSS新特性", link: "/pages/interview/CSS/01.md" },
            {
              text: "02 BFC",
              collapsible: true,
              sidebarDepth: 2,
              link: "/pages/interview/CSS/02.md",
              children: [],
            },
            {
              text: "03盒子模型",
              collapsible: true,
              sidebarDepth: 2,
              link: "/pages/interview/CSS/03.md",
              children: [],
            },
            {
              text: "04flexbox",
              collapsible: true,
              sidebarDepth: 2,
              link: "/pages/interview/CSS/04.md",
              children: [],
            },
            {
              text: "05画一个三角形",
              collapsible: true,
              sidebarDepth: 2,
              link: "/pages/interview/CSS/05.md",
              children: [],
            },
            {
              text: "06css选择器",
              collapsible: true,
              sidebarDepth: 2,
              link: "/pages/interview/CSS/06.md",
              children: [],
            },
            {
              text: "07em/px/rem/vh/vw 区别?",
              collapsible: true,
              sidebarDepth: 2,
              link: "/pages/interview/CSS/07.md",
              children: [],
            },
            {
              text: "08响应式设计",
              collapsible: true,
              sidebarDepth: 2,
              link: "/pages/interview/CSS/08.md",
              children: [],
            },
            {
              text: "09如何实现常见布局",
              collapsible: true,
              sidebarDepth: 2,
              link: "/pages/interview/CSS/09.md",
              children: [],
            },
            {
              text: "10文本溢出的省略样式？",
              collapsible: true,
              sidebarDepth: 2,
              link: "/pages/interview/CSS/10.md",
              children: [],
            },
            {
              text: "11生成一个固定宽高比的盒子",
              collapsible: true,
              sidebarDepth: 2,
              link: "/pages/interview/CSS/11.md",
              children: [],
            },
            {
              text: "12块级元素和行内元素和行内块的区别",
              collapsible: true,
              sidebarDepth: 2,
              link: "/pages/interview/CSS/12.md",
              children: [],
            },
            {
              text: "13link 和 import 的区别",
              collapsible: true,
              sidebarDepth: 2,
              link: "/pages/interview/CSS/13.md",
              children: [],
            }
          ]
        },
      ],
    },
  ],
}