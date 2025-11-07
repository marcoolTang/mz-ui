import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'MZ-UI 组件库',
    description: '基于 Vue3 + Element Plus 的后台管理系统组件库',
    base: '/',
    vite: {
        ssr: {
            // ✅ 告诉 Vite SSR 构建时不要 external 掉你的库
            external: ['element-plus', 'ezmui'],
        },
    },
    // Head 配置
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ],

    // 主题配置
    themeConfig: {
        logo: '/logo.svg',

        // 导航栏
        nav: [
            { text: '首页', link: '/' },
            { text: '指南', link: '/guide/introduction' },
            { text: '组件', link: '/components/container' },
            { text: '示例', link: '/examples/basic' },
        ],

        // 侧边栏
        sidebar: {
            '/guide/': [
                {
                    text: '开始',
                    collapsed: false,
                    items: [
                        { text: '介绍', link: '/guide/introduction' },
                        { text: '快速开始', link: '/guide/quickstart' },
                        { text: '配置说明', link: '/guide/configuration' },
                        { text: '部署到宝塔', link: '/guide/deployment' },
                    ],
                },
            ],
            '/components/': [
                {
                    text: '核心组件',
                    collapsed: false,
                    items: [
                        { text: 'Container 容器', link: '/components/container' },
                        { text: 'Filter 筛选器', link: '/components/filter' },
                        { text: 'Table 表格', link: '/components/table' },
                        { text: 'Form 表单', link: '/components/form' },
                        { text: 'Detail 详情', link: '/components/detail' },
                    ],
                },
            ],
            '/examples/': [
                {
                    text: '完整示例',
                    collapsed: false,
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

        // 社交链接
        socialLinks: [{ icon: 'github', link: 'https://github.com/yourusername/mz-ui' }],

        // 页脚
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2025-present MZ-UI',
        },

        // 大纲配置
        outline: {
            level: [2, 3],
            label: '页面导航',
        },

        // 本地搜索
        search: {
            provider: 'local',
            options: {
                locales: {
                    root: {
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档',
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换',
                                },
                            },
                        },
                    },
                },
            },
        },

        // 编辑链接
        editLink: {
            pattern: 'https://github.com/yourusername/mz-ui-docs/edit/main/docs/:path',
            text: '在 GitHub 上编辑此页',
        },

        // 最后更新时间
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium',
            },
        },

        // 文档页脚
        docFooter: {
            prev: '上一页',
            next: '下一页',
        },

        // 返回顶部
        returnToTopLabel: '返回顶部',

        // 侧边栏菜单标签
        sidebarMenuLabel: '菜单',

        // 深色模式切换标签
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
    },

    // Markdown 配置
    markdown: {
        theme: {
            light: 'github-light',
            dark: 'github-dark',
        },
        lineNumbers: true,
    },
});
