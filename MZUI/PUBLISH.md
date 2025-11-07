# 发布到 NPM 指南

## 📋 发布前准备

### 1. 确认包名
在 `package.json` 中修改包名（确保包名未被占用）:
```json
{
  "name": "@your-scope/mz-ui",  // 或者 "mz-ui-components"
  "version": "1.0.0"
}
```

检查包名是否可用:
```bash
npm search @your-scope/mz-ui
```

### 2. 登录 NPM
```bash
npm login
```

输入你的:
- Username
- Password  
- Email
- OTP (如果启用了双因素认证)

验证登录状态:
```bash
npm whoami
```

### 3. 构建项目
```bash
npm run build
```

检查 `dist` 目录是否生成成功:
```bash
ls -la dist/
```

应该看到:
- `mz-ui.es.js` - ES Module 格式
- `mz-ui.umd.js` - UMD 格式
- `style.css` - 样式文件
- `types/` - TypeScript 类型声明

## 🚀 发布步骤

### 首次发布

```bash
# 1. 确保所有文件都已提交
git status

# 2. 构建项目
npm run build

# 3. 发布到 NPM (公开包)
npm publish --access public

# 如果是私有包
npm publish
```

### 更新版本并发布

```bash
# 补丁版本 (1.0.0 -> 1.0.1)
npm version patch

# 小版本 (1.0.0 -> 1.1.0)
npm version minor

# 大版本 (1.0.0 -> 2.0.0)
npm version major

# 发布
npm publish --access public
```

## 📦 发布后验证

### 1. 检查包信息
```bash
npm view @your-scope/mz-ui
```

### 2. 在新项目中测试
```bash
# 创建测试项目
mkdir test-mz-ui
cd test-mz-ui
npm init -y

# 安装你的包
npm install @your-scope/mz-ui

# 测试导入
# 创建 test.js
```

test.js:
```javascript
const MzUI = require('@your-scope/mz-ui')
console.log(MzUI)
```

## 🔧 常见问题

### 1. 包名已被占用
```
npm ERR! 403 Forbidden - PUT https://registry.npmjs.org/@scope/package
```

解决方案:
- 更改包名
- 使用自己的 scope: `@your-username/package-name`

### 2. 需要登录
```
npm ERR! need auth This command requires you to be logged in.
```

解决方案:
```bash
npm login
```

### 3. 没有发布权限
```
npm ERR! 403 Forbidden - PUT https://registry.npmjs.org/package
```

解决方案:
- 确保已登录: `npm whoami`
- 对于 scoped 包,添加 `--access public`

### 4. 版本已存在
```
npm ERR! 403 Forbidden - PUT https://registry.npmjs.org/package
npm ERR! You cannot publish over the previously published versions
```

解决方案:
```bash
npm version patch  # 升级版本号
npm publish --access public
```

## 📝 版本管理建议

遵循语义化版本 (Semantic Versioning):

- **MAJOR 版本 (x.0.0)**: 不兼容的 API 修改
- **MINOR 版本 (0.x.0)**: 向下兼容的功能新增
- **PATCH 版本 (0.0.x)**: 向下兼容的 bug 修复

示例:
```bash
# Bug 修复
npm version patch  # 1.0.0 -> 1.0.1

# 新增功能
npm version minor  # 1.0.1 -> 1.1.0

# 破坏性更改
npm version major  # 1.1.0 -> 2.0.0
```

## 🎯 发布检查清单

在发布前检查:

- [ ] package.json 中的版本号是否正确
- [ ] README.md 是否完整
- [ ] 构建是否成功 (`npm run build`)
- [ ] dist 目录是否包含所有必要文件
- [ ] 是否已登录 NPM (`npm whoami`)
- [ ] .npmignore 是否正确配置
- [ ] 依赖项是否正确配置 (dependencies vs devDependencies)

## 🔗 有用的命令

```bash
# 查看将要发布的文件列表
npm pack --dry-run

# 创建本地包用于测试
npm pack

# 撤销发布 (24小时内)
npm unpublish @your-scope/mz-ui@1.0.0

# 废弃某个版本
npm deprecate @your-scope/mz-ui@1.0.0 "此版本有严重bug,请升级到1.0.1"

# 查看包的所有版本
npm view @your-scope/mz-ui versions
```

## 📚 推荐阅读

- [NPM 官方文档](https://docs.npmjs.com/)
- [语义化版本规范](https://semver.org/lang/zh-CN/)
- [package.json 字段说明](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)

---

祝发布顺利！🎉
