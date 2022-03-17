/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CSSProperties } from 'vue'

import { computed, defineComponent, getCurrentInstance, inject, normalizeClass } from 'vue'

import { hasSlot } from '@idux/cdk/utils'
import { convertStringVNode, isPresetColor, isStatusColor } from '@idux/components/utils'

import { timelineItemKey, timelineToken } from './token'
import { timelineItemProps } from './types'

export default defineComponent({
  name: 'IxTimelineItem',
  props: timelineItemProps,
  [timelineItemKey]: true,
  setup(props, { slots }) {
    const { vnode } = getCurrentInstance()!

    const { props: parentProps, itemIndexArray, hasPendingNode, mergedPrefixCls } = inject(timelineToken)!
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const itemIndex = computed(() => itemIndexArray.value.indexOf((vnode as any).index))

    const itemPlacement = computed(() => {
      const { placement: parentpPlacement } = parentProps
      const { placement } = props

      let _placement
      if (parentpPlacement === 'alternate') {
        _placement = placement ? placement : itemIndex.value % 2 ? 'start' : 'end'
      } else {
        _placement = parentpPlacement
      }

      return _placement
    })

    const isPresetOrStatusColor = computed(() => isPresetColor(props.color) || isStatusColor(props.color))

    const dotStyle = computed(() => {
      const { color } = props
      if (isPresetOrStatusColor.value) {
        return {}
      }
      return {
        color,
        'border-color': color,
      }
    })

    const classes = computed(() => {
      const { reverse } = parentProps

      const prefixCls = `${mergedPrefixCls.value}-item`
      const placement = itemPlacement.value
      const allItemLength = itemIndexArray.value.length
      const index = itemIndex.value

      const isReversePending = hasPendingNode.value && reverse && index === 0
      const isPending = hasPendingNode.value && !reverse && index === allItemLength - 2

      return normalizeClass({
        [`${prefixCls}`]: true,
        [`${prefixCls}-${placement}`]: true,
        [`${prefixCls}-pending`]: isReversePending || isPending,
      })
    })

    const dotClass = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-item`
      const { dot, color } = props
      return normalizeClass({
        [`${prefixCls}-dot`]: true,
        [`${prefixCls}-dot-custom`]: hasSlot(slots, 'dot') || !!dot,
        [`${prefixCls}-dot-${color}`]: isPresetOrStatusColor.value,
      })
    })

    return () => {
      const { label, dot } = props
      const prefixCls = `${mergedPrefixCls.value}-item`

      const dotNode = convertStringVNode(slots.dot, dot)
      const labelNode = convertStringVNode(slots.label, label)
      return (
        <li class={classes.value}>
          <div class={`${prefixCls}-line`}></div>
          <div class={dotClass.value} style={dotStyle.value as CSSProperties}>
            {dotNode}
          </div>
          <div class={`${prefixCls}-content`}>
            {labelNode && <div class={`${prefixCls}-label`}>{labelNode}</div>}
            {slots.default && <div class={`${prefixCls}-desc`}>{slots.default()}</div>}
          </div>
        </li>
      )
    }
  },
})
