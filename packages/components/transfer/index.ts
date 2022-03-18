/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TransferComponent } from './src/types'

import Transfer from './src/Transfer'

const IxTransfer = Transfer as unknown as TransferComponent

export { IxTransfer }

export type {
  TransferInstance,
  TransferComponent,
  TransferPublicProps as TransferProps,
  TransferListSlotParams,
  TransferOperationsSlotParams,
  TransferData,
  TransferPaginationType,
  TransferBindings,
  TransferDataStrategiesConfig,
  TransferMode,
  TransferScroll,
  TransferScrollTo,
  SearchFn,
} from './src/types'

export {
  TRANSFER_DATA_STRATEGIES,
  TRANSFER_SOURCE_TOKEN,
  TRANSFER_TARGET_TOKEN,
  TRANSFER_OPERATIONS_TOKEN,
} from './src/token'
