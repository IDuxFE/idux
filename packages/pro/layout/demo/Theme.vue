<template>
  <div style="border: 1px solid var(--ix-color-border); height: 300px">
    <IxProLayout v-model:activeKey="activeKey" :logo="logo" :menus="dataSource" :theme="mergedTheme">
      <template #itemLabel="item">
        <router-link to="#pro-layout-demo-theme">{{ item.label }}</router-link>
      </template>
      <template #headerExtra>
        <IxButtonGroup align="center" :gap="8" ghost mode="text">
          <IxButton icon="search" />
          <IxButton icon="alert" />
          <IxButton icon="setting" />
          <IxButton icon="question-circle" />
        </IxButtonGroup>
      </template>
      <template #siderFooter>
        <IxLayoutSiderTrigger />
      </template>
      <IxSpace block vertical>
        <IxCard>
          <IxSpace vertical>
            <IxRadioGroup v-model:value="wholeTheme" :dataSource="wholeThemeOptions"> </IxRadioGroup>
            <template v-if="wholeTheme === 'mix'">
              <IxSpace>
                <span>Header: </span>
                <IxRadioGroup v-model:value="mix.header" :dataSource="themesOptions"> </IxRadioGroup>
              </IxSpace>
              <IxSpace>
                <span>Sider : </span>
                <IxRadioGroup v-model:value="mix.sider" :dataSource="themesOptions"> </IxRadioGroup>
              </IxSpace>
            </template>
          </IxSpace>
        </IxCard>
        <IxCard> <p>Card Content</p> </IxCard>
        <IxCard> <p>Card Content</p> </IxCard>
        <IxCard> <p>Card Content</p> </IxCard>
        <IxCard> <p>Card Content</p> </IxCard>
      </IxSpace>
    </IxProLayout>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import { type MenuData } from '@idux/components/menu'
import { type ProLayoutTheme } from '@idux/pro/layout'

const logo = {
  image: '/icons/logo.svg',
  title: 'Pro Layout',
  link: '/pro/layout/zh',
}

const activeKey = ref()
const wholeTheme = ref('light')
const themesOptions = [
  { key: 'light', label: 'Light' },
  { key: 'dark', label: 'Dark' },
]
const wholeThemeOptions = [...themesOptions, { key: 'mix', label: 'Mix Theme' }]
const mix = reactive({ header: 'light', sider: 'light' })
const mergedTheme = computed(() => {
  if (wholeTheme.value === 'mix') {
    return { header: mix.header, sider: mix.sider } as ProLayoutTheme
  }
  return wholeTheme.value as ProLayoutTheme
})
const dataSource: MenuData[] = [
  {
    type: 'sub',
    key: 'sub1',
    icon: 'setting',
    label: 'Sub Menu 1',
    children: [
      { type: 'item', key: 'item4', label: 'Item 4', icon: 'setting' },
      { type: 'item', key: 'item5', label: 'Item 5', icon: 'setting' },
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
