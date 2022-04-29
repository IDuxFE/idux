<template>
  <IxSpace vertical>
    <IxCheckboxGroup v-model:value="value" buttoned :dataSource="dataSource"></IxCheckboxGroup>
    <IxCheckboxGroup v-model:value="value" buttoned :dataSource="dataSource" disabled></IxCheckboxGroup>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { CheckboxData } from '@idux/components/checkbox'

const value = ref(['beijing'])

const dataSource: CheckboxData[] = [
  { key: 'beijing', label: 'Beijing' },
  { key: 'shanghai', label: 'Shanghai' },
  { key: 'guangzhou', label: 'Guangzhou' },
  { key: 'shenzhen', label: 'Shenzhen' },
]
</script>
