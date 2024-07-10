/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AutoScrollOptions } from '../types'

import { type Ref, computed, isRef, watch } from 'vue'

import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element'

import { tryOnScopeDispose } from '@idux/cdk/utils'

export function useDndAutoScroll(
  elementRef: Ref<HTMLElement | undefined>,
  options?: AutoScrollOptions | Ref<AutoScrollOptions>,
): void {
  let cleanUp: (() => void) | undefined

  const resolvedOptions = computed(() => {
    const resolvedOptions = isRef(options) ? options.value : options

    const { canScroll = true, maxScrollSpeed = 'standard', allowedAxis = 'all' } = resolvedOptions ?? {}

    return {
      canScroll,
      maxScrollSpeed,
      allowedAxis,
    }
  })

  watch(
    elementRef,
    element => {
      cleanUp?.()

      if (!element) {
        return
      }

      cleanUp = autoScrollForElements({
        element,
        canScroll() {
          return resolvedOptions.value.canScroll
        },
        getConfiguration() {
          return { maxScrollSpeed: resolvedOptions.value.maxScrollSpeed }
        },
        getAllowedAxis() {
          return resolvedOptions.value.allowedAxis
        },
      })
    },
    {
      immediate: true,
      deep: true,
    },
  )

  tryOnScopeDispose(() => {
    cleanUp?.()
  })
}
