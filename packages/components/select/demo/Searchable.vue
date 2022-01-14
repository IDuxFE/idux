<template>
  <IxSelect v-model:value="value" :options="options" searchable placeholder="Searchable" @change="onChange"> </IxSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectData } from '@idux/components/select'

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
