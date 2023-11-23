/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'progress'> {
  const { colorEmphasizedContainerBg, fontSizeSm, fontSizeMd, fontSize2xl, paddingSizeSm } = tokens

  return {
    trailBgColor: colorEmphasizedContainerBg,
    textWidth: 36,
    borderRadius: 100,

    lineSizeSm: 2,
    lineSizeMd: 6,
    lineSizeLg: 8,

    lineFontSizeSm: fontSizeSm,
    lineFontSizeMd: fontSizeSm,
    lineFontSizeLg: fontSizeMd,

    lineTextPadding: `0 0 0 ${paddingSizeSm}px`,

    circleWidth: 120,
    circleFontSize: fontSize2xl,
  }
}
