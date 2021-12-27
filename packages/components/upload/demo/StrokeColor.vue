<template>
  <IxUpload
    v-model:files="files"
    action="/upload"
    :strokeColor="{
      '0%': '#108ee9',
      '100%': '#87d068',
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
