<template>
  <IxDropdown>
    <a class="ix-dropdown-trigger">Hover me <IxIcon name="down"></IxIcon></a>
    <template #overlay>
      <IxMenu @click="onClick">
        <IxMenuItem key="one"> Item 1 </IxMenuItem>
        <IxMenuItem key="two"> Item 2 </IxMenuItem>
        <IxMenuDivider />
        <IxMenuItem key="three" disabled> Item 3 </IxMenuItem>
      </IxMenu>
    </template>
  </IxDropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type Key = 'one' | 'two' | 'three'

export default defineComponent({
  setup() {
    const onClick = ({ key }: { key: Key }) => {
      if (key === 'one') {
        console.log('One was clicked')
      } else if (key === 'two') {
        console.log('Two was clicked')
      } else {
        console.log('Three was clicked, It is impossible')
      }
    }
    return { onClick }
  },
})
</script>
