import { defineConfig } from 'vitepress';

export default defineConfig({
    ignoreDeadLinks: true,
    title: 'MZ-UI 组件库',
    description: '基于 Vue3 + Element Plus 的后台管理系统组件库',
    base: '/',
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
                {
                    text: '工具函数',
                    items: [
                        { text: 'data-handle 数据处理', link: '/components/utils/data-handle' },
                        { text: 'transformers 转换器', link: '/components/utils/transformers' },
                    ],
                },
            ],
            '/examples/': [
                {
                    text: '完整示例',
                    items: [
                        { text: '基础列表页', link: '/examples/basic' },
                        { text: '带筛选的列表', link: '/examples/with-filter' },
                        { text: '树形分类列表', link: '/examples/with-tree' },
                        { text: '导入导出', link: '/examples/import-export' },
                        { text: '复杂表单', link: '/examples/complex-form' },
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
