import type { App } from 'vue'

import IxDropdown from './src/Dropdown.vue'
import IxDropdownButton from './src/DropdownButton.vue'

IxDropdown.install = (app: App): void => {
  app.component(IxDropdown.name, IxDropdown)
}

IxDropdownButton.install = (app: App): void => {
  app.component(IxDropdown.name, IxDropdown)
}

export { IxDropdown, IxDropdownButton }

export type { DropdownComponent, DropdownProps, DropdownButtonComponent, DropdownButtonProps } from './src/types'

export { dropdownToken as ɵDropdownToken } from './src/token'
