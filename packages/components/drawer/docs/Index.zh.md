---
category: components
type: 反馈
title: Drawer
subtitle: 抽屉
order: 0
---

## 介绍

在不离开原页面状态下，从页面边缘滑出的浮层面板。与原页面有较强的连贯性，操作完成后，可以平滑地回到原任务。

## 使用场景

### 什么情况下使用？

- 当需要一个附加的面板来承载原页面内容时，这个面板可以快捷的呼出和关闭。
- 原页面有一组对象信息需要查看、对比和操作，完成任务需要来回切换。如：查看详情。
- 快速查看某一项信息时，内容较多气泡框承载不了，可以用抽屉。如：查看帮助文档。
- 当需要在当前任务流中插入临时任务，原页面有一组或较多对象需要创建或编辑的表单内容。

### 什么情况下不使用？

- 页面结构复杂、扩展性强，建议使用新页面。
- 当需要更加专注聚焦的处理信息，与父级页面关联性弱，无需频繁切换操作，请使用弹窗。

## API

### IxDrawer

#### DrawerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:visible` | 是否可见 | `boolean` | `false` | - | - |
| `closable` | 是否显示右上角的关闭按钮 | `boolean` | `true` | ✅ | - |
| `closeIcon` | 自定义关闭图标 | `string \| VNode \| #closeIcon='{onClose}'` | `close` | ✅ | - |
| `closeOnEsc` | 是否支持键盘 `esc` 关闭 | `boolean` | `true` | ✅ | - |
| `destroyOnHide` | 关闭时销毁子元素 | `boolean` | `false` | - | - |
| `footer` | 自定义底部按钮 | `DrawerButtonProps[] \| VNode \| #footer` | - | - | - |
| `header` | 抽屉的标题 | `sting \| HeaderProps \| #header={closable, closeIcon, onClose}` | - | - | - |
| `height` | 抽屉高度 | `sting \| number` | `'256'` | ✅ | 默认值仅在 `placement为` 为 `top/bottom` 时生效，其他情况默认为 `100%` |
| `mask` | 是否展示蒙层 | `boolean` | `true` | ✅ | - |
| `maskClosable` | 点击蒙层是否允许关闭 | `boolean` | `true` | ✅ | - |
| `offset` | 抽屉偏移量 | `number \| string` | `0` | - |  `placement` 为`start/end` 时, 为顶部偏移量，`top/bottom` 时, 为左边偏移量 |
| `placement` | 抽屉打开方向 | `'top' \| 'bottom' \| 'start' \| 'end'` | `'end'` | - | - |
| `width` | 抽屉宽度 | `sting \| number` | `'480'` | ✅ | 默认值仅在 `placement为` 为 `start/end` 时生效，其他情况默认为 `100%` |
| `wrapperClassName` | 抽屉外层容器类名 | `string` | - | - | - |
| `zIndex` | 设置抽屉的 `z-index` | `number` | `1000` | ✅ | - |
| `onAfterOpen` | 打开后的回调 | `() => void` | - | - | - |
| `onAfterClose` | 关闭后的回调 | `() => void` | - | - | - |
| `onClose` | 点击蒙层或关闭图标的回调 | `(evt?: Event \| unknown) => unknown` | - | - | 返回 `false` 的时候，将阻止关闭 |

```ts
export interface DrawerButtonProps extends ButtonProps {
  key?: VKey
  // 按钮的文本
  text?: string
  // 按钮点击回调
  onClick?: (evt: Event) => void
}
```

#### DrawerMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `open`   | 打开当前抽屉 | `() => void`
| `close`  | 关闭当前抽屉 | `(evt?: Event \| unknown) => Promise<void>` | `evt` 参数将传给 `onClose` 回调 |

### IxDrawerProvider

如果你想通过 `useDrawer` 来创建抽屉，则你需要把组件包裹在 `IxDrawerProvider` 内部，因为这样才不会丢失应用的上下文信息。

```html
<!-- App.vue -->
<IxDrawerProvider>
  <MyComponent />
</IxDrawerProvider>

<!-- MyComponent.vue -->
<template>
  <IxButton @click="openDrawer">Open</IxButton>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useDrawer } from '@idux/components/drawer'
export default defineComponent({
  setup() {
    const drawer = useDrawer()
    const openDrawer = () => drawer.open({ header: 'Basic Drawer', content: 'Some contents..' })
    return { openDrawer }
  },
})
</script>
```

### useDrawer

可以使用 `useDrawer` 来快速创建和管理抽屉，需要注意以下几点。

- `visible` 默认为 `true`
- `destroyOnHide` 为 `true`时，销毁的不仅是子元素，而是组件实例, 会触发 `onDestroy` 回调

```ts
export const useDrawer: () => DrawerProviderRef;

export interface DrawerProviderRef {
  // 打开抽屉
  open: (options: DrawerOptions) => DrawerRef
  // 更新指定 key 的抽屉的配置信息
  update: (key: string, options: DrawerOptions) => void
  // 销毁指定 key 的抽屉
  destroy: (key: string | string[]) => void
  // 销毁所有抽屉
  destroyAll: () => void
}

export interface DrawerOptions extends DrawerProps {
  key?: string
  // 抽屉的内容
  content?: string | VNode
  // 当 content 为 VNode 时, 可以传递 props 或者绑定 ref
  contentProps?: Record<string, unknown> | VNodeProps
  // 抽屉销毁后的回调
  onDestroy?: (key: string) => void
}

export interface DrawerRef extends DrawerBindings {
  // 抽屉的唯一标识
  key: string
  // 更新当前配置信息
  update: (options: Partial<DrawerOptions>) => void
  // 销毁当前抽屉
  destroy: () => void
}
```

### DRAWER_TOKEN

可以在子组件中注入该 `token` 来获取抽屉的属性和方法，以便于控制抽屉的行为。

```ts
export const MODAL_TOKEN: InjectionKey<DrawerBindings>;
```

## FAQ

### 当路由发生改变时，如何在根组件 (App.vue) 中销毁所有抽屉？

```html
<!-- App.vue -->
<template>
  <IxDrawerProvider ref="drawerProviderRef">
     <router-view></router-view>
  </IxDrawerProvider>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { DrawerProviderInstance } from '@idux/components/drawer'

export default defineComponent({
  name: 'App',
  setup() {
    const drawerProviderRef = ref<DrawerProviderInstance>()
    const router = useRouter()

    router.afterEach(() => drawerProviderRef.value?.destroyAll())

    return { drawerProviderRef }
  },
})
</script>
```

### 如何拿到 content 实例的引用？

```html
<template>
  <IxButton @click="openDrawer">Open</IxButton>
</template>
<script setup lang="ts">
import { h, ref } from 'vue'
import { useDrawer } from '@idux/components/drawer'

const { open } = useDrawer()

const contentRef = ref()

const openDrawer = () => open({ 
  header: 'Basic Drawer', 
  content: h('div', 'Some contents...'),
  contentProps: { ref: contentRef }
})
</script>
```
