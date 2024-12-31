/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ResolvedPopperOptions } from '../types'
import type { ComputedRef } from 'vue'

import { computed, shallowRef } from 'vue'

export function useVisibility(options: ComputedRef<ResolvedPopperOptions>): {
  visibility: ComputedRef<boolean>
  updateVisibility: (visible: boolean) => void
} {
  const visible = shallowRef(!!options.value.visible)
  const mergedVisible = computed(() => !options.value.disabled && !!(options.value.visible ?? visible.value))

  const updateVisibility = (v: boolean) => {
    if (options.value.disabled || v === (options.value.visible ?? visible.value)) {
      return
    }

    visible.value = v
    options.value.onVisibleChange?.(v)
  }

  return {
    visibility: mergedVisible,
    updateVisibility,
  }
}
