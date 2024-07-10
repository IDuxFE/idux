/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DndSortableData, DndSortableReorderInfo, GetKey } from '../types'

import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder'

import { insertChildTreeItem, insertTreeItemAfter, insertTreeItemBefore, removeTreeItem } from '@idux/cdk/utils'

export function reorderList(list: DndSortableData[], reorderInfo: DndSortableReorderInfo): DndSortableData[] {
  const { sourceIndex, targetIndex, operation } = reorderInfo
  const finishIndex = operation === 'insertAfter' ? targetIndex : targetIndex - 1

  return reorder({
    list,
    startIndex: sourceIndex,
    finishIndex,
  })
}

export function reorderTree<C extends keyof V, V extends object>(
  tree: DndSortableData<C, V>[],
  reorderInfo: DndSortableReorderInfo,
  childrenKey: C,
  getKey: GetKey,
): DndSortableData<C, V>[] {
  const { sourceKey, targetKey, sourceData, operation } = reorderInfo

  let newData = removeTreeItem(tree, sourceKey, childrenKey, getKey)

  if (operation === 'insertAfter') {
    newData = insertTreeItemAfter(newData, targetKey, sourceData as DndSortableData<C, V>, childrenKey, getKey)
  } else if (operation === 'insertBefore') {
    newData = insertTreeItemBefore(newData, targetKey, sourceData as DndSortableData<C, V>, childrenKey, getKey)
  } else if (operation === 'insertChild') {
    newData = insertChildTreeItem(newData, targetKey, sourceData as DndSortableData<C, V>, childrenKey, getKey)
  } else {
    newData = [...tree]
  }

  return newData
}
