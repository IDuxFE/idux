/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { CSSProperties, computed, defineComponent, ref, watch } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import { useAntiTamper } from './composables/useAntiTamper'
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

    const wrapperRef = ref<HTMLElement>()
    const canvasRef = ref<HTMLCanvasElement>()
    const base64Ref = useCalcBase64(props, densityData)

    let antiTamper: ReturnType<typeof useAntiTamper> | undefined = undefined

    watch(
      [wrapperRef, canvasRef, () => props.strict, base64Ref],
      ([wrapperEl, canvasEl, strict, base64]) => {
        if (strict && wrapperEl && canvasEl && base64 !== '') {
          if (antiTamper) {
            antiTamper.stop()
          }
          antiTamper = useAntiTamper(wrapperEl, canvasEl)
        }
      },
      {
        immediate: true,
        flush: 'post',
      },
    )

    const canvasStyle = computed<CSSProperties>(() => {
      return {
        zIndex: props.zIndex,
        backgroundSize: backgroundSize.value,
        backgroundImage: `url(${base64Ref.value})`,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        backgroundRepeat: 'repeat',
      }
    })

    return () => {
      const prefixCls = mergedPrefixCls.value

      return (
        <div ref={wrapperRef} class={prefixCls}>
          {slots.default?.()}
          <div ref={canvasRef} style={canvasStyle.value} />
        </div>
      )
    }
  },
})
