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

### IxInput

#### InputProps

> 除以下表格之外还支持原生 `input` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 控件值 | `string` | - | - | - |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `addonAfter` | 设置后置标签 | `string \| #addonAfter` | - | - | - |
| `addonBefore` | 设置前置标签 | `string \| #addonBefore` | - | - | - |
| `borderless` | 是否显示边框 | `boolean` | `false` | ✅ | - |
| `clearable` | 是否显示清除图标 | `boolean` | `false` | ✅ | - |
| `clearIcon` | 设置清楚图标 | `string \| #clearIcon={handlerClear}` | `'close-circle'` | ✅ | - |
| `disabled` | 是否禁用状态 | `boolean` | `false` | - | - |
| `prefix` | 设置前缀图标 | `string \| #prefix` | - | - | - |
| `readonly` | 是否只读状态 | `boolean` | `false` | - | - |
| `size` | 设置大小 | `'large' \| 'medium' \| 'small'` | `'medium'` | ✅ | - |
| `suffix` | 设置后缀图标 | `string \| #suffix` | - | - | - |
| `onClear` | 清除图标被点击后的回调 | `(evt: MouseEvent) => void` | - | - | - |

### 主题变量

<!-- TODO -->
| 变量名 | default 主题| 说明 |
| --- | --- | --- |
