/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DropdownComponent } from './src/types'

import Dropdown from './src/Dropdown'

const IxDropdown = Dropdown as unknown as DropdownComponent

export { IxDropdown }

export type { DropdownInstance, DropdownComponent, DropdownPublicProps as DropdownProps } from './src/types'

export { dropdownToken as ɵDropdownToken } from './src/token'
export type { DropdownContext as ɵDropdownContext } from './src/token'

export { getThemeTokens as getDropdownThemeTokens } from './theme'
export type { DropdownThemeTokens } from './theme'
