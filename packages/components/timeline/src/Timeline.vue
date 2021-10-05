<script lang="ts">
import type { VNode } from 'vue'
import type { TimelinePosition, TimelineItemPosition, TimelineProps } from './types'

import { defineComponent, h, cloneVNode } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import IxTimelineItem from './TimelineItem.vue'
import { timelineProps } from './types'

export default defineComponent({
  name: 'IxTimeline',
  props: timelineProps,
  render() {
    const { prefixCls } = useGlobalConfig('common')
    const pendingSlots = this.$slots?.pending?.()
    const pendingDotSlots = this.$slots?.pendingDot?.()
    const defaultSlots = this.$slots?.default?.() || []

    const pendingNode = pendingSlots || this.$props.pending
    const pendingDotNode = pendingDotSlots || this.$props.pendingDot || h(IxIcon, { name: 'loading' })

    let penddingItem: null | VNode = null

    if (pendingNode) {
      penddingItem = h(
        IxTimelineItem,
        { class: `${prefixCls}-timeline-item-pending-dot` },
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
  const { prefixCls } = useGlobalConfig('common')
  const realPosition = getRealPosition(itemPositionArr)
  const positionCls = `${prefixCls}-timeline-${realPosition}`

  let cls = `${prefixCls}-timeline ${positionCls}`

  if (props.reverse) {
    cls += ` ${prefixCls}-timeline-reverse`
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
  const { prefixCls } = useGlobalConfig('common')
  let cls = `${prefixCls}-timeline-item-${position}`

  if (hasPendingNode) {
    const isReversePending = props.reverse && index === 0
    const isPending = !props.reverse && index === itemsLength - 2

    if (isReversePending || isPending) {
      cls += ` ${prefixCls}-timeline-item-pending`
    }
  }

  return cls
}
</script>
