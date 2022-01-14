<template>
  <IxSelect v-model:value="value" :options="options" childrenKey="options" labelKey="text" valueKey="name"> </IxSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectData } from '@idux/components/select'

const options: SelectData[] = [
  {
    key: 1,
    text: 'Manager',
    options: [
      { key: 11, text: 'Tom', name: 'tom' },
      { key: 12, text: 'Jerry', name: 'jerry' },
    ],
  },
  {
    key: 2,
    text: 'Engineer',
    options: [{ key: 21, text: 'Speike', name: 'speike' }],
  },
]

const value = ref('tom')
</script>
