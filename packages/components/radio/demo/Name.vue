<template>
  <IxSpace vertical>
    <IxRadioGroup v-model:value="value" :dataSource="dataSource" name="city"></IxRadioGroup>
    <IxRadioGroup v-model:value="value2" :dataSource="dataSource" name="city2" buttoned></IxRadioGroup>
    <IxRadioGroup v-model:value="value3" :dataSource="dataSource" name="city3" buttoned mode="primary"></IxRadioGroup>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('beijing')
const value2 = ref('beijing')
const value3 = ref('beijing')

const dataSource = [
  { key: 'beijing', label: 'Beijing' },
  { key: 'shanghai', label: 'Shanghai' },
  { key: 'guangzhou', label: 'Guangzhou' },
  { key: 'shenzhen', label: 'Shenzhen' },
]
</script>
