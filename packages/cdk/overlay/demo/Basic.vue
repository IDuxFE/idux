<template>
  <ix-button
    ref="triggerRef"
    @click="triggerEvents.onClick"
    @mouseenter="triggerEvents.onMouseenter"
    @mouseleave="triggerEvents.onMouseleave"
    @focus="triggerEvents.onFocus"
    @blur="triggerEvents.onBlur"
    >Click</ix-button
  >
  <ix-button @click="handleClick">Update</ix-button>
  <div v-if="visibility" ref="overlayRef">
    <div v-click-outside="hide" @mouseenter="overlayEvents.onMouseenter" @mouseleave="overlayEvents.onMouseleave">
      tooltip
      <div ref="arrowRef"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useOverlay } from '@idux/cdk/overlay'
import { clickOutside } from '@idux/cdk/click-outside'

export default defineComponent({
  name: 'Basic',
  directives: { clickOutside },
  setup() {
    const {
      initialize,
      overlayRef,
      triggerRef,
      triggerEvents,
      overlayEvents,
      update,
      arrowRef,
      visibility,
      hide,
    } = useOverlay({
      visible: false,
      trigger: 'click',
      placement: 'top',
      scrollStrategy: 'reposition',
      offset: [5, 5],
      showDelay: 100,
      hideDelay: 1000,
      allowEnter: true,
    })
    onMounted(initialize)

    const handleClick = () => {
      update({ trigger: 'focus' })
    }

    return { overlayRef, triggerRef, triggerEvents, overlayEvents, handleClick, arrowRef, visibility, hide }
  },
})
</script>
