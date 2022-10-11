/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopperOptions } from '../types'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

export function useVisibility(options: Required<PopperOptions>): ComputedRef<boolean> {
  return computed(() => !options.disabled && options.visible)
}
