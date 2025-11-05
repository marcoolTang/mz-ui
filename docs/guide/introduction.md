# 介绍

## MZ-UI 是什么？

MZ-UI 是一套基于 Vue 3 和 Element Plus 的后台管理系统组件库，专为快速开发企业级管理系统而设计。

## 为什么选择 MZ-UI？

### 🎯 解决的痛点

在开发后台管理系统时，我们经常遇到这些问题：

- **重复代码多**：每个列表页都要写筛选、表格、分页、新增、编辑、删除...
- **配置繁琐**：表格列配置、表单配置、筛选配置要写三遍
- **异步数据麻烦**：下拉选项、树形数据要手动请求、处理
- **数据转换复杂**：日期范围、多选数组等需要手动转换格式

### ✨ MZ-UI 的解决方案

```javascript
// 一个配置文件，搞定表格、筛选、表单！
export default {
  columns: [
    {
      items: [
        {
          prop: 'username',
          label: '用户名',
          use: ['table', 'filter', 'save', 'update'], // 多场景复用
          type: 'input',
          required: true
        },
        {
          prop: 'department',
          label: '部门',
          use: ['filter', 'save'],
          type: 'select-tree',
          serviceUrl: '/api/department/tree', // 自动加载
          multiple: true,
          transform: (val) => ({ deptId: val.join(',') }) // 自动转换
        }
      ]
    }
  ]
}
```

## 核心特性

### 1. 统一配置

通过 `columns` 配置，一次定义，多处使用：

- `use: ['table']` - 在表格中显示
- `use: ['filter']` - 在筛选器中显示  
- `use: ['save']` - 在新增表单中显示
- `use: ['update']` - 在编辑表单中显示
- `use: ['detail']` - 在详情中显示

### 2. 自动化处理

**异步数据自动加载**：
```javascript
{
  type: 'select-tree',
  serviceUrl: '/api/category/tree', // 自动请求
  optionValue: 'id',
  optionLabel: 'name'
}
```

**数据自动转换**：
```javascript
{
  type: 'date-range',
  transform: (val) => ({
    startTime: val[0],
    endTime: val[1]
  })
}
```

### 3. 组件化设计

```
Container 容器
  ├── Filter 筛选器
  ├── Table 表格
  ├── Form 表单（新增/编辑）
  └── Detail 详情
```

每个组件既可以独立使用，也可以组合使用。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Element Plus** - Vue 3 UI 组件库
- **Composition API** - Vue 3 新特性
- **TypeScript** - 类型支持（可选）

## 浏览器支持

| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) |
| --- | --- | --- | --- |
| Chrome ≥ 87 | Firefox ≥ 78 | Safari ≥ 14 | Edge ≥ 88 |

## 版本

当前版本：`v1.0.0`

- ✅ 稳定版本
- 🚀 持续更新
- 📦 生产可用

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 开源协议

[MIT](https://opensource.org/licenses/MIT)
