---
category: components
type:
title: Icon
subtitle:
cover:
---

语义化的矢量图形。

## 何时使用

## API

### ix-icon

> 当存在 @click 的时候，会被渲染为一个 `button` 元素，其他情况为 `i` 元素

| 参数 | 说明 | 类型 | 全局配置 |
| --- | --- | --- | --- |
| `[name]`| 图标名称 | `string` |
| `[rotate]` | 图标旋转角度, 为 `true` 时会循环旋转 | `boolean|number|string` | - |
| `[iconfont]` | 图标是否来自 `iconfont` | `boolean` | - |

### [helper 函数]

| 方法 | 说明 | 参数 |
| --- | --- | --- |
| `addIconDefinitions()` | 用于静态引入图标 | `IconDefinition[]` |
| `fetchFromIconfont()` | 用于从 [`iconfont`](https://www.iconfont.cn) 获取图标资源文件 | `string|string[]` |
