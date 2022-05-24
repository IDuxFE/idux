/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, getCurrentInstance, inject, normalizeStyle, watch } from 'vue'

import { isNil } from 'lodash-es'

import { convertCssPixel } from '@idux/cdk/utils'

import { splitPanelToken } from './token'
import { splitAreaProps } from './types'

export default defineComponent({
  name: 'IxSplitArea',
  __IDUX_SPLIT_AREA: true,
  props: splitAreaProps,
  setup(props, { slots }) {
    const { areaSizeArray, areaMinSizeArray, prefixCls, props: splitPanelProps } = inject(splitPanelToken)!
    const mergedPrefixCls = computed(() => `${prefixCls.value}-area`)
    const { vnode } = getCurrentInstance()!
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const index = (vnode as any).index as number

    const style = computed(() => {
      return normalizeStyle({
        [splitPanelProps.vertical ? 'height' : 'width']: convertCssPixel(areaSizeArray.value[index]),
      })
    })

    watch(
      () => props.size,
      currSize => {
        if (!isNil(currSize)) {
          if (areaSizeArray.value.length - 1 !== index) {
            const nextAreaSize = (areaSizeArray.value[index + 1] || 0) + (areaSizeArray.value[index] || 0) - currSize
            areaSizeArray.value[index] = currSize
            areaSizeArray.value[index + 1] = nextAreaSize
          } else {
            const preAreaSize = (areaSizeArray.value[index + 1] || 0) + (areaSizeArray.value[index] || 0) - currSize
            areaSizeArray.value[index] = currSize
            areaSizeArray.value[index - 1] = preAreaSize
          }
        }
      },
    )

    const initSize = () => {
      areaSizeArray.value[index] = props.size
      areaMinSizeArray.value[index] = props.minSize
    }

    initSize()

    return () => {
      return (
        <div class={mergedPrefixCls.value} style={style.value}>
          {slots.default?.()}
        </div>
      )
    }
  },
})
