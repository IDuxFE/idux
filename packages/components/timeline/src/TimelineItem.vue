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
import { defineComponent, computed } from 'vue'
import type { Slots } from 'vue'
import { hasSlot, PropTypes } from '@idux/cdk/utils'
import { isPresetColor } from '@idux/components/core/utils'
import { TimelineItemProps } from './types'

export default defineComponent({
  name: 'IxTimelineItem',
  props: {
    color: PropTypes.string.def('blue'),
    dot: PropTypes.string,
    position: PropTypes.oneOf(['left', 'right'] as const),
  },
  setup(props, { slots }) {
    const dotStyle = useStyle(props)
    const dotClass = useClasses(props, slots)

    return {
      dotStyle,
      dotClass,
    }
  },
})

const useClasses = (props: TimelineItemProps, slots: Slots) => {
  const hasCustomDot = computed(() => hasSlot(slots, 'dot') || !!props.dot)

  return computed(() => ({
    'ix-timeline-item-dot': true,
    'ix-timeline-item-dot-custom': hasCustomDot.value,
    [`ix-timeline-item-dot-${props.color}`]: isPresetColor(props.color as string),
  }))
}

const useStyle = (props: TimelineItemProps) => {
  return computed(() => {
    if (isPresetColor(props.color as string)) {
      return {}
    }

    return {
      color: props.color,
      'border-color': props.color,
    }
  })
}
</script>
