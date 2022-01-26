<template>
  <IxSpace vertical>
    <IxSpace> searchable:<IxRadioGroup v-model:value="searchableValue" :options="searchableOptions" /></IxSpace>
    <IxSelect
      v-model:value="value"
      :options="options"
      :searchable="searchableValue"
      placeholder="Searchable"
      @change="onChange"
    >
    </IxSelect>
  </IxSpace>
</template>
<script setup lang="ts">
import type { RadioOption } from '@idux/components/radio'
import type { SelectData } from '@idux/components/select'

import { ref } from 'vue'

const searchableValue = ref(true)

const searchableOptions: RadioOption[] = [
  { label: 'true', value: true },
  { label: 'overlay', value: 'overlay' },
  { label: 'false', value: false },
]

const options: SelectData[] = [
  { key: 1, label: 'Tom', value: 'tom' },
  { key: 2, label: 'Jerry', value: 'jerry' },
  { key: 3, label: 'Speike', value: 'speike' },
]

const value = ref('tom')

const onChange = (value: string, oldValue: string) => {
  console.log('selected change: ', value, oldValue)
}
</script>

<style scoped lang="less">
:deep(.ix-select) {
  width: 200px;
}
</style>
