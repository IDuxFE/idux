<template>
  <IxSelect v-model:value="value" :dataSource="dataSource" childrenKey="options" getKey="name" labelKey="text">
  </IxSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectData } from '@idux/components/select'

const dataSource: SelectData[] = [
  {
    name: 'manager',
    text: 'Manager',
    options: [
      { name: 'tom', text: 'Tom' },
      { name: 'jerry', text: 'Jerry' },
    ],
  },
  {
    name: 'engineer',
    text: 'Engineer',
    options: [{ name: 'speike', text: 'Speike' }],
  },
]

const value = ref('tom')
</script>
