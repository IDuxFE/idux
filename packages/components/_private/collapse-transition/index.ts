/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CollapseTransitionComponent } from './src/types'

import CollapseTransition from './src/CollapseTransition'

const ɵCollapseTransition = CollapseTransition as unknown as CollapseTransitionComponent

export { ɵCollapseTransition }

export type {
  CollapseTransitionInstance as ɵCollapseTransitionInstance,
  CollapseTransitionPublicProps as ɵCollapseTransitionProps,
  CollapseTransitionMode as ɵCollapseTransitionMode,
} from './src/types'
