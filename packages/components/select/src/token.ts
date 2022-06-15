/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FlattenedOption } from './composables/useOptions'
import type { PanelActiveStateContext } from './composables/usePanelActiveState'
import type { SelectPanelProps } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, InjectionKey, Slots } from 'vue'

export interface SelectPanelDataContext {
  flattenedOptions: ComputedRef<FlattenedOption[]>
}

export interface SelectPanelContext extends PanelActiveStateContext {
  props: SelectPanelProps
  slots: Slots
  mergedPrefixCls: ComputedRef<string>
  flattenedOptions: ComputedRef<FlattenedOption[]>
  selectedKeys: ComputedRef<VKey[]>
  selectedLimit: ComputedRef<boolean>
  selectedLimitTitle: ComputedRef<string>
}

export const SELECT_PANEL_DATA_TOKEN: InjectionKey<SelectPanelDataContext> = Symbol('SELECT_PANEL_DATA_TOKEN')
export const selectPanelContext: InjectionKey<SelectPanelContext> = Symbol('selectPanelContext')
