import type { TextareaComponent } from './src/types'

import Textarea from './src/Textarea'

const IxTextarea = Textarea as unknown as TextareaComponent

export { IxTextarea }

export type {
  TextareaInstance,
  TextareaPublicProps as TextareaProps,
  TextareaAutoRows,
  TextareaResize,
} from './src/types'
