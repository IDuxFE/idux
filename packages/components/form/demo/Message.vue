<template>
  <IxForm class="demo-form" :control="formGroup" :labelCol="labelCol" :controlCol="controlCol">
    <IxFormItem label="E-mail" required>
      <IxInput control="email"></IxInput>
    </IxFormItem>
    <IxFormItem label="Password" required>
      <IxInput control="password" type="password"> </IxInput>
    </IxFormItem>
    <IxFormItem label="Confirm Password" required>
      <IxInput control="confirmPassword" type="password"> </IxInput>
    </IxFormItem>
    <IxFormItem label="Nickname" labelTooltip="What do you want other to call you" required>
      <IxInput control="nickname"> </IxInput>
    </IxFormItem>
    <IxFormItem control="phoneNumber" label="Phone Number" required>
      <IxInput control="phoneNumber">
        <template #addonBefore>
          <IxSelect control="phoneNumberPrefix" style="width: 70px">
            <IxSelectOption key="+86" label="+86"></IxSelectOption>
            <IxSelectOption key="+87" label="+87"></IxSelectOption>
          </IxSelect>
        </template>
      </IxInput>
    </IxFormItem>
    <IxFormItem label="Website">
      <IxInput control="website"> </IxInput>
    </IxFormItem>
    <IxFormItem label="Captcha" required extra="We must make sure that your are a human.">
      <IxRow gutter="8">
        <IxCol span="12">
          <IxInput control="captcha"> </IxInput>
        </IxCol>
        <IxCol span="12">
          <IxButton @click="getCaptcha">Get captcha</IxButton>
        </IxCol>
      </IxRow>
    </IxFormItem>
    <IxFormItem :controlCol="noLabelControlCol">
      <IxCheckbox control="agree">I have read the <a>agreement</a> </IxCheckbox>
    </IxFormItem>
    <IxFormItem :controlCol="noLabelControlCol">
      <IxButton mode="primary" @click="register">Register</IxButton>
    </IxFormItem>
  </IxForm>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { AbstractControl, ValidateErrors, Validators, useFormGroup } from '@idux/cdk/forms'

Validators.setMessages({
  required: (_err, _control) => '必填项/Input is required',
  passwordRequired: {
    'zh-CN': '请确认你的密码',
    'en-US': 'Please confirm your password',
  },
  passwordConfirm: {
    'zh-CN': '两次密码输入不一致',
    'en-US': 'Two passwords that you enter is inconsistent',
  },
  mobilePhone: {
    'zh-CN': '手机号码格式不正确',
    'en-US': 'Mobile phone number is not valid',
  },
})

const confirmPasswordValidator = (value: string, control: AbstractControl): ValidateErrors | undefined => {
  if (!value) {
    return { passwordRequired: Validators.getError('passwordRequired', control) }
  } else if (value !== control.root.get('password')?.getValue()) {
    return { passwordConfirm: Validators.getError('passwordConfirm', control) }
  }
  return undefined
}

const mobilePhoneValidator = (value: string, control: AbstractControl): ValidateErrors | undefined => {
  if (!value || /(^1\d{10}$)/.test(value)) {
    return undefined
  }
  return { mobilePhone: Validators.getError('mobilePhone', control) }
}

export default defineComponent({
  setup() {
    const labelCol = { sm: 8, xs: 24 }
    const controlCol = { sm: 16, xs: 24 }
    const noLabelControlCol = { sm: { offset: 8, span: 16 }, xs: 24 }

    const { required, email, minLength, maxLength } = Validators

    const formGroup = useFormGroup({
      email: ['', { name: 'E-mail', validators: [required, email] }],
      password: ['', [required, minLength(12), maxLength(16)]],
      confirmPassword: ['', [required, confirmPasswordValidator]],
      nickname: ['', [required]],
      phoneNumberPrefix: ['+86', [required]],
      phoneNumber: ['', [required, mobilePhoneValidator]],
      website: ['', [required]],
      captcha: ['', [required]],
      agree: [false],
    })

    const passwordControl = formGroup.get('password')!
    const confirmPasswordControl = formGroup.get('confirmPassword')!
    passwordControl.watchValue(() => confirmPasswordControl.validate())

    const register = () => {
      if (formGroup.valid.value) {
        console.log('register', formGroup.getValue())
      } else {
        formGroup.markAsDirty()
      }
    }

    const getCaptcha = () => console.log('getCaptcha')

    return { labelCol, controlCol, noLabelControlCol, formGroup, register, getCaptcha }
  },
})
</script>

<style lang="less" scoped>
.demo-form {
  max-width: 400px;
}
</style>
