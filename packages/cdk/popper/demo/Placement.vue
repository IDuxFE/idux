<template>
  <ix-button ref="triggerRef" v-bind="triggerEvents">Hover</ix-button>
  <ix-portal target="ix-overlay">
    <div v-if="visibility" ref="popperRef" v-bind="popperEvents" class="popper">Popper Element</div>
  </ix-portal>
  <br />
  <br />
  <ix-radio-group v-model:value="placement">
    <ix-radio value="topStart">top start</ix-radio>
    <ix-radio value="top">top</ix-radio>
    <ix-radio value="topEnd">top end</ix-radio>
    <ix-radio value="rightStart">right start</ix-radio>
    <ix-radio value="right">right</ix-radio>
    <ix-radio value="rightEnd">right end</ix-radio>
    <ix-radio value="bottomStart">bottom start</ix-radio>
    <ix-radio value="bottom">bottom</ix-radio>
    <ix-radio value="bottomEnd">bottom end</ix-radio>
    <ix-radio value="leftStart">left start</ix-radio>
    <ix-radio value="left">left</ix-radio>
    <ix-radio value="leftEnd">left end</ix-radio>
  </ix-radio-group>
</template>

<script lang="ts">
import type { PopperPlacement } from '@idux/cdk/popper'

import { defineComponent, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { usePopper } from '@idux/cdk/popper'
import { IxPortal } from '@idux/cdk/portal'
import { IxButton } from '@idux/components/button'
import { IxRadio, IxRadioGroup } from '@idux/components/radio'

export default defineComponent({
  name: 'Placement',
  components: { IxButton, IxRadio, IxRadioGroup, IxPortal },
  setup() {
    const placement = ref<PopperPlacement>('top')

    const { initialize, destroy, update, popperRef, triggerRef, popperEvents, triggerEvents, visibility } = usePopper()

    onMounted(() => initialize())
    onBeforeUnmount(() => destroy())

    watch(placement, () => {
      update({ placement: placement.value })
    })

    return { placement, popperRef, popperEvents, triggerRef, triggerEvents, visibility }
  },
})
</script>

<style lang="less" scoped>
.popper {
  padding: 8px;
  color: @white;
  background: @purple;
}

.ix-radio-group {
  max-width: 400px;
}
.ix-radio {
  width: 120px;
}
</style>
