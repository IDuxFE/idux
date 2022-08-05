
**响应式表单**提供了一种模型驱动的方式来处理表单输入。本文会向你展示如何创建和更新基本的表单控件，接下来还会在一个表单组中使用多个控件，验证表单的值，以及创建动态表单，也就是在运行期添加或移除控件。

响应式表单使用显式的、不可变的方式，管理表单在特定的时间点上的状态。对表单状态的每一次变更都会返回一个新的状态，这样可以在变化时维护模型的整体性。

## 表单控制器

- `AbstractControl`: 它提供了一些所有控件和控件组共有的行为，比如运行验证器、计算状态和重置状态，还定义了一些所有子类共享的属性，如 `value`、`status`。它是 `FormControl`、`FormGroup` 和 `FormArray` 的基类,不允许直接实例化它。
- `FormControl`: 它用于跟踪独立表单控件的值和验证状态，实现了关于访问值、验证状态、用户交互和事件的大部分基本功能。
- `FormGroup`: 它用于跟踪一组控件实例的值和有效性状态，它把每个子控件的值聚合进一个对象。它通过归集其子控件的状态值来计算出自己的状态。 比如，如果组中的任何一个控件是无效的，那么整个组就是无效的。
- `FormArray`: 它用于跟踪一个控件数组实例的值和有效性状态，它把每个子控件的值聚合进一个数组。它通过归集其子控件的状态值来计算出自己的状态。 比如，如果数组中的任何一个控件是无效的，那么整个数组就是无效的。

### 实现支持控制器的表单输入控件

自定义一个支持 `AbstractControl` 的输入控件。

更多实现细节，请参考：[IxInput](https://github.com/IDuxFE/idux/blob/main/packages/components/input/src/Input.tsx) 或其他输入型组件。

```html
<template>
  <input :value="accessor.value" :disabled="accessor.disabled" @blur="onBlur" @input="onInput" />
</template>

<script setup lang="ts">
import { AbstractControl, useAccessorAndControl } from '@idux/cdk/forms'

defineProps<{
  control?: string | number | (string | number)[] | AbstractControl
  disabled?: boolean
  value?: string
}>()

// useAccessorAndControl 内部对 props 中的 control, disabled, value 进行了处理
const { accessor, control: controlRef } = useAccessorAndControl()

// 还可以在 FormItem 组件中注册 control, 让 FormItem 获取控件的验证状态
// useFormItemRegister(controlRef)

// 表单 blur 状态
const onBlur = () => accessor.markAsBlurred()

// 表单值发生变更后的回调
const onInput = (evt: Event) => {
  const { value } = evt.target as HTMLInputElement
  accessor.setValue(value)
}
</script>
```

### 实现支持控制器的表单容器组件

自定以一个支持 `AbstractControl` 的表单组件。

更多实现细节，请参考：[Form](https://github.com/IDuxFE/idux/blob/main/packages/components/form/src/Form.tsx) 与 [FormItem](https://github.com/IDuxFE/idux/blob/main/packages/components/form/src/FormItem.tsx)。

```html
<template>
  <form><slot /></form>
</template>

<script setup lang="ts">
import { provide } from 'vue'

import { AbstractControl, FORMS_CONTROL_TOKEN, useControl } from '@idux/cdk/forms'

defineProps<{
  control?: string | number | (string | number)[] | AbstractControl
}>()

// 通过 props.control 拿到真正的 control(AbstractControl)
const controlRef = useControl()

// 注入 control, 以便子组件通过 key 获取对应的子 control
provide(FORMS_CONTROL_TOKEN, controlRef)
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

const remarks = useFormArray([['remark0'], ['remark1'], ['remark2']])

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

## FAQ

### 更多的使用示例和场景？

参见 [@idux/components/form](https://idux.site/components/form/zh)

### 更多的使用细节和文档？

参见 [@angular/forms](https://angular.cn/guide/forms-overview)
