/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { parseSize } from '@idux/cdk/utils'

const matchReg = /matrix(3d)?\((.*)\)/

export function getPositionFromMatrix(matrixStr: string | undefined): { x: number; y: number } | null {
  if (!matrixStr) {
    return null
  }

  const matchRes = matrixStr.match(matchReg)

  if (!matchRes) {
    return null
  }

  const [, is3d, argStr] = matchRes

  const args = argStr.split(',').map(numStr => parseSize(numStr, 0))
  args.reverse()

  return is3d ? { x: args[3], y: args[2] } : { x: args[1], y: args[0] }
}
