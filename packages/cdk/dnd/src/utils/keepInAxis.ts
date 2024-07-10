/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Axis, Position } from '../types'

export function keepInAxis(allowedAxis: Axis, offset: Position): Position {
  if (allowedAxis === 'all') {
    return offset
  }

  if (allowedAxis === 'horizontal') {
    return {
      x: offset.x,
      y: 0,
    }
  }

  if (allowedAxis === 'vertical') {
    return {
      x: 0,
      y: offset.y,
    }
  }

  return offset
}
