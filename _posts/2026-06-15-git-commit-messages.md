---
layout: post
title: "写好 Git 提交信息的七个建议"
date: 2026-06-15
categories: ["Git", "工程实践"]
---

Git 提交信息是写给三个月后的自己看的注释。翻 `git log --oneline` 看到几十条 "fix bug" "update" 时，你会感谢当初多花的那 30 秒。以下是七个具体的实践建议。

## 1. 使用祈使语气

把提交信息写成命令句："Add user login validation"，而不是 "Added" 或 "Adds"。这和 Git 自身的提交风格保持一致 —— `git merge` 生成的默认信息就是 "Merge branch" 而非 "Merged"。

## 2. 标题控制在 50 字符内

短标题让 `git log --oneline`、`gitk` 和 GitHub PR 列表体验更好。超过 50 字符时，重新思考这条提交是否做了太多事 —— 也许该拆成两条。

## 3. 使用约定式前缀

```bash
feat: 添加导出 PDF 功能
fix: 修复日期时区转换错误
docs: 补充 API 接口文档
refactor: 提取公共校验逻辑
test: 补充用户模块单元测试
chore: 升级 ESLint 到 v9
```

前缀让提交类型一目了然，也方便后续用 `git log --grep="feat:"` 生成 changelog。

## 4. 正文每行 72 字符换行

标题后空一行，然后写详细说明，手工在 72 字符处换行。大多数编辑器（Vim、VS Code）的提交信息模式会高亮这个界限。

## 5. 正文解释"为什么"而非"做了什么"

代码 diff 已经展示了"做了什么"，正文应该补充背景：为什么选这个方案而非另一个？改了哪里可能影响什么？给 review 的人看，也给以后排查回归的自己看。

## 6. 关联 Issue 编号

```bash
fix: 修复订单金额精度丢失

使用 Decimal 替代 float 存储金额，避免二进制浮点误差。
Closes #342
```

GitHub/GitLab 会自动将 `Closes #342` 链接到对应 issue 并自动关闭。

## 7. 用 `git commit -v` 写好每一次提交

```bash
git commit -v
```

`-v` 会在提交信息编辑区的下方附上完整的 diff，让你对照着变动写说明，而不是凭记忆。这是个很小的习惯，但能显著提升提交信息的准确度。

最后一条经验：如果一条提交装不下你的改动描述，那说明改动太大了，请 `git add -p` 分批提交。
