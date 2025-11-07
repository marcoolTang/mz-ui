---
outline: deep
---

# 贡献指南

感谢你考虑为 MZ-UI 做出贡献！

## 行为准则

请遵守我们的 [行为准则](https://github.com/marcoolTang/mz-ui/blob/master/CODE_OF_CONDUCT.md)，共同维护一个友好的社区环境。

## 如何贡献

### 报告 Bug

如果你发现了 Bug，请通过 [GitHub Issues](https://github.com/marcoolTang/mz-ui/issues) 报告：

1. 使用清晰的标题描述问题
2. 详细说明复现步骤
3. 提供相关的代码示例
4. 说明期望的行为和实际行为
5. 包含运行环境信息（浏览器版本、Node.js 版本等）

### 提交功能请求

通过 [GitHub Issues](https://github.com/marcoolTang/mz-ui/issues) 提交功能请求：

1. 清晰描述功能需求
2. 说明使用场景
3. 如果可能，提供设计建议或原型

### 提交代码

1. **Fork 仓库**

```bash
git clone https://github.com/marcoolTang/mz-ui.git
cd mz-ui
```

2. **创建分支**

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

3. **安装依赖**

```bash
npm install
```

4. **开发**

```bash
npm run dev
```

5. **提交代码**

```bash
git add .
git commit -m "feat: add new feature"
# 或
git commit -m "fix: fix some bug"
```

提交信息格式：

-   `feat:` 新功能
-   `fix:` Bug 修复
-   `docs:` 文档更新
-   `style:` 代码格式调整
-   `refactor:` 重构
-   `test:` 测试相关
-   `chore:` 构建/工具相关

6. **推送分支**

```bash
git push origin feature/your-feature-name
```

7. **创建 Pull Request**

在 GitHub 上创建 Pull Request，描述你的改动。

## 开发规范

### 代码风格

-   使用 2 空格缩进
-   使用 TypeScript
-   遵循 ESLint 规则

### 组件开发

1. 在 `src/components` 下创建组件目录
2. 编写组件代码
3. 添加 TypeScript 类型定义
4. 编写单元测试（如果适用）
5. 更新文档

### 文档

-   为新组件添加文档页面
-   包含 Props、Events、Methods 说明
-   提供使用示例
-   添加代码演示

## 项目结构

```
mz-ui/
├── src/
│   ├── components/        # 组件源码
│   │   ├── table-view/
│   │   ├── form-control/
│   │   └── ...
│   ├── index.ts          # 组件导出
│   └── styles/           # 样式文件
├── docs/                 # 文档
│   ├── components/
│   ├── guide/
│   └── examples/
├── examples/             # 示例
└── package.json
```

## 发布流程

由核心团队成员负责发布新版本：

1. 更新版本号：`npm version patch/minor/major`
2. 更新 CHANGELOG.md
3. 构建：`npm run build`
4. 发布：`npm publish`
5. 推送标签：`git push --tags`

## 获得帮助

如有任何问题，可以通过以下方式获得帮助：

-   [GitHub Issues](https://github.com/marcoolTang/mz-ui/issues)
-   [GitHub Discussions](https://github.com/marcoolTang/mz-ui/discussions)
-   Email: tzzwpqwe@vip.qq.com

## 致谢

感谢所有为 MZ-UI 做出贡献的开发者！

<a href="https://github.com/marcoolTang/mz-ui/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=marcoolTang/mz-ui" />
</a>
