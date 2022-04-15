---
category: components
type: 其他
title: Anchor
subtitle: 锚点
---

## API

### IxAnchor

#### AnchorProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `affix` | 是否是固定模式 | `boolean` | `true`  | - | - |
| `bounds` | 锚点区域边界 | `number` | `5` | ✅ | - |
| `hideLinkBall` |是否隐藏小圆点 | `boolean` | `false` | ✅ | - |
| `offsetTop` | 距离窗口顶部达到指定偏移量后触发 | `number` | - | - | - |
| `target` | 需要监听其滚动事件的元素 | `string \| HTMLElement \| () => string \| HTMLElement` | `window` | - | - |
| `targetOffset` | 锚点滚动偏移量，默认与 offsetTop 相同 | `number` | - | - | - |
| `onChange` | 锚点改变的回调 | `(activeLink: string) => void` | - | - | - |
| `onClick` | 点击 `IxAnchorLink` 的回调事件 | `(evt: MouseEvent, link: AnchorLinkProps) => void` | - | - | - |

### IxAnchorLink

#### AnchorLinkProps

> 除以下表格之外还支持原生 `a` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `href` | 锚点链接 | `string` | - | - | - |
| `title` | 文字内容 | `string \| #title` | - | - | - |

#### AnchorLinkSlots

| 名称 | 说明 | 参数类型 | 备注 |
|  --- | --- | --- | --- |
| `default` | 支持 `IxAnchorLink` 的嵌套 | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@anchor-background-color` | `@background-color-component` | - | - |
| `@anchor-wrapper-margin-left` | `-@spacing-xs` | - | - |
| `@anchor-wrapper-padding-left` | `@spacing-xs` | - | - |
| `@anchor-color` | `@text-color` | - | - |
| `@anchor-border-width` | `@border-width-md` | - | - |
| `@anchor-border-color` | `@border-color` | - | - |
| `@anchor-ink-ball-width` | `2px` | - | - |
| `@anchor-ink-ball-height` | `16px` | - | - |
| `@anchor-ink-ball-radius` | `2px` | - | - |
| `@anchor-ink-ball-background-color` | `@color-primary` | - | - |
| `@anchor-link-margin` | `@spacing-md 0 @spacing-md @spacing-lg` | - | - |
| `@anchor-link-font-size` | `@font-size-md` | - | - |
| `@anchor-link-line-height` | `1` | - | - |
| `@anchor-ink-line-width` | `1px` | - | - |
| `@anchor-link-active-color` | `@color-primary` | - | - |
| `@anchor-link-hover-color` | `@color-primary` | - | - |
<!--- insert less variable end  --->