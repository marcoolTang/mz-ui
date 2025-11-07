import { defineConfig } from 'vitepress';

export default defineConfig({
    ignoreDeadLinks: true,
    title: 'MZ-UI 组件库',
    description: '基于 Vue3 + Element Plus 的后台管理系统组件库',
    base: '/',
    vite: {
        ssr: {
            // ✅ 告诉 Vite SSR 构建时不要 external 掉你的库
            external: ['element-plus', 'ezmui'],
        },
        define: {
            'process.env.SSR': 'false',
        },
    },
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    themeConfig: {
        logo: '/logo.svg',
        nav: [
            { text: '首页', link: '/' },
            { text: '指南', link: '/guide/introduction' },
            { text: '组件', link: '/components/container' },
            { text: '示例', link: '/examples/basic' },
        ],
        sidebar: {
            '/guide/': [
                {
                    text: '开始',
                    items: [
                        { text: '介绍', link: '/guide/introduction' },
                        { text: '快速开始', link: '/guide/quickstart' },
                        { text: '配置说明', link: '/guide/configuration' },
                    ],
                },
            ],
            '/components/': [
                {
                    text: '核心组件',
                    items: [
                        { text: 'Container 容器', link: '/components/container' },
                        { text: 'Filter 筛选器', link: '/components/filter' },
                        { text: 'Table 表格', link: '/components/table' },
                        { text: 'Form 表单', link: '/components/form' },
                        { text: 'Detail 详情', link: '/components/detail' },
                    ],
                },
                {
                    text: '表单控件',
                    items: [
                        { text: 'Input 输入框', link: '/components/form-controls/input' },
                        { text: 'Select 选择器', link: '/components/form-controls/select' },
                        { text: 'Select-Tree 树选择', link: '/components/form-controls/select-tree' },
                        { text: 'Date 日期', link: '/components/form-controls/date' },
                        { text: 'Textarea 文本域', link: '/components/form-controls/textarea' },
                        { text: 'File 文件上传', link: '/components/form-controls/file' },
                    ],
                },
            ],
            '/examples/': [
                {
                    text: '完整示例',
                    items: [
                        { text: '基础示例', link: '/examples/basic' },
                        { text: '表格组件', link: '/examples/table' },
                        { text: '表单组件', link: '/examples/form' },
                        { text: '容器组件', link: '/examples/container' },
                        { text: '搜索树', link: '/examples/tree' },
                    ],
                },
            ],
            // ✅ 添加关于侧边栏
            '/about/': [
                {
                    text: '关于项目',
                    items: [
                        { text: '团队', link: '/about/team' },
                        { text: '更新日志', link: '/about/changelog' },
                        { text: '贡献指南', link: '/about/contributing' },
                    ],
                },
            ],
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/marcoolTang/mz-ui' }],
        footer: {
            message: 'Released under the MIT License. Authored by Marco Tang',
            copyright: 'Copyright © 2025-present MZ-UI',
        },
        outline: {
            level: [2, 3],
            label: '页面导航',
        },
        search: {
            provider: 'local',
        },
    },
});
