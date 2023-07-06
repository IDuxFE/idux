/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ResolvedSearchField } from './searchFields'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export const quickSelectPanelItemProps = {
  searchField: { type: Object as PropType<ResolvedSearchField>, required: true },
} as const

export const quickSelectPanelShortcutProps = {
  fieldKey: { type: [String, Number, Symbol] as PropType<VKey>, required: true },
  icon: String,
} as const

export type ProSearchShortcutProps = ExtractInnerPropTypes<typeof quickSelectPanelShortcutProps>
export type ProSearchShortcutPublicProps = ExtractPublicPropTypes<typeof quickSelectPanelShortcutProps>
export type ProSearchShortcutComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProSearchShortcutPublicProps> & ProSearchShortcutPublicProps
>
export type ProSearchShortcutInstance = InstanceType<DefineComponent<ProSearchShortcutProps>>
