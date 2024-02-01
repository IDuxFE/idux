/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'statistic'> {
  const { fontSizeMd, fontSize2xl, fontSize3xl, colorTextTitle } = tokens

  return {
    fontSizeSm: fontSizeMd,
    fontSizeMd: fontSizeMd,
    fontSizeLg: fontSize2xl,
    fontSizeXl: fontSize3xl,

    color: colorTextTitle,
  }
}
