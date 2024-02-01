/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'notification'> {
  const {
    paddingSizeSm,
    paddingSizeLg,
    marginSizeXs,
    marginSizeSm,
    marginSizeLg,
    fontSizeMd,
    fontSizeSm,
    colorContainerBg,
    colorTextInfo,
    borderRadiusSm,
    overlayBorderWidth,
    overlayBorderType,
    overlayBorderColor,
  } = tokens

  return {
    padding: `${paddingSizeSm}px ${paddingSizeSm}px ${paddingSizeSm}px ${paddingSizeLg}px`,
    margin: `0 0 ${marginSizeSm}px 0`,
    width: 384,
    maxWidth: `calc(100vw - 48px)`,

    borderWidth: overlayBorderWidth,
    borderType: overlayBorderType,
    borderColor: overlayBorderColor,

    fontSize: fontSizeMd,
    bgColor: colorContainerBg,
    borderRadius: borderRadiusSm,

    iconMargin: `${marginSizeXs}px ${marginSizeSm}px`,
    iconWrapperWidth: 44,

    titleFontSize: fontSizeMd,
    titleLineHeight: fontSizeMd + 10,
    titleMargin: `0 24px 8px 0`,

    contentFontSize: fontSizeSm,
    contentColor: colorTextInfo,
    contentMargin: `0 ${marginSizeLg}px 0 0`,

    closeIconTop: marginSizeSm,
    closeIconRight: marginSizeSm,

    footerMargin: `${marginSizeSm}px 0 0 0`,
  }
}
