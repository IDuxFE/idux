<template>
  <IxForm class="demo-form" :control="formGroup">
    <IxFormItem control="username" message="Please input your username!">
      <IxInput control="username" prefix="user"></IxInput>
    </IxFormItem>
    <IxFormItem control="password" message="Please input your password, its length is 6-18!">
      <IxInput control="password" prefix="lock" :type="passwordVisible ? 'text' : 'password'">
        <template #suffix>
          <IxIcon :name="passwordVisible ? 'eye-invisible' : 'eye'" @click="passwordVisible = !passwordVisible">
          </IxIcon>
        </template>
      </IxInput>
    </IxFormItem>
    <IxFormItem control="remember">
      <IxCheckbox control="remember">Remember me</IxCheckbox>
    </IxFormItem>
    <IxFormItem>
      <IxButton mode="primary" block @click="login">Login</IxButton>
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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useFormGroup, Validators } from '@idux/cdk/forms'

export default defineComponent({
  setup() {
    const { required, minLength, maxLength } = Validators

    const formGroup = useFormGroup({
      username: ['', required],
      password: ['', [required, minLength(6), maxLength(18)]],
      remember: [true],
    })

    const login = () => {
      if (formGroup.valid.value) {
        console.log('login', formGroup.getValue())
      } else {
        formGroup.markAsDirty()
      }
    }

    const passwordVisible = ref(false)

    return { formGroup, login, passwordVisible }
  },
})
</script>

<style lang="less" scoped>
.demo-form {
  max-width: 300px;
}

.text-right {
  text-align: right;
}
</style>
