<template>
  <ix-button ref="triggerRef" v-click-outside="() => hide()">Click</ix-button>
  <ix-button @click="handleClick">Update Trigger</ix-button>

  <div v-show="visibility" ref="overlayRef">
    tooltip
    <div ref="arrowRef"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useOverlay } from '@idux/cdk/overlay'

export default defineComponent({
  setup() {
    const { initialize, overlayRef, triggerRef, update, arrowRef, visibility, hide } = useOverlay({
      visible: false,
      trigger: 'click',
      placement: 'top',
      scrollStrategy: 'reposition',
      offset: [5, 5],
      showDelay: 0,
      hideDelay: 100,
      allowEnter: true,
    })
    onMounted(initialize)

    const handleClick = () => {
      update({ trigger: 'hover' })
    }

    return { overlayRef, triggerRef, handleClick, arrowRef, visibility, hide }
  },
})
</script>
