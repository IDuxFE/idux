<template>
  <IxUpload v-model:files="files" :action="action">
    <IxButton>Upload</IxButton>
    <template #list>
      <IxUploadList type="text" />
    </template>
  </IxUpload>
</template>

<script setup lang="ts">
import type { UploadFile } from '@idux/components/upload'

import { ref } from 'vue'

const files = ref([])
const action = (file: UploadFile) => {
  if (file.raw?.type === 'image/png') {
    return Promise.resolve('https://run.mocky.io/v3/41a4b385-bf7e-4808-b1e4-d2ef1e0cdc11')
  }
  return 'https://run.mocky.io/v3/7564bc4f-780e-43f7-bc58-467959ae3354'
}
</script>
