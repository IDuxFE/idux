/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BasicTokens, DerivedTokens, ExtendedColorTokens, OverlayTokens } from '../../../types'

export function getOverlayTokens(tokens: BasicTokens & DerivedTokens & ExtendedColorTokens): OverlayTokens {
  const { borderRadiusSm, arrowSize, colorContainerBg, lineType } = tokens

  return {
    overlayBgColor: colorContainerBg,
    overlayArrowSize: arrowSize,
    overlayBorderRadius: borderRadiusSm,
    overlayBorderWidth: 0,
    overlayBorderColor: 'transparent',
    overlayBorderType: lineType,
  }
}
