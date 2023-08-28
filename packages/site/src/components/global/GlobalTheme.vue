<template>
  <div class="floatButton">
    <IxDropdown placement="left" :offset="[0, 16]">
      <IxIcon name="setting" />
      <template #overlay>
        <IxMenu v-model:selectedKeys="selectedKeys" :dataSource="dataSource"></IxMenu>
      </template>
    </IxDropdown>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watch } from 'vue'

import { MenuData } from '@idux/components/menu'

import { themeConfig } from './themeConfig'
import { appContextToken } from '../../context'

const { setTheme } = inject(appContextToken)!

const dataSource: MenuData[] = [
  ...themeConfig,
  { key: 'divider', type: 'divider' },
  { key: 'title', label: 'Theme', disabled: true },
]

const themeKey = 'idux_theme'
const currTheme = localStorage.getItem(themeKey) || 'default'
const selectedKeys = ref([currTheme])

const loadTheme = (theme: string) => {
  setTheme(theme)
  if (window.changeTheme) {
    window.changeTheme(theme)
  } else {
    fetch(`/themes/s/${theme}`)
  }
}

loadTheme(currTheme)

watch(selectedKeys, ([theme]) => {
  localStorage.setItem(themeKey, theme)
  loadTheme(theme)
})
</script>

<style lang="less">
.floatButton {
  // TODO need less var

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: #1c6eff;
  }

  .ix-icon {
    font-size: 20px;
  }
}
</style>
