<template>
  <div class="wrapper">
    <IxProLayout v-model:activeKey="activeKey" :menus="dataSource" type="both" :fixed="fixed">
      <template #logo>
        <div class="logo">Logo</div>
      </template>
      <div class="content">
        <div>Currently fixed is {{ fixed }}</div>
        <IxButton @click="switchFixed">switch</IxButton>
      </div>
    </IxProLayout>
  </div>
</template>

<script setup lang="ts">
import type { ProLayoutMenuData } from '@idux/pro/layout'

import { ref } from 'vue'

const activeKey = ref()
const fixed = ref(true)
const switchFixed = () => {
  fixed.value = !fixed.value
}
const dataSource: ProLayoutMenuData[] = [
  {
    type: 'sub',
    key: 'sub1',
    icon: 'setting',
    label: 'Sub Menu 1',
    children: [
      { type: 'item', key: 'item4', label: 'Item 4', icon: 'setting' },
      { type: 'item', key: 'item5', label: 'Item 5', icon: 'setting' },
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
    children: [
      { type: 'item', key: 'item10', label: 'Item 10' },
      { type: 'item', key: 'item11', label: 'Item 11' },
    ],
  },
  { type: 'item', key: 'item2', icon: 'mail', label: 'Item 2' },
]
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 300px;
}

.logo {
  padding-left: 24px;
  font-weight: bold;
  font-size: 24px;
}

.content {
  margin: 24px;
  width: 800px;
  height: 400px;
  line-height: 40px;
  text-align: center;
  background: linear-gradient(45deg, #567df5, transparent);
}
</style>
