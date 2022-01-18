<template>
  <IxSpace direction="vertical">
    <IxRadioGroup v-model:value="curType" :options="listType"></IxRadioGroup>
    <IxUpload v-model:files="files" action="https://run.mocky.io/v3/7564bc4f-780e-43f7-bc58-467959ae3354">
      <IxButton>Upload</IxButton>
      <template #list>
        <IxUploadFiles :type="curType" />
      </template>
    </IxUpload>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const listType = [
  { label: 'text', value: 'text' },
  { label: 'image', value: 'image' },
  { label: 'imageCard', value: 'imageCard' },
]
const curType = ref('text')
const files = ref([
  {
    key: 'default',
    name: 'idux.svg',
    status: 'success',
    thumbUrl: '/icons/logo.svg',
  },
])
</script>
