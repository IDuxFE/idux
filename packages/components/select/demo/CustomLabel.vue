<template>
  <IxSelect v-model:value="value" :dataSource="dataSource" multiple :maxLabel="3" :multipleLimit="5" @change="onChange">
    <template #selectedLabel="option">
      <IxIcon :name="option.value" style="margin-left: 8px" />{{ option.label }}
    </template>
    <template #overflowedLabel="moreOptions">and {{ moreOptions.length }} more selected</template>
  </IxSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectData } from '@idux/components/select'

const dataSource: SelectData[] = [
  { key: 'github', label: 'GitHub' },
  { key: 'gitlab', label: 'Gitlab' },
  { key: 'chrome', label: 'Chrome', value: 'chrome' },
  { key: 'edeg', label: 'Edeg', value: 'edeg' },
  { key: 'ie', label: 'IE', value: 'ie' },
  { key: 'android', label: 'Android' },
  { key: 'apple', label: 'Apple' },
  { key: 'windows', label: 'Windows' },
]

const value = ref('github')

const onChange = (value: string, oldValue: string) => {
  console.log('selected change: ', value, oldValue)
}
</script>
