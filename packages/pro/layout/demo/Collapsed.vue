<template>
  <IxLayoutPro
    v-model:activeKey="activeKey"
    v-model:collapsed="collapsed"
    mode="both"
    :menus="dataSource"
    breakpoint="md"
  >
    <template #logo>
      <div class="logo">Logo</div>
    </template>
    <template #siderTop>
      <div class="sider-top" :style="siderTopStyle">
        <div v-show="!collapsed" class="title">title</div>
        <IxLayoutSiderTrigger></IxLayoutSiderTrigger>
      </div>
    </template>
    <template #default>
      <div class="content">
        <p>The current IxLayoutSiderTrigger is placed in siderTop and siderBottom.</p>
        <p
          >Try to drag the page to change the width, breakpoin will make the sidebar collapse according to the page
          width.</p
        >
      </div>
    </template>
    <template #siderBottom>
      <IxLayoutSiderTrigger class="sider-bottom"></IxLayoutSiderTrigger>
    </template>
  </IxLayoutPro>
</template>

<script setup lang="ts">
import type { LayoutProMenuData } from '@idux/pro/layout'

import { computed, ref } from 'vue'

const activeKey = ref(null)
const collapsed = ref(false)
const siderTopStyle = computed(() => ({ justifyContent: collapsed.value ? 'center' : 'space-between' }))
const dataSource: LayoutProMenuData[] = [
  {
    type: 'sub',
    key: 'sub1',
    icon: 'star',
    label: 'Sub Menu 1',
    children: [
      {
        type: 'sub',
        key: 'sub2',
        icon: 'setting',
        label: 'Item sub 2',
        children: [
          { type: 'item', key: 'item4', label: 'Item 4', icon: 'star' },
          { type: 'item', key: 'item5', label: 'Item 5', icon: 'star' },
        ],
      },
      {
        type: 'sub',
        key: 'sub3',
        icon: 'file',
        label: 'Menu Sub 3',
        children: [
          { type: 'item', key: 'item6', label: 'Item 6' },
          { type: 'item', key: 'item7', label: 'Item 7' },
        ],
      },
      {
        type: 'sub',
        key: 'sub4',
        icon: 'gitlab',
        label: 'Menu Sub 4',
        children: [
          { type: 'item', key: 'item8', label: 'Item 8' },
          { type: 'item', key: 'item9', label: 'Item 9' },
        ],
      },
    ],
  },
  {
    type: 'sub',
    key: 'sub5',
    icon: 'github',
    label: 'Menu Sub 5',
    children: [
      { type: 'item', key: 'item10', label: 'Item 10', icon: 'star' },
      { type: 'item', key: 'item11', label: 'Item 11', icon: 'star' },
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

.sider-top {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    font-weight: bold;
    font-size: 18px;
    padding-left: 24px;
  }
}

.sider-bottom {
  padding-left: 24px;
}

.content {
  padding: 24px;
  line-height: 24px;
}
</style>
