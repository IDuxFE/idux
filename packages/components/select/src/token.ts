/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InjectionKey, Ref } from 'vue'
import type { SelectProps, SelectOptionProps, SelectOptionGroupProps } from './types'

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
