# 表单组件示例

MzFormControl 是一个强大的表单控制组件,支持多种表单项类型和验证。

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const formRef = ref(null)

const formColumns = [
  {
    label: '用户名',
    prop: 'username',
    type: 'input',
    required: true,
    validatorMessage: '请输入用户名'
  },
  {
    label: '邮箱',
    prop: 'email',
    type: 'input',
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

const initForm = () => {
  if (formRef.value) {
    formRef.value.setFormData({
      type: 'save',
      data: null,
      columns: formColumns,
      primaryKey: 'id'
    })
    ElMessage.success('表单已初始化')
  }
}

const submitForm = async () => {
  if (formRef.value) {
    const formData = await formRef.value.validateForm()
    if (formData) {
      console.log('表单数据:', formData)
      ElMessage.success('表单验证通过!')
    } else {
      ElMessage.error('表单验证失败')
    }
  }
}
</script>

<div style="padding: 20px; background: #fff; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
  <mz-form-control ref="formRef" />
  <div style="margin-top: 20px; display: flex; gap: 10px;">
    <el-button type="primary" @click="initForm">初始化表单</el-button>
    <el-button @click="submitForm">提交表单</el-button>
  </div>
</div>

## 代码示例

```vue
<template>
  <div>
    <mz-form-control ref="formRef" />
    <el-button type="primary" @click="initForm">初始化表单</el-button>
    <el-button @click="submitForm">提交表单</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const formRef = ref(null)

const formColumns = [
  {
    label: '用户名',
    prop: 'username',
    type: 'input',
    required: true,
    validatorMessage: '请输入用户名'
  },
  {
    label: '邮箱',
    prop: 'email',
    type: 'input',
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
  }
]

const initForm = () => {
  formRef.value.setFormData({
    type: 'save',
    data: null,
    columns: formColumns,
    primaryKey: 'id'
  })
}

const submitForm = async () => {
  const formData = await formRef.value.validateForm()
  if (formData) {
    console.log('表单数据:', formData)
    ElMessage.success('验证通过!')
  }
}
</script>
```
