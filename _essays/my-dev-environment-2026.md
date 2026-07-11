---
layout: post
title: "我的开发环境配置（2026 版）"
date: 2026-05-30
category: "技术"
---

最近刚重装了一次系统，顺手把开发环境重新搭了一遍，记录一下现在用得比较顺手的一套配置。

终端用的是 Windows Terminal，把默认 shell 设成了 PowerShell 7。主要是 7 比 5.1 快不少，补全也智能一些。搭配 Oh My Posh 做提示符美化，状态栏信息一目了然，但主题选了比较简洁的那款，太花哨反而干扰注意力。

编辑器还是 VS Code。装了一些必备扩展：GitLens、Prettier、ESLint、Python、C/C++。配色用的 One Dark Pro，看了两年还是觉得最舒服。字体从 Fira Code 换成了 JetBrains Mono，主要是 JetBrains 的字形连字看起来更自然，特别是 `=>` 和 `!=` 这些符号在视觉上辨识度更高。

Git 操作以前都是在终端里手敲命令，后来发现 lazygit 这个 TUI 工具确实好用——交互式 staging、查看 diff、解决冲突，一个界面搞定，尤其适合习惯键盘操作的人。

浏览器方面，日常用 Firefox 开发版，主要是因为开发者工具的 CSS 网格检查器很好用，调布局的时候能省不少时间。

整体配置不复杂，够用就好。工具是为人服务的，不是反过来。
