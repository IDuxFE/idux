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
| `validatorOptions` | 控件组验证配置项 | `ValidatorOptions` | - | 参见[ValidatorOptions](#ValidatorOptions) |
| `validators` | 一个同步验证器函数或数组 | `ValidatorFn \| ValidatorFn[]` | - | 只针对当前控件组的值进行验证 |
| `asyncValidators` | 一个异步验证器函数或数组 | `AsyncValidatorFn \| AsyncValidatorFn[]` | - | 只针对当前控件组的值进行验证 |

```ts
type ControlConfig<T> =
  | [T]
  | [T, ValidatorOptions]
  | [T, ValidatorFn | ValidatorFn[]]
  | [T, ValidatorFn | ValidatorFn[], AsyncValidatorFn | AsyncValidatorFn[]]

type GroupConfig<T> = {
  [K in keyof T]: ControlConfig<T[K]> | GroupConfig<T[K]> | AbstractControl<T[K]>
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
| `validatorOptions` | 控件数组验证配置项 | `ValidatorOptions` | - | 参见[ValidatorOptions](#ValidatorOptions) |
| `validators` | 一个同步验证器函数或数组 | `ValidatorFn \| ValidatorFn[]` | - | 只针对当前控件数组的值进行验证 |
| `asyncValidators` | 一个异步验证器函数或数组 | `AsyncValidatorFn \| AsyncValidatorFn[]` | - | 只针对当前控件数组的值进行验证 |

```ts
type ArrayConfig<T> = Array<ControlConfig<T> | GroupConfig<T> | AbstractControl<T>>
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
| `validatorOptions` | 控件验证配置项 | `ValidatorOptions` | - | 参见[ValidatorOptions](#ValidatorOptions) |
| `validators` | 一个同步验证器函数或数组 | `ValidatorFn \| ValidatorFn[]` | - | - |
| `asyncValidators` | 一个异步验证器函数或数组 | `AsyncValidatorFn \| AsyncValidatorFn[]` | - | - |

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

用于处理表单控件 `props` 的 `control` 和 `value`, `disabled` 的优先级关系，`control` 存在时， `value` 和 `disabled` 失效。

创建一个响应式对象 `FormAccessor`，它接管了组件 `value` 和 `disabled` 控制，用法也同 `props` 一致。

```ts
export function useAccessorAndControl<T = any>(options?: FormAccessorOptions): {
    accessor: FormAccessor<T>;
    control: ShallowRef<AbstractControl<T> | undefined>;
}

export function useAccessor<T = any>(control: MaybeRef<AbstractControl<T> | undefined>, valueKey?: string, disabledKey?: string): FormAccessor<T>

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
   *
   * @param value 新的值
   * @param options
   * * `dirty`: 是否让控件变成 `dirty` 状态, 默认值为 `true`.
   * * `blur`: 是否让控件变成 `blurred` 状态, 默认值为 `false`.
   */
  setValue: (value: T, options: { dirty?: boolean; blur?: boolean }) => void
}
```

特别需要注意的是: `FormAccessor` 中的 `setValue` 的第二个参数中的 `dirty` 默认为 `true`, 与 `AbstractControl` 的 `setValue` 不一致。

### AbstractControl

```ts
export abstract class AbstractControl<T = any> {
    /**
     * control 的唯一 id
     */
    readonly uid: number;
    /**
     * 子控件的集合
     */
    readonly controls: ComputedRef<any>;
    /**
     * 控件的 ref 值
     */
    readonly valueRef: ComputedRef<T>;
    /**
     * 控件的验证状态，有三种可能的验证状态值:
     * * **valid**: 此控件已通过所有验证
     * * **invalid**: 此控件至少有一个验证失败
     * * **validating**: 此控件正在执行验证
     */
    readonly status: ComputedRef<ValidateStatus>;
    /**
     * 包含验证失败所产生的任何错误的对象，如果没有错误则为 `undefined`
     */
    readonly errors: ComputedRef<ValidateErrors | undefined>;
    /**
     * 此控件是否验证通过
     */
    readonly valid: ComputedRef<boolean>;
    /**
     * 此控件是否验证失败
     */
    readonly invalid: ComputedRef<boolean>;
    /**
     * 此控件是否正在验证中
     */
    readonly validating: ComputedRef<boolean>;
    /**
     * 此控件是否被禁用
     */
    readonly disabled: ComputedRef<boolean>;
    /**
     * 此控件是否已经触发 blur 事件
     */
    readonly blurred: ComputedRef<boolean>;
    /**
     * 此控件是否尚未触发 blur 事件
     */
    readonly unblurred: ComputedRef<boolean>;
    /**
     * 如果用户在 UI 中更改了控件的值，则该控件是 `dirty`
     */
    readonly dirty: ComputedRef<boolean>;
    /**
     * 如果用户在 UI 中尚未更改控件的值，则该控件是 `pristine`
     */
    readonly pristine: ComputedRef<boolean>;
    /**
     * 此控件的父级控制器, 如果不存在则为 `undefined`
     */
    get parent(): AbstractControl | undefined;
    /**
     * 此控件的顶层控制器,, 如果不存上层控制器在则为自身
     */
    get root(): AbstractControl<T>;
    /**
     * 此控件触发验证的时机
     * 可选值: `'change'` | `'blur'` | `'submit'`
     * 默认值: `'change'`
     */
    get trigger(): 'change' | 'blur' | 'submit';
    /**
     * 此控件的名称，通常用于验证提示信息
     */
    name?: string;
    /**
     * 此控件的示例，通常用于验证提示信息
     */
    example?: string;
    constructor(
      controls?: GroupControls<T> | AbstractControl<ArrayElement<T>>[], 
      validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions, 
      asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[], initValue?: T
    );
    /**
     * 设置控件的新值。
     *
     * @param value 新值
     * @param options
     * * `dirty`: 是否将其标记为 `dirty`, 默认为 `false`
     * * `blur`: 是否将其标记为 `blurred`, 默认为 `false`
     */
    abstract setValue(value: T | Partial<T> | Partial<ArrayElement<T>>[], options?: {
        dirty?: boolean;
        blur?: boolean;
    }): void;
    /**
     * 控件的聚合值。
     *
     * @param options
     * * `skipDisabled`: 是否忽略禁用控件的值，默认为 `false`
     */
    abstract getValue(options?: {
        skipDisabled?: boolean;
    }): T;
    /**
     * 重置控件，将其标记为 `unblurred` 和 `pristine`, 并将值设置为初始化的值
     */
    reset(): void;
    /**
     * 手动运行验证
     */
    validate(): Promise<ValidateErrors | undefined>;
    /**
     * 禁用此控制器
     */
    disable(): void;
    /**
     * 启用此控制器
     */
    enable(): void;
    /**
     * 将控件标记为 `blurred`
     */
    markAsBlurred(): void;
    /**
     * 将控件标记为 `unblurred`.
     */
    markAsUnblurred(): void;
    /**
     * 将控件标记为  `dirty`.
     */
    markAsDirty(): void;
    /**
     * 将控件标记为  `pristine`.
     */
    markAsPristine(): void;
    /**
     * 为控件设置新的同步验证器，它将覆盖现有的同步验证器
     * 
     * 如果你想清除所有同步验证器，你可以传入 `undefined`
     */
    setValidators(newValidators?: ValidatorFn | ValidatorFn[]): void;
    /**
     * 为控件设置新的异步验证器，它将覆盖现有的异步验证器
     * 
     * 如果你想清除所有异步验证器，你可以传入 `undefined`
     */
    setAsyncValidators(newAsyncValidators?: AsyncValidatorFn | AsyncValidatorFn[]): void;
    /**
     * 向此控件添加一个或多个同步验证器，但不影响其他验证器
     *
     * 当您在运行时添加或删除验证器时，您必须调用 `validate()` 以使新的验证生效
     */
    addValidators(validators: ValidatorFn | ValidatorFn[]): void;
    /**
     * 向此控件添加一个或多个异步验证器，但不影响其他验证器
     *
     * 当您在运行时添加或删除验证器时，您必须调用 `validate()` 以使新的验证生效
     */
    addAsyncValidators(validators: AsyncValidatorFn | AsyncValidatorFn[]): void;
    /**
     * 从此控件中删除同步验证器，但不影响其他验证器
     * 通过函数引用比较验证器, 必须传递对完全相同的函数引用
     * 如果没有找到提供的验证器，它将被忽略
     *
     * 当您在运行时添加或删除验证器时，您必须调用 `validate()` 以使新的验证生效
     */
    removeValidators(validators: ValidatorFn | ValidatorFn[]): void;
    /**
     * 从此控件中删除异步验证器，但不影响其他验证器
     * 通过函数引用比较验证器, 必须传递对完全相同的函数引用
     * 如果没有找到提供的验证器，它将被忽略
     *
     * 当您在运行时添加或删除验证器时，您必须调用 `validate()` 以使新的验证生效
     */
    removeAsyncValidators(validators: AsyncValidatorFn | AsyncValidatorFn[]): void;
    /**
     * 清空同步验证器
     *
     * 当您在运行时添加或删除验证器时，您必须调用 `validate()` 以使新的验证生效
     *
     */
    clearValidators(): void;
    /**
     * 清空异步验证器
     *
     * 当您在运行时添加或删除验证器时，您必须调用 `validate()` 以使新的验证生效
     *
     */
    clearAsyncValidators(): void;
    /**
     * 检查此控件上是否有同步验证器函数
     * 所提供的验证器必须是对所提供的完全相同函数的引用
     *
     */
    hasValidator(validator: ValidatorFn): boolean;
    /**
     * 检查此控件上是否有异步验证器函数
     * 所提供的验证器必须是对所提供的完全相同函数的引用
     *
     */
    hasAsyncValidator(validator: AsyncValidatorFn): boolean;
    /**
     * 获取给定控件名称或路径的子控件
     *
     * @param path 子控件的路径，可以是字符串或者数字，也可以是由 `.` 分割的字符串，还可以是一个数组
     */
    get<K extends OptionalKeys<T>>(path: K): AbstractControl<T[K]> | undefined;
    get<K extends keyof T>(path: K): AbstractControl<T[K]>;
    get<TK = any>(path: ControlPathType): AbstractControl<TK> | undefined;
    /**
     * 手动设置表单控件上的错误
     */
    setErrors(errors?: ValidateErrors): void;
    /**
     * 获取给定路径的控件的错误数据
     *
     * @param errorCode 要检查的错误代码，例如：`required`, `email`
     * @param path 子控件的路径, 不传则为当前控件
     */
    getError(errorCode: string, path?: ControlPathType): ValidateError | undefined;
    /**
     * 给定路径的控件是否存在错误
     *
     * @param errorCode 要检查的错误代码，例如：`required`, `email`
     * @param path 子控件的路径, 不传则为当前控件
     */
    hasError(errorCode: string, path?: ControlPathType): boolean;
    /**
     * 设置控件的父类
     */
    setParent(parent: AbstractControl): void;
    /**
     * 监听此控件的值的变化
     *
     * @param cb 值改变时的回调
     * @param options 监听参数
     */
    watchValue(cb: WatchCallback<T, T | undefined>, options?: WatchOptions): WatchStopHandle;
    /**
     * 监听此控件的验证状态的变化
     *
     * @param cb 状态改变时的回调
     * @param options 监听参数
     */
    watchStatus(cb: WatchCallback<ValidateStatus, ValidateStatus | undefined>, options?: WatchOptions): WatchStopHandle;
}
```

### FormControl

```ts
export class FormControl<T = any> extends AbstractControl<T> {
    readonly controls: ComputedRef<undefined>;
    constructor(
      _initValue?: T | undefined,
      validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
      asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
    );
    setValue(value: T, options?: {
        dirty?: boolean;
        blur?: boolean;
    }): void;
    getValue(): T;
}
```

### FormGroup

```ts
export class FormGroup<T extends object = object> extends AbstractControl<T> {
    readonly controls: ComputedRef<GroupControls<T>>;
    constructor(
      /**
       * 子控件的集合，它的键就是子控件注册时的 `key`
       */
      controls: GroupControls<T>,
      validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
      asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
    );
    setValue(value: Partial<T>, options?: {
        dirty?: boolean;
        blur?: boolean;
    }): void;
    getValue(options?: {
        skipDisabled?: boolean;
    }): T;
    /**
     * 向此控件组添加子控件
     *
     * @param key 被添加控件的键
     * @param control 被添加的控件
     */
    addControl<K extends OptionalKeys<T>>(key: K, control: AbstractControl<T[K]>): void;
    /**
     * 从此控件组中删除子控件
     *
     * @param key 被删除控件的键
     */
    removeControl<K extends OptionalKeys<T>>(key: K): void;
    /**
     * 替换现有的控件
     *
     * @param key 替换控件的键
     * @param control 替换的控件
     */
    setControl<K extends keyof T>(key: K, control: AbstractControl<T[K]>): void;
}
```

### FormArray

```ts
export class FormArray<T = any> extends AbstractControl<T[]> {
    readonly controls: ComputedRef<AbstractControl<T>[]>;
    /**
     * 子控件数组的长度
     */
    readonly length: ComputedRef<number>;
    constructor(
      /**
       * 子控件的数组，每个子控件都有一个被注册的 `index`
       */
      controls: AbstractControl<T>[],
      validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
      asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
    );
    setValue(value: T extends object ? Partial<T>[] : T[], options?: {
        dirty?: boolean;
        blur?: boolean;
    }): void;
    getValue(options?: {
        skipDisabled?: boolean;
    }): T[];
    /**
     * 通过的 `index` 获取子控件
     *
     * @param index 子控件的下标
     */
    at(index: number): AbstractControl<T> | undefined;
    /**
     * 在数组末尾插入一个新的子控件
     *
     * @param control 添加的子控件
     */
    push(control: AbstractControl<T>): void;
    /**
     * 在数组中给定的 `index` 处插入一个新的子控件
     *
     * @param index 插入控件的下标
     * @param control 插入的子控件
     */
    insert(index: number, control: AbstractControl<T>): void;
    /**
     * 删除数组中给定 `index` 处的子控件。
     *
     * @param index 删除控件的下标
     */
    removeAt(index: number): void;
    /**
     * 替换数组中给定 `index` 处现有的子控件
     *
     * @param index 替换控件的下标
     * @param control 替换的控件
     */
    setControl(index: number, control: AbstractControl<T>): void;
}
```
