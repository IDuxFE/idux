import { installComponent } from '@idux/components/utils'
import IxButton from './src/Button.vue'
import IxButtonGroup from './src/ButtonGroup.vue'

IxButton.install = installComponent(IxButton)
IxButtonGroup.install = installComponent(IxButtonGroup)

export { IxButton, IxButtonGroup }

export type { ButtonComponent, ButtonProps, ButtonShape, ButtonGroupComponent, ButtonGroupProps } from './src/types'

export type { ButtonMode, ButtonSize } from '@idux/components/config'
