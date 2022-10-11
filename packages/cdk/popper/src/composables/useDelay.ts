/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopperOptions } from '../types'

import { type ComputedRef, computed } from 'vue'

import { defaultDelay } from './useOptions'

export function useDelay(options: Required<PopperOptions>): ComputedRef<{ show: number; hide: number }> {
  const convertDelay = (delay: number | [number | null, number | null]) => {
    if (Array.isArray(delay)) {
      const [show, hide] = delay
      return { show: show ?? defaultDelay, hide: hide ?? defaultDelay }
    }
    return { show: delay, hide: delay }
  }

  return computed(() => convertDelay(options.delay))
}
