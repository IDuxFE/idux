/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens, GlobalThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(tokens: GlobalThemeTokens): CertainThemeTokens<'upload'> {
  const { controlLineWidth, colorBorder, colorPrimaryBorder } = tokens

  return {
    selectorDragableBorder: `${controlLineWidth}px dashed ${colorBorder}`,
    selectorDragableBorderDragover: `${controlLineWidth}px dashed ${colorPrimaryBorder}`,

    listNameMaxWidth: `calc(100% - 74px)`,

    listImgThumbWidth: 48,
    listImgThumbHeight: 48,

    listImgCardHeight: 96,
    listImgCardWidth: 96,
  }
}
