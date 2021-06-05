/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InjectionKey, Ref } from 'vue'
import type { SelectProps, OptionGroupProps, OptionProps } from './types'

export interface SelectInjection {
  selectProps: SelectProps
  inputValue: Ref<string>
  activatedValue: Ref<any>
  activateHandler: (value: any) => void
  selectedValue: Ref<any[]>
  selectHandler: (value: any) => void
  selectOptionHandler: (selected: boolean, option: OptionProps) => void
}

export const selectToken: InjectionKey<SelectInjection> = Symbol('selectToken')

export const optionGroupToken: InjectionKey<OptionGroupProps> = Symbol('optionGroupToken')

export const visibleChangeToken: InjectionKey<(visible: boolean) => void> = Symbol('visibleChangeToken')
