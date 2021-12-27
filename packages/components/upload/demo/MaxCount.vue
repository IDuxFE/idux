<template>
  <IxInputNumber v-model:value="maxCount" style="margin-bottom: 8px" />
  <IxUpload v-model:files="files" action="/upload" :maxCount="maxCount">
    <IxButton>Upload</IxButton>
    <template #list>
      <IxUploadList type="text" />
    </template>
  </IxUpload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const maxCount = ref(1)
const files = ref([])
</script>
