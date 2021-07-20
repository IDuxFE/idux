import type { PopoverComponent } from './src/types'

import Popover from './src/Popover'

const IxPopover = Popover as unknown as PopoverComponent

export { IxPopover }

export type { PopoverInstance, PopoverPublicProps as PopoverProps } from './src/types'
