<template>
  <IxMenu :dataSource="menus" mode="inline" :indent="breakpoints.xs ? 24 : 48" :selectedKeys="selectedKeys">
    <template #itemLabel="item">
      <router-link :to="item.key">
        <span>{{ item.title }}</span>
        <span v-if="item.subtitle" class="sub-title">{{ item.subtitle }}</span>
      </router-link>
    </template>
  </IxMenu>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

import { appContextToken } from '../../context'
import { config } from '../../sideNav'

const { breakpoints, lang, page, path } = inject(appContextToken)!
const selectedKeys = computed(() => [path.value])
const menus = computed(() => {
  const currLang = lang.value
  const currConfig = config[page.value as 'docs' | 'components' | 'pro' | 'cdk'] || []
  return currConfig
    .filter(item => item.lang === currLang)
    .map(item => {
      const { children } = item
      if (children) {
        const { name } = item
        return {
          type: 'itemGroup',
          key: name,
          label: name,
          children: children.map(item => {
            const { path, title, subtitle } = item
            return { key: path, title, subtitle }
          }),
        }
      }
      const { path, title, subtitle } = item
      return { key: path, title, subtitle }
    })
})
</script>

<style scoped lang="less">
.sub-title {
  margin-left: 8px;
}
</style>
