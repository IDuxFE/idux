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
| `v-model:visible` | 是否可见 | `boolean` | `false` | - | - |
| `destroyOnHover` | 鼠标悬浮时自动销毁 | `boolean` | `false` | ✅ | - |
| `duration` | 自动销毁的延时，单位毫秒 | `number` | - | - | 传入 `0` 表示不自动销毁 |
| `icon` | 自定义图标 | `string \| VNode` | - | ✅ | - |
| `type` | 提示类型 | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading'`  | `info` | - | - |

### IxMessageProvider

如果你想通过 `useMessage` 来创建对话框，则你需要把组件包裹在 `IxMessageProvider` 内部，因为这样才不会丢失应用的上下文信息。

#### MessageProviderProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `maxCount` | 同一时间可展示的最大提示数量 | `number` | `5` | ✅ | - |
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
<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@idux/components/message'
export default defineComponent({
  setup() {
    const message = useMessage()
    const openMessage = ()=> message.open('This is a message')
    return { openMessage }
  },
})
</script>
```

### useMessage

可以使用 `useMessage` 来快速创建和管理对话框。

```ts
export const useMessage: () => MessageProviderRef;

export interface MessageProviderRef {
  // 打开对话框
  open: (options: MessageOptions) => MessageRef
  info: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  success: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  warning: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  error: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  loading: (content: string | VNode, options?: Omit<MessageOptions, 'type' | 'content'>) => MessageRef
  // 更新指定 key 的对话框的配置信息
  update: (key: string, options: MessageOptions) => void
  // 销毁指定 key 的对话框
  destroy: (key: string | string[]) => void
  // 销毁所有对话框
  destroyAll: () => void
}

export interface MessageOptions extends MessageProps {
  key?: string
  // 对话框的内容
  content?: string | VNode
}

export interface MessageRef {
  // 对话框的唯一标识
  key: string
  // 更新当前配置信息
  update: (options: Partial<MessageOptions>) => void
  // 销毁当前对话框
  destroy: () => void
}
```
