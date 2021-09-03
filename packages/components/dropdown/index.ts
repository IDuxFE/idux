import type { DropdownComponent } from './src/types'

import Dropdown from './src/Dropdown'

const IxDropdown = Dropdown as unknown as DropdownComponent

export { IxDropdown }

export type { DropdownInstance, DropdownPublicProps as DropdownProps } from './src/types'

export { dropdownToken as ɵDropdownToken } from './src/token'
export type { DropdownContext as ɵDropdownContext } from './src/token'
