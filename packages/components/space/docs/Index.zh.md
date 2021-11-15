---
category: components
type: 布局
title: Space
subtitle: 间距
cover:
---

设置组件之间的间距。

## 何时使用

避免组件紧贴在一起，拉开统一的空间。

- 适合行内元素的水平间距。

- 可以设置各种水平对齐方式。

## API

### IxSpace

#### SpaceProps

| 属性 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `align` | 对齐方式 | `'start' \| 'center' \| 'end' \| 'baseline'` | - | - | `horizontal` 时，默认为 `center` |
| `direction` | 间距方向 | `'horizontal' \| 'vertical'` | `'horizontal'` | - | - |
| `gap` | 间距大小 | `number \| string \| [number \| string, number \| string]` | `8` | ✅  | 默认使用 [`flex` 布局的 `gap` 属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gap), 如果遇到不兼容的浏览器，会使用 `margin` 代替。 如果传入一个数组，那么分别表示 `[rowGap, columnGap]` |
| `split` | 设置间隔分割符 | `string \| #split` | - | - | - |
| `wrap` | 是否自动换行 | `boolean` | `true` | ✅ | - |

```ts
export type SpaceSize = 'sm' | 'md' | 'lg' | number
```

#### SpaceSlots

| 属性 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 需要被间隔的内容 | - | - |
