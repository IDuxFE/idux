/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import PickerOverlayFooter from './PickerOverlayFooter'
import PickerOverlayInputs from './PickerOverlayInputs'
import Panel from '../panel/Panel'
import { datePickerToken } from '../token'

export default defineComponent({
  setup(_, { slots }) {
    const context = inject(datePickerToken)!
    const { props, mergedPrefixCls } = context

    return () => {
      if (slots.overlay) {
        return slots.overlay()
      }

      const children = [
        <PickerOverlayInputs v-slots={slots} />,
        <Panel v-slots={slots} />,
        <PickerOverlayFooter v-slots={slots} />,
      ]

      return props.overlayRender ? (
        props.overlayRender(children)
      ) : (
        <div class={`${mergedPrefixCls.value}-overlay-content`}>{children}</div>
      )
    }
  },
})
