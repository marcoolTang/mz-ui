# Form 表单

Form 组件用于数据的新增和编辑，以弹窗形式展示表单，支持多种表单控件和验证规则。

## 基础用法

Form 组件通常作为 Container 组件的一部分使用：

```vue
<template>
  <container-view 
    :columns="config.columns"
    serviceName="user"
    :topBtns="topBtns"
    :rowBtns="rowBtns"
  />
</template>

<script setup>
const topBtns = [
  { type: 'save', label: '新增' }  // 点击会打开新增表单
]

const rowBtns = [
  { type: 'update', label: '编辑' }  // 点击会打开编辑表单
]
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| serviceName | 服务名称 | `String` | - |
| formLayout | 表单布局列数 | `Number` | `2` |

## 表单配置

表单配置通过 Container 的 columns 中 `use: ['save', 'update']` 的字段自动生成。

### 基础配置

```javascript
{
  prop: 'username',
  label: '用户名',
  use: ['save', 'update'],  // 在新增和编辑表单中显示
  type: 'input',
  required: true,
  placeholder: '请输入用户名',
  rules: [
    { min: 3, max: 20, message: '长度在 3 到 20 个字符' }
  ]
}
```

## 支持的表单控件

| 类型 | 说明 | 示例 |
|------|------|------|
| input | 输入框 | 姓名、手机号 |
| textarea | 文本域 | 备注、描述 |
| select | 下拉选择 | 状态、类型 |
| select-tree | 树形选择 | 分类、部门 |
| date | 日期选择 | 创建时间 |
| switch | 开关 | 启用/禁用 |
| file | 文件上传 | 附件、图片 |

## 表单验证

支持多种验证规则：

```javascript
{
  prop: 'email',
  label: '邮箱',
  use: ['save', 'update'],
  type: 'input',
  required: true,  // 必填
  rules: [
    { type: 'email', message: '请输入正确的邮箱' },
    { max: 50, message: '邮箱长度不能超过50个字符' }
  ]
}

{
  prop: 'phone',
  label: '手机号',
  use: ['save', 'update'],
  type: 'input',
  required: true,
  rules: [
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号'
    }
  ]
}

{
  prop: 'age',
  label: '年龄',
  use: ['save', 'update'],
  type: 'input',
  rules: [
    {
      validator: (rule, value, callback) => {
        if (value < 18) {
          callback(new Error('年龄必须大于18岁'))
        } else {
          callback()
        }
      }
    }
  ]
}
```

## 表单布局

通过 `formLayout` 控制表单列数：

```vue
<!-- 单列布局 -->
<container-view 
  :formLayout="1"
/>

<!-- 双列布局（默认） -->
<container-view 
  :formLayout="2"
/>

<!-- 三列布局 -->
<container-view 
  :formLayout="3"
/>
```

## 新增和编辑区别

可以通过 `use` 字段控制字段在新增或编辑时的显示：

```javascript
{
  prop: 'password',
  label: '密码',
  use: ['save'],  // 只在新增时显示
  type: 'input',
  required: true
}

{
  prop: 'id',
  label: 'ID',
  use: ['update'],  // 只在编辑时显示（通常用于只读展示）
  type: 'input',
  disabled: true
}

{
  prop: 'username',
  label: '用户名',
  use: ['save', 'update'],  // 新增和编辑都显示
  type: 'input',
  required: true
}
```

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|---------|
| submit-success | 表单提交成功 | - |

## 接口规范

### 新增接口

```
POST /api/{serviceName}/save
Content-Type: application/json

{
  "username": "张三",
  "phone": "13800138000",
  "status": 1
}
```

### 编辑接口

```
PUT /api/{serviceName}/update
Content-Type: application/json

{
  "id": 1,
  "username": "张三",
  "phone": "13800138000",
  "status": 1
}
```

## 完整示例

```javascript
export default {
  columns: [
    {
      items: [
        {
          prop: 'username',
          label: '用户名',
          use: ['table', 'save', 'update'],
          type: 'input',
          required: true,
          placeholder: '请输入用户名',
          rules: [
            { min: 3, max: 20, message: '长度在 3 到 20 个字符' }
          ]
        },
        {
          prop: 'password',
          label: '密码',
          use: ['save'],  // 只在新增时显示
          type: 'input',
          required: true,
          placeholder: '请输入密码',
          rules: [
            { min: 6, message: '密码至少6位' }
          ]
        },
        {
          prop: 'phone',
          label: '手机号',
          use: ['save', 'update'],
          type: 'input',
          required: true,
          rules: [
            { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
          ]
        },
        {
          prop: 'email',
          label: '邮箱',
          use: ['save', 'update'],
          type: 'input',
          rules: [
            { type: 'email', message: '邮箱格式不正确' }
          ]
        },
        {
          prop: 'department',
          label: '部门',
          use: ['save', 'update'],
          type: 'select-tree',
          required: true,
          serviceUrl: '/api/department/tree',
          optionValue: 'id',
          optionLabel: 'name'
        },
        {
          prop: 'status',
          label: '状态',
          use: ['save', 'update'],
          type: 'select',
          required: true,
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ]
        },
        {
          prop: 'remark',
          label: '备注',
          use: ['save', 'update'],
          type: 'textarea',
          rows: 4,
          maxLength: 200,
          showWordLimit: true
        }
      ]
    }
  ]
}
```

## 常见问题

### 1. 如何自定义表单宽度？

在 Container 组件中设置：
```vue
<container-view dialogWidth="800px" />
```

### 2. 如何设置字段只在新增或编辑时显示？

使用 `use` 字段：
- 只在新增: `use: ['save']`
- 只在编辑: `use: ['update']`
- 都显示: `use: ['save', 'update']`

### 3. 如何实现自定义验证？

使用 validator 函数：
```javascript
rules: [
  {
    validator: (rule, value, callback) => {
      if (condition) {
        callback(new Error('错误信息'))
      } else {
        callback()
      }
    }
  }
]
```

### 4. 如何获取表单数据？

表单提交时会自动调用接口，无需手动获取数据。

### 5. 如何处理级联选择？

使用表单联动，监听字段变化更新其他字段的选项。

## 下一步

- 📖 查看 [Container 组件](/components/container)
- 📖 查看 [配置说明](/guide/configuration)
- 💡 参考 [复杂表单示例](/examples/complex-form)
