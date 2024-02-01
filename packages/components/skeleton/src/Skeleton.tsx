/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass } from 'vue'

import { convertCssPixel } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'

import { skeletonProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxSkeleton',
  inheritAttrs: false,
  props: skeletonProps,
  setup(props, { slots, attrs }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('skeleton')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-skeleton`)
    const config = useGlobalConfig('skeleton')
    const loaderClass = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-loader`]: true,
        [`${prefixCls}-${props.type}`]: true,
        [`${prefixCls}-animated`]: props.animated ?? config.animated,
      })
    })
    const loaderStyle = computed(() => {
      const { width, height, type } = props

      if (type === 'circle') {
        const size = convertCssPixel(width || height)
        return {
          width: size,
          height: size,
        }
      }
      return {
        width: convertCssPixel(width),
        height: convertCssPixel(height),
      }
    })

    return () => {
      if (!props.loading) {
        return slots.default?.()
      }

      const prefixCls = mergedPrefixCls.value
      const loader = <div class={loaderClass.value} style={loaderStyle.value}></div>
      const loaderList = Array.from({ length: props.repeat }).map(() => loader)

      return (
        <div class={[prefixCls, globalHashId.value, hashId.value]} {...attrs}>
          {loaderList}
        </div>
      )
    }
  },
})
