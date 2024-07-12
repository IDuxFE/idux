/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BaseDndSortableEventArgs, DndSortableEvetWithSourceArgs } from '../types'
import type { DragLocationHistory } from '@atlaskit/pragmatic-drag-and-drop/types'
import type { VKey } from '@idux/cdk/utils'

import { isDndSortableTransferData } from './isDndSortableTransferData'

export function callEventHandler(
  handler: ((args: BaseDndSortableEventArgs) => void) | undefined,
  transferData: Record<string, unknown>,
  location: DragLocationHistory,
): void {
  if (!isDndSortableTransferData(transferData)) {
    return
  }

  handler?.({
    key: transferData.key,
    data: transferData.listData,
    location,
  })
}

export function callEventHandlerWithSource(
  handler: ((args: DndSortableEvetWithSourceArgs) => void) | undefined,
  transferData: Record<string, unknown> | undefined,
  sourceTransferData: Record<string, unknown> | undefined,
  location: DragLocationHistory,
): void {
  let key: VKey | undefined
  let data: DndSortableEvetWithSourceArgs['data'] | undefined
  let sourceKey: VKey | undefined
  let sourceData: DndSortableEvetWithSourceArgs['data'] | undefined

  if (transferData && isDndSortableTransferData(transferData)) {
    key = transferData.key
    data = transferData.listData
  }

  if (sourceTransferData && isDndSortableTransferData(sourceTransferData)) {
    sourceKey = sourceTransferData.key
    sourceData = sourceTransferData.listData
  }

  handler?.({
    key: key!,
    data: data!,
    sourceKey: sourceKey!,
    sourceData: sourceData!,
    location,
  })
}
