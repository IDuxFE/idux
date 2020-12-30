<template>
  <span class="ix-badge-wrapper">
    <slot />
    <sup class="ix-badge" :class="classes" :style="styles">
      <slot v-if="slotsExist.count" name="count" />
      <template v-else-if="countValue">{{ countValue }}</template>
    </sup>
  </span>
</template>
<script lang="ts">
import { computed, ComputedRef, defineComponent, onUpdated, reactive } from 'vue'
import { BadgeProps, SlotsExist } from './types'
import { useGlobalConfig } from '@idux/components/core/config'
import { isNumber } from '@idux/cdk/utils'

export default defineComponent({
  name: 'IxBadge',
  props: {
    count: { type: [Number, String], default: 0 },
    showZero: { type: Boolean, default: undefined },
    overflowCount: { type: [Number, String], default: undefined },
    dot: { type: Boolean, default: undefined },
    color: { type: String, default: undefined },
  },
  setup(props: BadgeProps, { slots }) {
    const badgeConfig = useGlobalConfig('badge')

    const showZero = computed(() => props.showZero ?? badgeConfig.showZero)
    const dot = computed(() => props.dot ?? badgeConfig.dot)
    const overflowCount = computed(() => props.overflowCount ?? badgeConfig.overflowCount)

    const slotsExist = reactive({
      default: !!slots.default,
      count: !!slots.count,
    })
    onUpdated(() => {
      slotsExist.default = !!slots.default
      slotsExist.count = !!slots.count
    })

    const countValue = useCountValue(props, slotsExist, showZero, dot, overflowCount)

    const classes = useClasses(props, slotsExist, showZero, dot)

    const styles = useStyles(props, slotsExist, dot)

    return {
      countValue,
      classes,
      styles,
      slotsExist,
    }
  },
})

const useCountValue = (
  props: BadgeProps,
  slots: SlotsExist,
  showZero: ComputedRef<boolean>,
  dot: ComputedRef<boolean>,
  overflowCount: ComputedRef<string | number>,
) => {
  return computed(() => {
    if (!slots.count && !dot.value) {
      if (!showZero.value && +props.count === 0) return false
      if (isNumber(props.count) && isNumber(overflowCount.value)) {
        return +props.count > +overflowCount.value ? `${overflowCount.value}+` : `${props.count}`
      }
      return props.count
    }
    return false
  })
}

const useStyles = (props: BadgeProps, slots: SlotsExist, dot: ComputedRef<boolean>) => {
  return computed(() => {
    const color = props.color ?? ''
    if (slots.count) {
      return { color }
    } else if (dot.value) {
      return { backgroundColor: color }
    } else {
      return { backgroundColor: color }
    }
  })
}

const useClasses = (
  props: BadgeProps,
  slots: SlotsExist,
  showZero: ComputedRef<boolean>,
  dot: ComputedRef<boolean>,
) => {
  return computed(() => {
    return {
      'ix-badge-empty': !slots.default,
      'ix-badge-slot-count': slots.count,
      'ix-badge-dot': !slots.count && dot.value,
      'ix-badge-count': !slots.count && !dot.value,
      'ix-badge-hide-zero': !slots.count && !dot.value && !showZero.value && +props.count === 0,
    }
  })
}
</script>
