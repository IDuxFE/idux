/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export function useTimer(): { setTimer: (action: () => void, delay: number) => void; clearTimer: () => void } {
  let timer: number | null = null

  const setTimer = (action: () => void, delay: number) => {
    clearTimer()
    timer = setTimeout(() => {
      action()
      timer = null
    }, delay)
  }

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return { setTimer, clearTimer }
}
