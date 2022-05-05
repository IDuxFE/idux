---
category: components
type: 数据录入
title: Checkbox
subtitle: 复选框
cover:
---

## API

### IxCheckbox

#### CheckboxProps

除以下表格之外还支持原生 `<input type="checkbox" />` 元素的所有属性。

| 名称 | 说明 |  类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:checked` | 指定当前勾选框是否选中 |  `boolean \| string \| number`  | - | - | 使用 `control` 时，此配置无效 |
| `autofocus` | 是否以自动聚焦 | `boolean` | `false` | - | - |.
| `buttoned` | 是否以按钮显示 | `boolean` | - | - | - |
| `disabled` | 禁用状态 |`boolean`| - | - | 使用 `control` 时，此配置无效 |
| `indeterminate` | 是否处于不确定状态 | `boolean` | `false`| - | 当值为`true`时，按钮样式处于半选状态，且不受`checked`影响 |
| `label` | 勾选框的文本 | `string \| #default` | - | - | - |
| `trueValue` | 选中时返回的值 |  `boolean \| string \| number`  | `true`| - | - |
| `falseValue` | 不选中时返回的值 | `boolean \| string \| number` | `false`| - | - |
| `value` | 设置勾选框的值，与 `IxCheckboxGroup` 配合使用 | `any`| - | - | 不传时使用 `key` 作为 `value` |
| `size` | 按钮大小 | `'sm' \| 'md' \| 'lg'` | - | `'md'` | 仅`buttoned`为`true`时生效 |
| `onChange` | 选中状态发生变化后的回调 | `(newChecked: boolean \| string \| number, oldChecked: boolean \| string \| number) => void`| - | - | - |

#### CheckboxMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `focus` | 获取焦点 | - | - |
| `blur` | 移除焦点 | - | - |

### IxCheckboxGroup

#### GroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:value` | 指定当前勾选框是否选中 |  `any[]`  | - | - | 使用 `control` 时，此配置无效 |
| `buttoned` | 设置组内 `IxCheckbox` 的 `buttoned` 属性 | `boolean` | `false` | - | - |
| `dataSource` | 勾选框组数据源 | `CheckboxData[]` | - | - | 优先级高于 `default` 插槽 |
| `disabled` | 设置组内 `IxCheckbox` 的 `disabled` 属性 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `gap` | 设置组内 `IxCheckbox` 的间隔 | `number \| string` | - | - | - |
| `name` | 设置组内 `IxCheckbox` 的 `name` 属性 | `string` | - | - |- |
| `size` | 设置组内 `IxCheckbox` 的 `size` 属性 | `'sm' \| 'md' \| 'lg'`| `'md'` | - | - |
| `onChange` | 选中值发生变化后的回调 | `(newValue: any[], oldValue: any[]) => void`| - | - | - |

```ts
// key 与 value 二者必传其一。
export interface CheckboxData extends CheckboxProps {
  // 不传时使用 value 作为 key
  key?: VKey
}
```

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@checkbox-font-size-sm` | `@form-font-size-sm` | - | - |
| `@checkbox-font-size-md` | `@form-font-size-md` | `@form-font-size-sm` | - |
| `@checkbox-font-size-lg` | `@form-font-size-lg` | - | - |
| `@checkbox-line-height` | `@form-line-height` | - | - |
| `@checkbox-height-sm` | `@form-height-sm` | - | - |
| `@checkbox-height-md` | `@form-height-md` | - | - |
| `@checkbox-height-lg` | `@form-height-lg` | - | - |
| `@checkbox-min-width-sm` | `@width-xs` | - | - |
| `@checkbox-min-width-md` | `@width-sm` | - | - |
| `@checkbox-min-width-lg` | `@width-md` | - | - |
| `@checkbox-padding-horizontal-sm` | `@spacing-sm` | - | - |
| `@checkbox-padding-horizontal-md` | `@spacing-md` | - | - |
| `@checkbox-padding-horizontal-lg` | `@spacing-lg` | - | - |
| `@checkbox-border-width` | `@form-border-width` | - | - |
| `@checkbox-border-style` | `@form-border-style` | - | - |
| `@checkbox-border-color` | `@form-border-color` | - | - |
| `@checkbox-border-radius` | `@border-radius-sm` | - | - |
| `@checkbox-color` | `@form-color` | - | - |
| `@checkbox-background-color` | `@form-background-color` | - | - |
| `@checkbox-hover-color` | `@form-hover-color` | `@form-active-color` | - |
| `@checkbox-active-color` | `@form-active-color` | - | - |
| `@checkbox-focus-color` | `@form-focus-color` | `@form-active-color` | - |
| `@checkbox-disabled-color` | `@form-disabled-color` | - | - |
| `@checkbox-disabled-background-color` | `@form-disabled-background-color` | - | - |
| `@checkbox-font-size` | `@font-size-md` | `@font-size-sm` | - |
| `@checkbox-inner-zindex` | `@zindex-l1-1` | - | - |
| `@checkbox-box-size` | `16px` | - | - |
| `@checkbox-box-border-radius` | `@border-radius-sm` | - | - |
| `@checkbox-indeterminate-width` | `8px` | - | - |
| `@checkbox-indeterminate-height` | `2px` | - | - |
| `@checkbox-tick-color` | `@color-white` | - | - |
| `@checkbox-tick-width` | `(@checkbox-box-size / @font-size-base) * 5px` | - | - |
| `@checkbox-tick-height` | `(@checkbox-box-size / @font-size-base) * 9px` | - | - |
| `@checkbox-tick-border-width` | `@border-width-md` | - | - |
| `@checkbox-label-padding` | `0 @spacing-sm` | `0 @spacing-xs` | - |
| `@checkbox-group-item-margin-right` | `@spacing-sm` | - | - |
<!--- insert less variable end  --->
