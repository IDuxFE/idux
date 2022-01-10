<template>
  <IxMenu
    mode="inline"
    :expandedKeys="expandedKeys"
    :dataSource="dataSource"
    style="width: 256px"
    @update:expandedKeys="onExpandedChange"
  >
  </IxMenu>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { VKey } from '@idux/cdk/utils'
import { MenuData } from '@idux/components/menu'

const dataSource: MenuData[] = [
  {
    type: 'sub',
    key: 'sub1',
    icon: 'setting',
    label: 'Sub Menu 1',
    children: [
      {
        type: 'itemGroup',
        key: 'itemGroup1',
        label: 'Item Group 1',
        children: [
          { key: 'item4', label: 'Item 4' },
          { key: 'item5', label: 'Item 5' },
        ],
      },
      { type: 'divider', key: 'divider2' },
      {
        type: 'sub',
        key: 'sub2',
        label: 'Menu Sub 2',
        children: [
          { key: 'item6', label: 'Item 6' },
          { key: 'item7', label: 'Item 7' },
        ],
      },
      {
        type: 'sub',
        key: 'sub3',
        label: 'Menu Sub 3',
        children: [
          { key: 'item8', label: 'Item 8' },
          { key: 'item9', label: 'Item 9' },
        ],
      },
    ],
  },
  {
    type: 'sub',
    key: 'sub4',
    icon: 'github',
    label: 'Menu Sub 4',
    children: [
      { key: 'item10', label: 'Item 10' },
      { key: 'item11', label: 'Item 11' },
    ],
  },
  {
    type: 'sub',
    key: 'sub5',
    icon: 'github',
    label: 'Menu Sub 5',
    children: [
      { key: 'item12', label: 'Item 12' },
      { key: 'item13', label: 'Item 13' },
    ],
  },
]

const rootMenuSubKeys: VKey[] = ['sub1', 'sub4', 'sub5']

const expandedKeys = ref<VKey[]>([])

const onExpandedChange = (keys: VKey[]) => {
  const lastExpandedKey = keys.find(key => !expandedKeys.value.includes(key))
  if (rootMenuSubKeys.indexOf(lastExpandedKey!) === -1) {
    expandedKeys.value = keys
  } else {
    expandedKeys.value = lastExpandedKey ? [lastExpandedKey] : []
  }
}
</script>
