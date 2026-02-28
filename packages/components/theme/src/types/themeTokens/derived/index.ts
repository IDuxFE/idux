/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DerivedColorTokens } from './color'
import type { DerivedFontTokens } from './font'
import type { DerivedMotionTokens } from './motion'
import type { ShadowTokens } from './shadow'
import type { DerivedSizeTokens } from './size'

export type { DerivedColorTokens, DerivedFontTokens, DerivedSizeTokens, DerivedMotionTokens, ShadowTokens }

export interface DerivedTokens
  extends DerivedColorTokens,
    DerivedFontTokens,
    DerivedSizeTokens,
    DerivedMotionTokens,
    ShadowTokens {}
