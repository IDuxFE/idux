<template>
  <IxSpace>
    <IxDropdown>
      <a class="ix-dropdown-trigger">Hover me</a>
      <template #overlay>
        <IxMenu :dataSource="dataSource"></IxMenu>
      </template>
    </IxDropdown>
    <IxDivider type="vertical" />
    <IxDropdown trigger="click">
      <a class="ix-dropdown-trigger">Click me</a>
      <template #overlay>
        <IxMenu :dataSource="dataSource"></IxMenu>
      </template>
    </IxDropdown>
    <IxDivider type="vertical" />
    <IxDropdown trigger="contextmenu">
      <a class="ix-dropdown-trigger">Right click me</a>
      <template #overlay>
        <IxMenu :dataSource="dataSource"></IxMenu>
      </template>
    </IxDropdown>
  </IxSpace>
  <br />
  <IxDropdown :visible="visible" trigger="manual">
    <IxSwitch v-model:checked="visible"></IxSwitch>
    <template #overlay>
      <IxMenu :dataSource="dataSource"></IxMenu>
    </template>
  </IxDropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { MenuData } from '@idux/components/menu'

const visible = ref(false)

const dataSource: MenuData[] = [
  { type: 'item', key: 'one', label: 'One' },
  { type: 'item', key: 'two', label: 'Two' },
  { type: 'divider' },
  { type: 'item', key: 'three', label: 'Three', disabled: true },
]
</script>
