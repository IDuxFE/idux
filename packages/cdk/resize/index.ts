/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export * from './src/useResizeObserver'
export * from './src/utils'

import type { ResizeObserverComponent } from './src/types'

import ResizeObserver from './src/ResizeObserver'

const CdkResizeObserver = ResizeObserver as unknown as ResizeObserverComponent

export { CdkResizeObserver }

export type {
  ResizeObserverInstance,
  ResizeObserverComponent,
  ResizeObserverPublicProps as ResizeObserverProps,
} from './src/types'
