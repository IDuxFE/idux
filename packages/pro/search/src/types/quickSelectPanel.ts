/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ResolvedSearchField } from './searchFields'
import type { PropType } from 'vue'

export const quickSelectPanelItemProps = {
  searchField: { type: Object as PropType<ResolvedSearchField>, required: true },
} as const

export const quickSelectPanelShortcutProps = {
  searchField: { type: Object as PropType<ResolvedSearchField>, required: true },
} as const
