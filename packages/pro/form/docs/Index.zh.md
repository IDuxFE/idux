---
category: pro
type: 数据录入
order: 0
title: ProForm
subtitle:
---

## API

### IxProForm

#### ProFormProps

> 除以下表格之外还支持 [FormProps](./components/form#FormProps) 的全部属性

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `ajvOptions` | `ajv` 的配置 | `AjvOptions` | - | ✅ | 参见 [Ajv options](https://ajv.js.org/options.html) |
| `autoId` | 自定设置表单控件的 `id` | `boolean \| string` | `true` | ✅ | 类型为 `string` 时，为 `id` 的前缀 |
| `autoLabelFor` | 自定设置 `IxFormItem` 的 `labelFor` | `boolean` | `true` | ✅ | 通常配合 `autoId` 一起使用 |
| `fields` | 表单字段的描述信息 | `ProFormFieldsSchema` | - | - | - |
| `ignoreKeywords` | 配置 `ajv` 验证器忽略的错误字段 | `string[]` | `['type', 'enum']` | ✅ | - |
| `schema` | 配置表单的 Schema | `ProFormJsonSchema` | - | - | - |
| `schemaFormatter` | `fields` 和 `schema` 的格式化函数 | `ProFormSchemaFormatter` | - | ✅ | - |
| `onSubmit` | 提交时的回调 | `(formData: any) => void` | - | - | 验证通过时才触发 |

#### ProFormFieldsSchema

表单字段的描述信息，主要用于描述 UI 信息，也可以添加验证信息。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `formProps` | `IxForm` 组件的配置 | `FormProps` | - | - | - |
| `formItemProps` | `IxFormItem` 组件的配置 | `FormItemProps & RowProps` | - | - | - |
| `component` | 需要渲染输入控件 | `string \| Component` | `IxInput` | - | - | - |
| `componentProps` | 传递给输入控件的属性 | `any` | - | - | - |
| `default` | 当前控件的默认值 | `any` | - | - | - |
| `disabled` | 默认禁用当前控件 | `boolean` | - | - | - |
| `name` | 控件的名称 | `string` | - | - | 通常用于自定义提示信息 |
| `example` | 控件的示例 | `string` | - | - | 通常用于自定义提示信息 |
| `trigger` | 验证器触发的时机 | `'change' \| 'blur' \| 'submit'` | `change` | - | - |
| `validators` | 一个同步验证器函数或数组 | `ValidatorFn \| ValidatorFn[]` | - | - | - |
| `asyncValidators` | 一个异步验证器函数或数组 | `AsyncValidatorFn \| AsyncValidatorFn[]` | - | - | - |
| `type` | Schema 类型 | `'object' \| 'array'` | - | - | 第一层 Schema 默认为 `object`, 其他层默认为 `undefined` |
| `properties` | Schema 的子元素属性 | `[K in keyof T]: ProFormFieldsSchema` | - | - | `type='object'` 时生效，且必传 |
| `items` | Schema 的 item 元素属性 | `ProFormFieldsSchema` | - | - | `type='array'` 时生效，且必传 |
| `customControl` | 自定义输入控件，等同于 `IxFormItem` 的默认插槽 | `string | ((props: any) => VNodeChild)` | - | - | props 为内部计算后的属性, 通常包含 `control`, `id` 等  |
| `customControlTooltip` | 等同于 `IxFormItem` 的 `controlTooltip` 插槽 | `string | ((props: any) => VNodeChild)` | - | - | 类型为 `string` 时，对应 `IxProForm` 的插槽名 |
| `customDescription` | 等同于 `IxFormItem` 的 `description` 插槽 | `string | ((props: any) => VNodeChild)` | - | - | - |
| `customLabel` | 等同于 `IxFormItem` 的 `label` 插槽 | `string | ((props: any) => VNodeChild)` | - | - | - |
| `customLabelTooltip` | 等同于 `IxFormItem` 的 `labelTooltip` 插槽 | `string | ((props: any) => VNodeChild)` | - | - | - |
| `customMessage` | 等同于 `IxFormItem` 的 `message` 插槽 | `string | ((props: any) => VNodeChild)` | - | - | - |

#### ProFormJsonSchema

表单验证的描述信息，内置了 [ajv](https://ajv.js.org) 验证器，支持标准的 jsonSchema 验证，下面列出常见的一些字段。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `title` | 属性名称，也就是 `IxFormItem` 的 `label` 属性  | `string` | - | - | - |
| `description` | 属性描述，也就是 `IxFormItem` 的 `description` 属性 | `string` | - | - | - |
| `const` | `const` 验证 | `any` | - | - |- |
| `enum` | `enum` 验证 | `any[]` | - | - | - |
| `default` | 当前控件的默认值 | `any` | - | - | - |
| `type` | Schema 类型 | `'object' \| 'array' \| 'string' \| 'number' \| 'integer' \| 'boolean'` | - | - | 第一层 Schema 默认为 `object`, 其他层默认为 `undefined` |
| `properties` | Schema 的子元素属性 | `[K in keyof T]: ProFormJsonSchema` | - | - | `type='object'` 时生效，且必传 |
| `required` | Schema 的必需属性 | `(keyof T)[]` | - | - | `type='object'` 时生效 |
| `items` | Schema 的 `item` 元素属性 | `ProFormJsonSchema` | - | - | `type='array'` 时生效 |
| `minItems` | 数组最小长度 | `number` | - | - | `type='array'` 时生效 |
| `maxItems` | 数组最大长度 | `number` | - | - | `type='array'` 时生效 |
| `minLength` | 字符串最小长度 | `number` | - | - | `type='string'` 时生效 |
| `maxLength` | 字符串最大长度 | `number` | - | - | `type='string'` 时生效 |
| `pattern` | 字符串规则 | `string` | - | - | `type='string'` 时生效 |
| `format` | 字符串格式, 参见[formats](https://ajv.js.org/guide/formats.html) | `number` | - | - | `type='string' \| 'number'` 时生效 |
| `minimum` | 数字最小值 | `number` | - | - | `type='number \| integer'` 时生效 |
| `maximum` | 数字最大值 | `number` | - | - | `type='number \| 'integer'` 时生效 |

#### ProFormSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `default` | 默认插槽 | `{formGroup: FormGroup}` | - |

#### ProFormMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `getFormGroup` | 获取 `FormGroup` | `() => FormGroup` | - |
