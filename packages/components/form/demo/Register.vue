<template>
  <ix-form class="demo-form" :control="formGroup" :labelCol="labelCol" :controlCol="controlCol">
    <ix-form-item control="email" label="E-mail" labelFor="email" required message="Please input a valid E-mail!">
      <ix-input id="email"></ix-input>
    </ix-form-item>
    <ix-form-item
      control="password"
      label="Password"
      labelFor="password"
      required
      message="Please input your password!"
    >
      <ix-input id="password" type="password"> </ix-input>
    </ix-form-item>
    <ix-form-item control="confirmPassword" label="Confirm Password" labelFor="confirmPassword" required>
      <ix-input id="confirmPassword" type="password"> </ix-input>
    </ix-form-item>
    <ix-form-item
      control="nickname"
      label="Nickname"
      labelFor="nickname"
      labelTooltip="What do you want other to call you"
      required
      message="Please input your nickname!"
    >
      <ix-input id="nickname"> </ix-input>
    </ix-form-item>
    <ix-form-item
      control="phoneNumber"
      label="Phone Number"
      labelFor="phoneNumber"
      required
      message="Please input your phone number!"
    >
      <ix-input id="phoneNumber" control="phoneNumber">
        <template #addonBefore>
          <ix-select control="phoneNumberPrefix" style="width: 70px">
            <ix-option label="+86" value="+86"></ix-option>
            <ix-option label="+87" value="+87"></ix-option>
          </ix-select>
        </template>
      </ix-input>
    </ix-form-item>
    <ix-form-item control="website" label="Website" labelFor="website">
      <ix-input id="website"> </ix-input>
    </ix-form-item>
    <ix-form-item
      control="captcha"
      label="Captcha"
      labelFor="captcha"
      required
      message="Please input the captcha you got!"
      extra="We must make sure that your are a human."
    >
      <ix-row gutter="8">
        <ix-col span="12">
          <ix-input id="captcha"> </ix-input>
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

const confirmPasswordValidator = (value: string, control: AbstractControl): ValidateErrors | null => {
  if (!value) {
    return { required: { message: 'Please confirm your password!' } }
  } else if (value !== control.root.get('password')?.getValue()) {
    return { confirm: { message: 'Two passwords that you enter is inconsistent!' } }
  }
  return null
}

export default defineComponent({
  setup() {
    const labelCol = { sm: 8, xs: 24 }
    const controlCol = { sm: 16, xs: 24 }
    const noLabelControlCol = { sm: { offset: 8, span: 16 }, xs: 24 }

    const { required, email } = Validators

    const formGroup = useFormGroup({
      email: ['', [required, email]],
      password: ['', required],
      confirmPassword: ['', [required, confirmPasswordValidator]],
      nickname: ['', required],
      phoneNumberPrefix: ['+86', required],
      phoneNumber: ['', required],
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
