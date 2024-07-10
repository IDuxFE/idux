<template>
  <CdkDndSortable
    strategy="tree"
    :dataSource="dataSource"
    :onDragStart="onDragStart"
    :onDrop="onDrop"
    :onSortReorder="onSortReorder"
    :onSortChange="onSortChange"
  >
    <div ref="treeRef" class="dnd-tree">
      <CdkDndSortableItem
        v-for="item in flattenedData"
        :key="item.key"
        class="dnd-tree__item"
        :style="getTreeItemStyle(item)"
        :itemKey="item.key"
      >
        <div class="dnd-tree__item__inner">
          <div v-if="item.hasChildren" class="dnd-tree__item__expand" @click="() => toggleCollapsed(item.key)">
            <IxIcon :name="isCollapsed(item.key) ? 'up' : 'down'" />
          </div>
          <span class="dnd-tree__item__label">{{ item.label }}</span>
        </div>
      </CdkDndSortableItem>
    </div>
  </CdkDndSortable>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { type DndSortableOnDragStartArgs, type DndSortableReorderInfo, useDndAutoScroll } from '@idux/cdk/dnd'
import { convertCssPixel, filterTree, flattenTree, mapTree } from '@idux/cdk/utils'

interface TreeData {
  key: string
  label: string
  children?: TreeData[]
}
interface FlattenedTreeData extends TreeData {
  level: number
  hasChildren: boolean
}

const treeRef = ref<HTMLElement>()
const collapsedKeys = ref<string[]>([])

const isCollapsed = (key: string) => collapsedKeys.value.includes(key)

const toggleCollapsed = (key: string) => {
  if (isCollapsed(key)) {
    collapsedKeys.value = collapsedKeys.value.filter(k => k !== key)
  } else {
    collapsedKeys.value.push(key)
  }
}

useDndAutoScroll(treeRef, {
  allowedAxis: 'vertical',
  canScroll: true,
})

const dataSource = ref<TreeData[]>([
  {
    label: 'Item 0',
    key: '0',
    children: [
      {
        label: 'Item 0-0',
        key: '0-0',
        children: [
          {
            label: 'Item 0-0-0',
            key: '0-0-0',
          },
          { label: 'Item 0-0-1', key: '0-0-1' },
          { label: 'Item 0-0-2', key: '0-0-2' },
        ],
      },
      {
        label: 'Item 0-1',
        key: '0-1',
        children: [
          { label: 'Item 0-1-0', key: '0-1-0' },
          { label: 'Item 0-1-1', key: '0-1-1' },
          { label: 'Item 0-1-2', key: '0-1-2' },
        ],
      },
    ],
  },
  {
    label: 'Item 1',
    key: '1',
    children: [
      {
        label: 'Item 1-0',
        key: '1-0',
        children: [
          { label: 'Item 1-0-0', key: '1-0-0' },
          { label: 'Item 1-0-1', key: '1-0-1' },
          { label: 'Item 1-0-2', key: '1-0-2' },
        ],
      },
      {
        label: 'Item 1-1',
        key: '1-1',
        children: [
          { label: 'Item 1-1-0', key: '1-1-0' },
          { label: 'Item 1-1-1', key: '1-1-1' },
          { label: 'Item 1-1-2', key: '1-1-2' },
        ],
      },
    ],
  },
  { label: 'Item 2', key: '2' },
])

const flattenedData = computed<FlattenedTreeData[]>(() => {
  const mappedData = mapTree(dataSource.value, 'children', (item, parents) => ({
    ...item,
    level: parents.length,
    hasChildren: !!item.children?.length,
  }))
  const filteredData = filterTree(mappedData, 'children', (_, parents) =>
    parents.every(parent => !isCollapsed(parent.key)),
  )

  return flattenTree(filteredData, 'children')
})
const getTreeItemStyle = (item: FlattenedTreeData) => {
  return {
    paddingLeft: convertCssPixel(item.level * 32),
  }
}

let currentDragKey: string | undefined
let currentDragItemCollapsed = false
const onDragStart = ({ key }: DndSortableOnDragStartArgs) => {
  currentDragKey = key as string
  currentDragItemCollapsed = isCollapsed(currentDragKey)

  if (!currentDragItemCollapsed) {
    toggleCollapsed(currentDragKey)
  }
}
const onDrop = () => {
  if (!currentDragKey) {
    return
  }

  if (!currentDragItemCollapsed) {
    toggleCollapsed(currentDragKey)
  }

  currentDragKey = undefined
}
const onSortReorder = (reorderInfo: DndSortableReorderInfo) => {
  console.log('onSortReorder', reorderInfo)
}
const onSortChange = (newData: TreeData[], oldData: TreeData[]) => {
  console.log('onSortChange', newData, oldData)
  dataSource.value = newData
}
</script>

<style scoped lang="less">
.dnd-tree {
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

    &__inner {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 16px;
    }
    &__expand {
      width: 16px;
      height: 16px;
      font-size: 16px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
