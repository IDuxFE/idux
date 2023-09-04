<template>
  <IxSpace>
    <IxButtonGroup>
      <IxButton @click="onClick">Button</IxButton>
      <IxDropdown>
        <IxButton icon="ellipsis" shape="square"></IxButton>
        <template #overlay>
          <IxMenu :dataSource="dataSource" :selectable="false"></IxMenu>
        </template>
      </IxDropdown>
    </IxButtonGroup>
    <IxButtonGroup>
      <IxButton @click="onClick">Button</IxButton>
      <IxDropdown v-model:visible="settingDropdownVisible">
        <IxButton shape="square">
          <IxIcon name="setting" :rotate="settingDropdownVisible ? -180 : 0" size="16px" />
        </IxButton>
        <template #overlay>
          <IxMenu :dataSource="dataSource" :selectable="false"></IxMenu>
        </template>
      </IxDropdown>
    </IxButtonGroup>

    <IxDropdown v-model:visible="arrowDropdownVisible">
      <IxButton>
        Button
        <IxIcon name="down" :rotate="arrowDropdownVisible ? -180 : 0" size="16px" style="margin-left: 4px"></IxIcon>
      </IxButton>
      <template #overlay>
        <IxMenu :dataSource="dataSource" :selectable="false"></IxMenu>
      </template>
    </IxDropdown>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { MenuData } from '@idux/components/menu'

const settingDropdownVisible = ref(false)
const arrowDropdownVisible = ref(false)

const dataSource: MenuData[] = [
  { type: 'item', key: 'one', label: 'One' },
  { type: 'item', key: 'two', label: 'Two' },
  { type: 'divider' },
  { type: 'item', key: 'three', label: 'Three', disabled: true },
]

const onClick = () => console.log('button click')
</script>
