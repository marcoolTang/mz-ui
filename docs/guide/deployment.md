# 部署到宝塔面板

本文档详细介绍如何将 MZ-UI 文档部署到宝塔面板。

## 前置要求

- 已安装宝塔面板（建议 7.x 以上版本）
- 服务器已安装 Nginx
- 本地已安装 Node.js 16+

## 部署步骤

### 步骤1：本地构建

在项目根目录执行：

```bash
# 安装依赖
npm install

# 构建静态文件
npm run docs:build
```

构建完成后，会在 `docs/.vitepress/dist` 目录生成静态文件。

### 步骤2：上传文件到服务器

#### 方式1：使用宝塔面板上传

1. 登录宝塔面板
2. 进入 **文件** 菜单
3. 进入网站目录（例如：`/www/wwwroot/docs.yourdomain.com`）
4. 上传 `dist` 文件夹中的所有文件

#### 方式2：使用 FTP 工具

推荐使用 FileZilla 或 WinSCP：

```
主机: your-server-ip
端口: 21
用户名: your-ftp-username
密码: your-ftp-password
```

上传 `docs/.vitepress/dist` 目录下的所有文件到网站根目录。

#### 方式3：使用 SCP 命令（推荐）

```bash
# 从本地上传到服务器
scp -r docs/.vitepress/dist/* root@your-server-ip:/www/wwwroot/docs.yourdomain.com/
```

### 步骤3：配置 Nginx

#### 在宝塔面板配置

1. 登录宝塔面板
2. 点击 **网站**
3. 找到你的网站，点击 **设置**
4. 点击 **配置文件**
5. 添加以下配置：

```nginx
server {
    listen 80;
    server_name docs.yourdomain.com;  # 修改为你的域名
    
    root /www/wwwroot/docs.yourdomain.com;  # 修改为你的网站目录
    index index.html;
    
    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
    
    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # 安全头部
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # 日志配置
    access_log /www/wwwlogs/docs.yourdomain.com.log;
    error_log /www/wwwlogs/docs.yourdomain.com.error.log;
}
```

6. 点击 **保存**
7. 重载 Nginx 配置

#### 启用 HTTPS（推荐）

1. 在网站设置中，点击 **SSL**
2. 选择 **Let's Encrypt** 免费证书
3. 填写邮箱，点击 **申请**
4. 勾选 **强制 HTTPS**

配置完成后，Nginx 会自动添加 HTTPS 相关配置：

```nginx
server {
    listen 443 ssl http2;
    server_name docs.yourdomain.com;
    
    ssl_certificate    /www/server/panel/vhost/cert/docs.yourdomain.com/fullchain.pem;
    ssl_certificate_key    /www/server/panel/vhost/cert/docs.yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # ... 其他配置同上
}

server {
    listen 80;
    server_name docs.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

### 步骤4：设置文件权限

在服务器上执行：

```bash
# 设置文件所有者
chown -R www:www /www/wwwroot/docs.yourdomain.com

# 设置文件权限
chmod -R 755 /www/wwwroot/docs.yourdomain.com
```

或在宝塔面板：
1. 进入 **文件** 菜单
2. 找到网站目录
3. 右键 → **权限**
4. 设置为 `755`，勾选 **应用到子目录**

### 步骤5：测试访问

打开浏览器访问：`https://docs.yourdomain.com`

如果能正常访问，说明部署成功！

## 自动化部署脚本

### 创建部署脚本

创建 `deploy.sh` 文件：

```bash
#!/bin/bash

# 配置变量
SERVER_IP="your-server-ip"
SERVER_USER="root"
SERVER_PATH="/www/wwwroot/docs.yourdomain.com"
LOCAL_BUILD_PATH="docs/.vitepress/dist"

echo "🚀 开始部署..."

# 1. 构建项目
echo "📦 构建项目..."
npm run docs:build

# 2. 上传文件
echo "📤 上传文件到服务器..."
scp -r ${LOCAL_BUILD_PATH}/* ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/

# 3. 设置权限
echo "🔐 设置文件权限..."
ssh ${SERVER_USER}@${SERVER_IP} "chown -R www:www ${SERVER_PATH} && chmod -R 755 ${SERVER_PATH}"

echo "✅ 部署完成！"
echo "🌐 访问地址: https://docs.yourdomain.com"
```

### 使用脚本部署

```bash
# 添加执行权限
chmod +x deploy.sh

# 执行部署
./deploy.sh
```

## 持续集成部署（可选）

### 使用 GitHub Actions

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Server

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run docs:build
    
    - name: Deploy to Server
      uses: easingthemes/ssh-deploy@main
      env:
        SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
        ARGS: "-rltgoDzvO --delete"
        SOURCE: "docs/.vitepress/dist/"
        REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
        REMOTE_USER: ${{ secrets.REMOTE_USER }}
        TARGET: "/www/wwwroot/docs.yourdomain.com"
```

配置 GitHub Secrets：
- `SSH_PRIVATE_KEY`: SSH 私钥
- `REMOTE_HOST`: 服务器 IP
- `REMOTE_USER`: SSH 用户名

## 常见问题

### 1. 上传后页面空白？

**原因**：Nginx 配置缺少 SPA 路由支持

**解决方案**：
在 Nginx 配置中添加：
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 2. 刷新页面 404？

**原因**：同上，缺少路由回退配置

**解决方案**：同问题1

### 3. 静态资源加载失败？

**原因1**：base 路径配置错误

**解决方案**：检查 `.vitepress/config.js` 中的 `base` 配置：
```javascript
export default {
  base: '/',  // 如果部署在子目录，改为 '/docs/'
}
```

**原因2**：文件权限问题

**解决方案**：
```bash
chmod -R 755 /www/wwwroot/docs.yourdomain.com
```

### 4. 上传后样式丢失？

**原因**：Gzip 压缩问题或缓存问题

**解决方案1**：清除浏览器缓存

**解决方案2**：在 Nginx 配置中添加：
```nginx
location ~* \.(css|js)$ {
    expires -1;
    add_header Cache-Control "no-cache, must-revalidate";
}
```

### 5. 部署后图片不显示？

**原因**：图片路径问题

**解决方案**：
1. 将图片放在 `docs/public` 目录下
2. 使用绝对路径引用：`/logo.png`

## 性能优化

### 1. 启用 Gzip 压缩

已在 Nginx 配置中启用，无需额外配置。

### 2. 启用浏览器缓存

已在 Nginx 配置中设置静态资源缓存 1 年。

### 3. 启用 HTTP/2

在 SSL 配置中已启用 HTTP/2：
```nginx
listen 443 ssl http2;
```

### 4. 使用 CDN（可选）

推荐使用：
- 阿里云 CDN
- 腾讯云 CDN
- 七牛云 CDN

配置步骤：
1. 在 CDN 控制台添加域名
2. 配置源站为你的服务器
3. 修改域名 DNS 解析到 CDN

## 更新部署

每次更新文档后：

```bash
# 本地构建
npm run docs:build

# 上传到服务器（覆盖原文件）
scp -r docs/.vitepress/dist/* root@your-server-ip:/www/wwwroot/docs.yourdomain.com/

# 或使用部署脚本
./deploy.sh
```

## 监控和日志

### 查看访问日志

```bash
# 实时查看访问日志
tail -f /www/wwwlogs/docs.yourdomain.com.log

# 查看错误日志
tail -f /www/wwwlogs/docs.yourdomain.com.error.log
```

### 在宝塔面板查看

1. 进入 **网站** → 找到你的网站
2. 点击 **日志**
3. 查看访问日志或错误日志

## 备份

### 定期备份

1. 在宝塔面板中，点击 **计划任务**
2. 添加任务：
   - 任务类型：备份网站
   - 网站：选择你的文档网站
   - 执行周期：每天凌晨2点
   - 保留天数：7天

### 手动备份

```bash
# 备份网站文件
tar -czf docs-backup-$(date +%Y%m%d).tar.gz /www/wwwroot/docs.yourdomain.com

# 下载到本地
scp root@your-server-ip:/root/docs-backup-*.tar.gz ./backups/
```

## 安全建议

1. **定期更新**：保持宝塔面板和 Nginx 为最新版本
2. **防火墙**：只开放必要的端口（80、443、SSH）
3. **SSH 密钥**：使用 SSH 密钥而非密码登录
4. **定期备份**：设置自动备份任务
5. **监控告警**：配置服务器监控和告警

## 总结

部署流程：
1. ✅ 本地构建静态文件
2. ✅ 上传到服务器
3. ✅ 配置 Nginx
4. ✅ 设置 HTTPS
5. ✅ 测试访问

完成以上步骤后，你的 MZ-UI 文档就成功部署到宝塔面板了！
