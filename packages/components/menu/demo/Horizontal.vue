<template>
  <IxMenu mode="horizontal" :dataSource="dataSource"></IxMenu>
</template>
<script setup lang="ts">
import { h } from 'vue'

import { MenuData } from '@idux/components/menu'

const dataSource: MenuData[] = [
  { key: 'item1', icon: 'home', customLabel: () => h('a', 'Item 1') },
  { key: 'item2', icon: 'mail', label: 'Item 2' },
  { key: 'item3', icon: 'appstore', label: 'Item 3', disabled: true },
  { type: 'divider', key: 'divider1' },
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
    disabled: true,
    children: [
      { key: 'item10', label: 'Item 10' },
      { key: 'item11', label: 'Item 11' },
    ],
  },
]
</script>
