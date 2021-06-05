import type { VNode, CSSProperties } from 'vue'
import type { SpaceSize } from '@idux/components/config'
import type { SpaceDirection, SpaceProps } from './types'

import { defineComponent, computed } from 'vue'
import { filterEmptyNode, getSlotNodes, Logger } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { spacePropsDef } from './types'

export default defineComponent({
  name: 'IxSpace',
  props: spacePropsDef,
  setup(props) {
    const config = useGlobalConfig('space')
    const classes = useClasses(props)
    const size$$ = computed(() => props.size ?? config.size)

    return { classes, size$$ }
  },
  render() {
    const { classes, size$$, $slots, direction, split } = this
    const children = filterEmptyNode(getSlotNodes($slots))
    const childrenLength = children.length
    if (childrenLength === 0) {
      return null
    }
    const items = useChildren(children, size$$, direction)
    const splitNode = $slots.split?.() ?? split
    return (
      <div class={classes}>
        {items.map((item, index) => (
          <>
            <div class={item.itemClass} style={item.style}>
              {item.node}
            </div>
            {splitNode && index < childrenLength - 1 ? (
              <span class={item.splitClass} style={item.style}>
                {splitNode}
              </span>
            ) : null}
          </>
        ))}
      </div>
    )
  },
})

const useClasses = (props: SpaceProps) => {
  return computed(() => {
    return {
      'ix-space': true,
      'ix-space-wrap': props.wrap,
      [`ix-space-${props.align}`]: true,
      [`ix-space-${props.direction}`]: true,
    }
  })
}

interface SpaceItem {
  node: VNode
  itemClass: string[]
  splitClass?: string
  style?: CSSProperties
}

const useChildren = (children: VNode[], size: SpaceSize | SpaceSize[], direction: SpaceDirection) => {
  const lastIndex = children.length - 1
  const sizes = Array.isArray(size) ? size : Array(lastIndex).fill(size)
  if (lastIndex !== sizes.length) {
    Logger.warn('The number of split elements is inconsistent with the length of the size array')
  }
  return children.map((child, index) => {
    const currNode: SpaceItem = { node: child, itemClass: ['ix-space-item'] }
    const currSize = sizes[index]

    if (!currSize) {
      return currNode
    }

    if (typeof currSize === 'number') {
      const marginDirection = direction === 'vertical' ? 'marginBottom' : 'marginRight'
      currNode.style = { [marginDirection]: `${currSize}px` }
    } else {
      currNode.itemClass.push(`ix-space-item-${currSize}`)
      currNode.splitClass = `ix-space-split-${currSize}`
    }

    return currNode
  })
}
