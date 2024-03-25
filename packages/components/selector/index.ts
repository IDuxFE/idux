/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SelectorComponent } from './src/types'

import Selector from './src/Selector'

const IxSelector = Selector as unknown as SelectorComponent

export { IxSelector }

export type {
  SelectorInstance,
  SelectorComponent,
  SelectorPublicProps as SelectorProps,
  SelectorData,
} from './src/types'
