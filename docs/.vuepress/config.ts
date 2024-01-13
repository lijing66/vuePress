/*
 * @Author: lijing
 * @Date: 2023-11-23 11:41:02
 * @LastEditors: lijing
 * @LastEditTime: 2024-01-13 21:13:26
 * @Description: 
 */
import { defineUserConfig,defaultTheme } from 'vuepress'
// 顶部导航栏的搜索框 需要install这个依赖  npm i -D @vuepress/plugin-search@next
import { searchPlugin } from '@vuepress/plugin-search'
import {
  navbar,
  sidebar,
} from './configs/index.js'

export default defineUserConfig({
    // 插件配置  这里配置了那个搜索框
    plugins:[
        searchPlugin({
            locales: {
                '/': {
                    placeholder: 'Search',
                },
                '/zh/': {
                    placeholder: '搜索',
                },
            },
            // 排除首页
            isSearchable: (page) => page.path !== '/',
        }),
    ],

    // 打包后html内部资源访问路径
    // base:'./',
    base: "/vuePress/",
    // 打包后的文件放哪
    dest:"dist/",
    lang: 'zh-CN',
    // 标题
    title: '月照一江秋水',
    description: '回归实践,才是最好的提升',
    // 头部配置
    head: [['link', { rel: 'icon', href: '/images/donghua.gif' }],
    ],
    displayAllHeaders: true,
    //新增导航条的配置
    theme: defaultTheme({
        // tab栏的图标; 图片 / 会自动去public文件夹里找图片
        logo: '/images/donghua.gif',
        // 顶部导航条
        navbar: navbar,
        // 侧边栏数组
        // 所有页面会使用相同的侧边栏
        sidebar: sidebar,
    }),
})


