---
category: components
type: 数据展示
title: Tooltip
subtitle: 文字提示
order: 0
---

简单的文字提示气泡框。

## 何时使用

鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。

可用来代替系统默认的 `title` 提示，提供一个 `按钮/文字/操作` 的文案解释。

## API

### `ix-tooltip`

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `title` | 浮层的标题 | `string \| v-slot: title` | - | - | - |
| `placement` | 浮层的对齐方式 | `Placement` | `top` | ✅ | - |
| `visible` | 是否显隐 | `boolean` | - | - | - |
| `trigger` | 浮层触发方式 | `OverlayTrigger` | `hover` | ✅ | - |
| `showDelay` | 浮层显示延时 | `number` | 100 | ✅ | - |
| `hideDelay` | 浮层隐藏延时 | `number` | 500 | ✅ | - |
| `destroyOnHide` | 隐藏时是否销毁浮层 | `boolean` | `false` | ✅ | - |
| `autoAdjust` | 浮层被遮挡时自动调整位置 | `booleaan` | `true` | ✅ | TODO |

#### Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 触发浮层的 trigger |

#### Emits

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| `visibleChange` | 浮层显隐变化回调 | `(visible: boolean) => void` |
