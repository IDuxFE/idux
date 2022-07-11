/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeTransferData } from './types'
import type { VKey } from '@idux/cdk/utils'

import { isArray, isNil } from 'lodash-es'

export function traverseTree<C extends VKey>(
  data: TreeTransferData<C>[],
  childrenKey: C,
  fn: (item: TreeTransferData<C>, parent: TreeTransferData<C> | undefined) => void,
  parent?: TreeTransferData<C>,
): void {
  data.forEach(item => {
    fn(item, parent)
    if (item[childrenKey]) {
      traverseTree(item[childrenKey]!, childrenKey, fn, item)
    }
  })
}

export function mapTree<C extends VKey>(
  data: TreeTransferData<C>[],
  childrenKey: C,
  fn: (item: TreeTransferData<C>, parent: TreeTransferData<C> | undefined) => TreeTransferData<C>,
  parent?: TreeTransferData<C>,
): TreeTransferData<C>[] {
  return data.map(item => {
    const mappedItem = fn(item, parent)
    if (item[childrenKey]) {
      const mappedChildren = mapTree(item[childrenKey]!, childrenKey, fn, item)
      mappedItem[childrenKey] = mappedChildren as TreeTransferData<C>[C]
    }

    return mappedItem
  })
}

export function filterTree<C extends VKey>(
  data: TreeTransferData<C>[],
  childrenKey: C,
  fn: (item: TreeTransferData<C>) => boolean,
  filterStrategy: 'and' | 'or' = 'or',
): TreeTransferData<C>[] {
  return data
    .map(item => {
      let children: TreeTransferData<C>[] | undefined

      if (isArray(item[childrenKey])) {
        children = filterTree(item[childrenKey]!, childrenKey, fn, filterStrategy)
      }

      let itemValid = fn(item)
      itemValid =
        filterStrategy === 'and'
          ? !!(children && children.length > 0) && itemValid
          : !!(children && children.length > 0) || itemValid

      return (
        itemValid && {
          ...item,
          [childrenKey]: item[childrenKey] && children,
        }
      )
    })
    .filter(item => !!item) as TreeTransferData<C>[]
}

export function combineTrees<C extends VKey>(
  sourceTree: TreeTransferData<C>[],
  targetTree: TreeTransferData<C>[],
  childrenKey: C,
  getRowKey: (item: TreeTransferData<C>) => VKey,
): TreeTransferData<C>[] {
  sourceTree.forEach(item => {
    const targetItem = targetTree.find(_item => {
      const sourceKey = getRowKey(item)
      const targetKey = getRowKey(_item)

      return !isNil(sourceKey) && !isNil(targetKey) && sourceKey === targetKey
    })

    if (!targetItem) {
      targetTree.push(item)
      return
    }

    if (!isArray(item[childrenKey])) {
      return
    }

    if (!isArray(targetItem[childrenKey])) {
      ;(targetItem[childrenKey] as TreeTransferData<C>[]) = []
    }

    combineTrees(item[childrenKey]!, targetItem[childrenKey]!, childrenKey, getRowKey)
  })

  return targetTree
}

export function flattenTree<C extends VKey>(
  data: TreeTransferData<C>[],
  childrenKey: C,
  leafOnly = false,
): TreeTransferData<C>[] {
  const res: TreeTransferData<C>[] = []

  traverseTree(data, childrenKey, item => {
    ;(!leafOnly || !item[childrenKey] || item[childrenKey]!.length <= 0) && res.push(item)
  })

  return res
}

export function genFlattenedTreeKeys<C extends VKey>(
  data: TreeTransferData<C>[],
  childrenKey: C,
  getRowKey: (item: TreeTransferData<C>) => VKey,
): VKey[] {
  const keys: VKey[] = []

  traverseTree(data, childrenKey, item => {
    keys.push(getRowKey(item))
  })

  return keys
}
