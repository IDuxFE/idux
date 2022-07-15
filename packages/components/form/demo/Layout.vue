<template>
  <IxForm class="demo-form" :layout="layout">
    <IxFormItem label="Form Layout">
      <IxRadioGroup v-model:value="layout">
        <IxRadio value="horizontal" buttoned>Horizontal</IxRadio>
        <IxRadio value="vertical" buttoned>Vertical</IxRadio>
        <IxRadio value="inline" buttoned>Inline</IxRadio>
      </IxRadioGroup>
    </IxFormItem>
    <IxFormItem label="Field A">
      <IxInput></IxInput>
    </IxFormItem>
    <IxFormItem label="Field B">
      <IxInput></IxInput>
    </IxFormItem>
    <IxFormItem>
      <IxButton mode="primary">Submit</IxButton>
    </IxFormItem>
  </IxForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { FormLayout } from '@idux/components/form'

const layout = ref<FormLayout>('horizontal')
</script>

<style lang="less" scoped>
.demo-form:not(.ix-form-inline) {
  max-width: 400px;
}
</style>
