<template>
  <IxSpace>
    <IxSelect
      v-model:value="singleValue"
      :dataSource="dataSource"
      allowInput
      placeholder="Allow input"
      @change="onChange"
    >
    </IxSelect>
    <IxSelect
      v-model:value="multipleValue"
      :dataSource="dataSource"
      allowInput
      multiple
      placeholder="Allow input"
      @change="onChange"
    >
    </IxSelect>
  </IxSpace>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectData } from '@idux/components/select'

const dataSource: SelectData[] = [
  { key: 1, label: 'Tom', value: 'tom' },
  { key: 2, label: 'Jerry', value: 'jerry' },
  { key: 3, label: 'Speike', value: 'speike' },
]

const singleValue = ref('tom')
const multipleValue = ref(['tom'])

const onChange = (value: string, oldValue: string) => {
  console.log('selected change: ', value, oldValue)
}
</script>
