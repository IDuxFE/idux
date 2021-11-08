<template>
  <CdkVirtualScroll :dataSource="data" :height="height" itemKey="key" :itemHeight="20" :itemRender="itemRender">
  </CdkVirtualScroll>

  <IxSpace>
    DataLength:
    <IxRadioGroup v-model:value="dataLength">
      <IxRadio :value="0">0</IxRadio>
      <IxRadio :value="5">5</IxRadio>
      <IxRadio :value="20">20</IxRadio>
      <IxRadio :value="100">100</IxRadio>
    </IxRadioGroup>
  </IxSpace>
  <br />
  <IxSpace>
    Height:
    <IxRadioGroup v-model:value="height">
      <IxRadio :value="0">0</IxRadio>
      <IxRadio :value="100">100</IxRadio>
      <IxRadio :value="200">200</IxRadio>
    </IxRadioGroup>
  </IxSpace>
  <br />
  <IxSpace>
    ItemRender:
    <IxRadioGroup v-model:value="switchItemRender">
      <IxRadio :value="true">Key</IxRadio>
      <IxRadio :value="false">Index</IxRadio>
    </IxRadioGroup>
  </IxSpace>
</template>

<script setup lang="ts">
import { computed, h, ref } from 'vue'

import { VirtualItemRenderFn } from '@idux/cdk/scroll'

const getData = (length: number, key = 'key') => {
  const data: { key: string }[] = []
  for (let index = 0; index < length; index++) {
    data.push({ key: `${key}-${index}` })
  }
  return data
}

const dataLength = ref(20)
const data = computed(() => getData(dataLength.value))
const height = ref(200)
const switchItemRender = ref(false)
const itemRender = computed<VirtualItemRenderFn>(() => {
  if (switchItemRender.value) {
    return ({ item }) => h('div', { style: { height: '20px', paddingLeft: '8px' } }, [`${item.key}`])
  } else {
    return ({ index }) => h('span', { style: { height: '20px', paddingLeft: '8px' } }, [`index-${index}`])
  }
})
</script>

<style lang="less" scoped>
.cdk-virtual-scroll {
  border: 1px solid red;
  margin-bottom: 8px;
}
</style>
