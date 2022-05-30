/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent } from 'vue'

import { useGlobalConfig } from '@idux/components'

import { useCalcBase64 } from './composables/useCalcBase64'
import { watermarkProps } from './types'
import { calcDensity } from './utils'

export default defineComponent({
  name: 'IxWatermark',
  props: watermarkProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-watermark`)
    const densityData = computed(() => calcDensity(props))
    const backgroundSize = computed(() => `${densityData.value.gapHorizontal + densityData.value.width}px`)

    const base64Ref = useCalcBase64(props, densityData)

    const canvasStyle = computed(() => {
      return {
        zIndex: props.zIndex,
        backgroundSize: backgroundSize.value,
        backgroundImage: `url(${base64Ref.value})`,
      }
    })
    return () => {
      const prefixCls = mergedPrefixCls.value

      return (
        <div class={`${prefixCls}`}>
          {slots.default?.()}
          <div class={`${prefixCls}-canvas`} style={canvasStyle.value} />
        </div>
      )
    }
  },
})
