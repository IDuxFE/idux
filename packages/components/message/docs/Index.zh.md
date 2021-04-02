---
category: components
type: 反馈
title: Message
subtitle: 全局提示
order: 0
---

全局展示操作反馈信息。

## 何时使用

- 用于提示用户的信息，例如：成功、警告和错误等。
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

## API

### IxMessage

提供了一些服务方法，使用方式和参数如下：

- IxMessage.info(content, [options])
- IxMessage.success(content, [options])
- IxMessage.warn(content, [options])
- IxMessage.error(content, [options])
- IxMessage.loading(content, [options])

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `content` | 当前提示框的内容 | `string \| VNode` | - | - | - |
| `options` | 设置针对当前提示框的参数，见下方表格 | `MessageOptions` | - | - | - |

`options` 支持的参数如下:

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `destroyOnHover` | 鼠标悬浮时自动销毁 | `boolean` | `false` | ✅ | - |
| `duration` | 自动销毁的延时，单位毫秒 | `number` | `3000` | ✅ | 设置为 `0` 时不自动销毁 |
| `icon` | 自定义图标 | `string \| VNode` | - | - | - |
| `id` | 提示的唯一标识 | `string` | - | - | - |
| `onDestroy` | 当前提示框关闭时触发的回调函数 | `(id: string) => void` | - | - | - |

### 额外全局配置

**通过 `useGlobalConfig` 设置全局配置暂不生效**

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `maxCount` | 最大显示提示框的数量 | `number` | `5` | ✅ | 超过限制时，最早的消息会被自动关闭 |
| `top` | 消息距离顶部的位置 | `string \| number` | `60px` | ✅ | - |

### 其他方法

- 全局销毁：`IxMessage.destroy`

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `id` | 需要销毁的提示框的唯一标识 | `string \| string[]` | - | - | 为空时，销毁所有提示框 |
