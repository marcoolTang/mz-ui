# 带筛选的列表

本示例演示如何创建一个带复杂筛选条件的列表页面。

## 完整代码

```javascript
// config.js
export default {
  columns: [
    {
      items: [
        // 用户名筛选
        {
          prop: 'username',
          label: '用户名',
          use: ['table', 'filter'],
          type: 'input',
          placeholder: '请输入用户名'
        },
        
        // 手机号筛选
        {
          prop: 'phone',
          label: '手机号',
          use: ['table', 'filter'],
          type: 'input',
          placeholder: '请输入手机号'
        },
        
        // 部门筛选（树形多选）
        {
          prop: 'department',
          label: '部门',
          use: ['filter', 'save', 'update'],
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
        
        // 状态筛选
        {
          prop: 'status',
          label: '状态',
          use: ['table', 'filter', 'save', 'update'],
          type: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ]
        },
        
        // 日期范围筛选
        {
          prop: 'dateRange',
          label: '创建时间',
          use: ['filter'],
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
        },
        
        // 创建时间（只展示）
        {
          prop: 'createTime',
          label: '创建时间',
          use: ['table'],
          type: 'date',
          formatType: 'datetime',
          width: 180
        }
      ]
    }
  ]
}
```

```vue
<!-- UserList.vue -->
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
import config from './config'

const topBtns = [
  { type: 'save', label: '新增用户' }
]

const rowBtns = [
  { type: 'update', label: '编辑' },
  { type: 'detail', label: '详情' },
  { type: 'delete', label: '删除' }
]
</script>
```

## 运行效果

筛选区包含：
- ✅ 用户名输入框
- ✅ 手机号输入框
- ✅ 部门树形多选（自动加载选项）
- ✅ 状态下拉选择
- ✅ 创建时间范围选择

点击"搜索"后，筛选条件会自动转换并传递给后端接口。

## 下一步

- 📖 查看 [树形分类列表](/examples/with-tree)
- 📖 查看 [导入导出](/examples/import-export)
