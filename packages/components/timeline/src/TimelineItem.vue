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
import type { Slots } from 'vue'
import type { TimelineItemProps } from './types'

import { defineComponent, computed, ComputedRef } from 'vue'

import { hasSlot } from '@idux/cdk/utils'
import { isPresetColor, isStatusColor } from '@idux/components/utils'
import { timelineItemProps } from './types'

export default defineComponent({
  name: 'IxTimelineItem',
  props: timelineItemProps,
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
