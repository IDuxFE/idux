<template>
  <IxRow :gutter="8">
    <IxCol :span="12">
      <IxSelect v-model:value="singleValue" :options="options" size="large"> </IxSelect>
    </IxCol>
    <IxCol :span="12">
      <IxSelect v-model:value="multipleValue" :options="options" multiple size="large"> </IxSelect>
    </IxCol>
    <IxCol :span="12">
      <IxSelect v-model:value="singleValue" :options="options"> </IxSelect>
    </IxCol>
    <IxCol :span="12">
      <IxSelect v-model:value="multipleValue" :options="options" multiple> </IxSelect>
    </IxCol>
    <IxCol :span="12">
      <IxSelect v-model:value="singleValue" :options="options" size="small"> </IxSelect>
    </IxCol>
    <IxCol :span="12">
      <IxSelect v-model:value="multipleValue" :options="options" multiple size="small"> </IxSelect>
    </IxCol>
  </IxRow>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const singleValue = ref('tom')
    const multipleValue = ref(['tom'])

    const options = [
      { label: 'Tom', value: 'tom' },
      { label: 'Jerry', value: 'jerry' },
      { label: 'Speike', value: 'speike', disabled: true },
    ]

    return { singleValue, multipleValue, options }
  },
})
</script>
