import { installComponent } from '@idux/components/core/utils'
import IxCheckbox from './src/Checkbox.vue'
import IxCheckboxGroup from './src/CheckboxGroup.vue'

IxCheckbox.install = installComponent(IxCheckbox)
IxCheckboxGroup.install = installComponent(IxCheckboxGroup)

export { IxCheckbox, IxCheckboxGroup }
export * from './src/types'
