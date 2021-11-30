<template>
  <div style="height: 500px; overflow: auto">
    <IxLayoutPro
      v-model:activeKey="active"
      v-model:collapsed="collapsed"
      :menus="dataSource"
      :mode="mode"
      :indent="indent"
      :theme="theme"
      @menuClick="onClick"
    >
      <template #logo><div>LOGO</div></template>
      <template #extra>登录</template>
      <template #siderTop>siderTop</template>
      <template #siderContent>siderContent</template>
      <template #siderBottom><IxLayoutProCtrl></IxLayoutProCtrl></template>
      <template #default="{ activePath }">
        <div style="height: 600px">{{ active }}, {{ JSON.stringify(activePath) }}</div>
      </template>
    </IxLayoutPro>
  </div>
</template>

<script setup lang="ts">
import type { MenuData } from '@idux/pro/layout'

import { ref } from 'vue'

import { IxLayoutProCtrl } from '../index'

const mode = 'mixin'
const theme = {
  sider: 'light',
  header: 'light',
}

const onClick = val => {
  console.log(val)
}

const indent = 0

const active = ref('item5')
const collapsed = ref(false)

const dataSource: MenuData[] = [
  { type: 'item', key: 'item2', icon: 'mail', label: 'Item 2' },
  // { type: 'item', key: 'item3', icon: 'appstore', label: 'Item 3', disabled: true },
  // { type: 'divider', key: 'divider1' },
  {
    type: 'sub',
    key: 'sub1',
    icon: 'setting',
    label: 'Sub Menu 1',
    children: [
      {
        type: 'itemGroup',
        key: 'itemGroup1',
        icon: 'setting',
        label: 'Item Group 1',
        children: [
          { type: 'item', key: 'item4', label: 'Item 4', disabled: true },
          { type: 'item', key: 'item5', label: 'Item 5' },
        ],
      },
      { type: 'divider', key: 'divider2' },
      {
        type: 'sub',
        key: 'sub2',
        icon: 'setting',
        label: 'Menu Sub 2',
        children: [
          { type: 'item', key: 'item6', label: 'Item 6' },
          { type: 'item', key: 'item7', label: 'Item 7' },
        ],
      },
      {
        type: 'sub',
        key: 'sub3',
        icon: 'setting',
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
    // disabled: true,
    children: [
      { type: 'item', key: 'item10', label: 'Item 10' },
      { type: 'item', key: 'item11', label: 'Item 11' },
    ],
  },
]

dataSource.push({ type: 'divider', key: 'divider1' })
</script>
