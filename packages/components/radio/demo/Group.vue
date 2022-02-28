<template>
  <IxRadioGroup v-model:value="value" :dataSource="dataSource" @Change="onChange"> </IxRadioGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { RadioData } from '@idux/components/radio'

const value = ref('beijing')

const dataSource: RadioData[] = [
  { label: 'Beijing', value: 'beijing' },
  { label: 'Shanghai', value: 'shanghai' },
  { label: 'Guangzhou', value: 'guangzhou' },
  { label: 'Shenzhen', value: 'shenzhen' },
]

const onChange = console.log
</script>
