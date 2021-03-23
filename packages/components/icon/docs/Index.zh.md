---
category: components
type: 通用
title: Icon
subtitle: 图标
order: 0
alone: true
---

语义化的矢量图形。

## 何时使用

## API

### ix-icon

#### Props

> 当存在 @click 的时候，会被渲染为一个 `button` 元素，其他情况为 `i` 元素

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `name`| 图标名称 | `string` | - | - | - |
| `rotate` | 图标旋转角度, 为 `true` 时会循环旋转 | `boolean \| number` | - | - | - |
| `iconfont` | 图标是否来自 `iconfont` | `boolean` | - | - | - |

### 辅助函数

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `addIconDefinitions` | 用于静态引入图标 | `(icons: IconDefinition[]) => void` | - |
| `fetchFromIconfont` | 用于从 [`iconfont`](https://www.iconfont.cn) 获取图标资源文件 | `(iconFontUrl: string \| string[])=> void` | - |
