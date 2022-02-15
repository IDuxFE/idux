<template>
  <IxSpace vertical>
    <IxCheckboxGroup v-model:value="value" :dataSource="dataSource"></IxCheckboxGroup>
    <IxCheckboxGroup v-model:value="value" :dataSource="dataSource" buttoned></IxCheckboxGroup>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { CheckboxData } from '@idux/components/checkbox'

const value = ref(['beijing'])

const dataSource: CheckboxData[] = [
  { label: 'Beijing', value: 'beijing' },
  { label: 'Shanghai', value: 'shanghai' },
  { label: 'Guangzhou', value: 'guangzhou' },
  { label: 'Shenzhen', value: 'shenzhen' },
]
</script>
