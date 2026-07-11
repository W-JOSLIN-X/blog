---
layout: post
title: "Python 数据分析入门：用 Pandas 处理 CSV 数据"
date: 2026-07-01
categories: ["Python", "数据分析"]
---

## 为什么选 Pandas？

数据分析的第一步通常是读取数据文件，而 CSV 是最常见的格式之一。Pandas 是 Python 生态里处理表格数据的核心库，`pd.read_csv()` 一行代码就能把 CSV 变成 DataFrame，比手写文件解析省太多事。

## 读取 CSV 文件

```python
import pandas as pd

df = pd.read_csv('sales_data.csv')
```

这里有三个参数值得留意：
- `encoding='utf-8'` — 中文数据大概率需要指定编码，否则报 UnicodeDecodeError
- `parse_dates=['date']` — 把某些列直接解析为 datetime 类型
- `dtype={'id': str}` — 防止纯数字编号被当成数值类型丢失前导零

## 快速浏览数据

```python
df.head(8)       # 看前 8 行，检查列名和数据类型是否正常
df.describe()    # 数值列的统计摘要：均值、标准差、四分位数
df.info()        # 每列的非空计数和数据类型，定位缺失值
df.shape         # (行数, 列数)
```

`df.info()` 最容易发现隐性坑：某列应该是数字却变成了 object，大概率混入了不可见字符或空字符串。

## 条件筛选

Pandas 的布尔索引读起来很直观：

```python
# 筛选销售额大于 1000 的行
high_sales = df[df['sales'] > 1000]

# 多条件：与用 &，或用 |
result = df[(df['sales'] > 500) & (df['region'] == '华北')]
```

注意必须加括号，运算符优先级会让 `df['sales'] > 500 & df['region'] == '华北'` 报错。

## 分组聚合

这是 Pandas 最常用的进阶操作 —— 按某个维度分组后统计：

```python
# 按地区汇总销售额和利润
summary = df.groupby('region').agg({
    'sales': 'sum',
    'profit': 'mean'
}).reset_index()
```

`reset_index()` 把 groupby 结果转回平铺表，方便后续继续操作或写出 CSV。常见的聚合函数还有 `count`、`max`、`min`、`std`。

## 写出结果

```python
summary.to_csv('summary_by_region.csv', index=False, encoding='utf-8-sig')
```

`index=False` 去掉默认行号，`utf-8-sig` 带 BOM 头，确保 Excel 打开不乱码。

Pandas 的功能远不止这些，但掌握 read_csv → head/describe → 筛选 → groupby → to_csv 这条链路，已经能应付大部分数据预处理任务了。
