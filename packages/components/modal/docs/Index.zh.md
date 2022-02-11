---
category: components
type: 反馈
title: Modal
subtitle: 对话框
order: 0
---

## API

### IxModal

#### ModalProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:visible` | 是否可见 | `boolean` | - | - | - |
| `cancelButton` | 取消按钮的属性 | `ButtonProps` | - | - | - |
| `cancelText` | 取消按钮的文本 | `string` | `取消` | - | - |
| `centered` | 垂直居中展示 | `boolean` | `false` | ✅ | - |
| `closable` | 是否显示右上角的关闭按钮 | `boolean` | `true` | ✅ | - |
| `closeIcon` | 自定义关闭图标 | `string \| VNode \| #closeIcon='{onClose}'` | `close` | ✅ | - |
| `closeOnEsc` | 是否支持键盘 `esc` 关闭 | `boolean` | `true` | ✅ | - |
| `destroyOnHide` | 关闭时销毁子元素 | `boolean` | `false` | - | - |
| `footer` | 自定义底部按钮 | `boolean \| ModalButtonProps[] \| VNode \| #footer` | `true` | - | 默认会根据 `type` 的不同渲染相应的按钮，如果传入 `false` 则不显示 |
| `header` | 对话框标题 | `sting \| HeaderProps \| #header={closable, closeIcon, onClose}` | - | - | - |
| `icon` | 自定义图标 | `string \| VNode \| #icon` | - | ✅ | 当 `type` 不为 `default` 时有效 |
| `mask` | 是否展示蒙层 | `boolean` | `true` | ✅ | - |
| `maskClosable` | 点击蒙层是否允许关闭 | `boolean` | `true` | ✅ | - |
| `animatable` | 是否开启弹窗动画效果 | `boolean` | `true` | - | - |
| `offset` | 对话框偏移量 | `number \| string` | `128` | - |  为顶部偏移量，仅在`centered=false` 时生效 |
| `okButton` | 确认按钮的属性 | `ButtonProps` | - | - | - |
| `okText` | 确认按钮的文本 | `string` | `确定` | - | - |
| `target` | 自定义对话框容器节点 | `string \| HTMLElement \| () => string \| HTMLElement` | - | ✅ | - |
| `title` | 对话框次标题 | `sting  \| VNode \| #title` | - | - | 当 `type` 不为 `default` 时有效 |
| `type` | 对话框类型 | `'default' \| 'confirm' \| 'info' \| 'success' \| 'warning' \| 'error'` | `default` | - | - |
| `width` | 对话框宽度 | `sting \| number` | `520` | ✅ | - |
| `wrapperClassName` | 对话框外层容器类名 | `string` | - | - | - |
| `zIndex` | 设置对话框的 `z-index` | `number` | `1000` | ✅ | - |
| `onAfterOpen` | 打开后的回调 | `() => void` | - | - | - |
| `onAfterClose` | 关闭后的回调 | `() => void` | - | - | - |
| `onBeforeClose` | 蒙层关闭前的回调 | `(evt?: Event \| unknown) => void \| boolean \| Promise<boolean>` | - | - | 返回 `false` 的时候，将阻止关闭 |
| `onClose` | 点击蒙层或关闭图标的回调 | `(evt?: Event \| unknown) => void` | - | - | - |
| `onCancel` | 点击取消按钮的回调 | `(evt?: Event \| unknown) => unknown` | - | - | 执行完回调后，默认会关闭对话框，返回 `false` 的时候，将阻止关闭 |
| `onOk` | 点击确认按钮的回调 | `(evt?: Event \| unknown) => unknown` | - | - | 执行完回调后，默认会关闭对话框，返回 `false` 的时候，将阻止关闭 |

```ts
export interface ModalButtonProps extends ButtonProps {
  key?: VKey
  // 按钮的文本
  text?: string
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

<script setup lang="ts">
import { useModal } from '@idux/components/modal'

const modal = useModal()
const openModal = () => modal.open({ header: 'Basic Modal', content: 'Some contents..' })
</script>
```

### useModal

可以使用 `useModal` 来快速创建和管理对话框，需要注意以下几点。

- `visible` 默认为 `true`
- `destroyOnHide` 为 `true`时，销毁的不仅是子元素，而是组件实例, 会触发 `onDestroy` 回调

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
  // 更新指定 key 的对话框的配置信息
  update: (key: VKey, options: ModalOptions) => void
  // 销毁指定 key 的对话框
  destroy: (key: VKey | VKey[]) => void
  // 销毁所有对话框
  destroyAll: () => void
}

export interface ModalOptions extends ModalProps {
  key?: VKey
  // 对话框的内容
  content?: string | VNode
  // 当 content 为 VNode 时, 可以传递 props 或者绑定 ref
  contentProps?: Record<string, unknown> | VNodeProps
  // 对话框销毁后的回调
  onDestroy?: (key: VKey) => void
}

export interface ModalRef extends ModalBindings {
  // 对话框的唯一标识
  key: string
  // 更新当前配置信息
  update: (options: Partial<ModalOptions>) => void
  // 销毁当前对话框
  destroy: () => void
}
```

### MODAL_TOKEN

可以在子组件中注入该 `token` 来获取对话框的属性和方法，以便于控制对话框的行为。

```ts
export const MODAL_TOKEN: InjectionKey<ModalBindings>;
```

## FAQ

### 销毁所有对话框

当路由发生改变时，如何在根组件 (App.vue) 中销毁所有对话框？

```html
<!-- App.vue -->
<template>
  <IxModalProvider ref="modalProviderRef">
     <router-view></router-view>
  </IxModalProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ModalProviderInstance } from '@idux/components/modal'

const modalProviderRef = ref<ModalProviderInstance>()
const router = useRouter()

router.afterEach(() => modalProviderRef.value?.destroyAll())
</script>
```

### 拿到 content 实例的引用

当 content 为 VNode 时，可以通过 contentProps 传入一个 ref 引用。

```html
<template>
  <IxButton @click="openModal">Open</IxButton>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { useModal } from '@idux/components/modal'

const { open } = useModal()

const contentRef = ref()

const openModal = () => open({ 
  header: 'Basic Modal', 
  content: h('div', 'Some contents...'),
  contentProps: { ref: contentRef }
})
</script>
```

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@modal-max-width` | `calc(100vw - 32px)` | - | - |
| `@modal-font-size` | `@font-size-md` | - | - |
| `@modal-line-height` | `@line-height-base` | - | - |
| `@modal-background-color` | `@background-color-component` | - | - |
| `@modal-box-shadow` | `@shadow-bottom-md` | - | - |
| `@modal-border-radius` | `@border-radius-md` | - | - |
| `@modal-header-padding` | `@spacing-lg @spacing-xl @spacing-sm` | - | - |
| `@modal-body-padding` | `@spacing-sm @spacing-xl` | - | - |
| `@modal-footer-padding` | `@spacing-sm @spacing-xl @spacing-lg` | - | - |
| `@modal-footer-button-margin-left` | `@spacing-sm` | - | - |
| `@modal-footer-min-height` | `64px` | - | - |
| `@modal-body-title-font-size` | `@font-size-lg` | - | - |
| `@modal-body-title-font-weight` | `@font-weight-xl` | - | - |
| `@modal-body-title-margin-bottom` | `@spacing-sm` | - | - |
| `@modal-body-title-color` | `@text-color` | - | - |
| `@modal-body-content-font-size` | `@modal-font-size` | - | - |
| `@modal-body-content-color` | `@text-color` | - | - |
| `@modal-body-content-padding` | `0` | - | - |
| `@modal-body-icon-font-size` | `48px` | - | - |
| `@modal-body-icon-margin` | `0 @spacing-lg` | - | - |
| `@modal-body-confirm-color` | `@color-warning` | - | - |
| `@modal-body-info-color` | `@color-info` | - | - |
| `@modal-body-success-color` | `@color-success` | - | - |
| `@modal-body-warning-color` | `@color-warning` | - | - |
| `@modal-body-error-color` | `@color-error` | - | - |
| `@modal-body-typed-padding` | `0 @spacing-sm @spacing-xl` | - | - |
| `@modal-max-width-screen-sm` | `calc(100vw - 16px)` | - | - |
| `@modal-margin-screen-sm` | `@spacing-sm auto` | - | - |
<!--- insert less variable end  --->