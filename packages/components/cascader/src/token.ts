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
import type { SelectedStateContext } from './composables/useSelectedState'
import type { CascaderProps } from './types'
import type { FormAccessor } from '@idux/cdk/forms'
import type { CascaderConfig } from '@idux/components/config'
import type { GetKeyFn } from '@idux/components/utils'
import type { ComputedRef, InjectionKey, Slots } from 'vue'

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

export const cascaderToken: InjectionKey<CascaderContext> = Symbol('cascaderToken')
