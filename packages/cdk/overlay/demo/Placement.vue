<template>
  <ix-button ref="triggerRef" v-bind="triggerEvents">Hover</ix-button>
  <ix-portal target="ix-overlay">
    <div v-if="visibility" ref="overlayRef" v-bind="overlayEvents" class="overlay">Overlay Element</div>
  </ix-portal>
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
import type { OverlayPlacement } from '../src/types'

import { defineComponent, onMounted, ref, watch } from 'vue'
import { useOverlay } from '@idux/cdk/overlay'
import { IxPortal } from '@idux/cdk/portal'
import { IxButton } from '@idux/components/button'
import { IxRadio, IxRadioGroup } from '@idux/components/radio'

export default defineComponent({
  name: 'Placement',
  components: { IxButton, IxRadio, IxRadioGroup, IxPortal },
  setup() {
    const placement = ref<OverlayPlacement>('top')

    const { initialize, update, overlayRef, triggerRef, overlayEvents, triggerEvents, visibility } = useOverlay({
      trigger: 'hover',
      placement,
      visible: false,
    })

    onMounted(initialize)

    watch(placement, () => {
      update({ placement })
    })

    return { placement, overlayEvents, overlayRef, triggerRef, triggerEvents, visibility }
  },
})
</script>

<style lang="less" scoped>
.overlay {
  position: absolute;
  width: 200px;
  height: 300px;
  background: pink;
}
</style>
