<template>
  <ix-form class="demo-form" :control="formGroup" labelCol="6">
    <ix-form-item control="method" label="Method" required message="Please select your contact method!">
      <ix-select>
        <ix-option label="E-mail" value="email"></ix-option>
        <ix-option label="MobilePhone" value="mobilePhone"></ix-option>
      </ix-select>
    </ix-form-item>
    <ix-form-item control="contact" label="Contact" required :message="getContactMessage">
      <ix-input></ix-input>
    </ix-form-item>
    <ix-form-item control="subscribe" :controlCol="{ offset: 6 }">
      <ix-checkbox>Subscribe notifications</ix-checkbox>
    </ix-form-item>
    <ix-form-item :controlCol="{ offset: 6 }">
      <ix-button mode="primary" @click="onSubmit">Submit</ix-button>
    </ix-form-item>
  </ix-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AbstractControl, useFormGroup, Validators } from '@idux/cdk/forms'

const mobilePhoneValidator = (value: string) => {
  if (!value || /(^1\d{10}$)/.test(value)) {
    return null
  }
  return { mobilePhone: { message: 'Mobile phone number is not valid!' } }
}

export default defineComponent({
  setup() {
    const { required, email } = Validators

    const formGroup = useFormGroup({
      method: ['email', required],
      contact: ['', [required, email]],
      subscribe: [true],
    })

    const methodControl = formGroup.get<string>('method')!
    const contactControl = formGroup.get<string>('contact')!
    const subscribeControl = formGroup.get<boolean>('subscribe')!

    methodControl.watchValue(value => {
      if (value === 'mobilePhone') {
        subscribeControl.disable()
        subscribeControl.setValue(false)
        contactControl.setValidator([required, mobilePhoneValidator])
      } else {
        subscribeControl.enable()
        subscribeControl.setValue(true)
        contactControl.setValidator([required, email])
      }

      contactControl.reset()
    })

    const getContactMessage = (control: AbstractControl) => {
      if (control.hasError('required')) {
        return 'Please input your contact number!'
      }
      if (control.hasError('email')) {
        return 'The input is not valid email!'
      }
      if (control.hasError('mobilePhone')) {
        return control.getError('mobilePhone')!.message
      }
      return ''
    }

    const onSubmit = () => {
      if (formGroup.valid.value) {
        console.log('submit', formGroup.getValue())
      } else {
        formGroup.markAsBlurred()
      }
    }

    return { formGroup, getContactMessage, onSubmit }
  },
})
</script>

<style lang="less" scoped>
.demo-form {
  max-width: 300px;
}
</style>
