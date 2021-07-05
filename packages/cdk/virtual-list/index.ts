import type { VirtualListComponent } from './src/types'

import VirtualList from './src/List'

const IxVirtualList = VirtualList as unknown as VirtualListComponent

export { IxVirtualList }

export type {
  VirtualListInstance,
  VirtualListPublicProps as VirtualListProps,
  VirtualItemRenderFn,
  ScrollToAlign,
  ScrollToOptions,
  ScrollToFn,
} from './src/types'
