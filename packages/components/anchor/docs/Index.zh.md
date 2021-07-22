---
category: components
type: 其他
title: Anchor
subtitle: 锚点
---

用于跳转到页面指定位置。

- 需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## API

### ix-anchor

#### AnchorProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `affix` | 是否是固定模式 | `boolean` | `true`  | - | - |
| `bounds` | 锚点区域边界 | `number` | `5` | ✅ | - |
| `hideLinkBall` |是否隐藏小圆点 | `boolean` | `false` | ✅ | - |
| `offsetTop` | 距离窗口顶部达到指定偏移量后触发 | `number` | - | - | - |
| `target` | 指定滚动的容器 | `string \| HTMLElement` | `window` | - | - |
| `targetOffset` | 锚点滚动偏移量，默认与 offsetTop 相同 | `number` | - | - | - |
| `onChange` | 锚点改变的回调 | `(activeLink: string) => void` | - | - | - |
| `onClick` | 点击 `ix-anchor-link` 的回调事件 | `(evt: MouseEvent, link: AnchorLinkProps) => void` | - | - | - |

### ix-anchor-link

#### AnchorLinkProps

> 除以下表格之外还支持原生 `a` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `href` | 锚点链接 | `string` | - | - | - |
| `title` | 文字内容 | `string \| #title` | - | - | - |

#### AnchorLinkSlots

| 名称 | 说明 | 参数类型 | 备注 |
|  --- | --- | --- | --- |
| `default` | 支持 `ix-anchor-link` 的嵌套 | - | - |
