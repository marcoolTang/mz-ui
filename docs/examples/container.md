# 容器组件示例

MzContainerView 是一个集成了筛选、表格、表单的综合容器组件,适用于标准 CRUD 场景。

<script setup>
import { ref, h } from 'vue'
import { ElMessage, ElTag } from 'element-plus'

const tableData = ref([
  { id: 1, name: '张三', age: 28, address: '北京市朝阳区', status: 1 },
  { id: 2, name: '李四', age: 32, address: '上海市浦东新区', status: 1 },
  { id: 3, name: '王五', age: 25, address: '深圳市南山区', status: 2 }
])

const config = {
  columns: [
    {
      items: [
        {
          prop: 'name',
          label: '姓名',
          type: 'text',
          use: ['table', 'filter', 'update', 'save'],
          required: true,
        },
        {
          prop: 'age',
          label: '年龄',
          use: ['table', 'filter', 'update', 'save'],
          type: 'text',
          required: true,
        },
        {
          prop: 'name',
          label: '类别名称',
          use: ['table', 'filter', 'update', 'save'],
          type: 'text',
          required: true,
        },
        {
          prop: 'address',
          label: '地址',
          type: 'text',
          use: ['table', 'filter', 'update', 'save'],

          required: true,
        },

        {
          prop: 'status',
          label: '属性',
          use: ['table', 'filter', 'update', 'save'],
          type: 'select',
          width: 120,
          optionValue: 'value',
          optionLabel: 'label',
          options: [
            {
              label: '在职',
              value: '1',
            },
            {
              label: '离职',
              value: '2',
            },
          ],
          render: (row) => {

            const statusMap = {
              1: { label: '在职', type: 'success' },
              2: { label: '离职', type: 'danger' },
            };
            const status = statusMap[row.status] || { label: '未知', type: 'info' };

            return h(
              ElTag,
              {
                type: status.type,
                size: 'default',
              },
              () => status.label
            );
          },
        },

      ],
    },
  ],
};

const handleOperation = (type, row) => {
  ElMessage.info(`执行 ${type} 操作`)
  console.log('容器操作:', { type, row })
}
</script>

<div style="padding: 20px; background: #fff; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); height: 700px;">
  <mz-container-view 
    :columns="config.columns"
    :row-btns="['update', 'delete']"
    :top-btns="['save']"
    :table-data="tableData"
    :page-total="50"
    primary-key="id"
    @btns-event="handleOperation"
  />
</div>

## 代码示例

```vue
<template>
    <mz-container-view
        :columns="columns"
        :row-btns="['update', 'delete']"
        :top-btns="['save']"
        :table-data="tableData"
        :page-total="50"
        primary-key="id"
        @btns-event="handleOperation"
    />
</template>

<script setup>
import { ref, h } from 'vue';
import { ElMessage, ElTag } from 'element-plus';

const tableData = ref([
    { id: 1, name: '张三', age: 28, address: '北京市朝阳区', status: 1 },
    { id: 2, name: '李四', age: 32, address: '上海市浦东新区', status: 1 },
    { id: 3, name: '王五', age: 25, address: '深圳市南山区', status: 2 },
]);

const columns = ref([
    {
        prop: 'name',
        label: '姓名',
        type: 'text',
        use: ['table', 'filter', 'save', 'update'],
        required: true,
    },
    {
        prop: 'age',
        label: '年龄',
        type: 'text',
        use: ['table', 'filter', 'save', 'update'],
        required: true,
    },
    {
        prop: 'address',
        label: '地址',
        type: 'text',
        use: ['table', 'save', 'update'],
        required: true,
    },
    {
        prop: 'status',
        label: '状态',
        type: 'select',
        use: ['table', 'filter'],
        options: [
            { label: '在职', value: 1 },
            { label: '离职', value: 2 },
        ],
        render: (row) => {
            const statusMap = {
                1: { label: '在职', type: 'success' },
                2: { label: '离职', type: 'danger' },
            };
            const status = statusMap[row.status];
            return h(ElTag, { type: status.type }, () => status.label);
        },
    },
]);

const handleOperation = (type, row) => {
    ElMessage.info(`执行 ${type} 操作`);
};
</script>
```

## use 配置说明

`use` 数组用于标记字段在哪些场景下使用:

-   `table` - 在表格中显示
-   `filter` - 在筛选区显示
-   `save` - 在新增表单中显示
-   `update` - 在编辑表单中显示
-   `detail` - 在详情页显示
