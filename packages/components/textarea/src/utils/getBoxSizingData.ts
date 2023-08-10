/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type BoxSizingData as IBoxSizingData, getBoxSizingData as _getBoxSizingData } from '@idux/cdk/utils'

export interface BoxSizingData extends IBoxSizingData {
  paddingSize: number
  borderSize: number
}

export function getBoxSizingData(node: HTMLElement): BoxSizingData {
  const data = _getBoxSizingData(node)
  const { paddingBottom, paddingTop, borderBottom, borderTop } = data

  return {
    ...data,
    paddingSize: paddingTop + paddingBottom,
    borderSize: borderTop + borderBottom,
  }
}
