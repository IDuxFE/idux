/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DividerComponent } from './src/types'

import Divider from './src/Divider'

const IxDivider = Divider as unknown as DividerComponent

export { IxDivider }

export type {
  DividerInstance,
  DividerComponent,
  DividerPublicProps as DividerProps,
  DividerPosition,
  DividerType,
} from './src/types'
