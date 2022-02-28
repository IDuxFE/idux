---
category: components
type: 数据录入
title: Radio
subtitle: 单选框
---

## API

### IxRadio

#### RadioProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:checked` | 是否选中 | `boolean` | - | - | 使用 `control` 时，此配置无效 |
| `autofocus` | 是否以自动聚焦 | `boolean` | `false` | - | - |
| `buttoned` | 是否以按钮显示 | `boolean` | `false` | - | - |
| `disabled` | 是否为禁用状态 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `label` | 单选框的文本 | `string \| #default` | `false` | - | - |
| `mode` | 按钮类型 | `'default' \| 'primary'`| `'default'` | - | 仅 `buttoned` 为 `true` 时生效  |
| `size` | 按钮大小 | `'sm' \| 'md' \| 'lg'`| `'md'` | ✅ | 仅 `buttoned` 为 `true` 时生效 |
| `value` | 设置单选框的值，与 `IxRadioGroup` 配合使用 | `any`| - | - | - |
| `onChange` | 选中状态发生变化后的回调 | `(checked: boolean, oldChecked: boolean) => void`| - | - | - |
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
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:value` | 当前选中的值 | `any` | - | - | 使用 `control` 时，此配置无效 |
| `buttoned` | 设置单选框组内 `IxRadio` 的 `buttoned` | `boolean` | - | - | - |
| `disabled` | 设置单选框组内 `IxRadio` 的 `disabled` | `boolean` | - | - | 使用 `control` 时，此配置无效 |
| `gap` | 设置单选框组内的 `IxRadio` 的间隔 | `number \| string` | - | - | - |
| `name` | 设置单选框组内的 `IxRadio` 的原生 `name` 属性 | `string` | - | - | - |
| `mode` | 设置单选框组内 `IxRadio` 的 `mode` | `'default' \| 'primary'`| - | - | - |
| `dataSource` | 以配置形式设置子元素 | `RadioData[]`| - | 优先级高于 `default` 插槽 |  |
| `size` | 设置单选框组内 `IxRadio` 的 `size` | `'sm' \| 'md' \| 'lg'`| `'md'` | - | - |
| `onChange` | 选中值发生变化后的回调 | `(value: any, oldValue: any) => void`| - | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@radio-font-size-sm` | `@form-font-size-sm` | - | - |
| `@radio-font-size-md` | `@form-font-size-md` | - | - |
| `@radio-font-size-lg` | `@form-font-size-lg` | - | - |
| `@radio-line-height` | `@form-line-height` | - | - |
| `@radio-height-sm` | `@form-height-sm` | - | - |
| `@radio-height-md` | `@form-height-md` | - | - |
| `@radio-height-lg` | `@form-height-lg` | - | - |
| `@radio-padding-horizontal-sm` | `@spacing-sm` | - | - |
| `@radio-padding-horizontal-md` | `@spacing-md` | - | - |
| `@radio-padding-horizontal-lg` | `@spacing-lg` | - | - |
| `@radio-border-width` | `@form-border-width` | - | - |
| `@radio-border-style` | `@form-border-style` | - | - |
| `@radio-border-color` | `@form-border-color` | - | - |
| `@radio-border-radius` | `@border-radius-sm` | - | - |
| `@radio-color` | `@form-color` | - | - |
| `@radio-background-color` | `@form-background-color` | - | - |
| `@radio-hover-color` | `@form-hover-color` | - | - |
| `@radio-active-color` | `@form-active-color` | - | - |
| `@radio-focus-color` | `@form-focus-color` | - | - |
| `@radio-focus-box-shadow` | `@form-focus-box-shadow` | - | - |
| `@radio-disabled-color` | `@form-disabled-color` | - | - |
| `@radio-disabled-background-color` | `@form-disabled-background-color` | - | - |
| `@radio-inner-zindex` | `@zindex-l1-1` | - | - |
| `@radio-input-top` | `0.2em` | - | - |
| `@radio-box-size` | `16px` | - | - |
| `@radio-box-border-radius` | `@border-radius-full` | - | - |
| `@radio-dot-size` | `@radio-box-size - 8px` | - | - |
| `@radio-label-padding` | `0 @spacing-sm` | - | - |
| `@radio-group-item-margin-right` | `@spacing-sm` | - | - |
<!--- insert less variable end  --->