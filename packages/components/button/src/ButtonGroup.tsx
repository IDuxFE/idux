/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, provide } from 'vue'

import { buttonToken } from './token'
import { buttonGroupProps } from './types'

export default defineComponent({
  name: 'IxButtonGroup',
  props: buttonGroupProps,
  setup(props, { slots }) {
    provide(buttonToken, props)

    return () => <div class="ix-button-group">{slots.default?.()}</div>
  },
})
