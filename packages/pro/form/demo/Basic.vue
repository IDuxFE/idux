<template>
  <IxProForm class="demo-form" autoId="basic" :fields="fields" @submit="onSubmit">
    <template #password="props">
      <IxInput
        v-bind="props"
        autocomplete="current-password"
        prefix="lock"
        :type="passwordVisible ? 'text' : 'password'"
      >
        <template #suffix>
          <IxIcon :name="passwordVisible ? 'eye-invisible' : 'eye'" @click="passwordVisible = !passwordVisible">
          </IxIcon>
        </template>
      </IxInput>
    </template>
    <IxFormItem>
      <IxButton block mode="primary" type="submit">Login</IxButton>
    </IxFormItem>
  </IxProForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Validators } from '@idux/cdk/forms'
import { IxCheckbox } from '@idux/components/checkbox'
import { ProFormFieldsSchema } from '@idux/pro/form'

const passwordVisible = ref(false)

interface FormValue {
  username: string
  password: string
  remember: boolean
}

const { required, rangeLength } = Validators
const fields: ProFormFieldsSchema<FormValue> = {
  properties: {
    username: {
      componentProps: {
        prefix: 'user',
      },
      validators: required,
    },
    password: {
      customControl: 'password',
      validators: [required, rangeLength(6, 18)],
    },
    remember: {
      component: IxCheckbox,
      componentProps: {
        label: 'Remember me',
      },
      default: true,
    },
  },
}

const onSubmit = (value: FormValue) => {
  console.log('submit', value)
}
</script>

<style scoped lang="less">
.demo-form {
  max-width: 300px;
}
</style>
