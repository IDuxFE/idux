---
category: components
type: 反馈
title: Message
subtitle: 全局提示
order: 0
---

全局展示操作反馈信息。

- 用于提示用户的信息，例如：成功、警告和错误等。
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

## API

### IxMessage

#### MessageProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:visible` | 是否可见 | `boolean` | - | - | - |
| `destroyOnHover` | 鼠标悬浮时自动销毁 | `boolean` | `false` | ✅ | - |
| `duration` | 自动销毁的延时，单位毫秒 | `number` | - | - | 传入 `0` 表示不自动销毁 |
| `icon` | 自定义图标 | `string \| VNode` | - | ✅ | - |
| `type` | 提示类型 | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading'`  | `info` | - | - |
| `onClose` | 提示框关闭的回调 | `() => void` | - | - | - |

### IxMessageProvider

如果你想通过 `useMessage` 来创建提示框，则你需要把组件包裹在 `IxMessageProvider` 内部，因为这样才不会丢失应用的上下文信息。

#### MessageProviderProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `maxCount` | 同一时间可展示的最大提示数量 | `number` | `5` | ✅ | - |
| `target` | 自定义提示框容器节点 | `string \| HTMLElement \| () => string \| HTMLElement` | ✅ | - | - |
| `top` | 消息距离顶部的位置 | `number \| string` | `15%` | ✅ | - |

```html
<!-- App.vue -->
<IxMessageProvider>
  <MyComponent />
</IxMessageProvider>

<!-- MyComponent.vue -->
<template>
  <IxButton @click="openMessage">Open</IxButton>
</template>

<script setup lang="ts">
import { useMessage } from '@idux/components/message'

const message = useMessage()
const openMessage = ()=> message.open('This is a message')
</script>
```

### useMessage

可以使用 `useMessage` 来快速创建和管理提示框。

- `visible` 默认为 `true`

```ts
export const useMessage: () => MessageProviderRef;

export interface MessageProviderRef {
  // 打开提示框
  open: (options: MessageOptions) => MessageRef
  info: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  success: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  warning: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  error: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  loading: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  // 更新指定 key 的提示框的配置信息
  update: (key: VKey, options: MessageOptions) => void
  // 销毁指定 key 的提示框
  destroy: (key: VKey | VKey[]) => void
  // 销毁所有提示框
  destroyAll: () => void
}

export interface MessageOptions extends MessageProps {
  key?: string
  // 提示框的内容
  content?: string | VNode
  // 提示框销毁后的回调
  onDestroy?: (key: VKey) => void
}

export interface MessageRef {
  // 提示框的唯一标识
  key: VKey
  // 更新当前配置信息
  update: (options: Partial<MessageOptions>) => void
  // 销毁当前提示框
  destroy: () => void
}
```
