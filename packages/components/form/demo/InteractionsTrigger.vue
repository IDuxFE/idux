<template>
  <IxForm class="demo-form" :control="formGroup">
    <IxFormItem message="Please input your username!">
      <IxInput control="username" prefix="user"></IxInput>
    </IxFormItem>
    <IxFormItem message="Please input your password, its length is 6-18!">
      <IxInput control="password" prefix="lock" :type="passwordVisible ? 'text' : 'password'">
        <template #suffix>
          <IxIcon :name="passwordVisible ? 'eye-invisible' : 'eye'" @click="passwordVisible = !passwordVisible">
          </IxIcon>
        </template>
      </IxInput>
    </IxFormItem>
    <IxFormItem messageTooltip>
      <IxCheckbox control="remember">Remember me</IxCheckbox>
    </IxFormItem>
    <IxFormItem style="margin: 8px 0" messageTooltip>
      <IxButton mode="primary" block type="submit" @click="login">Login</IxButton>
    </IxFormItem>
    <IxRow>
      <IxCol span="12">
        <a>Forgot password</a>
      </IxCol>
      <IxCol span="12" class="text-right">
        <a>Register now!</a>
      </IxCol>
    </IxRow>
  </IxForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Validators, useFormGroup } from '@idux/cdk/forms'

const { required, minLength, maxLength } = Validators

const formGroup = useFormGroup(
  {
    username: ['', required],
    password: ['', [required, minLength(6), maxLength(18)]],
    remember: [true],
  },
  { trigger: 'interactions' },
)

const login = () => {
  if (formGroup.valid.value) {
    console.log('login', formGroup.getValue())
  } else {
    formGroup.markAsDirty()
  }
}

const passwordVisible = ref(false)
</script>

<style lang="less" scoped>
.demo-form {
  max-width: 300px;
}

.text-right {
  text-align: right;
}
</style>
