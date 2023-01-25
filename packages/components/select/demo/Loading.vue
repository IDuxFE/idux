<template>
  <IxSpace vertical>
    <IxSelect v-model:value="value" :dataSource="dataSource" :spin="loading"></IxSelect>
    <IxButton @click="onLoad">Load Data</IxButton>
  </IxSpace>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectData } from '@idux/components/select'

const dataSource = ref<SelectData[]>([{ label: 'Tom', value: 'tom' }])
const value = ref('tom')
const loading = ref(false)

const onLoad = () => {
  dataSource.value = [{ label: 'Tom', value: 'tom' }]
  value.value = 'tom'

  if (loading.value) {
    return
  }

  loading.value = true
  setTimeout(() => {
    loading.value = false
    dataSource.value = [
      { label: 'Tom', value: 'tom' },
      { label: 'Jack', value: 'jack' },
      { label: 'Lucy', value: 'lucy' },
    ]
  }, 3000)
}
</script>
