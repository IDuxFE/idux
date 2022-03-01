<template>
  <IxSelect v-model:value="value" :dataSource="dataSource" borderless></IxSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectData } from '@idux/components/select'

const dataSource: SelectData[] = [
  { key: 1, label: 'Tom', value: 'tom' },
  { key: 2, label: 'Jerry', value: 'jerry' },
  { key: 3, label: 'Speike', value: 'speike', disabled: true },
]

const value = ref('tom')
</script>
