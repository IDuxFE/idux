---
category: components
type: 数据录入
title: Radio
subtitle: 单选框
---

- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

## API

### ix-radio

#### RadioProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:checked` | 是否选中 | `boolean` | `false` | - | - |
| `autofocus` | 是否以自动聚焦 | `boolean` | `false` | - | - |
| `buttoned` | 是否以按钮显示 | `boolean` | `false` | - | - |
| `disabled` | 是否为禁用状态 | `boolean` | `false` | - | - |
| `label` | 单选框的文本 | `string \| #default` | `false` | - | - |
| `mode` | 按钮类型 | `'default' \| 'primary'`| `'default'` | - | 仅 `buttoned` 为 `true` 时生效  |
| `size` | 按钮大小 | `'large' \| 'medium' \| 'small'`| `'medium'` | ✅ | 仅 `buttoned` 为 `true` 时生效 |
| `value` | 设置单选框的值，与 `ix-radio-group` 配合使用 | `any`| - | - | - |
| `onBlur` | 失去焦点后触发 | `(evt: FocusEvent) => void`| - | - | - |
| `onChange` | 选中状态发生变化后的回调 | `(checked: boolean) => void`| - | - | - |
| `onFocus` | 获取焦点后触发 | `(evt: FocusEvent) => void`| - | - | - |

#### RadioMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur` | 移除焦点 | `(options?: FocusOptions) => void` | - |
| `focus` | 获取焦点 | - | - |

### ix-radio-group

#### RadioGroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 当前选中的值 | `any` | - | - | - |
| `buttoned` | 设置单选框组内 `ix-radio` 的 `buttoned` | `boolean` | - | - | - |
| `disabled` | 设置单选框组内 `ix-radio` 的 `disabled` | `boolean` | - | - | - |
| `name` | 设置单选框组内的 `ix-radio` 的原生 `name` 属性 | `string` | - | - | - |
| `mode` | 设置单选框组内 `ix-radio` 的 `mode` | `'default' \| 'primary'`| - | - | - |
| `options` | 以配置形式设置子元素 | `RadioOptions[]`| - | - | - |
| `size` | 设置单选框组内 `ix-radio` 的 `size` | `'large' \| 'medium' \| 'small'`| - | - | - |
| `onChange` | 选中值发生变化后的回调 | `(value: any) => void`| - | - | - |

#### RadioGroupSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 设置单选框组的 `ix-radio` | - | - |
