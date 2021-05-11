<template>
  <div ref="triggerRef" class="trigger">Trigger Element</div>
  <div v-if="visibility" ref="overlayRef" class="overlay">Overlay Element</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useOverlay } from '@idux/cdk/overlay'

export default defineComponent({
  setup() {
    const { initialize, overlayRef, triggerRef, visibility } = useOverlay()

    onMounted(initialize)

    return { overlayRef, triggerRef, visibility }
  },
})
</script>

<style lang="less" scoped>
.trigger {
  background: pink;
  height: 200px;
}

.overlay {
  width: 100px;
  height: 100px;
  background: purple;
  color: #fff;
}
</style>
