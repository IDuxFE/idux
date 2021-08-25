<template>
  <IxSpace>
    <IxPopover title="Title" content="Content...">
      <IxButton>Hover</IxButton>
    </IxPopover>
    <IxPopover title="Title" content="Content..." trigger="focus">
      <IxButton>Focus</IxButton>
    </IxPopover>
    <IxPopover title="Title" content="Content..." trigger="click">
      <IxButton>Click</IxButton>
    </IxPopover>
    <IxPopover title="Title" content="Content..." trigger="contextmenu">
      <IxButton>Context Menu</IxButton>
    </IxPopover>
    <IxPopover title="Title" content="Content..." trigger="manual" :visible="visible">
      <IxButton @click="visible = !visible">Manual</IxButton>
    </IxPopover>
  </IxSpace>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)
    return { visible }
  },
})
</script>
