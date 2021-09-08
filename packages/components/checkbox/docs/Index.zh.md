---
category: components
type: 数据录入
title: Checkbox
subtitle: 多选框
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
| `autofocus` | 是否以自动聚焦 | `boolean` | `false` | - | - |
| `disabled` | 禁用状态 |`boolean`| - | - | - |
| `label` | 勾选框的文本 | `string \| #default` | - | - | - |
| `indeterminate` | 是否处于不确定状态 | `boolean` | `false`| - | 当值为true时，按钮样式处于半选状态，且不受checked影响 |
| `trueValue` | 勾选框选中时返回的值 |  `boolean \| string \| number`  | `true`| - | - |
| `falseValue` | 勾选框不选中时返回的值 | `boolean \| string \| number` | `false`| - | - |
| `value` | 设置勾选框的值，与 `IxCheckboxGroup` 配合使用 | `any`| - | - | - |
| `onBlur` | 失去焦点后触发 | `(evt: FocusEvent) => void`| - | - | - |
| `onChange` | 选中状态发生变化后的回调 | `(checked: boolean \| string \| number) => void`| - | - | - |
| `onFocus` | 获取焦点后触发 | `(evt: FocusEvent) => void`| - | - | - |

#### CheckboxSlots

|名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
|`default` | 文本区域 | - | - |

#### CheckboxMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `focus` | 获取焦点 | - | - |
| `blur` | 移除焦点 | - | - |

### IxCheckboxGroup

#### GroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 指定当前勾选框是否选中 |  `Array<string \| number>`  | `[]` | - | - |
| `disabled` | 子`IxCheckbox`禁用状态 | `boolean` | `false` | - |- |
| `name` | 子`IxCheckbox` 的 name 属性 | `string` | - | - |- |
| `options` | 以配置形式设置子元素 | `CheckboxOptions[]`| - | - | - |
| `onChange` | 选中值发生变化后的回调 | `(value: Array<string \| number>) => void`| - | - | - |

#### GroupSlots

|名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
|`default` | `IxCheckbox`区域 | - | - |

### 主题变量

| 变量名 | default 主题| 说明 |
| --- | --- | --- |
@checkbox-inner-zindex| @zindex-l1-1 | - |
@checkbox-line-height| 1 | - |
@checkbox-border-color| @color-grey-d10 | - |
@checkbox-border-style| @border-width-sm solid @color-grey-d10 | - |
@checkbox-border-radius| @border-radius-sm | - |
@checkbox-bg-color| @color-white | - |
@checkbox-tick-border-style| @border-width-md solid @color-white | - |
@checkbox-tick-width| (@checkbox-width / @font-size-base) * 5px | - |
@checkbox-tick-height| (@checkbox-height / @font-size-base) * 8px | - |
@checkbox-bg-indeterminate-color| @color-primary | - |
@checkbox-indeterminate-width| 8px | - |
@checkbox-indeterminate-height| 2px | - |
@checkbox-indeterminate-tick-color| @color-white | - |
@checkbox-border-checked-color| @color-primary | - |
@checkbox-border-hover-color| @color-primary-l10 | - |
@checkbox-border-focus-color| @color-primary-d10 | - |
@checkbox-bg-checked-color| @color-primary | - |
@checkbox-border-disabled-color| @color-grey | - |
@checkbox-tick-disabled-color| @color-grey | - |
@checkbox-bg-disabled-color| @color-grey-l20 | - |
@checkbox-bg-indeterminate-disabled-color| @color-grey | - |
@checkbox-label-disabled-color| @color-grey | - |
@checkbox-font-size| @font-size-lg | - |
@checkbox-height| 16px | - |
@checkbox-width| 16px | - |
@checkbox-group-line-height| @line-height-base | - |
@checkbox-group-checkbox-margin-right| @spacing-sm | - |
@checkbox-label-padding| 0 @spacing-xl 0 @spacing-xs | - |
@checkbox-transition-duration| @transition-duration-base | - |
