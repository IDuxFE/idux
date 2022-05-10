<template>
  <IxSpace vertical>
    <IxRadioGroup v-model:value="searchableValue" :dataSource="searchableData" />
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
import { ref } from 'vue'

import { type RadioData } from '@idux/components/radio'
import { type SelectData } from '@idux/components/select'

const searchableValue = ref(true)

const searchableData = [
  { key: true, label: 'true' },
  { key: 'overlay', label: 'overlay' },
  { key: false, label: 'false' },
] as RadioData[]

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
