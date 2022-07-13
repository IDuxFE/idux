<template>
  <IxRadioGroup v-model:value="value" :dataSource="dataSource" @change="onChange"> </IxRadioGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { RadioData } from '@idux/components/radio'

const value = ref('beijing')

const dataSource: RadioData[] = [
  { key: 'beijing', label: 'Beijing' },
  { key: 'shanghai', label: 'Shanghai' },
  { key: 'guangzhou', label: 'Guangzhou' },
  { key: 'shenzhen', label: 'Shenzhen' },
]

const onChange = console.log
</script>
