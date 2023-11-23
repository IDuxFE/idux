/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'cascader'> {
  const { colorPrimaryText, fontSizeSm, heightMd, marginSizeSm, paddingSizeXs, paddingSizeSm, paddingSizeMd } = tokens

  return {
    optionFontSize: fontSizeSm,
    optionHeight: heightMd,
    optionPadding: `${paddingSizeSm}px ${paddingSizeMd}px`,
    optionLabelHighlightColor: colorPrimaryText,

    optionGroupMinWidth: 120,
    optionGroupMinHeight: 180,

    optionLabelMarginLeft: marginSizeSm,
    optionContainerPadding: `${paddingSizeXs}px 0`,

    overlaySearchWrapperPadding: `${paddingSizeXs}px ${paddingSizeMd}px ${paddingSizeSm}px`,
  }
}
