<template>
  <IxUpload v-model:files="files" action="/upload">
    <IxButton>Upload</IxButton>
    <template #list>
      <IxUploadList />
    </template>
  </IxUpload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const files = ref([
  {
    uid: 'test1',
    name: 'idux.svg',
    thumbUrl: '/icons/logo.svg',
  },
  {
    uid: 'error',
    name: 'error.png',
    status: 'error',
    errorTip: 'Upload failed.',
    thumbUrl: '/icons/comp-properties-1.png',
  },
])
</script>
