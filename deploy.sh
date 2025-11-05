#!/bin/bash

# MZ-UI 文档部署脚本
# 使用方法：./deploy.sh

echo "========================================="
echo "   MZ-UI 文档自动部署脚本"
echo "========================================="
echo ""

# 配置变量（请根据实际情况修改）
SERVER_IP="your-server-ip"
SERVER_USER="root"
SERVER_PATH="/www/wwwroot/docs.yourdomain.com"
LOCAL_BUILD_PATH="docs/.vitepress/dist"

echo "📋 配置信息："
echo "   服务器IP: $SERVER_IP"
echo "   服务器用户: $SERVER_USER"
echo "   部署路径: $SERVER_PATH"
echo ""

# 询问是否继续
read -p "👉 是否继续部署？(y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "❌ 已取消部署"
    exit 1
fi

# 1. 检查 Node.js
echo "🔍 检查环境..."
if ! command -v node &> /dev/null
then
    echo "❌ 错误：未安装 Node.js，请先安装 Node.js 16+"
    exit 1
fi
echo "✅ Node.js 版本：$(node -v)"

# 2. 安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
fi

# 3. 构建项目
echo "🔨 构建项目..."
npm run docs:build
if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi
echo "✅ 构建成功"

# 4. 检查构建产物
if [ ! -d "$LOCAL_BUILD_PATH" ]; then
    echo "❌ 构建产物不存在：$LOCAL_BUILD_PATH"
    exit 1
fi

# 5. 上传文件
echo "📤 上传文件到服务器..."
scp -r ${LOCAL_BUILD_PATH}/* ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/
if [ $? -ne 0 ]; then
    echo "❌ 文件上传失败"
    echo "💡 提示：请检查 SSH 连接和服务器路径是否正确"
    exit 1
fi
echo "✅ 文件上传成功"

# 6. 设置权限
echo "🔐 设置文件权限..."
ssh ${SERVER_USER}@${SERVER_IP} "chown -R www:www ${SERVER_PATH} && chmod -R 755 ${SERVER_PATH}"
if [ $? -ne 0 ]; then
    echo "⚠️  权限设置失败，请手动在宝塔面板中设置"
else
    echo "✅ 权限设置成功"
fi

echo ""
echo "========================================="
echo "✨ 部署完成！"
echo "========================================="
echo ""
echo "🌐 访问地址："
echo "   http://$SERVER_IP"
echo "   或您配置的域名"
echo ""
echo "📋 后续步骤："
echo "   1. 在浏览器中访问上述地址"
echo "   2. 如有问题，查看 Nginx 日志："
echo "      tail -f /www/wwwlogs/*.log"
echo "   3. 查看部署文档："
echo "      docs/guide/deployment.md"
echo ""
