/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent } from 'vue'

import { layoutContentProps } from './types'

export default defineComponent({
  name: 'IxLayoutContent',
  props: layoutContentProps,
  setup(props, { slots }) {
    return () => {
      return <main class="ix-layout-content">{slots.default?.()}</main>
    }
  },
})
