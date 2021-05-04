<script lang="ts">
import type { VNode } from 'vue'
import type { TimelinePosition, TimelineItemPosition, TimelineProps } from './types'

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
    position: PropTypes.oneOf(['left', 'alternate', 'right'] as const).def('right'),
  },
  render() {
    const pendingSlots = this.$slots?.pending?.()
    const pendingDotSlots = this.$slots?.pendingDot?.()
    const defaultSlots = this.$slots?.default?.() || []

    const pendingNode = pendingSlots || this.$props.pending
    const pendingDotNode = pendingDotSlots || this.$props.pendingDot || h(IxIcon, { name: 'loading' })

    let penddingItem: null | VNode = null

    if (pendingNode) {
      penddingItem = h(
        IxTimelineItem,
        { class: `${itemPrefixCls}-pending-dot` },
        { default: () => pendingNode, dot: () => pendingDotNode },
      )
    }

    const timelineItems = this.$props.reverse
      ? [penddingItem, ...defaultSlots.reverse()]
      : [...defaultSlots, penddingItem]
    const nonNullItems = timelineItems.filter(item => !!item) as VNode[]
    const itemsLength = nonNullItems.length
    const items: VNode[] = []
    const itemPositionArr: TimelineItemPosition[] = []

    nonNullItems.forEach((item, index) => {
      const position = getItemPosition(item, index, this.$props.position)

      itemPositionArr.push(position)
      items.push(
        cloneVNode(item, {
          class: useItemClasses({
            hasPendingNode: !!pendingNode,
            position,
            index,
            itemsLength,
            props: this.$props,
          }),
        }),
      )
    })

    return h(
      'ul',
      {
        class: useClasses(itemPositionArr, this.$props),
      },
      items,
    )
  },
})

const getItemPosition = (node: VNode, index: number, position: TimelinePosition): TimelineItemPosition => {
  const itemPosition = node.props?.position
  if (itemPosition) {
    return itemPosition
  }

  if (position === 'alternate') {
    return index % 2 ? 'left' : 'right'
  }

  return position
}

const getRealPosition = (itemPositionArr: TimelineItemPosition[]): TimelinePosition => {
  return itemPositionArr.reduce((result: TimelinePosition, nextPosition, index) => {
    if (!index) {
      result = nextPosition
    } else if (result !== nextPosition) {
      result = 'alternate'
    }

    return result
  }, 'right')
}

const useClasses = (itemPositionArr: TimelineItemPosition[], props: TimelineProps): string => {
  const realPosition = getRealPosition(itemPositionArr)
  const positionCls = `${timelinePrefixCls}-${realPosition}`

  let cls = `${timelinePrefixCls} ${positionCls}`

  if (props.reverse) {
    cls += ` ${timelinePrefixCls}-reverse`
  }

  return cls
}

const useItemClasses = ({
  hasPendingNode,
  position,
  index,
  itemsLength,
  props,
}: {
  hasPendingNode: boolean
  position: TimelineItemPosition
  index: number
  itemsLength: number
  props: TimelineProps
}): string => {
  let cls = `${itemPrefixCls}-${position}`

  if (hasPendingNode) {
    const isReversePending = props.reverse && index === 0
    const isPending = !props.reverse && index === itemsLength - 2

    if (isReversePending || isPending) {
      cls += ` ${itemPrefixCls}-pending`
    }
  }

  return cls
}
</script>
