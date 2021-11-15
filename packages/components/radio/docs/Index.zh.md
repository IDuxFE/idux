---
category: components
type: 数据录入
title: Radio
subtitle: 单选框
---

- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

## API

### IxRadio

#### RadioProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:checked` | 是否选中 | `boolean` | - | - | - |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `autofocus` | 是否以自动聚焦 | `boolean` | `false` | - | - |
| `buttoned` | 是否以按钮显示 | `boolean` | `false` | - | - |
| `disabled` | 是否为禁用状态 | `boolean` | `false` | - | - |
| `label` | 单选框的文本 | `string \| #default` | `false` | - | - |
| `mode` | 按钮类型 | `'default' \| 'primary'`| `'default'` | - | 仅 `buttoned` 为 `true` 时生效  |
| `size` | 按钮大小 | `'sm' \| 'md' \| 'lg'`| `'md'` | ✅ | 仅 `buttoned` 为 `true` 时生效 |
| `value` | 设置单选框的值，与 `IxRadioGroup` 配合使用 | `any`| - | - | - |
| `onChange` | 选中状态发生变化后的回调 | `(checked: boolean) => void`| - | - | - |
| `onBlur` | 失去焦点后触发 | `(evt: FocusEvent) => void`| - | - | - |
| `onFocus` | 获取焦点后触发 | `(evt: FocusEvent) => void`| - | - | - |

#### RadioMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur` | 移除焦点 | `(options?: FocusOptions) => void` | - |
| `focus` | 获取焦点 | - | - |

### IxRadioGroup

#### RadioGroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 当前选中的值 | `any` | - | - | - |
| `buttoned` | 设置单选框组内 `IxRadio` 的 `buttoned` | `boolean` | - | - | - |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `disabled` | 设置单选框组内 `IxRadio` 的 `disabled` | `boolean` | - | - | - |
| `gap` | 设置单选框组内的 `IxRadio` 的间隔 | `number \| string` | - | - | - |
| `name` | 设置单选框组内的 `IxRadio` 的原生 `name` 属性 | `string` | - | - | - |
| `mode` | 设置单选框组内 `IxRadio` 的 `mode` | `'default' \| 'primary'`| - | - | - |
| `options` | 以配置形式设置子元素 | `RadioOption[]`| - | 优先级高于 `default` 插槽 |  |
| `size` | 设置单选框组内 `IxRadio` 的 `size` | `'sm' \| 'md' \| 'lg'`| `'md'` | - | - |
| `onChange` | 选中值发生变化后的回调 | `(value: any) => void`| - | - | - |
