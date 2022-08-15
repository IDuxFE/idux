/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTextareaComponent } from './src/types'

import ProTextarea from './src/ProTextarea'

const IxProTextarea = ProTextarea as unknown as ProTextareaComponent

export { IxProTextarea }

export type {
  ProTextareaInstance,
  ProTextareaComponent,
  ProTextareaPublicProps as ProTextareaProps,
  TextareaResize,
  TextareaError,
} from './src/types'
