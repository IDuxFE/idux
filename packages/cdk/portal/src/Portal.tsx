/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Teleport, computed, defineComponent, ref, watch } from 'vue'

import { covertTarget } from './covertTarget'
import { portalProps } from './types'

export default defineComponent({
  name: 'CdkPortal',
  props: portalProps,
  setup(props, { slots }) {
    const loaded = ref(props.load)

    watch(
      () => props.load,
      load => {
        if (!loaded.value) {
          loaded.value = load
        }
      },
    )
    const target = computed(() => loaded.value && covertTarget(props.target))

    return () => {
      const _target = target.value
      if (!_target) {
        return null
      }

      return (
        <Teleport to={_target} disabled={props.disabled}>
          {slots.default?.()}
        </Teleport>
      )
    }
  },
})
