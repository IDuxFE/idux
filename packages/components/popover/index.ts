/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopoverComponent } from './src/types'

import Popover from './src/Popover'

const IxPopover = Popover as unknown as PopoverComponent

export { IxPopover }

export type { PopoverInstance, PopoverComponent, PopoverPublicProps as PopoverProps } from './src/types'
