<template>
  <IxSpace vertical>
    <IxRadioGroup v-model:value="value" buttoned :dataSource="dataSource"> </IxRadioGroup>
    <IxRadioGroup v-model:value="value" buttoned :dataSource="dataSource" mode="primary"> </IxRadioGroup>
    <IxRadioGroup v-model:value="value" buttoned :dataSource="dataSource" disabled> </IxRadioGroup>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('beijing')

const dataSource = [
  { label: 'Beijing', value: 'beijing' },
  { label: 'Shanghai', value: 'shanghai' },
  { label: 'Guangzhou', value: 'guangzhou' },
  { label: 'Shenzhen', value: 'shenzhen' },
]
</script>
