<template>
  <IxLayoutPro v-model:activeKey="activeKey" :menus="dataSource" :mode="mode">
    <template #logo>
      <div class="logo">Logo</div>
    </template>
    <template #extra>🔧Tools can be placed here</template>
    <template #default="{ activePath }">
      <div class="content">
        <IxSpace>
          <template v-for="modeType in modeTypes" :key="modeType">
            <IxButton :mode="modeType === mode ? 'primary' : undefined" @click="switchMode(modeType)">{{
              modeType
            }}</IxButton>
          </template>
        </IxSpace>
        <div>Currently active is: {{ activeKey }}</div>
        <div>Currently activePath is: {{ JSON.stringify(activePath) }}</div>
      </div>
    </template>
  </IxLayoutPro>
</template>

<script setup lang="ts">
import type { LayoutProMenuData } from '@idux/pro/layout'

import { ref } from 'vue'

const activeKey = ref(null)
const modeTypes = ['header', 'sider', 'both', 'mixin']
const mode = ref('both')
const switchMode = selectMode => {
  mode.value = selectMode
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
</style>
