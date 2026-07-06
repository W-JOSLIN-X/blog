---
layout: essay
title: "博客搭建小记"
date: 2026-07-05
category: "技术"
---

从零开始用 Jekyll 搭建个人博客，记录过程中踩过的坑和一些心得。

## 为什么选择 Jekyll

Jekyll 是一个静态网站生成器，和 GitHub Pages 完美集成。只需要把 Markdown 文件推送到 GitHub，它就会自动构建并部署。

**优点：**
- 免费托管在 GitHub Pages
- 用 Markdown 写作，简单高效
- 完全可控的 HTML/CSS
- 不需要数据库

## 搭建过程

1. 创建 GitHub 仓库 `<username>.github.io`
2. 本地安装 Jekyll 和依赖
3. 选择主题或自己写样式
4. 配置 `_config.yml`
5. 写第一篇文章并推送

## 踩坑记录

- Windows 下 Jekyll 安装比较麻烦，需要注意 Ruby 版本
- GitHub Pages 对插件有限制，只能用白名单里的插件
- 中文文件名可能有编码问题，建议用英文

总的来说，Jekyll + GitHub Pages 是个人博客的绝佳选择。
