/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'tree'> {
  const {
    heightMd,
    heightSm,
    marginSizeXs,
    colorPrimaryHover,
    colorPrimaryText,
    colorContainerBgHover,
    colorContainerBg,
    colorIconInfo,
  } = tokens

  const nodeIconWidth = heightSm

  return {
    dropLineWidth: 2,
    dropLineColor: colorPrimaryHover,

    bgColor: colorContainerBg,
    nodeBgColorHover: colorContainerBgHover,
    nodeBgColorSelected: colorContainerBg,

    nodeColorSelected: colorPrimaryText,

    nodePaddingHorizontal: marginSizeXs,
    nodePaddingVertical: `0px`,
    nodeContentHeight: heightMd,
    nodeContentLabelHighlightColor: colorPrimaryText,

    nodeContentPrefixMarginRight: marginSizeXs,

    nodeCheckboxMarginRight: marginSizeXs,
    nodeIconWidth,
    expandIconColor: colorIconInfo,
  }
}
