# Container 容器组件

Container 是 MZ-UI 的核心组件，它整合了筛选、表格、表单、详情等功能，让你用最少的代码构建完整的列表管理页面。

## 基础用法

```vue
<template>
  <container-view 
    :columns="config.columns"
    serviceName="user"
    primaryKey="userId"
    :topBtns="topBtns"
    :rowBtns="rowBtns"
  />
</template>

<script setup>
import ContainerView from '@/components/mz-ui/container-view'
import config from './config'

const topBtns = [
  { type: 'save', label: '新增' }
]

const rowBtns = [
  { type: 'update', label: '编辑' },
  { type: 'delete', label: '删除' }
]
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| columns | 列配置数组 | `Array` | `[]` | ✅ 是 |
| serviceName | 服务名称，用于构建接口路径 | `String` | - | ✅ 是 |
| primaryKey | 主键字段名 | `String` | `'id'` | 否 |
| topBtns | 顶部按钮配置 | `Array` | `[]` | 否 |
| rowBtns | 行操作按钮配置 | `Array` | `[]` | 否 |
| notResetTable | 挂载时是否不加载表格数据 | `Boolean` | `false` | 否 |
| formLayout | 表单布局列数 | `Number` | `2` | 否 |
| detailBnts | 详情页底部按钮 | `Array` | `[]` | 否 |
| btnsDisable | 禁用的按钮类型数组 | `Array` | `[]` | 否 |
| detailWidth | 详情抽屉宽度 | `Number` | `800` | 否 |
| dialogWidth | 表单弹窗宽度 | `String` | `'50%'` | 否 |
| rowClassName | 表格行的类名 | `Function / String` | - | 否 |
| dataFilter | 表格数据过滤函数 | `Function` | - | 否 |
| query | 额外的查询参数 | `Object` | `{}` | 否 |

## Columns 配置

Columns 是 MZ-UI 最核心的配置项，它决定了数据在各个组件中的展示方式。

### 基础结构

```javascript
export default {
  columns: [
    {
      items: [
        {
          prop: 'name',           // 字段名（必填）
          label: '用户名',         // 显示标签（必填）
          use: ['table', 'filter', 'save', 'update'],  // 使用场景（必填）
          type: 'input',          // 组件类型（必填）
          required: true,         // 是否必填
          placeholder: '请输入用户名',
          // ... 其他配置
        }
      ]
    }
  ]
}
```

### use 字段说明

`use` 数组决定该字段在哪些场景中使用：

| 值 | 说明 | 展示位置 |
|---|---|---|
| `table` | 表格列 | 数据表格中 |
| `filter` | 筛选条件 | 页面顶部筛选区 |
| `save` | 新增字段 | 新增表单弹窗 |
| `update` | 编辑字段 | 编辑表单弹窗 |
| `detail` | 详情字段 | 详情抽屉 |

**示例**：
```javascript
// 在所有场景都显示
use: ['table', 'filter', 'save', 'update', 'detail']

// 只在表格和筛选中显示
use: ['table', 'filter']

// 只在表单中显示（新增和编辑）
use: ['save', 'update']
```

### type 字段类型

| 类型 | 说明 | 适用场景 | 配置示例 |
|------|------|---------|---------|
| `input` | 输入框 | 姓名、手机号等 | `type: 'input'` |
| `textarea` | 文本域 | 备注、描述等 | `type: 'textarea'` |
| `select` | 下拉选择 | 状态、类型等 | 需配置 `options` |
| `select-tree` | 树形选择 | 分类、部门等 | 需配置 `serviceUrl` |
| `date` | 日期选择 | 创建时间等 | `type: 'date'` |
| `date-range` | 日期范围 | 时间段筛选 | `type: 'date-range'` |
| `switch` | 开关 | 启用/禁用 | `type: 'switch'` |
| `file` | 文件上传 | 附件、图片 | `type: 'file'` |
| `filter-text` | 自定义展示 | 表格列自定义 | 需配置 `filter` 函数 |

### 常用配置项

```javascript
{
  prop: 'status',
  label: '状态',
  use: ['table', 'filter', 'save', 'update'],
  type: 'select',
  
  // 基础配置
  required: true,              // 是否必填
  placeholder: '请选择状态',    // 占位提示
  disabled: false,             // 是否禁用
  
  // Select 专用
  options: [                   // 下拉选项
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 }
  ],
  multiple: false,             // 是否多选
  
  // Select-Tree 专用
  serviceUrl: '/api/dept/tree', // 异步加载接口
  optionValue: 'id',            // 选项值字段
  optionLabel: 'name',          // 选项标签字段
  
  // Date 专用
  formatType: 'datetime',       // 格式类型：date / datetime / time
  
  // 自定义展示
  customRender: (text) => {     // 表格列自定义渲染
    return '¥' + text.toFixed(2)
  },
  
  // 数据转换
  transform: (val) => {         // 筛选数据转换
    return { statusId: val }
  }
}
```

## 完整配置示例

::: details 点击查看完整配置

```javascript
// config.js
export default {
  columns: [
    {
      items: [
        // 基础输入框
        {
          prop: 'username',
          label: '用户名',
          use: ['table', 'filter', 'save', 'update'],
          type: 'input',
          required: true,
          placeholder: '请输入用户名'
        },
        
        // 手机号
        {
          prop: 'phone',
          label: '手机号',
          use: ['table', 'save', 'update'],
          type: 'input',
          required: true,
          placeholder: '请输入手机号'
        },
        
        // 下拉选择
        {
          prop: 'status',
          label: '状态',
          use: ['table', 'filter', 'save', 'update'],
          type: 'select',
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ],
          required: true
        },
        
        // 树形选择（异步加载）
        {
          prop: 'department',
          label: '部门',
          use: ['filter', 'save', 'update'],
          type: 'select-tree',
          serviceUrl: '/api/department/tree',
          optionValue: 'id',
          optionLabel: 'name',
          multiple: true,
          // 多选数组转逗号分隔字符串
          transform: (val) => {
            if (Array.isArray(val) && val.length > 0) {
              return { deptIds: val.join(',') }
            }
            return {}
          }
        },
        
        // 日期范围筛选
        {
          prop: 'dateRange',
          label: '创建时间',
          use: ['filter'],
          type: 'date-range',
          // 转换为开始结束时间
          transform: (val) => {
            if (Array.isArray(val) && val.length === 2) {
              return {
                startTime: val[0],
                endTime: val[1]
              }
            }
            return {}
          }
        },
        
        // 创建时间（只展示）
        {
          prop: 'createTime',
          label: '创建时间',
          use: ['table', 'detail'],
          type: 'date',
          formatType: 'datetime'
        },
        
        // 金额（自定义显示）
        {
          prop: 'amount',
          label: '金额',
          use: ['table'],
          type: 'filter-text',
          customRender: (text) => {
            return text ? '¥' + text.toFixed(2) : '--'
          }
        },
        
        // 备注
        {
          prop: 'remark',
          label: '备注',
          use: ['save', 'update', 'detail'],
          type: 'textarea',
          placeholder: '请输入备注'
        }
      ]
    }
  ]
}
```
:::

## 按钮配置

### topBtns 顶部按钮

```javascript
const topBtns = [
  { type: 'save', label: '新增' },
  { type: 'import', label: '导入' },
  { type: 'template', label: '下载模板' }
]
```

**内置按钮类型**：
- `save` - 新增：打开新增表单弹窗
- `import` - 导入：打开文件上传弹窗
- `template` - 下载模板：下载 Excel 模板

### rowBtns 行操作按钮

```javascript
const rowBtns = [
  { type: 'update', label: '编辑' },
  { type: 'detail', label: '详情' },
  { type: 'delete', label: '删除' }
]
```

**内置按钮类型**：
- `update` - 编辑：打开编辑表单弹窗
- `detail` - 详情：打开详情抽屉
- `delete` - 删除：显示确认提示后删除

### 自定义按钮

通过监听 `btns-event` 事件实现自定义按钮：

```vue
<template>
  <container-view 
    :columns="config.columns"
    serviceName="user"
    :topBtns="topBtns"
    :rowBtns="rowBtns"
    @btns-event="handleBtnClick"
  />
</template>

<script setup>
const topBtns = [
  { type: 'save', label: '新增' },
  { type: 'export', label: '导出' }  // 自定义按钮
]

const rowBtns = [
  { type: 'update', label: '编辑' },
  { type: 'approve', label: '审批' }  // 自定义按钮
]

const handleBtnClick = (type, data, parentData) => {
  if (type === 'export') {
    // 处理导出逻辑
    console.log('导出数据')
  }
  
  if (type === 'approve') {
    // 处理审批逻辑
    console.log('审批', data)
  }
}
</script>
```

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|---------|
| btns-event | 按钮点击事件 | `(type: string, data?: object, parentData?: object)` |
| selection-change | 表格选择变化 | `(selection: array)` |

### btns-event 示例

```vue
<script setup>
const handleBtnClick = (type, data, parentData) => {
  console.log('按钮类型:', type)
  console.log('当前行数据:', data)
  console.log('父级数据:', parentData)
  
  // 根据不同按钮类型执行不同逻辑
  switch(type) {
    case 'export':
      exportData()
      break
    case 'approve':
      approveData(data)
      break
  }
}
</script>
```

### selection-change 示例

```vue
<script setup>
const handleSelectionChange = (selection) => {
  console.log('已选中的行:', selection)
  // selection 是选中行的数据数组
}
</script>
```

## Methods

通过 `ref` 调用组件方法：

```vue
<template>
  <container-view ref="containerRef" />
</template>

<script setup>
import { ref } from 'vue'

const containerRef = ref()

// 刷新表格
const refreshTable = () => {
  containerRef.value.resetTable()
}

// 获取筛选数据
const getFilter = () => {
  const filterData = containerRef.value.getFilterViewData()
  console.log('当前筛选条件:', filterData)
}

// 获取表格数据
const getTable = () => {
  const tableData = containerRef.value.getTableData()
  console.log('当前表格数据:', tableData)
}

// 打开详情
const openDetail = (data) => {
  containerRef.value.initDetail(data)
}

// 关闭详情
const closeDetail = () => {
  containerRef.value.closeDetail()
}

// 设置列配置
const updateColumn = () => {
  containerRef.value.setColumn('status', {
    disabled: true  // 禁用状态字段
  })
}

// 设置查询参数
const setQueryParams = () => {
  containerRef.value.setQuery({
    extraParam: 'value'
  })
}
</script>
```

### 方法列表

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| resetTable | 刷新表格数据 | - | `Promise` |
| getFilterViewData | 获取筛选条件数据 | - | `Object` |
| getTableData | 获取表格数据 | - | `Array` |
| initDetail | 打开详情抽屉 | `(data, columns?, title?, showBtns?)` | - |
| closeDetail | 关闭详情抽屉 | - | - |
| setColumn | 更新列配置 | `(prop, values)` | - |
| setQuery | 设置查询参数 | `(query)` | - |
| setDetailLoading | 设置详情加载状态 | `(type, status)` | - |

## 高级功能

### 1. 异步数据加载

自动处理下拉选项和树形数据的异步加载：

```javascript
{
  prop: 'category',
  label: '分类',
  use: ['filter', 'save'],
  type: 'select-tree',
  serviceUrl: '/api/category/tree',  // 自动请求此接口
  optionValue: 'id',
  optionLabel: 'name'
}
```

**工作原理**：
1. `staticColumsHandle` 函数在组件挂载时自动调用
2. 扫描所有配置了 `serviceUrl` 的字段
3. 使用 `Promise.all` 并行请求所有接口
4. 将返回数据赋值给 `options` 字段

### 2. 数据转换（Transform）

用于将表单数据转换为接口需要的格式：

```javascript
{
  prop: 'category',
  label: '分类',
  use: ['filter'],
  type: 'select-tree',
  multiple: true,
  // 数组 [1, 2, 3] 转换为字符串 "1,2,3"
  transform: (val) => {
    if (Array.isArray(val) && val.length > 0) {
      return { categoryIds: val.join(',') }
    }
    return {}
  }
}
```

**常用转换场景**：

::: details 数组转逗号分隔字符串
```javascript
transform: (val) => {
  if (Array.isArray(val) && val.length > 0) {
    return { fieldName: val.join(',') }
  }
  return {}
}
```
:::

::: details 日期范围转开始结束时间
```javascript
transform: (val) => {
  if (Array.isArray(val) && val.length === 2) {
    return {
      startTime: val[0] + ' 00:00:00',
      endTime: val[1] + ' 23:59:59'
    }
  }
  return {}
}
```
:::

::: details 布尔值转数字
```javascript
transform: (val) => {
  return { status: val ? 1 : 0 }
}
```
:::

### 3. 自定义表格列渲染

使用 `customRender` 或 `filter` 函数：

```javascript
// 方式1：customRender
{
  prop: 'amount',
  label: '金额',
  use: ['table'],
  customRender: (text, record) => {
    return text ? '¥' + text.toFixed(2) : '--'
  }
}

// 方式2：filter-text + filter
{
  prop: 'status',
  label: '状态',
  use: ['table'],
  type: 'filter-text',
  filter: (data) => {
    const statusMap = {
      1: '启用',
      0: '禁用'
    }
    return statusMap[data.status]
  }
}
```

### 4. 条件禁用

根据条件禁用某些行的操作按钮：

```vue
<template>
  <container-view 
    :btnsDisable="btnsDisable"
    :rowBtns="rowBtns"
  />
</template>

<script setup>
// 禁用指定类型的按钮
const btnsDisable = ['delete']  // 禁用删除按钮

// 或者根据数据动态禁用
const btnsDisable = computed(() => {
  // 根据业务逻辑返回需要禁用的按钮类型
  return someCondition ? ['delete', 'update'] : []
})
</script>
```

### 5. 数据过滤

使用 `dataFilter` 函数处理表格数据：

```vue
<template>
  <container-view 
    :dataFilter="dataFilter"
  />
</template>

<script setup>
const dataFilter = (data) => {
  // 在数据显示前进行处理
  return data.map(item => ({
    ...item,
    displayName: item.firstName + ' ' + item.lastName
  }))
}
</script>
```

## 接口规范

Container 组件要求后端接口遵循以下规范：

### 列表接口

```
GET /api/{serviceName}/page?current=1&size=10&筛选参数
```

**响应格式**：
```json
{
  "code": 200,
  "isSuccess": 1,
  "data": {
    "data": [
      { "id": 1, "name": "用户1" },
      { "id": 2, "name": "用户2" }
    ],
    "total": 100,
    "current": 1,
    "size": 10
  },
  "msg": "success"
}
```

### 新增接口

```
POST /api/{serviceName}/save
Content-Type: application/json

{
  "name": "新用户",
  "status": 1
}
```

**响应格式**：
```json
{
  "code": 200,
  "isSuccess": 1,
  "msg": "新增成功"
}
```

### 编辑接口

```
POST /api/{serviceName}/update
Content-Type: application/json

{
  "id": 1,
  "name": "修改后的名称",
  "status": 0
}
```

### 删除接口

```
DELETE /api/{serviceName}/delete?{primaryKey}=1
```

### 详情接口（可选）

```
GET /api/{serviceName}/detail?{primaryKey}=1
```

## 常见问题

### 1. 如何处理多选数组转字符串？

使用 `transform` 配置：

```javascript
{
  prop: 'category',
  transform: (val) => {
    if (Array.isArray(val) && val.length > 0) {
      return { categoryIds: val.join(',') }
    }
    return {}
  }
}
```

### 2. 如何自定义表格列显示？

使用 `customRender`：

```javascript
{
  prop: 'status',
  customRender: (text) => {
    return text === 1 ? '启用' : '禁用'
  }
}
```

### 3. 如何禁用某些行的按钮？

使用 `btnsDisable` prop：

```vue
<container-view :btnsDisable="['delete', 'update']" />
```

### 4. 如何监听按钮点击？

监听 `btns-event` 事件：

```vue
<container-view @btns-event="handleBtnClick" />
```

### 5. 如何刷新表格？

通过 ref 调用方法：

```vue
<script setup>
const containerRef = ref()
containerRef.value.resetTable()
</script>
```

### 6. 异步选项加载失败怎么办？

检查：
1. `serviceUrl` 是否正确
2. 接口返回格式是否为 `{ data: [...] }`
3. 查看浏览器控制台错误信息

### 7. 表单验证如何配置？

在 column 配置中添加 `required` 和 `rules`：

```javascript
{
  prop: 'email',
  label: '邮箱',
  required: true,
  rules: [
    { type: 'email', message: '请输入正确的邮箱' }
  ]
}
```

## 下一步

- 📖 查看 [Filter 筛选器](/components/filter)
- 📖 查看 [Table 表格](/components/table)
- 📖 查看 [Form 表单](/components/form)
- 💡 参考 [完整示例](/examples/basic)
