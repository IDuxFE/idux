/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { ExtendedColorTokens } from './color'
import { ControlTokens } from './control'
import { ExtendedFontTokens } from './font'
import { OverlayTokens } from './overlay'
import { ScrollbarTokens } from './scrollbar'
import { ExtendedSizeTokens } from './size'

export type {
  ExtendedColorTokens,
  ExtendedFontTokens,
  ExtendedSizeTokens,
  ControlTokens,
  ScrollbarTokens,
  OverlayTokens,
}

export interface ExtendedTokens
  extends ExtendedColorTokens,
    ExtendedFontTokens,
    ExtendedSizeTokens,
    ControlTokens,
    OverlayTokens,
    ScrollbarTokens {}
