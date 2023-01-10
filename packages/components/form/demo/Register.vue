<template>
  <IxForm class="demo-form" :control="formGroup" :labelCol="labelCol" :controlCol="controlCol">
    <IxFormItem label="E-mail" labelFor="email" required message="Please input a valid E-mail!">
      <IxInput id="email" control="email"></IxInput>
    </IxFormItem>
    <IxFormItem label="Password" labelFor="password" required message="Please input your password!">
      <IxInput id="password" control="password" type="password"> </IxInput>
    </IxFormItem>
    <IxFormItem label="Confirm Password" labelFor="confirmPassword" required>
      <IxInput id="confirmPassword" control="confirmPassword" type="password"> </IxInput>
    </IxFormItem>
    <IxFormItem
      label="Nickname"
      labelFor="nickname"
      labelTooltip="What do you want other to call you"
      required
      message="Please input your nickname!"
    >
      <IxInput id="nickname" control="nickname"> </IxInput>
    </IxFormItem>
    <IxFormItem
      control="phoneNumber"
      label="Phone Number"
      labelFor="phoneNumber"
      required
      message="Please input your phone number!"
    >
      <IxInput id="phoneNumber" control="phoneNumber">
        <template #addonBefore>
          <IxSelect control="phoneNumberPrefix" style="width: 70px">
            <IxSelectOption key="+86" label="+86"></IxSelectOption>
            <IxSelectOption key="+87" label="+87"></IxSelectOption>
          </IxSelect>
        </template>
      </IxInput>
    </IxFormItem>
    <IxFormItem label="Website" labelFor="website">
      <IxInput id="website" control="website"> </IxInput>
    </IxFormItem>
    <IxFormItem label="time" labelFor="time" required>
      <IxTimePicker control="time"></IxTimePicker>
    </IxFormItem>
    <IxFormItem
      label="Captcha"
      labelFor="captcha"
      required
      message="Please input the captcha you got!"
      description="We must make sure that your are a human."
    >
      <IxRow gutter="8">
        <IxCol span="12">
          <IxInput id="captcha" control="captcha"> </IxInput>
        </IxCol>
        <IxCol span="12">
          <IxButton @click="getCaptcha">Get captcha</IxButton>
        </IxCol>
      </IxRow>
    </IxFormItem>
    <IxFormItem control="agree" :controlCol="noLabelControlCol">
      <IxCheckbox control="agree">I have read the <a>agreement</a> </IxCheckbox>
    </IxFormItem>
    <IxFormItem :controlCol="noLabelControlCol">
      <IxButton mode="primary" type="submit" @click="register">Register</IxButton>
    </IxFormItem>
  </IxForm>
</template>

<script setup lang="ts">
import { AbstractControl, ValidateErrors, Validators, useFormGroup } from '@idux/cdk/forms'

const confirmPasswordValidator = (value: string, control: AbstractControl): ValidateErrors | undefined => {
  if (!value) {
    return { required: { message: 'Please confirm your password!' } }
  } else if (value !== control.root.get('password')?.getValue()) {
    return { confirm: { message: 'Two passwords that you enter is inconsistent!' } }
  }
  return undefined
}

const labelCol = { sm: 8, xs: 24 }
const controlCol = { sm: 16, xs: 24 }
const noLabelControlCol = { sm: { offset: 8, span: 16 }, xs: 24 }

const { required, email } = Validators

const formGroup = useFormGroup({
  email: ['', [required, email]],
  password: ['', required],
  confirmPassword: [
    '',
    {
      validators: [required, confirmPasswordValidator],
      disabled: (control, initializing) => (initializing ? true : control.root.get('password')!.invalid.value),
    },
  ],
  nickname: ['', required],
  phoneNumberPrefix: ['+86', required],
  phoneNumber: ['', required],
  website: [''],
  time: [Date.now(), required],
  captcha: [
    '',
    {
      validators: [required],
      disabled: (control, initializing) => (initializing ? true : !control.root.get('agree')!.valueRef.value),
    },
  ],
  agree: [false],
})

const passwordControl = formGroup.get('password')
const confirmPasswordControl = formGroup.get('confirmPassword')
passwordControl.watchValue(() => confirmPasswordControl.validate())

const register = () => {
  if (formGroup.valid.value) {
    console.log('register', formGroup.getValue())
  } else {
    formGroup.markAsDirty()
  }
}

const getCaptcha = () => console.log('getCaptcha')
</script>

<style lang="less" scoped>
.demo-form {
  max-width: 400px;
}
</style>
