/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedOption } from '../composables/useOptions'

export function generateOption(value: string): MergedOption {
  const rawData = { key: value, label: value }
  return { key: value, label: value, rawData }
}
