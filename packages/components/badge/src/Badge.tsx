/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BadgeProps } from './types'
import type { ComputedRef } from 'vue'

import { computed, defineComponent } from 'vue'

import { convertNumber, hasSlot, isNumeric } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import { backTopProps } from './types'

export default defineComponent({
  name: 'IxBadge',
  props: backTopProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-badge`)
    const badgeConfig = useGlobalConfig('badge')

    const showZero = computed(() => props.showZero ?? badgeConfig.showZero)
    const dot = computed(() => props.dot ?? badgeConfig.dot)
    const overflowCount = computed(() => props.overflowCount ?? badgeConfig.overflowCount)

    const hasDefaultSlot = computed(() => hasSlot(slots))
    const hasCountSlot = computed(() => hasSlot(slots, 'count'))

    const classes = useClasses(props, hasDefaultSlot, hasCountSlot, showZero, dot, mergedPrefixCls)
    const styles = useStyles(props, hasCountSlot, dot)
    const countValue = useCountValue(props, hasCountSlot, showZero, dot, overflowCount)

    return () => {
      const prefixCls = mergedPrefixCls.value
      return (
        <span class={`${prefixCls}-wrapper`}>
          {slots.default?.()}
          <sup class={classes.value} style={styles.value}>
            {slots.count?.() ?? countValue.value}
          </sup>
        </span>
      )
    }
  },
})

const useCountValue = (
  props: BadgeProps,
  hasCountSlot: ComputedRef<boolean>,
  showZero: ComputedRef<boolean>,
  dot: ComputedRef<boolean>,
  overflowCount: ComputedRef<string | number>,
) => {
  return computed(() => {
    if (!hasCountSlot.value && !dot.value) {
      if (!showZero.value && +props.count === 0) {
        return false
      }
      if (isNumeric(props.count)) {
        return props.count > convertNumber(overflowCount.value, Number.MAX_VALUE)
          ? `${overflowCount.value}+`
          : `${props.count}`
      }
      return props.count
    }
    return false
  })
}

const useStyles = (props: BadgeProps, hasCountSlot: ComputedRef<boolean>, dot: ComputedRef<boolean>) => {
  return computed(() => {
    const color = props.color ?? ''
    if (hasCountSlot.value) {
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
  hasDefaultSlot: ComputedRef<boolean>,
  hasCountSlot: ComputedRef<boolean>,
  showZero: ComputedRef<boolean>,
  dot: ComputedRef<boolean>,
  mergedPrefixCls: ComputedRef<string>,
) => {
  return computed(() => {
    const prefixCls = mergedPrefixCls.value
    return {
      [prefixCls]: true,
      [`${prefixCls}-empty`]: !hasDefaultSlot.value,
      [`${prefixCls}-slot-count`]: hasCountSlot.value,
      [`${prefixCls}-dot`]: !hasCountSlot.value && dot.value,
      [`${prefixCls}-count`]: !hasCountSlot.value && !dot.value,
      [`${prefixCls}-hide-zero`]: !hasCountSlot.value && !dot.value && !showZero.value && +props.count === 0,
    }
  })
}
