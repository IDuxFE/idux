---
category: components
type: 数据录入
title: Switch
subtitle: 开关
order: 0
---

## API

### IxSwitch

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:checked` | 确定切换器状态是否开启 | `boolean` | `false` | - | - |
| `disabled` | 是否禁止操作切换器 | `boolean` | `false`| - | - |
| `loading` | 是否处于加载中（加载时不允许改变切换器的当前状态） | `boolean` | `false` | - | - |
| `size` | 切换器的大小 | `'md' \| 'sm'` | `'md'` | - | - |
| `checkedChildren` | 开启时切换器内部的文案 | `string \| #slot` | - | - | 插槽优先级更高 |
| `unCheckedChildren` | 关闭时切换器内部的文案 | `string \| #slot` | - | - | 插槽优先级更高 |
| `onFocus` | 获取焦点后触发的回调 | `(evt: FocusEvent) => void`| - | - | - |
| `onBlur` | 失去焦点后触发的回调 | `(evt: FocusEvent) => void`| - | - | - |

#### Methods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur()` | 使切换器失去焦点的方法 | - | - |
| `focus()` | 使切换器获得焦点的方法 | - | - |
