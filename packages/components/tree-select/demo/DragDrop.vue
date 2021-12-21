<template>
  <IxTreeSelect placeholder="拖拽" draggable multiple :dataSource="treeData" :droppable="droppable" :onDrop="onDrop" />
</template>

<script setup lang="ts">
import type { VKey } from '@idux/cdk/utils'
import type { TreeDragDropOptions, TreeDropType, TreeDroppableOptions } from '@idux/components/tree'
import type { TreeSelectNode } from '@idux/components/tree-select'

import { ref } from 'vue'

const treeData = ref<TreeSelectNode[]>([
  {
    label: 'Node 0',
    key: '0',
    children: [
      {
        label: 'Node 0-0',
        key: '0-0',
        disabled: { drop: true },
        children: [
          {
            label: 'Node 0-0-0',
            key: '0-0-0',
            disabled: { drag: true },
          },
          { label: 'Node 0-0-1', key: '0-0-1' },
          { label: 'Node 0-0-2', key: '0-0-2' },
        ],
      },
      {
        label: 'Node 0-1',
        key: '0-1',
        children: [
          { label: 'Node 0-1-0', key: '0-1-0' },
          { label: 'Node 0-1-1', key: '0-1-1' },
          { label: 'Node 0-1-2', key: '0-1-2' },
        ],
      },
    ],
  },
  {
    label: 'Node 1',
    key: '1',
    children: [
      {
        label: 'Node 1-0',
        key: '1-0',
        children: [
          { label: 'Node 1-0-0', key: '1-0-0' },
          { label: 'Node 1-0-1', key: '1-0-1' },
          { label: 'Node 1-0-2', key: '1-0-2' },
        ],
      },
      {
        label: 'Node 1-1',
        key: '1-1',
        children: [
          { label: 'Node 1-1-0', key: '1-1-0' },
          { label: 'Node 1-1-1', key: '1-1-1' },
          { label: 'Node 1-1-2', key: '1-1-2' },
        ],
      },
    ],
  },
  { label: 'Node 2', key: '2' },
])

const droppable = (options: TreeDroppableOptions): TreeDropType | boolean => {
  const { dropNode } = options
  if (dropNode.key === '0') {
    return 'before'
  }
  return true
}

const onDrop = (options: TreeDragDropOptions) => {
  const { dragNode, dropNode, dropType } = options

  const dragKey = dragNode?.key
  const dropKey = dropNode?.key
  if (!dragKey || !dropKey) {
    return
  }

  const loop = (
    data: TreeSelectNode[],
    key: VKey,
    callback: (node: TreeSelectNode, index: number, nodes: TreeSelectNode[]) => void,
  ) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === key) {
        return callback(data[i], i, data)
      }
      if (data[i].children) {
        loop(data[i].children!, key, callback)
      }
    }
  }

  const data: TreeSelectNode[] = [...treeData.value]

  // 原数据中移除被拖拽的节点
  let dragData: TreeSelectNode
  loop(data, dragKey, (node, index, nodes) => {
    dragData = node
    nodes.splice(index, 1)
  })

  if (dropType === 'inside') {
    loop(data, dropKey, item => {
      item.children = item.children || []
      // 添加到头部
      item.children.unshift(dragData)
    })
  } else {
    let targetIndex: number
    let targetNodes: TreeSelectNode[] = []

    loop(data, dropKey, (_, index, nodes) => {
      targetIndex = index
      targetNodes = nodes
    })

    if (dropType === 'before') {
      targetNodes.splice(targetIndex!, 0, dragData!)
    } else {
      targetNodes.splice(targetIndex! + 1, 0, dragData!)
    }
  }

  treeData.value = data
}
</script>
