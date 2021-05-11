import { InjectionKey } from 'vue'

export interface DropdownContext {
  setMenuOpenState: (opened: boolean) => void
  onMouseOverlayChang: (open: boolean) => void
}

export const dropdownToken: InjectionKey<DropdownContext> = Symbol('dropdownToken')
