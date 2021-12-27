<template>
  <IxSpace direction="vertical">
    <IxRadioGroup v-model:value="curType" :options="listType"></IxRadioGroup>
    <IxUpload v-model:files="files" action="/upload">
      <IxButton>Upload</IxButton>
      <template #list>
        <IxUploadList :type="curType" />
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
    uid: 'default',
    name: 'idux.svg',
    thumbUrl: '/icons/logo.svg',
  },
])
</script>
