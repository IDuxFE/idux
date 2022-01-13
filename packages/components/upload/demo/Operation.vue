<template>
  <IxUpload v-model:files="files" action="https://run.mocky.io/v3/7564bc4f-780e-43f7-bc58-467959ae3354">
    <IxButton>Upload</IxButton>
    <template #list>
      <IxUploadList
        :icon="icon"
        type="imageCard"
        @retry="onRetry"
        @download="onDownload"
        @preview="onPreview"
        @remove="onRemove"
      />
    </template>
  </IxUpload>
</template>

<script setup lang="ts">
import type { UploadFile } from '@idux/components/upload'
import type { Ref } from 'vue'

import { ref } from 'vue'

import { useMessage } from '@idux/components/message'

const icon = ref({
  file: 'paper-clip',
  download: 'download',
  retry: 'edit',
  remove: 'delete',
  preview: 'zoom-in',
})
const files: Ref<UploadFile[]> = ref([
  {
    key: 'default',
    name: 'error.png',
    status: 'error',
    errorTip: 'error',
    thumbUrl: '/icons/logo.svg',
  },
])
const { warning, success } = useMessage()
const onDownload = (file: UploadFile) => {
  warning(`Insufficient permissions to download file ${file.name}.`)
}
const onPreview = (file: UploadFile) => {
  window.open(file.thumbUrl)
}
const onRemove = (file: UploadFile) => {
  warning(`${file.name} is not allowed to be deleted.`)
  return false
}
const onRetry = (file: UploadFile) => {
  success(`${file.name} has been retry.`)
}
</script>
