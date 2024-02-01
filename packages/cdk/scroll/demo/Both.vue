<template>
  <div class="demo-both-scroll-wrapper">
    <CdkVirtualScroll
      ref="listRef"
      :dataSource="rowData"
      :height="200"
      :rowHeight="20"
      :colWidth="200"
      :virtual="true"
      :rowRender="rowRender"
      getKey="key"
    >
      <template #col="{ row, item, index }">
        <span class="virtual-item" @click="onItemClick(item.key)">{{ row.key }} - {{ index }}</span>
      </template>
    </CdkVirtualScroll>
    <IxSpace>
      <IxButton @click="scrollTo({ top: 100, left: 100 })"> Scroll To [100px, 100px] </IxButton>
      <IxButton
        @click="scrollTo({ rowKey: 'row-key-50', colKey: 'col-key-50', verticalAlign: 'top', horizontalAlign: 'end' })"
      >
        Scroll To [row-key-50, col-key-50](top, end)
      </IxButton>
      <IxButton @click="scrollTo({ rowIndex: 40, colIndex: 40, verticalAlign: 'top', horizontalAlign: 'start' })">
        Scroll To [40, 40](top, start)
      </IxButton>
      <IxButton @click="scrollTo({ rowIndex: 40, colIndex: 40, verticalAlign: 'bottom', horizontalAlign: 'end' })">
        Scroll To [40, 40](bottom, end)
      </IxButton>
      <IxButton @click="scrollTo({ rowIndex: 40, colIndex: 40, verticalAlign: 'auto', horizontalAlign: 'auto' })">
        Scroll To [40, 40](auto)
      </IxButton>
      <IxButton
        @click="
          scrollTo({
            rowIndex: 100,
            colIndex: 100,
            verticalAlign: 'top',
            horizontalAlign: 'end',
            verticalOffset: 15,
            horizontalOffset: 15,
          })
        "
      >
        Scroll To [100, 100](top, start) + 15 offset
      </IxButton>
    </IxSpace>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'

import {
  VirtualRowRenderFn,
  VirtualScrollInstance,
  VirtualScrollRowData,
  VirtualScrollToOptions,
} from '@idux/cdk/scroll'

const listRef = ref<VirtualScrollInstance>()
const colData: { key: string }[] = []
for (let index = 0; index < 1000; index++) {
  colData.push({ key: `col-key-${index}` })
}
const rowData: VirtualScrollRowData[] = []
for (let index = 0; index < 1000; index++) {
  rowData.push({
    key: `row-key-${index}`,
    data: colData,
  })
}

const rowRender: VirtualRowRenderFn = ({ children }) =>
  h(
    'div',
    {
      class: 'virtual-row',
    },
    children,
  )

const onItemClick = (key: string) => {
  console.log('click:', key)
}

const scrollTo = (value: number | VirtualScrollToOptions) => listRef.value?.scrollTo(value)
</script>

<style lang="less">
.demo-both-scroll-wrapper {
  height: 240px;
  .cdk-virtual-scroll {
    border: 1px solid red;
    margin-bottom: 8px;
  }

  .virtual-row {
    flex-shrink: 0;
    display: flex;
    height: 20px;
    flex-wrap: nowrap;
    border: 1px solid gray;
  }

  .virtual-item {
    flex-shrink: 0;
    padding-left: 16px;
    border: 1px solid gray;
    height: 100%;
    width: 200px;
    line-height: 18px;
  }
}
</style>
