/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopperOptions, PopperPlacement } from '../types'

import { type ComputedRef, computed, ref, watch } from 'vue'

export function usePlacement(options: Required<PopperOptions>): {
  placement: ComputedRef<PopperPlacement>
  updatePlacement: (value: PopperPlacement) => void
} {
  const _placement = ref(options.placement)

  const updatePlacement = (value: PopperPlacement) => {
    _placement.value = value
  }

  watch(() => options.placement, updatePlacement)

  const placement = computed(() => _placement.value)

  return { placement, updatePlacement }
}
