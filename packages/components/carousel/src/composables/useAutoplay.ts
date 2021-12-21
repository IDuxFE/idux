/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { ComputedRef, onBeforeUnmount, watch } from 'vue'

export const useAutoplay = (autoplayTime: ComputedRef<number>, next: () => void): void => {
  let timer: number | null = null

  watch(
    autoplayTime,
    (newVal: number) => {
      timer && window.clearInterval(timer)
      if (newVal) {
        timer = window.setInterval(() => {
          next()
        }, newVal)
      }
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    if (timer !== null) {
      window.clearInterval(timer)
    }
  })
}
