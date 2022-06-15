/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FlattenedOption } from '../composables/useOptions'
import type { SelectData } from '../types'

export function generateOption(value: string): FlattenedOption {
  const rawData = { key: value, label: value }
  return { key: value, label: value, type: 'item', rawData }
}

export function generateRawOption(value: string): SelectData {
  return { key: value, label: value }
}
