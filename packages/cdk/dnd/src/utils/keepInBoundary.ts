/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Position, Rect, ResolvedBoundary } from '../types'

export function keepInBoundary(rect: Rect, boundary: ResolvedBoundary | undefined, offset: Position): Position {
  if (!boundary) {
    return {
      x: offset.x,
      y: offset.y,
    }
  }

  const { x, y, width, height } = rect
  const { left, right, top, bottom } = boundary

  return {
    x: Math.floor(offset.x > 0 ? Math.min(right - (x + width), offset.x) : Math.max(left - x, offset.x)),
    y: Math.floor(offset.y > 0 ? Math.min(bottom - (y + height), offset.y) : Math.max(top - y, offset.y)),
  }
}
