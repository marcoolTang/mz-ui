# Detail 详情

Detail 组件用于展示数据详情，以抽屉形式从右侧滑出，支持自定义布局和操作按钮。

## 基础用法

Detail 组件通常作为 Container 组件的一部分使用：

```vue
<template>
  <container-view 
    :columns="config.columns"
    serviceName="user"
    :rowBtns="rowBtns"
  />
</template>

<script setup>
const rowBtns = [
  { type: 'detail', label: '详情' }  // 点击会打开详情抽屉
]
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| detailWidth | 抽屉宽度 | `Number` | `800` |
| detailBnts | 底部操作按钮 | `Array` | `[]` |
| btnsDisable | 禁用的按钮 | `Array` | `[]` |

## 详情配置

详情配置通过 Container 的 columns 中 `use: ['detail']` 的字段自动生成。

### 基础配置

```javascript
{
  prop: 'username',
  label: '用户名',
  use: ['table', 'detail'],  // 在表格和详情中显示
  type: 'input'
}

{
  prop: 'createTime',
  label: '创建时间',
  use: ['table', 'detail'],
  type: 'date',
  formatType: 'datetime'
}
```

## 自定义详情布局

使用 `detailWidth` 控制抽屉宽度：

```vue
<container-view 
  :detailWidth="1000"
/>
```

## 底部操作按钮

可以在详情页底部添加操作按钮：

```vue
<container-view 
  :detailBnts="['edit', 'delete']"
/>
```

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|---------|
| detail-submit | 底部按钮点击 | `(type: string, data: object)` |

## Methods

通过 Container 组件的 ref 调用：

```vue
<template>
  <container-view ref="containerRef" />
</template>

<script setup>
const containerRef = ref()

// 打开详情
const openDetail = (data) => {
  containerRef.value.initDetail(data)
}

// 关闭详情
const closeDetail = () => {
  containerRef.value.closeDetail()
}
</script>
```

## 完整示例

```javascript
export default {
  columns: [
    {
      items: [
        {
          prop: 'id',
          label: 'ID',
          use: ['table', 'detail'],
          type: 'input',
          width: 80
        },
        {
          prop: 'username',
          label: '用户名',
          use: ['table', 'detail'],
          type: 'input'
        },
        {
          prop: 'phone',
          label: '手机号',
          use: ['table', 'detail'],
          type: 'input'
        },
        {
          prop: 'email',
          label: '邮箱',
          use: ['table', 'detail'],
          type: 'input'
        },
        {
          prop: 'department',
          label: '部门',
          use: ['detail'],
          type: 'select-tree',
          serviceUrl: '/api/department/tree',
          optionValue: 'id',
          optionLabel: 'name'
        },
        {
          prop: 'status',
          label: '状态',
          use: ['table', 'detail'],
          type: 'select',
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ]
        },
        {
          prop: 'createTime',
          label: '创建时间',
          use: ['table', 'detail'],
          type: 'date',
          formatType: 'datetime'
        },
        {
          prop: 'remark',
          label: '备注',
          use: ['detail'],
          type: 'textarea'
        }
      ]
    }
  ]
}
```

## 下一步

- 📖 查看 [Container 组件](/components/container)
- 📖 查看 [配置说明](/guide/configuration)
