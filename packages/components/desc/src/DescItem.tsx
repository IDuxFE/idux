/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, defineComponent, inject, normalizeClass } from 'vue'

import { isObject } from 'lodash-es'

import { BREAKPOINTS_KEYS, type BreakpointKey, useSharedBreakpoints } from '@idux/cdk/breakpoint'
import { Logger, convertCssPixel, convertNumber } from '@idux/cdk/utils'
import { IxCol } from '@idux/components/grid'
import { convertStringVNode } from '@idux/components/utils'

import { descToken } from './token'
import { type DescItemProps, descItemProps } from './types'

export default defineComponent({
  name: 'IxDescItem',
  props: descItemProps,
  setup(props, { slots }) {
    const descContext = inject(descToken)
    if (!descContext) {
      __DEV__ && Logger.warn('components/desc', 'The IxDescItem must be within IxDesc component')
      return
    }

    const { mergedPrefixCls, mergedCol, mergedColonless, mergedLabelAlign, mergedLabelWidth } = descContext

    const mergedColSpan = useMergedColSpan(props, mergedCol)

    const labelClasses = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-item-label`
      const { colonless = mergedColonless.value, labelAlign = mergedLabelAlign.value } = props
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-colon`]: !colonless,
        [`${prefixCls}-start`]: labelAlign === 'start',
      })
    })

    const labelStyle = computed(() => {
      const labelWidth = convertCssPixel(props.labelWidth ?? mergedLabelWidth.value)
      return labelWidth ? `width: ${labelWidth}` : undefined
    })

    return () => {
      const labelNode = convertStringVNode(slots, props, 'label')
      return (
        <IxCol class={`${mergedPrefixCls.value}-item`} span={mergedColSpan.value}>
          {labelNode && (
            <div class={labelClasses.value}>
              <label style={labelStyle.value}>{labelNode}</label>
            </div>
          )}
          <div class={`${mergedPrefixCls.value}-content`}>
            <span>{slots.default && slots.default()}</span>
          </div>
        </IxCol>
      )
    }
  },
})

const defaultSelfCol = 1 // 默认占一列
const defaultParentCol = 3 // 默认一行 3 列
const defaultRowSpan = 24 // 基于 24 栅格系统

function useMergedColSpan(
  props: DescItemProps,
  mergedCol: ComputedRef<number | string | Record<BreakpointKey, number | string>>,
) {
  const breakpoints = useSharedBreakpoints()
  return computed(() => {
    let selfCol = props.col
    let parentCol = mergedCol.value
    const currBreakpoint = BREAKPOINTS_KEYS.find(key => breakpoints[key])!
    selfCol = convertNumber(isObject(selfCol) ? selfCol[currBreakpoint] : selfCol, defaultSelfCol)
    parentCol = convertNumber(isObject(parentCol) ? parentCol[currBreakpoint] : parentCol, defaultParentCol)
    return (defaultRowSpan / parentCol) * selfCol
  })
}
