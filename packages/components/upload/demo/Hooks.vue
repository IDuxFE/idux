<template>
  <IxUpload
    v-model:files="files"
    action="https://run.mocky.io/v3/7564bc4f-780e-43f7-bc58-467959ae3354"
    :maxCount="1"
    @beforeUpload="onBeforeUploadMessage"
    @select="onSelectMessage"
    @fileStatusChange="onFileStatusChangeMessage"
    @requestChange="onRequestChangeMessage"
  >
    <IxButton>Hook</IxButton>
    <template #list>
      <IxUploadList type="imageCard" />
    </template>
  </IxUpload>
  <IxTimeline>
    <IxTimelineItem v-for="(item, index) in timelineList" :key="index">
      {{ item }}
    </IxTimelineItem>
  </IxTimeline>
</template>

<script setup lang="ts">
import type { UploadFile, UploadRequestChangeOption } from '@idux/components/upload'
import type { Ref } from 'vue'

import { ref, watch } from 'vue'

const files: Ref<UploadFile[]> = ref([])
const timelineList = useTimelineList(files)

const onBeforeUploadMessage = (file: UploadFile) => {
  console.log('beforeUpload', file)
  timelineList.value.push(`${file.name}: beforeUpload`)
  return true
}
const onSelectMessage = (file: File[]) => {
  console.log('select', file)
  timelineList.value.push(`${file[0].name}: select`)
  return true
}
const onFileStatusChangeMessage = (file: UploadFile) => {
  console.log('fileStatusChange', file)
  timelineList.value.push(`${file.name}: file status is ${file.status}`)
}
const onRequestChangeMessage = (option: UploadRequestChangeOption) => {
  console.log('requestChange', option)
  timelineList.value.push(`${option.file.name}: request status is ${option.status}`)
}

function useTimelineList(files: Ref<UploadFile[]>) {
  const timelineList: Ref<string[]> = ref([])
  watch(files, val => {
    if (val.length === 0) {
      timelineList.value = []
    }
  })
  return timelineList
}
</script>
