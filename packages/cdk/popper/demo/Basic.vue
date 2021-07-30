<template>
  <ix-button ref="triggerRef" v-bind="triggerEvents">Hover</ix-button>
  <div v-if="visibility" ref="popperRef" class="popper" v-bind="popperEvents">Popper Element</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { usePopper } from '@idux/cdk/popper'
import { IxButton } from '@idux/components/button'

export default defineComponent({
  components: { IxButton },
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
  color: @white;
  background: @purple;
}
</style>
