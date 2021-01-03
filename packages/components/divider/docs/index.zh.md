---
category: components
type: 布局
title: Divider
subtitle: 分割线
cover:
---

区隔内容的分割线

## 何时使用

* 对不同章节的文本段落进行分割
* 对行内文字/链接进行分割，例如表格的操作列

## API

### `ix-divider`

#### Props

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `dashed` | 是否虚线 | `boolean` | `false` | ✅ | - |
| `plain` | 文字是否显示为普通正文样式 | `boolean` | `false` | ✅ | - |
| `position` | 文字显示位置 | `left\|center\|right` | `center`| ✅ | - |
| `type` | 水平分割线还是垂直分割线 | `horizontal\|vertical` | `horizontal` | ✅ | - |
| `text` | 分割线显示文字 | `slot` | - | - | - |
