<template>
  <IxTreeSelect
    v-model:value="value"
    placeholder="自定义回填数据"
    multiple
    checkable
    :dataSource="treeData"
    :maxLabelCount="3"
  >
    <template #label="node"><IxIcon :name="node.icon" />{{ node.label }}</template>
    <template #maxLabel="moreNodes">and {{ moreNodes.length }} more selected</template>
  </IxTreeSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const treeData = [
  {
    label: 'Node 0',
    key: '0',
    icon: 'bulb',
    children: [
      {
        label: 'Node 0-0',
        key: '0-0',
        icon: 'bulb',
        children: [
          {
            label: 'Node 0-0-0',
            key: '0-0-0',
            icon: 'bulb',
          },
          {
            label: 'Node 0-0-1',
            key: '0-0-1',
            icon: 'bulb',
          },
        ],
      },
      {
        label: 'Node 0-1',
        key: '0-1',
        icon: 'bulb',
        children: [
          {
            label: 'Node 0-1-0',
            key: '0-1-0',
            icon: 'bulb',
          },
          {
            label: 'Node 0-1-1',
            key: '0-1-1',
            icon: 'bulb',
          },
        ],
      },
    ],
  },
]

const value = ref(['0-0'])
</script>
