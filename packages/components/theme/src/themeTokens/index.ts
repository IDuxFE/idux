/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GlobalThemeTokens, PresetTheme, ThemeTokenAlgorithms } from '../types'

export * from './shared'

import { merge, pick } from 'lodash-es'

import {
  getBaseColors as getDarkBaseColors,
  getColorPalette as getDarkColorPalette,
  getGreyColors as getDarkGreyColors,
  getPresetTokens as getDarkPresetTokens,
} from './dark'
import {
  presetTokens as defaultPresetTokens,
  getBaseColors as getDefaultBaseColors,
  getColorPalette as getDefaultColorPalette,
  getGreyColors as getDefaultGreyColors,
} from './default'
import { getBasicTokens, getDerivedTokens, getExtendedTokens } from './shared'

export function getPresetAlgorithms(presetTheme: PresetTheme): ThemeTokenAlgorithms {
  return presetTheme === 'default'
    ? {
        getBaseColors: getDefaultBaseColors,
        getColorPalette: getDefaultColorPalette,
        getGreyColors: getDefaultGreyColors,
      }
    : {
        getBaseColors: getDarkBaseColors,
        getColorPalette: getDarkColorPalette,
        getGreyColors: getDarkGreyColors,
      }
}

export function getThemeTokens(
  presetTheme: PresetTheme,
  tokens: Partial<GlobalThemeTokens> | undefined,
  algorithms: Partial<ThemeTokenAlgorithms> | undefined,
): GlobalThemeTokens {
  const presetAlgorithms = getPresetAlgorithms(presetTheme)

  const getBaseColors = algorithms?.getBaseColors ?? presetAlgorithms.getBaseColors
  const getColorPalette = algorithms?.getColorPalette ?? presetAlgorithms.getColorPalette
  const getGreyColors = algorithms?.getGreyColors ?? presetAlgorithms.getGreyColors
  const presetTokens = presetTheme === 'default' ? defaultPresetTokens : getDarkPresetTokens()

  const mergedPresetTokens = merge({ ...presetTokens }, tokens)

  const presetBasicTokens = getBasicTokens(getBaseColors, getColorPalette, getGreyColors)
  const mergedBasicTokens = merge(presetBasicTokens, pick(mergedPresetTokens, Object.keys(presetBasicTokens)))

  const presetDerivedTokens = getDerivedTokens(mergedBasicTokens, { getBaseColors, getColorPalette, getGreyColors })
  const mergedDerivedTokens = merge(presetDerivedTokens, pick(mergedPresetTokens, Object.keys(presetDerivedTokens)))

  const presetExtendedTokens = getExtendedTokens(
    { ...mergedBasicTokens, ...mergedDerivedTokens },
    { getColorPalette, getGreyColors },
  )
  const mergedExtendedTokens = merge(presetExtendedTokens, pick(mergedPresetTokens, Object.keys(presetExtendedTokens)))

  return {
    ...mergedBasicTokens,
    ...mergedDerivedTokens,
    ...mergedExtendedTokens,
  }
}
