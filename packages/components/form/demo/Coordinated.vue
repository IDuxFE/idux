<template>
  <IxForm class="demo-form" :control="formGroup" labelCol="6">
    <IxFormItem label="Method" required message="Please select your contact method!">
      <IxSelect control="method">
        <IxSelectOption key="email" label="E-mail"></IxSelectOption>
        <IxSelectOption key="mobilePhone" label="MobilePhone"></IxSelectOption>
      </IxSelect>
    </IxFormItem>
    <IxFormItem label="Contact" required :message="getContactMessage">
      <IxInput control="contact"></IxInput>
    </IxFormItem>
    <IxFormItem :controlCol="{ offset: 6 }">
      <IxCheckbox control="subscribe">Subscribe notifications</IxCheckbox>
    </IxFormItem>
    <IxFormItem :controlCol="{ offset: 6 }">
      <IxButton mode="primary" @click="onSubmit">Submit</IxButton>
    </IxFormItem>
  </IxForm>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { AbstractControl, Validators, useFormGroup } from '@idux/cdk/forms'

const mobilePhoneValidator = (value: string) => {
  if (!value || /(^1\d{10}$)/.test(value)) {
    return undefined
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
        return control.getError('mobilePhone')!.message as string
      }
      return ''
    }

    const onSubmit = () => {
      if (formGroup.valid.value) {
        console.log('submit', formGroup.getValue())
      } else {
        formGroup.markAsDirty()
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
