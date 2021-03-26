import { installComponent } from '@idux/components/utils'
import IxInput from './src/Input.vue'
import IxTextarea from './src/Textarea.vue'

IxInput.install = installComponent(IxInput)
IxTextarea.install = installComponent(IxTextarea)

export { IxInput, IxTextarea }

export type { InputComponent, InputProps, TextareaComponent, TextareaProps } from './src/types'

export type { InputSize, TextareaSize, TextareaAutoRows, TextareaResize } from '@idux/components/config'
