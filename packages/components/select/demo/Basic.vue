<template>
  <IxRow :gutter="8">
    <IxCol :span="6">
      <IxSelect v-model:value="singleValue" placeholder="choose Tom or Jerry">
        <IxSelectOption label="Tom" value="tom" />
        <IxSelectOption label="Jerry" value="jerry" />
        <IxSelectOption label="Speike" value="speike" disabled />
      </IxSelect>
    </IxCol>
    <IxCol :span="6">
      <IxSelect v-model:value="singleValue" disabled>
        <IxSelectOption label="Tom" value="tom" />
        <IxSelectOption label="Jerry" value="jerry" />
        <IxSelectOption label="Speike" value="speike" disabled />
      </IxSelect>
    </IxCol>
    <IxCol :span="6">
      <IxSelect v-model:value="singleValue" clearable>
        <IxSelectOption label="Tom" value="tom" />
        <IxSelectOption label="Jerry" value="jerry" />
        <IxSelectOption label="Speike" value="speike" disabled />
      </IxSelect>
    </IxCol>
    <IxCol :span="6">
      <IxSelect v-model:value="singleValue" searchable>
        <IxSelectOption label="Tom" value="tom" />
        <IxSelectOption label="Jerry" value="jerry" />
        <IxSelectOption label="Speike" value="speike" disabled />
      </IxSelect>
    </IxCol>
    <IxCol :span="8">
      <IxSelect v-model:value="multipleValue" multiple disabled placeholder="Choose">
        <IxSelectOption
          v-for="option in multipleOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
          :disabled="option.disabled"
        />
      </IxSelect>
    </IxCol>
    <IxCol :span="8">
      <IxSelect v-model:value="multipleValue" :options="multipleOptions" multiple clearable> </IxSelect>
    </IxCol>
    <IxCol :span="8">
      <IxSelect v-model:value="multipleValue" :options="multipleOptions" multiple :multipleLimit="5" :maxLabelCount="3">
      </IxSelect>
    </IxCol>
  </IxRow>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

import { SelectOption } from '../src/types'

export default defineComponent({
  setup() {
    const singleValue = ref('tom')
    const multipleValue = ref([0])

    const multipleOptions = ref<SelectOption[]>([])
    for (let index = 0; index < 20; index++) {
      const prefix = index > 9 ? 'B' : 'A'
      multipleOptions.value.push({ label: prefix + index, value: index, disabled: index % 3 === 0 })
    }

    return { singleValue, multipleValue, multipleOptions }
  },
})
</script>
