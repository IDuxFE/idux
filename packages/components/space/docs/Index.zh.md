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
| `size` | 间距大小 | `SpaceSize \| SpaceSize[]` | - | ✅ | 当传入一个数组时，第一个元素表示水平间距，第二个元素表示垂直间距 |
| `split` | 设置间隔分割符 | `string \| #split` | - | - | - |
| `wrap` | 是否自动换行 | `boolean` | `true` | ✅ | - |

```ts
export type SpaceSize = 'sm' | 'md' | 'lg' | number
```

#### SpaceSlots

| 属性 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 需要被间隔的内容 | - | - |
