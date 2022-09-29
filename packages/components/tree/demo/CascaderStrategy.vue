<template>
  <IxSpace vertical>
    <IxRadioGroup v-model:value="cascaderStrategy">
      <IxRadio value="all">All</IxRadio>
      <IxRadio value="parent">Parent</IxRadio>
      <IxRadio value="child">Child</IxRadio>
      <IxRadio value="off">Off</IxRadio>
    </IxRadioGroup>
    <IxTree
      v-model:checkedKeys="checkedKeys"
      v-model:expandedKeys="expandedKeys"
      v-model:selectedKeys="selectedKeys"
      checkable
      :cascaderStrategy="cascaderStrategy"
      :dataSource="treeData"
      @check="onCheck"
    >
    </IxTree>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import { CascaderStrategy } from '@idux/components/cascader'
import { TreeNode } from '@idux/components/tree'

const treeData: TreeNode[] = [
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
          {
            label: 'Node 0-1-0',
            key: '0-1-0',
          },
          {
            label: 'Node 0-1-1',
            key: '0-1-1',
            children: [
              {
                label: 'Node 0-1-1-0',
                key: '0-1-1-0',
              },
              {
                label: 'Node 0-1-1-1',
                key: '0-1-1-1',
              },
            ],
          },
        ],
      },
    ],
  },
]

const checkedKeys = ref(['0'])
const expandedKeys = ref(['0', '0-0', '0-1'])
const selectedKeys = ref(['0-1'])

const cascaderStrategy = ref<CascaderStrategy>('all')

watchEffect(() => console.log('checkedKeys:', checkedKeys.value))

const onCheck = (checked: boolean, node: TreeNode) => console.log('checked', checked, node)
</script>
