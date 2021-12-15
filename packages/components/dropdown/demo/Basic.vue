<template>
  <IxDropdown>
    <a class="ix-dropdown-trigger">Hover me <IxIcon name="down"></IxIcon></a>
    <template #overlay>
      <IxMenu :dataSource="dataSource" @click="onClick">
        <IxMenuItem key="one"> Item 1 </IxMenuItem>
        <IxMenuItem key="two"> Item 2 </IxMenuItem>
        <IxMenuDivider />
        <IxMenuItem key="three" disabled> Item 3 </IxMenuItem>
      </IxMenu>
    </template>
  </IxDropdown>
</template>

<script setup lang="ts">
import { MenuData } from '@idux/components/menu'

type Key = 'one' | 'two' | 'three'

const dataSource: MenuData[] = [
  { type: 'item', key: 'one', label: 'One' },
  { type: 'item', key: 'two', label: 'Two' },
  { type: 'divider' },
  { type: 'item', key: 'three', label: 'Three', disabled: true },
]

const onClick = ({ key }: { key: Key }) => {
  if (key === 'one') {
    console.log('One was clicked')
  } else if (key === 'two') {
    console.log('Two was clicked')
  } else {
    console.log('Three was clicked, It is impossible')
  }
}
</script>
