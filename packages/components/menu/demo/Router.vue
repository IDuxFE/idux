<template>
  <IxMenu
    v-model:expandedKeys="expandedKeys"
    :dataSource="dataSource"
    :selectedKeys="selectedKeys"
    style="width: 256px"
  >
    <template #label="item">
      <router-link :to="item.key">
        <span>{{ item.label }}</span>
      </router-link>
    </template>
  </IxMenu>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useRoute } from 'vue-router'

import { MenuData } from '@idux/components/menu'

const route = useRoute()
const [, expandedKey, selectedKey, currLang] = route.path.split('/')
const expandedKeys = ref([expandedKey])
const selectedKeys = ref([`/${expandedKey}/${selectedKey}/${currLang}`])
const lang = ref(currLang)
const dataSource = computed<MenuData[]>(() => {
  const currLang = lang.value
  const zh = currLang === 'zh'
  const itemSlots = { label: 'label' }
  return [
    {
      key: 'docs',
      type: 'sub',
      label: zh ? '文档' : 'Docs',
      children: [
        { key: `/docs/introduce/${currLang}`, label: zh ? '介绍' : 'Introduce', slots: itemSlots },
        { key: `/docs/i18n/${currLang}`, label: zh ? '国际化' : 'I18n', slots: itemSlots },
      ],
    },
    {
      key: 'components',
      type: 'sub',
      label: zh ? '基础组件' : 'Components',
      children: [
        { key: `/components/button/${currLang}`, label: zh ? '按钮' : 'Button', slots: itemSlots },
        { key: `/components/icon/${currLang}`, label: zh ? '图标' : 'Icon', slots: itemSlots },
        { key: `/components/menu/${currLang}`, label: zh ? '菜单' : 'Menu', slots: itemSlots },
      ],
    },
    {
      key: 'cdk',
      type: 'sub',
      label: zh ? '开发套件' : 'CDK',
      children: [
        { key: `/cdk/a11y/${lang.value}`, label: zh ? '无障碍性' : 'A11y', slots: itemSlots },
        { key: `/cdk/breakpoint/${lang.value}`, label: zh ? '断点' : 'Breakpoint', slots: itemSlots },
      ],
    },
  ]
})

watch(
  () => route.path,
  path => {
    const [, expandedKey, selectedKey, currLang] = path.split('/')
    expandedKeys.value = [expandedKey]
    selectedKeys.value = [`/${expandedKey}/${selectedKey}/${currLang}`]
    lang.value = currLang
  },
)
</script>
