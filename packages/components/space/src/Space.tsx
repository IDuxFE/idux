/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SpaceProps } from './types'
import type { FormSize } from '@idux/components/form'
import type { ComputedRef, Slots, VNode } from 'vue'

import { computed, defineComponent, normalizeClass } from 'vue'

import { supportsFlexGap } from '@idux/cdk/platform'
import { convertCssPixel, flattenNode } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import { spaceProps } from './types'

const flexGapSupported = supportsFlexGap()

const defaultSizeMap = {
  sm: '8px',
  md: '16px',
  lg: '24px',
} as const

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

    const mergedGaps = computed(() => {
      const { size = config.size } = props
      const sizes = Array.isArray(size) ? size : [size, size]
      return sizes.map(size => defaultSizeMap[size as FormSize] || convertCssPixel(size))
    })

    const classes = computed(() => {
      const { block, direction } = props
      const align = mergedAlign.value
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-block`]: block && direction === 'vertical',
        [`${prefixCls}-align-${align}`]: align,
        [`${prefixCls}-${direction}`]: true,
        [`${prefixCls}-wrap`]: wrap.value,
      })
    })

    const style = computed(() => {
      const [rowGap, columnGap] = mergedGaps.value
      if (flexGapSupported) {
        return `gap: ${rowGap} ${columnGap}`
      } else {
        const { direction } = props
        return direction === 'horizontal' && wrap.value ? `margin-bottom: -${convertCssPixel(columnGap)}` : undefined
      }
    })

    return () => {
      const nodes = flattenNode(slots.default?.())
      if (nodes.length === 0) {
        return
      }
      const prefixCls = mergedPrefixCls.value
      const children = renderChildren(props, slots, prefixCls, nodes, mergedGaps, wrap)
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
  mergedGaps: ComputedRef<(string | number)[]>,
  wrap: ComputedRef<boolean>,
) {
  const lastIndex = nodes.length - 1

  const { direction } = props
  const [rowGap, columnGap] = mergedGaps.value
  const children: VNode[] = []

  const splitNode = slots.split?.() ?? props.split

  const calcItemStyle = (index: number) => {
    if (flexGapSupported) {
      return undefined
    }

    if (direction === 'horizontal') {
      const marginRight = index < lastIndex ? convertCssPixel(rowGap) : undefined
      const paddingBottom = wrap.value ? convertCssPixel(columnGap) : undefined
      return { marginRight, paddingBottom }
    } else {
      const marginBottom = index < lastIndex ? convertCssPixel(rowGap) : undefined
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
