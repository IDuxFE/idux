/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GlobalThemeTokens } from '@idux/components/theme'
import type { ProCertainThemeTokens } from '@idux/pro/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): ProCertainThemeTokens<'proSearch'> {
  const {
    colorText,
    colorTextDisabled,
    colorTextInfo,
    colorTextInverse,
    colorEmphasizedContainerBg,
    colorPrimary,
    colorPrimaryHover,
    colorEmphasizedContainerBgDisabled,
    controlHeightSm,
    controlHeightMd,
    paddingSize2Xs,
    paddingSizeXs,
    paddingSizeSm,
    paddingSizeMd,
  } = tokens

  return {
    heightSm: controlHeightSm,
    heightMd: controlHeightMd,
    containerPaddingSm: paddingSize2Xs,
    containerPaddingMd: paddingSizeXs,
    tagGapSm: paddingSize2Xs,
    tagGapMd: paddingSizeXs,
    quickSelectPaddingSm: paddingSizeSm,
    quickSelectPaddingMd: paddingSizeMd,

    tagColor: colorText,
    tagBgColor: colorEmphasizedContainerBg,
    tagColorDisabled: colorTextDisabled,
    tagBgColorDisabled: colorEmphasizedContainerBg,

    tagNameColor: colorTextInfo,

    segmentPaddingHorizontal: paddingSizeXs,
    segmentMaxWidth: 150,

    searchBtnColor: colorTextInverse,
    searchBtnColorHover: colorTextInverse,
    searchBtnColorDisabled: colorTextInverse,
    searchBtnBgColor: colorPrimary,
    searchBtnBgColorHover: colorPrimaryHover,
    searchBtnBgColorDisabled: colorEmphasizedContainerBgDisabled,

    namePanelMinWidth: 160,
    operatorPanelMinWidth: 20,
    selectPanelMinWidth: 100,
    treeSelectPanelMinWidth: 200,
    treeSelectPanelMaxWidth: 400,
  }
}
