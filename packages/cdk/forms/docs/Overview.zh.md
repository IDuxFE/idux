
**响应式表单**提供了一种模型驱动的方式来处理表单输入。本文会向你展示如何创建和更新基本的表单控件，接下来还会在一个表单组中使用多个控件，验证表单的值，以及创建动态表单，也就是在运行期添加或移除控件。

响应式表单使用显式的、不可变的方式，管理表单在特定的时间点上的状态。对表单状态的每一次变更都会返回一个新的状态，这样可以在变化时维护模型的整体性。

## 表单控制器

- `AbstractControl`: 它提供了一些所有控件和控件组共有的行为，比如运行验证器、计算状态和重置状态，还定义了一些所有子类共享的属性，如 `value`、`status`。它是 `FormControl`、`FormGroup` 和 `FormArray` 的基类,不允许直接实例化它。
- `FormControl`: 它用于跟踪独立表单控件的值和验证状态，实现了关于访问值、验证状态、用户交互和事件的大部分基本功能。
- `FormGroup`: 它用于跟踪一组控件实例的值和有效性状态，它把每个子控件的值聚合进一个对象。它通过归集其子控件的状态值来计算出自己的状态。 比如，如果组中的任何一个控件是无效的，那么整个组就是无效的。
- `FormArray`: 它用于跟踪一个控件数组实例的值和有效性状态，它把每个子控件的值聚合进一个数组。它通过归集其子控件的状态值来计算出自己的状态。 比如，如果数组中的任何一个控件是无效的，那么整个数组就是无效的。

### 实现支持控制器的输入控件

自定义一个支持 `AbstractControl` 的输入控件。

更多实现细节，请参考：[IxInput](https://github.com/IDuxFE/idux/blob/main/packages/components/input/src/Input.tsx) 或其他输入型组件。

```html
<template>
  <input class="custom-input" :value="valueRef" :disabled="isDisabled" @blur="onBlur" @input="onInput" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AbstractControl, useValueAccessor, useValueControl } from '@idux/cdk/forms'

defineProps<{
  value?: string
  control?: string | AbstractControl
  disabled?: boolean
}>()

// 使用 valueAccessor 接管 props.value 的控制
const control = useValueControl()
const accessor = useValueAccessor({ control })

// 表单绑定的值
const valueRef = computed(() => accessor.valueRef.value)
// 表单禁用状态
const isDisabled = computed(() => accessor.disabled.value)
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

### 实现支持控制器的表单组件

自定以一个支持 `AbstractControl` 的表单组件。

更多实现细节，请参考：[IxForm](https://github.com/IDuxFE/idux/blob/main/packages/components/form/src/Form.tsx) 与 [IxFormItem](https://github.com/IDuxFE/idux/blob/main/packages/components/form/src/FormItem.tsx)。

```html
<template>
  <form class="custom-form"><slot /></form>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { AbstractControl, FORMS_CONTROL_TOKEN, useValueControl } from '@idux/cdk/forms'

defineProps<{
  control?: string | AbstractControl
}>()

// 使用 valueControl 接管 props.control 的控制
const control = useValueControl()

// 注入父 control, 以便子组件通过 key 获取对应的子 control
provide(FORMS_CONTROL_TOKEN, control)
</script>
```

### 使用响应式表单

下例展示了最简单的用法, 包含了嵌套表单和表单数组，更多的使用场景和示例，参见 [@idux/components/form](https://idux.site/components/form/zh)

```html
<template>
  <CustomForm :control="formGroup">
    Name: <CustomInput control="name" /> <br />
    Age: <CustomInput control="age" /> <br />
    Email: <CustomInput control="email" /> <br />
    City: <CustomInput control="address.city" /> <br />
    Street: <CustomInput control="address.street" /> <br />
    Zip: <CustomInput control="address.zip" /> <br />
    Remark-0: <CustomInput control="remarks.0" /> <br />
    Remark-1:<CustomInput control="remarks.1" /> <br />
    Remark-2:<CustomInput control="remarks.2" /> <br />

    <IxButton mode="primary" @click="onSubmit">Submit</IxButton>
  </CustomForm>
</template>

<script setup lang="ts">
import { Validators, useFormGroup } from '@idux/cdk/forms'

import { useFormArray } from '../src/useForms'
import CustomForm from './CustomForm.vue'
import CustomInput from './CustomInput.vue'

const { required, min, max, email } = Validators

const address = useFormGroup({
  city: ['', required],
  street: ['', required],
  zip: [''],
})

const remarks = useFormArray<string[]>([['remark0'], ['remark1'], ['remark2']])

const formGroup = useFormGroup({
  name: ['tom', required],
  age: [18, [required, min(1), max(30)]],
  email: ['', [email]],
  address: address,
  remarks: remarks,
})

formGroup.watchValue(value => console.log('group value:', value))
formGroup.watchStatus(stats => console.log('group status:', stats))

const nameControl = formGroup.get('name')
nameControl.watchStatus(value => console.log('name value:', value))
nameControl.watchStatus(stats => console.log('name status:', stats))

const onSubmit = () => {
  if (formGroup.valid.value) {
    console.log('submit', formGroup.getValue())
  } else {
    console.log('formGroup invalid: ', formGroup)
  }
}
</script>
```

## 表单验证

通过验证用户输入的准确性和完整性，可以提高整体的数据质量。该页面显示了如何从 UI 验证用户输入，以及如何在响应式表单中显示有用的验证消息。

在响应式表单中，应该在组件类中直接把验证器函数添加到表单控件模型上（`AbstractControl`）。一旦控件发生了变化，就会调用这些函数。

### 验证器函数 (Validator)

验证器函数可以是同步函数，也可以是异步函数。

- 同步验证器：这些同步函数接受一个控件实例，如果验证失败，会返回一组验证错误。可以在实例化一个 `AbstractControl` 时把它作为构造函数的第二个参数传进去。
- 异步验证器：这些异步函数接受一个控件实例并返回一个 `Promise`，如果验证失败，它稍后会发出一组验证错误。在实例化 `AbstractControl` 时，可以把它们作为第三个参数传入。

出于性能方面的考虑，只有在所有同步验证器都通过之后，才会运行异步验证器。当每一个异步验证器都执行完之后，才会设置这些验证错误。

### 内置验证器函数

`@idux/cdk/forms` 提供了一些常见的内置验证器。

```ts
import { Validators, useFormGroup } from '@idux/cdk/forms'

const { required, minLength, min, max } = Validators
const formGroup = useFormGroup({
  name: ['tom', [required, minLength(3)]],
  age: [18, min(6)],
})
```

在上面的示例中，`name` 设置了 2 个内置验证器，`required` 和 `minLength(3)`, 而 `age` 则设置了 1 个验证器 `min(6)`.

所有这些验证器都是同步的，所以它们作为第二个参数传递。

### 自定义同步验证器

内置的验证器并不是总能精确匹配应用中的用例，因此有时你需要创建一个自定义验证器。

```ts
const mobilePhoneValidator = (value: string): ValidateErrors | undefined => {
  if (!value || /(^1\d{10}$)/.test(value)) {
    return undefined
  }
  return { mobilePhone: { message: 'Mobile phone number is not valid' } }
}

const confirmPasswordValidator = (value: string, control: AbstractControl): ValidateErrors | undefined => {
  if (!value) {
    return { passwordRequired: { message: 'Please confirm your password' } }
  } else if (value !== control.root.get('password').getValue()) {
    return { passwordConfirm:  { message: 'Two passwords that you enter is inconsistent' } }
  }
  return undefined
}

const formGroup = useFormGroup({
  password: ['', [required, minLength(12), maxLength(16)]],
  confirmPassword: ['', [required, confirmPasswordValidator]],
  phoneNumber: ['', mobilePhoneValidator],
})
```

在上面的示例中，`mobilePhoneValidator` 是一个手机号码的验证器，如果验证失败，他会返回一个包含错误提示的对象。`confirmPasswordValidator` 是一个二次确认密码的验证器，他会通过 `root` 找到需要比对的值，然后进行验证。

### 跨字段交叉验证

其实上面的 `confirmPasswordValidator` 就是一个跨字段验证器，你可以通过第二个参数 `control` 的父控制器 (`control.parent`) 或者根控制器 (`control.root`) 来获取其他兄弟控件。

另外，你还可以在他们共同的祖先控件中执行验证函数。

```ts

const confirmPasswordValidator = (value: string, control: AbstractControl): ValidateErrors | undefined => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password.getValue() === confirmPassword.getValue()) {
    return undefined
  }
  return { passwordConfirm:  { message: 'Two passwords that you enter is inconsistent' } }
}

const formGroup = useFormGroup({
  password: ['', [required, minLength(12), maxLength(16)]],
  confirmPassword: ['', [required]],
}, { validators: [confirmPasswordValidator]})
```

### 自定义异步验证器

其实异步验证器和上面的同步验证器很像，只是它们必须返回一个稍后会输出 `undefined` 或验证错误对象的承诺 (Promise)。

```ts
const usernameValidator = (name: string): ValidateErrors | undefined => {
  if (!name) {
    return undefined
  }
  return  new Promise(resolve => {
    setTimeout(() => {
      const error = name === 'tom' ? { username: { message: 'The username is redundant' } } : undefined
      resolve(error)
    },100)  
  })
}

const formGroup = useFormGroup({
  username: ['', required, usernameValidator],
})
```

#### 优化异步验证器的性能

默认情况下，所有验证程序在每次表单值更改后都会运行。对于同步验证器，这通常不会对应用性能产生明显的影响。但是，异步验证器通常会执行某种 HTTP 请求来验证控件。每次按键后调度一次 HTTP 请求都会给后端 API 带来压力，应该尽可能避免。

你可以把 `trigger` 属性从 `change`（默认值）改成 `blur` 或 `submit` 来推迟表单验证的时机。

```ts
const formGroup = useFormGroup({
  username: ['', { 
    trigger: 'blur',
    validators: required,
    asyncValidators: usernameValidator
    }],
})
```

## 类型定义

### AbstractControl

```ts
export declare abstract class AbstractControl<T = any> {
  readonly uid: number;
  /**
   * A collection of child controls.
   */
  readonly controls: ComputedRef<GroupControls<T> | AbstractControl<ArrayElement<T>>[] | undefined>;
  /**
   * The ref value for the control.
   */
  readonly valueRef: ComputedRef<T>;
  /**
   * The validation status of the control, there are three possible validation status values:
   * * **valid**: This control has passed all validation checks.
   * * **invalid**: This control has failed at least one validation check.
   * * **validating**: This control is in the midst of conducting a validation check.
   */
  readonly status: ComputedRef<ValidateStatus>;
  /**
   * An object containing any errors generated by failing validation, or undefined if there are no errors.
   */
  readonly errors: ComputedRef<ValidateErrors | undefined>;
  /**
   * A control is valid when its `status` is `valid`.
   */
  readonly valid: ComputedRef<boolean>;
  /**
   * A control is invalid when its `status` is `invalid`.
   */
  readonly invalid: ComputedRef<boolean>;
  /**
   * A control is validating when its `status` is `validating`.
   */
  readonly validating: ComputedRef<boolean>;
  /**
   * A control is validating when its `status` is `disabled`.
   */
  readonly disabled: ComputedRef<boolean>;
  /**
   * A control is marked `blurred` once the user has triggered a `blur` event on it.
   */
  readonly blurred: ComputedRef<boolean>;
  /**
   * A control is `unblurred` if the user has not yet triggered a `blur` event on it.
   */
  readonly unblurred: ComputedRef<boolean>;
  /**
   * A control is `dirty` if the user has changed the value in the UI.
   */
  readonly dirty: ComputedRef<boolean>;
  /**
   * A control is `pristine` if the user has not yet changed the value in the UI.
   */
  readonly pristine: ComputedRef<boolean>;
  /**
   * The parent control.
   */
  get parent(): AbstractControl | undefined;
  /**
   * Retrieves the top-level ancestor of this control.
   */
  get root(): AbstractControl<T>;
  /**
   * Reports the trigger validate of the `AbstractControl`.
   * Possible values: `'change'` | `'blur'` | `'submit'`
   * Default value: `'change'`
   */
  get trigger(): TriggerType;
  /**
   * Sets a new value for the control.
   *
   * @param value The new value.
   * @param options Configuration options that emits events when the value changes.
   * * `dirty`: Marks it dirty, default is false.
   */
  abstract setValue(value: T | Partial<T>, options?: { dirty?: boolean }): void;
  /**
   * The aggregate value of the control.
   */
  abstract getValue(): T;
  /**
   * Resets the control, marking it `unblurred` `pristine`, and setting the value to initialization value.
   */
  reset(): void;
  /**
   * Running validations manually, rather than automatically.
   */
  validate(): Promise<ValidateErrors | undefined>;
  /**
   * Marks the control as `disable`.
   */
  disable(): void;
  /**
   * Enables the control,
   */
  enable(): void;
  /**
   * Marks the control as `blurred`.
   */
  markAsBlurred(): void;
  /**
   * Marks the control as `unblurred`.
   */
  markAsUnblurred(): void;
  /**
   * Marks the control as `dirty`.
   */
  markAsDirty(): void;
  /**
   * Marks the control as `pristine`.
   */
  markAsPristine(): void;
  /**
   * Sets the new sync validator for the form control, it overwrites existing sync validators.
   * If you want to clear all sync validators, you can pass in a undefined.
   */
  setValidator(newValidator?: ValidatorFn | ValidatorFn[]): void;
  /**
   * Sets the new async validator for the form control, it overwrites existing async validators.
   * If you want to clear all async validators, you can pass in a undefined.
   */
  setAsyncValidator(newAsyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | undefined): void;
  /**
   * Retrieves a child control given the control's name or path.
   *
   * @param path A dot-delimited string or array of string/number values that define the path to the
   * control.
   */
  get<K extends OptionalKeys<T>>(path: K): AbstractControl<T[K]> | undefined;
  get<K extends keyof T>(path: K): AbstractControl<T[K]>;
  get<TK = any>(path: ControlPathType): AbstractControl<TK> | undefined;
  /**
   * Sets errors on a form control when running validations manually, rather than automatically.
   */
  setErrors(errors?: ValidateErrors): void;
  /**
   * Reports error data for the control with the given path.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   */
  getError(errorCode: string, path?: ControlPathType): ValidateError | undefined;
  /**
   * Reports whether the control with the given path has the error specified.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   */
  hasError(errorCode: string, path?: ControlPathType): boolean;
  /**
   * @param parent Sets the parent of the control
   */
  setParent(parent: AbstractControl): void;
  /**
   * Watch the ref value for the control.
   *
   * @param cb The callback when the value changes
   * @param options Optional options of watch
   */
  watchValue(cb: WatchCallback<T, T | undefined>, options?: WatchOptions): WatchStopHandle;
  /**
   * Watch the status for the control.
   *
   * @param cb The callback when the status changes
   * @param options Optional options of watch
   */
  watchStatus(cb: WatchCallback<ValidateStatus, ValidateStatus | undefined>, options?: WatchOptions): WatchStopHandle;
}
```

### FormGroup

```ts
export declare class FormGroup<T extends Record<string, any> = Record<string, any>> extends AbstractControl<T> {
  /**
   * A collection of child controls. The key for each child is the name under which it is registered.
   */
  readonly controls: ComputedRef<GroupControls<T>>;
  setValue(value: Partial<T>, options?: { dirty?: boolean }): void;
  getValue(): T;
  /**
   * Add a control to this form group.
   *
   * @param name The control name to add to the collection
   * @param control Provides the control for the given name
   */
  addControl<K extends OptionalKeys<T>>(name: K, control: AbstractControl<T[K]>): void;
  /**
   * Remove a control from this form group.
   *
   * @param name The control name to remove from the collection
   */
  removeControl<K extends OptionalKeys<T>>(name: K): void;
  /**
   * Replace an existing control.
   *
   * @param name The control name to replace in the collection
   * @param control Provides the control for the given name
   */
  setControl<K extends keyof T>(name: K, control: AbstractControl<T[K]>): void;
}
```

### FormArray

```ts
export declare class FormArray<T extends any[] = any[]> extends AbstractControl<T> {
  /**
   * An array of child controls. Each child control is given an index where it is registered.
   */
  readonly controls: ComputedRef<AbstractControl<ArrayElement<T>>[]>;
  /**
   * Length of the control array.
   */
  readonly length: ComputedRef<number>;
  setValue(value: Partial<ArrayElement<T>>[], options?: { dirty?: boolean }): void;
  getValue(): T;
  /**
   * Get the `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to retrieve the control
   */
  at(index: number): AbstractControl<ArrayElement<T>>;
  /**
   * Insert a new `AbstractControl` at the end of the array.
   *
   * @param control Form control to be inserted
   */
  push(control: AbstractControl<ArrayElement<T>>): void;
  /**
   * Insert a new `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to insert the control
   * @param control Form control to be inserted
   */
  insert(index: number, control: AbstractControl<ArrayElement<T>>): void;
  /**
   * Remove the control at the given `index` in the array.
   *
   * @param index Index in the array to remove the control
   */
  removeAt(index: number): void;
  /**
   * Replace an existing control.
   *
   * @param index Index in the array to replace the control
   * @param control The `AbstractControl` control to replace the existing control
   */
  setControl(index: number, control: AbstractControl<ArrayElement<T>>): void;
}
```

### FormControl

```ts
export declare class FormControl<T = any> extends AbstractControl<T> {
  setValue(value: T, options?: { dirty?: boolean }): void;
  getValue(): T;
}
```
