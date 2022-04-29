<template>
  <IxSpace vertical>
    <IxCheckboxGroup v-model:value="value" :dataSource="dataSource" buttoned size="sm" />
    <IxCheckboxGroup v-model:value="value" :dataSource="dataSource" buttoned />
    <IxCheckboxGroup v-model:value="value" :dataSource="dataSource" buttoned size="lg" />
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['beijing'])

const dataSource = [
  { key: 'beijing', label: 'Beijing' },
  { key: 'shanghai', label: 'Shanghai' },
  { key: 'guangzhou', label: 'Guangzhou' },
  { key: 'shenzhen', label: 'Shenzhen' },
]
</script>
