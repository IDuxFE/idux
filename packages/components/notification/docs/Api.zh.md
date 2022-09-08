## API

### globalConfig

全局的通知提醒配置

| 名称 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `maxCount` | 同一时间可展示的最大提示数量 | `number` | `5` | - |
| `destroyOnHover` | 鼠标悬浮时是否允许销毁 | `boolean` | `false` | - |
| `duration` | 自动销毁的延时，单位毫秒 | `number` | `4500` | - |
| `icon` | 自定义通知图标映射表 | `Partial<Record<NotificationType, string \| VNode>>` | `{ success: 'check-circle', error: 'close-circle', info: 'info-circle', warning: 'exclamation-circle' }` | - |
| `closeIcon` | 自定义关闭图标 | `string \| VNode` | `close` | - |
| `offset` | 通知消息弹出时，距离边缘的位置 | `number \| string \|[number \| string, number \| string]` | `24` | number时：单位为px；<br/>string时：可为`vh` \ `vw` \| `%` \| `px`；<br/>array时：[上下边缘，左右边缘]；<br />设置为非array时上下边缘和左右边缘相等 |
| `placement` | 弹出的位置 | `'topStart' \| 'topEnd' \| 'bottomStart' \| 'bottomEnd'` | `'topEnd'` | - |

### IxNotificationProvider

通过 `useNotification` 来创建通知，需要把组件包裹在 `IxNotificationProvider` 内部，因为这样才不会丢失应用的上下文信息。

#### NotificationProviderProps

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `container` | 自定义通知框容器节点 | `string \| HTMLElement \| () => string \| HTMLElement` | - | ✅ | - |
| `maxCount` | 同一时间可展示的最大提示数量 | `number` | 5 | ☑️ | - |
| `offset` | 通知消息弹出时，距离边缘的位置 | `number \| string \|[number \| string, number \| string]` | 24 | ☑️ | number时：单位为px；<br/>string时：可为`vh`或者`%`；<br/>array时：[上下边缘，左右边缘]；<br />设置为非array时上下边缘和左右边缘相等 |

```html
<!-- App.vue -->
<IxNotificationProvider>
 <MyComponent />
</IxNotificationProvider>

<!-- MyComponent.vue -->
<template>
 <IxButton @click="openNotification">Open</IxButton>
</template>

<script setup lang="ts">
import { useNotification } from '@idux/components/notification'

const notification = useNotification()
const openNotification = ()=> notification.info({
 title: 'info',
 content: 'this is a notification'
})
</script>
```

#### useNotification

可以使用 `useNotification` 来快速创建和管理通知提醒信息。

##### NotificationOption

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `destroyOnHover` | 鼠标悬浮时是否允许销毁 | `boolean` | `false` | ☑️ | - |
| `duration` | 自动销毁的延时，单位毫秒 | `number` | 4500 | ☑️ | - |
| `icon` | 自定义通知图标 | `string \| VNode` | - | - | - |
| `closeIcon` | 自定义关闭图标 | `string \| VNode` | - | - | - |
| `type` | 通知类型 | `'info' \| 'success' \| 'warning' \| 'error'` | - | - | - |
| `key` | 唯一标识 | `string \| number \| symbol` | - | - | - |
| `placement` | 弹出的位置 | `'topStart' \| 'topEnd' \| 'bottomStart' \| 'bottomEnd'` | `'topEnd'` | ☑️ | - |
| `title` | 通知的标题 | `string \| VNode` | - | - | 必填 |
| `content` | 通知的内容 | `string \| VNode` | - | - | 必填 |
| `footer` | 自定义底部按钮 | `string \| VNode \| ButtonProps[]` | - | - | 底部区域flex布局 |
| `onDestroy` | 关闭通知时触发的回调 | `(key: VKey) => void` | - | - | - |

```ts
export const useNotification: () => NotificationProviderRef;

export interface NotificationProviderRef {
 // 打开通知提醒
 open: (options: NotificationProps) => NotificationRef
 info: (options: Omit<NotificationProps, 'type'>) => NotificationRef
 success: (options: Omit<NotificationProps, 'type'>) => NotificationRef
 warning: (options: Omit<NotificationProps, 'type'>) => NotificationRef
 error: (options: Omit<NotificationProps, 'type'>) => NotificationRef
 // 更新指定 key 的通知的配置
 update: (key: VKey, options: Omit<NotificationProps, 'key'>) => void
 // 销毁指定 key 的通知信息
 destroy: (key: VKey | VKey[]) => void
 // 销毁所有通知信息
 destroyAll: () => void
}

export interface NotificationRef {
 // 通知提醒的唯一标识
 key: VKey
 // 更新当前配置信息
 update: (options: Partial<NotificationOptions>) => void
 // 销毁当前通知提醒
 destroy: () => void
}
```

### 拿到 content 实例的引用

当 content 为 VNode 时，可以通过 contentProps 传入一个 ref 引用。

```html
<template>
 <IxButton @click="openNotification">Open</IxButton>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { useNotification } from '@idux/components/notification'

const { open } = useNotification()

const contentRef = ref()

const openNotification = () => open({ 
 title: 'Basic Notification', 
 content: h('div', 'Some contents...'),
 contentProps: { ref: contentRef }
})
</script>
```
