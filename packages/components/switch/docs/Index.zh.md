---
category: components
type: 数据录入
title: Switch
subtitle: 开关
order: 0
---

## API

### IxSwitch

#### SwitchProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:checked` | 是否开启 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `autofocus` | 自动获取焦点 | `boolean` | `false` | - | - |
| `disabled` | 是否禁止操作 | `boolean` | `false`| - | 使用 `control` 时，此配置无效 |
| `labels` | 开关的文案 | `string[] \| #label={checked}` | - | - | 当传入一个数组时，第 1 个元素为开启的文案，第 2 个元素为未开启时的文案 |
| `loading` | 是否处于加载中 | `boolean` | `false` | - | 加载时不允许改变当前状态 |
| `size` | 切换器的大小 | `'sm' \| 'md'` | `'md'` | - | - |
| `onChange` | 开关状态发生改变后的回调 | `(checked: boolean) => void`| - | - | - |
| `onFocus` | 获取焦点后触发的回调 | `(evt: FocusEvent) => void`| - | - | - |
| `onBlur` | 失去焦点后触发的回调 | `(evt: FocusEvent) => void`| - | - | - |

#### SwitchMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur()` | 失去焦点 | - | - |
| `focus()` | 获得焦点 | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@switch-font-size` | `@form-font-size-xs` | - | - |
| `@switch-line-height` | `@form-line-height` | - | - |
| `@switch-height-sm` | `@form-height-xs` | - | - |
| `@switch-height-md` | `@form-height-sm` | - | - |
| `@switch-height-lg` | `@form-height-md` | - | - |
| `@switch-padding-horizontal-sm` | `@form-padding-horizontal-sm` | - | - |
| `@switch-padding-horizontal-md` | `@form-padding-horizontal-md` | - | - |
| `@switch-padding-horizontal-lg` | `@form-padding-horizontal-lg` | - | - |
| `@switch-border-radius` | `@border-radius-full` | - | - |
| `@switch-color` | `@form-background-color` | - | - |
| `@switch-background-color` | `@form-placeholder-color` | - | - |
| `@switch-active-color` | `@form-active-color` | - | - |
| `@switch-disabled-opacity` | `0.5` | - | - |
| `@switch-box-size-sm` | `12px` | - | - |
| `@switch-box-size-md` | `20px` | - | - |
| `@switch-box-size-lg` | `28px` | - | - |
| `@switch-box-size-padding` | `2px` | - | - |
| `@switch-box-background-color` | `@switch-color` | - | - |
| `@switch-box-box-shadow` | `0 2px 4px rgba(0, 0, 0, 0.25)` | - | - |
| `@switch-icon-font-size-sm` | `9px` | - | - |
| `@switch-icon-font-size-md` | `@font-size-md` | - | - |
| `@switch-icon-font-size-lg` | `@font-size-md` | - | - |
<!--- insert less variable end  --->