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

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const layout = ref('horizontal')

    return { layout }
  },
})
</script>

<style lang="less" scoped>
.demo-form:not(.ix-form-inline) {
  max-width: 400px;
}
</style>
