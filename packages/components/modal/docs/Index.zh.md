---
category: components
type: 反馈
title: Modal
subtitle: 对话框
order: 0
---

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `IxModal` 在当前页面正中打开一个浮层，承载相应的操作。

另外当需要一个简洁的确认框询问用户时，可以使用精心封装好的 `useModal` 等方法。

推荐使用封装好的组件 (`Component`) 作为 `IxModal` 的默认插槽，或 `useModal` 的 `content` 参数，这样 `Component` 内的逻辑可以完全隔离、并且可以做到随时复用。

在 `Component` 中可以注入 `MODAL_TOKEN`, 以获取对话框组件的属性和方法，用于控制对话框的行为。

## API

### IxModal

#### ModalProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:visible` | 是否可见 | `boolean` | `false` | - | - |
| `cancelButton` | 取消按钮的属性 | `ButtonProps` | - | - | - |
| `cancelText` | 取消按钮的文本 | `string` | `取消` | - | - |
| `centered` | 垂直居中展示 | `boolean` | `false` | ✅ | - |
| `closable` | 是否显示右上角的关闭按钮 | `boolean` | `true` | ✅ | - |
| `closeIcon` | 自定义关闭图标 | `string \| VNode \| #closeIcon='{onClose}'` | `close` | ✅ | - |
| `closeOnEsc` | 是否支持键盘 `esc` 关闭 | `boolean` | `true` | ✅ | - |
| `containerClassName` | 浮层容器类名 | `string` | - | - | - |
| `destroyOnHide` | 关闭时销毁子元素 | `boolean` | `false` | - | - |
| `footer` | 自定义底部按钮 | `ModalButtonProps[] \| VNode \| #footer` | - | - | 默认会根据 `type` 的不同渲染相应的按钮，如果传入 `null` 则不显示 |
| `header` | 对话框标题 | `sting \| HeaderProps \| #header` | - | - | - |
| `icon` | 自定义图标 | `string \| VNode \| #icon` | - | ✅ | 当 `type` 不为 `default` 时有效 |
| `mask` | 是否展示蒙层 | `boolean` | `true` | ✅ | - |
| `maskClosable` | 点击蒙层是否允许关闭 | `boolean` | `true` | ✅ | - |
| `okButton` | 确认按钮的属性 | `ButtonProps` | - | - | - |
| `okText` | 确认按钮的文本 | `string` | `确定` | - | - |
| `title` | 对话框次标题 | `sting  \| VNode \| #title` | - | - | 当 `type` 不为 `default` 时有效 |
| `type` | 对话框类型 | `'default' \| 'confirm' \| 'info' \| 'success' \| 'warning' \| 'error'` | `default` | - | - |
| `width` | 对话框宽度 | `sting \| number` | `520` | ✅ | - |
| `zIndex` | 设置对话框的 `z-index` | `number` | `1000` | ✅ | - |
| `onAfterOpen` | 打开后的回调 | `() => void` | - | - | - |
| `onAfterClose` | 关闭后的回调 | `() => void` | - | - | - |
| `onClose` | 点击遮罩层或关闭图标的回调 | `(evt?: Event \| unknown) => unknown` | - | - | 返回 `false` 的时候，将阻止关闭 |
| `onCancel` | 点击取消按钮的回调 | `(evt?: Event \| unknown) => unknown` | - | - | 执行完回调后，默认会关闭对话框，返回 `false` 的时候，将阻止关闭 |
| `onOk` | 点击确认按钮的回调 | `(evt?: Event \| unknown) => unknown` | - | - | 执行完回调后，默认会关闭对话框，返回 `false` 的时候，将阻止关闭 |

```ts
export interface ModalButtonProps extends ButtonProps {
  // 按钮的文本
  text?: string
  // 是否显示该按钮, 默认为 true
  visible?: boolean
  // 按钮点击回调
  onClick?: (evt: Event) => void
}
```

#### ModalBindings

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `open` | 打开当前对话框 | `() => void` | - | - | - |
| `close` | 关闭当前对话框 | `(evt?: Event \| unknown) => Promise<void>` | - | - | `evt` 参数将传给 `onClose` 回调 |
| `cancel` | 手动触发当前取消按钮 | `(evt?: Event \| unknown) => Promise<void>` | - | - | `evt` 参数将传给 `onCancel` 回调 |
| `ok` | 手动触发当前确定按钮 | `(evt?: Event \| unknown) => Promise<void>` | - | - | `evt` 参数将传给 `onOk` 回调 |

### IxModalProvider

如果你想通过 `useModal` 来创建对话框，则你需要把组件包裹在 `IxModalProvider` 内部，因为这样才不会丢失应用的上下文信息。

```html
<!-- App.vue -->
<IxModalProvider>
  <MyComponent />
</IxModalProvider>

<!-- MyComponent.vue -->
<template>
  <IxButton @click="openModal">Open</IxButton>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useModal } from '@idux/components/modal'
export default defineComponent({
  setup() {
    const modal = useModal()
    const openModal = ()=> modal.open({ header: 'Basic Modal', content: 'Some contents..' })
    return { openModal }
  },
})
</script>
```

### useModal

可以使用 `useModal` 来快速创建和管理对话框，需要注意以下几点。

- `visible` 默认为 `true`
- `destroyOnHide` 默认为 `true`, 并且销毁的不仅是子元素，而是组件实例, 会触发 `onDestroy` 回调

```ts
export const useModal: () => ModalProviderRef;

export interface ModalProviderRef {
  // 打开对话框
  open: (options: ModalOptions) => ModalRef
  confirm: (options: Omit<ModalOptions, 'type'>) => ModalRef
  info: (options: Omit<ModalOptions, 'type'>) => ModalRef
  success: (options: Omit<ModalOptions, 'type'>) => ModalRef
  warning: (options: Omit<ModalOptions, 'type'>) => ModalRef
  error: (options: Omit<ModalOptions, 'type'>) => ModalRef
  // 更新指定 id 的对话框的配置信息
  update: (id: string, options: ModalOptions) => void
  // 销毁指定 id 的对话框
  destroy: (id: string | string[]) => void
  // 销毁所有对话框
  destroyAll: () => void
}

export interface ModalOptions extends ModalProps {
  id?: string
  // 对话框的内容
  content?: string | VNode
  // 对话框销毁后的回调
  onDestroy?: (id: string) => void
}

export interface ModalRef extends ModalBindings {
  // 对话框的唯一标识
  id: string
  // 更新当前配置信息
  update: (options: Partial<ModalOptions>) => void
  // 销毁当前对话框
  destroy: () => void
}
```

### modalToken

可以在子组件中注入该 `token` 来获取对话框的属性和方法，以便于控制对话框的行为。

```ts
export const modalToken: InjectionKey<ModalBindings & { props: ModalProps }>;
```

## FAQ

### 当路由发生改变时，如何在根组件 (App.vue) 中销毁所有对话框？

```html
<!-- App.vue -->
<template>
  <IxModalProvider ref="modalProviderRef">
     <router-view></router-view>
  </IxModalProvider>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ModalProviderInstance } from '@idux/components/modal'

export default defineComponent({
  name: 'App',
  setup() {
    const modalProviderRef = ref<ModalProviderInstance>()
    const router = useRouter()

    router.afterEach(() => modalProviderRef.value?.destroyAll())

    return { modalProviderRef }
  },
})
</script>
```
