/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export * from './src/strategy'
export * from './src/scrollbar'
export * from './src/useScroll'
export * from './src/utils'

import type { VirtualScrollComponent } from './src/virtual/types'

import VirtualScroll from './src/virtual/VirtualScroll'

const CdkVirtualScroll = VirtualScroll as unknown as VirtualScrollComponent

export { CdkVirtualScroll }

export type {
  VirtualScrollInstance,
  VirtualScrollComponent,
  VirtualScrollPublicProps as VirtualScrollProps,
  VirtualContentRenderFn,
  VirtualRowRenderFn,
  VirtualColRenderFn,
  VirtualScrollToOptions,
  VirtualScrollToFn,
  VirtualScrollEnabled,
  VirtualScrollRowData,
  VirtualScrollMode,
} from './src/virtual/types'
