# 快速开始

## 📥 安装

### 使用 npm
```bash
npm install @mzui/components element-plus
```

### 使用 yarn
```bash
yarn add @mzui/components element-plus
```

### 使用 pnpm
```bash
pnpm add @mzui/components element-plus
```

## 🚀 使用方式

### 方式一：完整引入（推荐用于小型项目）

```typescript
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import MzUI from '@mzui/components'
import '@mzui/components/dist/style.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(MzUI)
app.mount('#app')
```

然后在组件中使用：
```vue
<template>
  <mz-table-view
    :columns="columns"
    :table-data="data"
  />
</template>
```

### 方式二：按需引入（推荐用于大型项目）

```vue
<template>
  <mz-table-view
    :columns="columns"
    :table-data="data"
  />
  <mz-form-control
    :form-data="formData"
    :form-values="formValues"
  />
</template>

<script setup>
import { MzTableView, MzFormControl } from '@mzui/components'
import '@mzui/components/dist/style.css'

const columns = [...]
const data = [...]
</script>
```

## 📦 可用组件

### MzTableView - 表格组件
```vue
<mz-table-view
  :columns="columns"
  :table-data="tableData"
  :selection="true"
  :row-btns="['edit', 'delete']"
  :page-total="100"
  @operation-event="handleOperation"
/>
```

**Props:**
- `columns` (Array): 列配置
- `tableData` (Array): 表格数据
- `selection` (Boolean): 是否显示多选框
- `rowBtns` (Array): 行操作按钮
- `pageTotal` (Number): 总条数
- `noPage` (Boolean): 是否隐藏分页

**Events:**
- `operation-event`: 操作按钮点击事件
- `selection-change`: 选中项变化事件

### MzFormControl - 表单控件
```vue
<mz-form-control
  :form-data="formData"
  :form-values="formValues"
  @value-change="handleChange"
/>
```

**Props:**
- `formData` (Array): 表单配置
- `formValues` (Object): 表单值

**Events:**
- `value-change`: 表单值变化事件

### MzContainerView - 容器组件
```vue
<mz-container-view
  title="页面标题"
  :top-btns="['add', 'export']"
  @btn-click="handleBtnClick"
>
  <template #default>
    <!-- 内容区域 -->
  </template>
</mz-container-view>
```

### MzDetailView - 详情组件
```vue
<mz-detail-view
  :data="detailData"
  :config="config"
/>
```

### MzFilterView - 筛选组件
```vue
<mz-filter-view
  :filters="filters"
  @filter-change="handleFilterChange"
/>
```

### MzSearchTree - 搜索树组件
```vue
<mz-search-tree
  :tree-data="treeData"
  :default-expanded-keys="['1']"
  @node-click="handleNodeClick"
/>
```

### MzIcons - 图标组件
```vue
<mz-icons icon="edit" />
<mz-icons icon="delete" />
<mz-icons icon="search" />
```

## 🎨 完整示例

```vue
<template>
  <div class="app">
    <mz-container-view
      title="用户管理"
      :top-btns="['add']"
      @btn-click="handleTopBtn"
    >
      <!-- 筛选区域 -->
      <mz-filter-view
        :filters="filterConfig"
        @filter-change="handleFilter"
      />

      <!-- 表格 -->
      <mz-table-view
        :columns="columns"
        :table-data="tableData"
        :selection="true"
        :row-btns="['edit', 'delete']"
        :page-total="total"
        @operation-event="handleOperation"
      />
    </mz-container-view>

    <!-- 表单弹窗 -->
    <el-dialog v-model="dialogVisible" title="用户信息">
      <mz-form-control
        :form-data="formData"
        :form-values="formValues"
        @value-change="handleFormChange"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  MzContainerView,
  MzFilterView,
  MzTableView,
  MzFormControl
} from '@mzui/components'

// 筛选配置
const filterConfig = ref([
  { label: '用户名', prop: 'username', type: 'input' },
  { label: '状态', prop: 'status', type: 'select', options: [...] }
])

// 表格列配置
const columns = ref([
  { label: 'ID', prop: 'id', type: 'text' },
  { label: '用户名', prop: 'username', type: 'text' },
  { label: '邮箱', prop: 'email', type: 'text' },
  { label: '状态', prop: 'status', type: 'tag' },
  { label: '创建时间', prop: 'createTime', type: 'date' }
])

// 表格数据
const tableData = ref([])
const total = ref(0)

// 表单配置
const formData = ref([
  { label: '用户名', prop: 'username', type: 'input', required: true },
  { label: '邮箱', prop: 'email', type: 'input', required: true },
  { label: '角色', prop: 'role', type: 'select', options: [...] }
])

const formValues = ref({})
const dialogVisible = ref(false)

// 事件处理
const handleTopBtn = (type) => {
  if (type === 'add') {
    dialogVisible.value = true
  }
}

const handleFilter = (filters) => {
  // 处理筛选
  console.log('筛选条件:', filters)
}

const handleOperation = (type, row) => {
  if (type === 'edit') {
    formValues.value = { ...row }
    dialogVisible.value = true
  } else if (type === 'delete') {
    // 删除逻辑
  }
}

const handleFormChange = (data) => {
  formValues.value = data
}
</script>
```

## 🔧 TypeScript 支持

组件库完整支持 TypeScript：

```typescript
import type { MzTableColumn } from '@mzui/components'

const columns: MzTableColumn[] = [
  { label: '姓名', prop: 'name', type: 'text' }
]
```

## 🎯 工具函数

```typescript
import {
  formatTimestamp,
  formatTimestampYMD,
  arrayToTree,
  eventBus
} from '@mzui/components'

// 格式化时间戳
const time = formatTimestamp(Date.now())

// 数组转树
const tree = arrayToTree(arr, 0, 'id')

// 事件总线
eventBus.on('event', handler)
eventBus.emit('event', data)
```

## ❓ 常见问题

### 1. 样式没有生效？
确保引入了样式文件：
```typescript
import '@mzui/components/dist/style.css'
import 'element-plus/dist/index.css'
```

### 2. 组件提示未注册？
检查是否正确安装和引入：
```bash
npm list @mzui/components
```

### 3. TypeScript 类型错误？
确保安装了类型定义，并在 `tsconfig.json` 中配置：
```json
{
  "compilerOptions": {
    "types": ["@mzui/components"]
  }
}
```

## 📚 更多文档

- [完整 API 文档](./README.md)
- [开发指南](./DEVELOPMENT.md)
- [发布指南](./PUBLISH.md)

## 💡 提示

- 推荐使用 Vue 3.3+ 和 Element Plus 2.4+
- 组件依赖 Element Plus，使用前请确保已安装
- 支持 Tree Shaking，按需引入可以减小打包体积

---

开始使用 MZ UI 构建你的应用吧！ 🚀
