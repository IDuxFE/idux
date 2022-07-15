<template>
  <IxForm class="demo-form" hasFeedback labelCol="6">
    <IxFormItem label="Valid" status="valid" :message="messageMap">
      <IxInput v-model:value="formValue.valid"></IxInput>
    </IxFormItem>
    <IxFormItem label="Validating" status="validating" :message="messageMap">
      <IxInput v-model:value="formValue.validating"></IxInput>
    </IxFormItem>
    <IxFormItem label="Invalid" status="invalid" :message="messageMap">
      <IxInput v-model:value="formValue.invalid"></IxInput>
    </IxFormItem>
    <IxFormItem label="Dynamic" :status="status" :message="messageMap">
      <IxInput v-model:value="formValue.dynamic"></IxInput>
    </IxFormItem>
    <IxFormItem :controlCol="{ offset: 6 }">
      <IxButton @click="changeStatus">Change Status</IxButton>
    </IxFormItem>
  </IxForm>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

import { ValidateStatus } from '@idux/cdk/forms'

interface FormValue {
  valid?: string
  validating?: string
  invalid?: string
  dynamic?: string
}

const formValue = reactive<FormValue>({})
watch(formValue, value => console.log('formValue', value), { deep: true })

const status = ref<ValidateStatus>('valid')
const messageMap = {
  valid: 'This is valid field!',
  validating: 'This is validating field!',
  invalid: 'This is invalid field!',
}

const changeStatus = () => {
  const currStatus = status.value
  if (currStatus === 'valid') {
    status.value = 'validating'
  } else if (currStatus === 'validating') {
    status.value = 'invalid'
  } else {
    status.value = 'valid'
  }
}
</script>

<style lang="less" scoped>
.demo-form {
  max-width: 400px;
}
</style>
