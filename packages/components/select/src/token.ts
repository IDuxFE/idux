/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ActiveStateContext } from './composables/useActiveState'
import type { OptionsContext } from './composables/useOptions'
import type { SelectProps } from './types'
import type { ValueAccessor } from '@idux/cdk/forms'
import type { VirtualScrollInstance } from '@idux/cdk/scroll'
import type { SelectConfig } from '@idux/components/config'
import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'

export interface SelectContext extends ActiveStateContext, OptionsContext {
  props: SelectProps
  slots: Slots
  config: SelectConfig
  mergedPrefixCls: ComputedRef<string>
  accessor: ValueAccessor
  virtualScrollRef: Ref<VirtualScrollInstance | undefined>
  inputValue: ComputedRef<string>
  setInputValue: (value: string) => void
  overlayOpened: ComputedRef<boolean>
  setOverlayOpened: (open: boolean) => void
  selectedValue: ComputedRef<any[]>

  selectedLimit: ComputedRef<boolean>
  selectedLimitTitle: ComputedRef<string>
  handleOptionClick: (value: any) => void
}

export const selectToken: InjectionKey<SelectContext> = Symbol('selectToken')
