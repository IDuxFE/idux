<template>
  <ix-form class="demo-form" :control="formGroup" :labelCol="labelCol" :controlCol="controlCol">
    <ix-form-item control="email" label="E-mail" required>
      <ix-input></ix-input>
    </ix-form-item>
    <ix-form-item control="password" label="Password" required>
      <ix-input type="password"> </ix-input>
    </ix-form-item>
    <ix-form-item control="confirmPassword" label="Confirm Password" required>
      <ix-input type="password"> </ix-input>
    </ix-form-item>
    <ix-form-item control="nickname" label="Nickname" labelTooltip="What do you want other to call you" required>
      <ix-input> </ix-input>
    </ix-form-item>
    <ix-form-item control="phoneNumber" label="Phone Number" required>
      <ix-input control="phoneNumber">
        <template #addonBefore>
          <ix-select control="phoneNumberPrefix" style="width: 70px">
            <ix-option label="+86" value="+86"></ix-option>
            <ix-option label="+87" value="+87"></ix-option>
          </ix-select>
        </template>
      </ix-input>
    </ix-form-item>
    <ix-form-item control="website" label="Website">
      <ix-input> </ix-input>
    </ix-form-item>
    <ix-form-item control="captcha" label="Captcha" required extra="We must make sure that your are a human.">
      <ix-row gutter="8">
        <ix-col span="12">
          <ix-input> </ix-input>
        </ix-col>
        <ix-col span="12">
          <ix-button @click="getCaptcha">Get captcha</ix-button>
        </ix-col>
      </ix-row>
    </ix-form-item>
    <ix-form-item control="agree" :controlCol="noLabelControlCol">
      <ix-checkbox>I have read the <a>agreement</a> </ix-checkbox>
    </ix-form-item>
    <ix-form-item :controlCol="noLabelControlCol">
      <ix-button mode="primary" @click="register">Register</ix-button>
    </ix-form-item>
  </ix-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AbstractControl, useFormGroup, ValidateErrors, Validators } from '@idux/cdk/forms'

Validators.setMessages({
  default: '验证失败/Validation error',
  required: '必填项/Input is required',
  email: { 'zh-CN': '邮箱格式不正确', 'en-US': 'The input is not valid email' },
  minLength: {
    'zh-CN': err => `长度不能小于 ${err.minLength}, 当前 ${err.actual}`,
    'en-US': err => `Length can't be less than ${err.minLength}, current is ${err.actual}`,
  },
  maxLength: {
    'zh-CN': err => `长度不能大于 ${err.maxLength}, 当前 ${err.actual}`,
    'en-US': err => `Length can't be greater than ${err.maxLength}, current is ${err.actual}`,
  },
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

const confirmPasswordValidator = (value: string, control: AbstractControl): ValidateErrors | null => {
  if (!value) {
    return { passwordRequired: Validators.getError('passwordRequired') }
  } else if (value !== control.root.get('password')?.getValue()) {
    return { passwordConfirm: Validators.getError('passwordConfirm') }
  }
  return null
}

const mobilePhoneValidator = (value: string): ValidateErrors | null => {
  if (!value || /(^1\d{10}$)/.test(value)) {
    return null
  }
  return { mobilePhone: Validators.getError('mobilePhone') }
}

export default defineComponent({
  setup() {
    const labelCol = { sm: 8, xs: 24 }
    const controlCol = { sm: 16, xs: 24 }
    const noLabelControlCol = { sm: { offset: 8, span: 16 }, xs: 24 }

    const { required, email, minLength, maxLength } = Validators

    const formGroup = useFormGroup({
      email: ['', [required, email]],
      password: ['', [required, minLength(12), maxLength(16)]],
      confirmPassword: ['', [required, confirmPasswordValidator]],
      nickname: ['', required],
      phoneNumberPrefix: ['+86', required],
      phoneNumber: ['', [required, mobilePhoneValidator]],
      website: [],
      captcha: ['', required],
      agree: [false],
    })

    const passwordControl = formGroup.get('password')!
    const confirmPasswordControl = formGroup.get('confirmPassword')!
    passwordControl.watchValue(() => confirmPasswordControl.validate())

    const register = () => {
      if (formGroup.valid.value) {
        console.log('register', formGroup.getValue())
      } else {
        formGroup.markAsBlurred()
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
