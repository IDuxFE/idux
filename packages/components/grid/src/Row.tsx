/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CSSProperties, computed, defineComponent, normalizeClass, provide } from 'vue'

import { isArray, isObject } from 'lodash-es'

import { BREAKPOINTS_KEYS, useSharedBreakpoints } from '@idux/cdk/breakpoint'
import { convertNumber } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import { rowToken } from './token'
import { type RowProps, rowProps } from './types'

export default defineComponent({
  name: 'IxRow',
  props: rowProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-row`)
    const config = useGlobalConfig('row')

    const mergedGutters = useGutters(props)
    provide(rowToken, { mergedGutters })

    const classes = computed(() => {
      const { align, justify, wrap = config.wrap } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-align-${align}`]: align,
        [`${prefixCls}-justify-${justify}`]: justify,
        [`${prefixCls}-nowrap`]: !wrap,
      })
    })

    const style = computed(() => {
      const [verticalGutter, horizontalGutter] = mergedGutters.value
      const style: CSSProperties = {}

      if (verticalGutter > 0) {
        style.marginTop = `${verticalGutter / -2}px`
        style.marginBottom = style.marginTop
      }
      if (horizontalGutter > 0) {
        style.marginLeft = `${horizontalGutter / -2}px`
        style.marginRight = style.marginLeft
      }
      return style
    })

    return () => (
      <div class={classes.value} style={style.value}>
        {slots.default && slots.default()}
      </div>
    )
  },
})

function useGutters(props: RowProps) {
  const breakpoints = useSharedBreakpoints()
  return computed(() => {
    const { gutter } = props
    const results: [number, number] = [0, 0]
    const gutters = isArray(gutter) ? gutter : [gutter, gutter]
    gutters.forEach((item, index) => {
      if (isObject(item)) {
        BREAKPOINTS_KEYS.some(key => {
          const currGutter = item[key]
          const isActive = currGutter != null && breakpoints[key]
          if (isActive) {
            results[index] = convertNumber(currGutter)
          }
          return isActive
        })
      } else {
        results[index] = convertNumber(item)
      }
    })
    return results
  })
}
