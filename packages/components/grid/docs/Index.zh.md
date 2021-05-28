---
category: components
type: 布局
title: Grid
subtitle: 栅格布局
order: 0
---



## 何时使用

## API

### ix-row

#### Props

| 名称      | 说明                                                         | 类型                  | 默认值  | 全局配置 | 备注 |
| --------- | ------------------------------------------------------------ | --------------------- | ------- | -------- | ---- |
| `align`   | flex 布局下的垂直对齐方式                                    | `string`              | `top`   | -        | -    |
| `gutter`  | 栅格间隔, 支持配置数字, 对象和数组, 其中对象结构形如 `{ xs: 8, sm: 16 }`, 数组结构同时设置 `[水平间距, 垂直间距]`形如 `[8, 8]`或`[{ xs: 8 }, { xs: 8}]` | `string\|number\|object\|array` | `0`     | -        | -    |
| `justify` | flex 布局下的水平排列方式：`start` `end` `center` `space-around` `space-between` | `string`              | `start` | -        | -    |
| `wrap`    | 是否自动换行                                                 | `boolean`             | true    | ✅        | -    |

#### Slots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| default | 默认 | - | - |

### ix-col

#### Col Props

| 名称     | 说明                                                         | 类型            | 默认值 | 全局配置 | 备注 |
| -------- | ------------------------------------------------------------ | --------------- | ------ | -------- | ---- |
| `flex`   | flex 属性                                                    | `string/number` | -      | -        | -    |
| `offset` | 栅格左侧的间隔格数，间隔内不可以有栅格                       | `number`        | `0`    | -        | -    |
| `order`  | 栅格顺序                                                     | `number`        | `0`    | -        | -    |
| `pull`   | 栅格向左移动格数                                             | `number`        | `0`    | -        | -    |
| `push`   | 栅格向右移动格数                                             | `number`        | `0`    | -        | -    |
| `span`   | 栅格占位格数                                                 | `number`        | -      | -        | -    |
| xs       | `屏幕 < 600px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | `number/object` | -      | -        | -    |
| sm       | `屏幕 >= 600px` 响应式栅格，同上                             | `number/object` | -      | -        | -    |
| md       | `屏幕 >= 1024px` 响应式栅格，同上                            | `number/object` | -      | -        | -    |
| lg       | `屏幕 >= 1280px` 响应式栅格，同上                            | `number/object` | -      | -        | -    |
| xl       | `屏幕 >= 1720px` 响应式栅格，同上                            | `number/object` | -      | -        | -    |
