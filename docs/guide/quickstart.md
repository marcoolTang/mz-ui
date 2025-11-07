# 快速开始

本节将介绍如何在项目中快速上手使用 MZ-UI。

## 安装

### 环境要求

-   Node.js >= 16
-   Vue >= 3.2
-   Element Plus >= 2.0

### NPM 安装

```bash
npm install ezmui
```

### 本地引入

如果你的项目是直接复制组件代码的方式，确保目录结构如下：

```
src/
├── components/
│   ├── mz-ui/
│   │   ├── container-view/
│   │   ├── filter-view/
│   │   ├── table-view/
│   │   ├── form-view/
│   │   ├── detail-view/
│   │   └── form-control/
```

## 全局注册

在 `main.js` 中全局注册组件：

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// 引入 MZ-UI 组件
import MzUI from 'ezmui';

const app = createApp(App);

app.use(ElementPlus);
app.use(MzUI);
// 全局注册

app.mount('#app');
```

## 按需引入

推荐使用按需引入的方式：

```vue
<script setup>
import { MzContainerView } from 'ezmui';
</script>

<template>
    <mz-container-view />
</template>
```

## 自动导入（推荐）

1. 安装依赖

```bash
npm install -D unplugin-vue-components unplugin-auto-import
```

2. 修改 vite.config.js

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';

// 自定义 MZ-UI 自动导入解析器
const MzResolver = (name) => {
    if (name.startsWith('Mz')) {
        return { importName: name, path: 'ezmui' };
    }
};

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: ['vue', 'vue-router'],
            dts: 'src/auto-imports.d.ts',
        }),
        Components({
            resolvers: [MzResolver],
            dts: 'src/components.d.ts',
        }),
    ],
});
```

3. 使用组件
   配置完成后，无需引入组件即可直接使用：

```vue
<template>
    <mz-container-view />
</template>
```

## 第一个示例

### 1. 创建配置文件

创建 `config.js`：

```javascript
export default {
    columns: [
        {
            items: [
                {
                    prop: 'name',
                    label: '用户名',
                    use: ['table', 'filter', 'save', 'update'],
                    type: 'input',
                    required: true,
                },
                {
                    prop: 'phone',
                    label: '手机号',
                    use: ['table', 'save', 'update'],
                    type: 'input',
                },
                {
                    prop: 'status',
                    label: '状态',
                    use: ['table', 'filter', 'save', 'update'],
                    type: 'select',
                    options: [
                        { label: '启用', value: 1 },
                        { label: '禁用', value: 0 },
                    ],
                },
                {
                    prop: 'createTime',
                    label: '创建时间',
                    use: ['table'],
                    type: 'date',
                    formatType: 'datetime',
                },
            ],
        },
    ],
};
```

### 2. 创建页面组件

创建 `UserList.vue`：

```vue
<template>
    <mz-container-view :columns="config.columns" serviceName="user" primaryKey="userId" :topBtns="topBtns" :rowBtns="rowBtns" />
</template>

<script setup>
import { ref } from 'vue';
import { MzContainerView } from 'ezmui';
import config from './config';

// 顶部按钮配置
const topBtns = ref([{ type: 'save', label: '新增用户' }]);

// 行操作按钮配置
const rowBtns = ref([
    { type: 'update', label: '编辑' },
    { type: 'delete', label: '删除' },
]);
</script>
```

### 3. 配置路由

在 `router/index.js` 中添加路由：

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import UserList from '@/views/user/UserList.vue';

const routes = [
    {
        path: '/user/list',
        name: 'UserList',
        component: UserList,
        meta: {
            id: 'USER_LIST', // 页面权限标识
            title: '用户管理',
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
```

### 4. 配置接口

确保你的后端接口支持以下规范：

**列表接口**：

```
GET /api/user/page?current=1&size=10&name=xxx
```

响应格式：

```json
{
  "code": 200,
  "data": {
    "data": [...],
    "total": 100
  }
}
```

**新增接口**：

```
POST /api/user/save
```

**编辑接口**：

```
POST /api/user/update
```

**删除接口**：

```
DELETE /api/user/delete?userId=1
```

## 完成！

现在访问 `/user/list`，你将看到一个完整的用户管理页面，包含：

✅ 筛选功能（用户名、状态）  
✅ 数据表格（展示所有字段）  
✅ 分页功能  
✅ 新增用户（弹窗表单）  
✅ 编辑用户（弹窗表单）  
✅ 删除用户（确认提示）

## 下一步

-   📖 查看 [Container 组件文档](/components/container)
-   🎨 了解 [配置说明](/guide/configuration)
-   💡 参考 [完整示例](/examples/basic)

## 常见问题

### 1. 组件找不到？

确保已正确引入和注册组件。检查路径是否正确。

### 2. 样式不生效？

确保引入了 Element Plus 的样式文件：

```javascript
import 'element-plus/dist/index.css';
```

### 3. 接口请求失败？

检查 `http` 工具是否正确配置，确保接口地址和格式正确。

### 4. 页面空白？

打开浏览器控制台查看错误信息，通常是配置问题或接口问题。
