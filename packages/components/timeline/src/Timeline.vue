<script lang="ts">
import { VNode } from 'vue'
import type { TimelineMode } from './types'

import { defineComponent, h, cloneVNode } from 'vue'
import { PropTypes } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'
import IxTimelineItem from './TimelineItem.vue'

const itemPrefixCls = 'ix-timeline-item'

export default defineComponent({
  name: 'IxTimeline',
  props: {
    pending: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).def(false),
    pendingDot: PropTypes.string,
    reverse: PropTypes.bool.def(false),
    mode: PropTypes.oneOf(['left', 'alternate', 'right'] as const).def('right'),
  },
  render() {
    const pendingSlots = this.$slots?.pending?.()
    const pendingDotSlots = this.$slots?.pendingDot?.()
    const defaultSlots = this.$slots?.default?.() || []

    const pendingNode = pendingSlots || this.$props.pending
    const pendingDotNode = pendingDotSlots || this.$props.pendingDot || h(IxIcon, { name: 'loading' })

    const penddingItem = pendingNode
      ? h(IxTimelineItem, {}, { default: () => pendingNode, dot: () => pendingDotNode })
      : null

    const itemPositionArr: string[] = []
    const timelineItems = this.$props.reverse
      ? [penddingItem, ...defaultSlots.reverse()]
      : [...defaultSlots, penddingItem]
    const nonNullItems = timelineItems.filter(item => !!item)
    const itemsLength = nonNullItems.length
    const items = nonNullItems.map((item, index) => {
      let pendingCls = ''
      const position = getItemPosition(item as VNode, index, this.$props.mode)
      const lastCls = index === itemsLength - 1 ? `${itemPrefixCls}--last` : ''

      itemPositionArr.push(position)

      if (pendingNode) {
        const isReversePending = this.$props.reverse && index === 0
        const isPending = !this.$props.reverse && index === itemsLength - 2

        if (isReversePending || isPending) {
          pendingCls = `${itemPrefixCls}--pending`
        }
      }

      return cloneVNode(item as VNode, {
        class: `${itemPrefixCls}--${position} ${pendingCls} ${lastCls}`,
      })
    })

    const realMode = getRealMode(itemPositionArr)

    return h(
      'ul',
      {
        class: `ix-timeline ix-timeline--${realMode} ${this.$props.reverse ? 'ix-timeline--reverse' : ''}`,
      },
      items,
    )
  },
})

const getItemPosition = (vnode: VNode, index: number, mode: TimelineMode): string => {
  if (!vnode) {
    return ''
  }

  const propsPosition = vnode.props?.position
  let position = ''

  if (propsPosition) {
    position = propsPosition
    return position
  }

  switch (mode) {
    case 'left':
      position = 'left'
      break

    case 'right':
      position = 'right'
      break

    case 'alternate':
      position = `${index % 2 ? 'left' : 'right'}`
  }

  return position
}

const getRealMode = (itemPositionArr: string[]) => {
  return itemPositionArr.reduce((result, position) => {
    if (!result) {
      result = position
    } else if (result !== position) {
      result = 'alternate'
    }

    return result
  }, '')
}
</script>
