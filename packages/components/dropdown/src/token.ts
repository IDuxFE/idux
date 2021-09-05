import { InjectionKey } from 'vue'

export interface DropdownContext {
  changeVisible: (visible: boolean) => void
}

export const dropdownToken: InjectionKey<DropdownContext> = Symbol('dropdownToken')
