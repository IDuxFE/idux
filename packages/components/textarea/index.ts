/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

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
