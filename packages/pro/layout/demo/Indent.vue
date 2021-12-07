<template>
  <IxLayoutPro v-model:activeKey="activeKey" :menus="dataSource" mode="both" :indent="indent">
    <template #logo>
      <div class="logo">Logo</div>
    </template>
    <template #default>
      <div class="content">
        indent (numbers only):
        <IxInput :value="`${indent}`" class="input-box" @update:value="updateIndent"></IxInput>
      </div>
    </template>
  </IxLayoutPro>
</template>

<script setup lang="ts">
import type { LayoutProMenuData } from '@idux/pro/layout'

import { ref } from 'vue'

const activeKey = ref()
const indent = ref(24)
const updateIndent = (val: string) => {
  indent.value = Number(val)
}
const dataSource: LayoutProMenuData[] = [
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
  { type: 'item', key: 'item2', icon: 'mail', label: 'Item 2' },
]
</script>

<style lang="less" scoped>
.logo {
  padding-left: 24px;
  font-weight: bold;
  font-size: 24px;
}

.content {
  padding: 24px;
  line-height: 24px;
}

.input-box {
  width: 100px;
}
</style>
