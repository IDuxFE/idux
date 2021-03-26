---
category: components
type: 通用
title: Title
subtitle: 标题栏
order: 0
---

标题栏用于各中容器的顶部，起到了内容概览和引导页级操作的作用。

## 何时使用

当需要使用户快速理解当前容器是什么以及一些快捷操作。

## API

### ix-title

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `title` | 标题文字 | `string\|v-slot:default` | - | - | - |
| `subTitle` | 二级标题文字 | `string\|v-slot:subTitle` | - | - | - |
| `extra` | 右侧操作区域 | `string\|string[]\|v-slot:extra` | - | - | - |
| `size` | 标题大小 | `extraLarge\|large\|medium\|small` | `large` | - | 分别对应 `h1\|h2\|h3\|h4` |
| `prefix` | 标题前缀图标 | `string\|v-slot:prefix` | - | - | - |

#### Emits

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `extraClick` | 右侧操作图标被点击 | `(name: string, evt: MouseEvent) => void` | `name` 为传入的 `extra` 值 |
| `prefixClick` | 前缀图标被点击 | `(evt: MouseEvent) => void` | - |
