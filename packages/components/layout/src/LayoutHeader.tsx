/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent } from 'vue'

import { layoutHeaderProps } from './types'

export default defineComponent({
  name: 'IxLayoutHeader',
  props: layoutHeaderProps,
  setup(props, { slots }) {
    return () => {
      return <header class="ix-layout-header">{slots.default?.()}</header>
    }
  },
})
