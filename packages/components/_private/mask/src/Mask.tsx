/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Transition, defineComponent } from 'vue'

import { maskProps } from './types'

export default defineComponent({
  props: maskProps,
  setup(props) {
    return () => {
      const { mask, transitionName, visible, zIndex } = props
      if (!mask) {
        return null
      }

      return (
        <Transition appear name={transitionName}>
          <div v-show={visible} class="ix-mask" style={{ zIndex }}></div>
        </Transition>
      )
    }
  },
})
