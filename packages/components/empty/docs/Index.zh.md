---
category: components
type: 数据展示
title: Empty
subtitle: 空数据
cover:
cols: 1
---

没有数据时的展示占位图。

## 何时使用

- 当前没有数据时，用于提示用户。

## API

### `ix-empty`

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `description` | 自定义描述内容 | `string \| v-slot:description` | — | — | — |
| `image` | 设置自定义图片地址 | `string` | — | — | — |

#### Slots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 自定义 `Footer` 区域内容 | - | - |

### 主题变量

| 变量名 | default 主题| 说明 |
| --- | --- | --- |
| @empty-margin-md | @margin-md | - |
| @empty-line-height-md | @line-height-base | - |
| @empty-font-size-md | @font-size-lg | - |
| @empty-icon-font-size-md | `64px` | - |
