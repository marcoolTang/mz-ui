# 基础示例

这是一个完整的组件库使用示例,展示了所有主要组件的使用方法。

<script setup>
import { ref, h } from 'vue'
import { ElMessage, ElTag } from 'element-plus'

const activeName = ref('table')

// 表格数据
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
  console.log('操作:', type, row)
}
</script>

<div style="background: #f5f7fa; padding: 20px; min-height: 100vh;">
  <div style="max-width: 1400px; margin: 0 auto;">
    <div style="text-align: center; margin-bottom: 40px; padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">
      <h1 style="margin: 0 0 10px 0; font-size: 32px; font-weight: 600;">MZ UI 组件库示例</h1>
      <p style="margin: 0; font-size: 16px; opacity: 0.9;">基于 Vue 3 + Element Plus 的企业级组件库</p>
    </div>
        <div style="padding: 20px; background: #fff; border-radius: 8px; min-height: 400px;">
          <h2 style="margin-top: 0; margin-bottom: 20px; color: #333; border-bottom: 2px solid #409eff; padding-bottom: 10px; font-size: 20px;">MzTableView 示例</h2>
          <mz-table-view 
            :columns="tableColumns" 
            :table-data="tableData" 
            :selection="true"
            :row-btns="['edit', 'delete']" 
            :page-total="50" 
            @operation-event="handleOperation" 
          />
        </div>
  </div>
</div>
