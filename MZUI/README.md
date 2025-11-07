# MZ UI 组件库

一个基于 Vue 3 + Element Plus 的企业级组件库，提供了丰富的业务组件，帮助快速构建企业级应用。

## ✨ 特性

-   🚀 基于 Vue 3 Composition API
-   💎 集成 Element Plus，UI 统一美观
-   📦 开箱即用的业务组件
-   🎯 TypeScript 支持
-   🌍 支持按需引入
-   📱 响应式设计

## 📦 安装

```bash
npm install ezmui
# 或
yarn add ezmui
# 或
pnpm add ezmui
```

## 🔨 使用

### 完整引入

```typescript
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import MzUI from 'ezmui';
import 'ezmui/dist/style.css';
import App from './App.vue';

const app = createApp(App);
app.use(ElementPlus);
app.use(MzUI);
app.mount('#app');
```

### 按需引入

```typescript
import { MzTableView, MzFormControl } from 'ezmui';
import 'ezmui/dist/style.css';
```

## 📚 组件列表

### MzTableView - 表格视图组件

强大的表格组件，支持多种列类型、分页、筛选、排序等功能。

```vue
<template>
    <mz-table-view :columns="columns" :table-data="data" :selection="true" :row-btns="['edit', 'delete']" :page-total="100" @operation-event="handleOperation" />
</template>

<script setup>
const columns = [
    { label: '姓名', prop: 'name', type: 'text' },
    { label: '年龄', prop: 'age', type: 'text' },
    { label: '状态', prop: 'status', type: 'tag' },
];

const data = [{ name: '张三', age: 28, status: '在职' }];

const handleOperation = (type, row) => {
    console.log(type, row);
};
</script>
```

### MzFormControl - 表单控件组件

灵活的表单组件，支持多种表单项类型。

```vue
<template>
    <mz-form-control :form-data="formData" :form-values="formValues" @value-change="handleChange" />
</template>

<script setup>
const formData = [
  { label: '用户名', prop: 'username', type: 'input', required: true },
  { label: '角色', prop: 'role', type: 'select', options: [...] }
]

const formValues = ref({ username: '', role: '' })

const handleChange = (data) => {
  console.log(data)
}
</script>
```

### MzContainerView - 容器视图组件

提供统一的容器布局，支持顶部操作按钮和内容区域。

### MzDetailView - 详情视图组件

用于展示详细信息的组件。

### MzFilterView - 筛选视图组件

提供筛选功能的组件。

### MzFormView - 表单视图组件

完整的表单视图解决方案。

### MzSearchTree - 搜索树组件

带搜索功能的树形组件。

### MzIcons - 图标组件

统一的图标组件。

## 🛠️ 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建组件库
npm run build

# 预览构建结果
npm run preview
```

## 📝 目录结构

```
mz-ui/
├── src/                    # 源代码
│   ├── components/         # 组件
│   │   ├── table-view/    # 表格组件
│   │   ├── form-control/  # 表单控件
│   │   ├── container-view/# 容器组件
│   │   ├── detail-view/   # 详情组件
│   │   ├── filter-view/   # 筛选组件
│   │   ├── form-view/     # 表单视图
│   │   ├── search-tree/   # 搜索树
│   │   ├── icons/         # 图标
│   │   └── utils/         # 工具函数
│   └── index.ts           # 入口文件
├── examples/              # 示例代码
├── dist/                  # 构建输出
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🤝 依赖

-   Vue 3.x
-   Element Plus 2.x
-   Axios

## 📄 License

MIT License

## 👨‍💻 作者

Marco Tang

---

如有问题或建议，欢迎提交 Issue 或 PR！
