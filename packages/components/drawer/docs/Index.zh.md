---
category: components
type: 反馈
title: Drawer
subtitle: 抽屉
order: 0
---


屏幕边缘滑出的浮层面板。

## 何时使用

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。

## API

### ix-drawer

#### DrawerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:visible` | 是否显示Drawer | `boolean` | false | -
| `title` | 标题，也可通过slot传入 | `string\|v-slot:title` | - | - | 不传则不显示
| `footer` | 底部，也可通过slot传入 | `string\|v-slot:footer` | - | - | 不传则不显示
| `closable` | 是否展示关闭按钮 | `boolean` | true | ✅
| `placement` | 抽屉打开方向 | `string` | 'right' | - | 可选值`top` / `right` / `bottom` / `left`
| `width` | 宽度 | `number/string` | 30%/100% | - | placement为`left`/`right`时默认30%，`top`/`bottom`时默认100%
| `height` | 高度 | `number/string` | 30%/100% | - | placement为`top`/`bottom`时默认30%，`left`/`right`时默认100%
| `offset` | 顶部/左边偏移量 | `number/string` | 0 | - |  placement为`left`/`right`时顶部偏移量，`top`/`bottom`时左边偏移量
| `mask` | 是否展示蒙层遮罩 | `boolean` | true | ✅
| `maskClosable` | 点击蒙层是否允许关闭 | `boolean` | true | ✅
| `containerClassName` | Drawer外层容器的类名 | `string` | - | ✅
| `destroyOnHide` | 关闭时销毁Drawer里的子元素 | `boolean` | false | -
| `closeOnEsc` | 是否支持键盘 `esc` 关闭 | `boolean` | true | ✅ | - |
| `onClose` | 关闭抽屉前回调 | `(evt?: Event \| unknown) => unknown` | - | - | 返回 `false` 的时候，将阻止关闭 |
| `onAfterOpen`  | Drawer 打开抽屉后的回调 | `() => void`
| `onAfterClose` | Drawer 关闭抽屉后的回调 | `() => void`

#### Slots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | Drawer 的默认内容   | - | -
| `title`   | Drawer 标题区的内容 | - | `slot`形式优先级高于`prop`
| `footer`  | Drawer 底部区的内容 | - | `slot`形式优先级高于`prop`

#### Methods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `open`   | 打开当前抽屉 | `() => void`
| `close`  | 关闭当前抽屉 | `(evt?: Event \| unknown) => Promise<void>` | evt 参数将传给 onClose 回调
