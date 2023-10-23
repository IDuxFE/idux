<template>
  <IxUpload v-model:files="files" action="https://run.mocky.io/v3/7564bc4f-780e-43f7-bc58-467959ae3354">
    <IxButton>Upload</IxButton>
    <template #list>
      <IxUploadFiles type="text" />
    </template>
  </IxUpload>
  <IxButton @click="addFile">addFile</IxButton>
  <IxButton @click="clearFiles">clearFiles</IxButton>
</template>

<script setup lang="ts">
import type { UploadFile } from '@idux/components/upload'

import { ref } from 'vue'

const files = ref<UploadFile[]>([])
let keySeed = 0

const addFile = () => {
  const newFile = new File(
    [
      new Blob([
        Array.from(new Array(100))
          .map(() => 'file content')
          .join('\n'),
      ]),
    ],
    'new_File',
    {
      type: 'text/plain',
    },
  )

  files.value.push({
    key: `newFile-${keySeed++}`,
    raw: newFile,
    name: newFile.name,
    status: 'selected',
  })
}
const clearFiles = () => {
  files.value = []
}
</script>
