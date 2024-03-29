/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'collapse'> {
  const {
    colorContainerBg,
    colorInfoContainerBg,
    fontSizeHeaderSm,
    fontSizeXl,
    fontSize2xl,
    paddingSizeMd,
    paddingSizeLg,
  } = tokens

  return {
    fontSizeSm: fontSizeHeaderSm,
    fontSizeMd: fontSizeHeaderSm,

    expandIconSizeSm: fontSizeXl,
    expandIconSizeMd: fontSize2xl,

    paddingHorizontalSm: paddingSizeMd,
    paddingHorizontalMd: paddingSizeLg,

    panelHeaderBgColor: colorContainerBg,
    panelContentBgColor: colorInfoContainerBg,
  }
}
