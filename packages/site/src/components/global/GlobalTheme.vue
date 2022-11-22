<template>
  <div class="floatButton">
    <IxDropdown placement="top" :offset="[0, 16]">
      <span class="ix-dropdown-trigger">
        <IxIcon name="setting" />
      </span>
      <template #overlay>
        <IxMenu v-model:selectedKeys="selectedKeys" :dataSource="dataSource"></IxMenu>
      </template>
    </IxDropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { MenuData } from '@idux/components/menu'

import { themeConfig } from './themeConfig'

const emit = defineEmits(['themeChange'])

const dataSource: MenuData[] = [
  ...themeConfig,
  { key: 'divider', type: 'divider' },
  { key: 'title', label: 'Theme', disabled: true },
]

const themeKey = 'idux_theme'
const currTheme = localStorage.getItem(themeKey) || 'default'
const selectedKeys = ref([currTheme])

const loadTheme = (theme: string) => {
  emit('themeChange', theme)
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
  position: fixed;
  right: 72px;
  bottom: 82px;
  z-index: 99;
  cursor: pointer;
  // TODO need less var
  color: #000;
  background-color: #fff;
  padding: 6px;
  border-radius: 50%;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;

  &:hover {
    color: #1c6eff;
  }

  .ix-icon {
    font-size: 20px;
  }
}
</style>
