import { installComponent } from '@idux/components/utils'
import IxTooltip from './src/tooltip'

IxTooltip.install = installComponent(IxTooltip)

export { IxTooltip }

export type { TooltipComponent, TooltipProps } from './src/types'
