<template>
  <IxSpace>
    <IxSelect v-model:value="value" :dataSource="dataSource" @change="onChange"></IxSelect>
    <IxSelect v-model:value="value" :dataSource="dataSource" disabled></IxSelect>
    <IxSelect v-model:value="value" :dataSource="dataSource" clearable></IxSelect>
    <IxSelect v-model:value="value">
      <IxSelectOption v-for="option in dataSource" :key="option.key" :value="option.value" :disabled="option.disabled">
        <IxIcon name="star"></IxIcon>
        <span style="margin-left: 8px">{{ option.label }}</span>
      </IxSelectOption>
    </IxSelect>
  </IxSpace>
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

const onChange = (value: string, oldValue: string) => {
  console.log('selected change: ', value, oldValue)
}
</script>
