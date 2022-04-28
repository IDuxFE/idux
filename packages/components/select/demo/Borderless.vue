<template>
  <IxSelect v-model:value="value" :dataSource="dataSource" borderless></IxSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectData } from '@idux/components/select'

const dataSource: SelectData[] = [
  { key: 'tom', label: 'Tom' },
  { key: 'jerry', label: 'Jerry' },
  { key: 'speike', label: 'Speike' },
]

const value = ref('tom')
</script>
