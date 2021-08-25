<template>
  <IxInput v-model:value="value" :addonBefore="addonBefore" :addonAfter="addonAfter" />
  <br /><br />
  <IxInput v-model:value="value">
    <template #addonBefore>
      <IxSelect v-model:value="addonBefore" style="width: 80px">
        <IxSelectOption label="https://" value="https"></IxSelectOption>
        <IxSelectOption label="http://" value="http"></IxSelectOption>
      </IxSelect>
    </template>
    <template #addonAfter>
      <IxSelect v-model:value="addonAfter" style="width: 60px">
        <IxSelectOption label=".com" value="com"></IxSelectOption>
        <IxSelectOption label=".cn" value="cn"></IxSelectOption>
      </IxSelect>
    </template>
  </IxInput>
  <br /><br />
  <IxInput v-model:value="value">
    <template #addonBefore><IxIcon name="user" /></template>
    <template #addonAfter><IxIcon name="setting" /></template>
  </IxInput>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('my site')
    const addonBefore = ref('https')
    const addonAfter = ref('com')
    return { value, addonBefore, addonAfter }
  },
})
</script>
