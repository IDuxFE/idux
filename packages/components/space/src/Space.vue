<template>
  <div class="ix-space" :class="className">
    <template v-for="(child, index) in spaceList" :key="child.id">
      <div class="ix-space-item" :class="child.className" :style="child.style">
        <component :is="child.node" />
      </div>
      <slot v-if="index < spaceList.length - 1" name="split">
        <span v-if="split" class="ix-space-split">
          {{ split }}
        </span>
      </slot>
    </template>
  </div>
</template>

<script lang="ts">
import type { ComputedRef, SetupContext, VNode } from 'vue'
import type { SpaceProps } from './types'

import { computed, defineComponent } from 'vue'
import { getSlotNodes, hasSlot, PropTypes } from '@idux/cdk/utils'
import { Logger } from '@idux/components/core/logger'
import { useGlobalConfig, SpaceConfig } from '@idux/components/core/config'

interface SpaceItem {
  style?: Partial<CSSStyleDeclaration>
  className?: string
  id: number
  node: VNode
}

const spaceSizePropType = PropTypes.oneOf(['small', 'medium', 'large'] as const)
export default defineComponent({
  name: 'IxSpace',
  props: {
    align: PropTypes.oneOf(['start', 'center', 'end', 'baseline'] as const).def('baseline'),
    direction: PropTypes.oneOf(['vertical', 'horizontal'] as const).def('horizontal'),
    size: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([spaceSizePropType, PropTypes.number])),
      PropTypes.oneOfType([spaceSizePropType, PropTypes.number]),
    ]),
    split: PropTypes.string,
    wrap: PropTypes.bool,
  },
  setup(props: SpaceProps, { slots }: SetupContext) {
    const spaceConfig = useGlobalConfig('space')
    const children = getSlotNodes(slots)
    const withSlotSplit = computed(() => hasSlot(slots, 'split'))
    const spaceList = useSpaceList(props, spaceConfig, children, withSlotSplit)

    const className = useClassName(props)

    return { spaceList, className }
  },
})

function useSpaceList(
  props: SpaceProps,
  spaceConfig: SpaceConfig,
  children: VNode[],
  withSlotSplit: ComputedRef<boolean>,
) {
  return computed(() => {
    const size = props.size ?? spaceConfig.size
    const split = !!props.split || withSlotSplit.value

    let spaceList: SpaceItem[]
    if (Array.isArray(size)) {
      if (children.length - 1 !== size.length) {
        Logger.warn('The number of split elements is inconsistent with the length of the size array')
      }
      spaceList = children.map((child, index) => {
        const current: SpaceItem = { node: child, id: index }
        if (split) {
          return current
        } else if (typeof size[index] === 'number') {
          current.style = { marginRight: `${size[index]}px` }
        } else {
          current.className = `ix-space-item-${size[index]}`
        }
        return current
      })
    } else {
      spaceList = children.map((child, index) => {
        const current: SpaceItem = { node: child, id: index }
        if (split) {
          return current
        } else if (typeof size === 'number') {
          current.style = { marginRight: `${size}px` }
        } else {
          current.className = `ix-space-item-${size}`
        }
        return current
      })
    }
    return spaceList
  })
}

function useClassName(props: SpaceProps) {
  return computed(() => {
    const align = props.align
    const direction = props.direction
    const wrap = props.wrap

    return [`ix-space-${align}`, `ix-space-${direction}`, { 'ix-space-wrap': wrap }]
  })
}
</script>
