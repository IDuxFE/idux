/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedOption } from '../composables/useOptions'

const keyPrefix = '__IDUX_SELECT_GENERATE_OPTION_KEY_'

export function generateOption(value: string): MergedOption {
  const rawOption = { label: value, value }
  return { key: keyPrefix + value, label: value, value, rawOption }
}
