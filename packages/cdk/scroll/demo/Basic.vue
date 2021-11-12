<template>
  <div class="scroll-wrapper">
    <CdkVirtualScroll
      ref="listRef"
      :dataSource="data"
      :height="200"
      :itemHeight="20"
      itemKey="key"
      @scroll="onScroll"
      @scrolledChange="onScrolledChange"
      @scrolledBottom="onScrolledBottom"
    >
      <template #item="{ item, index }">
        <span class="virtual-item" @click="onItemClick(item.key)">{{ item.key }} - {{ index }}</span>
      </template>
    </CdkVirtualScroll>

    <IxSpace>
      <IxButton @click="scrollTo(100)"> Scroll To 100px </IxButton>
      <IxButton @click="scrollTo({ key: 'key-50', align: 'top' })"> Scroll To key-50(top) </IxButton>
      <IxButton @click="scrollTo({ index: 40, align: 'top' })"> Scroll To 40(top) </IxButton>
      <IxButton @click="scrollTo({ index: 40, align: 'bottom' })"> Scroll To 40(bottom) </IxButton>
      <IxButton @click="scrollTo({ index: 40, align: 'auto' })"> Scroll To 40(auto) </IxButton>
      <IxButton @click="scrollTo({ index: 40, align: 'top', offset: 15 })"> Scroll To 40(top) + 15 offset </IxButton>
    </IxSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { VirtualScrollInstance, VirtualScrollToOptions } from '@idux/cdk/scroll'

const listRef = ref<VirtualScrollInstance>()
const data: { key: string }[] = []
for (let index = 0; index < 1000; index++) {
  data.push({ key: `key-${index}` })
}

const onScroll = (evt: Event) => {
  console.log('scroll:', evt)
}

const onScrolledChange = (startIndex: number, endIndex: number, visibleData: { key: string }[]) =>
  console.log('onScrolledChange', startIndex, endIndex, visibleData)

const onScrolledBottom = () => console.log('onScrolledBottom')

const onItemClick = (key: string) => {
  console.log('click:', key)
}

const scrollTo = (value: number | VirtualScrollToOptions) => listRef.value?.scrollTo(value)
</script>

<style lang="less" scoped>
.scroll-wrapper {
  height: 240px;
}

.cdk-virtual-scroll {
  border: 1px solid red;
  margin-bottom: 8px;
}

.virtual-item {
  padding-left: 16px;
  border: 1px solid gray;
  height: 20px;
  line-height: 18px;
}
</style>
