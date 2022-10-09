/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type VNode, computed, defineComponent, normalizeClass } from 'vue'

import { supportsFlexGap } from '@idux/cdk/platform'
import { convertCssPixel, flattenNode } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { type FormSize } from '@idux/components/form'
import { convertStringVNode } from '@idux/components/utils'

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
    const mergedGaps = computed(() => {
      const { size = config.size } = props
      const sizes = Array.isArray(size) ? size : [size, size]
      return sizes.map(size => defaultSizeMap[size as FormSize] || convertCssPixel(size))
    })

    const classes = computed(() => {
      const { align, justify, block, vertical } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-align-${align}`]: align,
        [`${prefixCls}-justify-${justify}`]: justify,
        [`${prefixCls}-block`]: block,
        [`${prefixCls}-vertical`]: vertical,
        [`${prefixCls}-nowrap`]: !wrap.value,
      })
    })

    const style = computed(() => {
      const [rowGap, columnGap] = mergedGaps.value
      if (flexGapSupported) {
        return `gap: ${rowGap} ${columnGap}`
      } else {
        return !props.vertical && wrap.value ? `margin-bottom: -${convertCssPixel(rowGap)}` : undefined
      }
    })

    return () => {
      const nodes = flattenNode(slots.default?.())
      if (nodes.length === 0) {
        return
      }

      const prefixCls = mergedPrefixCls.value
      const children: VNode[] = []

      const separatorNode = convertStringVNode(slots, props, 'separator')
      const lastIndex = nodes.length - 1
      nodes.forEach((node, index) => {
        const style = calcItemStyle(mergedGaps, wrap, props.vertical, index, lastIndex)
        children.push(
          <div key={`item-${index}`} class={`${prefixCls}-item`} style={style}>
            {node}
          </div>,
        )
        if (separatorNode && index < lastIndex) {
          children.push(
            <div key={`separator-${index}`} class={`${prefixCls}-item-separator`} style={style}>
              {separatorNode}
            </div>,
          )
        }
      })
      return (
        <div class={classes.value} style={style.value}>
          {children}
        </div>
      )
    }
  },
})

const calcItemStyle = (
  mergedGaps: ComputedRef<(string | number)[]>,
  wrap: ComputedRef<boolean>,
  vertical: boolean | undefined,
  index: number,
  lastIndex: number,
) => {
  if (flexGapSupported) {
    return undefined
  }

  const [rowGap, columnGap] = mergedGaps.value

  if (vertical) {
    const marginBottom = index < lastIndex ? convertCssPixel(rowGap) : undefined
    return { marginBottom }
  } else {
    const marginRight = index < lastIndex ? convertCssPixel(columnGap) : undefined
    const paddingBottom = wrap.value ? convertCssPixel(rowGap) : undefined
    return { marginRight, paddingBottom }
  }
}
