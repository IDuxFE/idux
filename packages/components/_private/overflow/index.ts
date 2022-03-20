/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { OverflowComponent } from './src/types'

import Overflow from './src/Overflow'

const ɵOverflow = Overflow as unknown as OverflowComponent

export { ɵOverflow }

export type {
  OverflowInstance as ɵOverflowInstance,
  OverflowComponent as ɵOverflowComponent,
  OverflowPublicProps as ɵOverflowProps,
} from './src/types'
