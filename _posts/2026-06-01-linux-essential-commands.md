---
layout: post
title: "每个程序员都应该知道的 20 个 Linux 命令"
date: 2026-06-01
categories: ["Linux", "命令行"]
---

每次用 `grep "ERROR" *.log | sort | uniq -c | sort -rn | head -10` 这条 pipeline 排查问题，都会觉得 Linux 命令行的组合能力是个宝藏。这里整理了 20 个高频命令，按类别分组，每个附一个实用范例。

## 文件操作

```bash
ls -lah          # 列出所有文件（含隐藏），人类可读的大小格式
cp -r src/ bak/  # 递归复制整个目录
mv old.txt new/  # 移动文件到目录；同分区内瞬间完成
rm -rf tmp/      # 递归删除目录 —— 慎用，无回收站
find . -name "*.py" -mtime -7  # 查找最近 7 天内修改的 Python 文件
```

## 文本处理

```bash
grep -rn "TODO" src/                    # 递归搜索，显示文件名和行号
sed -i 's/old/new/g' file.txt            # 全局替换（-i 直接写入文件）
awk -F',' '{print $1, $3}' data.csv     # 按逗号分隔，打印第 1 和第 3 列
head -20 server.log                      # 看前 20 行
tail -f /var/log/nginx/access.log        # 实时追踪日志写入
```

`grep` → `sed` → `awk` 的复杂度递增：grep 负责找，sed 负责改，awk 负责结构化处理。

## 系统信息

```bash
df -h          # 磁盘分区使用情况，人类可读
du -sh *       # 当前目录下每个文件/文件夹的占用大小
top            # 实时进程列表，按 q 退出
ps aux | grep nginx  # 查找特定进程的 PID 和状态
```

`df -h` 和 `du -sh` 经常一起用：先看哪个分区满了，再进目录找谁占的。

## 网络操作

```bash
curl -I https://api.example.com     # 只返回 HTTP 头，检查状态码
wget -c https://example.com/file.zip  # 断点续传下载
ssh user@192.168.1.100              # 远程登录
scp file.txt user@remote:/path/     # 安全拷贝文件到远端
```

## 进程管理

```bash
kill -9 1234       # 强制终止 PID 为 1234 的进程
jobs               # 列出当前 Shell 的后台任务
```

长任务（如日志分析脚本）可以用 `Ctrl+Z` 挂起，`bg` 放到后台，`fg` 切回前台。需要退出终端而任务不能停时，用 `nohup` 或 `tmux` 保护进程。

这些命令不要求一次性背完。把那些"明明可以做，但每次都要查 Google"的命令记下来，用几次就成了肌肉记忆。
