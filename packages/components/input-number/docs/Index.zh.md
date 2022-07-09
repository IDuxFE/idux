---
category: components
type: 数据录入
title: InputNumber
subtitle: 数字输入框
order: 0
---

## API

### IxInputNumber

#### InputNumberProps

> 除以下表格之外还支持原生 `input` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 控件值 | `number` | - | - | 使用 `control` 时，此配置无效 |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `addonAfter` | 设置后缀 | `string \| #addonAfter` | - | - | - |
| `addonBefore` | 设置前缀 | `string \| #addonBefore` | - | - | - |
| `disabled` | 禁用 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `keyboard` | 启用键盘行为 | `boolean` | `true` | ✅ | - |
| `max` | 最大值 | `number` | `Infinity` | - | - |
| `min` | 最小值 | `number` | `-Infinity` | - | - |
| `placeholder` | 提示信息 | `string` | - | - | - |
| `precision` | 数值精度 | `number` | - | - | - |
| `readonly` | 只读 | `boolean` | `false` | - | - |
| `size` | 设置大小 | `'sm' \| 'md' \| 'lg'` | `'md'` | ✅ | - |
| `step` | 步进 | `number` | `1` | - | - |
| `onChange` | 值发生改变时触发的回调 | `(value: number \| null, oldValue: number \| null \| undefined) => void` | - | - | - |
| `onFocus` | 获取焦点时触发的回调 | `(evt: FocusEvent) => void` | - | - | - |
| `onBlur` | 失去焦点时触发的回调 | `(evt: FocusEvent) => void` | - | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@input-number-width-sm` | `12px` | - | - |
| `@input-number-width-md` | `24px` | - | - |
| `@input-number-width-lg` | `24px` | - | - |
| `@input-number-button-hover-color` | `@input-active-color` | - | - |
| `@input-number-error` | `@color-error` | - | - |
| `@input-number-disabled-color` | `@input-disabled-color` | - | - |
| `@input-number-button-background-color` | `@color-white` | - | - |
| `@input-number-disabled-background-color` | `@input-disabled-background-color` | - | - |
<!--- insert less variable end  --->