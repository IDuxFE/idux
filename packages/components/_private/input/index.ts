/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { InputComponent } from './src/types'

import Input from './src/Input'

const ɵInput = Input as unknown as InputComponent

export { ɵInput }

export type {
  InputInstance as ɵInputInstance,
  InputComponent as ɵInputComponent,
  InputPublicProps as ɵInputProps,
} from './src/types'
