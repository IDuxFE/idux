/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ActiveStateContext } from './composables/useActiveState'
import type { DataSourceContext } from './composables/useDataSource'
import type { ExpandableContext } from './composables/useExpandable'
import type { SearchableContext } from './composables/useSearchable'
import type { SelectedLimitContext } from './composables/useSelectedLimit'
import type { SelectedStateContext } from './composables/useSelectedState'
import type { CascaderPanelProps, CascaderProps } from './types'
import type { FormAccessor } from '@idux/cdk/forms'
import type { CascaderConfig } from '@idux/components/config'
import type { GetDisabledFn, GetKeyFn } from '@idux/components/utils'
import type { ComputedRef, InjectionKey, Slots } from 'vue'

import { VKey } from '@idux/cdk/utils'

export interface CascaderContext
  extends ActiveStateContext,
    DataSourceContext,
    ExpandableContext,
    SearchableContext,
    SelectedStateContext {
  props: CascaderProps
  slots: Slots
  config: CascaderConfig
  mergedPrefixCls: ComputedRef<string>
  mergedGetKey: ComputedRef<GetKeyFn>
  mergedGetDisabled: ComputedRef<GetDisabledFn>
  mergedChildrenKey: ComputedRef<string>
  mergedClearIcon: ComputedRef<string>
  mergedExpandIcon: ComputedRef<string>
  mergedFullPath: ComputedRef<boolean>
  mergedLabelKey: ComputedRef<string>
  accessor: FormAccessor
  inputValue: ComputedRef<string>
  setInputValue: (value: string) => void
  overlayOpened: ComputedRef<boolean>
  setOverlayOpened: (open: boolean) => void
  updateOverlay: () => void
}

export interface CascaderPanelContext
  extends ActiveStateContext,
    DataSourceContext,
    ExpandableContext,
    SearchableContext,
    SelectedStateContext,
    SelectedLimitContext {
  props: CascaderPanelProps
  slots: Slots
  config: CascaderConfig
  indeterminateKeys: ComputedRef<VKey[]>
  mergedPrefixCls: ComputedRef<string>
  mergedGetKey: ComputedRef<GetKeyFn>
  mergedGetDisabled: ComputedRef<GetDisabledFn>
  mergedChildrenKey: ComputedRef<string>
  mergedExpandIcon: ComputedRef<string>
  mergedFullPath: ComputedRef<boolean>
  mergedLabelKey: ComputedRef<string>
}

export const CASCADER_PANEL_DATA_TOKEN: InjectionKey<DataSourceContext & SelectedStateContext> =
  Symbol('CASCADER_PANEL_DATA_TOKEN')
export const cascaderPanelToken: InjectionKey<CascaderPanelContext> = Symbol('cascaderPanelToken')
export const cascaderToken: InjectionKey<CascaderContext> = Symbol('cascaderToken')
