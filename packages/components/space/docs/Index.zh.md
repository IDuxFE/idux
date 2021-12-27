---
category: components
type: 布局
title: Space
subtitle: 间距
cover:
---

## API

### IxSpace

#### SpaceProps

| 属性 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `align` | 对齐方式 | `'start' \| 'center' \| 'end' \| 'baseline'` | - | - | `horizontal` 时，默认为 `center` |
| `block` | 将内容宽度调整为自适应其父元素的宽度 | `boolean` | - | - | 仅在`direction`为 `vertical` 时生效 |
| `direction` | 间距方向 | `'horizontal' \| 'vertical'` | `'horizontal'` | - | - |
| `size` | 间距大小 | `number \| string \| [number \| string, number \| string] \| 'sm' \| 'md' \| 'lg'` | `sm` | ✅  | 默认使用 [`flex` 布局的 `gap` 属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gap), 如果遇到不兼容的浏览器，会使用 `margin` 代替。 如果传入一个数组，那么分别表示 `[rowGap, columnGap]` |
| `split` | 设置间隔分割符 | `string \| #split` | - | - | - |
| `wrap` | 是否自动换行 | `boolean` | `true` | ✅ | - |

#### SpaceSlots

| 属性 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 需要被间隔的内容 | - | - |
