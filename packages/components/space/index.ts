/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SpaceComponent } from './src/types'

import Space from './src/Space'

const IxSpace = Space as unknown as SpaceComponent

export { IxSpace }

export type {
  SpaceInstance,
  SpaceComponent,
  SpacePublicProps as SpaceProps,
  SpaceAlign,
  SpaceDirection,
  SpaceSize,
} from './src/types'

export { getThemeTokens as getSpaceThemeTokens } from './theme'

export type { SpaceThemeTokens } from './theme'
