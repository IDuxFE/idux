<template>
  <IxProForm class="demo-form" autoId="basic-schema" :fields="fields" :schema="schema" @submit="onSubmit">
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

import { IxCheckbox } from '@idux/components/checkbox'
import { ProFormFieldsSchema, ProFormJsonSchema } from '@idux/pro/form'

const passwordVisible = ref(false)

interface FormValue {
  username: string
  password: string
  remember: boolean
}

const fields: ProFormFieldsSchema<FormValue> = {
  properties: {
    username: {
      componentProps: {
        prefix: 'user',
      },
    },
    password: {
      customControl: 'password',
    },
    remember: {
      component: IxCheckbox,
      componentProps: {
        label: 'Remember me',
      },
    },
  },
}

const schema: ProFormJsonSchema<FormValue> = {
  properties: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 18,
    },
    remember: {
      type: 'boolean',
    },
  },
  required: ['username', 'password'],
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
