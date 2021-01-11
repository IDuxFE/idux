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

### `ix-space`

#### props

| 属性 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `align` | 对齐方式 | `start \| center \| end \| baseline` | `baseline` | - | - |
| `direction` | 间距方向 | `vertical \| horizontal` | `horizontal` | - | - |
| `size` | 间距大小 | `SpaceSize \| SpaceSize[]` | - | ✅ | 有三个预设间距大小，除此之外还可以传入一个数字自定义间距大小，还可以传入一个数组来控制每个间距的大小（数组长度需等于间距个数，否则组件会抛出警告） |
| `split` | 设置拆分 | `string \| v-slot: split` | - | - | 设置间隔分割符，当传入 `split` 时，内部间距会被分隔符替代；除了这种方式，你还可以设置 `v-slot: split` 的方式设置分隔符，优先级高于 prop |
| `wrap` | 是否换行 | `boolean` | `false` | - | 仅在 `horizontal` 时生效 |

```typescript
type SpaceSize = 'small' | 'medium' | 'large' | number
```

#### slots

| 属性      | 说明             | 参数类型 | 备注 |
| --------- | ---------------- | -------- | ---- |
| `default` | 需要被间隔的内容 | -        | -    |
