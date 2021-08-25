<template>
  <IxSpace>
    <IxDropdownButton @click="onClick">
      Dropdown
      <template #overlay>
        <IxMenu>
          <IxMenuItem> Item 1 </IxMenuItem>
          <IxMenuItem> Item 2 </IxMenuItem>
          <IxMenuDivider />
          <IxMenuItem disabled> Item 3 </IxMenuItem>
        </IxMenu>
      </template>
    </IxDropdownButton>
    <IxDropdownButton icon="setting" @click="onClick">
      Dropdown
      <template #overlay>
        <IxMenu>
          <IxMenuItem> Item 1 </IxMenuItem>
          <IxMenuItem> Item 2 </IxMenuItem>
          <IxMenuDivider />
          <IxMenuItem disabled> Item 3 </IxMenuItem>
        </IxMenu>
      </template>
    </IxDropdownButton>
  </IxSpace>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const onClick = () => console.log('button click')
    return { onClick }
  },
})
</script>
