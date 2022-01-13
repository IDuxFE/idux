<template>
  <IxInputNumber v-model:value="maxCount" style="margin-bottom: 8px" />
  <IxUpload
    v-model:files="files"
    action="https://run.mocky.io/v3/7564bc4f-780e-43f7-bc58-467959ae3354"
    :maxCount="maxCount"
  >
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
