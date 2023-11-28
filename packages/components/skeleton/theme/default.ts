/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'skeleton'> {
  const { marginSizeSm, marginSizeXs, colorEmphasizedContainerBg, colorContainerBgDisabled } = tokens

  return {
    marginBottom: marginSizeSm,
    loaderMarginBottom: marginSizeXs,
    startColor: colorEmphasizedContainerBg,
    endColor: colorContainerBgDisabled,
  }
}
