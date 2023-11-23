/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'checkbox'> {
  const { paddingSizeXs, colorInfoContainerBg, colorBorderSecondary } = tokens

  return {
    labelPadding: `0 ${paddingSizeXs}px`,
    fieldsetBgColor: colorInfoContainerBg,
    fieldsetBorderColor: colorBorderSecondary,
  }
}
