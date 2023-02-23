
### IxForm

#### FormProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `colonless` | 配置 `IxFormItem` 的 `colonless` 默认值 | `boolean` | `false` | ✅ | `seer` 主题默认为 `true` |
| `control` | 表单的控制器 | `string \| number \| AbstractControl` | - | - | 通常是配合 `useFormGroup` 使用 |
| `controlCol` | 配置 `IxFormItem` 的 `controlCol` 默认值 | `number \| ColProps` | - | - | - |
| `controlTooltipIcon` | 配置表单控件的提示信息icon | `string` | `'info-circle'` | ✅ | - |
| `labelAlign` | 配置 `IxFormItem` 的 `labelAlign` 默认值 | `'start' \| 'end'` | `'end'` | ✅ | `seer` 主题默认为 `'start'` |
| `labelCol` | 配置 `IxFormItem` 的 `labelCol` 默认值 | `number \| ColProps` | - | - | - |
| `labelTooltipIcon` | 配置表单文本的提示信息icon | `string` | `'question-circle'` | ✅ | - |
| `layout` | 表单布局 | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` | ✅ | - |
| `messageTooltip` | 以 tooltip 的形式提示错误信息 | `boolean \| TooltipProps` | `false` | - | - |
| `size` | 表单大小 | `'sm' \| 'md' \| 'lg'` | `'md'` | ✅ | - |
| `onSubmit` | 表单提交事件 | `(evt: Event) => void` | `(evt: Event) => evt.preventDefault()` | - | 默认会阻止掉表单提交事件 |

### IxFormItem

表单项组件，用于控制器的绑定、校验、布局等。

#### FormItemProps

> 除以下表格之外还支持 `IxRow` 组件的[所有属性](/components/grid/zh#IxRow)

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `colonless` | 是否不显示 `label` 后面的冒号 | `boolean` | - | - | - |
| `control` | 表单控件的控制器 | `string \| number \| AbstractControl` | - | - | 默认取第 1 个子输入控件的 control，如果存在多个输入控件，建议手动指定，参考示例中的 `Phone Number`|
| `controlCol` | 配置表单控件的布局配置，可参考 `IxCol` 组件 | `number \| ColProps` | - | - | 传入 `string` 或者 `number` 时，为 `IxCol` 的 `span` 配置 |
| `controlTooltip` | 配置表单控件的提示信息 | `string \| #controlTooltip` | - | - | 通常用于对输入规则的详细说明 |
| `controlTooltipIcon` | 配置表单控件的提示信息icon | `string` | - | - | - |
| `description` | 额外的提示信息 | `string \| #description` | - | - | 当需要错误信息和提示文案同时出现时使用 |
| `label` | `label` 标签的文本| `string \| #label` | - | - | - |
| `labelAlign` | `label` 标签文本对齐方式 | `'start' \| 'end'` | - | - | - |
| `labelCol` | `label` 标签布局配置，可参考 `IxCol` 组件  | `number \| ColProps` | - | - | 传入 `string` 或者 `number` 时，为 `IxCol` 的 `span` 配置 |
| `labelFor` | `label` 标签的 `for` 属性 | `string` | - | - | - |
| `labelTooltip` | 配置表单文本的提示信息 | `string \| #labelTooltip` | - | - | 通常用于对表单本文的解释说名 |
| `labelTooltipIcon` | 配置表单文本的提示信息icon | `string` | - | -| - |
| `required` | 必填样式设置 | `boolean` | `false` | - | 仅控制样式 |
| `message` | 手动指定表单项的校验提示 | `string \| (control?: AbstractControl) => string` | - | - | 传入 `string` 时，为 `invalid` 状态的提示 |
| `messageTooltip` | 以 tooltip 的形式提示错误信息 | `boolean \| TooltipProps` | `false` | - | - |
| `status` | 手动指定表单项的校验状态 | `valid \| invalid \| validating` | - | - | - |

### IxFormWrapper

用于嵌套表单时, 简化子组件的 `control` 路径

#### FormWrapperProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 表单控件的控制器 | `string \| number \| AbstractControl` | - | - | - |

### useFormItemRegister

表单组件注册 control, 配合 `useAccessorAndControl` 使用

```ts
function useFormItemRegister(control: ShallowRef<AbstractControl | undefined>): void
```

### FAQ

#### 自定义表单组件

参考下列代码来自定义表单组件，实现 `control` 并与 `IxFormItem` 配合使用。

```html
<template>
  <input class="custom-input" :value="accessor.value" :disabled="accessor.disabled" @blur="onBlur" @input="onInput" />
</template>

<script setup lang="ts">

import { useAccessorAndControl } from '@idux/cdk/forms'
import { useFormItemRegister } from '@idux/components/form'

defineProps<{
  control?: string | number | (string | number)[] | object
  disabled?: boolean
  value?: string
}>()

// useAccessorAndControl 内部对 props 中的 control, disabled, value 进行了处理
const { accessor, control: controlRef } = useAccessorAndControl()

// 在 FormItem 组件中注册 control, 让 FormItem 获取控件的验证状态
useFormItemRegister(controlRef)

// 表单 blur 状态
const onBlur = () => {
  accessor.markAsBlurred()
}

// 表单值发生变更后的回调
const onInput = (evt: Event) => {
  const { value } = evt.target as HTMLInputElement
  accessor.setValue(value)
}
</script>
```
