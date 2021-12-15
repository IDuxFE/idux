<template>
  <IxRow align="middle" gutter="16">
    <IxCol>
      <IxRadioGroup v-model:value="mode">
        <IxRadio value="vertical">Vertical</IxRadio>
        <IxRadio value="horizontal">Horizontal</IxRadio>
        <IxRadio value="inline">Inline</IxRadio>
      </IxRadioGroup>
    </IxCol>
    <IxCol>
      <IxDivider type="vertical" />
    </IxCol>
    <IxCol>
      <IxRadioGroup v-model:value="theme">
        <IxRadio value="light">Light</IxRadio>
        <IxRadio value="dark">Dark</IxRadio>
      </IxRadioGroup>
    </IxCol>
    <IxCol>
      <IxDivider type="vertical" />
    </IxCol>
    <IxCol>
      <IxRadioGroup v-model:value="collapsed">
        <IxRadio :value="true">Collapsed</IxRadio>
        <IxRadio :value="false">Expanded</IxRadio>
      </IxRadioGroup>
    </IxCol>
  </IxRow>

  <div :style="{ marginTop: '16px', width: mode !== 'horizontal' ? '256px' : undefined }">
    <IxMenu
      v-model:selectedKeys="selectedKeys"
      v-model:expandedKeys="expandedKeys"
      :mode="mode"
      :theme="theme"
      :collapsed="collapsed"
      :dataSource="dataSource"
    >
    </IxMenu>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'

import { MenuData, MenuMode, MenuTheme } from '@idux/components/menu'

const mode = ref<MenuMode>('vertical')
const theme = ref<MenuTheme>('light')
const collapsed = ref(false)
const selectedKeys = ref([])
const expandedKeys = ref([])

const dataSource: MenuData[] = [
  { type: 'item', key: 'item1', icon: 'home', slots: { label: () => h('a', 'Item 1') } },
  { type: 'item', key: 'item2', icon: 'mail', label: 'Item 2' },
  { type: 'item', key: 'item3', icon: 'appstore', label: 'Item 3', disabled: true },
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
          { type: 'item', key: 'item4', label: 'Item 4' },
          { type: 'item', key: 'item5', label: 'Item 5' },
        ],
      },
      { type: 'divider', key: 'divider2' },
      {
        type: 'sub',
        key: 'sub2',
        label: 'Menu Sub 2',
        children: [
          { type: 'item', key: 'item6', label: 'Item 6' },
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
    icon: 'github',
    label: 'Menu Sub 4',
    disabled: true,
    children: [
      { type: 'item', key: 'item10', label: 'Item 10' },
      { type: 'item', key: 'item11', label: 'Item 11' },
    ],
  },
]
</script>
