<template>
  <IxMenu :dataSource="dataSource" style="width: 256px">
    <template #label="item">
      <span style="color: red">{{ item.label }} with slot</span>
    </template>
    <template #subIcon="item">
      <IxIcon :name="item.expanded ? 'menu-fold' : 'menu-unfold'" style="color: red"></IxIcon>
    </template>
  </IxMenu>
</template>

<script setup lang="ts">
import { h } from 'vue'

import { IxIcon } from '@idux/components/icon'
import { MenuData } from '@idux/components/menu'

const dataSource: MenuData[] = [
  { type: 'item', key: 'item1', icon: 'home', label: 'Item 1', slots: { label: 'label' } },
  {
    type: 'item',
    key: 'item2',
    label: 'Item 2',
    slots: { label: item => h('a', item.label), icon: () => h(IxIcon, { name: 'mail' }) },
  },
  { type: 'divider', key: 'divider1' },
  {
    type: 'sub',
    key: 'sub1',
    label: 'Menu Sub 1',
    slots: { label: 'label', icon: 'subIcon' },
    children: [
      {
        type: 'itemGroup',
        key: 'itemGroup1',
        label: 'Item Group 1',

        children: [
          { type: 'item', key: 'item4', label: 'Item 4', slots: { label: 'label' } },
          { type: 'item', key: 'item5', label: 'Item 5' },
        ],
      },
      { type: 'divider', key: 'divider2' },
      {
        type: 'sub',
        key: 'sub2',
        label: 'Menu Sub 2',
        children: [
          { type: 'item', key: 'item6', label: 'Item 6', slots: { label: 'label' } },
          { type: 'item', key: 'item7', label: 'Item 7' },
        ],
      },
      {
        type: 'sub',
        key: 'sub3',
        label: 'Menu Sub 3',
        children: [
          { type: 'item', key: 'item8', label: 'Item 8' },
          { type: 'item', key: 'item9', label: 'Item 9' },
        ],
      },
    ],
  },
  {
    type: 'sub',
    key: 'sub4',
    label: 'Menu Sub 4',
    slots: { label: 'label', icon: 'subIcon' },
    children: [
      { type: 'item', key: 'item10', label: 'Item 10' },
      { type: 'item', key: 'item11', label: 'Item 911' },
    ],
  },
]
</script>
