<template>
  <ix-form class="demo-form" :control="formGroup">
    <ix-form-item control="username" message="Please input your username!">
      <ix-input prefix="user"></ix-input>
    </ix-form-item>
    <ix-form-item control="password" message="Please input your password, its length is 6-18!">
      <ix-input prefix="lock" :type="passwordVisible ? 'text' : 'password'">
        <template #suffix>
          <ix-icon :name="passwordVisible ? 'eye-invisible' : 'eye'" @click="passwordVisible = !passwordVisible">
          </ix-icon>
        </template>
      </ix-input>
    </ix-form-item>
    <ix-form-item control="remember">
      <ix-checkbox>Remember me</ix-checkbox>
    </ix-form-item>
    <ix-form-item>
      <ix-button mode="primary" block @click="login">Login</ix-button>
    </ix-form-item>
    <ix-row>
      <ix-col span="12">
        <a>Forgot password</a>
      </ix-col>
      <ix-col span="12" class="text-right">
        <a>Register now!</a>
      </ix-col>
    </ix-row>
  </ix-form>
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
