---
category: components
type: 数据展示
title: Image
subtitle: 图片
cover: 可预览的图片
---



## 何时使用

- 需要展示图片时使用。
- 加载大图时显示或加载失败时容错处理。

## API

### `ix-image`

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `src` | 图片地址 | `string` | - | - | - |
| `width` | 图像宽度 | `string \| number` | - | ✅ | - |
| `height` | 图像高度 | `string \| number` | - | ✅ | - |
| `fallback` | 加载失败容错地址 | `string` | - | ✅ | - |
| `preview` | 预览参数，为 `false` 时禁用 | `boolean` | - | - | - |
| `alt` | 图像描述 | `string` | - | - | - |
| `objectFit` | 确定图片如何适应容器框 | `string` | - | - | 同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)  |

### Emits

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `statusChange` | 图片加载状态改变时触发 | `loading\|loaded\|failed` | - |
