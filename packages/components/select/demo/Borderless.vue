<template>
  <IxSelect v-model:value="value" :options="options" borderless></IxSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectData } from '@idux/components/select'

const options: SelectData[] = [
  { key: 1, label: 'Tom', value: 'tom' },
  { key: 2, label: 'Jerry', value: 'jerry' },
  { key: 3, label: 'Speike', value: 'speike', disabled: true },
]

const value = ref('tom')
</script>

<style scoped lang="less">
:deep(.ix-select) {
  width: 120px;
}
</style>
