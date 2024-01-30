/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'treeSelect'> {
  const { fontSizeSm, heightMd, marginSizeSm, paddingSizeXs, paddingSizeSm, paddingSizeMd } = tokens

  return {
    optionFontSize: fontSizeSm,
    optionHeight: heightMd,
    optionPadding: `${paddingSizeSm}px ${paddingSizeMd}px`,
    optionMarginLeft: marginSizeSm,
    optionContainerPadding: `${paddingSizeXs}px 0`,
    optionContainerTreeNodePadding: `0 0 0 ${paddingSizeMd}px`,

    overlaySearchWrapperPadding: `${paddingSizeXs}px ${paddingSizeMd}px ${paddingSizeSm}px`,
  }
}
