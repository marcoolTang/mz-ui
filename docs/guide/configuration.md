# 配置说明

本节详细介绍 MZ-UI 的配置规范和最佳实践。

## Columns 配置详解

Columns 是整个组件库的核心配置，理解它的工作原理非常重要。

### 配置结构

```javascript
export default {
  columns: [              // 顶层数组
    {                     // 分组对象
      items: [            // 字段配置数组
        {
          // 字段配置
        }
      ]
    }
  ]
}
```

### 必填字段

每个字段配置必须包含以下属性：

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `prop` | String | 字段名（唯一标识） | `'username'` |
| `label` | String | 显示标签 | `'用户名'` |
| `use` | Array | 使用场景 | `['table', 'filter']` |
| `type` | String | 组件类型 | `'input'` |

### Use 场景详解

#### table - 表格列

```javascript
{
  prop: 'username',
  label: '用户名',
  use: ['table'],
  type: 'input',
  
  // 表格专用配置
  width: 150,              // 列宽
  fixed: 'left',          // 固定列：left / right
  sortable: true,         // 是否可排序
  customRender: (text, record) => {  // 自定义渲染
    return text || '--'
  }
}
```

#### filter - 筛选条件

```javascript
{
  prop: 'status',
  label: '状态',
  use: ['filter'],
  type: 'select',
  
  // 筛选专用配置
  placeholder: '请选择状态',
  multiple: true,          // 多选
  transform: (val) => {    // 数据转换
    return { statusId: val }
  }
}
```

#### save/update - 表单字段

```javascript
{
  prop: 'email',
  label: '邮箱',
  use: ['save', 'update'],
  type: 'input',
  
  // 表单专用配置
  required: true,                    // 必填
  placeholder: '请输入邮箱',
  disabled: false,                   // 禁用
  rules: [                           // 验证规则
    { type: 'email', message: '邮箱格式不正确' }
  ]
}
```

#### detail - 详情展示

```javascript
{
  prop: 'createTime',
  label: '创建时间',
  use: ['detail'],
  type: 'date',
  formatType: 'datetime'
}
```

### Type 类型配置

#### input - 输入框

```javascript
{
  prop: 'name',
  label: '姓名',
  type: 'input',
  placeholder: '请输入姓名',
  maxLength: 50,           // 最大长度
  showWordLimit: true      // 显示字数统计
}
```

#### textarea - 文本域

```javascript
{
  prop: 'remark',
  label: '备注',
  type: 'textarea',
  rows: 4,                 // 行数
  maxLength: 200,
  showWordLimit: true
}
```

#### select - 下拉选择

```javascript
{
  prop: 'status',
  label: '状态',
  type: 'select',
  options: [               // 静态选项
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 }
  ],
  multiple: false,         // 是否多选
  clearable: true          // 是否可清空
}
```

#### select-tree - 树形选择

```javascript
{
  prop: 'department',
  label: '部门',
  type: 'select-tree',
  serviceUrl: '/api/department/tree',  // 异步加载
  optionValue: 'id',                   // 选项值字段
  optionLabel: 'name',                 // 选项标签字段
  multiple: true,                      // 多选
  checkStrictly: false                 // 父子关联
}
```

#### date - 日期选择

```javascript
{
  prop: 'createTime',
  label: '创建时间',
  type: 'date',
  formatType: 'datetime',  // date / datetime / time
  valueFormat: 'YYYY-MM-DD HH:mm:ss'
}
```

#### date-range - 日期范围

```javascript
{
  prop: 'dateRange',
  label: '时间范围',
  type: 'date-range',
  transform: (val) => ({
    startTime: val[0] + ' 00:00:00',
    endTime: val[1] + ' 23:59:59'
  })
}
```

#### switch - 开关

```javascript
{
  prop: 'isActive',
  label: '是否启用',
  type: 'switch',
  activeValue: 1,          // 激活值
  inactiveValue: 0         // 非激活值
}
```

#### file - 文件上传

```javascript
{
  prop: 'avatar',
  label: '头像',
  type: 'file',
  accept: 'image/*',       // 接受的文件类型
  maxSize: 2,              // 最大大小（MB）
  limit: 1                 // 最大数量
}
```

### Transform 数据转换

Transform 用于将前端表单数据转换为后端接口需要的格式。

#### 数组转字符串

```javascript
{
  prop: 'tags',
  type: 'select',
  multiple: true,
  // [1, 2, 3] => "1,2,3"
  transform: (val) => {
    if (Array.isArray(val) && val.length > 0) {
      return { tagIds: val.join(',') }
    }
    return {}
  }
}
```

#### 日期范围转换

```javascript
{
  prop: 'dateRange',
  type: 'date-range',
  // ['2024-01-01', '2024-01-31'] => { startTime, endTime }
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

#### 布尔值转数字

```javascript
{
  prop: 'isActive',
  type: 'switch',
  // true => 1, false => 0
  transform: (val) => {
    return { status: val ? 1 : 0 }
  }
}
```

#### 对象转ID

```javascript
{
  prop: 'user',
  type: 'select',
  // { id: 1, name: '张三' } => 1
  transform: (val) => {
    return { userId: val?.id }
  }
}
```

### 异步数据加载

#### 基础用法

```javascript
{
  prop: 'category',
  label: '分类',
  type: 'select-tree',
  serviceUrl: '/api/category/tree'  // 自动请求
}
```

#### 带过滤的异步加载

```javascript
{
  prop: 'category',
  type: 'select-tree',
  serviceUrl: '/api/category/tree',
  // 对返回数据进行过滤
  filter: (response) => {
    // 只显示启用的分类
    return response.data.filter(item => item.status === 1)
  }
}
```

#### 接口返回格式要求

```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "name": "分类1",
      "children": [
        { "id": 11, "name": "子分类1" }
      ]
    }
  ]
}
```

### 自定义渲染

#### customRender

```javascript
{
  prop: 'amount',
  label: '金额',
  use: ['table'],
  customRender: (text, record, index) => {
    if (!text) return '--'
    return '¥' + text.toFixed(2)
  }
}
```

#### filter-text 类型

```javascript
{
  prop: 'status',
  label: '状态',
  use: ['table'],
  type: 'filter-text',
  filter: (data) => {
    const map = {
      1: '<span style="color: green">启用</span>',
      0: '<span style="color: red">禁用</span>'
    }
    return map[data.status] || '--'
  }
}
```

## 按钮配置

### 顶部按钮

```javascript
const topBtns = [
  {
    type: 'save',        // 按钮类型
    label: '新增',       // 按钮文字
    icon: 'Plus',       // 图标（可选）
    disabled: false     // 是否禁用（可选）
  },
  {
    type: 'import',
    label: '导入'
  },
  {
    type: 'export',
    label: '导出'
  }
]
```

### 行操作按钮

```javascript
const rowBtns = [
  {
    type: 'update',
    label: '编辑'
  },
  {
    type: 'detail',
    label: '详情'
  },
  {
    type: 'delete',
    label: '删除',
    confirm: true       // 是否显示确认提示（可选）
  }
]
```

### 条件显示按钮

```javascript
const rowBtns = [
  {
    type: 'update',
    label: '编辑',
    show: (row) => row.status === 0  // 只有禁用状态才显示
  },
  {
    type: 'delete',
    label: '删除',
    disabled: (row) => row.hasChildren  // 有子项时禁用
  }
]
```

## 完整配置示例

```javascript
export default {
  columns: [
    {
      items: [
        {
          prop: 'id',
          label: 'ID',
          use: ['table'],
          type: 'input',
          width: 80,
          fixed: 'left'
        },
        {
          prop: 'username',
          label: '用户名',
          use: ['table', 'filter', 'save', 'update'],
          type: 'input',
          required: true,
          placeholder: '请输入用户名',
          rules: [
            { min: 3, max: 20, message: '长度在 3 到 20 个字符' }
          ]
        },
        {
          prop: 'phone',
          label: '手机号',
          use: ['table', 'save', 'update'],
          type: 'input',
          required: true,
          rules: [
            { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
          ]
        },
        {
          prop: 'department',
          label: '部门',
          use: ['filter', 'save', 'update'],
          type: 'select-tree',
          serviceUrl: '/api/department/tree',
          optionValue: 'id',
          optionLabel: 'name',
          multiple: true,
          required: true,
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
          use: ['table', 'filter', 'save', 'update'],
          type: 'select',
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ],
          required: true,
          customRender: (text) => {
            return text === 1 
              ? '<span style="color: green">启用</span>' 
              : '<span style="color: red">禁用</span>'
          }
        },
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
        {
          prop: 'createTime',
          label: '创建时间',
          use: ['table', 'detail'],
          type: 'date',
          formatType: 'datetime',
          width: 180
        },
        {
          prop: 'remark',
          label: '备注',
          use: ['save', 'update', 'detail'],
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

## 最佳实践

### 1. 字段命名规范

```javascript
// ✅ 推荐：使用驼峰命名
prop: 'userName'
prop: 'createTime'

// ❌ 不推荐：使用下划线
prop: 'user_name'
prop: 'create_time'
```

### 2. 合理使用 use

```javascript
// ✅ 推荐：根据实际需求选择
{
  prop: 'id',
  use: ['table']  // ID 只在表格显示
}

{
  prop: 'password',
  use: ['save']   // 密码只在新增时显示
}

// ❌ 不推荐：所有字段都用全场景
{
  prop: 'id',
  use: ['table', 'filter', 'save', 'update', 'detail']  // 过度使用
}
```

### 3. 异步数据优化

```javascript
// ✅ 推荐：使用 Promise.all 并行加载
// 已内置，无需手动处理

// ✅ 推荐：添加错误处理
{
  serviceUrl: '/api/category/tree',
  filter: (response) => {
    return response?.data || []
  }
}
```

### 4. Transform 规范

```javascript
// ✅ 推荐：返回对象，支持多字段
transform: (val) => {
  return {
    startTime: val[0],
    endTime: val[1]
  }
}

// ✅ 推荐：处理空值情况
transform: (val) => {
  if (!val || val.length === 0) {
    return {}
  }
  return { fieldName: val.join(',') }
}

// ❌ 不推荐：直接返回值
transform: (val) => val.join(',')
```

### 5. 表单验证

```javascript
// ✅ 推荐：使用 rules 数组
{
  prop: 'email',
  required: true,
  rules: [
    { type: 'email', message: '邮箱格式不正确' },
    { max: 50, message: '邮箱长度不能超过50个字符' }
  ]
}

// ✅ 推荐：自定义验证
{
  prop: 'phone',
  required: true,
  rules: [
    {
      validator: (rule, value, callback) => {
        if (!/^1[3-9]\d{9}$/.test(value)) {
          callback(new Error('手机号格式不正确'))
        } else {
          callback()
        }
      }
    }
  ]
}
```

## 常见错误

### 1. 忘记配置 use

```javascript
// ❌ 错误：缺少 use 字段
{
  prop: 'name',
  label: '姓名',
  type: 'input'
}

// ✅ 正确
{
  prop: 'name',
  label: '姓名',
  use: ['table', 'filter'],
  type: 'input'
}
```

### 2. Transform 返回格式错误

```javascript
// ❌ 错误：返回字符串
transform: (val) => val.join(',')

// ✅ 正确：返回对象
transform: (val) => ({ fieldName: val.join(',') })
```

### 3. 异步选项配置不完整

```javascript
// ❌ 错误：缺少 optionValue 和 optionLabel
{
  type: 'select-tree',
  serviceUrl: '/api/category/tree'
}

// ✅ 正确
{
  type: 'select-tree',
  serviceUrl: '/api/category/tree',
  optionValue: 'id',
  optionLabel: 'name'
}
```

## 下一步

- 📖 查看 [Container 组件文档](/components/container)
- 💡 参考 [完整示例](/examples/basic)
