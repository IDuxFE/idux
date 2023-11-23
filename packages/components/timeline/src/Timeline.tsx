/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimelineProps } from './types'
import type { ComputedRef, Slots, VNode } from 'vue'

import { computed, defineComponent, normalizeClass, provide } from 'vue'

import { isBoolean } from 'lodash-es'

import { flattenNode, hasSlot } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { useThemeToken } from '@idux/components/theme'
import { convertStringVNode } from '@idux/components/utils'

import IxTimelineItem from './TimelineItem'
import { timelineItemKey, timelineToken } from './token'
import { timelineProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxTimeline',
  props: timelineProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('timeline')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-timeline`)

    const hasPendingNode = computed(() => props.pending !== false || hasSlot(slots, 'pending'))

    const classes = computed(() => {
      const { placement, reverse, both } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [`${prefixCls}`]: true,
        [`${prefixCls}-${placement}`]: true,
        [`${prefixCls}-reverse`]: reverse,
        [`${prefixCls}-not-both`]: !both,
        [`${prefixCls}-pending`]: hasPendingNode.value,
      })
    })

    provide(timelineToken, { props, mergedPrefixCls })

    return () => {
      const itemNodes = useItems(slots, props, hasPendingNode, mergedPrefixCls)

      return <ul class={classes.value}>{itemNodes.value}</ul>
    }
  },
})

function convertItemNodes(itemNodes: VNode[]): VNode[] {
  return flattenNode(itemNodes, { key: timelineItemKey }).map((node, index) => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    ;(node as any).index = index
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
    let pendingNode: null | VNode = null

    if (hasPendingNode.value) {
      const pendingDotNode = slots?.pendingDot?.() || pendingDot || <IxIcon name="loading" />

      pendingNode = (
        <IxTimelineItem class={`${mergedPrefixCls.value}-item-pending`} v-slots={{ dot: () => pendingDotNode }}>
          {convertStringVNode(slots.pending, isBoolean(pending) ? '' : pending)}
        </IxTimelineItem>
      )
    }

    const timelineItemNodes = reverse ? [pendingNode, ...defaultSlots.reverse()] : [...defaultSlots, pendingNode]

    return convertItemNodes(timelineItemNodes.filter(Boolean) as VNode[])
  })
}
