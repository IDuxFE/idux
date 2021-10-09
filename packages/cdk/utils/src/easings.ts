/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export type EasingFn = (elapsed: number, initialValue: number, amountOfChange: number, duration: number) => number

export const easeInOutQuad: EasingFn = (
  elapsed: number,
  initialValue: number,
  amountOfChange: number,
  duration: number,
) => {
  if (duration <= 0) {
    return amountOfChange
  }
  if ((elapsed /= duration / 2) < 1) {
    return (amountOfChange / 2) * elapsed * elapsed + initialValue
  }
  return (-amountOfChange / 2) * (--elapsed * (elapsed - 2) - 1) + initialValue
}

export const easeInOutCubic: EasingFn = (
  elapsed: number,
  initialValue: number,
  amountOfChange: number,
  duration: number,
) => {
  if (duration <= 0) {
    return amountOfChange + initialValue
  }
  if ((elapsed /= duration / 2) < 1) {
    return (amountOfChange / 2) * elapsed * elapsed * elapsed + initialValue
  }
  return (amountOfChange / 2) * ((elapsed -= 2) * elapsed * elapsed + 2) + initialValue
}
