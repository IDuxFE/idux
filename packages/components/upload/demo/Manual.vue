<template>
  <IxUpload v-model:files="files" action="/upload" @beforeUpload="onBeforeUpload">
    <IxButton>Manual upload</IxButton>
    <template #list>
      <IxUploadList type="text" />
    </template>
  </IxUpload>
</template>

<script setup lang="ts">
import type { UploadFile } from '@idux/components/upload'
import type { Ref } from 'vue'

import { ref } from 'vue'

const files: Ref<UploadFile[]> = ref([])
const onBeforeUpload = (file: UploadFile) => {
  const chunkNum = 4
  const fileSize = file.raw?.size ?? 0
  const chunkSize = fileSize / chunkNum
  for (let i = 0; i < chunkNum; i++) {
    const start = i * chunkSize
    const end = (i + 1) * chunkSize
    const formData = new FormData()
    formData.append('file', file.raw!.slice(start, end))

    // custom request
    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
  }

  return false
}
</script>
