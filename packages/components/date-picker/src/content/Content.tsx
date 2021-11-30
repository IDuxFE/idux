/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import { ɵDatePanel } from '@idux/components/_private'

import { datePickerToken } from '../token'

export default defineComponent({
  setup() {
    const { props, slots, overlayOpened, panelDate, handlePanelCellClick } = inject(datePickerToken)!

    return () => {
      const { overlayRender } = props

      const children = (
        <ɵDatePanel
          v-slots={slots}
          disabledDate={props.disabledDate}
          type={props.type}
          value={panelDate.value}
          visible={overlayOpened.value}
          onCellClick={handlePanelCellClick}
        />
      )

      return overlayRender ? overlayRender([children]) : <div>{children}</div>
    }
  },
})
