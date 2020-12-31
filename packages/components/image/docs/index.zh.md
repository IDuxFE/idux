---
category: components
type: 通用
title: Image
subtitle: 图片
cover: 可预览的图片
---



## 何时使用

- 需要展示图片时使用。
- 加载大图时显示或加载失败时容错处理。

## API

| 属性 | 说明 | 类型  | 全局配置 |
| --- | --- | --- | --- |
| alt | 图像描述| string | - |
| fallback | 加载失败容错地址| string | - |
|height|图像高度|string \| number|-|
|preview|预览参数，为`false` 时禁用|boolean|-|
|src|图片地址|string|-|
|width|图像宽度|string \| number|-|
|objectFit|确定图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)|string|-|

### Events

| 事件名称 | 说明 | 参数类型 |
| --- | --- | --- |
| statusChange | 图片加载状态改变时触发 | `loading\|loaded\|failed` |
