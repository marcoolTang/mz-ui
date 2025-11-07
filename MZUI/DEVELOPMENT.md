# 开发指南

## 🛠️ 本地开发

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:5173 查看组件示例

### 构建组件库
```bash
npm run build
```

构建产物将输出到 `dist/` 目录

### 预览构建结果
```bash
npm run preview
```

## 📁 项目结构

```
mz-ui/
├── src/                          # 源代码
│   ├── components/              # 组件目录
│   │   ├── table-view/         # 表格组件
│   │   │   ├── components/     # 子组件
│   │   │   ├── index.vue       # 主组件
│   │   │   ├── index.js        # 辅助函数
│   │   │   └── index.css       # 样式
│   │   ├── form-control/       # 表单控件
│   │   ├── container-view/     # 容器视图
│   │   ├── detail-view/        # 详情视图
│   │   ├── filter-view/        # 筛选视图
│   │   ├── form-view/          # 表单视图
│   │   ├── search-tree/        # 搜索树
│   │   ├── icons/              # 图标组件
│   │   ├── utils/              # 工具函数
│   │   └── static-dictionary.js # 静态字典
│   ├── index.ts                 # 入口文件
│   ├── vite-env.d.ts           # Vite 环境类型
│   └── global.d.ts             # 全局类型声明
├── examples/                    # 示例代码
│   ├── App.vue                 # 示例应用
│   └── main.ts                 # 示例入口
├── dist/                        # 构建输出 (自动生成)
├── package.json                 # 项目配置
├── vite.config.ts              # Vite 配置
├── tsconfig.json               # TypeScript 配置
├── README.md                    # 使用文档
└── PUBLISH.md                   # 发布指南
```

## 🎨 组件开发规范

### 1. 组件命名
- 使用 PascalCase
- 添加 `Mz` 前缀
- 示例: `MzTableView`, `MzFormControl`

### 2. 文件组织
每个组件应包含:
```
component-name/
├── index.vue          # 主组件
├── index.js           # 辅助函数/配置
├── index.css          # 样式文件
└── components/        # 子组件
```

### 3. Props 定义
```vue
<script setup>
const props = defineProps({
  // 必填属性
  data: {
    type: Array,
    required: true
  },
  // 可选属性 with 默认值
  size: {
    type: String,
    default: 'default'
  }
})
</script>
```

### 4. 事件定义
```vue
<script setup>
const emits = defineEmits(['change', 'update:modelValue'])

const handleChange = (value) => {
  emits('change', value)
  emits('update:modelValue', value)
}
</script>
```

### 5. 样式规范
- 使用 scoped 样式
- 使用 BEM 命名规范
- 支持主题定制

```vue
<style scoped>
/* 块 */
.mz-component {}

/* 元素 */
.mz-component__element {}

/* 修饰符 */
.mz-component--modifier {}
.mz-component__element--modifier {}
</style>
```

## 🧪 测试

### 组件测试
在 `examples/App.vue` 中添加测试用例

### 构建测试
```bash
npm run build
npm pack
```

在其他项目中测试:
```bash
npm install /path/to/mz-ui-1.0.0.tgz
```

## 🔧 常用工具函数

### eventBus
事件总线,用于组件间通信
```javascript
import { eventBus } from '@mzui/components'

// 监听事件
eventBus.on('event-name', (data) => {
  console.log(data)
})

// 触发事件
eventBus.emit('event-name', { key: 'value' })

// 移除监听
eventBus.off('event-name', handler)
```

### formatTimestamp
格式化时间戳
```javascript
import { formatTimestamp } from '@mzui/components'

const formatted = formatTimestamp(1699200000000)
// 输出: 2023/11/05 20:00:00
```

### arrayToTree
数组转树形结构
```javascript
import { arrayToTree } from '@mzui/components'

const arr = [
  { id: 1, parentId: 0, name: 'root' },
  { id: 2, parentId: 1, name: 'child' }
]

const tree = arrayToTree(arr, 0, 'id')
```

## 📦 依赖管理

### peerDependencies
这些依赖需要使用者自行安装:
- vue ^3.3.0
- element-plus ^2.4.0

### dependencies
组件库自带的依赖:
- axios

### devDependencies
开发时使用的依赖:
- vite
- vue-tsc
- typescript
- @vitejs/plugin-vue

## 🐛 调试技巧

### 1. 使用 Vue DevTools
安装 Vue DevTools 浏览器扩展

### 2. 查看构建产物
```bash
npm run build
ls -la dist/
```

### 3. 本地链接测试
在组件库目录:
```bash
npm link
```

在测试项目中:
```bash
npm link @mzui/components
```

### 4. 查看包内容
```bash
npm pack
tar -xvzf mz-ui-1.0.0.tgz
cd package
ls -la
```

## 🎯 性能优化

### 1. 按需引入
支持 Tree Shaking,只打包使用的组件

### 2. 外部依赖
Vue 和 Element Plus 不打包到组件库中

### 3. 代码分割
大组件可以考虑异步加载

## 📝 提交规范

建议使用 Conventional Commits 规范:

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 重构
- `perf:` 性能优化
- `test:` 测试相关
- `chore:` 构建工具或辅助工具的变动

示例:
```bash
git commit -m "feat: 添加表格过滤功能"
git commit -m "fix: 修复表单验证问题"
git commit -m "docs: 更新 README"
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

Happy Coding! 🎉
