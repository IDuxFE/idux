/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export function triggerPostMoveFlash(
  element: HTMLElement,
  options?: {
    duration?: number
    bgColor?: string
    easing?: string
  },
): void {
  const mergedDuration = options?.duration ?? 200
  const mergedBgColor = options?.bgColor ?? 'rgba(69, 143, 255, 0.3)'
  const mergedEasing = options?.easing ?? 'cubic-bezier(0.37, 0, 0.63, 1)'

  element.animate(
    [
      {
        backgroundColor: mergedBgColor,
      },
      {},
    ],
    {
      duration: mergedDuration,
      easing: mergedEasing,
    },
  )
}
