---
category: components
type: 数据录入
title: Input
subtitle: 输入框
---

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用

- 需要用户输入表单域内容时。
- 提供组合型输入框，还可以进行大小选择。

## API

### ix-input

#### InputProps

> 除以下表格之外还支持原生 `input` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 控件值 | `string` | - | - | - |
| `control` | 控件控制器 | `string\|AbstractControl` | - | - | 当存在 `control` 时, 控件将由 `AbstractControl` 完全控制，此时 `value` 会失效 |
| `disabled` | 是否禁用状态 | `boolean` | `false` | - | - |
| `readonly` | 是否只读状态 | `boolean` | `false` | - | - |
| `addonAfter` | 设置后置标签 | `string\|v-slot:addonAfter` | - | - | - |
| `addonBefore` | 设置前置标签 | `string\|v-slot:addonBefore` | - | - | - |
| `suffix` | 设置后缀图标 | `string\|v-slot:suffix` | - | - | - |
| `prefix` | 设置前缀图标 | `string\|v-slot:prefix` | - | - | - |
| `size` | 设置大小 | `large\|medium\|small` | `medium` | ✅ | - |
| `clearable` | 是否显示清除图标 | `boolean` | `false` | ✅ | - |
| `borderless` | 是否显示边框 | `boolean` | `false` | ✅ | - |

#### InputEmits

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `suffixClick` | 后缀图标被点击 | `(value:string, evt: MouseEvent) => void` | - |
| `prefixClick` | 前缀图标被点击 | `(value:string, evt: MouseEvent) => void` | - |
| `afterClear` | 清除图标被点击后的回调 | `(evt: MouseEvent) => void` | - |

### ix-textarea

#### TextareaProps

> 除以下表格之外还支持原生 `textarea` 元素的[所有属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 控件值 | `string` | - | - | - |
| `control` | 控件控制器 | `string | AbstractControl` | - | - | 当存在 `control` 时, 控件将由 `AbstractControl` 完全控制，此时 `value` 会失效 |
| `disabled` | 是否禁用状态 | `boolean` | `false` | - | - |
| `readonly` | 是否只读状态 | `boolean` | `false` | - | - |
| `resize` | 缩放方向 | `none\|both\|horizontal\|vertical` | `vertical` | ✅ | 启用 `autoRows` 的时，仅 `none\|horizontal` 有效 |
| `autoRows` | 是否显示自适应 `rows` | `boolean\|{ minRows: number, maxRows: number }` | `false` | ✅ | - |
| `showCount` | 是否展示字符数 | `boolean` | `false` | ✅ | - |
| `maxCount` | 数字提示显示的最大值 | `number\|string` | - | ✅ | 仅用于提示，不做校验控制 |
| `computeCount` | 自定义计算字符数的函数 | `(v: string) => string` | - | ✅ | 优先级高于 `maxCount` |
| `size` | 设置大小 | `large\|medium\|small` | `medium` | ✅ | - |
| `clearable` | 是否显示清除图标 | `boolean` | `false` | ✅ | - |

#### TextareaEmits

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `afterClear` | 清除图标被点击后的回调 | `(evt: MouseEvent) => void` | - |

### 主题变量

| 变量名 | default 主题| 说明 |
| --- | --- | --- |
| @input-line-height | @line-height-base;| - |
| @input-height-sm | @height-sm;| - |
| @input-height-md | @height-md;| - |
| @input-height-lg | @height-lg;| - |
| @input-font-size-sm | @font-size-md;| - |
| @input-font-size-md | @font-size-md;| - |
| @input-font-size-lg | @font-size-lg;| - |
| @input-wrapper-inner-margin | @margin-xs;| - |
| @input-padding-horizontal-sm | @input-padding-horizontal-md - 2px;| - |
| @input-padding-horizontal-md | @padding-sm;| - |
| @input-padding-horizontal-lg | @input-padding-horizontal-md + 2px;| - |
| @input-border-width | @border-width-sm;| - |
| @input-border-style | @border-style;| - |
| @input-border-color | @border-color;| - |
| @input-color | @text-color;| - |
| @input-color-secondary | @text-color-secondary;| - |
| @input-bg-color | @background-color-component;| - |
| @input-addon-bg-color | hsv(0, 0, 95%);| - |
| @input-placeholder-color | hsv(0, 0, 75%);| - |
| @input-hover-border-color | ~`colorPalette('@{primary}', -10)`;| - |
| @input-active-border-color | @primary;| - |
| @input-active-box-shadow | 0 0 0 2px fade(@input-active-border-color, 15%);| - |
| @input-disabled-color | @disabled-color;| - |
| @input-disabled-bg-color | @disabled-bg-color;| - |
| @input-border-radius | @border-radius-md;| - |
| @input-transition-duration | @transition-duration-base;| - |
