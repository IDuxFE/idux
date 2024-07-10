/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PanelActiveStateContext } from './composables/usePanelActiveState'
import type { FlattenedOption, SelectPanelProps } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, InjectionKey } from 'vue'

export interface SelectPanelDataContext {
  flattenedOptions: ComputedRef<FlattenedOption[]>
}

export interface SelectPanelContext extends PanelActiveStateContext {
  props: SelectPanelProps
  mergedPrefixCls: ComputedRef<string>
  mergedDndSortable: ComputedRef<false | { autoScroll: boolean; dragHandle: string | false }>
  flattenedOptions: ComputedRef<FlattenedOption[]>
  selectedKeys: ComputedRef<VKey[]>
  selectedLimit: ComputedRef<boolean>
  selectedLimitTitle: ComputedRef<string>
}

export const SELECT_PANEL_DATA_TOKEN: InjectionKey<SelectPanelDataContext> = Symbol('SELECT_PANEL_DATA_TOKEN')
export const selectPanelContext: InjectionKey<SelectPanelContext> = Symbol('selectPanelContext')
