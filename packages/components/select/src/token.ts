/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ActiveStateContext } from './composables/useActiveState'
import type { InputStateContext } from './composables/useInputState'
import type { OptionsContext } from './composables/useOptions'
import type { SelectedStateContext } from './composables/useSelectedState'
import type { SelectProps } from './types'
import type { FocusMonitor } from '@idux/cdk/a11y'
import type { ValueAccessor } from '@idux/cdk/forms'
import type { VirtualScrollInstance } from '@idux/cdk/scroll'
import type { SelectConfig } from '@idux/components/config'
import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'

export interface SelectContext extends ActiveStateContext, InputStateContext, OptionsContext, SelectedStateContext {
  props: SelectProps
  slots: Slots
  config: SelectConfig
  mergedPrefixCls: ComputedRef<string>
  accessor: ValueAccessor
  isDisabled: ComputedRef<boolean>
  focusMonitor: FocusMonitor
  inputRef: Ref<HTMLInputElement | undefined>
  virtualScrollRef: Ref<VirtualScrollInstance | undefined>
  triggerRef: Ref<HTMLDivElement | undefined>
  overlayOpened: ComputedRef<boolean>
  setOverlayOpened: (open: boolean) => void
  handleOptionClick: (value: any) => void
}

export const selectToken: InjectionKey<SelectContext> = Symbol('selectToken')
