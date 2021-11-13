/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SpaceProps } from './types'
import type { ComputedRef, Slots, VNode } from 'vue'

import { computed, defineComponent, normalizeClass } from 'vue'

import { supportsFlexGap } from '@idux/cdk/platform'
import { convertCssPixel, flattenNode } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import { spaceProps } from './types'

const spaceSize = {
  sm: 8,
  md: 16,
  lg: 24,
}

const flexGapSupported = supportsFlexGap()

export default defineComponent({
  name: 'IxSpace',
  props: spaceProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-space`)
    const config = useGlobalConfig('space')

    const wrap = computed(() => props.wrap ?? config.wrap)
    const mergedAlign = computed(() => {
      const { align, direction } = props
      if (align === undefined && direction === 'horizontal') {
        return 'center'
      }
      return align
    })

    const mergedSizes = computed(() => {
      const { size = config.size } = props
      const [horizontalSize, verticalSize] = Array.isArray(size) ? size : [size, size]
      return [
        spaceSize[horizontalSize as 'sm' | 'md' | 'lg'] ?? horizontalSize,
        spaceSize[verticalSize as 'sm' | 'md' | 'lg'] ?? verticalSize,
      ]
    })

    const classes = computed(() => {
      const { direction } = props
      const align = mergedAlign.value
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-align-${align}`]: align,
        [`${prefixCls}-${direction}`]: true,
        [`${prefixCls}-wrap`]: wrap.value,
      })
    })

    const style = computed(() => {
      const [horizontalSize, verticalSize] = mergedSizes.value
      if (flexGapSupported) {
        return `gap: ${convertCssPixel(verticalSize)} ${convertCssPixel(horizontalSize)}`
      } else {
        return wrap.value ? `margin-bottom: -${convertCssPixel(verticalSize)}` : undefined
      }
    })

    return () => {
      const nodes = flattenNode(slots.default?.())
      if (nodes.length === 0) {
        return
      }
      const prefixCls = mergedPrefixCls.value
      const children = renderChildren(props, slots, prefixCls, nodes, mergedSizes, wrap)
      return (
        <div class={classes.value} style={style.value}>
          {children}
        </div>
      )
    }
  },
})

function renderChildren(
  props: SpaceProps,
  slots: Slots,
  prefixCls: string,
  nodes: VNode[],
  mergedSizes: ComputedRef<number[]>,
  wrap: ComputedRef<boolean>,
) {
  const lastIndex = nodes.length - 1

  const { direction } = props
  const [horizontalSize, verticalSize] = mergedSizes.value
  const children: VNode[] = []

  const splitNode = slots.split?.() ?? props.split

  const calcItemStyle = (index: number) => {
    if (flexGapSupported) {
      return undefined
    }
    if (direction === 'horizontal') {
      const marginRight = index < lastIndex ? convertCssPixel(horizontalSize / (splitNode ? 2 : 1)) : undefined
      const paddingBottom = wrap.value ? convertCssPixel(verticalSize) : undefined
      return { marginRight, paddingBottom }
    } else {
      const marginBottom = index < lastIndex ? convertCssPixel(verticalSize / (splitNode ? 2 : 1)) : undefined
      return { marginBottom }
    }
  }

  nodes.forEach((node, index) => {
    const style = calcItemStyle(index)
    children.push(
      <div key={`item-${index}`} class={`${prefixCls}-item`} style={style}>
        {node}
      </div>,
    )
    if (splitNode && index < lastIndex) {
      children.push(
        <div key={`split-${index}`} class={`${prefixCls}-item-split`} style={style}>
          {splitNode}
        </div>,
      )
    }
  })

  return children
}
