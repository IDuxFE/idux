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
    const { mergedPrefixCls, hue, setHsb } = inject(colorPickerPanelToken)!

    const handleStyle = computed(() => {
      const backgroundColor = new Color({ h: hue.value, s: 100, b: 100, a: 1 }).toRgbString()

      return {
        backgroundColor,
      }
    })

    const sliderValue = computed(() => {
      return {
        x: hue.value / 360,
        y: 0,
      }
    })

    const handleChange = (value: { x: number }) => {
      setHsb({ h: Math.round(value.x * 360) })
    }

    return () => (
      <Slider
        class={`${mergedPrefixCls.value}-hue-slider`}
        value={sliderValue.value}
        handleStyle={handleStyle.value}
        xIsCircle
        onChange={handleChange}
      />
    )
  },
})
