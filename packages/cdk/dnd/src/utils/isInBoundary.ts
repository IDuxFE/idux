/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Position, Rect, ResolvedBoundary } from '../types'

export function isInBoundary(rect: Rect, boundary: ResolvedBoundary | undefined, offset: Position): boolean {
  if (!boundary) {
    return false
  }

  const { x, y, width, height } = rect
  const { left, right, top, bottom } = boundary

  return (
    right - (x + width) >= offset.x && left - x <= offset.x && bottom - (y + height) >= offset.y && top - y <= offset.y
  )
}
