/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Ref } from 'vue'

export type CheckScrollLocked = (delta: number, isHorizontal: boolean, smoothOffset?: boolean) => boolean

export function useScrollLock(
  scrolledTop: Ref<boolean>,
  scrolledBottom: Ref<boolean>,
  scrolledLeft: Ref<boolean>,
  scrolledRight: Ref<boolean>,
): CheckScrollLocked {
  // Do lock for a wheel when scrolling
  let lock = false
  let lockTimeout: number
  const lockScroll = () => {
    clearTimeout(lockTimeout)
    lock = true
    lockTimeout = setTimeout(() => (lock = false), 50) as unknown as number
  }

  return (delta: number, isHorizontal: boolean, smoothOffset = false) => {
    const scrolledStart = isHorizontal ? scrolledLeft.value : scrolledTop.value
    const scrolledEnd = isHorizontal ? scrolledRight.value : scrolledBottom.value
    const originScroll =
      // Pass origin wheel when on the top
      (delta < 0 && scrolledStart) ||
      // Pass origin wheel when on the bottom
      (delta > 0 && scrolledEnd)

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
