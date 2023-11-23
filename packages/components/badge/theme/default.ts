/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CertainThemeTokens } from '@idux/components/theme'
export function getDefaultThemeTokens(): CertainThemeTokens<'badge'> {
  return {
    dotSize: 6,
    countSize: 16,
  }
}
