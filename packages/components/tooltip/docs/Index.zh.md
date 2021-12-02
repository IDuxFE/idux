---
category: components
type: 数据展示
title: Tooltip
subtitle: 文字提示
order: 0
---

简单的文字提示气泡框。

- 鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。
- 可用来代替系统默认的 `title` 提示，提供一个 `按钮/文字/操作` 的文案解释。

## API

### IxTooltip

#### TooltipProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:visible` | 是否显隐 | `boolean` | - | - | - |
| `autoAdjust` | 浮层被遮挡时自动调整位置 | `boolean` | `true` | ✅ | - |
| `destroyOnHide` | 隐藏时是否销毁浮层 | `boolean` | `false` | ✅ | - |
| `delay` | 浮层显示隐藏延时 | `number \| [number, number]` | `100` | ✅ | - |
| `placement` | 浮层的对齐方式 | `OverlayPlacement` | `top` | ✅ | - |
| `target` | 自定义容器节点 | `string \| HTMLElement \| () => string \| HTMLElement` | ✅ | - | - |
| `title` | 浮层的标题 | `string \| #title` | - | - | - |
| `trigger` | 浮层触发方式 | `PopperTrigger` | `hover` | ✅ | - |

#### TooltipSlots

| 名称 | 说明 |
| --- | --- |
| `default` | 触发浮层的 trigger |
