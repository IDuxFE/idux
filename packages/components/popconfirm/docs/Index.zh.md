---
category: components
type: 反馈
title: Popconfirm
subtitle: 气泡确认框
order: 0
---

点击元素，弹出气泡式的确认框。

- 目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。
- 和 confirm 弹出的全屏居中模态对话框相比，交互形式更轻量。

## API

### IxPopconfirm

#### PopconfirmProps

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `cancelButton` | 取消按钮的属性 | `ButtonProps` | - | -  | -  |
| `cancelText` | 取消按钮的文本 | `string` | 取消  | -  | -  |
| `footer` | 自定义底部按钮 | `boolean \| ModalButtonProps[] \| VNode \| #footer` | `true` | - | 如果传入 `false` 则不显示 |
| `icon` | 自定义图标 | `string \| #icon` | - | - | - |
| `okButton` | 确认按钮的属性 | `ButtonProps` | -  | - | -  |
| `okText` | 确认按钮的文本 | `string` | 确定 | - | - |
| `onCancel` | 点击取消按钮的回调 | `(evt?: Event \| unknown) => unknown` | - | - | 执行完回调后，默认会关闭对话框，返回 `false` 的时候，将阻止关闭 |
| `onOk` | 点击确认按钮的回调 | `(evt?: Event \| unknown) => unknown` | - | - | 执行完回调后，默认会关闭对话框，返回 `false` 的时候，将阻止关闭 |

更多属性请参考 [Tooltip](/components/tooltip/zh#TooltipProps).
