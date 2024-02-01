/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type TokenTransforms, numUnitTransform } from '@idux/components/theme'

export const transforms: TokenTransforms<'notification'> = {
  closeIconTop: value => numUnitTransform(value, 'px'),
  closeIconRight: value => numUnitTransform(value, 'px'),
}
