/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimelineProps } from './types'
import type { Slots, VNode } from 'vue'

import { ComputedRef, computed } from '@vue/reactivity'
import { defineComponent, normalizeClass, provide } from 'vue'

import { isBoolean } from 'lodash-es'

import { flattenNode, hasSlot } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { convertStringVNode } from '@idux/components/utils'

import IxTimelineItem from './TimelineItem'
import { timelineItemKey, timelineToken } from './token'
import { timelineProps } from './types'

export default defineComponent({
  name: 'IxTimeline',
  props: timelineProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-timeline`)

    const hasPendingNode = computed(() => props.pending !== false || hasSlot(slots, 'pending'))
    const itemNodes = useItems(slots, props, hasPendingNode, mergedPrefixCls)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const itemIndexArray = computed(() => itemNodes.value.map(node => (node as any).index))

    const classes = computed(() => {
      const { placement, reverse, both } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}`]: true,
        [`${prefixCls}-${placement}`]: true,
        [`${prefixCls}-reverse`]: reverse,
        [`${prefixCls}-not-both`]: !both,
      })
    })

    provide(timelineToken, { props, itemIndexArray, hasPendingNode, mergedPrefixCls })

    return () => {
      return <ul class={classes.value}>{itemNodes.value}</ul>
    }
  },
})

function convertItemNodes(itemsNodes: VNode[] | undefined): VNode[] {
  return flattenNode(itemsNodes, { key: timelineItemKey }).map((node, index) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(node as any).index = index + 1
    return node
  })
}

function useItems(
  slots: Slots,
  props: TimelineProps,
  hasPendingNode: ComputedRef<boolean>,
  mergedPrefixCls: ComputedRef<string>,
) {
  return computed(() => {
    const { pending, pendingDot, reverse } = props

    const defaultSlots = slots?.default?.() || []
    const pendingDotNode = slots?.pendingDot?.() || pendingDot || <IxIcon name="loading" />
    let penddingItem: null | VNode = null

    if (hasPendingNode.value) {
      penddingItem = (
        <IxTimelineItem class={`${mergedPrefixCls.value}-item-pending-dot`} v-slots={{ dot: () => pendingDotNode }}>
          {convertStringVNode(slots.pending, isBoolean(pending) ? '' : pending)}
        </IxTimelineItem>
      )
    }

    const timelineItemNodes = reverse ? [penddingItem, ...defaultSlots.reverse()] : [...defaultSlots, penddingItem]

    return convertItemNodes(timelineItemNodes.filter(Boolean) as VNode[])
  })
}
