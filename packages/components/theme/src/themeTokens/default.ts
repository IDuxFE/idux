/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GlobalThemeTokens } from '../types'

import { type ColorPalette, getGreyColors as _getGreyColors, getBaseColors, getColorPalette } from './shared'

const getGreyColors = (): ColorPalette => _getGreyColors('graphite')
const presetTokens: Partial<GlobalThemeTokens> = {}

export { getBaseColors, getColorPalette, getGreyColors, presetTokens }
