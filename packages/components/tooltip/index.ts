import { installComponent } from '@idux/components/core/utils'
import IxTooltip from './src/tooltip'

IxTooltip.install = installComponent(IxTooltip)

export { IxTooltip }
export * from './src/types'
