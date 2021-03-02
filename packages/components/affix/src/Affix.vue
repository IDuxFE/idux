<template>
  <div ref="affixRef" :style="wrapperStyle" class="ix-affix">
    <div ref="contentRef" class="ix-affix-content" :style="affixStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import type { AffixProps } from './types'
import type { AffixStyle } from './utils'

import { defineComponent, computed, watch, ref, onMounted, nextTick, onUnmounted } from 'vue'
import { PropTypes, throttleRAF, withUndefined } from '@idux/cdk/utils'
import { getTarget } from '@idux/components/core/utils'
import {
  getTargetRect,
  getTargetSize,
  calcPosition,
  normalizeOffset,
  isSticky,
  observeTarget,
  removeObserveTarget,
} from './utils'

interface AffixWrapperStyle {
  position: string
  width: string
  height: string
}

export default defineComponent({
  name: 'IxAffix',
  props: {
    offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]).def(0),
    target: withUndefined(PropTypes.oneOfType([PropTypes.string, HTMLElement])),
  },
  emits: ['change'],
  setup(props: AffixProps, { emit }) {
    const affixStyle = ref<AffixStyle>({} as AffixStyle)
    const wrapperStyle = ref({} as AffixWrapperStyle)

    const targetRef = ref<Window | HTMLElement | null>(null)
    const affixRef = ref<HTMLElement | null>(null)
    const contentRef = ref<HTMLElement | null>(null)

    const offset = computed(() => normalizeOffset(props.offset))

    const isStickyRef = ref(false)
    watch(isStickyRef, value => emit('change', value))

    const throttleMeasure = throttleRAF(measure)

    function measure() {
      if (!affixRef.value || !targetRef.value) {
        return
      }
      const affixRect = getTargetRect(affixRef.value, targetRef.value)
      isStickyRef.value = isSticky(affixRect, offset.value)
      affixStyle.value = calcPosition(affixRect, offset.value, targetRef.value)
    }

    onMounted(() => {
      nextTick(() => {
        initWrapper()
        initContainer()
        measure()
      })
    })

    onUnmounted(() => {
      removeObserveTarget(targetRef.value!, throttleMeasure)
      throttleMeasure.cancel?.()
    })

    watch(() => props.offset, measure)
    watch(
      () => props.target,
      () => {
        removeObserveTarget(targetRef.value!, throttleMeasure)
        initContainer()
        measure()
      },
    )

    function initWrapper() {
      if (!contentRef.value) {
        return
      }
      const { width, height } = getTargetSize(contentRef.value)
      wrapperStyle.value = {
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
      }
    }

    function initContainer() {
      targetRef.value = getTarget(props.target)
      observeTarget(targetRef.value, throttleMeasure)
    }

    return {
      affixRef,
      contentRef,
      affixStyle,
      wrapperStyle,
    }
  },
})
</script>
