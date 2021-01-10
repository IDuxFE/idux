---
category: cdk
type: 
title: Reactive Forms
subtitle: 响应式表单
cover: 
---

参考自 [@angular/forms](https://angular.cn/guide/forms-overview)

- 显式创建表单模型
- 函数式的表单验证：内置常用的，提供扩展接口
- 表单状态管理：valid，invalid, validing，untouched，touched

## 何时使用

- useFormGroup: 使用表单组
- useFormArray:  使用表单数组
- useFormControl:  使用单个表单控件
- Validators: 内置的验证函数

## API

### useFormControl

| 名称 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |

### Validators

> 验证函数验证成功返回 `null`, 验证失败返回带有验证函数名称的 `map`.

| 名称 | 说明 | 参数类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `required` | 验证表单控件具有非空值 | - | - | 验证失败返回 `{ required: { message: '' } }`|
| `requiredTrue` | 验证表单控件的值为 `true` | - | - | 验证失败返回 `{ requiredTrue: { message: '', actual: value } }`|
| `email` | 验证表单控件的值是否为 `email` | - | - | 验证失败返回 `{ email: { message: '', actual: value } }`|
| `min()` | 验证表单控件的值大于或等于指定的数字 | number | - | 验证失败返回 `{ min: { message: '', min, actual: value } }`|
| `max()` | 验证表单控件的值小于或等于指定的数字 | number | - | 验证失败返回 `{ max: { message: '', min, actual: value } }`|
| `minLength()` | 验证表单控件的值的长度大于或等于指定的数字 | number | - | 验证失败返回 `{ minLength: { message: '', minLength, actual: value.length } }`|
| `maxLength()` | 验证表单控件的值的长度小于或等于指定的数字 | number | - | 验证失败返回 `{ maxLength: { message: '', maxLength, actual: value.length } }`|
| `pattern()` | 验证表单控件的值匹配一个正则表达式 | `string \| RegExp` | - | 验证失败返回 `{ pattern: { message: '', pattern, actual: value } }`|
| `setMessages()` | 设置验证失败的提示信息 | ErrorMessages | - | 每次设置的 `messages` 会跟之前的进行合并 |
