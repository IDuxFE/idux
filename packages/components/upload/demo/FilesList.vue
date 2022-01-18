<template>
  <IxUpload v-model:files="files" action="https://run.mocky.io/v3/7564bc4f-780e-43f7-bc58-467959ae3354">
    <IxButton>Upload</IxButton>
    <template #list>
      <IxUploadFiles />
    </template>
  </IxUpload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const files = ref([
  {
    key: 'test1',
    name: 'idux.svg',
    thumbUrl: '/icons/logo.svg',
  },
  {
    key: 'error',
    name: 'error.png',
    status: 'error',
    errorTip: 'Upload failed.',
    thumbUrl: '/icons/comp-properties-1.png',
  },
])
</script>
