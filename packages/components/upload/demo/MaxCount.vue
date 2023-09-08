<template>
  <IxInputNumber v-model:value="maxCount" style="margin-bottom: 8px" />
  <IxUpload
    v-model:files="files"
    action="https://run.mocky.io/v3/7564bc4f-780e-43f7-bc58-467959ae3354"
    :maxCount="maxCount"
    @select="onSelect"
    @maxCountExceeded="onMaxCountExceeded"
  >
    <IxButton>Upload</IxButton>
    <template #list>
      <IxUploadFiles type="text" />
    </template>
  </IxUpload>
</template>

<script setup lang="ts">
import type { FilteredFile } from '@idux/components/upload'

import { ref } from 'vue'

const maxCount = ref(1)
const files = ref([])

const onSelect = (files: File[], filteredFiles: FilteredFile[]) => {
  console.log(files, filteredFiles)
}
const onMaxCountExceeded = () => {
  console.log('maxCountExceeded')
}
</script>
