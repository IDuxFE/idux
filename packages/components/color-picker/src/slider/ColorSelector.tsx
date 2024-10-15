/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import Slider from './Slider'
import { colorPickerPanelToken } from '../token'
import { Color } from '../utils'

export default defineComponent({
  setup() {
    const { mergedPrefixCls, hue, saturation, brightness, setHsb } = inject(colorPickerPanelToken)!

    const sliderValue = computed(() => ({ x: saturation.value, y: 1 - brightness.value }))

    const trackStyle = computed(() => {
      const backgroundColor = new Color({ h: hue.value, s: 100, b: 100, a: 1 }).toRgbString()

      return {
        backgroundColor,
      }
    })

    const handleChange = (value: { x: number; y: number }) => {
      setHsb({ s: value.x, b: 1 - value.y })
    }

    return () => (
      <Slider
        class={`${mergedPrefixCls.value}-color-selector`}
        value={sliderValue.value}
        trackStyle={trackStyle.value}
        boundaryWithoutHandle
        onChange={handleChange}
      />
    )
  },
})
