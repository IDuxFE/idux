/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'divider'> {
  const {
    lineWidth,
    colorBorder,
    fontSizeSm,
    fontSizeMd,
    fontSizeLg,
    marginSizeXs,
    marginSizeSm,
    marginSizeMd,
    marginSizeLg,
    marginSizeXl,
  } = tokens

  return {
    lineWidth: lineWidth,
    lineColor: colorBorder,

    fontSizeSm,
    fontSizeMd,
    fontSizeLg,

    marginVerticalSm: marginSizeMd,
    marginVerticalMd: marginSizeLg,
    marginVerticalLg: marginSizeXl,

    marginHorizontalSm: marginSizeXs,
    marginHorizontalMd: marginSizeSm,
    marginHorizontalLg: marginSizeMd,
  }
}
