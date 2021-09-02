<template>
  <IxSpace>
    <IxButtonGroup>
      <IxButton @click="onClick">Button</IxButton>
      <IxDropdown>
        <IxButton icon="ellipsis"></IxButton>
        <template #overlay>
          <IxMenu>
            <IxMenuItem> Item 1 </IxMenuItem>
            <IxMenuItem> Item 2 </IxMenuItem>
            <IxMenuDivider />
            <IxMenuItem disabled> Item 3 </IxMenuItem>
          </IxMenu>
        </template>
      </IxDropdown>
    </IxButtonGroup>
    <IxButtonGroup>
      <IxButton @click="onClick">Button</IxButton>
      <IxDropdown>
        <IxButton icon="setting"></IxButton>
        <template #overlay>
          <IxMenu>
            <IxMenuItem> Item 1 </IxMenuItem>
            <IxMenuItem> Item 2 </IxMenuItem>
            <IxMenuDivider />
            <IxMenuItem disabled> Item 3 </IxMenuItem>
          </IxMenu>
        </template>
      </IxDropdown>
    </IxButtonGroup>

    <IxDropdown>
      <IxButton>Button <IxIcon name="down"></IxIcon></IxButton>
      <template #overlay>
        <IxMenu>
          <IxMenuItem> Item 1 </IxMenuItem>
          <IxMenuItem> Item 2 </IxMenuItem>
          <IxMenuDivider />
          <IxMenuItem disabled> Item 3 </IxMenuItem>
        </IxMenu>
      </template>
    </IxDropdown>
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
