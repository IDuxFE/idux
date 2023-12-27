<template>
  <div class="demo-horizontal-scroll-wrapper">
    <CdkVirtualScroll
      ref="listRef"
      :dataSource="rowData"
      :height="200"
      :fullHeight="true"
      :colWidth="80"
      :bufferSize="20"
      :bufferOffset="5"
      :virtual="{ vertical: false, horizontal: true }"
      :rowRender="rowRender"
      getKey="key"
      @scroll="onScroll"
      @scrolledChange="onScrolledChange"
      @scrolledBottom="onScrolledBottom"
    >
      <template #col="{ item, index }">
        <span class="virtual-item" @click="onItemClick(item.key)">{{ item.key }} - {{ index }}</span>
      </template>
    </CdkVirtualScroll>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'

import { VirtualRowRenderFn, VirtualScrollInstance } from '@idux/cdk/scroll'

const listRef = ref<VirtualScrollInstance>()
const data: { key: string }[] = []
for (let index = 0; index < 1000; index++) {
  data.push({ key: `key-${index}` })
}
const rowData = [
  {
    key: 'row',
    data,
  },
]

const rowRender: VirtualRowRenderFn = ({ children }) =>
  h(
    'div',
    {
      class: 'virtual-row',
      style: { display: 'flex', height: '100%', 'flex-wrap': 'nowrap' },
    },
    children,
  )

const onScroll = (evt: Event) => {
  console.log('scroll:', evt)
}

const onScrolledChange = (startIndex: number, endIndex: number, visibleData: { key: string }[]) =>
  console.log('onScrolledChange', startIndex, endIndex, visibleData)

const onScrolledBottom = () => console.log('onScrolledBottom')

const onItemClick = (key: string) => {
  console.log('click:', key)
}
</script>

<style lang="less">
.demo-horizontal-scroll-wrapper {
  height: 240px;
  .cdk-virtual-scroll {
    border: 1px solid red;
    margin-bottom: 8px;
  }

  .cdk-virtual-scroll-content {
    height: 100%;
  }

  .virtual-row {
    display: flex;
    height: 100%;
    flex-wrap: nowrap;
  }

  .virtual-item {
    flex-shrink: 0;
    padding-left: 16px;
    border: 1px solid gray;
    height: 100%;
    width: 80px;
    line-height: 18px;
  }
}
</style>
