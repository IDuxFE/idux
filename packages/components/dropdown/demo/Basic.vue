<template>
  <IxDropdown>
    <a class="ix-dropdown-trigger">Hover me <IxIcon name="down"></IxIcon></a>
    <template #overlay>
      <IxMenu :dataSource="dataSource" :selectable="false" @click="onClick"></IxMenu>
    </template>
  </IxDropdown>
</template>

<script setup lang="ts">
import { MenuClickOptions, MenuData } from '@idux/components/menu'

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
