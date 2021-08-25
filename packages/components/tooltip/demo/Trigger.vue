<template>
  <IxSpace>
    <IxTooltip title="prompt text">
      <IxButton>Hover</IxButton>
    </IxTooltip>
    <IxTooltip title="prompt text" trigger="focus">
      <IxButton>Focus</IxButton>
    </IxTooltip>
    <IxTooltip title="prompt text" trigger="click">
      <IxButton>Click</IxButton>
    </IxTooltip>
    <IxTooltip title="prompt text" trigger="contextmenu">
      <IxButton>Context Menu</IxButton>
    </IxTooltip>
    <IxTooltip title="prompt text" trigger="manual" :visible="visible">
      <IxButton @click="visible = !visible">Manual</IxButton>
    </IxTooltip>
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
