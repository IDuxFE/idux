<template>
  <IxSelect v-model:value="singleValue" :options="options" allowInput placeholder="Allow input" @change="onChange">
  </IxSelect>
  <IxSelect
    v-model:value="multipleValue"
    :options="options"
    allowInput
    multiple
    placeholder="Allow input"
    @change="onChange"
  >
  </IxSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectOption } from '@idux/components/select'

const options: SelectOption[] = [
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

<style scoped lang="less">
:deep(.ix-select) {
  width: 200px;
}
</style>
