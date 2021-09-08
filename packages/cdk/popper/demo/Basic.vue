<template>
  <IxButton ref="triggerRef" v-bind="triggerEvents">Hover</IxButton>
  <div v-if="visibility" ref="popperRef" class="popper" v-bind="popperEvents">Popper Element</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { usePopper } from '@idux/cdk/popper'

export default defineComponent({
  setup() {
    const { initialize, destroy, popperRef, popperEvents, triggerRef, triggerEvents, visibility } = usePopper()
    onMounted(() => initialize())
    onBeforeUnmount(() => destroy())
    return { popperRef, popperEvents, triggerRef, triggerEvents, visibility }
  },
})
</script>

<style lang="less" scoped>
.popper {
  padding: 8px;
  color: @color-white;
  background: @color-purple;
}
</style>
