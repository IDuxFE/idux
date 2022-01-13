<template>
  <IxUpload v-model:files="files" action="https://run.mocky.io/v3/7564bc4f-780e-43f7-bc58-467959ae3354">
    <IxButton>Upload</IxButton>
    <template #list>
      <IxUploadList type="text" :icon="icon" />
    </template>
  </IxUpload>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'

import { IxIcon } from '@idux/components/icon'

const files = ref([])
const icon = ref({
  file: 'paper-clip',
  download: 'thunderbolt',
  retry: h(IxIcon, { name: 'reload' }),
  remove: h(IxIcon, { name: 'close' }),
})
</script>
