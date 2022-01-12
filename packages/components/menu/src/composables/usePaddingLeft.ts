/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { type MenuMode } from '../types'

export const usePaddingLeft = (
  mode: ComputedRef<MenuMode>,
  indent: ComputedRef<number>,
  level: number,
  grouped: boolean,
): ComputedRef<string | undefined> => {
  return computed(() => {
    if (mode.value !== 'inline') {
      return undefined
    }
    const groupedLeft = grouped ? 8 : 0
    return `${indent.value * level + groupedLeft}px`
  })
}
