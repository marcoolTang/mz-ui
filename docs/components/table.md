# Table 表格

Table 组件用于展示数据列表，支持分页、排序、筛选、自定义列等功能。

## 基础用法

Table 组件通常作为 Container 组件的一部分使用，也可以独立使用：

```vue
<template>
  <table-view 
    :columns="tableColumns"
    serviceName="user"
    rowKey="id"
    :rowBtns="rowBtns"
    @operation-event="handleOperation"
  />
</template>

<script setup>
import TableView from '@/components/mz-ui/table-view'

const tableColumns = [
  {
    prop: 'id',
    label: 'ID',
    width: 80
  },
  {
    prop: 'username',
    label: '用户名',
    width: 150
  },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    customRender: (text) => {
      return text === 1 ? '启用' : '禁用'
    }
  }
]

const rowBtns = ['update', 'delete']

const handleOperation = (type, data) => {
  console.log('操作类型:', type)
  console.log('行数据:', data)
}
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| columns | 列配置数组 | `Array` | `[]` | ✅ 是 |
| serviceName | 服务名称，用于构建接口路径 | `String` | - | 是 |
| dataType | 数据类型 | `String` | `'page'` | 否 |
| rowKey | 行数据的唯一标识 | `String` | `'id'` | 否 |
| rowBtns | 行操作按钮数组 | `Array` | `[]` | 否 |
| selection | 是否显示多选框 | `Boolean` | `false` | 否 |
| noPage | 是否不显示分页 | `Boolean` | `false` | 否 |
| rowBtnsDisable | 按钮禁用配置 | `Array` | `[]` | 否 |
| rowClassName | 行类名 | `Function/String` | - | 否 |
| dataFilter | 数据过滤函数 | `Function` | - | 否 |
| query | 额外查询参数 | `Object` | `{}` | 否 |

## Columns 配置

Table 的 columns 配置与 Container 中 `use: ['table']` 的字段配置相同。

### 基础配置

```javascript
{
  prop: 'fieldName',      // 字段名（必填）
  label: '列标题',         // 列标题（必填）
  width: 150,             // 列宽
  fixed: 'left',          // 固定列：left / right
  sortable: true,         // 是否可排序
}
```

### 自定义渲染

#### 方式1：customRender

```javascript
{
  prop: 'amount',
  label: '金额',
  width: 120,
  customRender: (text, record, index) => {
    if (!text) return '--'
    return '¥' + text.toFixed(2)
  }
}
```

#### 方式2：filter-text 类型

```javascript
{
  prop: 'status',
  label: '状态',
  type: 'filter-text',
  filter: (data) => {
    const statusMap = {
      1: '<span style="color: green">启用</span>',
      0: '<span style="color: red">禁用</span>'
    }
    return statusMap[data.status] || '--'
  }
}
```

#### 方式3：render 函数

```javascript
{
  prop: 'tags',
  label: '标签',
  render: (row, index) => {
    return h('div', { class: 'tags' }, 
      row.tags.map(tag => h('span', { class: 'tag' }, tag))
    )
  }
}
```

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|---------|
| operation-event | 行操作按钮点击 | `(type: string, data: object)` |
| selection-change | 多选变化 | `(selection: array)` |
| render-success | 表格渲染完成 | - |

### operation-event 示例

```vue
<script setup>
const handleOperation = (type, data) => {
  switch(type) {
    case 'update':
      // 编辑逻辑
      editRow(data)
      break
    case 'delete':
      // 删除逻辑
      deleteRow(data)
      break
    case 'detail':
      // 详情逻辑
      showDetail(data)
      break
  }
}
</script>
```

### selection-change 示例

```vue
<template>
  <table-view 
    selection
    @selection-change="handleSelectionChange"
  />
</template>

<script setup>
const handleSelectionChange = (selection) => {
  console.log('已选中的行:', selection)
  selectedIds.value = selection.map(item => item.id)
}
</script>
```

## Methods

通过 ref 调用组件方法：

```vue
<template>
  <table-view ref="tableRef" />
</template>

<script setup>
const tableRef = ref()

// 刷新表格
const refresh = () => {
  tableRef.value.resetTable()
}

// 刷新并传递参数
const refreshWithParams = () => {
  tableRef.value.resetTable({
    current: 1,
    size: 20,
    status: 1
  })
}

// 获取表格数据
const getData = () => {
  const data = tableRef.value.getTableData()
  console.log('表格数据:', data)
}
</script>
```

### 方法列表

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| resetTable | 刷新表格数据 | `(query?: object)` | `Promise` |
| getTableData | 获取当前表格数据 | - | `Array` |

## 行操作按钮

### 内置按钮类型

```javascript
const rowBtns = [
  'update',   // 编辑
  'delete',   // 删除
  'detail'    // 详情
]
```

### 按钮禁用

#### 全局禁用

```vue
<table-view 
  :rowBtns="['update', 'delete']"
  :rowBtnsDisable="['delete']"  // 禁用删除按钮
/>
```

#### 条件禁用

```javascript
const rowBtnsDisable = [
  ['delete', { status: [1] }]  // status为1时禁用删除
]
```

## 列筛选

支持列级别的筛选功能：

```javascript
{
  prop: 'status',
  label: '状态',
  filters: [
    { text: '启用', value: 1 },
    { text: '禁用', value: 0 }
  ],
  filterMethod: (value, row) => {
    return row.status === value
  }
}
```

## 多选功能

### 启用多选

```vue
<template>
  <table-view 
    selection
    @selection-change="handleSelectionChange"
  />
</template>

<script setup>
const selectedRows = ref([])

const handleSelectionChange = (selection) => {
  selectedRows.value = selection
}
</script>
```

### 禁用某些行的多选

```vue
<table-view 
  selection
  :selectionDisabled="['status', [0]]"  // status为0的行不可选
/>
```

## 固定列

```javascript
{
  prop: 'id',
  label: 'ID',
  width: 80,
  fixed: 'left'  // 固定在左侧
}

{
  prop: 'operation',
  label: '操作',
  width: 150,
  fixed: 'right'  // 固定在右侧
}
```

## 自定义行类名

```vue
<table-view 
  :rowClassName="rowClassName"
/>

<script setup>
const rowClassName = (row, index) => {
  if (row.status === 0) {
    return 'disabled-row'
  }
  if (index % 2 === 0) {
    return 'even-row'
  }
  return ''
}
</script>

<style>
.disabled-row {
  background-color: #f5f5f5;
  color: #999;
}

.even-row {
  background-color: #fafafa;
}
</style>
```

## 数据过滤

使用 `dataFilter` 在数据显示前进行处理：

```vue
<table-view 
  :dataFilter="dataFilter"
/>

<script setup>
const dataFilter = (data) => {
  return data.map(item => ({
    ...item,
    fullName: `${item.firstName} ${item.lastName}`,
    statusText: item.status === 1 ? '启用' : '禁用'
  }))
}
</script>
```

## 分页配置

Table 组件内置分页功能：

```vue
<table-view 
  serviceName="user"
  :noPage="false"  <!-- 显示分页（默认） -->
/>
```

### 不显示分页

```vue
<table-view 
  serviceName="user"
  :noPage="true"  <!-- 不显示分页 -->
/>
```

## 接口规范

### 列表接口

```
GET /api/{serviceName}/page?current=1&size=10
```

**响应格式**：
```json
{
  "code": 200,
  "data": {
    "records": [...],
    "total": 100,
    "current": 1,
    "size": 10
  }
}
```

## 完整示例

```vue
<template>
  <div>
    <el-button @click="refresh">刷新</el-button>
    <el-button @click="batchDelete" :disabled="!selectedRows.length">
      批量删除
    </el-button>
    
    <table-view 
      ref="tableRef"
      :columns="columns"
      serviceName="user"
      rowKey="userId"
      selection
      :rowBtns="rowBtns"
      :rowClassName="rowClassName"
      @operation-event="handleOperation"
      @selection-change="handleSelectionChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TableView from '@/components/mz-ui/table-view'

const tableRef = ref()
const selectedRows = ref([])

// 列配置
const columns = [
  {
    prop: 'userId',
    label: 'ID',
    width: 80,
    fixed: 'left'
  },
  {
    prop: 'username',
    label: '用户名',
    width: 150
  },
  {
    prop: 'phone',
    label: '手机号',
    width: 130
  },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    type: 'filter-text',
    filters: [
      { text: '启用', value: 1 },
      { text: '禁用', value: 0 }
    ],
    filter: (data) => {
      const statusMap = {
        1: '<span style="color: green">● 启用</span>',
        0: '<span style="color: red">● 禁用</span>'
      }
      return statusMap[data.status]
    }
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 180
  }
]

// 行按钮
const rowBtns = ['update', 'delete']

// 行类名
const rowClassName = (row) => {
  return row.status === 0 ? 'disabled-row' : ''
}

// 处理操作
const handleOperation = (type, data) => {
  console.log('操作:', type, data)
}

// 处理多选
const handleSelectionChange = (selection) => {
  selectedRows.value = selection
}

// 刷新
const refresh = () => {
  tableRef.value.resetTable()
}

// 批量删除
const batchDelete = () => {
  const ids = selectedRows.value.map(row => row.userId)
  console.log('批量删除:', ids)
}
</script>

<style>
.disabled-row {
  background-color: #f5f5f5;
  color: #999;
}
</style>
```

## 常见问题

### 1. 如何自定义列显示？

使用 `customRender`、`filter` 或 `render` 函数。

### 2. 如何实现列排序？

在列配置中添加 `sortable: true`。

### 3. 如何禁用某些行的操作按钮？

使用 `rowBtnsDisable` 配置。

### 4. 如何获取选中的行？

监听 `selection-change` 事件。

### 5. 如何手动刷新表格？

通过 ref 调用 `resetTable()` 方法。

## 下一步

- 📖 查看 [Container 组件](/components/container)
- 📖 查看 [Filter 组件](/components/filter)
- 📖 查看 [配置说明](/guide/configuration)
