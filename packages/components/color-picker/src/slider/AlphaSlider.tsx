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
    const { mergedPrefixCls, alpha, rgbValue, setAlpha } = inject(colorPickerPanelToken)!

    const trackStyle = computed(() => {
      const bgColor = new Color(Object.assign({ ...rgbValue.value }, { a: 1 })).toRgbString()

      return {
        background: `linear-gradient(to right, rgba(255, 0, 4, 0), ${bgColor})`,
      }
    })

    const handleStyle = computed(() => {
      const color = new Color(rgbValue.value)
      color.setAlpha(alpha.value / 100)
      const backgroundColor = color.toRgbString()

      return {
        backgroundColor,
      }
    })

    const handleChange = (value: { x: number }) => {
      setAlpha(value.x)
    }

    return () => (
      <div class={`${mergedPrefixCls.value}-alpha-slider-wrapper`}>
        <Slider
          class={`${mergedPrefixCls.value}-alpha-slider`}
          value={{ x: alpha.value, y: 0 }}
          trackStyle={trackStyle.value}
          handleStyle={handleStyle.value}
          onChange={handleChange}
        />
      </div>
    )
  },
})
