---
category: components
type: 其他
title: Anchor
subtitle: 锚点
cover:
---

用于跳转到页面指定位置。

## 何时使用

- 需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## API

### ix-anchor

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `affix` | 是否是固定模式 | `boolean` | `true`  | - | - |
| `showInkInFixed` | affix={false}时是否显示小圆点 | `boolean` | `false` | ✅ | - |
| `target` | 指定滚动的容器 | `string \| HTMLElement` | `window` | - | - |
| `offsetTop` | 距离窗口顶部达到指定偏移量后触发 | `number` | - | - | - |
| `targetOffset` | 锚点滚动偏移量，默认与 offsetTop 相同 | `number` | - | - | - |

#### Emits

| 名称 | 说明 | 参数  |
| --- | --- | --- |
| `click` | click 事件的 handle | `Function(e: Event, link: Object)` |
| `change` | 监听锚点链接改变 | `(activeLink: string) => void` |

### ix-link

#### LinkProps

> 除以下表格之外还支持原生 `a` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `href` | 锚点链接 | `string` | - | - | - |
| `title` | 文字内容 | `string \| v-slot:default` | - | - | - |
