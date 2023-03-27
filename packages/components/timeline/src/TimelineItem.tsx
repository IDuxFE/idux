/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

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
    const { props: parentProps, mergedPrefixCls } = inject(timelineToken)!
    const { vnode } = getCurrentInstance()!

    const itemPlacement = computed(() => {
      const { placement: parentPlacement } = parentProps
      const { placement } = props
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const index = (vnode as any).index

      let _placement
      if (parentPlacement === 'alternate') {
        _placement = placement ? placement : index % 2 ? 'start' : 'end'
      } else {
        _placement = parentPlacement
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

    /* eslint-disable indent */
    const dotInnerStyle = computed(() =>
      isPresetOrStatusColor.value
        ? {}
        : {
            'background-color': props.color,
          },
    )
    /* eslint-enable indent */

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-item`
      const placement = itemPlacement.value

      return normalizeClass({
        [`${prefixCls}`]: true,
        [`${prefixCls}-${placement}`]: true,
      })
    })

    const isCustomDot = computed(() => hasSlot(slots, 'dot') || !!props.dot)

    const dotClass = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-item-head`
      const { color } = props

      return normalizeClass({
        [`${prefixCls}-dot`]: true,
        [`${prefixCls}-dot-custom`]: isCustomDot.value,
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
          <div class={`${prefixCls}-head`}>
            <div class={`${prefixCls}-head-line`}></div>
            <div class={dotClass.value} style={dotStyle.value}>
              {dotNode}
              {!isCustomDot.value && <div class={`${prefixCls}-head-dot-inner`} style={dotInnerStyle.value}></div>}
            </div>
          </div>
          <div class={`${prefixCls}-content`}>
            {slots.default && <div class={`${prefixCls}-content-desc`}>{slots.default()}</div>}
            {labelNode && <div class={`${prefixCls}-content-label`}>{labelNode}</div>}
          </div>
        </li>
      )
    }
  },
})
