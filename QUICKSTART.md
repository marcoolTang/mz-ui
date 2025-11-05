# 🚀 快速开始指南

按照以下步骤，快速启动 MZ-UI 文档。

## 第一步：安装依赖

在项目根目录执行：

```bash
npm install
```

等待依赖安装完成（首次安装约需 1-2 分钟）。

## 第二步：启动开发服务器

```bash
npm run docs:dev
```

看到以下信息表示启动成功：

```
  vitepress v1.0.0-rc.31

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

## 第三步：浏览文档

打开浏览器访问：http://localhost:5173

你将看到完整的 MZ-UI 组件库文档！

## 常见问题

### 端口被占用？

如果 5173 端口被占用，VitePress 会自动使用其他端口（如 5174）。

### 安装依赖失败？

尝试：
```bash
# 清除缓存
npm cache clean --force

# 使用淘宝镜像
npm install --registry=https://registry.npmmirror.com
```

### 启动失败？

检查 Node.js 版本：
```bash
node -v  # 应该 >= 16.0.0
```

如果版本太低，请升级 Node.js。

## 下一步

- 📖 查看[介绍](/guide/introduction)了解 MZ-UI
- 🎨 查看[组件文档](/components/container)学习使用
- 🚀 查看[部署指南](/guide/deployment)部署到服务器

## 需要帮助？

如有问题，请查看文档或联系开发团队。
