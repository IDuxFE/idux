/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SelectOptionGroupProps, SelectOptionProps, SelectProps } from './types'
import type { InjectionKey, Ref } from 'vue'

export interface SelectInjection {
  selectProps: SelectProps
  inputValue: Ref<string>
  activatedValue: Ref<any>
  activateHandler: (value: any) => void
  selectedValue: Ref<any[]>
  selectHandler: (value: any) => void
  selectOptionHandler: (selected: boolean, option: SelectOptionProps) => void
}

export const selectToken: InjectionKey<SelectInjection> = Symbol('selectToken')

export const optionGroupToken: InjectionKey<SelectOptionGroupProps> = Symbol('optionGroupToken')

export const visibleChangeToken: InjectionKey<(visible: boolean) => void> = Symbol('visibleChangeToken')
