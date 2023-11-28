/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GetGreyColors, ScrollbarTokens } from '../../../types'

export function getScollbarTokens(getGreyColors: GetGreyColors): ScrollbarTokens {
  const greyColors = getGreyColors()

  return {
    scrollbarWidth: 12,
    scrollbarHeight: 12,
    scrollbarThumbBg: greyColors.l30,
    scrollbarThumbBgHover: greyColors.l10,
    scrollbarThumbBgActive: greyColors.l10,
    scrollbarThumbBorderWidth: 2,
    scrollbarThumbBorderRadius: 6,
    scrollbarThumbBoxShadow: 'none',
    scrollbarTrackBg: 'unset',
    scrollbarTrackBorderRadius: 0,
    scrollbarTrackBoxShadow: 'unset',
  }
}
