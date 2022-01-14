<template>
  <IxSelect v-model:value="value" :options="options" multiple :maxLabelCount="3" :multipleLimit="5" @change="onChange">
    <template #label="option"><IxIcon :name="option.value" />{{ option.label }}</template>
    <template #maxLabel="moreOptions">and {{ moreOptions.length }} more selected</template>
  </IxSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectData } from '@idux/components/select'

const options: SelectData[] = [
  { key: 1, label: 'GitHub', value: 'github' },
  { key: 2, label: 'Gitlab', value: 'gitlab' },
  { key: 3, label: 'Chrome', value: 'chrome' },
  { key: 4, label: 'Edeg', value: 'edeg' },
  { key: 5, label: 'IE', value: 'ie' },
  { key: 6, label: 'Android', value: 'android' },
  { key: 7, label: 'Apple', value: 'apple' },
  { key: 8, label: 'Windows', value: 'windows' },
]

const value = ref('github')

const onChange = (value: string, oldValue: string) => {
  console.log('selected change: ', value, oldValue)
}
</script>
