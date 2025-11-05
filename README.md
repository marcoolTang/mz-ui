# MZ-UI 组件库文档

基于 VitePress 1.6.4 构建的 MZ-UI 组件库使用文档。

## 📋 环境要求

- **Node.js**: >= 18.0.0（推荐 Node 20 LTS）
- **npm**: >= 9.0.0
- **操作系统**: Windows / macOS / Linux

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

如果安装速度慢，可以使用淘宝镜像：

```bash
npm install --registry=https://registry.npmmirror.com
```

### 2. 启动开发服务器

```bash
npm run docs:dev
```

启动成功后，访问：http://localhost:5173

### 3. 构建生产版本

```bash
npm run docs:build
```

构建产物在 `docs/.vitepress/dist` 目录。

### 4. 预览构建结果

```bash
npm run docs:preview
```

## 📂 项目结构

```
mz-ui-docs/
├── docs/                    # 所有文档
│   ├── .vitepress/         # VitePress 配置
│   │   └── config.mjs      # 配置文件（ESM 格式）
│   ├── guide/              # 使用指南
│   │   ├── introduction.md
│   │   ├── quickstart.md
│   │   ├── configuration.md
│   │   └── deployment.md
│   ├── components/         # 组件文档
│   │   ├── container.md
│   │   ├── filter.md
│   │   ├── table.md
│   │   ├── form.md
│   │   └── detail.md
│   ├── examples/           # 示例
│   │   ├── basic.md
│   │   └── with-filter.md
│   └── index.md            # 首页
├── package.json            # 项目配置
├── .npmrc                  # npm 配置
└── README.md               # 项目说明
```

## 🎯 版本信息

- **VitePress**: 1.6.4
- **Vue**: 3.5.13
- **Node.js**: >= 18.0.0

## 🌐 部署到宝塔

### 方法1：使用自动部署脚本

1. 修改 `deploy.sh` 配置：
```bash
vim deploy.sh

# 修改以下配置
SERVER_IP="your-server-ip"
SERVER_USER="root"
SERVER_PATH="/www/wwwroot/docs.yourdomain.com"
```

2. 执行部署：
```bash
chmod +x deploy.sh
./deploy.sh
```

### 方法2：手动部署

1. **本地构建**
```bash
npm run docs:build
```

2. **上传文件**

将 `docs/.vitepress/dist` 目录下的所有文件上传到服务器：
- 使用宝塔面板上传
- 或使用 SCP：
```bash
scp -r docs/.vitepress/dist/* root@your-server-ip:/www/wwwroot/docs.yourdomain.com/
```

3. **配置 Nginx**

在宝塔面板 → 网站设置 → 配置文件，添加：
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

4. **访问测试**

打开浏览器访问你的域名，看到文档首页即成功！

详细部署步骤请查看：[部署到宝塔](docs/guide/deployment.md)

## 📝 文档编写

### 添加新页面

1. 在对应目录创建 `.md` 文件
2. 编辑 `docs/.vitepress/config.mjs` 添加侧边栏配置
3. 本地预览确认

### Markdown 扩展

支持 VitePress 的所有 Markdown 扩展功能：

#### 代码高亮

````markdown
```javascript
const hello = 'world'
```
````

#### 自定义容器

```markdown
::: tip 提示
这是一个提示
:::

::: warning 警告
这是一个警告
:::

::: danger 危险
这是一个危险提示
:::

::: details 点击查看详情
这里是详细内容
:::
```

#### 代码组

````markdown
::: code-group

```js [config.js]
export default {
  // config
}
```

```ts [config.ts]
export default {
  // config
}
```

:::
````

## 🔧 常见问题

### 1. 启动失败？

**检查 Node.js 版本**：
```bash
node -v  # 应该 >= 18.0.0
```

如果版本低，请升级 Node.js。

### 2. 安装依赖失败？

**清除缓存**：
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**使用淘宝镜像**：
```bash
npm install --registry=https://registry.npmmirror.com
```

### 3. 端口被占用？

VitePress 会自动使用其他端口（5174、5175...）

或手动指定端口：
```bash
npm run docs:dev -- --port 3000
```

### 4. 部署后页面空白？

检查 Nginx 配置是否添加了：
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 5. 样式丢失？

清除浏览器缓存，或在 Nginx 中添加：
```nginx
location ~* \.(css|js)$ {
    expires -1;
}
```

## 📚 相关资源

- [VitePress 官方文档](https://vitepress.dev/)
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Markdown 语法指南](https://www.markdownguide.org/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 开源协议

[MIT License](LICENSE)

## 📧 联系方式

如有问题，请联系：your-email@example.com
