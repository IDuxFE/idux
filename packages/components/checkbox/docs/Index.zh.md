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
| `autofocus` | 是否以自动聚焦 | `boolean` | `false` | - | - |.
| `buttoned` | 是否以按钮显示 | `boolean` | `false` | - | - |
| `disabled` | 禁用状态 |`boolean`| `false` | - | - |
| `label` | 勾选框的文本 | `string \| #default` | - | - | - |
| `indeterminate` | 是否处于不确定状态 | `boolean` | `false`| - | 当值为`true`时，按钮样式处于半选状态，且不受`checked`影响 |
| `trueValue` | 勾选框选中时返回的值 |  `boolean \| string \| number`  | `true`| - | - |
| `falseValue` | 勾选框不选中时返回的值 | `boolean \| string \| number` | `false`| - | - |
| `value` | 设置勾选框的值，与 `IxCheckboxGroup` 配合使用 | `any`| - | - | - |
| `size` | 按钮大小 | `medium \| small` | - | `medium` | 仅`buttoned`为`true`时生效 |
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
| `buttoned` | 子`IxCheckbox`的`buttoned`属性 | `boolean` | `false` | - | - |
| `disabled` | 子`IxCheckbox`的`disabled`属性 | `boolean` | `false` | - |- |
| `name` | 子`IxCheckbox` 的 `name` 属性 | `string` | - | - |- |
| `size` | 子`IxCheckbox` 的 `size` 属性 | `medium \| small` | `medium` | - | 仅`buttoned`为`true`时生效 |
| `gap` | 子`IxCheckbox` 的间隔 | `number` | `0` | - | - |
| `options` | 以配置形式设置子元素 | `CheckboxOptions[]`| - | - | - |
| `onChange` | 选中值发生变化后的回调 | `(value: Array<string \| number>) => void`| - | - | - |

#### GroupSlots

|名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
|`default` | `IxCheckbox`区域 | - | - |

### 主题变量

| 变量名 | default 主题| 说明 |
| --- | --- | --- |
| `@checkbox-checked-color` | `@color-primary` | - |
| `@checkbox-hover-color` | `@color-primary-l10` | - |
| `@checkbox-focus-color` | `@color-primary-d10` | - |
| `@checkbox-disabled-color` | `@color-graphite-l10` | - |
| `@checkbox-border-color` | `@color-graphite-l20` | - |
| `@checkbox-bg-color` | `@color-white` | - |
| `@checkbox-indeterminate-tick-color` | `@color-white` | - |
| `@checkbox-disabled-border-color` | `@color-graphite-l20` | - |
| `@checkbox-disabled-bg-color` | `@color-graphite-l40` | - |
| `@checkbox-disabled-checked-bg-color` | `@color-graphite-l40` | - |
| `@checkbox-disabled-checked-border-color` | `@color-graphite-l20` | - |
| `@checkbox-button-disabled-bg-color` | `@color-graphite-l50` | - |
| `@checkbox-button-disabled-border-color` | `@color-graphite-l30` | - |
| `@checkbox-button-checked-bg-color` | `@color-white` | - |
| `@checkbox-inner-zindex` | `@zindex-l1-1` | - |
| `@checkbox-line-height` | `1` | - |
| `@checkbox-border-width` | `@border-width-sm` | - |
| `@checkbox-border-style` | `@checkbox-border-width solid @checkbox-border-color` | - |
| `@checkbox-border-radius` | `@border-radius-sm` | - |
| `@checkbox-tick-border-style` | `@border-width-md solid @color-white` | - |
| `@checkbox-tick-width` | `(@checkbox-width / @font-size-base) * 5px` | - |
| `@checkbox-tick-height` | `(@checkbox-height / @font-size-base) * 9px` | - |
| `@checkbox-indeterminate-width` | `8px` | - |
| `@checkbox-indeterminate-height` | `2px` | - |
| `@checkbox-font-size` | `@font-size-md` | - |
| `@checkbox-height` | `14px` | - |
| `@checkbox-width` | `14px` | - |
| `@checkbox-group-line-height` | `@line-height-base` | - |
| `@checkbox-label-padding` | `0 @spacing-sm 0 @spacing-sm` | - |
| `@checkbox-button-height-sm` | `@height-sm` | - |
| `@checkbox-button-font-size-sm` | `@font-size-sm` | - |
| `@checkbox-button-padding-horizontal-sm` | `@padding-sm` | - |
| `@checkbox-button-height-md` | `@height-md` | - |
| `@checkbox-button-font-size-md` | `@font-size-md` | - |
| `@checkbox-button-padding-horizontal-md` | `@padding-md` | - |
| `@checkbox-transition-duration` | `@form-transition-duration` | - |
| `@checkbox-transition-function` | `@form-transition-function` | - |
| `@checkbox-transition` | `all @checkbox-transition-duration @checkbox-transition-function` | - |
