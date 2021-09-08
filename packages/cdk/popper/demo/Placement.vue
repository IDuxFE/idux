<template>
  <IxButton ref="triggerRef" v-bind="triggerEvents">Hover</IxButton>
  <IxPortal target="ix-overlay">
    <div v-if="visibility" ref="popperRef" v-bind="popperEvents" class="popper">Popper Element</div>
  </IxPortal>
  <br />
  <br />
  <IxRadioGroup v-model:value="placement">
    <IxRadio value="topStart">top start</IxRadio>
    <IxRadio value="top">top</IxRadio>
    <IxRadio value="topEnd">top end</IxRadio>
    <IxRadio value="rightStart">right start</IxRadio>
    <IxRadio value="right">right</IxRadio>
    <IxRadio value="rightEnd">right end</IxRadio>
    <IxRadio value="bottomStart">bottom start</IxRadio>
    <IxRadio value="bottom">bottom</IxRadio>
    <IxRadio value="bottomEnd">bottom end</IxRadio>
    <IxRadio value="leftStart">left start</IxRadio>
    <IxRadio value="left">left</IxRadio>
    <IxRadio value="leftEnd">left end</IxRadio>
  </IxRadioGroup>
</template>

<script lang="ts">
import type { PopperPlacement } from '@idux/cdk/popper'

import { defineComponent, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { usePopper } from '@idux/cdk/popper'

export default defineComponent({
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
  color: @color-white;
  background: @color-purple;
}

.ix-radio-group {
  max-width: 400px;
}
.ix-radio {
  width: 120px;
}
</style>
