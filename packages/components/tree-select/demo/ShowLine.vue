<template>
  <IxSpace direction="vertical">
    <IxSpace>
      <IxCheckbox v-model:checked="customExpandIcon">Custom expandIcon</IxCheckbox>
      <IxCheckbox v-model:checked="customLeafLineIcon">Custom leafLineIcon</IxCheckbox>
    </IxSpace>

    <IxTreeSelect
      v-model:value="value"
      placeholder="连接线"
      checkable
      multiple
      showLine
      :dataSource="treeData"
      :leafLineIcon="customLeafLineIcon ? 'file' : undefined"
    >
      <template #expandIcon="{ expanded }">
        <IxIcon v-if="customExpandIcon" :name="expanded ? 'plus-square' : 'minus-square'"></IxIcon>
        <IxIcon v-else name="right" :rotate="expanded ? 90 : 0"></IxIcon>
      </template>
    </IxTreeSelect>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const customExpandIcon = ref(false)
const customLeafLineIcon = ref(false)
const treeData = [
  {
    label: 'Node 0',
    key: '0',
    children: [
      {
        label: 'Node 0-0',
        key: '0-0',
        children: [
          {
            label: 'Node 0-0-0',
            key: '0-0-0',
          },
          {
            label: 'Node 0-0-1',
            key: '0-0-1',
          },
        ],
      },
      {
        label: 'Node 0-1',
        key: '0-1',
        children: [
          { label: 'Node 0-1-0', key: '0-1-0' },
          { label: 'Node 0-1-1', key: '0-1-1' },
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
          {
            label: 'Node 1-0-0',
            key: '1-0-0',
          },
          {
            label: 'Node 1-0-1',
            key: '1-0-1',
          },
        ],
      },
      {
        label: 'Node 1-1',
        key: '1-1',
        children: [
          { label: 'Node 1-1-0', key: '1-1-0' },
          { label: 'Node 1-1-1', key: '1-1-1' },
        ],
      },
    ],
  },
  {
    label: 'Node 2-1',
    key: '2-1',
  },
]

const value = ref(['0-0'])
</script>
<style lang="less" scoped>
.ix-space {
  width: 100%;
}
</style>
