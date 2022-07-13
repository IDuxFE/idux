---
category: cdk
title: Forms
subtitle: 表单
---

## API

### useFormGroup

> 构建一个的 `FormGroup` 实例。

```ts
export function useFormGroup<T>(config: GroupConfig<T>, validatorOptions?: ValidatorOptions): FormGroup<T>
export function useFormGroup<T>(
  config: GroupConfig<T>,
  validators?: ValidatorFn | ValidatorFn[],
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
): FormGroup<T>
```

| 名称 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `config` | 控件组配置项 | `GroupConfig<T>` | - | 每个子控件的 `key` 就是配置项的 `key` |
| `validators` | 一个同步验证器函数或数组 | `ValidatorFn \| ValidatorFn[]` | - | 只针对当前控件组的值进行验证 |
| `asyncValidators` | 一个异步验证器函数或数组 | `AsyncValidatorFn \| AsyncValidatorFn[]` | - | 只针对当前控件组的值进行验证 |
| `validatorOptions` | 控件组验证配置项 | `ValidatorOptions` | - | 参见[ValidatorOptions](#ValidatorOptions) |

```ts
type ControlConfig<T> =
  | [T]
  | [T, ValidatorFn | ValidatorFn[]]
  | [T, ValidatorFn | ValidatorFn[], AsyncValidatorFn | AsyncValidatorFn[]]
  | [T, ValidatorOptions]

type GroupConfig<T> = {
  [K in keyof T]: ControlConfig<T[K]> | AbstractControl<T[K]> | FormGroup<T[K]>
}
```

### useFormArray

> 构建一个的 `FormArray` 实例。

```ts
export function useFormArray<T>(config: ArrayConfig<T>, validatorOptions?: ValidatorOptions): FormArray<T>
export function useFormArray<T>(
  config: ArrayConfig<T>,
  validators?: ValidatorFn | ValidatorFn[],
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
): FormArray<T>
```

| 名称 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `config` | 控件数组配置项 | `ArrayConfig<T>` | - | 每个子控件的 `key` 就是配置项的 `index` |
| `validators` | 一个同步验证器函数或数组 | `ValidatorFn \| ValidatorFn[]` | - | 只针对当前控件数组的值进行验证 |
| `asyncValidators` | 一个异步验证器函数或数组 | `AsyncValidatorFn \| AsyncValidatorFn[]` | - | 只针对当前控件数组的值进行验证 |
| `validatorOptions` | 控件数组验证配置项 | `ValidatorOptions` | - | 参见[ValidatorOptions](#ValidatorOptions) |

```ts
type ArrayConfig<T> = Array<AbstractControl<ArrayElement<T>> | ControlConfig<ArrayElement<T>> | ArrayElement<T>>
```

### useFormControl

> 构建一个的 `FormControl` 实例。

```ts
export function useFormControl<T>(initValue?: T, validatorOptions?: ValidatorOptions): FormControl<T>
export function useFormControl<T>(
  initValue?: T,
  validators?: ValidatorFn | ValidatorFn[],
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
): FormControl<T>
```

| 名称 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `initValue` | 控件初始值 | `any` | - | - |
| `validators` | 一个同步验证器函数或数组 | `ValidatorFn \| ValidatorFn[]` | - | - |
| `asyncValidators` | 一个异步验证器函数或数组 | `AsyncValidatorFn \| AsyncValidatorFn[]` | - | - |
| `validatorOptions` | 控件验证配置项 | `ValidatorOptions` | - | 参见[ValidatorOptions](#ValidatorOptions) |

### ValidatorOptions

> 如果需要默认禁用当前控件数组，或者指定验证触发时机时，使用对象形式的配置项。

| 名称 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `disabled` | 默认禁用当前控件 | `boolean` | - | - |
| `name` | 控件的名称 | `string` | - | 通常用于自定义提示信息 |
| `example` | 控件的示例 | `string` | - | 通常用于自定义提示信息 |
| `trigger` | 验证器触发的时机 | `'change' \| 'blur' \| 'submit'` | `change` | - |
| `validators` | 一个同步验证器函数或数组 | `ValidatorFn \| ValidatorFn[]` | - | - |
| `asyncValidators` | 一个异步验证器函数或数组 | `AsyncValidatorFn \| AsyncValidatorFn[]` | - | - |

### Validators

> 验证函数验证成功返回 `null`, 验证失败返回带有验证函数名称的 `object`

| 名称 | 说明 | 参数类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `required` | 验证表单控件具有非空值 | - | - | 验证失败返回 `{ required: { message: '' } }`|
| `requiredTrue` | 验证表单控件的值为 `true` | - | - | 验证失败返回 `{ requiredTrue: { message: '', actual: value } }`|
| `email` | 验证表单控件的值是否为 `email` | - | - | 验证失败返回 `{ email: { message: '', actual: value } }`|
| `min()` | 验证表单控件的值大于或等于指定的数字 | `number` | - | 验证失败返回 `{ min: { message: '', min, actual: value } }`|
| `max()` | 验证表单控件的值小于或等于指定的数字 | `number` | - | 验证失败返回 `{ max: { message: '', min, actual: value } }`|
| `range()` | 验证表单控件的值的范围 | `number, number` | - | 验证失败返回 `{ range: { message: '', min, max, actual: value } }`|
| `minLength()` | 验证表单控件的值的长度大于或等于指定的数字 | `number` | - | 验证失败返回 `{ minLength: { message: '', minLength, actual: value.length, isArray } }`|
| `maxLength()` | 验证表单控件的值的长度小于或等于指定的数字 | `number` | - | 验证失败返回 `{ maxLength: { message: '', maxLength, actual: value.length, isArray } }`|
| `rangeLength()` | 验证表单控件的值的长度范围 | `number, number` | - | 验证失败返回 `{ rangeLength: { message: '', minLength, maxLength, actual: value.length, isArray } }`|
| `pattern()` | 验证表单控件的值匹配一个正则表达式 | `string \| RegExp` | - | 验证失败返回 `{ pattern: { message: '', pattern, actual: value } }`|
| `setMessages()` | 设置验证失败的提示信息 | `ValidateMessages` | - | 每次设置的 `messages` 会跟之前的进行合并, 默认的提示信息为 `zhCNMessages` |

更多默认的提示信息，参见 [messages](https://github.com/IDuxFE/idux/tree/main/packages/cdk/forms/src/messages)

### useAccessorAndControl

> 构建 `accessor`, 来接管表单控件 `props` 的 `control` 和 `value`, `disabled` 状态的优先级关系。
> 当 `control` 存在时，`value` 和 `disabled` 无效，以 `control` 的状态为准。

```ts
export function useAccessorAndControl<T = any>(options?: FormAccessorOptions): {
    accessor: FormAccessor<T>;
    control: ShallowRef<AbstractControl<T> | undefined>;
}

export function useAccessor<T = any>(control: ShallowRef<AbstractControl<T> | undefined>, valueKey?: string, disabledKey?: string): FormAccessor<T>

export function useControl<T = any>(controlKey?: string): ShallowRef<AbstractControl<T> | undefined>

export interface FormAccessorOptions {
  /**
   * props 中 control 的 key
   *
   * @default 'control'
   */
  controlKey: string
  /**
   * props 中 value 的 key
   *
   * @default 'value'
   */
  valueKey?: string
  /**
   * props 中 disabled 的 key
   *
   * @default 'disabled'
   */
  disabledKey?: string
}

export interface FormAccessor<T = any> {
  /**
   * 控件的值
   */
  value: T
  /**
   * 禁用状态
   */
  disabled: boolean
  /**
   * 将控件设置为 blurred 状态
   */
  markAsBlurred: () => void
  /**
   * 设置控件的值
   */
  setValue: (value: T) => void
}
```
