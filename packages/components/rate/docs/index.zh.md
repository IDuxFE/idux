---
category: components
type: 数据录入
title: Rate
subtitle: 评分
cover: 评分组件
---



## 何时使用

- 对某个内容进行评分或展示评分

## API

### `ix-rate`

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 高亮的数目（分数） | `number` | `0`| - | - |
| `count` | 图标数目 | `number` | `5` | ✅ | - |
| `icon` | 自定义图标名称 | `string` | `star` | ✅ | - |
| `allowHalf` | 支持半分（选） | `boolean` | `false` | ✅ | - |
| `disabled` | 只读模式 | `boolean` | `false` | - |-|
| `tooltips` | 每一个元素的悬浮提示信息 | `Array` | `[]` | - |-|
| `allowClear` | 二次点击元素后清除选择 | `boolean` | `false` | ✅ |-|

### Emits

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `change` | 点击评分元素时触发 | `number` | - |
