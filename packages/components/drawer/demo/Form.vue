<template>
  <IxButton mode="primary" @click="showDrawer"> Create </IxButton>

  <IxDrawer v-model:visible="visible" header="Create a new user">
    <IxForm :control="formGroup" :labelCol="{ sm: 8, xs: 24 }" :controlCol="{ sm: 16, xs: 24 }">
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
      <IxFormItem
        label="Captcha"
        labelFor="captcha"
        required
        message="Please input the captcha you got!"
        extra="We must make sure that your are a human."
      >
        <IxRow gutter="8">
          <IxCol span="12">
            <IxInput id="captcha" control="captcha"> </IxInput>
          </IxCol>
          <IxCol span="12">
            <IxButton>Get captcha</IxButton>
          </IxCol>
        </IxRow>
      </IxFormItem>
      <IxFormItem control="agree" :controlCol="{ sm: { offset: 8, span: 16 }, xs: 24 }">
        <IxCheckbox control="agree">I have read the <a>agreement</a> </IxCheckbox>
      </IxFormItem>
    </IxForm>
    <template #footer>
      <IxButton mode="primary" @click="register">Register</IxButton>
      <IxButton @click="clear">clear</IxButton>
    </template>
  </IxDrawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Validators, useFormGroup } from '@idux/cdk/forms'

const visible = ref(false)

const showDrawer = () => {
  visible.value = !visible.value
}

const { required, email } = Validators

const formGroup = useFormGroup({
  email: ['', [required, email]],
  password: ['', required],
  confirmPassword: ['', [required]],
  nickname: ['', required],
  phoneNumberPrefix: ['+86', required],
  phoneNumber: ['', required],
  website: [''],
  captcha: ['', required],
  agree: [false],
})

const register = () => {
  if (formGroup.valid.value) {
    console.log('register', formGroup.getValue())
  } else {
    formGroup.markAsDirty()
  }
}

const clear = () => formGroup.reset()
</script>
