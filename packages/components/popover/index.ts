import { installComponent } from '@idux/components/utils'
import IxPopover from './src/Popover.vue'

IxPopover.install = installComponent(IxPopover)

export { IxPopover }
export * from './src/types'
