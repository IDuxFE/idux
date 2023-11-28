/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GetGreyColors, ShadowTokens } from '../../../types'

import { getAlphaColor } from '../color'

export function getShadowTokens(getGreyColors: GetGreyColors): ShadowTokens {
  const greyColors = getGreyColors()
  return {
    boxShadowSm: `0 2px 10px 0px ${getAlphaColor(greyColors.d50, 0.16)}`,
    boxShadowMd: `0 4px 16px 0px ${getAlphaColor(greyColors.d50, 0.14)}`,
    boxShadowLg: `0 8px 22px 0px ${getAlphaColor(greyColors.d50, 0.12)}`,
  }
}
