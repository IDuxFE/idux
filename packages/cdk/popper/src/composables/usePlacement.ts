/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopperPlacement, ResolvedPopperOptions } from '../types'

import { type ComputedRef, computed, ref, watch } from 'vue'

export function usePlacement(options: ComputedRef<ResolvedPopperOptions>): {
  placement: ComputedRef<PopperPlacement>
  updatePlacement: (value: PopperPlacement) => void
} {
  const _placement = ref(options.value.placement)

  const updatePlacement = (value: PopperPlacement) => {
    _placement.value = value
  }

  watch(() => options.value.placement, updatePlacement)

  const placement = computed(() => _placement.value)

  return { placement, updatePlacement }
}
