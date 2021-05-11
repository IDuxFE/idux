---
category: cdk
type: 
title: Overlay
subtitle: 浮层
order: 0
---

用于创建定位浮层，内部封装浮层显隐事件。

## 何时使用

需要浮层定位到指定元素时使用。

## API

### `useOverlay`

#### `OverlayOptions`

| 名称             | 类型                    | 默认值   | 备注                                                |
| ---------------- | ----------------------- | -------- | --------------------------------------------------- |
| `visible`        | `boolean`               | `false`  | 浮层默认展示状态                                    |
| `scrollStrategy` | `OverlayScrollStrategy` | `none`   | 浮层滚动策略                                        |
| `disabled`       | `boolean`               | `false`  | -                                                   |
| `placement`      | `OverlayPlacement`      | `top`    | 浮层定位位置                                        |
| `trigger`        | `OverlayTrigger`        | `manual` | 浮层触发显示方式                                    |
| `allowEnter`     | `boolean`               | `false`  | 是否允许鼠标进入浮层，尽在 `trigger = hover` 时生效 |
| `autoAdjust`     | `boolean`               | `true`   | 空间不足时是否重新定位                              |
| `offset`         | `[number, number]`      | `[0, 0]` | 浮层水平、垂直偏移量                                |
| `hideDelay`      | `number`                | 0        | 浮层隐藏延时                                        |
| `showDelay`      | `number`                | 0        | 浮层显示延时

#### `OverlayInstance`

| 名称            | 类型                                          | 备注                       |
| --------------- | --------------------------------------------- | -------------------------- |
| `initialize`    | `() => void`                                  | 浮层初始化函数             |
| `show`          | `(showDelay?: number) => void`                | 展示浮层                   |
| `hide`          | `(hideDelay? :number) => void`                | 隐藏浮层                   |
| `update`        | `(options?: Partial<OverlayOptions>) => void` | 更新浮层                   |
| `destroy`       | `() => void`                                  | 销毁浮层，终止浮层自动事件 |
| `visibility`    | `ComputedRef<boolean>`                        | 当前浮层展示状态           |
| `placement`     | `ComputedRef<OverlayPlacement>`               | 当前浮层的真实位置         |
| `triggerRef`    | `Ref<OverlayElement | null>`                  | 浮层触发元素               |
| `triggerEvents` | `ComputedRef<OverlayTriggerEvents>`           | 浮层触发元素绑定事件       |
| `overlayRef`    | `Ref<OverlayElement | null>`                  | 浮层元素                   |
| `overlayEvents` | `OverlayPopperEvents`                         | 浮层元素绑定事件           |

```typescript
import type { ComponentPublicInstance } from 'vue'

type OverlayScrollStrategy = 'none' | 'close' | 'reposition'
type OverlayPlacement =
  | 'topStart'
  | 'top'
  | 'topEnd'
  | 'rightStart'
  | 'right'
  | 'rightEnd'
  | 'bottomStart'
  | 'bottom'
  | 'bottomEnd'
  | 'leftStart'
  | 'left'
  | 'leftEnd'
type OverlayTrigger = 'click' | 'hover' | 'focus' | 'contextmenu' | 'manual'
type OverlayElement = ComponentPublicInstance | HTMLElement

interface OverlayTriggerEvents {
  onClick?: (event: Event) => void
  onMouseenter?: (event: Event) => void
  onMouseleave?: (event: Event) => void
  onFocus?: (event: Event) => void
  onBlur?: (event: Event) => void
  onContextmenu?: (event: Event) => void
}

interface OverlayPopperEvents {
  onMouseenter: () => void
  onMouseleave: () => void
}
```
