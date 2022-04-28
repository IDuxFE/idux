<template>
  <IxSelect
    v-model:value="value"
    :dataSource="dataSource"
    multiple
    virtual
    @change="onChange"
    @scroll="onScroll"
    @scrolledChange="onScrolledChange"
    @scrolledBottom="onScrolledBottom"
  ></IxSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { SelectData } from '@idux/components/select'

const dataSource: SelectData[] = []

for (let index = 0; index < 9999; index++) {
  const key = `${index.toString(36)}${index}`
  dataSource.push({ key, label: key, disabled: index % 10 === 0 })
}

const value = ref(['00', '11'])

const onChange = (value: number[], oldValue: number[]) => {
  console.log('selected change: ', value, oldValue)
}

const onScroll = (evt: Event) => {
  console.log('scroll:', evt)
}

const onScrolledChange = (startIndex: number, endIndex: number, visibleData: SelectData[]) =>
  console.log('onScrolledChange', startIndex, endIndex, visibleData)

const onScrolledBottom = () => console.log('onScrolledBottom')
</script>
