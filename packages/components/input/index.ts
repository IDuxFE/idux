import type { App } from 'vue'

import IxInput from './src/Input.vue'
import IxTextarea from './src/Textarea.vue'

IxInput.install = (app: App): void => {
  app.component(IxInput.name, IxInput)
}

IxTextarea.install = (app: App): void => {
  app.component(IxTextarea.name, IxTextarea)
}

export { IxInput, IxTextarea }

export type { InputComponent, InputProps, TextareaComponent, TextareaProps } from './src/types'

export type { InputSize, TextareaSize, TextareaAutoRows, TextareaResize } from '@idux/components/config'
