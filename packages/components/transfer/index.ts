/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferComponent, TransferListComponent } from './src/types'

import Transfer from './src/Transfer'
import TransferList from './src/list/List'

const IxTransfer = Transfer as unknown as TransferComponent
const IxTransferList = TransferList as unknown as TransferListComponent

export { IxTransfer, IxTransferList }

export type {
  TransferInstance,
  TransferComponent,
  TransferPublicProps as TransferProps,
  TransferListInstance,
  TransferListComponent,
  TransferListPublicProps as TransferListProps,
  TransferListSlotParams,
  TransferOperationsSlotParams,
  TransferData,
  TransferPaginationProps,
  TransferBindings,
  TransferDataStrategyProp,
  TransferMode,
  TransferScroll,
  SearchFn,
} from './src/types'

export { TRANSFER_SOURCE_TOKEN, TRANSFER_TARGET_TOKEN, TRANSFER_OPERATIONS_TOKEN } from './src/token'
