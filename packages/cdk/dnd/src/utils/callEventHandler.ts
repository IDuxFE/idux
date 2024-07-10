/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BaseDndSortableEventArgs, DndSortableEvetWithSourceArgs } from '../types'
import type { DragLocationHistory } from '@atlaskit/pragmatic-drag-and-drop/types'

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
  transferData: Record<string, unknown>,
  sourceTransferData: Record<string, unknown>,
  location: DragLocationHistory,
): void {
  if (!isDndSortableTransferData(transferData) || !isDndSortableTransferData(sourceTransferData)) {
    return
  }

  handler?.({
    key: transferData.key,
    data: transferData.listData,
    sourceKey: sourceTransferData.key,
    sourceData: sourceTransferData.listData,
    location,
  })
}
