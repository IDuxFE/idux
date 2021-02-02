import { installComponent } from '@idux/components/core/utils'
import IxInput from './src/Input.vue'
import IxTextarea from './src/Textarea.vue'

IxInput.install = installComponent(IxInput)
IxTextarea.install = installComponent(IxTextarea)

export { IxInput, IxTextarea }
export * from './src/types'
