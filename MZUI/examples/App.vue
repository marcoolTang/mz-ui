<template>
  <div id="app">
    <div class="header">
      <h1>MZ UI 组件库示例</h1>
      <p>基于 Vue 3 + Element Plus 的企业级组件库</p>
    </div>

    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="表格组件" name="table">
        <div class="demo-section">
          <h2>MzTableView 示例</h2>
          <mz-table-view :columns="tableColumns" :table-data="tableData" :selection="true"
            :row-btns="['edit', 'delete']" :page-total="50" @operation-event="handleOperation" />
        </div>
      </el-tab-pane>

      <el-tab-pane label="表单组件" name="form">
        <div class="demo-section">
          <h2>MzFormControl 示例</h2>
          <mz-form-control ref="formControlRef" />
          <div style="margin-top: 20px;">
            <el-button type="primary" @click="initForm">初始化表单</el-button>
            <el-button @click="submitForm">提交表单</el-button>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="搜索树" name="tree">
        <div class="demo-section">
          <h2>MzSearchTree 示例</h2>
          <mz-search-tree :tree-data="treeData" node-key="id" search-placeholder="搜索节点"
            @tree-select-change="handleTreeSelect" />
        </div>
      </el-tab-pane>

      <el-tab-pane label="综合表格" name="container">
        <div class="demo-section">
          <h2>MzContainer 示例</h2>
          <!-- ✅ 正确的使用方式 -->
          <mz-container-view :columns="config.columns" :row-btns="rowBtns" :top-btns="topBtns" :table-data="tableData"
            :page-total="50" primary-key="id" @btns-event="handleContainerOperation" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const activeName = ref('table')
import { h } from 'vue';
import { ElTag } from 'element-plus';
const formControlRef = ref(null)
// 表格数据
const tableColumns = ref([
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
    use: ['table'],
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

],)

const tableData = ref([
  { id: 1, name: '张三', age: 28, address: '北京市朝阳区', status: 1 },
  { id: 2, name: '李四', age: 32, address: '上海市浦东新区', status: 1 },
  { id: 3, name: '王五', age: 25, address: '深圳市南山区', status: 2 }
])

// 表单配置
const formColumns = [
  {
    label: '用户名',
    prop: 'username',
    type: 'text',
    required: true,
    validatorMessage: '请输入用户名'
  },
  {
    label: '邮箱',
    prop: 'email',
    type: 'text',
    required: true,
    validatorMessage: '请输入邮箱'
  },
  {
    label: '角色',
    prop: 'role',
    type: 'select',
    required: true,
    options: [
      { label: '管理员', value: 'admin' },
      { label: '普通用户', value: 'user' }
    ]
  },
  {
    label: '状态',
    prop: 'status',
    type: 'select',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  }
]
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

const topBtns = ['save']
const rowBtns = ['update', 'delete']
// 初始化表单
const initForm = () => {
  if (formControlRef.value) {
    formControlRef.value.setFormData({
      type: 'save', // 或 'update'
      data: null, // 如果是编辑,传入数据
      columns: formColumns,
      primaryKey: 'id'
    })
    ElMessage.success('表单已初始化')
  }
}

// 提交表单
const submitForm = async () => {
  if (formControlRef.value) {
    const formData = await formControlRef.value.validateForm()
    if (formData) {
      console.log('表单数据:', formData)
      ElMessage.success('表单验证通过!')
    } else {
      ElMessage.error('表单验证失败')
    }
  }
}
// 树数据
const treeData = ref([
  {
    id: 1,
    label: '一级节点',
    children: [
      { id: 2, label: '二级节点 1' },
      { id: 3, label: '二级节点 2' }
    ]
  }
])

// 事件处理
const handleOperation = (type: string, row: any) => {
  console.log('操作类型:', type, '行数据:', row)
}

const handleContainerOperation = (type: string, row: any, parentData: any) => {
  console.log('容器操作:', { type, row, parentData })
  ElMessage.info(`执行 ${type} 操作`)
}


const handleTreeSelect = (node: any) => {
  console.log('点击节点:', node)
}
</script>

<style scoped>
#app {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
}

.header h1 {
  margin: 0 0 10px 0;
  font-size: 32px;
}

.header p {
  margin: 0;
  font-size: 16px;
  opacity: 0.9;
}

.demo-section {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.demo-section h2 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #409eff;
  padding-bottom: 10px;
}

.demo-tabs {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>
