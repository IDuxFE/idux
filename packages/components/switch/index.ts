import { installComponent } from '@idux/components/core/utils'
import IxSwitch from './src/Switch.vue'

IxSwitch.install = installComponent(IxSwitch)

export { IxSwitch }
export type { SwitchComponent, SwitchProps } from './src/types'
