# 西安五一旅游指南

一个帮助游客避开人流，优化游览路线的西安旅游指南网站。

## 特点

- 响应式设计，完美适配手机端
- 可安装为 PWA 应用
- 支持离线访问
- 精心规划的避开人流路线
- 实时天气信息
- 详细的交通和住宿建议

## 部署说明

1. 使用 GitHub Pages 部署：
   - 创建一个新的 GitHub 仓库
   - 将所有文件上传到仓库
   - 在仓库设置中启用 GitHub Pages
   - 选择 main 分支作为源
   
2. 使用其他静态网站托管服务：
   - Netlify
   - Vercel
   - Firebase Hosting

## 本地开发

1. 克隆仓库：
```bash
git clone [仓库地址]
```

2. 安装依赖（如果需要）：
```bash
npm install
```

3. 运行本地服务器：
```bash
python -m http.server 8000
# 或者使用其他静态文件服务器
```

## 文件结构

- `index.html` - 主页面
- `manifest.json` - PWA 配置文件
- `sw.js` - Service Worker 文件
- `icons/` - PWA 图标文件夹

## 在安卓设备上使用

1. 使用 Chrome 浏览器访问网站
2. 等待几秒钟，会出现"添加到主屏幕"的提示
3. 点击"添加"即可将网站安装为本地应用
4. 也可以通过 Chrome 菜单中的"添加到主屏幕"手动安装

## 许可证

MIT License 