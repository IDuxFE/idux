<template>
  <IxSpace vertical>
    <IxRadioGroup v-model:value="value" :dataSource="dataSource" :gap="16" />
    <IxRadioGroup v-model:value="value" :dataSource="dataSource" :gap="16" buttoned />
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('beijing')

const dataSource = [
  { key: 'beijing', label: 'Beijing' },
  { key: 'shanghai', label: 'Shanghai' },
  { key: 'guangzhou', label: 'Guangzhou' },
  { key: 'shenzhen', label: 'Shenzhen' },
]
</script>
