/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Teleport, computed, defineComponent, ref, watch } from 'vue'

import { portalProps } from './types'
import { useTarget } from './useTarget'

export default defineComponent({
  name: 'IxPortal',
  props: portalProps,
  setup(props) {
    const loaded = ref(props.load)
    watch(
      () => props.load,
      load => {
        if (!loaded.value) {
          loaded.value = load
        }
      },
    )
    const to = computed(() => loaded.value && useTarget(props.target))
    return { to }
  },
  render() {
    const { to, disabled, $slots } = this
    if (!to) {
      return null
    }

    return (
      <Teleport to={to} disabled={disabled}>
        {$slots.default?.()}
      </Teleport>
    )
  },
})
