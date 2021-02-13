<script lang="ts">
import { VNode } from 'vue'
import type { TimelineMode, TimelineItemMode } from './types'

import { defineComponent, h, cloneVNode } from 'vue'
import { PropTypes } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'
import IxTimelineItem from './TimelineItem.vue'

const timelinePrefixCls = 'ix-timeline'
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

    const itemPositionArr: TimelineItemMode[] = []
    const timelineItems = this.$props.reverse
      ? [penddingItem, ...defaultSlots.reverse()]
      : [...defaultSlots, penddingItem]
    const nonNullItems = timelineItems.filter(item => !!item) as VNode[]
    const itemsLength = nonNullItems.length

    const items = nonNullItems.map((item, index) => {
      let pendingCls = ''
      const position = getItemPosition(item, index, this.$props.mode)
      const positionCls = `${itemPrefixCls}--${position}`
      const lastCls = index === itemsLength - 1 ? `${itemPrefixCls}--last` : ''

      itemPositionArr.push(position)

      if (pendingNode) {
        const isReversePending = this.$props.reverse && index === 0
        const isPending = !this.$props.reverse && index === itemsLength - 2

        if (isReversePending || isPending) {
          pendingCls = `${itemPrefixCls}--pending`
        }
      }

      return cloneVNode(item, {
        class: `${positionCls} ${pendingCls} ${lastCls}`,
      })
    })

    const realMode = getRealMode(itemPositionArr)

    return h(
      'ul',
      {
        class: `${timelinePrefixCls} ${timelinePrefixCls}--${realMode} ${
          this.$props.reverse ? `${timelinePrefixCls}--reverse` : ''
        }`,
      },
      items,
    )
  },
})

const getItemPosition = (vnode: VNode, index: number, mode: TimelineMode): TimelineItemMode => {
  const propsPosition = vnode.props?.position
  let position: TimelineItemMode

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
      position = index % 2 ? 'left' : 'right'
  }

  return position
}

const getRealMode = (itemPositionArr: TimelineItemMode[]): TimelineMode => {
  return itemPositionArr.reduce((result: TimelineMode, position, index) => {
    if (!index) {
      result = position
    }
    if (result !== position) {
      result = 'alternate'
    }

    return result
  }, 'right')
}
</script>
