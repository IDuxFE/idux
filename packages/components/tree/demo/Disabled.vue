<template>
  <IxSpace direction="vertical">
    checkStrategy：
    <IxRadioGroup v-model:value="checkStrategy">
      <IxRadio value="all">all</IxRadio>
      <IxRadio value="parent">parent</IxRadio>
      <IxRadio value="child">child</IxRadio>
    </IxRadioGroup>
    cascade
    <IxRadioGroup v-model:value="cascade">
      <IxRadio :value="true">true</IxRadio>
      <IxRadio :value="false">false</IxRadio>
    </IxRadioGroup>
    <IxTree
      v-model:checkedKeys="checkedKeys"
      v-model:expandedKeys="expandedKeys"
      v-model:selectedKeys="selectedKeys"
      checkable
      defaultExpandAll
      :cascade="cascade"
      :checkStrategy="checkStrategy"
      :dataSource="treeData"
      @check="onCheck"
      @expand="onExpand"
      @select="onSelect"
    >
    </IxTree>
    checkedKeys：{{ checkedKeys }}
  </IxSpace>
</template>

<script setup lang="ts">
import type { TreeCheckStrategy, TreeNode } from '@idux/components/tree'

import { ref } from 'vue'

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
                disabled: { check: true },
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
const expandedKeys = ref([])
const selectedKeys = ref(['0-1'])

const cascade = ref(true)
const checkStrategy = ref<TreeCheckStrategy>('parent')
const onCheck = (checked: boolean, node: TreeNode) => console.log('checked', checked, node)
const onExpand = (expanded: boolean, node: TreeNode) => console.log('expanded', expanded, node)
const onSelect = (selected: boolean, node: TreeNode) => console.log('selected', selected, node)
</script>
