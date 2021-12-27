<template>
  <IxUpload v-model:files="files" action="/upload">
    <IxButton>Upload</IxButton>
    <template #list="{ abort, upload }">
      <div v-for="file in files" :key="file.uid" class="upload-file">
        <a :class="`file file-${file.status}`" href="file.thumbUrl">{{ file.name }}</a>
        <div>
          <span>{{ file.percent.toFixed(2) }}% </span>
          <IxIcon v-show="file.status === 'uploading'" name="close" @click="() => onAbort(file, abort)"></IxIcon>
          <IxIcon v-show="file.status === 'error'" name="reload" @click="() => onRetry(file, upload)"></IxIcon>
        </div>
      </div>
    </template>
  </IxUpload>
</template>

<script setup lang="ts">
import type { UploadFile } from '@idux/components/upload'

import { ref } from 'vue'

import { useMessage } from '@idux/components/message'

const { info } = useMessage()
const files = ref([])
const onAbort = (file: UploadFile, abort: (file: UploadFile) => void) => {
  abort(file)
  file.percent = 0
  info('Request cancelled.')
}
const onRetry = (file: UploadFile, upload: (file: UploadFile) => void) => {
  upload(file)
  info('Request retryed.')
}
</script>

<style lang="less" scoped>
.upload-file {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  width: 400px;
  height: 32px;
  line-height: 32px;

  .file {
    color: #1c6eff;
    text-decoration: none;
    &-error {
      color: red;
    }
  }
}
</style>
