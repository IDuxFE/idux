<template>
  <IxUpload v-model:files="files" action="/upload" :customRequest="customRequest" @requestChange="onRequestChange">
    <IxButton>Custom upload</IxButton>
    <template #list>
      <IxUploadList type="text" />
    </template>
  </IxUpload>
</template>

<script setup lang="ts">
import type { UploadRequestChangeOption, UploadRequestOption } from '@idux/components/upload'

import { ref } from 'vue'

const files = ref([])
const customRequest = (option: UploadRequestOption<Response>) => {
  const formData = new FormData()
  const controller = new AbortController()
  const signal = controller.signal

  if (option.requestData) {
    Object.keys(option.requestData).forEach(key => {
      const value = option.requestData![key]
      if (Array.isArray(value)) {
        value.forEach(item => {
          formData.append(`${key}[]`, item)
        })
        return
      }

      formData.append(key, value as string | Blob)
    })
  }

  formData.append(option.filename, option.file, option.file.name)

  fetch(option.action, {
    method: option.requestMethod,
    headers: option.requestHeaders,
    body: formData,
    signal,
    credentials: option.withCredentials ? 'same-origin' : 'omit',
  })
    .then(res => option.onSuccess?.(res))
    .catch(err => option.onError?.(err))

  return {
    abort: () => controller.abort(),
  }
}
const onRequestChange = (option: UploadRequestChangeOption) => {
  console.log(option)
}
</script>
