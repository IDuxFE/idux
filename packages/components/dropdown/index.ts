import type { DropdownComponent, DropdownButtonComponent } from './src/types'

import Dropdown from './src/Dropdown.vue'
import DropdownButton from './src/DropdownButton.vue'

const IxDropdown = Dropdown as unknown as DropdownComponent
const IxDropdownButton = DropdownButton as unknown as DropdownButtonComponent

export { IxDropdown, IxDropdownButton }

export type {
  DropdownInstance,
  DropdownPublicProps as DropdownProps,
  DropdownButtonInstance,
  DropdownButtonPublicProps as DropdownButtonProps,
} from './src/types'

export { dropdownToken as ɵDropdownToken } from './src/token'
