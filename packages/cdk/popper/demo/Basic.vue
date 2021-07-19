<template>
  <div ref="triggerRef" class="trigger">Trigger Element</div>
  <div v-if="visibility" ref="popperRef" class="popper">Overlay Element</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { usePopper } from '@idux/cdk/popper'

export default defineComponent({
  setup() {
    const { initialize, popperRef, triggerRef, visibility } = usePopper()
    onMounted(initialize)

    return { popperRef, triggerRef, visibility }
  },
})
</script>

<style lang="less" scoped>
.trigger {
  background: pink;
  height: 200px;
}
.popper {
  width: 100px;
  height: 100px;
  background: purple;
  color: #fff;
}
</style>
