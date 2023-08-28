<template>
  <IxDropdown v-model:visible="visible">
    <a class="ix-dropdown-trigger">Hover me <IxIcon name="down" :rotate="visible ? 0 : -180"></IxIcon></a>
    <template #overlay>
      <IxMenu :dataSource="dataSource" :selectable="false" @click="onClick"></IxMenu>
    </template>
  </IxDropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { MenuClickOptions, MenuData } from '@idux/components/menu'

const visible = ref(false)

const dataSource: MenuData[] = [
  { type: 'item', key: 'one', label: 'One' },
  { type: 'item', key: 'two', label: 'Two' },
  { type: 'divider' },
  { type: 'item', key: 'three', label: 'Three', disabled: true },
]

const onClick = ({ key }: MenuClickOptions) => {
  if (key === 'one') {
    console.log('One was clicked')
  } else if (key === 'two') {
    console.log('Two was clicked')
  } else {
    console.log('Three was clicked, It is impossible')
  }
}
</script>
