/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import Indicator from '../Indicator'
import { colorPickerPanelToken } from '../token'
import { Color } from '../utils'

export default defineComponent({
  props: {
    color: String,
  },
  setup(props) {
    const { mergedPrefixCls, hsbValue, updateColor } = inject(colorPickerPanelToken)!
    const color = computed(() => new Color(props.color))

    const isChecked = computed(() => {
      return color.value.isValid() && color.value.equals(hsbValue.value)
    })

    const handleClick = () => {
      updateColor(color.value)
    }

    return () => (
      <Indicator
        class={`${mergedPrefixCls.value}-presets-indicator`}
        color={props.color}
        checked={isChecked.value}
        onClick={handleClick}
      />
    )
  },
})
