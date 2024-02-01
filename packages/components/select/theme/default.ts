/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'select'> {
  const {
    fontSizeSm,
    heightMd,
    marginSizeSm,
    marginSizeMd,
    paddingSizeXs,
    paddingSizeSm,
    paddingSizeMd,
    paddingSizeXl,
  } = tokens

  return {
    optionFontSize: fontSizeSm,
    optionHeight: heightMd,
    optionPadding: `${paddingSizeSm}px ${paddingSizeMd}px`,

    optionLabelMarginLeft: marginSizeSm,
    optionContainerPadding: `${paddingSizeXs}px 0`,
    optionGroupMargin: `0 ${marginSizeMd}px`,
    optionGroupPaddingLeft: 0,
    multipleOptionGroupedPaddingLeft: paddingSizeMd,
    optionGroupedPaddingLeft: paddingSizeXl,

    overlaySearchWrapperPadding: `${paddingSizeXs}px ${paddingSizeMd}px ${paddingSizeSm}px`,
  }
}
