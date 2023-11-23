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

const { theme, setTheme } = inject(appContextToken)!

const dataSource: MenuData[] = [
  ...themeConfig,
  { key: 'divider', type: 'divider' },
  { key: 'title', label: 'Theme', disabled: true },
]

const selectedKeys = ref([theme.value])

watch(selectedKeys, ([selectedTheme]) => {
  setTheme(selectedTheme)
})
</script>

<style lang="less">
.floatButton {
  // TODO need less var

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: var(--ix-color-primary);
  }

  .ix-icon {
    font-size: 20px;
  }
}
</style>
