<template>
  <ix-button ref="triggerRef" v-click-outside="() => hide()">Trigger</ix-button>
  <ix-portal target="ix-overlay">
    <div v-if="visibility" ref="overlayRef" class="overlay">Overlay 浮层</div>
  </ix-portal>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import { useOverlay } from '@idux/cdk/overlay'

export default defineComponent({
  name: 'Portal',
  setup() {
    const { initialize, triggerRef, overlayRef, destroy, visibility, hide } = useOverlay({
      scrollStrategy: 'reposition',
      placement: 'bottom-start',
      trigger: 'click',
      offset: [0, 8],
      hideDelay: 100,
      showDelay: 100,
    })

    onMounted(initialize)

    onUnmounted(destroy)

    return { triggerRef, overlayRef, visibility, hide }
  },
})
</script>
<style lang="less">
.overlay {
  z-index: 1000;
  background: #fff;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
</style>
