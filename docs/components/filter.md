# Filter 筛选器

Filter 组件用于页面顶部的数据筛选，支持多种表单控件类型，自动处理数据转换。

## 基础用法

Filter 组件通常作为 Container 组件的一部分使用，也可以独立使用：

```vue
<template>
  <filter-view 
    :columns="filterColumns"
    @submitForm="handleSearch"
  />
</template>

<script setup>
import FilterView from '@/components/mz-ui/filter-view'

const filterColumns = [
  {
    prop: 'username',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名'
  },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  }
]

const handleSearch = (query) => {
  console.log('筛选条件:', query)
  // { username: '张三', status: 1 }
}
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| columns | 筛选项配置数组 | `Array` | `[]` | ✅ 是 |
| disabled | 是否禁用所有筛选项 | `Boolean` | `false` | 否 |
| inline | 是否行内显示 | `Boolean` | `false` | 否 |
| labelWidth | 标签宽度 | `String` | `'100px'` | 否 |

## Columns 配置

Filter 的 columns 配置与 Container 中 `use: ['filter']` 的字段配置相同。

### 基础结构

```javascript
{
  prop: 'fieldName',      // 字段名（必填）
  label: '字段标签',       // 显示标签（必填）
  type: 'input',          // 控件类型（必填）
  placeholder: '提示文字',
  // 其他配置...
}
```

### 支持的控件类型

| 类型 | 说明 | 配置示例 |
|------|------|---------|
| `input` | 输入框 | `{ type: 'input', placeholder: '请输入' }` |
| `select` | 下拉选择 | `{ type: 'select', options: [...] }` |
| `select-tree` | 树形选择 | `{ type: 'select-tree', serviceUrl: '...' }` |
| `date` | 日期选择 | `{ type: 'date', formatType: 'date' }` |
| `date-range` | 日期范围 | `{ type: 'date-range' }` |
| `switch` | 开关 | `{ type: 'switch' }` |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|---------|
| submitForm | 点击搜索按钮触发 | `(query: Object)` - 筛选条件对象 |

### submitForm 事件

点击"搜索"按钮时触发，返回筛选条件对象：

```vue
<script setup>
const handleSearch = (query) => {
  console.log('筛选条件:', query)
  // query 结构：
  // {
  //   username: '张三',
  //   status: 1,
  //   dateRange: ['2024-01-01', '2024-01-31']
  // }
  
  // 调用接口查询数据
  fetchData(query)
}
</script>
```

## Methods

通过 ref 调用组件方法：

```vue
<template>
  <filter-view ref="filterRef" />
</template>

<script setup>
const filterRef = ref()

// 获取当前筛选数据
const getData = () => {
  const data = filterRef.value.getFilterData()
  console.log('当前筛选条件:', data)
}
</script>
```

### 方法列表

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| getFilterData | 获取当前筛选数据 | - | `Object` |

## Transform 数据转换

使用 `transform` 函数可以在提交前转换数据格式：

```javascript
{
  prop: 'category',
  label: '分类',
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

### 1. 数组转逗号分隔字符串

```javascript
{
  prop: 'tags',
  type: 'select',
  multiple: true,
  transform: (val) => {
    if (Array.isArray(val) && val.length > 0) {
      return { tagIds: val.join(',') }
    }
    return {}
  }
}
```

### 2. 日期范围转开始结束时间

```javascript
{
  prop: 'dateRange',
  type: 'date-range',
  transform: (val) => {
    if (Array.isArray(val) && val.length === 2) {
      return {
        startTime: val[0] + ' 00:00:00',
        endTime: val[1] + ' 23:59:59'
      }
    }
    return {}
  }
}
```

### 3. 对象提取属性

```javascript
{
  prop: 'user',
  type: 'select',
  transform: (val) => {
    return { userId: val?.id }
  }
}
```

## 完整示例

```vue
<template>
  <div>
    <filter-view 
      ref="filterRef"
      :columns="columns"
      @submitForm="handleSearch"
    />
    
    <el-table :data="tableData" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FilterView from '@/components/mz-ui/filter-view'

const filterRef = ref()
const tableData = ref([])

// 筛选项配置
const columns = [
  {
    prop: 'username',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名'
  },
  {
    prop: 'phone',
    label: '手机号',
    type: 'input',
    placeholder: '请输入手机号'
  },
  {
    prop: 'department',
    label: '部门',
    type: 'select-tree',
    serviceUrl: '/api/department/tree',
    optionValue: 'id',
    optionLabel: 'name',
    multiple: true,
    transform: (val) => {
      if (Array.isArray(val) && val.length > 0) {
        return { deptIds: val.join(',') }
      }
      return {}
    }
  },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    options: [
      { label: '全部', value: '' },
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  },
  {
    prop: 'dateRange',
    label: '创建时间',
    type: 'date-range',
    transform: (val) => {
      if (Array.isArray(val) && val.length === 2) {
        return {
          startTime: val[0] + ' 00:00:00',
          endTime: val[1] + ' 23:59:59'
        }
      }
      return {}
    }
  }
]

// 处理搜索
const handleSearch = async (query) => {
  console.log('筛选条件:', query)
  
  try {
    const { data } = await fetchData(query)
    tableData.value = data
  } catch (error) {
    console.error('查询失败:', error)
  }
}

// 获取当前筛选数据
const getCurrentFilter = () => {
  const data = filterRef.value.getFilterData()
  console.log('当前筛选条件:', data)
  return data
}
</script>
```

## 样式定制

Filter 组件提供了一些 CSS 变量用于样式定制：

```css
.filter_container {
  --filter-bg: #ffffff;        /* 背景色 */
  --filter-padding: 16px;      /* 内边距 */
  --filter-radius: 6px;        /* 圆角 */
  --item-width: 360px;         /* 筛选项宽度 */
  --item-margin: 16px;         /* 筛选项间距 */
}
```

自定义样式：

```vue
<style scoped>
.filter_container {
  background-color: #f5f5f5;
}

.filter_container :deep(.el-form-item) {
  width: 300px !important;  /* 自定义筛选项宽度 */
}
</style>
```

## 特性说明

### 1. 自动初始化

组件会根据字段类型自动设置默认值：

- `select` → `[]`（空数组）
- `switch` → `false`
- `date` → `null`
- `date-range` → `[]`
- 其他 → `""`（空字符串）

### 2. 自动重置

点击"重置"按钮会将所有字段恢复为默认值。

### 3. 响应式布局

筛选项自动换行，适配不同屏幕宽度。

### 4. 验证支持

支持表单验证：

```javascript
{
  prop: 'phone',
  label: '手机号',
  type: 'input',
  rules: [
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
  ]
}
```

## 常见问题

### 1. 如何处理多选数组转字符串？

使用 `transform` 配置：

```javascript
{
  prop: 'tags',
  multiple: true,
  transform: (val) => {
    if (Array.isArray(val) && val.length > 0) {
      return { tagIds: val.join(',') }
    }
    return {}
  }
}
```

### 2. 如何设置默认筛选条件？

可以在 columns 中设置 `defaultValue`：

```javascript
{
  prop: 'status',
  label: '状态',
  type: 'select',
  defaultValue: 1,  // 默认值
  options: [...]
}
```

### 3. 日期范围如何转换格式？

使用 `transform`：

```javascript
{
  prop: 'dateRange',
  type: 'date-range',
  transform: (val) => {
    if (Array.isArray(val) && val.length === 2) {
      return {
        startTime: val[0],
        endTime: val[1]
      }
    }
    return {}
  }
}
```

### 4. 如何禁用某些筛选项？

使用 `disabled` 属性：

```javascript
{
  prop: 'status',
  type: 'select',
  disabled: true,  // 禁用此筛选项
  options: [...]
}
```

### 5. 如何自定义按钮？

目前 Filter 组件只支持"搜索"和"重置"两个按钮。如需更多按钮，可以在外层自定义：

```vue
<template>
  <div>
    <filter-view @submitForm="handleSearch" />
    <el-button @click="handleExport">导出</el-button>
  </div>
</template>
```

## 最佳实践

### 1. 合理使用 Transform

Transform 应该只处理数据格式转换，不要包含业务逻辑：

```javascript
// ✅ 推荐：只做格式转换
transform: (val) => ({ fieldName: val.join(',') })

// ❌ 不推荐：包含业务逻辑
transform: (val) => {
  const result = someComplexLogic(val)
  return { fieldName: result }
}
```

### 2. 字段命名规范

```javascript
// ✅ 推荐：使用驼峰命名
prop: 'userName'
prop: 'createTime'

// ❌ 不推荐：使用下划线
prop: 'user_name'
prop: 'create_time'
```

### 3. 异步选项加载

对于下拉选项较多的情况，使用异步加载：

```javascript
{
  prop: 'category',
  type: 'select-tree',
  serviceUrl: '/api/category/tree',  // 自动加载
  optionValue: 'id',
  optionLabel: 'name'
}
```

## 下一步

- 📖 查看 [Container 组件](/components/container)
- 📖 查看 [Table 组件](/components/table)
- 📖 查看 [配置说明](/guide/configuration)
- 💡 参考 [完整示例](/examples/with-filter)
