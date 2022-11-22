<template>
  <IxForm class="demo-form" :control="formGroup" labelCol="8">
    <IxRow gutter="24">
      <IxCol v-for="index in controlLength" :key="index" span="8">
        <IxFormItem v-show="showMore || index < 7" :label="'Field ' + index">
          <IxInput :control="'field' + index"></IxInput>
        </IxFormItem>
      </IxCol>
    </IxRow>
    <IxRow>
      <IxCol span="24" class="text-right">
        <IxSpace>
          <IxButton mode="primary" type="submit" @click="onSearch">Search</IxButton>
          <IxButton @click="onClear">Clear</IxButton>
          <IxButton mode="link" :icon="showMore ? 'up' : 'down'" @click="showMore = !showMore">Collapse</IxButton>
        </IxSpace>
      </IxCol>
    </IxRow>
  </IxForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useFormControl, useFormGroup } from '@idux/cdk/forms'

const controlLength = 12
const showMore = ref(false)
const formGroup = useFormGroup<Record<string, unknown>>({})

for (let index = 1; index <= controlLength; index++) {
  const control = useFormControl()
  formGroup.addControl(`field${index}`, control)
}

const onSearch = () => console.log('search', formGroup.getValue())
const onClear = () => formGroup.reset()
</script>

<style lang="less" scoped>
.demo-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.text-right {
  text-align: right;
}
</style>
