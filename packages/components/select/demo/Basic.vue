<template>
  <IxSpace>
    <IxSelect v-model:value="value" :dataSource="dataSource" @change="onChange"></IxSelect>
    <IxSelect v-model:value="value" :dataSource="dataSource" disabled></IxSelect>
    <IxSelect v-model:value="value" :dataSource="dataSource" clearable></IxSelect>
    <IxSelect v-model:value="value" :dataSource="dataSource">
      <template #optionLabel="label">
        <IxIcon name="star"></IxIcon>
        <span style="margin-left: 8px">{{ label }}</span>
      </template>
    </IxSelect>
  </IxSpace>
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

const onChange = (value: string, oldValue: string) => {
  console.log('selected change: ', value, oldValue)
}
</script>
