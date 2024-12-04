/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type PropType, defineComponent, provide } from 'vue'

import { OverlayVisibleLockToken } from './token'

export default defineComponent({
  props: {
    lock: {
      type: Function as PropType<() => void>,
      required: true,
    },
    unlock: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    provide(OverlayVisibleLockToken, {
      lock: props.lock,
      unlock: props.unlock,
    })

    return () => <div {...attrs}>{slots.default?.()}</div>
  },
})
