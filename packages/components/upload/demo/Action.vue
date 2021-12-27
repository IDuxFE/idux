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
    return Promise.resolve('/upload/png')
  }
  return '/upload'
}
</script>
