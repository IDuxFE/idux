---
category: components
type: 反馈
title: Popover
subtitle: 气泡卡片
order: 0
---

点击/鼠标移入元素，弹出气泡式的卡片浮层。

## 何时使用

当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。

和 `Tooltip` 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

## API

### `ix-popover`

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `title` | 浮层的标题 | `string \| v-slot: title` | - | - | - |
| `content` | 浮层内容 | `string \| v-slot: content` | - | - | 必传 |
| `placement` | 浮层的对齐方式 | `OverlayPlacement` | `top` | ✅ | - |
| `visibile` | 是否显隐 | `boolean` | - | - | - |
| `trigger` | 浮层触发方式 | `OverlayTrigger` | `click` | ✅ | - |
| `showDelay` | 浮层显示延时 | `number` | 100 | ✅ | - |
| `hideDelay` | 浮层隐藏延时 | `number` | 100 | ✅ | - |
| `destroyOnHide` | 隐藏时是否销毁浮层 | `boolean` | `false` | ✅ | - |
| `autoAdjust` | 浮层被遮挡时自动调整位置 | `boolean` | `false` | ✅ | - |

#### Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 触发浮层的 trigger |
