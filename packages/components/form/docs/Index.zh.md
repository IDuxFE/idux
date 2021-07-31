---
category: components
type: 数据录入
title: Form
subtitle: 表单
order: 0
single: true
---

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。

该组件推荐与 `@idux/cdk/forms` 结合使用。

## 何时使用

- 用于创建一个实体或收集信息。

- 需要对输入的数据进行校验时。

## API

### ix-form

#### FormProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `colonless` | 配置 `ix-form-item` 的 `colon` 默认值 | `boolean` | `false` | ✅ | - |
| `control` | 表单的控制器 | `string \| number \| AbstractControl \| null` | - | - | 通常是配合 `useFormGroup` 使用 |
| `controlCol` | 配置 `ix-form-item` 的 `controlCol` 默认值 | `string \| number \| ColProps` | - | - | - |
| `hasFeedback` | 配置 `ix-form-item` 的 `hasFeedback` 默认值 | `boolean` | `false` | - | - |
| `labelAlign` | 配置 `ix-form-item` 的 `labelAlign` 默认值 | `left \| right` | `right` | ✅ | - |
| `labelCol` | 配置 `ix-form-item` 的 `labelCol` 默认值 | `string \| number \| ColProps` | - | - | - |
| `layout` | 表单布局 | `horizontal \| vertical \| inline` | `horizontal` | ✅ | - |
| `size` | 表单大小 | `small \| medium \| large` | `medium` | ✅ | - |

### ix-form-item

表单项组件，用于控制器的绑定、校验、布局等。

#### FormItemProps

> 除以下表格之外还支持 `ix-row` 组件的[所有属性](/components/grid/zh#ix-row)

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `colonless` | 是否不显示 `label` 后面的冒号 | `boolean` | - | - | - |
| `control` | 表单控件的控制器 | `string \| number \| AbstractControl \| null` | - | - | 当仅包含一个输入控件时，输入控件的 `control` 可以省略，如果包含了多个输入控件，请务必手动指定每个输入控件的 `control`, 参考注册表单的 [Phone Number](#components-form-demo-Register) |
| `controlCol` | 配置表单控件的布局，同 `<ix-col>` 组件，设置 `span` `offset` 的值 | `string \| number \| ColProps` | - | - | 传入 `string` 或者 `number` 时，为 `ix-col` 的 `span` 配置 |
| `extra` | 额外的提示信息 | `string \| #extra` | - | - | 当需要错误信息和提示文案同时出现时使用 |
| `hasFeedback` | 是否展示校验状态图标 | `boolean` | `false` | - | - |
| `label` | `label` 标签的文本| `string \| #label` | - | - | - |
| `labelAlign` | `label` 标签文本对齐方式 | `left \| right` | - | - | - |
| `labelCol` | `label` 标签布局，同 `<ix-col>` 组件，设置 `span` `offset` 的值  | `string \| number \| ColProps` | - | - | 传入 `string` 或者 `number` 时，为 `ix-col` 的 `span` 配置 |
| `labelFor` | `label` 标签的 `for` 属性 | `string` | - | - | - |
| `labelTooltip` | 配置提示信息 | `sting \| #tooltip` | - | - | - |
| `required` | 必填样式设置 | `boolean` | `false` | - | 仅控制样式 |
| `message` | 手动指定表单项的校验提示 | `string \| FormMessageFn \| FormStatusMessage` | - | - | 传入 `string` 时，为 `invalid` 状态的提示 |
| `status` | 手动指定表单项的校验状态 | `valid \| invalid \| validating` | - | - | - |

### ix-form-wrapper

用于嵌套表单时, 简于子组件的 `control` 路径

#### FormWrapperProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 表单控件的控制器 | `string \| number \| AbstractControl \| null` | - | - | - |
