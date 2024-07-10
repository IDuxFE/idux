<template>
  <CdkDndSortable :dataSource="dataSource" :onSortReorder="onSortReorder" :onSortChange="onSortChange">
    <div ref="listRef" class="dnd-list">
      <CdkDndSortableItem v-for="item in dataSource" :key="item.key" :itemKey="item.key" class="dnd-list__item">
        <CdkDndSortableHandle class="dnd-list__item__handle">
          <IxIcon name="holder" />
        </CdkDndSortableHandle>
        {{ item.label }}
      </CdkDndSortableItem>
    </div>
  </CdkDndSortable>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { type DndSortableReorderInfo, useDndAutoScroll } from '@idux/cdk/dnd'

interface ListData {
  key: string
  label: string
}

const listRef = ref<HTMLElement>()

useDndAutoScroll(listRef, {
  allowedAxis: 'vertical',
  canScroll: true,
})

const dataSource = ref<ListData[]>(
  Array.from({ length: 30 }).map((_, idx) => {
    return {
      key: `key-${idx}`,
      label: `list item ${idx}`,
    }
  }),
)

const onSortReorder = (reorderInfo: DndSortableReorderInfo) => {
  console.log('onSortReorder', reorderInfo)
}
const onSortChange = (newData: ListData[], oldData: ListData[]) => {
  console.log('onSortChange', newData, oldData)
  dataSource.value = newData
}
</script>

<style scoped lang="less">
.dnd-list {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 500px;
  overflow-y: auto;
  border: 1px solid red;

  &__item {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    width: 100%;
    height: 48px;
    padding: 0 16px;

    &:not(&:last-child) {
      border-bottom: 1px solid red;
    }

    &__handle {
      margin-right: 8px;
    }
  }
}
</style>
