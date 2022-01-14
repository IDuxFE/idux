<template>
  <IxSelect
    v-model:value="value"
    :options="options"
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

const options: SelectData[] = []

for (let index = 0; index < 9999; index++) {
  const value = `${index.toString(36)}${index}`
  options.push({ key: index, label: value, value, disabled: index % 10 === 0 })
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
