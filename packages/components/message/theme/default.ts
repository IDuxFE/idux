/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'message'> {
  const {
    marginSizeSm,
    fontSizeMd,
    paddingSizeLg,
    paddingSizeSm,
    colorContainerBg,
    borderRadiusMd,
    overlayBorderWidth,
    overlayBorderType,
    overlayBorderColor,
  } = tokens

  return {
    margin: marginSizeSm,
    fontSize: fontSizeMd,
    borderWidth: overlayBorderWidth,
    borderType: overlayBorderType,
    borderColor: overlayBorderColor,

    contentMinWidth: 128,
    contentMaxWidth: 480,
    contentPaddingVertical: paddingSizeSm,
    contentPaddingHorizontal: paddingSizeLg,
    bgColor: colorContainerBg,
    borderRadius: borderRadiusMd,

    iconMarginRight: marginSizeSm,
    wrapperTop: `15%`,
  }
}
