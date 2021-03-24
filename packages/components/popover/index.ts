import { installComponent } from '@idux/components/core/utils'
import IxPopover from './src/Popover.vue'

IxPopover.install = installComponent(IxPopover)

export { IxPopover }
export * from './src/types'
