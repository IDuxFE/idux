/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTransferComponent } from './src/types'

import ProTransfer from './src/ProTransfer'

const IxProTransfer = ProTransfer as unknown as ProTransferComponent

export { IxProTransfer }

export type {
  TransferData,
  TreeTransferData,
  ProTransferInstance,
  ProTransferComponent,
  ProTransferPublicProps as ProTransferProps,
} from './src/types'
