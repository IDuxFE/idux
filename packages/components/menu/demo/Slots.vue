<template>
  <IxMenu :dataSource="dataSource" style="width: 256px">
    <template #itemLabel="{ label }">
      <span style="color: red">{{ label }} with slot</span>
    </template>
    <template #subIcon="{ expanded }">
      <IxIcon :name="expanded ? 'menu-fold' : 'menu-unfold'"></IxIcon>
    </template>
    <template #subLabel="{ label }">
      <span>{{ label }} with slot</span>
    </template>
  </IxMenu>
</template>

<script setup lang="ts">
import { h } from 'vue'

import { IxIcon } from '@idux/components/icon'
import { MenuData } from '@idux/components/menu'

const dataSource: MenuData[] = [
  { key: 'item1', icon: 'home', label: 'Item 1' },
  {
    key: 'item2',
    label: 'Item 2',
    customIcon: () => h(IxIcon, { name: 'mail' }),
    customLabel: item => h('a', `${item.label} with customLabel`),
  },
  { type: 'divider', key: 'divider1' },

  {
    type: 'sub',
    key: 'sub1',
    label: 'Menu Sub 1',
    customIcon: () => h(IxIcon, { name: 'setting' }),
    customLabel: item => h('a', `${item.label} with customLabel`),
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
    label: 'Menu Sub 4',
    children: [
      { key: 'item10', label: 'Item 10' },
      { key: 'item11', label: 'Item 11' },
    ],
  },
]
</script>
