import { installComponent } from '@idux/components/utils'
import IxCheckbox from './src/Checkbox.vue'
import IxCheckboxGroup from './src/CheckboxGroup.vue'

IxCheckbox.install = installComponent(IxCheckbox)
IxCheckboxGroup.install = installComponent(IxCheckboxGroup)

export { IxCheckbox, IxCheckboxGroup }

export type { CheckboxComponent, CheckboxProps, CheckboxGroupComponent, CheckboxGroupProps } from './src/types'
