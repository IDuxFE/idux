import type { InputComponent, TextareaComponent } from './src/types'

import Input from './src/Input.vue'
import Textarea from './src/Textarea.vue'

const IxInput = Input as unknown as InputComponent
const IxTextarea = Textarea as unknown as TextareaComponent

export { IxInput, IxTextarea }

export type {
  InputInstance,
  InputPublicProps as InputProps,
  TextareaInstance,
  TextareaPublicProps as TextareaProps,
  TextareaAutoRows,
  TextareaResize,
} from './src/types'
