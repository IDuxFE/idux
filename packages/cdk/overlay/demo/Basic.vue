<template>
  <ix-button
    ref="triggerRef"
    @click="triggerEvents.onClick"
    @mouseenter="triggerEvents.onMouseEnter"
    @mouseleave="triggerEvents.onMouseLeave"
    @focus="triggerEvents.onFocus"
    @blur="triggerEvents.onBlur"
    >Click</ix-button
  >
  <ix-button @click="handleClick">Update</ix-button>
  <teleport to="body">
    <div ref="overlayRef" @mouseenter="overlayEvents.onMouseEnter()" @mouseleave="overlayEvents.onMouseLeave()">
      tooltip
      <div ref="arrowRef"></div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useOverlay } from '@idux/cdk/overlay'

export default defineComponent({
  name: 'Basic',
  setup() {
    const { initialize, overlayRef, triggerRef, triggerEvents, overlayEvents, update, arrowRef } = useOverlay({
      visible: false,
      trigger: 'click',
      placement: 'bottom',
      scrollStrategy: 'reposition',
      offset: [5, 5],
      showDelay: 0,
      hideDelay: 1000,
      allowEnter: true,
    })
    onMounted(initialize)

    const handleClick = () => {
      update({ trigger: 'focus' })
    }

    return { overlayRef, triggerRef, triggerEvents, overlayEvents, handleClick, arrowRef }
  },
})
</script>
