/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent } from 'vue'

import { layoutFooterProps } from './types'

export default defineComponent({
  name: 'IxLayoutFooter',
  props: layoutFooterProps,
  setup(props, { slots }) {
    return () => {
      return <footer class="ix-layout-footer">{slots.default?.()}</footer>
    }
  },
})
