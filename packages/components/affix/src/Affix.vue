<template>
  <div ref="affixRef" :style="wrapperStyle" class="ix-affix">
    <div ref="contentRef" class="ix-affix-content" :style="affixStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, watch, ref, onMounted, nextTick, onUnmounted } from 'vue'
import { AffixProps, AffixStyle } from './types'
import { PropTypes, throttleRAF, withUndefined } from '@idux/cdk/utils'
import {
  getTargetRect,
  getTargetSize,
  calcPosition,
  formatOffset,
  isSticky as judgeSticky,
  observeTarget,
  removeObserveTarget,
} from './utils'
import { getTarget } from '@idux/components/core/utils'

export default defineComponent({
  name: 'IxAffix',
  props: {
    offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]).def(0),
    target: withUndefined(PropTypes.oneOfType([PropTypes.string, HTMLElement])),
  },
  emits: ['status-changed'],
  setup(props: AffixProps, { emit }) {
    const affixStyle = ref<AffixStyle>({})
    const target = ref<Window | HTMLElement | null>(null)
    const contentRef = ref<null | HTMLElement>(null)
    const affixRef = ref<null | HTMLElement>(null)
    const wrapperStyle = ref({})
    const offsetOpt = computed(() => formatOffset(props.offset))
    const isSticky = ref(false)

    onMounted(() => {
      nextTick(() => {
        initWrapper()
        initContainer()
        measure()
      })
    })

    onUnmounted(() => {
      removeObserveTarget(target.value!, throttleMeasure)
      throttleMeasure.cancel?.()
    })

    watch(() => props.offset, measure)
    watch(
      () => props.target,
      () => {
        removeObserveTarget(target.value!, throttleMeasure)
        initContainer()
        measure()
      },
    )

    function initWrapper() {
      if (!contentRef.value) {
        return
      }
      const affixSize = getTargetSize(contentRef.value)
      wrapperStyle.value = {
        position: 'relative',
        width: `${affixSize.width}px`,
        height: `${affixSize.height}px`,
      }
    }

    function initContainer() {
      target.value = getTarget(props.target)
      observeTarget(target.value, throttleMeasure)
    }

    const throttleMeasure = throttleRAF(measure)

    function measure() {
      if (!affixRef.value || !target.value) {
        return
      }
      const affixRect = getTargetRect(affixRef.value, target.value)
      const isStickyNow = judgeSticky(affixRect, offsetOpt.value)
      affixStyle.value = calcPosition(affixRect, offsetOpt.value, target.value)

      if (isStickyNow !== isSticky.value) {
        emit('status-changed', isStickyNow)
        isSticky.value = isStickyNow
      }
    }

    return {
      affixRef,
      contentRef,
      wrapperStyle,
      affixStyle,
    }
  },
})
</script>
