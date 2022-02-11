<template>
  <IxSpace justify="center">
    <IxDropdown>
      <IxButton>Hover</IxButton>
      <template #overlay>
        <IxMenu :dataSource="dataSource" :selectable="false"></IxMenu>
      </template>
    </IxDropdown>
    <IxDropdown trigger="click">
      <IxButton>Click</IxButton>
      <template #overlay>
        <IxMenu :dataSource="dataSource" :selectable="false"></IxMenu>
      </template>
    </IxDropdown>
    <IxDropdown trigger="contextmenu">
      <IxButton>Right click</IxButton>
      <template #overlay>
        <IxMenu :dataSource="dataSource" :selectable="false"></IxMenu>
      </template>
    </IxDropdown>
    <IxDropdown :visible="visible" trigger="manual">
      <IxSwitch v-model:checked="visible"></IxSwitch>
      <template #overlay>
        <IxMenu :dataSource="dataSource" :selectable="false"></IxMenu>
      </template>
    </IxDropdown>
  </IxSpace>
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
