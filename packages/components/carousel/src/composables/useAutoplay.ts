/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { ComputedRef, onBeforeUnmount, watch } from 'vue'

export const useAutoplay = (autoplayTime: ComputedRef<number>, next: () => void): void => {
  let timer: number | null = null

  const cleanup = () => {
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
  }

  watch(
    autoplayTime,
    (newVal: number) => {
      cleanup()
      if (newVal) {
        timer = setInterval(() => {
          next()
        }, newVal)
      }
    },
    { immediate: true },
  )

  onBeforeUnmount(cleanup)
}
