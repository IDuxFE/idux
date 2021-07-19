<template>
  <div class="viewport">
    <div class="content">
      <div><span ref="triggerRef" @click="show">trigger</span></div>
      <div v-if="visibility" ref="popperRef" class="overlay">Overlay</div>
    </div>
  </div>
  <ix-radio-group v-model:value="scrollStrategy">
    <ix-radio value="none">none</ix-radio>
    <ix-radio value="close">close</ix-radio>
    <ix-radio value="reposition">reposition</ix-radio>
  </ix-radio-group>
</template>

<script lang="ts">
import type { PopperScrollStrategy } from '@idux/cdk/popper'

import { defineComponent, onMounted, ref, watch } from 'vue'
import { IxRadioGroup, IxRadio } from '@idux/components/radio'
import { usePopper } from '@idux/cdk/popper'

export default defineComponent({
  name: 'ScrollStrategy',
  components: { IxRadioGroup, IxRadio },
  setup() {
    const scrollStrategy = ref<PopperScrollStrategy>('none')
    const { visibility, initialize, popperRef, triggerRef, update, show } = usePopper({
      visible: true,
      scrollStrategy: scrollStrategy.value,
    })

    onMounted(initialize)

    watch(scrollStrategy, () => {
      show()
      update({ scrollStrategy: scrollStrategy.value })()
    })
    return { scrollStrategy, popperRef, triggerRef, show, visibility }
  },
})
</script>

<style lang="less" scoped>
.viewport {
  height: 300px;
  overflow: auto;
  .content {
    height: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .overlay {
      position: absolute;
      width: 300px;
      height: 100px;
      z-index: 10;
      background: #eb4688;
      color: #fff;
    }
  }
}
</style>
