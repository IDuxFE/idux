<template>
  <IxSpace vertical>
    <IxSpace> searchable:<IxRadioGroup v-model:value="searchableValue" :dataSource="searchableOptions" /></IxSpace>
    <IxSelect
      v-model:value="value"
      :dataSource="dataSource"
      :searchable="searchableValue"
      placeholder="Searchable"
      @change="onChange"
    >
    </IxSelect>
  </IxSpace>
</template>
<script setup lang="ts">
import type { RadioData } from '@idux/components/radio'
import type { SelectData } from '@idux/components/select'

import { ref } from 'vue'

const searchableValue = ref(true)

const searchableOptions: RadioData[] = [
  { label: 'true', value: true },
  { label: 'overlay', value: 'overlay' },
  { label: 'false', value: false },
]

const dataSource: SelectData[] = [
  { key: 'tom', label: 'Tom' },
  { key: 'jerry', label: 'Jerry' },
  { key: 'speike', label: 'Speike' },
]

const value = ref('tom')

const onChange = (value: string, oldValue: string) => {
  console.log('selected change: ', value, oldValue)
}
</script>
