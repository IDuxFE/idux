/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import Indicator from './Indicator'
import AlphaSlider from './slider/AlphaSlider'
import ColorSelector from './slider/ColorSelector'
import HueSlider from './slider/HueSlider'
import { colorPickerPanelToken } from './token'

export default defineComponent({
  name: 'IxColorPickerPalette',
  setup() {
    const { mergedPrefixCls, rgbValue } = inject(colorPickerPanelToken)!

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-palette`

      return (
        <div class={prefixCls}>
          <ColorSelector />
          <div class={`${prefixCls}-bottom`}>
            <div class={`${prefixCls}-sliders`}>
              <HueSlider />
              <AlphaSlider />
            </div>
            <Indicator
              class={`${prefixCls}-indicator`}
              color={rgbValue.value}
              hoverable={false}
              showBoxShadow={false}
            />
          </div>
        </div>
      )
    }
  },
})
