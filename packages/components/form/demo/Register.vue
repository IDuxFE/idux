<template>
  <IxForm class="demo-form" :control="formGroup" :labelCol="labelCol" :controlCol="controlCol">
    <IxFormItem control="email" label="E-mail" labelFor="email" required message="Please input a valid E-mail!">
      <IxInput id="email"></IxInput>
    </IxFormItem>
    <IxFormItem control="password" label="Password" labelFor="password" required message="Please input your password!">
      <IxInput id="password" type="password"> </IxInput>
    </IxFormItem>
    <IxFormItem control="confirmPassword" label="Confirm Password" labelFor="confirmPassword" required>
      <IxInput id="confirmPassword" type="password"> </IxInput>
    </IxFormItem>
    <IxFormItem
      control="nickname"
      label="Nickname"
      labelFor="nickname"
      labelTooltip="What do you want other to call you"
      required
      message="Please input your nickname!"
    >
      <IxInput id="nickname"> </IxInput>
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
            <IxSelectOption label="+86" value="+86"></IxSelectOption>
            <IxSelectOption label="+87" value="+87"></IxSelectOption>
          </IxSelect>
        </template>
      </IxInput>
    </IxFormItem>
    <IxFormItem control="website" label="Website" labelFor="website">
      <IxInput id="website"> </IxInput>
    </IxFormItem>
    <IxFormItem
      control="captcha"
      label="Captcha"
      labelFor="captcha"
      required
      message="Please input the captcha you got!"
      extra="We must make sure that your are a human."
    >
      <IxRow gutter="8">
        <IxCol span="12">
          <IxInput id="captcha"> </IxInput>
        </IxCol>
        <IxCol span="12">
          <IxButton @click="getCaptcha">Get captcha</IxButton>
        </IxCol>
      </IxRow>
    </IxFormItem>
    <IxFormItem control="agree" :controlCol="noLabelControlCol">
      <IxCheckbox>I have read the <a>agreement</a> </IxCheckbox>
    </IxFormItem>
    <IxFormItem :controlCol="noLabelControlCol">
      <IxButton mode="primary" @click="register">Register</IxButton>
    </IxFormItem>
  </IxForm>
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
