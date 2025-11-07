---
layout: home

hero:
    name: MZ-UI
    text: Vue3 后台管理组件库
    tagline: 快速构建企业级后台管理系统，让开发更简单
    image:
        src: /logo.svg
        alt: MZ-UI
    actions:
        - theme: brand
          text: 快速开始
          link: /guide/quickstart
        - theme: alt
          text: 组件文档
          link: /components/container
        - theme: alt
          text: 查看示例
          link: /examples/basic

features:
    - icon: 🚀
      title: 开箱即用
      details: 预设常用配置，一个配置文件搞定列表页、表单页、详情页，大幅减少重复代码

    - icon: 🎨
      title: 高度可配置
      details: 灵活的 columns 配置，支持 table、filter、form、detail 等多场景使用

    - icon: 📦
      title: 组件化设计
      details: Container + Filter + Table + Form + Detail 模块化组合，按需使用

    - icon: 🔌
      title: 异步数据加载
      details: 自动处理下拉选项、树形数据的异步加载，支持接口配置

    - icon: 🛠️
      title: 数据转换
      details: 内置 transform 机制，轻松处理数组、日期范围等复杂数据格式

    - icon: 📱
      title: 响应式设计
      details: 基于 Element Plus，完美适配各种屏幕尺寸

    - icon: 🎯
      title: TypeScript 友好
      details: 提供完整的类型定义，开发体验更好

    - icon: 📖
      title: 详细文档
      details: 完整的 API 文档、使用示例和最佳实践

    - icon: ⚡
      title: 性能优化
      details: Promise.all 并行加载、watch 优化，确保最佳性能
---

## 快速体验

```bash
# 安装依赖
npm install ezmui

# 引入组件
import {ContainerView} from 'ezmui'
```

```vue
<template>
    <mz-container-view :columns="config.columns" serviceName="user" primaryKey="id" :topBtns="topBtns" :rowBtns="rowBtns" />
</template>

<script setup>
import config from './config';

const topBtns = [{ type: 'save', label: '新增' }];

const rowBtns = [
    { type: 'update', label: '编辑' },
    { type: 'delete', label: '删除' },
];
</script>
```

## 特色功能

### 一个配置，多处使用

通过 `use` 字段控制同一字段在不同场景的展示：

```javascript
{
  prop: 'username',
  label: '用户名',
  use: ['table', 'filter', 'save', 'update'], // 在表格、筛选、新增、编辑中都显示
  type: 'input',
  required: true
}
```

### 自动加载异步数据

配置 `serviceUrl` 自动请求下拉选项：

```javascript
{
  prop: 'category',
  label: '分类',
  type: 'select-tree',
  serviceUrl: '/api/category/tree', // 自动请求并填充
  optionValue: 'id',
  optionLabel: 'name'
}
```

### 灵活的数据转换

使用 `transform` 处理复杂数据：

```javascript
{
  prop: 'dateRange',
  label: '时间范围',
  type: 'date-range',
  transform: (val) => ({
    startTime: val[0],
    endTime: val[1]
  })
}
```

## 谁在使用

MZ-UI 被广泛应用于：

-   🏢 企业 ERP 系统
-   📊 数据管理平台
-   🏭 资产管理系统
-   📦 仓储物流系统
-   🎯 各类后台管理系统

## 开源协议

[MIT License](https://opensource.org/licenses/MIT)

Copyright © 2025-present MZ-UI
