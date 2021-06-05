<template>
  <li class="ix-timeline-item">
    <div class="ix-timeline-item-line"></div>
    <div :class="dotClass" :style="dotStyle">
      <slot name="dot">{{ dot }}</slot>
    </div>
    <div class="ix-timeline-item-content"><slot></slot></div>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue'
import type { Slots } from 'vue'
import { hasSlot, PropTypes } from '@idux/cdk/utils'
import { isPresetColor, isStatusColor } from '@idux/components/utils'
import { TimelineItemProps } from './types'

export default defineComponent({
  name: 'IxTimelineItem',
  props: {
    color: PropTypes.string.def('primary'),
    dot: PropTypes.string,
    position: PropTypes.oneOf(['left', 'right'] as const),
  },
  setup(props, { slots }) {
    const isPresetOrStatus = computed(() => isPresetColor(props.color) || isStatusColor(props.color))

    const dotStyle = useStyle(props, isPresetOrStatus)
    const dotClass = useClasses(props, slots, isPresetOrStatus)

    return {
      dotStyle,
      dotClass,
    }
  },
})

const useClasses = (props: TimelineItemProps, slots: Slots, isPresetOrStatus: ComputedRef<boolean>) => {
  return computed(() => {
    const hasCustomDot = hasSlot(slots, 'dot') || !!props.dot
    return {
      'ix-timeline-item-dot': true,
      'ix-timeline-item-dot-custom': hasCustomDot,
      [`ix-timeline-item-dot-${props.color}`]: isPresetOrStatus.value,
    }
  })
}

const useStyle = (props: TimelineItemProps, isPresetOrStatus: ComputedRef<boolean>) => {
  return computed(() => {
    if (isPresetOrStatus.value) {
      return {}
    }
    return {
      color: props.color,
      'border-color': props.color,
    }
  })
}
</script>
