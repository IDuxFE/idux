<template>
  <IxSpace>
    <IxSelect v-model:value="value" :options="options" @change="onChange"></IxSelect>
    <IxSelect v-model:value="value" :options="options" disabled></IxSelect>
    <IxSelect v-model:value="value" :options="options" clearable></IxSelect>
    <IxSelect v-model:value="value">
      <IxSelectOption v-for="option in options" :key="option.key" :value="option.value" :disabled="option.disabled">
        <IxIcon name="star"></IxIcon>
        <span style="margin-left: 8px">{{ option.label }}</span>
      </IxSelectOption>
    </IxSelect>
  </IxSpace>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectOption } from '@idux/components/select'

const options: SelectOption[] = [
  { key: 1, label: 'Tom', value: 'tom' },
  { key: 2, label: 'Jerry', value: 'jerry' },
  { key: 3, label: 'Speike', value: 'speike', disabled: true },
]

const value = ref('tom')

const onChange = (value: string, oldValue: string) => {
  console.log('selected change: ', value, oldValue)
}
</script>

<style scoped lang="less">
:deep(.ix-select) {
  width: 120px;
}
</style>
