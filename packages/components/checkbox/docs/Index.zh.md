---
category: components
type: 数据录入
title: Checkbox
subtitle: 复选框
cover:
---

## 何时使用

单独使用可以表示两种状态之间的切换
在一组可选项中进行多项选择

## API

### IxCheckbox

#### CheckboxProps

除以下表格之外还支持原生 `<input type="checkbox" />` 元素的所有属性。

| 名称 | 说明 |  类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:checked` | 指定当前勾选框是否选中 |  `boolean \| string \| number`  | `false` | - | - |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `autofocus` | 是否以自动聚焦 | `boolean` | `false` | - | - |.
| `buttoned` | 是否以按钮显示 | `boolean` | - | - | - |
| `disabled` | 禁用状态 |`boolean`| - | - | - |
| `indeterminate` | 是否处于不确定状态 | `boolean` | `false`| - | 当值为`true`时，按钮样式处于半选状态，且不受`checked`影响 |
| `label` | 勾选框的文本 | `string \| #default` | - | - | - |
| `trueValue` | 勾选框选中时返回的值 |  `boolean \| string \| number`  | `true`| - | - |
| `falseValue` | 勾选框不选中时返回的值 | `boolean \| string \| number` | `false`| - | - |
| `value` | 设置勾选框的值，与 `IxCheckboxGroup` 配合使用 | `any`| - | - | - |
| `size` | 按钮大小 | `'sm' \| 'md' \| 'lg'` | - | `'md'` | 仅`buttoned`为`true`时生效 |
| `onBlur` | 失去焦点后触发 | `(evt: FocusEvent) => void`| - | - | - |
| `onChange` | 选中状态发生变化后的回调 | `(checked: boolean \| string \| number) => void`| - | - | - |
| `onFocus` | 获取焦点后触发 | `(evt: FocusEvent) => void`| - | - | - |

#### CheckboxMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `focus` | 获取焦点 | - | - |
| `blur` | 移除焦点 | - | - |

### IxCheckboxGroup

#### GroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 指定当前勾选框是否选中 |  `any[]`  | `[]` | - | - |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `buttoned` | 子`IxCheckbox`的`buttoned`属性 | `boolean` | `false` | - | - |
| `disabled` | 子`IxCheckbox`的`disabled`属性 | `boolean` | `false` | - |- |
| `gap` | 子`IxCheckbox` 的间隔 | `number \| string` | - | - | - |
| `name` | 子`IxCheckbox` 的 `name` 属性 | `string` | - | - |- |
| `options` | 以配置形式设置子元素 | `CheckboxOption[]`| - | - | - |
| `size` | 子`IxCheckbox` 的 `size` 属性 | `'sm' \| 'md' \| 'lg'`| `'md'` | - | - |
| `onChange` | 选中值发生变化后的回调 | `(value: Array<string \| number>) => void`| - | - | - |
