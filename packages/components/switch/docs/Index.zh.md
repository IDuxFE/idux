---
category: components
type: 数据录入
title: Switch
subtitle: 开关切换器
order: 0
---

一个开关切换器，用于开启状态、关闭状态之间的切换

## 何时使用

需要开启或关闭状态的时候

## API

### ix-switch

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `checked(v-model)` | 确定切换器状态是否开启 | `boolean` | `false` | - | - |
| `checkedChildren` | 开启时切换器内部的文案 | `string` | - |  也可通过slot自定义 |
| `disabled` | 是否禁止操作切换器 | `boolean` | `false`| - | - |
| `loading` | 是否处于加载中（加载时不允许改变切换器的当前状态） | `boolean` | `false` | - | - |
| `size` | 切换器的大小 | `'medium'\|small` | `medium` | - | - |
| `unCheckedChildren` | 关闭时切换器内部的文案 | `string` | - |  也可通过slot自定义 |

#### Slots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `checkedChildren` | 自定义切换器在开启时内部的内容 | - | - |
| `unCheckedChildren` | 自定义切换器在关闭时内部的内容 | - | - |

#### Emits

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `change` | 当checked改变时触发 | `Function(checked:boolean)` | - |

#### Methods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur()` | 使切换器失去焦点的方法 | - | - |
| `focus()` | 使切换器获得焦点的方法 | - | - |
