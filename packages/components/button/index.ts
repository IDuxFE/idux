import { installComponent } from '@idux/components/core/utils'
import Button from './src/Button.vue'
import ButtonGroup from './src/ButtonGroup.vue'

Button.install = installComponent(Button)
ButtonGroup.install = installComponent(ButtonGroup)

export { Button, ButtonGroup }
export type { ButtonComponent, ButtonGroupComponent } from './src/types'
