<template>
  <li :class="`${prefixCls}-timeline-item`">
    <div :class="`${prefixCls}-timeline-item-line`"></div>
    <div :class="dotClass" :style="dotStyle">
      <slot name="dot">{{ dot }}</slot>
    </div>
    <div :class="`${prefixCls}-timeline-item-content`"><slot></slot></div>
  </li>
</template>

<script lang="ts">
import type { Slots } from 'vue'
import type { TimelineItemProps } from './types'

import { defineComponent, computed, ComputedRef } from 'vue'

import { hasSlot } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { isPresetColor, isStatusColor } from '@idux/components/utils'
import { timelineItemProps } from './types'

export default defineComponent({
  name: 'IxTimelineItem',
  props: timelineItemProps,
  setup(props, { slots }) {
    const { prefixCls } = useGlobalConfig('common')
    const isPresetOrStatus = computed(() => isPresetColor(props.color) || isStatusColor(props.color))

    const dotStyle = useStyle(props, isPresetOrStatus)
    const dotClass = useClasses(props, slots, isPresetOrStatus)

    return {
      prefixCls,
      dotStyle,
      dotClass,
    }
  },
})

const useClasses = (props: TimelineItemProps, slots: Slots, isPresetOrStatus: ComputedRef<boolean>) => {
  const { prefixCls } = useGlobalConfig('common')
  return computed(() => {
    const hasCustomDot = hasSlot(slots, 'dot') || !!props.dot
    return {
      [`${prefixCls}-timeline-item-dot`]: true,
      [`${prefixCls}-timeline-item-dot-custom`]: hasCustomDot,
      [`${prefixCls}-timeline-item-dot-${props.color}`]: isPresetOrStatus.value,
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
