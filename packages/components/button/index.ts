import { installComponent } from '@idux/components/core/utils'
import IxButton from './src/Button.vue'
import IxButtonGroup from './src/ButtonGroup.vue'

IxButton.install = installComponent(IxButton)
IxButtonGroup.install = installComponent(IxButtonGroup)

export { IxButton, IxButtonGroup }
export type { IxButtonComponent, IxButtonGroupComponent } from './src/types'
