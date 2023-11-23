/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTokenTransforms } from '@idux/pro/theme'

import { numUnitTransform } from '@idux/components/theme'

export const transforms: ProTokenTransforms<'proTextarea'> = {
  countBottom: value => numUnitTransform(value, 'px'),
  countRight: value => numUnitTransform(value, 'px'),
}
