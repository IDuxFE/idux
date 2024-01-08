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
    fontSizeIcon,
    marginSizeXs,
    paddingSizeXs,
    paddingSizeSm,
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

    nodePaddingVertical: `0px`,
    nodeContentHeight: heightMd,
    nodeContentPadding: `0 ${paddingSizeSm}px 0 ${paddingSizeXs}px`,
    nodeContentLabelPadding: `0 ${paddingSizeXs}px`,
    nodeContentLabelHighlightColor: colorPrimaryText,

    nodeCheckboxMargin: `0 ${marginSizeXs}px 0 ${Math.max((fontSizeIcon - nodeIconWidth) / 2 + 1, 1)}px`,
    nodeIconWidth,
    expandIconColor: colorIconInfo,
  }
}
