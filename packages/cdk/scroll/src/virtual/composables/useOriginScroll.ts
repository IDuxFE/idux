/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ComputedRef } from 'vue'

export type OriginScroll = (deltaY: number, smoothOffset?: boolean) => boolean

export function useOriginScroll(scrolledTop: ComputedRef<boolean>, scrolledBottom: ComputedRef<boolean>): OriginScroll {
  // Do lock for a wheel when scrolling
  let lock = false
  let lockTimeout: number
  const lockScroll = () => {
    clearTimeout(lockTimeout)
    lock = true
    lockTimeout = setTimeout(() => (lock = false), 50)
  }

  return (deltaY: number, smoothOffset = false) => {
    const originScroll =
      // Pass origin wheel when on the top
      (deltaY < 0 && scrolledTop.value) ||
      // Pass origin wheel when on the bottom
      (deltaY > 0 && scrolledBottom.value)

    if (smoothOffset && originScroll) {
      // No need lock anymore when it's smooth offset from touchMove interval
      clearTimeout(lockTimeout)
      lock = false
    } else if (!originScroll || lock) {
      lockScroll()
    }

    return !lock && originScroll
  }
}
