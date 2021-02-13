<template>
  <li class="ix-timeline-item">
    <div :class="['ix-timeline-item__dot', { 'ix-timeline-item__dot--custom': hasCustomDot }]" :style="dotStyle">
      <slot name="dot">{{ dot }}</slot>
    </div>
    <div class="ix-timeline-item__line"></div>
    <div class="ix-timeline-item__content"><slot></slot></div>
  </li>
</template>

<script lang="ts">
import type { TimelineItemProps } from './types'

import { defineComponent, computed } from 'vue'
import { hasSlot, PropTypes } from '@idux/cdk/utils'

export default defineComponent({
  name: 'IxTimelineItem',
  props: {
    color: PropTypes.string.def('#1890ff'),
    dot: PropTypes.string,
    position: PropTypes.oneOf(['left', 'right'] as const),
  },
  setup(props: TimelineItemProps, { slots }) {
    const hasCustomDot = computed(() => hasSlot(slots, 'dot') || !!props.dot)
    const dotStyle = computed(() => ({
      color: props.color,
      'border-color': props.color,
    }))

    return {
      hasCustomDot,
      dotStyle,
    }
  },
})
</script>
