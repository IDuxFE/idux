<template>
  <IxUpload
    v-model:files="files"
    action="https://run.mocky.io/v3/7564bc4f-780e-43f7-bc58-467959ae3354"
    :progress="{
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
    }"
  >
    <IxButton>Upload</IxButton>
    <template #list>
      <IxUploadList type="text" />
    </template>
  </IxUpload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const files = ref([])
</script>
