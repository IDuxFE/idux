export * from './src/strategy'
export * from './src/utils'

import type { VirtualScrollComponent } from './src/virtual/types'

import VirtualScroll from './src/virtual/VirtualScroll'

const IxVirtualScroll = VirtualScroll as unknown as VirtualScrollComponent

export { IxVirtualScroll }

export type {
  VirtualScrollInstance,
  VirtualScrollPublicProps as VirtualScrollProps,
  VirtualContentRenderFn,
  VirtualItemRenderFn,
  VirtualScrollToAlign,
  VirtualScrollToOptions,
  VirtualScrollToFn,
} from './src/virtual/types'
