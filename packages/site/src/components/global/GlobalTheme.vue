<template>
  <div class="floatButton">
    <IxDropdown placement="top" :offset="[0, 16]">
      <span class="ix-dropdown-trigger">
        <IxIcon name="setting" />
      </span>
      <template #overlay>
        <IxMenu :dataSource="dataSource" @click="changeTheme"></IxMenu>
      </template>
    </IxDropdown>
  </div>
</template>

<script setup lang="ts">
import { MenuData } from '@idux/components/menu'

import { themeConfig } from './themeConfig'

const dataSource: MenuData[] = themeConfig.map(item => {
  return {
    type: 'item',
    ...item,
  }
})
dataSource.push(
  ...[
    { type: 'divider', key: 'divider', label: '' },
    { type: 'item', key: 'title', label: 'Theme', disabled: true },
  ],
)

const changeTheme = async ({ key }) => {
  if (window.changeTheme) {
    window.changeTheme(key)
  } else {
    await fetch('/themes/s/' + key)
  }
}
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
