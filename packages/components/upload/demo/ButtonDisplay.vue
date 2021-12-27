<template>
  <IxUpload v-model:files="files" action="/upload">
    <a>Click here</a>
    <template #list>
      <IxUploadList type="text" />
    </template>
  </IxUpload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const files = ref([])
</script>
