# 表格组件示例

MzTableView 是一个功能强大的表格组件,支持分页、筛选、自定义渲染等功能。

<script setup>
import { ref, h,onMounted } from 'vue'
import { ElMessage, ElTag } from 'element-plus'
const isClient = ref(false)
onMounted(() => {
  isClient.value = true
})
const tableColumns = ref([
  {
    prop: 'name',
    label: '姓名',
    type: 'text',
    width: 120,
  },
  {
    prop: 'age',
    label: '年龄',
    type: 'text',
    width: 100,
  },
  {
    prop: 'address',
    label: '地址',
    type: 'text',
    width: 200,
  },
  {
    prop: 'status',
    label: '状态',
    type: 'text',
    width: 120,
    render: (row) => {
      const statusMap = {
        1: { label: '在职', type: 'success' },
        2: { label: '离职', type: 'danger' },
      }
      const status = statusMap[row.status] || { label: '未知', type: 'info' }
      return h(ElTag, { type: status.type, size: 'default' }, () => status.label)
    },
  },
])

const tableData = ref([
  { id: 1, name: '张三', age: 28, address: '北京市朝阳区', status: 1 },
  { id: 2, name: '李四', age: 32, address: '上海市浦东新区', status: 1 },
  { id: 3, name: '王五', age: 25, address: '深圳市南山区', status: 2 }
])

const handleOperation = (type, row) => {
  ElMessage.info(`执行 ${type} 操作`)
  console.log('操作类型:', type, '行数据:', row)
}
</script>

<div v-if="isClient" style="padding: 20px; background: #fff; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); min-height: 500px;">
  <mz-table-view 
    :columns="tableColumns" 
    :table-data="tableData" 
    :selection="true"
    :row-btns="['edit', 'delete']" 
    :page-total="50" 
    @operation-event="handleOperation" 
  />
</div>

## 代码示例

```vue
<template>
    <mz-table-view :columns="tableColumns" :table-data="tableData" :selection="true" :row-btns="['edit', 'delete']" :page-total="50" @operation-event="handleOperation" />
</template>

<script setup>
import { ref, h } from 'vue';
import { ElTag } from 'element-plus';

const tableColumns = ref([
    { prop: 'name', label: '姓名', type: 'text', width: 120 },
    { prop: 'age', label: '年龄', type: 'text', width: 100 },
    { prop: 'address', label: '地址', type: 'text', width: 200 },
    {
        prop: 'status',
        label: '状态',
        type: 'text',
        width: 120,
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

const tableData = ref([
    { id: 1, name: '张三', age: 28, address: '北京市朝阳区', status: 1 },
    { id: 2, name: '李四', age: 32, address: '上海市浦东新区', status: 1 },
    { id: 3, name: '王五', age: 25, address: '深圳市南山区', status: 2 },
]);

const handleOperation = (type, row) => {
    console.log('操作:', type, row);
};
</script>
```
