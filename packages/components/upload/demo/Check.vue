<template>
  <IxUpload
    v-model:files="files"
    action="https://run.mocky.io/v3/7564bc4f-780e-43f7-bc58-467959ae3354"
    accept=".png"
    @select="onSelect"
    @beforeUpload="onBeforeUpload"
  >
    <IxButton>Upload</IxButton>
    <template #list>
      <IxUploadFiles type="text" />
    </template>
  </IxUpload>
</template>

<script setup lang="ts">
import type { UploadFile } from '@idux/components/upload'

import { ref } from 'vue'

import { useMessage } from '@idux/components/message'

const files = ref([])
const { warning } = useMessage()

const onBeforeUpload = (file: UploadFile) =>
  new Promise(resolve => {
    if (Number(file.raw?.size) > 1) {
      warning('Check from onBeforeUpload: The file size exceeds the limit.')
      file.status = 'error'
      file.errorTip = 'Check from onBeforeUpload: The file size exceeds the limit.'
      resolve(false)
    }
    resolve(true)
  })

const onSelect = (files: File[]) => {
  if (files.some(file => file.name.length > 6)) {
    warning('Check from onSelect: The file size exceeds the limitFile name exceeds length.')
    return false
  }
  return true
}
</script>
